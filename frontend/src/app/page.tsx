"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import CareerTimeline from "@/components/Experience/CareerTimeLine";
import { useLanguageStore } from "@/libs/languageStore";
import { skillsTable } from "@/libs/texts/skills";
import Image from "next/image";
import React from "react";

const page = () => {
  const { lang } = useLanguageStore();
  const rows = skillsTable[lang];

  const frontendLabel = lang === "en" ? "Frontend" : "프론트엔드";
  const backendLabel = lang === "en" ? "Backend / Infra" : "백엔드 / 인프라";
  const categoryLabel = lang === "en" ? "Category" : "분류";

  const renderTitle = () => {
    if (lang === "en") {
      return (
        <div className="flex flex-col items-center text-gray-900">
          <span className="text-4xl font-bold">A frontend developer</span>
          <span className="text-2xl">
            {" "}
            who believes in persistence, precision, and progress.
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center text-gray-900">
          <span className="text-2xl">
            {" "}
            작고 확실한 개선을 통해, 더 나은 사용자 경험을 만드는{" "}
            <span className="text-4xl font-bold">프론트엔드 개발자</span>{" "}
            입니다.
          </span>
        </div>
      );
    }
  };

  const renderDescription = () => {
    if (lang === "en") {
      return (
        <p className="leading-relaxed text-gray-700">
          Hi, I'm <span className="font-bold text-primary-600">Raina Moon</span> — a{" "}
          <span className="font-bold">frontend developer</span> who thrives on solving{" "}
          <span className="font-semibold">real problems</span> through{" "}
          <span className="underline underline-offset-4">intuitive interfaces</span>.{" "}
          <br/>
          With experience building projects from the ground up, I focus on{" "}
          <span className="font-semibold">clean design</span>,{" "}
          <span className="font-semibold">solid architecture</span>, and{" "}
          <span className="font-semibold">human-centered UX</span>.{" "}
          <br/>
          I build with{" "}
          <span className="font-bold">Next.js</span>,{" "}
          <span className="font-bold">TypeScript</span>, and{" "}
          <span className="font-bold">TailwindCSS</span>, and I'm expanding
          my full-stack skills using{" "}
          <span className="font-bold">Node.js</span> and{" "}
          <span className="font-bold">PostgreSQL</span>. <br/> Recently, I’ve also started
          learning <span className="font-bold">React Native</span> to
          explore <span className="italic">mobile development</span>.
        </p>
      );
    } else {
      return (
        <p className="leading-relaxed text-gray-700">
          안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
          <span className="font-bold text-primary-600">프론트엔드 개발자 Raina</span>
          입니다. <br/> 다양한 프로젝트를 직접 기획하고 구현하며,{" "}
          <span className="font-semibold">문제 해결</span>과{" "}
          <span className="font-semibold">사용자 경험</span>을 중심으로 코드를
          작성합니다. <br/> 현재는{" "}
          <span className="font-bold">Next.js</span>,{" "}
          <span className="font-bold">TypeScript</span>,{" "}
          <span className="font-bold">TailwindCSS</span>를 활용해 웹을
          만들고 있으며, <span className="font-bold">Node.js</span>와{" "}
          <span className="font-bold">PostgreSQL</span>로 백엔드 역량도 키우는 중입니다.{" "}
          <br/> 최근에는 <span className="font-bold">React Native</span>를
          공부하며 <span className="font-bold">모바일 개발</span>에도 도전하고 있어요.
        </p>
      );
    }
  };

  return (
    <div id="about" className="flex flex-col items-center justify-center w-full px-4 py-20">
      <div className="relative">
        <Image
          src="/images/IMG_0523.png"
          alt="profile image"
          width={380}
          height={380}
          className="absolute top-8 right-[110px]"
        />
        <strong className="text-[200px] text-gray-900">
        Raina Moon
        </strong>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center">{renderTitle()}</h1>
        <h2 className="pt-10">{renderDescription()}</h2>
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

      <CareerTimeline />

      <ContactForm />
    </div>
  );
};

export default page;
