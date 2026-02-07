"use client";

import { useLanguageStore } from "@/libs/languageStore";
import React, { useEffect, useState } from "react";

const Header = () => {
  const { lang, setLang } = useLanguageStore();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 0 at top, 1 when scrolled 150px+
      const progress = Math.min(window.scrollY / 150, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToHome = (hash: string) => {
    if (window.location.pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${hash}`;
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ko" : "en");
  };

  // Gradually interpolate from full width to min width
  const width = 100 - scrollProgress * 15; // 100% -> 85%
  const borderRadius = scrollProgress * 4; // 0rem -> 4rem
  const translateY = scrollProgress * 10; // 0px -> 10px
  const shadowOpacity = scrollProgress * 0.1; // 0 -> 0.1

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto w-full box-border flex items-center justify-between overflow-hidden bg-white/50 px-2.5 py-2 backdrop-blur-sm sm:px-4 md:px-5 md:py-2.5 lg:px-6 lg:py-3"
        style={{
          width: `${width}%`,
          maxWidth: "100%",
          borderRadius: `${borderRadius}rem`,
          transform: `translateY(${translateY}px)`,
          boxShadow: `0 4px 30px rgba(0, 0, 0, ${shadowOpacity})`,
          transition: "none",
        }}
      >
        <a
          href="/"
          className="max-[389px]:hidden text-[12px] font-semibold text-neutral-800 transition hover:text-black whitespace-nowrap sm:text-sm md:text-base lg:text-lg"
        >
          Raina To The Moon
        </a>

        <div className="flex min-w-0 items-center gap-0 sm:gap-1 md:gap-1.5 lg:gap-2">
          <button
            onClick={() => navigateToHome("about")}
            className="relative px-1 py-1 text-[11px] text-neutral-700 transition hover:text-black sm:px-2 sm:text-sm md:px-2.5 md:text-base"
          >
            About
          </button>
          <button
            onClick={() => navigateToHome("work")}
            className="relative px-1 py-1 text-[11px] text-neutral-700 transition hover:text-black sm:px-2 sm:text-sm md:px-2.5 md:text-base"
          >
            Work
          </button>
          <button
            onClick={() => (window.location.href = "/troubleshooting")}
            className="relative px-1 py-1 text-[11px] text-neutral-700 transition hover:text-black sm:px-2 sm:text-sm md:px-2.5 md:text-base"
          >
            <span className="sm:hidden">Trouble</span>
            <span className="hidden sm:inline">Troubleshooting</span>
          </button>
          <button
            onClick={() => navigateToHome("contact")}
            className="relative px-1 py-1 text-[11px] text-neutral-700 transition hover:text-black sm:px-2 sm:text-sm md:px-2.5 md:text-base"
          >
            Contact
          </button>
          <span className="mx-0.5 h-4 w-px bg-neutral-300 md:h-5" />
          <button
            onClick={toggleLanguage}
            className="rounded-md px-1 py-1 text-[10px] text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 sm:px-2 sm:text-xs md:text-sm"
          >
            {lang === "en" ? "KOR" : "ENG"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
