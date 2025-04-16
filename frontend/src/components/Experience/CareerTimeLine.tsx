"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/libs/languageStore";
import { timelineItems } from "@/libs/texts/timeline";

const CareerTimeline = () => {
  const { lang } = useLanguageStore();
  const data = timelineItems[lang];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>("2024");

  const filteredData = selectedYear
    ? data.filter((item) =>
        lang === "ko"
          ? item.date.split("년")[0] === selectedYear
          : item.date.split(" ")[2] === selectedYear
      )
    : data;

  return (
    <section
      id="work"
      className="py-28 px-4 lg:pt-40 lg:pb-52 max-w-full overflow-x-auto"
    >
      <div className="flex justify-between items-center mb-12">
        <h2 className="lg:ml-8 text-xl md:text-3xl font-bold text-center text-gray-900">
          {lang === "en" ? "Career Timeline" : "커리어 타임라인"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
              selectedYear === null
                ? "bg-gray-800 text-white"
                : "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {lang === "en" ? "All" : "전체"}
          </button>
          <button
            onClick={() => setSelectedYear("2024")}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
              selectedYear === "2024"
                ? "bg-gray-800 text-white"
                : "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`}
          >
            2024
          </button>
          <button
            onClick={() => setSelectedYear("2025")}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
              selectedYear === "2025"
                ? "bg-gray-800 text-white"
                : "border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`}
          >
            2025
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Horizon line */}
        <div className="absolute top-[44px] left-0 right-0 h-1 bg-gray-800 z-0" />

        <div className="flex gap-12 overflow-x-auto pb-6 pl-6 pr-6">
          {filteredData.map((item, index) => {
            const originalIndex = data.findIndex(
              (dataItem) => dataItem === item
            );
            return (
              <div
                key={originalIndex}
                className="relative flex-shrink-0 w-64"
                onClick={() => setSelectedIndex(originalIndex)}
              >
                <p className="text-lg text-gray-800 text-center">{item.date}</p>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-10 w-4 h-4 bg-gray-800 rounded-full z-10" />
                <div className="bg-white p-4 mt-12 shadow-md rounded-lg border border-gray-200 hover:-translate-y-2 hover:shadow-lg transition-transform duration-300 cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    {item.shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, y: -20 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.7, y: -10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2">
                {data[selectedIndex].title}
              </h2>
              <p className="text-sm text-gray-500">
                {data[selectedIndex].date}
              </p>
              <p className="mt-4 text-gray-700">
                {data[selectedIndex].detail?.summary}
              </p>
              {data[selectedIndex].detail?.stack && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Tech Stack:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {data[selectedIndex].detail.stack.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}
              {data[selectedIndex].detail?.learning && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    What I learned:
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
                    className="text-blue-600 text-sm hover:underline"
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
