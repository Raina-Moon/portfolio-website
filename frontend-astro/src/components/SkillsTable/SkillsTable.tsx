"use client";

import React from "react";
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

const SkillsTable = () => {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );
  const labels = slugs.map(
    (slug) => slugLabels[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-900 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Tech Stack
      </motion.h1>
      <div className="relative flex size-full max-w-lg items-center justify-center overflow-visible">
        <IconCloud images={images} labels={labels} radius={180} />
      </div>
    </div>
  );
};

export default SkillsTable;
