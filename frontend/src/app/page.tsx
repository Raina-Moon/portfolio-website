"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import CareerTimeline from "@/components/Experience/CareerTimeLine";
import { useLanguageStore } from "@/libs/languageStore";
import { skillsTable } from "@/libs/texts/skills";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const page = () => {
  const { lang } = useLanguageStore();
  const rows = skillsTable[lang];

  const frontendLabel = lang === "en" ? "Frontend" : "프론트엔드";
  const backendLabel = lang === "en" ? "Backend / Infra" : "백엔드 / 인프라";
  const categoryLabel = lang === "en" ? "Category" : "분류";

  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && descRef.current) {
        const scrollY = window.scrollY;
        const headerHeight = headerRef.current.offsetHeight;
        const descOffset = descRef.current.getBoundingClientRect().top;

        const opacity = Math.max(1 - scrollY / (headerHeight * 0.7), 0);
        const translateY = Math.min(scrollY / 10, 30);
        headerRef.current.style.opacity = `${opacity}`;
        headerRef.current.style.transform = `translateY(-${translateY}px)`;

        if (descOffset < headerHeight) {
          const moveUp = Math.min(headerHeight - descOffset, headerHeight * 0.5);
          descRef.current.style.transform = `translateY(-${moveUp}px)`;
        } else {
          descRef.current.style.transform = `translateY(0)`;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    const descItems = document.querySelectorAll(".desc-item");
    descItems.forEach((item) => observer.observe(item));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      descItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const renderTitle = () => {
    if (lang === "en") {
      return (
        <div className="flex flex-col items-center text-gray-900">
          <span className="text-xl sm:text-2xl lg:text-4xl font-bold">
            A frontend developer
          </span>
          <span className="sm:text-lg lg:text-2xl">
            {" "}
            who believes in persistence, precision, and progress.
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center text-gray-900">
          <span className="sm:text-lg lg:text-2xl">
            {" "}
            작고 확실한 개선을 통해,
            <span className="md:hidden">
              <br />
            </span>{" "}
            더 나은 사용자 경험을 만드는{" "}
            <span className="sm:hidden">
              <br />
            </span>
            <span className="text-xl sm:text-2xl lg:text-4xl font-bold">
              프론트엔드 개발자
            </span>{" "}
            입니다.
          </span>
        </div>
      );
    }
  };

  const renderDescription = () => {
    if (lang === "en") {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white rounded-3xl animate-fade-in">
            <div className="flex flex-col">
              <img src="/images/image_01.png" className="w-[230px] md:hidden" />
              <p className="leading-relaxed text-gray-700">
                Hi, I'm{" "}
                <span className="font-bold text-primary-600">Raina Moon</span> —
                a <span className="font-bold">frontend developer</span>
                <br /> who thrives on solving{" "}
                <span className="font-semibold">real problems</span>
                <br /> through{" "}
                <span className="underline underline-offset-4">
                  intuitive interfaces
                </span>
                .
              </p>
              <p className="leading-relaxed text-gray-600">
                With experience building projects from the ground up, I focus on{" "}
                <span className="font-semibold">clean design</span>,{" "}
                <span className="font-semibold">solid architecture</span>, and{" "}
                <span className="font-semibold">human-centered UX</span>.
              </p>
            </div>
            <img
              src="/images/image_01.png"
              alt="Developer Icon"
              className="hidden md:block md:w-[230px] lg:block lg:w-[300px]"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl animate-fade-in-delay-100">
            <img
              src="/images/image_02.png"
              alt="Tech Icon"
              className="rounded-xl lg:rounded-3xl w-[230px] lg:w-[300px]"
            />
            <p className="leading-relaxed text-gray-700 font-medium flex-1">
              I build with <span className="font-bold">Next.js</span>,{" "}
              <span className="font-bold">TypeScript</span>, and{" "}
              <span className="font-bold">TailwindCSS</span>, and I'm expanding
              my full-stack skills using{" "}
              <span className="font-bold">Node.js</span> and{" "}
              <span className="font-bold">PostgreSQL</span>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl animate-fade-in-delay-200">
            <img src="/images/image_03.png" className="w-[230px] md:hidden" />
            <p className="leading-relaxed text-gray-600 italic flex-1">
              Recently, I’ve also started learning{" "}
              <span className="font-bold">React Native</span> to explore{" "}
              <span className="italic">mobile development</span>.
            </p>
            <img
              src="/images/image_03.png"
              className="hidden rounded-xl lg:rounded-3xl md:block md:w-[230px] lg:block lg:w-[300px]"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl animate-fade-in-delay">
            <div className="flex flex-col">
              <img src="/images/image_01.png" className="w-[230px] md:hidden" />
              <p className="leading-relaxed text-gray-700 flex-1">
                안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
                <span className="font-bold text-primary-600">
                  프론트엔드 개발자 Raina
                </span>
                입니다.
              </p>
              <p className="leading-relaxed text-gray-600 flex-1">
                다양한 프로젝트를 직접 기획하고 구현하며,{" "}
                <span className="font-semibold">문제 해결</span>과{" "}
                <span className="font-semibold">사용자 경험</span>을 중심으로
                코드를 작성합니다.
              </p>
            </div>
            <img
              src="/images/image_01.png"
              alt="개발자 아이콘"
              className="hidden md:block md:w-[230px] lg:block lg:w-[300px]"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl">
            <img
              src="/images/image_02.png"
              alt="기술 아이콘"
              className="rounded-xl lg:rounded-3xl w-[230px] lg:w-[300px]"
            />
            <p className="leading-relaxed text-gray-700 font-medium flex-1">
              현재는 <span className="font-bold">Next.js</span>,{" "}
              <span className="font-bold">TypeScript</span>,{" "}
              <span className="font-bold">TailwindCSS</span>를 활용해 웹을
              만들고 있으며, <span className="font-bold">Node.js</span>와{" "}
              <span className="font-bold">PostgreSQL</span>로 백엔드 역량도
              키우는 중입니다.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-3xl">
            <img src="/images/image_03.png" className="w-[230px] md:hidden" />
            <p className="leading-relaxed text-gray-600 italic flex-1">
              최근에는 <span className="font-bold">React Native</span>를
              공부하며 <span className="font-bold">모바일 개발</span>에도
              도전하고 있어요.
            </p>
            <img
              src="/images/image_03.png"
              className="hidden rounded-xl lg:rounded-3xl md:block md:w-[230px] lg:block lg:w-[300px]"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center w-full py-20"
    >
      <div ref={headerRef} className="transition-all duration-300 z-10">
        <div className="relative animate-slide-up">
          <Image
            src="/images/IMG_0523.png"
            alt="profile image"
            width={380}
            height={380}
            className="absolute right-[15px] w-[150px] sm:top-2 sm:w-[230px] sm:right-[33px] md:top-4 md:right-[55px] md:w-[250px] lg:w-[340px] lg:top-6 lg:right-[85px] xl:top-8 xl:right-[110px] xl:w-[380px]"
          />
          <strong className="text-[60px] sm:text-[100px] md:text-[120px] lg:text-[170px] xl:text-[200px] text-gray-900">
            Raina Moon
          </strong>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-center animate-slide-up-delay">
            {renderTitle()}
          </h1>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() =>
                window.open("https://github.com/Raina-Moon", "_blank")
              }
              className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition text-sm sm:text-base"
            >
              <FaGithub className="md:text-lg" />
              GitHub
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/daseul-moon-8b064128b/",
                  "_blank"
                )
              }
              className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
            >
              <FaLinkedin className="md:text-lg" />
              LinkedIn
            </button>
          </div>
        </div>
      </div>

      <div
        ref={descRef}
        className="bg-blue-50 my-6 lg:my-20 z-10 transition-transform duration-300 w-full"
      >
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
