"use client";

import React, { useState, useMemo, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/libs/languageStore";
import { timelineItems, type TimelineItem } from "@/libs/texts/timeline";
import { Code, Briefcase, BookOpen } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { useOutsideClick } from "@/hooks/use-outside-click";

function extractYear(dateStr: string, lang: string) {
  if (lang === "ko") {
    const m = dateStr.match(/^(\d{4})\s*년/);
    return m?.[1] ?? "";
  }
  const m = dateStr.match(/(\d{4})$/);
  return m?.[1] ?? "";
}

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

const getCategoryIcon = (title: string) => {
  if (title.toLowerCase().includes("developer"))
    return <Briefcase size={20} />;
  if (title.toLowerCase().includes("project")) return <Code size={20} />;
  return <BookOpen size={20} />;
};

const CareerTimeline = () => {
  const { lang } = useLanguageStore();
  const data = timelineItems[lang];
  const [active, setActive] = useState<{
    item: TimelineItem;
    index: number;
  } | null>(null);
  const id = useId();
  const expandedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(expandedRef, () => setActive(null));

  const yearGroups = useMemo(() => {
    const groups: {
      year: string;
      items: { item: (typeof data)[0]; originalIndex: number }[];
    }[] = [];
    const seen = new Map<string, number>();

    data.forEach((item, idx) => {
      const year = extractYear(item.date, lang);
      if (seen.has(year)) {
        groups[seen.get(year)!].items.push({ item, originalIndex: idx });
      } else {
        seen.set(year, groups.length);
        groups.push({ year, items: [{ item, originalIndex: idx }] });
      }
    });

    return groups;
  }, [data, lang]);

  const timelineData = yearGroups.map((group) => ({
    title: group.year,
    content: (
      <div className="pb-8">
        {group.items.map(({ item, originalIndex }) => (
          <motion.div
            layoutId={`card-${originalIndex}-${id}`}
            key={originalIndex}
            onClick={() => setActive({ item, index: originalIndex })}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center md:items-start">
              <motion.div
                layoutId={`icon-${originalIndex}-${id}`}
                className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 text-white shrink-0"
              >
                {getCategoryIcon(item.title)}
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${originalIndex}-${id}`}
                  className="font-medium text-neutral-800 text-center md:text-left"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${originalIndex}-${id}`}
                  className="text-neutral-600 text-sm text-center md:text-left"
                >
                  {item.shortDescription}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${originalIndex}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 hover:text-white text-black mt-4 md:mt-0 shrink-0"
            >
              {lang === "en" ? "Details" : "상세보기"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    ),
  }));

  return (
    <section
      id="work"
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          My Path in Frontend Development
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {lang === "en"
            ? "Explore the projects and experiences that highlight my expertise in creating intuitive, high-performance, and visually appealing user interfaces."
            : "직관적이고 성능이 뛰어나며, 시각적으로 매력적인 사용자 인터페이스를 구현한 저의 프로젝트와 경험을 살펴보세요."}
        </p>
      </motion.div>

      <Timeline data={timelineData} />

      {/* Expandable Card Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-close-${active.index}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.index}-${id}`}
              ref={expandedRef}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
            >
              {/* Icon header */}
              <motion.div
                layoutId={`icon-${active.index}-${id}`}
                className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-600 to-teal-600 text-white"
              >
                <div className="scale-[3]">
                  {getCategoryIcon(active.item.title)}
                </div>
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.index}-${id}`}
                      className="font-bold text-neutral-700"
                    >
                      {active.item.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.index}-${id}`}
                      className="text-neutral-600 text-sm"
                    >
                      {active.item.date}
                    </motion.p>
                  </div>

                  {active.item.detail?.link && (
                    <motion.a
                      layoutId={`button-${active.index}-${id}`}
                      href={active.item.detail.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-white shrink-0"
                    >
                      {active.item.detail.link.includes("github.com")
                        ? "GitHub"
                        : lang === "en"
                          ? "Visit"
                          : "방문"}
                    </motion.a>
                  )}
                  {!active.item.detail?.link && (
                    <motion.span
                      layoutId={`button-${active.index}-${id}`}
                      className="px-4 py-3 text-sm rounded-full font-bold bg-gray-100 text-gray-400 shrink-0"
                    >
                      {lang === "en" ? "Details" : "상세보기"}
                    </motion.span>
                  )}
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.item.detail?.summary && (
                      <p>{active.item.detail.summary}</p>
                    )}

                    {active.item.detail?.stack && (
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-2">
                          {lang === "en" ? "Tech Stack" : "기술 스택"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {active.item.detail.stack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {active.item.detail?.learning && (
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-2">
                          {lang === "en" ? "What I Learned" : "배운 점"}
                        </h4>
                        <p>{active.item.detail.learning}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default CareerTimeline;
