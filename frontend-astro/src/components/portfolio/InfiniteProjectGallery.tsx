import type { PortfolioProject } from "@/data/portfolioProjects";
import gsap from "gsap";
import { ArrowUpRight, MoveDiagonal2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  projects: PortfolioProject[];
};

const PANEL_GAP = 1.1;
const AUTO_DRIFT = 0.0018;
const DRAG_THRESHOLD = 8;
const MOBILE_BREAKPOINT = 820;
const CYCLES = [-2, -1, 0, 1, 2];

const wrapProgress = (value: number, length: number) => {
  const next = value % length;
  return next < 0 ? next + length : next;
};

export default function InfiniteProjectGallery({ projects }: Props) {
  const [progress, setProgress] = useState(1.35);
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const frameRef = useRef<number | null>(null);
  const velocityRef = useRef(AUTO_DRIFT);
  const pointerRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startProgress: 0,
    moved: false,
    lastProjected: 0,
    lastTime: 0,
  });

  const frozenProgressRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cardRefsMap = useRef(new Map<string, HTMLButtonElement>());
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const selectedCardKeyRef = useRef<string | null>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const dragLayerRef = useRef<HTMLDivElement>(null);

  const scene = useMemo(() => {
    const width = Math.max(viewport.width, 360);
    const height = Math.max(viewport.height, 640);
    const panelWidth = isMobile ? 220 : 280;
    const panelHeight = isMobile ? 300 : 380;

    return {
      panelWidth,
      panelHeight,
      railStartX: width * (isMobile ? 0.76 : 0.72) - width / 2,
      railStartY: height * (isMobile ? 0.14 : 0.12) - height / 2,
      railStepX: -(Math.min(isMobile ? 136 : 178, width * (isMobile ? 0.182 : 0.124))),
      railStepY: Math.min(isMobile ? 132 : 172, height * (isMobile ? 0.16 : 0.19)),
      depthStep: isMobile ? 92 : 118,
      blurStep: isMobile ? 0.78 : 0.62,
      scaleStep: isMobile ? 0.06 : 0.05,
      total: projects.length,
      axisDivider: isMobile ? 170 : 220,
    };
  }, [isMobile, projects.length, viewport.height, viewport.width]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // RAF loop — skips when gallery is frozen for animation
  useEffect(() => {
    if (frozenProgressRef.current !== null) return;

    const tick = () => {
      if (!pointerRef.current.active) {
        setProgress((current) => wrapProgress(current + velocityRef.current, scene.total));
        velocityRef.current = velocityRef.current * 0.985 + AUTO_DRIFT * 0.015;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [scene.total, selectedProject]);

  const projectAtCenter = useMemo(() => {
    const normalized = wrapProgress(progress, scene.total);
    const index = Math.round(normalized) % scene.total;
    return projects[index];
  }, [progress, projects, scene.total]);

  // --- Freeze / Unfreeze helpers ---
  const freezeGallery = useCallback(() => {
    frozenProgressRef.current = progress;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, [progress]);

  const unfreezeGallery = useCallback(() => {
    frozenProgressRef.current = null;
    velocityRef.current = AUTO_DRIFT;
  }, []);

  // --- GSAP open animation ---
  const runOpenAnimation = useCallback(() => {
    const selectedKey = selectedCardKeyRef.current;
    if (!selectedKey) return;

    const selectedCard = cardRefsMap.current.get(selectedKey);
    if (!selectedCard || !sceneContainerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setIsAnimating(false),
    });

    timelineRef.current = tl;

    // Collect "other" cards (not the selected one)
    const otherCards: HTMLButtonElement[] = [];
    cardRefsMap.current.forEach((el, key) => {
      if (key !== selectedKey && el && el.isConnected) {
        otherCards.push(el);
      }
    });

    // Collect hint + info card for dismissal
    const dismissTargets: Element[] = [...otherCards];
    if (hintRef.current) dismissTargets.push(hintRef.current);
    if (infoCardRef.current) dismissTargets.push(infoCardRef.current);

    // Phase 1: Dismiss other cards + hint + info card
    if (dismissTargets.length > 0) {
      tl.to(dismissTargets, {
        x: "-=280",
        opacity: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: "power2.in",
      }, 0);
    }

    // Phase 2: Flatten selected card (remove 3D rotation, center it)
    const sceneRect = sceneContainerRef.current.getBoundingClientRect();
    const cardRect = selectedCard.getBoundingClientRect();
    const centerX = sceneRect.width / 2 - cardRect.width / 2;
    const centerY = sceneRect.height / 2 - cardRect.height / 2;

    // We need to compute where the card currently is relative to scene center
    // The card's left/top in the scene is cardRect.left - sceneRect.left, cardRect.top - sceneRect.top
    const currentLeft = cardRect.left - sceneRect.left;
    const currentTop = cardRect.top - sceneRect.top;
    const deltaX = centerX - currentLeft;
    const deltaY = centerY - currentTop;

    tl.to(sceneContainerRef.current, {
      perspective: 99999,
      duration: 0.6,
      ease: "power2.inOut",
    }, 0.15);

    tl.to(selectedCard, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      x: deltaX,
      y: deltaY,
      z: 0,
      scale: 1,
      filter: "blur(0px) saturate(1)",
      duration: 0.6,
      ease: "power2.inOut",
    }, 0.15);

    // Phase 3: Expand card to modal size
    const modalW = isMobile ? Math.min(viewport.width * 0.92, 680) : Math.min(viewport.width * 0.88, 680);
    const modalH = isMobile ? Math.min(viewport.height * 0.78, 820) : Math.min(viewport.height * 0.82, 820);

    tl.to(selectedCard, {
      width: modalW,
      height: modalH,
      borderRadius: "24px",
      x: (sceneRect.width - modalW) / 2 - currentLeft,
      y: (sceneRect.height - modalH) / 2 - currentTop,
      zIndex: 3000,
      duration: 0.5,
      ease: "power3.inOut",
    }, 0.75);

    // Phase 4: Reveal overlay + content
    if (modalOverlayRef.current) {
      tl.fromTo(modalOverlayRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, 1.0);
    }
    if (modalContentRef.current) {
      tl.fromTo(modalContentRef.current, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 1.05);
    }
  }, [isMobile, viewport.width, viewport.height]);

  // --- Handle card click ---
  const handleProjectClick = useCallback((project: PortfolioProject, cardKey: string) => {
    if (pointerRef.current.moved) return;
    if (isAnimating || selectedProject) return;

    setIsAnimating(true);
    freezeGallery();
    setSelectedProject(project);
    selectedCardKeyRef.current = cardKey;

    // Double-rAF to let React settle before GSAP takes over
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        runOpenAnimation();
      });
    });
  }, [isAnimating, selectedProject, freezeGallery, runOpenAnimation]);

  // --- Handle close ---
  const handleModalClose = useCallback(() => {
    if (!timelineRef.current || isAnimating) return;
    setIsAnimating(true);

    timelineRef.current.reverse();
    timelineRef.current.eventCallback("onReverseComplete", () => {
      setSelectedProject(null);
      setIsAnimating(false);
      selectedCardKeyRef.current = null;

      // Clean up GSAP inline styles from all cards
      cardRefsMap.current.forEach((el) => {
        if (el && el.isConnected) {
          gsap.set(el, { clearProps: "all" });
        }
      });
      if (sceneContainerRef.current) {
        gsap.set(sceneContainerRef.current, { clearProps: "perspective" });
      }
      if (hintRef.current) {
        gsap.set(hintRef.current, { clearProps: "all" });
      }
      if (infoCardRef.current) {
        gsap.set(infoCardRef.current, { clearProps: "all" });
      }

      timelineRef.current?.kill();
      timelineRef.current = null;

      unfreezeGallery();
    });
  }, [isAnimating, unfreezeGallery]);

  // Escape key to close
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject, handleModalClose]);

  // Body scroll lock while modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (selectedProject || isAnimating) return;

    pointerRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startProgress: progress,
      moved: false,
      lastProjected: 0,
      lastTime: performance.now(),
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    const distance = Math.abs(dx) + Math.abs(dy);

    if (distance > DRAG_THRESHOLD) state.moved = true;

    const projected = (dx - dy) / scene.axisDivider;
    const now = performance.now();
    const elapsed = Math.max(now - state.lastTime, 16);

    velocityRef.current = ((projected - state.lastProjected) / elapsed) * 18;
    state.lastProjected = projected;
    state.lastTime = now;

    setProgress(wrapProgress(state.startProgress + projected, scene.total));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      pointerRef.current.active &&
      pointerRef.current.pointerId === event.pointerId
    ) {
      pointerRef.current.active = false;
    }
    setDragging(false);
  };

  // --- Card ref callback ---
  const setCardRef = useCallback((key: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      cardRefsMap.current.set(key, el);
    } else {
      cardRefsMap.current.delete(key);
    }
  }, []);

  const normalizedProgress = wrapProgress(progress, scene.total);

  const panels = CYCLES.flatMap((cycle) =>
    projects.map((project, index) => {
      const rawDistance = index + cycle * scene.total - normalizedProgress;
      const distance = rawDistance / PANEL_GAP;
      const absDistance = Math.abs(distance);

      if (absDistance > 10.5) return null;

      const x = scene.railStartX + rawDistance * scene.railStepX;
      const y = scene.railStartY + rawDistance * scene.railStepY;
      const z = 640 - absDistance * scene.depthStep;
      const scale = Math.max(0.68, 1 - absDistance * scene.scaleStep);
      const blur = Math.max(0, absDistance - 0.25) * scene.blurStep;
      const opacity = Math.max(0.14, 1 - absDistance * 0.12);
      const isActive = absDistance < 0.5;
      const cardKey = `${project.id}-${cycle}`;

      return (
        <button
          key={cardKey}
          ref={setCardRef(cardKey)}
          type="button"
          className="portfolio-plane group absolute left-1/2 top-1/2 overflow-hidden rounded-[10px] border border-black/10 bg-white/70 shadow-[0_50px_110px_rgba(0,0,0,0.14)] transition-[filter,opacity] duration-300"
          style={{
            width: scene.panelWidth,
            height: scene.panelHeight,
            transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(-16deg) rotateY(-30deg) rotateZ(8deg) scale(${scale})`,
            filter: `blur(${blur}px) saturate(${isActive ? 1 : 0.9})`,
            opacity,
            zIndex: Math.round(1200 - absDistance * 100),
          }}
          onClick={() => handleProjectClick(project, cardKey)}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            draggable={false}
            style={{ opacity: isActive ? 0.96 : 0.78 }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_38%,rgba(11,12,15,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_28%,rgba(255,255,255,0.14))]" />
          <div className="absolute left-3 top-3 rounded-full border border-black/8 bg-white/64 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-black/48 backdrop-blur-md">
            {project.year}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="rounded-full border border-white/35 bg-white/32 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-black/60 backdrop-blur-md">
              {project.category}
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/28 text-black/54 backdrop-blur-md">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
      );
    })
  );

  return (
    <div className="relative h-screen min-h-[620px] overflow-hidden bg-[#f3f1ec]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.94),rgba(237,234,228,0.88)_38%,rgba(226,223,217,0.92)_76%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.48),rgba(255,255,255,0)_26%,rgba(0,0,0,0.05)_100%)]" />

      <div
        ref={dragLayerRef}
        className={`absolute inset-0 touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ pointerEvents: (selectedProject || isAnimating) ? "none" : "auto" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div ref={sceneContainerRef} className="portfolio-scene h-full w-full">{panels}</div>
      </div>

      <div
        ref={hintRef}
        className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-black/8 bg-white/72 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-black/46 backdrop-blur-xl sm:left-7 sm:top-7"
      >
        Drag the empty space
      </div>

      <div
        ref={infoCardRef}
        className="pointer-events-none absolute left-5 top-20 z-20 max-w-[286px] sm:left-7 sm:top-24"
      >
        <div className="rounded-[20px] border border-black/8 bg-white/66 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-5">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-black/42">
            <MoveDiagonal2 className="h-3.5 w-3.5" />
            Overview
          </div>
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.06em] text-black/84 sm:text-[1.85rem]">
            {projectAtCenter.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/58">{projectAtCenter.summary}</p>
        </div>
      </div>

      {/* Modal overlay */}
      {selectedProject && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          {/* Dark scrim */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleModalClose}
          />

          {/* Close button */}
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            onClick={handleModalClose}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal content */}
          <div
            ref={modalContentRef}
            className="relative z-10 mx-4 max-h-[82vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] bg-white/95 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:mx-0 sm:p-8"
            style={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Category + Year */}
            <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-black/44">
              <span className="rounded-full border border-black/8 bg-black/4 px-2.5 py-1">
                {selectedProject.category}
              </span>
              <span>{selectedProject.year}</span>
            </div>

            {/* Title */}
            <h2 className="text-[2rem] font-bold tracking-[-0.04em] text-black/88 sm:text-[2.4rem]">
              {selectedProject.title}
            </h2>

            {/* Tagline */}
            <p className="mt-2 text-base leading-7 text-black/60">
              {selectedProject.tagline}
            </p>

            {/* Divider */}
            <div className="my-5 h-px bg-black/8" />

            {/* Overview */}
            <div className="mb-5">
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/42">
                Overview
              </h3>
              <p className="text-sm leading-7 text-black/64">
                {selectedProject.overview}
              </p>
            </div>

            {/* Stack pills */}
            <div className="mb-5">
              <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/42">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/8 bg-black/4 px-3 py-1 text-[11px] tracking-wide text-black/62"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {selectedProject.stats.length > 0 && (
              <div className="mb-5 grid grid-cols-3 gap-3">
                {selectedProject.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-black/6 bg-black/[0.02] p-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-black/38">{stat.label}</div>
                    <div className="mt-1 text-sm font-medium text-black/72">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* View full project link */}
            <a
              href={`/project?id=${selectedProject.id}`}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-black/62 transition-colors hover:bg-black/[0.06] hover:text-black/80"
            >
              View full project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
