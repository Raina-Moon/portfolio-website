"use client";

import { useLanguageStore } from "@/libs/languageStore";
import React from "react";

const Header = () => {
  const { lang, setLang } = useLanguageStore();

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

  const button = {
    langBtn: lang === "en" ? "KOR" : "ENG",
  };

  return (
    <header
      className="w-full flex items-center justify-between px-2 py-2 sm:px-6 sm:py-4 shadow-sm 
  bg-gradient-to-b from-gray-500/50 to-white/70 backdrop-blur-sm fixed top-0 z-50"
    >
      {" "}
      <nav className="flex gap-2 sm:gap-6">
        <button
          onClick={() => navigateToHome("about")}
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          About
        </button>
        <button
          onClick={() => navigateToHome("work")}
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Work
        </button>
        <button
          onClick={() => (window.location.href = "/troubleshooting")}
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Troubleshooting
        </button>
        <button
          onClick={() => navigateToHome("contact")}
          className="text-gray-800 hover:text-blue-600 font-medium text-sm sm:text-base"
        >
          Contact
        </button>
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
