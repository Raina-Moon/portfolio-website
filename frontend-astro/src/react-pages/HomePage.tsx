import ContactForm from "@/components/ContactForm/ContactForm";
import Description from "@/components/Description/Description";
import CareerTimeline from "@/components/Experience/CareerTimeLine";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SkillsTable from "@/components/SkillsTable/SkillsTable";
import { useLanguageStore } from "@/libs/languageStore";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const HomePage = () => {
  const { lang } = useLanguageStore();

  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollMotion = () => {
      rafId = null;
      if (!headerRef.current || !descRef.current) return;

      const scrollY = window.scrollY;
      const headerHeight = headerRef.current.offsetHeight;
      const descOffset = descRef.current.getBoundingClientRect().top;

      const opacity = Math.max(1 - scrollY / (headerHeight * 0.7), 0);
      const translateY = Math.min(scrollY / 10, 30);
      headerRef.current.style.opacity = `${opacity}`;
      headerRef.current.style.transform = `translate3d(0, -${translateY}px, 0)`;

      if (descOffset < headerHeight) {
        const moveUp = Math.min(
          headerHeight - descOffset,
          headerHeight * 0.1
        );
        descRef.current.style.transform = `translate3d(0, -${moveUp}px, 0)`;
      } else {
        descRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateScrollMotion);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const descItems = document.querySelectorAll(".desc-item");
    descItems.forEach((item) => observer.observe(item));

    descItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) {
        item.classList.add("animate-fade-in");
        item.classList.remove("opacity-0");
        observer.unobserve(item);
      }
    });

    updateScrollMotion();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
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
            who believes in persistence, precision, and progress.
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-gray-900">
        <span className="sm:text-lg lg:text-2xl">
          작고 확실한 개선을 통해,
          <span className="md:hidden">
            <br />
          </span>
          더 나은 사용자 경험을 만드는
          <span className="sm:hidden">
            <br />
          </span>
          <span className="text-xl sm:text-2xl lg:text-4xl font-bold">
            프론트엔드 개발자
          </span>
          입니다.
        </span>
      </div>
    );
  };

  return (
    <div id="about" className="flex flex-col items-center justify-center w-full py-20">
      <div ref={headerRef} className="transition-all duration-300 z-10 pb-10">
        <div className="text-center animate-slide-up">
          <strong className="text-[60px] sm:text-[100px] md:text-[120px] lg:text-[170px] xl:text-[200px] text-gray-900">
            Raina M
            <span className="relative inline-block">
              <img
                src="/images/IMG_0523.png"
                alt="profile image"
                width={500}
                height={500}
                className="absolute left-[calc(50%+2px)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120px] sm:w-[200px] md:w-[280px] lg:w-[360px] xl:w-[380px] max-w-none"
              />
              o
            </span>
            on
          </strong>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-center animate-slide-up-delay">{renderTitle()}</h1>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => window.open("https://github.com/Raina-Moon", "_blank")}
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
        <section className="my-6 lg:my-20">
          <Description lang={lang} />
        </section>

        <SkillsTable />

        <div className="mt-16 mb-10 lg:mt-32 flex justify-center items-center px-10">
          <video
            src="/video/portfolio.mp4"
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

export default HomePage;
