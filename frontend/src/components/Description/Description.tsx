import React from "react";
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
  return (
    <motion.div
      className={`desc-item flex flex-col md:grid md:grid-cols-2 items-center justify-center gap-6 px-5 py-6 lg:gap-10 lg:px-14 lg:py-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg opacity-0 max-w-[900px] ${containerClassName} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        boxShadow:
          "0 0 20px rgba(255, 105, 180, 0.7), 0 0 40px rgba(0, 191, 255, 0.7)",
        filter: "brightness(1.1)",
        transition: { duration: 0.3 },
      }}
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid transparent",
        background:
          "linear-gradient(white, white) padding-box, conic-gradient(red, orange, yellow, green, blue, indigo, violet, red) border-box",
      }}
    >
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className={`w-[230px] md:w-full ${
          isMobileImageHidden
            ? "rounded-xl md:hidden"
            : "rounded-xl md:rounded-2xl"
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
          <div className="flex flex-col gap-2 leading-relaxed">
            {textContent}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 leading-relaxed">
            {textContent}
          </div>

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
}

const Description: React.FC<DescriptionProps> = ({ lang }) => {
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
                <p className="leading-relaxed text-gray-700 text-lg md:text-xl">
                  Hi, I&#39;m{" "}
                  <span
                    className="font-bold text-primary-600"
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
                <p className="leading-relaxed text-gray-600 md:text-lg">
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
              <p className="leading-relaxed text-gray-700 font-medium text-lg md:text-xl flex-1">
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
              <p className="leading-relaxed text-gray-600 italic text-lg md:text-xl flex-1">
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
                <p className="leading-relaxed text-gray-700 text-lg md:text-xl flex-1">
                  안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
                  <span className="font-bold text-primary-600">
                    프론트엔드 개발자 Raina
                  </span>
                  입니다.
                </p>
                <p className="leading-relaxed text-gray-600 text-lg md:text-xl flex-1">
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
              <p className="leading-relaxed text-gray-700 font-medium text-lg md:text-xl flex-1">
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
              <p className="leading-relaxed text-gray-600 italic text-lg md:text-xl flex-1">
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
