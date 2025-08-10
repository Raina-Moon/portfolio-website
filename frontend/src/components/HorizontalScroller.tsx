"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  start?: string; // 필요시 "top top" 등 조정
};

export default function HorizontalScroller({ children, start = "top top" }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const strip = stripRef.current!;

    const ctx = gsap.context(() => {
      // 데스크톱 이상에서만 가로 스크롤 (모바일은 기본 세로)
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const tween = gsap.to(strip, {
            x: () => -(strip.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start,
              end: () => `+=${strip.scrollWidth}`, // 콘텐츠 길이만큼 스크롤
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 리사이즈 시 초기화
          ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(strip, { x: 0 });
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-screen overflow-hidden">
      <div ref={stripRef} className="flex flex-nowrap will-change-transform">
        {children}
      </div>
    </section>
  );
}
