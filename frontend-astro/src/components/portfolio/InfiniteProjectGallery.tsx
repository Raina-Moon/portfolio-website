import type { PortfolioProject } from "@/data/portfolioProjects";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";
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
  const modalImageOverlayRef = useRef<HTMLDivElement>(null);
  const modalTextRef = useRef<HTMLDivElement>(null);
  const selectedCardKeyRef = useRef<string | null>(null);
  const selectedCardElRef = useRef<HTMLButtonElement | null>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const dragLayerRef = useRef<HTMLDivElement>(null);

  const scene = useMemo(() => {
    const width = Math.max(viewport.width, 360);
    const height = Math.max(viewport.height, 640);
    const panelWidth = isMobile ? 208 : 248;
    const panelHeight = isMobile ? 228 : 272;

    return {
      panelWidth,
      panelHeight,
      railStartX: width * (isMobile ? 0.76 : 0.72) - width / 2,
      railStartY: height * (isMobile ? 0.36 : 0.33) - height / 2,
      railStepX: -(Math.min(isMobile ? 112 : 146, width * (isMobile ? 0.152 : 0.104))),
      railStepY: Math.min(isMobile ? 72 : 92, height * (isMobile ? 0.09 : 0.102)),
      depthStep: isMobile ? 54 : 64,
      blurStep: isMobile ? 0.78 : 0.62,
      scaleStep: 0,
      baseDepth: isMobile ? 488 : 505,
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

  const normalizedProgress = wrapProgress(progress, scene.total);

  const focusedPanel = useMemo(() => {
    let best: { cardKey: string; project: PortfolioProject } | null = null;
    let bestDistance = Infinity;

    for (const cycle of CYCLES) {
      for (const [index, project] of projects.entries()) {
        const rawDistance = index + cycle * scene.total - normalizedProgress;
        const distance = Math.abs(rawDistance / PANEL_GAP);

        if (distance > 10.5) continue;

        const centerX = scene.railStartX + rawDistance * scene.railStepX;
        const centerY = scene.railStartY + rawDistance * scene.railStepY;
        const centerDistance = Math.hypot(centerX, centerY);

        if (centerDistance < bestDistance) {
          bestDistance = centerDistance;
          best = {
            cardKey: `${project.id}-${cycle}`,
            project,
          };
        }
      }
    }

    return best ?? { cardKey: `${projects[0]?.id ?? "project"}-0`, project: projects[0] };
  }, [normalizedProgress, projects, scene.railStartX, scene.railStartY, scene.railStepX, scene.railStepY, scene.total]);

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
    const selectedCard = selectedCardElRef.current;
    if (!selectedKey || !selectedCard || !sceneContainerRef.current) return;

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
        x: "-=320",
        y: "-=250",
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
    // Phase 4b: Animate dark overlay and text inside modal
    if (modalImageOverlayRef.current) {
      tl.fromTo(modalImageOverlayRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 1.15);
    }
    if (modalTextRef.current) {
      tl.fromTo(modalTextRef.current, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 1.25);
    }
  }, [isMobile, viewport.width, viewport.height]);

  // --- Handle card click ---
  const handleProjectClick = useCallback((project: PortfolioProject, cardKey: string, cardEl: HTMLButtonElement) => {
    if (pointerRef.current.moved) return;
    if (isAnimating || selectedProject) return;

    setIsAnimating(true);
    freezeGallery();
    setSelectedProject(project);
    selectedCardKeyRef.current = cardKey;
    selectedCardElRef.current = cardEl;

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
      selectedCardElRef.current = null;

      // Kill timeline first — GSAP reverse already restored all values
      timelineRef.current?.kill();
      timelineRef.current = null;

      // Only clear non-React-managed elements (hint, info card, scene perspective)
      // Cards keep their GSAP-restored inline styles; the RAF loop will
      // update progress on the next frame, causing React to overwrite them.
      if (sceneContainerRef.current) {
        gsap.set(sceneContainerRef.current, { clearProps: "perspective" });
      }
      if (hintRef.current) {
        gsap.set(hintRef.current, { clearProps: "all" });
      }
      if (infoCardRef.current) {
        gsap.set(infoCardRef.current, { clearProps: "all" });
      }

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

  const panels = CYCLES.flatMap((cycle) =>
    projects.map((project, index) => {
      const rawDistance = index + cycle * scene.total - normalizedProgress;
      const distance = rawDistance / PANEL_GAP;
      const absDistance = Math.abs(distance);

      if (absDistance > 10.5) return null;

      const x = scene.railStartX + rawDistance * scene.railStepX;
      const y = scene.railStartY + rawDistance * scene.railStepY;
      const z = scene.baseDepth - absDistance * scene.depthStep;
      const scale = Math.max(0.68, 1 - absDistance * scene.scaleStep);
      const cardKey = `${project.id}-${cycle}`;
      const isActive = focusedPanel.cardKey === cardKey;
      const blur = isActive ? 0 : Math.max(0.12, Math.max(0, absDistance - 0.18) * scene.blurStep);
      const opacity = Math.max(0.14, 1 - absDistance * 0.12);
      const offsetX = x - scene.panelWidth / 2;
      const offsetY = y - scene.panelHeight / 2;

      return (
        <button
          key={cardKey}
          ref={setCardRef(cardKey)}
          type="button"
          className="portfolio-plane group absolute left-1/2 top-1/2 overflow-hidden rounded-[10px] border border-black/10 bg-white/70 shadow-[0_50px_110px_rgba(0,0,0,0.14)] transition-[filter,opacity] duration-300"
          style={{
            width: scene.panelWidth,
            height: scene.panelHeight,
            transform: `translate3d(${offsetX}px, ${offsetY}px, ${z}px) rotateX(-5deg) rotateY(-22deg) rotateZ(4deg) scale(${scale})`,
            filter: `blur(${blur}px) saturate(${isActive ? 1.04 : 0.9})`,
            opacity: isActive ? Math.max(opacity, 0.98) : opacity,
            zIndex: Math.round(1200 - absDistance * 100),
          }}
          onClick={(e) => handleProjectClick(project, cardKey, e.currentTarget)}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            draggable={false}
            style={{ opacity: isActive ? 1 : 0.76 }}
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

          {/* Modal content box */}
          <div
            ref={modalContentRef}
            className="relative z-10 mx-4 max-h-[82vh] w-full max-w-[680px] overflow-hidden rounded-[24px] shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:mx-0"
            style={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background image */}
            <img
              src={selectedProject.thumbnail}
              alt={selectedProject.title}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* Dark gradient overlay */}
            <div
              ref={modalImageOverlayRef}
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85"
            />

            {/* Text content */}
            <div
              ref={modalTextRef}
              className="relative z-10 flex h-full flex-col overflow-y-auto p-6 sm:p-8"
              style={{ maxHeight: "82vh" }}
            >
              {/* Category + Year */}
              <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                  {selectedProject.category}
                </span>
                <span>{selectedProject.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-[2rem] font-bold tracking-[-0.04em] text-white sm:text-[2.4rem]">
                {selectedProject.title}
              </h2>

              {/* Tagline */}
              <p className="mt-2 text-base leading-7 text-white/70">
                {selectedProject.tagline}
              </p>

              {/* Divider */}
              <div className="my-5 h-px bg-white/15" />

              {/* Overview */}
              <div className="mb-5">
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Overview
                </h3>
                <p className="text-sm leading-7 text-white/75">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Stack pills */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/8 px-3 py-1 text-[11px] tracking-wide text-white/70"
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
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">{stat.label}</div>
                      <div className="mt-1 text-sm font-medium text-white/85">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* View full project link */}
              <a
                href={`/project?id=${selectedProject.id}`}
                className="mt-2 inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              >
                View full project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
