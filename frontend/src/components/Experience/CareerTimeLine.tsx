"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguageStore } from "@/libs/languageStore";
import { timelineItems } from "@/libs/texts/timeline";
import { X, Code, Briefcase, BookOpen } from "lucide-react";
import type { Variants } from "framer-motion";

function extractYear(dateStr: string, lang: string) {
  if (lang === "ko") {
    const m = dateStr.match(/^(\d{4})\s*년/);
    return m?.[1] ?? "";
  }
  const m = dateStr.match(/(\d{4})$/);
  return m?.[1] ?? "";
}

const CareerTimeline = () => {
  const { lang } = useLanguageStore();
  const data = timelineItems[lang];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>("2024");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredData = React.useMemo(
    () =>
      selectedYear
        ? data.filter((item) => extractYear(item.date, lang) === selectedYear)
        : data,
    [data, selectedYear, lang]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 100, rotateY: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedIndex !== null) setSelectedIndex(null);
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes("developer"))
      return <Briefcase size={20} />;
    if (title.toLowerCase().includes("project")) return <Code size={20} />;
    return <BookOpen size={20} />;
  };

  return (
    <section
      id="work"
      ref={ref}
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500 pointer-events-none z-50"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

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

      <div className="flex justify-center mb-12">
        <div className="flex gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-full shadow-sm">
          {["All", "2024", "2025"].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year === "All" ? null : year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedYear === (year === "All" ? null : year)
                  ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label={
                lang === "en" ? `Filter by ${year}` : `${year}로 필터링`
              }
            >
              {lang === "en" ? year : year === "All" ? "전체" : year}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={scrollLeft}
        className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        aria-label={lang === "en" ? "Scroll left" : "왼쪽으로 스크롤"}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={scrollRight}
        className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        aria-label={lang === "en" ? "Scroll right" : "오른쪽으로 스크롤"}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative"
      >
        <motion.div
          className="absolute top-[60px] left-[calc(50%-50vw)] w-[100vw] h-1
             bg-gradient-to-r from-blue-600 to-teal-600 z-0 origin-left pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="-mx-4 sm:-mx-6">
          <div
            ref={scrollRef}
            className="
              flex gap-4 sm:gap-6 md:gap-8
              overflow-x-auto pb-8 px-4 sm:px-6
              snap-x snap-mandatory              /* ← 오타 수정 */
              touch-pan-x overscroll-x-contain   /* iOS 제스처 안정화 */
              scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
            "
          >
            {filteredData.map((item, index) => {
              const originalIndex = data.findIndex((d) => d === item);
              return (
                <motion.div
                  key={originalIndex}
                  variants={itemVariants}
                  className="relative flex-shrink-0 w-56 sm:w-64 md:w-80 lg:w-96 snap-start"
                  onClick={() => setSelectedIndex(originalIndex)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <p className="text-base sm:text-lg font-medium text-gray-800 text-center">
                    {item.date}
                  </p>
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-14 w-4 h-4 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full z-10"
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-14 h-10 w-0.5 bg-gray-200" />
                  <motion.div
                    className="bg-white p-5 mt-20 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                    whileHover={{ y: -8, rotateX: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-teal-600" />
                    <div className="flex items-center justify-center gap-2">
                      {getCategoryIcon(item.title)}
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-2xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={lang === "en" ? "Close modal" : "모달 닫기"}
              >
                <X size={24} />
              </button>

              <div className="relative">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(data[selectedIndex].title)}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {data[selectedIndex].title}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {data[selectedIndex].date}
                </p>
              </div>

              {data[selectedIndex].detail?.summary && (
                <p className="mt-4 text-gray-700 text-sm sm:text-base">
                  {data[selectedIndex].detail.summary}
                </p>
              )}

              {data[selectedIndex].detail?.stack && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {lang === "en" ? "Tech Stack" : "기술 스택"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data[selectedIndex].detail.stack.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {data[selectedIndex].detail?.learning && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {lang === "en" ? "What I Learned" : "배운 점"}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {data[selectedIndex].detail.learning}
                  </p>
                </div>
              )}

              {data[selectedIndex].detail?.link && (
                <div className="mt-4">
                  <a
                    href={data[selectedIndex].detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {data[selectedIndex].detail.link.includes("github.com")
                      ? "👉 View GitHub Repo"
                      : "👉 View Project"}
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareerTimeline;
