"use client";

import { useLanguageStore } from "@/libs/languageStore";
import { skillsTable } from "@/libs/texts/skills";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const SkillsTable = () => {
  const { lang } = useLanguageStore();
  const rows = skillsTable[lang];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const extraRowsContainerRef = useRef<HTMLDivElement>(null);
  const [extraRowsHeight, setExtraRowsHeight] = useState(0);

  const frontendLabel = lang === "en" ? "Frontend" : "프론트엔드";
  const backendLabel = lang === "en" ? "Backend / Infra" : "백엔드 / 인프라";
  const categoryLabel = lang === "en" ? "Category" : "분류";

  // Resize handler with debouncing
  useEffect(() => {
    const handleResize = debounce(() => setIsMdOrLarger(window.innerWidth >= 768), 200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    if (!tableRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (extraRowsContainerRef.current) {
      setExtraRowsHeight(extraRowsContainerRef.current.scrollHeight);
    }
  }, [isExpanded, rows]);

  // Debounce function
  function debounce<F extends (...args: unknown[]) => void>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={tableRef} className="w-full px-4 lg:max-w-[900px]">
        <motion.h1
          className="text-3xl font-bold text-center text-gray-900 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My Tech Stack
        </motion.h1>
        <div className="overflow-hidden rounded-lg shadow-md bg-white">
          <table className="w-full text-sm border border-gray-200 table-fixed rounded-lg">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
              <tr>
                <th className="text-white text-left px-4 py-3 border-b border-gray-200">
                  {categoryLabel}
                </th>
                <th className="text-white text-left px-4 py-3 border-b border-gray-200">
                  {frontendLabel}
                </th>
                <th className="text-white text-left px-4 py-3 border-b border-gray-200">
                  {backendLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 3).map((row, index) => (
                <motion.tr
                  key={index}
                  className="border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{row.category}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.frontend.length > 0 ? row.frontend.join(", ") : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.backend.length > 0 ? row.backend.join(", ") : "-"}
                  </td>
                </motion.tr>
              ))}
            </tbody>

            {isMdOrLarger ? (
              <tbody>
                {rows.slice(3).map((row, index) => (
                  <motion.tr
                    key={index + 3}
                    className="border-t border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{row.category}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.frontend.length > 0 ? row.frontend.join(", ") : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.backend.length > 0 ? row.backend.join(", ") : "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={3} className="p-0 border-t border-gray-200">
                    <div
                      ref={extraRowsContainerRef}
                      style={{
                        maxHeight: isExpanded ? `${extraRowsHeight}px` : "0px",
                        overflow: "hidden",
                        transition: "max-height 500ms ease",
                      }}
                    >
                      <table className="w-full text-sm table-fixed">
                        <tbody>
                          {rows.slice(3).map((row, index) => (
                            <motion.tr
                              key={index + 3}
                              className="border-t border-gray-200"
                              initial={{ opacity: 0, y: 20 }}
                              animate={isVisible && isExpanded ? { opacity: 1, y: 0 } : {}}
                              transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">{row.category}</td>
                              <td className="px-4 py-3 text-gray-700">
                                {row.frontend.length > 0 ? row.frontend.join(", ") : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {row.backend.length > 0 ? row.backend.join(", ") : "-"}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {!isMdOrLarger && rows.length > 3 && (
        <motion.button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-4 px-4 py-2 border border-gray-600 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition transform hover:scale-105 active:scale-95"
          aria-expanded={isExpanded}
          aria-controls="extra-rows"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isExpanded
            ? lang === "en"
              ? "See Less"
              : "접기"
            : lang === "en"
            ? "See More"
            : "더 보기"}
        </motion.button>
      )}
    </div>
  );
};

export default SkillsTable;