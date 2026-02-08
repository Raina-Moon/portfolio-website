import React, { useEffect, useRef } from "react";

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
    <div className="card-3d-container w-full md:h-full">
      <div className="card-3d relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8 lg:p-10 md:flex md:h-full md:flex-col">
        <div className="depth-high w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full rounded-xl object-cover ${imageClassName}`}
          />
        </div>
        <div className="depth-base mt-4 w-full md:flex-1">
          <div className="flex flex-col gap-2 leading-relaxed">
            {textContent}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DescriptionProps {
  lang: "en" | "ko";
}

const Description: React.FC<DescriptionProps> = ({ lang }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.card-3d');
    if (!cards) return;

    const handlers = new Map<Element, { onMove: (e: Event) => void; onLeave: () => void }>();

    cards.forEach(card => {
      let rafId = 0;
      const onMove = (e: Event) => {
        const me = e as MouseEvent;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (me.clientX - rect.left - rect.width / 2) / 25;
          const y = (me.clientY - rect.top - rect.height / 2) / 25;
          (card as HTMLElement).style.transform =
            `rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(rafId);
        (card as HTMLElement).style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.set(card, { onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ onMove, onLeave }, card) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div ref={gridRef} className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-3 md:auto-rows-fr md:items-stretch md:px-10 lg:gap-8">
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
                    className="font-bold gradient-name-glow"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #34d399 100%)",
                      backgroundSize: "220% 220%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 10px rgba(97, 157, 253, 0.45)",
                    }}
                  >
                    Raina Moon
                  </span>
                  — a <span className="depth-strong font-bold">frontend developer</span> who
                  thrives on solving{" "}
                  <span className="depth-medium font-semibold">real problems</span> through{" "}
                  <span className="underline underline-offset-4">
                    intuitive interfaces
                  </span>
                  .
                </p>
                <p className="leading-relaxed text-gray-700 md:text-lg">
                  With experience building projects from the ground up, I focus
                  on <span className="depth-medium font-semibold">clean design</span>,{" "}
                  <span className="depth-medium font-semibold">solid architecture</span>, and{" "}
                  <span className="depth-medium font-semibold">human-centered UX</span>.
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
                I build with <span className="depth-strong font-bold">Next.js</span>,{" "}
                <span className="depth-strong font-bold">TypeScript</span>, and{" "}
                <span className="depth-strong font-bold">TailwindCSS</span>, and I&#39;m
                expanding my full-stack skills using{" "}
                <span className="depth-strong font-bold">Node.js</span> and{" "}
                <span className="depth-strong font-bold">PostgreSQL</span>.
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
                <span className="depth-strong font-bold">React Native</span> to explore{" "}
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
                  <span className="depth-strong font-bold">프론트엔드 개발자 Raina</span>
                  입니다.
                </p>
                <p className="flex-1 text-lg leading-relaxed text-gray-700 md:text-xl">
                  다양한 프로젝트를 직접 기획하고 구현하며,{" "}
                  <span className="depth-medium font-semibold">문제 해결</span>과{" "}
                  <span className="depth-medium font-semibold">사용자 경험</span>을 중심으로
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
                현재는 <span className="depth-strong font-bold">Next.js</span>,{" "}
                <span className="depth-strong font-bold">TypeScript</span>,{" "}
                <span className="depth-strong font-bold">TailwindCSS</span>를 활용해 웹을
                만들고 있으며, <span className="depth-strong font-bold">Node.js</span>와{" "}
                <span className="depth-strong font-bold">PostgreSQL</span>로 백엔드 역량도
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
                최근에는 <span className="depth-strong font-bold">React Native</span>를
                공부하며 <span className="depth-strong font-bold">모바일 개발</span>에도
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
