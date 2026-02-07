import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface DescriptionItemProps {
  imageSrc: string;
  imageAlt: string;
  textContent: React.ReactNode;
  isMobileImageHidden?: boolean;
  isImageLeft?: boolean;
  imageClassName?: string;
  containerClassName?: string;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({
  imageSrc,
  imageAlt,
  textContent,
  isMobileImageHidden = false,
  isImageLeft = false,
  imageClassName = "",
  containerClassName = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const kx = dx !== 0 ? cx / Math.abs(dx) : Number.POSITIVE_INFINITY;
    const ky = dy !== 0 ? cy / Math.abs(dy) : Number.POSITIVE_INFINITY;
    const edge = Math.min(kx, ky);
    const closeness = Math.max(0, Math.min(1, 1 / edge)); // 0~1

    el.style.setProperty("--pointer-x", `${px.toFixed(2)}%`);
    el.style.setProperty("--pointer-y", `${py.toFixed(2)}%`);
    el.style.setProperty("--pointer-°", `${angle.toFixed(2)}deg`);
    el.style.setProperty("--pointer-d", `${(closeness * 100).toFixed(2)}`);
    el.classList.remove("glow-animating");
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--pointer-d", "0");
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`glow-card desc-item flex flex-col md:grid md:grid-cols-2 items-center justify-center gap-6 px-5 py-6 lg:gap-10 lg:px-14 lg:py-10 bg-gradient-to-br from-white/5 to-gray-50/5 rounded-3xl shadow-lg max-w-[900px] ${containerClassName} relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}

      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 바깥쪽 글로우 레이어 */}
      <span className="glow" aria-hidden />

      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className={`w-[230px] md:w-full ${
          isMobileImageHidden ? "rounded-xl md:hidden" : "rounded-xl md:rounded-2xl"
        } ${imageClassName}`}
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ duration: 0.3 }}
      />

      {isImageLeft ? (
        <>
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className={`hidden md:block md:w-full lg:w-full ${imageClassName}`}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex flex-col gap-2 leading-relaxed">{textContent}</div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 leading-relaxed">{textContent}</div>
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className={`hidden md:block md:w-full lg:w-full ${imageClassName}`}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
};

interface DescriptionProps {
  lang: "en" | "ko";
  mode?: "vertical" | "horizontal";
}

const Description: React.FC<DescriptionProps> = ({
  lang,
  mode = "vertical",
}) => {
const slideClass = "w-full mx-auto px-5 md:px-10";
  
  if (mode === "horizontal") {
    return (
      <>
        {lang === "en" ? (
          <>
            <DescriptionItem
              imageSrc="/images/image_01.png"
              imageAlt="Developer Icon"
              isMobileImageHidden
              containerClassName={slideClass}
              textContent={
                <div className="flex flex-col gap-2">
                  <p className="leading-relaxed text-gray-200 text-lg md:text-xl">
                    Hi, I&#39;m{" "}
                    <span
                      className="font-bold text-gray-200"
                      style={{ textShadow: "0 0 5px rgba(97, 157, 253, 0.7)" }}
                    >
                      Raina Moon
                    </span>
                    — a <span className="font-bold">frontend developer</span>{" "}
                    who thrives on solving{" "}
                    <span className="font-semibold">real problems</span> through{" "}
                    <span className="underline underline-offset-4">
                      intuitive interfaces
                    </span>
                    .
                  </p>
                  <p className="leading-relaxed text-gray-200 md:text-lg">
                    With experience building projects from the ground up, I
                    focus on <span className="font-semibold">clean design</span>
                    , <span className="font-semibold">solid architecture</span>,
                    and <span className="font-semibold">human-centered UX</span>
                    .
                  </p>
                </div>
              }
            />
            <DescriptionItem
              imageSrc="/images/image_02.png"
              imageAlt="Tech Icon"
              isMobileImageHidden
              isImageLeft
              imageClassName="rounded-xl lg:rounded-3xl"
              containerClassName={slideClass}
              textContent={
                <p className="leading-relaxed text-gray-200 font-medium text-lg md:text-xl flex-1">
                  I build with <span className="font-bold">Next.js</span>,{" "}
                  <span className="font-bold">TypeScript</span>, and{" "}
                  <span className="font-bold">TailwindCSS</span>, and I&#39;m
                  expanding my full-stack skills using{" "}
                  <span className="font-bold">Node.js</span> and{" "}
                  <span className="font-bold">PostgreSQL</span>.
                </p>
              }
            />
            <DescriptionItem
              imageSrc="/images/image_03.png"
              imageAlt="Mobile Icon"
              isMobileImageHidden
              imageClassName="rounded-xl lg:rounded-3xl"
              containerClassName={slideClass}
              textContent={
                <p className="leading-relaxed text-gray-200 italic text-lg md:text-xl flex-1">
                  Recently, I&#39;ve also started learning{" "}
                  <span className="font-bold">React Native</span> to explore{" "}
                  <span className="italic">mobile development</span>.
                </p>
              }
            />
          </>
        ) : (
          <>
            <DescriptionItem
              imageSrc="/images/image_01.png"
              imageAlt="개발자 아이콘"
              isMobileImageHidden
              containerClassName={slideClass}
              textContent={
                <div className="flex flex-col gap-2">
                  <p className="leading-relaxed text-gray-200 text-lg md:text-xl flex-1">
                    안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
                    <span className="font-bold text-primary-600">
                      프론트엔드 개발자 Raina
                    </span>
                    입니다.
                  </p>
                  <p className="leading-relaxed text-gray-200 text-lg md:text-xl flex-1">
                    다양한 프로젝트를 직접 기획하고 구현하며,{" "}
                    <span className="font-semibold">문제 해결</span>과{" "}
                    <span className="font-semibold">사용자 경험</span>을
                    중심으로 코드를 작성합니다.
                  </p>
                </div>
              }
            />
            <DescriptionItem
              imageSrc="/images/image_02.png"
              imageAlt="기술 아이콘"
              isMobileImageHidden
              isImageLeft
              imageClassName="rounded-xl lg:rounded-3xl"
              containerClassName={slideClass}
              textContent={
                <p className="leading-relaxed text-gray-200 font-medium text-lg md:text-xl flex-1">
                  현재는 <span className="font-bold">Next.js</span>,{" "}
                  <span className="font-bold">TypeScript</span>,{" "}
                  <span className="font-bold">TailwindCSS</span>를 활용해 웹을
                  만들고 있으며, <span className="font-bold">Node.js</span>와{" "}
                  <span className="font-bold">PostgreSQL</span>로 백엔드 역량도
                  키우는 중입니다.
                </p>
              }
            />
            <DescriptionItem
              imageSrc="/images/image_03.png"
              imageAlt="모바일 아이콘"
              isMobileImageHidden
              imageClassName="rounded-xl lg:rounded-3xl"
              containerClassName={slideClass}
              textContent={
                <p className="leading-relaxed text-gray-200 italic text-lg md:text-xl flex-1">
                  최근에는 <span className="font-bold">React Native</span>를
                  공부하며 <span className="font-bold">모바일 개발</span>에도
                  도전하고 있어요.
                </p>
              }
            />
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-5 md:mx-10 gap-8 lg:gap-12">
      {lang === "en" ? (
        <>
          <DescriptionItem
            imageSrc="/images/image_01.png"
            imageAlt="Developer Icon"
            isMobileImageHidden
            textContent={
              <div className="flex flex-col gap-2">
                <p className="leading-relaxed text-gray-200 text-lg md:text-xl">
                  Hi, I&#39;m{" "}
                  <span
                    className="font-bold text-gray-200"
                    style={{ textShadow: "0 0 5px rgba(97, 157, 253, 0.7)" }}
                  >
                    Raina Moon
                  </span>
                  — a <span className="font-bold">frontend developer</span> who
                  thrives on solving{" "}
                  <span className="font-semibold">real problems</span> through{" "}
                  <span className="underline underline-offset-4">
                    intuitive interfaces
                  </span>
                  .
                </p>
                <p className="leading-relaxed text-gray-200 md:text-lg">
                  With experience building projects from the ground up, I focus
                  on <span className="font-semibold">clean design</span>,{" "}
                  <span className="font-semibold">solid architecture</span>, and{" "}
                  <span className="font-semibold">human-centered UX</span>.
                </p>
              </div>
            }
          />
          <DescriptionItem
            imageSrc="/images/image_02.png"
            imageAlt="Tech Icon"
            isMobileImageHidden
            isImageLeft
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="leading-relaxed text-gray-200 font-medium text-lg md:text-xl flex-1">
                I build with <span className="font-bold">Next.js</span>,{" "}
                <span className="font-bold">TypeScript</span>, and{" "}
                <span className="font-bold">TailwindCSS</span>, and I&#39;m
                expanding my full-stack skills using{" "}
                <span className="font-bold">Node.js</span> and{" "}
                <span className="font-bold">PostgreSQL</span>.
              </p>
            }
          />
          <DescriptionItem
            imageSrc="/images/image_03.png"
            imageAlt="Mobile Icon"
            isMobileImageHidden
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="leading-relaxed text-gray-200 italic text-lg md:text-xl flex-1">
                Recently, I&#39;ve also started learning{" "}
                <span className="font-bold">React Native</span> to explore{" "}
                <span className="italic">mobile development</span>.
              </p>
            }
          />
        </>
      ) : (
        <>
          <DescriptionItem
            imageSrc="/images/image_01.png"
            imageAlt="개발자 아이콘"
            isMobileImageHidden
            textContent={
              <div className="flex flex-col gap-2">
                <p className="leading-relaxed text-gray-200 text-lg md:text-xl flex-1">
                  안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
                  <span className="font-bold text-gray-200">
                    프론트엔드 개발자 Raina
                  </span>
                  입니다.
                </p>
                <p className="leading-relaxed text-gray-200 text-lg md:text-xl flex-1">
                  다양한 프로젝트를 직접 기획하고 구현하며,{" "}
                  <span className="font-semibold">문제 해결</span>과{" "}
                  <span className="font-semibold">사용자 경험</span>을 중심으로
                  코드를 작성합니다.
                </p>
              </div>
            }
          />
          <DescriptionItem
            imageSrc="/images/image_02.png"
            imageAlt="기술 아이콘"
            isMobileImageHidden
            isImageLeft
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="leading-relaxed text-gray-200 font-medium text-lg md:text-xl flex-1">
                현재는 <span className="font-bold">Next.js</span>,{" "}
                <span className="font-bold">TypeScript</span>,{" "}
                <span className="font-bold">TailwindCSS</span>를 활용해 웹을
                만들고 있으며, <span className="font-bold">Node.js</span>와{" "}
                <span className="font-bold">PostgreSQL</span>로 백엔드 역량도
                키우는 중입니다.
              </p>
            }
          />
          <DescriptionItem
            imageSrc="/images/image_03.png"
            imageAlt="모바일 아이콘"
            isMobileImageHidden
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="leading-relaxed text-gray-200 italic text-lg md:text-xl flex-1">
                최근에는 <span className="font-bold">React Native</span>를
                공부하며 <span className="font-bold">모바일 개발</span>에도
                도전하고 있어요.
              </p>
            }
          />
        </>
      )}
    </div>
  );
};

export default Description;
