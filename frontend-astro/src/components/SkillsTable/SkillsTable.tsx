"use client";

import React, { useEffect, useState } from "react";
import { IconCloud } from "@/registry/magicui/icon-cloud";
import { motion } from "framer-motion";

// Mapped from SkillsTable data:
// Languages & Frameworks: React, Next.js, React Native, TypeScript, jQuery, React Query,
//                         Node.js, Express, PostgreSQL, Prisma
// State Management: Zustand, Redux Toolkit
// Styling / UI: Tailwind CSS, styled-components
// Data Handling: React Hook Form, Cloudinary
// Deployment: Vercel, AWS, Docker
// Infra: Nginx, SSH/Git
const slugs = [
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "jquery",
  "reactquery",
  "nodedotjs",
  "express",
  "nestjs",
  "postgresql",
  "mongodb",
  "prisma",
  "redux",
  "jest",
  "vitest",
  "tailwindcss",
  "styledcomponents",
  "astro",
  "cloudinary",
  "sentry",
  "grafana",
  "vercel",
  "amazonaws",
  "docker",
  "linux",
  "nginx",
  "git",
  "github",
  "githubactions",
  "html5",
  "css3",
  "reactnative",
  "expo",
  "vite",
];

const slugLabels: Record<string, string> = {
  nextdotjs: "Next.js",
  reactquery: "React Query",
  nodedotjs: "Node.js",
  styledcomponents: "styled-components",
  amazonaws: "AWS",
  reactnative: "React Native",
  githubactions: "GitHub Actions",
  nestjs: "NestJS",
  mongodb: "MongoDB",
  html5: "HTML5",
  css3: "CSS3",
};

const iconSlugMap: Record<string, string> = {
  amazonaws: "amazonwebservices",
  reactnative: "react",
  css3: "css",
};

const iconUrlMap: Record<string, string> = {
  jest: "https://cdn.jsdelivr.net/gh/jestjs/jest/website/static/img/jest.png",
  amazonaws:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  reactnative:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  vercel:
    "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%230B0B0F'/%3E%3Cpath d='M20 9L31 29H9z' fill='%23FFFFFF'/%3E%3C/svg%3E",
};

const SkillsTable = () => {
  const [cloudSize, setCloudSize] = useState(420);
  const [cloudRadius, setCloudRadius] = useState(186);

  useEffect(() => {
    const updateCloudLayout = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCloudSize(280);
        setCloudRadius(118);
        return;
      }
      if (width < 640) {
        setCloudSize(320);
        setCloudRadius(136);
        return;
      }
      if (width < 1024) {
        setCloudSize(360);
        setCloudRadius(154);
        return;
      }
      setCloudSize(420);
      setCloudRadius(186);
    };

    updateCloudLayout();
    window.addEventListener("resize", updateCloudLayout);
    return () => window.removeEventListener("resize", updateCloudLayout);
  }, []);

  const images = slugs.map(
    (slug) => {
      if (iconUrlMap[slug]) return iconUrlMap[slug];
      const iconSlug = iconSlugMap[slug] || slug;
      return `https://cdn.simpleicons.org/${iconSlug}`;
    }
  );
  const labels = slugs.map(
    (slug) => slugLabels[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-900 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Tech Stack
      </motion.h1>
      <div className="w-full px-4 sm:px-6">
        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center overflow-visible">
          <IconCloud images={images} labels={labels} radius={cloudRadius} size={cloudSize} />
        </div>
      </div>
    </div>
  );
};

export default SkillsTable;
