"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TimelineItem } from "@/libs/texts/timeline";
import { Code, Briefcase, BookOpen } from "lucide-react";
import IconImage from "./IconImage";

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

const getCategoryIcon = (title: string) => {
  if (title.toLowerCase().includes("developer"))
    return <Briefcase size={20} />;
  if (title.toLowerCase().includes("project")) return <Code size={20} />;
  return <BookOpen size={20} />;
};

interface ExpandedCardProps {
  item: TimelineItem;
  index: number;
  id: string;
  lang: string;
  onClose: () => void;
  expandedRef: React.RefObject<HTMLDivElement | null>;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({
  item,
  index,
  id,
  lang,
  onClose,
  expandedRef,
}) => {
  const hasIcon = !!item.icon;

  return (
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <motion.div
        layoutId={`card-${index}-${id}`}
        ref={expandedRef}
        className="relative w-full max-w-[500px] max-h-[90vh] md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
      >
        <motion.button
          key={`button-close-${index}-${id}`}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          className="flex absolute top-3 right-3 z-20 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow-sm"
          onClick={onClose}
        >
          <CloseIcon />
        </motion.button>

        {/* Icon header */}
        <motion.div
          layoutId={`icon-${index}-${id}`}
          className={`flex items-center justify-center h-48 ${
            hasIcon
              ? "bg-white"
              : "bg-gradient-to-br from-blue-600 to-teal-600 text-white"
          }`}
        >
          {hasIcon ? (
            <IconImage
              src={item.icon!}
              alt={item.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="scale-[3]">{getCategoryIcon(item.title)}</div>
          )}
        </motion.div>

        <div>
          <div className="flex justify-between items-start p-4">
            <div>
              <motion.h3
                layoutId={`title-${index}-${id}`}
                className="font-bold text-neutral-700"
              >
                {item.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${index}-${id}`}
                className="text-neutral-600 text-sm"
              >
                {item.date}
              </motion.p>
            </div>

            {item.detail?.link && (
              <motion.a
                layoutId={`button-${index}-${id}`}
                href={item.detail.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-white shrink-0"
              >
                {item.detail.link.includes("github.com")
                  ? "GitHub"
                  : lang === "en"
                    ? "Visit"
                    : "방문"}
              </motion.a>
            )}
            {!item.detail?.link && (
              <motion.span
                layoutId={`button-${index}-${id}`}
                className="px-4 py-3 text-sm rounded-full font-bold bg-gray-100 text-gray-400 shrink-0"
              >
                {lang === "en" ? "Details" : "상세보기"}
              </motion.span>
            )}
          </div>

          <div className="pt-4 relative px-4">
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-600 text-sm md:text-base max-h-[52vh] md:max-h-[56vh] pb-8 flex flex-col items-start gap-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
            >
              {item.detail?.summary && <p>{item.detail.summary}</p>}

              {item.detail?.stack && (
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">
                    {lang === "en" ? "Tech Stack" : "기술 스택"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.detail.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.detail?.learning && (
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">
                    {lang === "en" ? "What I Learned" : "배운 점"}
                  </h4>
                  <p>{item.detail.learning}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpandedCard;
