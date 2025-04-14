"use client";

import { useLanguageStore } from "@/libs/languageStore";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { lang, setLang } = useLanguageStore();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ko" : "en");
  };

  const button = {
    langBtn: lang === "en" ? "KOR" : "ENG",
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white fixed top-0 z-50">
      <nav className="flex gap-6">
        <Link
          href="#about"
          className="text-gray-800 hover:text-blue-600 font-medium"
        >
          About
        </Link>
        <Link
          href="#work"
          className="text-gray-800 hover:text-blue-600 font-medium"
        >
          Work
        </Link>
        <Link
          href="#troubleshooting"
          className="text-gray-800 hover:text-blue-600 font-medium"
        >
          Troubleshooting
        </Link>
        <Link
          href="#contact"
          className="text-gray-800 hover:text-blue-600 font-medium"
        >
          Contact
        </Link>
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
