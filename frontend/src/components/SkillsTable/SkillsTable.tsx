"use client";

import { useLanguageStore } from "@/libs/languageStore";
import { skillsTable } from "@/libs/texts/skills";
import React, { useState } from "react";

const SkillsTable = () => {
  const { lang } = useLanguageStore();
  const rows = skillsTable[lang];
  const [isExpanded, setIsExpanded] = useState(false);

  const frontendLabel = lang === "en" ? "Frontend" : "프론트엔드";
  const backendLabel = lang === "en" ? "Backend / Infra" : "백엔드 / 인프라";
  const categoryLabel = lang === "en" ? "Category" : "분류";

  const visibleRows = window.innerWidth >= 768 || isExpanded ? rows : rows.slice(0, 3);

  return (
    <div className="w-full mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">{categoryLabel}</th>
              <th className="text-left px-4 py-3 border-b">{frontendLabel}</th>
              <th className="text-left px-4 py-3 border-b">{backendLabel}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => (
              <tr key={index} className="border-t">
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
        </table>
      </div>
      {rows.length > 3 && (
        <div className="md:hidden mt-4 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
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
