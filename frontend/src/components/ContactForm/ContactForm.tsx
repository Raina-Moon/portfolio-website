"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { sendContactMessage } from "@/libs/api/contact";
import { Send, XCircle } from "lucide-react";
import { useLanguageStore } from "@/libs/languageStore";

const ContactForm = () => {
  const { lang } = useLanguageStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false });
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: !isValidEmail(value) && value !== "" }));
    }
    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      toast.error(lang === "en" ? "Please enter a valid email address." : "유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await sendContactMessage(form);
      toast.success(
        lang === "en"
          ? "Thanks for reaching out! I’ll reply as soon as I can."
          : "연락해 주셔서 감사합니다! 가능한 빨리 답장하겠습니다.",
        {
          className: "bg-gradient-to-r from-blue-600 to-teal-600 text-white",
        }
      );
      setForm({ name: "", email: "", subject: "", message: "" });
      setCharCount(0);
    } catch {
      toast.error(lang === "en" ? "Failed to send message." : "메시지 전송에 실패했습니다.", {
        className: "bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({ email: false });
    setCharCount(0);
  };

  // Keyboard navigation for clear button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && formRef.current) {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Language-specific text
  const text = {
    en: {
      description:
        "Got a project in mind or just want to connect? Drop me a message, and let’s create something amazing together!",
      labels: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
      },
      buttons: {
        send: "Send Message",
        clear: "Clear Form",
      },
      charCount: `${charCount}/500`,
      errors: {
        email: "Please enter a valid email address.",
      },
    },
    ko: {
      description:
    "프로젝트 상담부터 가벼운 문의까지 모두 환영합니다. 메시지를 남겨주시면 최대한 빠르게 답변드리겠습니다.",
      labels: {
        name: "이름",
        email: "이메일",
        subject: "제목",
        message: "메시지",
      },
      buttons: {
        send: "메시지 보내기",
        clear: "초기화",
      },
      charCount: `${charCount}/500`,
      errors: {
    email: "올바른 이메일 주소를 입력해 주세요.",
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 max-w-full mx-auto flex flex-col items-center justify-center scroll-mt-20"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl -z-10"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Contact Me
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {text[lang].description}
        </p>
      </motion.div>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
      >
        {/* Name Field */}
        <motion.div variants={fieldVariants} className="relative">
          <input
            required
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="peer w-full border border-gray-200 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-600 transition-all duration-300"
            placeholder=" "
            aria-describedby="name-error"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-3 text-sm sm:text-base text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            {text[lang].labels.name}
          </label>
        </motion.div>

        {/* Email Field */}
        <motion.div variants={fieldVariants} className="relative">
          <input
            required
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`peer w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-transparent focus:ring-2 transition-all duration-300 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-600"
            }`}
            placeholder=" "
            aria-invalid={errors.email}
            aria-describedby="email-error"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-sm sm:text-base text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            {text[lang].labels.email}
          </label>
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">
              {text[lang].errors.email}
            </p>
          )}
        </motion.div>

        {/* Subject Field */}
        <motion.div variants={fieldVariants} className="relative">
          <input
            required
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="peer w-full border border-gray-200 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-600 transition-all duration-300"
            placeholder=" "
            aria-describedby="subject-error"
          />
          <label
            htmlFor="subject"
            className="absolute left-4 top-3 text-sm sm:text-base text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            {text[lang].labels.subject}
          </label>
        </motion.div>

        {/* Message Field */}
        <motion.div variants={fieldVariants} className="relative">
          <textarea
            required
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="peer w-full border border-gray-200 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-600 transition-all duration-300 resize-none"
            placeholder=" "
            aria-describedby="message-error"
            maxLength={500}
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-3 text-sm sm:text-base text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-blue-600"
          >
            {text[lang].labels.message}
          </label>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {text[lang].charCount}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={fieldVariants} className="flex justify-center gap-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={text[lang].buttons.send}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.span>
            ) : (
              <>
                <Send size={18} />
                {text[lang].buttons.send}
              </>
            )}
          </motion.button>
          <motion.button
            type="button"
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg flex items-center gap-2 text-sm sm:text-base hover:bg-gray-300 transition-colors"
            aria-label={text[lang].buttons.clear}
          >
            <XCircle size={18} />
            {text[lang].buttons.clear}
          </motion.button>
        </motion.div>
      </motion.form>

      {/* Branding Watermark */}
      <motion.p
        variants={fieldVariants}
        className="mt-6 text-xs text-gray-500 text-center"
      >
        Developed By Raina
      </motion.p>
    </section>
  );
};

export default ContactForm;