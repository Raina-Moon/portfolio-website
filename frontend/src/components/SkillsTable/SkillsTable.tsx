"use client";

import { useLanguageStore } from "@/libs/languageStore";
import { skillsTable } from "@/libs/texts/skills";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

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

  useEffect(() => {
    const handleResize = () => setIsMdOrLarger(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={tableRef} className="w-full px-4 lg:max-w-[900px]">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          My Tech Stack
        </h1>
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="w-full text-sm border border-gray-300 table-fixed rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-white text-left px-4 py-3 border-b border-gray-300">
                  {categoryLabel}
                </th>
                <th className="text-white text-left px-4 py-3 border-b border-gray-300">
                  {frontendLabel}
                </th>
                <th className="text-white text-left px-4 py-3 border-b border-gray-300">
                  {backendLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 3).map((row, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-300 transition-all duration-500 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-6"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.frontend.length > 0 ? row.frontend.join(", ") : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.backend.length > 0 ? row.backend.join(", ") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>

            {isMdOrLarger ? (
              <tbody>
                {rows.slice(3).map((row, index) => (
                  <tr
                    key={index + 3}
                    className={`border-t border-gray-300 transition-all duration-500 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6"
                    }`}
                    style={{
                      transitionDelay: isVisible
                        ? `${(index + 3) * 100}ms`
                        : "0ms",
                    }}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {row.category}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.frontend.length > 0 ? row.frontend.join(", ") : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.backend.length > 0 ? row.backend.join(", ") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={3} className="p-0 border-t border-gray-300">
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
                            <tr
                              key={index + 3}
                              className={`border-t border-gray-300 transition-all duration-500 ease-out ${
                                isVisible && isExpanded
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 -translate-y-6"
                              }`}
                              style={{
                                transitionDelay:
                                  isVisible && isExpanded
                                    ? `${(index + 3) * 100}ms`
                                    : "0ms",
                              }}
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {row.category}
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {row.frontend.length > 0
                                  ? row.frontend.join(", ")
                                  : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {row.backend.length > 0
                                  ? row.backend.join(", ")
                                  : "-"}
                              </td>
                            </tr>
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
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="px-3 py-1 lg:px-4 lg:py-2 border border-gray-600 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition transform hover:scale-105 active:scale-95"
            aria-expanded={isExpanded}
          >
            {isExpanded
              ? lang === "en"
                ? "See Less"
                : "접기"
              : lang === "en"
              ? "See More"
              : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsTable;
