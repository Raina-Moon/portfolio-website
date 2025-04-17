"use client";

import { useLanguageStore } from "@/libs/languageStore";
import React from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { lang, setLang } = useLanguageStore();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ko" : "en");
  };

  const button = {
    langBtn: lang === "en" ? "KOR" : "ENG",
  };

  const handleClickTroubleshooting = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast.info(
      lang === "en"
        ? "Coming soon!"
        : "곧 공개될 예정입니다."
    );
  };  

  return (
    <header
      className="w-full flex items-center justify-between px-2 py-2 sm:px-6 sm:py-4 shadow-sm 
  bg-gradient-to-b from-gray-500/50 to-white/70 backdrop-blur-sm fixed top-0 z-50"
    >
      {" "}
      <nav className="flex gap-2 sm:gap-6">
        <a
          href="#about"
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          About
        </a>
        <a
          href="#work"
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Work
        </a>
        <a
          href="#troubleshooting"
          onClick={handleClickTroubleshooting}
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Troubleshooting
        </a>
        <a
          href="#contact"
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Contact
        </a>
      </nav>
      <button
        onClick={toggleLanguage}
        className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition"
      >
        {button.langBtn}
      </button>
    </header>
  );
};

export default Header;
