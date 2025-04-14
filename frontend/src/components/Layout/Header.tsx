import { useLanguageStore } from "@/libs/languageStore";
import React from "react";

const Header = () => {
  const { lang, setLang } = useLanguageStore();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ko" : "en");
  };

  return <div>Header</div>;
};

export default Header;
