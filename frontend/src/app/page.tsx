"use client";

import ContactForm from "@/components/ContactForm/ContactForm";
import Description from "@/components/Description/Description";
import CareerTimeline from "@/components/Experience/CareerTimeLine";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SkillsTable from "@/components/SkillsTable/SkillsTable";
import { useLanguageStore } from "@/libs/languageStore";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const page = () => {
  const { lang } = useLanguageStore();

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
          const moveUp = Math.min(
            headerHeight - descOffset,
            headerHeight * 0.1
          );
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
            observer.unobserve(entry.target); // Stop observing once the element is in view
          }
        });
      },
      { threshold: 0.2 }
    );

    const descItems = document.querySelectorAll(".desc-item");
    descItems.forEach((item) => observer.observe(item));

    // Initial check for items already in viewport
    descItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) {
        item.classList.add("animate-fade-in");
        item.classList.remove("opacity-0");
        observer.unobserve(item);
      }
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      descItems.forEach((item) => observer.unobserve(item));
    };
  }, [lang]);

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

  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center w-full py-20"
    >
      <div ref={headerRef} className="transition-all duration-300 z-10 pb-10">
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

      <div className="flex flex-col gap-4 lg:gap-6 w-full">
        <div
          ref={descRef}
          className="bg-blue-50 my-6 lg:my-20 z-10 transition-transform duration-300 w-full"
        >
          <div className="pt-10 pb-20 lg:pt-20 lg:pb-40">
            {" "}
            <Description lang={lang} />
          </div>
        </div>

        <SkillsTable />

        <div className="mt-16 mb-10 lg:mt-32 flex justify-center items-center px-10">
          <video
            src="video/portfolio.mp4"
            loop
            muted
            autoPlay
            className="rounded-2xl w-full max-w-[800px]"
          />
        </div>
        <CareerTimeline />

        <ContactForm />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default page;
