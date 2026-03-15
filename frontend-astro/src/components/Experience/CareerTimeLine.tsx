"use client";

import React, { useState, useMemo, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHydratedLanguageStore } from "@/libs/languageStore";
import { timelineItems, type TimelineItem } from "@/libs/texts/timeline";
import { Timeline } from "@/components/ui/timeline";
import { useOutsideClick } from "@/hooks/use-outside-click";
import TimelineCard from "./TimelineCard";
import ExpandedCard from "./ExpandedCard";

function extractYear(dateStr: string, lang: string) {
  if (lang === "ko") {
    const m = dateStr.match(/^(\d{4})\s*년/);
    return m?.[1] ?? "";
  }
  const m = dateStr.match(/(\d{4})$/);
  return m?.[1] ?? "";
}

const CareerTimeline = () => {
  const { lang } = useHydratedLanguageStore();
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
          <TimelineCard
            key={originalIndex}
            item={item}
            index={originalIndex}
            id={id}
            lang={lang}
            onClick={() => setActive({ item, index: originalIndex })}
          />
        ))}
      </div>
    ),
  }));

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto bg-slate-50/80 border border-slate-200/70 rounded-3xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(20,184,166,0.10),_transparent_55%)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-12"
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

      <div className="relative z-10">
        <Timeline data={timelineData} />
      </div>

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
          <ExpandedCard
            item={active.item}
            index={active.index}
            id={id}
            lang={lang}
            onClose={() => setActive(null)}
            expandedRef={expandedRef}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default CareerTimeline;
