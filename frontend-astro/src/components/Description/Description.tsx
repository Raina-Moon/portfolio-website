import React from "react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";

interface DescriptionItemProps {
  imageSrc: string;
  imageAlt: string;
  textContent: React.ReactNode;
  imageClassName?: string;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({
  imageSrc,
  imageAlt,
  textContent,
  imageClassName = "",
}) => {
  return (
    <CardContainer
      containerClassName="w-full md:h-full"
      className="md:h-full"
    >
      <CardBody className="relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 lg:p-10 md:flex md:h-full md:flex-col">
        <CardItem translateZ="60" className="w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full rounded-xl object-cover ${imageClassName}`}
          />
        </CardItem>
        <CardItem translateZ="40" className="mt-4 w-full md:flex-1">
          <div className="flex flex-col gap-2 leading-relaxed">
            {textContent}
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

interface DescriptionProps {
  lang: "en" | "ko";
}

const Description: React.FC<DescriptionProps> = ({ lang }) => {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-3 md:auto-rows-fr md:items-stretch md:px-10 lg:gap-8">
      {lang === "en" ? (
        <>
          <DescriptionItem
            imageSrc="/images/image_01.png"
            imageAlt="Developer Icon"
            textContent={
              <div className="flex flex-col gap-2">
                <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  Hi, I&#39;m{" "}
                  <span
                    className="font-bold text-gray-700"
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
                <p className="leading-relaxed text-gray-700 md:text-lg">
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
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="flex-1 text-lg font-medium leading-relaxed text-gray-700 md:text-xl">
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
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="flex-1 text-lg italic leading-relaxed text-gray-700 md:text-xl">
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
            textContent={
              <div className="flex flex-col gap-2">
                <p className="flex-1 text-lg leading-relaxed text-gray-700 md:text-xl">
                  안녕하세요, 저는 빠르게 성장하고 실행력 있게 움직이는{" "}
                  <span className="font-bold text-gray-700">
                    프론트엔드 개발자 Raina
                  </span>
                  입니다.
                </p>
                <p className="flex-1 text-lg leading-relaxed text-gray-700 md:text-xl">
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
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="flex-1 text-lg font-medium leading-relaxed text-gray-700 md:text-xl">
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
            imageClassName="rounded-xl lg:rounded-3xl"
            textContent={
              <p className="flex-1 text-lg italic leading-relaxed text-gray-700 md:text-xl">
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
