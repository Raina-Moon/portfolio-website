"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      {data.map((item, index) => (
        <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10">
          {/* Left side - sticky title */}
          <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            {/* Dot */}
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
            </div>
            <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-neutral-500">
              {item.title}
            </h3>
          </div>

          {/* Right side - content */}
          <div className="relative pl-20 pr-4 md:pl-4 w-full">
            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
              {item.title}
            </h3>
            {item.content}
          </div>
        </div>
      ))}

      {/* Vertical progress line */}
      <div
        style={{ height: "100%" }}
        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]"
      >
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute inset-x-0 top-0 w-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
        />
      </div>
    </div>
  );
};
