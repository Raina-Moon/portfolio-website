import { useEffect } from "react";
import { create } from "zustand";

export type Language = "en" | "ko";

interface LanguageStore {
  lang: Language;
  hydrated: boolean;
  initialize: () => void;
  setLang: (lang: Language) => void;
}

const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("lang");
  return stored === "ko" ? "ko" : "en";
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: "en",
  hydrated: false,
  initialize: () => {
    if (typeof window === "undefined") return;
    set({ lang: getStoredLanguage(), hydrated: true });
  },
  setLang: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    set({ lang, hydrated: true });
  },
}));

export const useHydratedLanguageStore = () => {
  const lang = useLanguageStore((state) => state.lang);
  const hydrated = useLanguageStore((state) => state.hydrated);
  const initialize = useLanguageStore((state) => state.initialize);
  const setLang = useLanguageStore((state) => state.setLang);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { lang, hydrated, setLang };
};
