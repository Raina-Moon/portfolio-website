import { Language } from "../languageStore";

interface SkillRow {
  category: string;
  frontend: string[];
  backend: string[];
}

type SkillsByLanguage = Record<Language, SkillRow[]>;

export const skillsTable: SkillsByLanguage = {
  en: [
    {
      category: "Languages & Frameworks",
      frontend: [
        "React (Hooks)",
        "Next.js",
        "React Native",
        "TypeScript",
        "jQuery",
        "TanStack Query (React Query)",
      ],
      backend: ["Node.js (Express)", "PostgreSQL (via Prisma)"],
    },
    {
      category: "State Management",
      frontend: ["Zustand", "Redux Toolkit", "Context API"],
      backend: [],
    },
    {
      category: "Styling / UI",
      frontend: ["Tailwind CSS", "styled-components", "Responsive Design"],
      backend: [],
    },
    {
      category: "Data Handling & Forms",
      frontend: ["React Hook Form", "Cloudinary", "Image Upload UI"],
      backend: [],
    },
    {
      category: "Database & Tools",
      frontend: [],
      backend: ["Prisma", "pgAdmin"],
    },
    {
      category: "API / Architecture",
      frontend: [],
      backend: [
        "REST API design",
        "Routing structuring",
        "CORS configuration",
      ],
    },
    {
      category: "Deployment",
      frontend: ["Vercel", "AWS EC2 (Frontend Deployment)"],
      backend: ["AWS EC2 + Docker"],
    },
    {
      category: "Infra / Ops",
      frontend: [],
      backend: ["SSH", "EC2 server setup", "Environment variable management"],
    },
    {
      category: "Etc. / Ownership",
      frontend: [
        "Pixel-perfect UI",
        "Mobile-first design",
        "UX-first approach",
        "Custom Form UX",
        "Error handling with Toasts",
      ],
      backend: ["Project ownership", "End-to-end deployment experience"],
    },
  ],
  ko: [
    {
      category: "언어 및 프레임워크",
      frontend: [
        "React (Hooks)",
        "Next.js",
        "React Native",
        "TypeScript",
        "jQuery",
        "TanStack Query (React Query)",
      ],
      backend: ["Node.js (Express)", "PostgreSQL (Prisma 사용)"],
    },
    {
      category: "상태 관리",
      frontend: ["Zustand", "Redux Toolkit", "Context API"],
      backend: [],
    },
    {
      category: "스타일링 / UI",
      frontend: ["Tailwind CSS", "styled-components", "반응형 UI 구현"],
      backend: [],
    },
    {
      category: "데이터 처리 / 폼",
      frontend: ["React Hook Form", "Cloudinary", "이미지 업로드 UI"],
      backend: [],
    },
    {
      category: "데이터베이스 / 도구",
      frontend: [],
      backend: ["Prisma", "pgAdmin"],
    },
    {
      category: "API / 아키텍처",
      frontend: [],
      backend: ["REST API 설계", "라우팅 구조화", "CORS 설정"],
    },
    {
      category: "배포",
      frontend: ["Vercel", "AWS EC2 (프론트 배포 경험 포함)"],
      backend: ["AWS EC2 + Docker (백엔드)"],
    },
    {
      category: "인프라 / 서버 설정",
      frontend: [],
      backend: ["SSH", "EC2 서버 세팅", "환경 변수 설정"],
    },
    {
      category: "기타 / 프로젝트 경험",
      frontend: [
        "픽셀 단위 UI",
        "모바일 우선 설계",
        "UX 중심 개발",
        "커스텀 폼 UX",
        "에러 핸들링 (토스트 포함)",
      ],
      backend: ["프로젝트 주도 개발 경험", "엔드 투 엔드 배포 경험"],
    },
  ],
};
