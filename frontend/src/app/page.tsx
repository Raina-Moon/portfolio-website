"use client";

import { useLanguageStore } from "@/libs/languageStore";
import { aboutText } from "@/libs/texts/about";
import { skillsTable } from "@/libs/texts/skills";
import Image from "next/image";
import React from "react";

const page = () => {
  const { lang } = useLanguageStore();
  const rows = skillsTable[lang];

  const frontendLabel = lang === "en" ? "Frontend" : "프론트엔드";
  const backendLabel = lang === "en" ? "Backend / Infra" : "백엔드 / 인프라";
  const categoryLabel = lang === "en" ? "Category" : "분류";

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-4 py-20">
      <div className="relative">
        <Image
          src="/images/IMG_0523.png"
          alt="profile image"
          width={380}
          height={380}
          className="absolute top-8 right-[110px]"
        />
        <strong className="text-[200px] text-gray-900">{aboutText.name[lang]}</strong>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h1>{aboutText.title[lang]}</h1>
        <h2>{aboutText.describe[lang]}</h2>
      </div>

      <div className="overflow-x-auto w-full mt-8">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">{categoryLabel}</th>
              <th className="text-left px-4 py-3 border-b">{frontendLabel}</th>
              <th className="text-left px-4 py-3 border-b">{backendLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
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
    </div>
  );
};

export default page;
