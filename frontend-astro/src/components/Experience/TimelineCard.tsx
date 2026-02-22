"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TimelineItem } from "@/libs/texts/timeline";
import { Code, Briefcase, BookOpen } from "lucide-react";
import IconImage from "./IconImage";

const getCategoryIcon = (title: string) => {
  if (title.toLowerCase().includes("developer"))
    return <Briefcase size={20} />;
  if (title.toLowerCase().includes("project")) return <Code size={20} />;
  return <BookOpen size={20} />;
};

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  id: string;
  lang: string;
  onClick: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  item,
  index,
  id,
  lang,
  onClick,
}) => {
  const hasIcon = !!item.icon;

  return (
    <motion.div
      layoutId={`card-${index}-${id}`}
      key={index}
      onClick={onClick}
      className="relative p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 rounded-xl cursor-pointer"
    >
      <div className="flex gap-4 flex-col md:flex-row items-center md:items-start">
        <motion.div
          layoutId={`icon-${index}-${id}`}
          className={`flex items-center justify-center h-14 w-14 rounded-lg shrink-0 ${
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
            getCategoryIcon(item.title)
          )}
        </motion.div>
        <div>
          <motion.h3
            layoutId={`title-${index}-${id}`}
            className="font-medium text-neutral-800 text-center md:text-left"
          >
            {item.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${index}-${id}`}
            className="text-neutral-600 text-sm text-center md:text-left"
          >
            {item.shortDescription}
          </motion.p>
        </div>
      </div>
      <motion.button
        layoutId={`button-${index}-${id}`}
        className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 hover:text-white text-black mt-4 md:mt-0 shrink-0"
      >
        {lang === "en" ? "Details" : "상세보기"}
      </motion.button>
    </motion.div>
  );
};

export default TimelineCard;
