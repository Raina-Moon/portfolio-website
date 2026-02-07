import { create } from "zustand";

export type Language = "en" | "ko";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang:
    typeof window !== "undefined"
      ? (localStorage.getItem("lang") as Language) || "en"
      : "en",
  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },
}));
