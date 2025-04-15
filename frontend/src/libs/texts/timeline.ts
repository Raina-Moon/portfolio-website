import { Language } from "../languageStore";

export interface TimelineItem {
  date: string;
  title: string;
  shortDescription: string;
  detail?: {
    stack?: string[];
    summary?: string;
    learning?: string;
    link?: string;
  };
}

export const timelineItems: Record<Language, TimelineItem[]> = {
  en: [
    {
      date: "Sep 30, 2024",
      title: "Joined Sparta BootCamp",
      shortDescription: "Started my coding journey by joining Sparta BootCamp.",
      detail: {
        summary:
          "With a personal interest in solving math problems, I naturally developed an interest in coding. I made the bold decision to join one of Korea's most reputable bootcamps, Sparta Coding Club, and officially began my journey as a frontend developer.",
        stack: ["HTML", "CSS", "JavaScript"],
        learning:
          "I learned the foundations of frontend development and how to structure my learning path efficiently.",
      },
    },
    {
      date: "Oct 24, 2024",
      title: "Movie Search Engine",
      shortDescription:
        "Built using TMDB API, vanilla JavaScript (DOM), HTML5, and CSS.",
      detail: {
        summary:
          "This was my first project using an external API. I created a movie search engine using the TMDB API and vanilla JavaScript. Through this, I learned how to parse and render dynamic data using DOM manipulation.",
        stack: ["JavaScript", "HTML", "CSS", "TMDB API"],
        learning:
          "It taught me how APIs work, and how to dynamically update UI with real-time search data.",
        link: "https://github.com/Raina-Moon/Movie-Search-Engine",
      },
    },
    {
      date: "Nov 1, 2024",
      title: "Olympic Medal Table",
      shortDescription: "Developed with React, Vite.js, React Hook, and CSS.",
      detail: {
        summary:
          "I developed a Paris 2024 Olympic Medal Tracker app. The app supports adding countries with medal counts, updating them, and auto-sorting by gold medals. It also prevents duplicate entries and provides alerts for conflicts.",
        stack: ["React", "Vite", "React Hook", "CSS"],
        learning:
          "I practiced component structuring and efficient state management with React.",
        link: "https://github.com/Raina-Moon/Olympic-Medal-Table",
      },
    },
    {
      date: "Nov 12, 2024",
      title: "Pokémon Encyclopedia",
      shortDescription:
        "Used Redux, React, React Router DOM, styled-components, and Vite.js.",
      detail: {
        summary:
          "This project displays a full Pokémon list using Redux for global state and React Router for navigation. I optimized Redux to minimize unnecessary re-renders and improve performance.",
        stack: [
          "Redux",
          "React",
          "React Router DOM",
          "Vite.js",
          "styled-components",
        ],
        learning:
          "I learned how to manage global state using Redux and apply routing for multi-page SPA structures.",
        link: "https://pokemon-dex-pink-five.vercel.app/",
      },
    },
    {
      date: "Nov 28, 2024",
      title: "MBTI Test Page",
      shortDescription: "Built using Axios, React, styled-components, Vite.js.",
      detail: {
        summary:
          "Created an MBTI test app with user authentication (login, signup, logout) and profile editing. Users can view and share their results and upload/update profile pictures and nicknames.",
        stack: [
          "React",
          "Axios",
          "styled-components",
          "Vite.js",
          "Firebase Auth",
        ],
        learning:
          "I implemented complete authentication flow and learned how to store and edit user profiles.",
        link: "https://mbti-app-nine.vercel.app/",
      },
    },
    {
      date: "Dec 2, 2024",
      title: "Boonguhppang Sharing Site",
      shortDescription:
        "Used Kakao Maps, Supabase, Zustand, TanStack Query, Toastify, styled-components.",
      detail: {
        summary:
          "Built '붕빵사조', a location-sharing service for 붕어빵 stands. It was my first team project. I handled CRUD logic and used the Kakao Maps API to allow users to drop pins and autofill addresses. Posts appear on the map with real-time location info.",
        stack: [
          "Kakao Maps SDK",
          "Supabase",
          "Zustand",
          "React Query",
          "styled-components",
        ],
        learning:
          "It was my first experience building with teammates and integrating real-world map services.",
        link: "https://egeosajo.vercel.app/",
      },
    },
    {
      date: "Dec 19, 2024",
      title: "LOL Champion Search",
      shortDescription:
        "Used LOL API, React, Tailwind CSS, TypeScript, Next.js, React Query.",
      detail: {
        summary:
          "Used Riot's LOL API to fetch and display champion data. This was my first project using Next.js, TypeScript, and Tailwind. Faster development allowed me to polish the UI.",
        stack: [
          "Next.js",
          "TypeScript",
          "React Query",
          "Tailwind CSS",
          "LOL API",
        ],
        learning:
          "Learned how to build performant web apps using type safety and server-side rendering.",
        link: "https://lol-app-sigma.vercel.app/",
      },
    },
    {
      date: "Dec 30, 2024",
      title: "Mentor-Mentee Matching",
      shortDescription:
        "Made with React, Supabase, Zustand, Tailwind, Next.js, TypeScript.",
      detail: {
        summary:
          "Built 'Mentory', a platform that connects developers with mentors. My roles included implementing Supabase auth, login/signup forms, homepage layout, and GitHub login triggers that automatically import profile images and nicknames.",
        stack: [
          "Supabase",
          "Next.js",
          "React",
          "Tailwind",
          "TypeScript",
          "Zustand",
        ],
        learning:
          "Improved my skills in integrating third-party auth systems and using Supabase triggers.",
        link: "https://mentory-seven.vercel.app/",
      },
    },
    {
      date: "Feb 7, 2025",
      title: "Travel Q&A App",
      shortDescription:
        "Used OpenAI API, TOSS Pay, Tiptap, Google Maps API, i18next, Next.js.",
      detail: {
        summary:
          "Built 'Heylocal', a Q&A app that lets travelers ask locals for advice. I built the full CRUD for both questions and answers using Tiptap and integrated Google Maps API for location-specific posts. I also built the TOSS payment flow and restricted comments to buyers only.",
        stack: [
          "Next.js",
          "OpenAI API",
          "Tiptap",
          "Google Maps API",
          "TOSS Payments",
          "i18next",
        ],
        learning:
          "I learned how to collaborate with designers, handle payment APIs, and create real-world user permissions.",
        link: "https://heylocal.site/",
      },
    },
    {
      date: "Feb 10, 2025",
      title: "Sparta BootCamp Graduation",
      shortDescription:
        "Successfully graduated from the Sparta coding bootcamp.",
      detail: {
        summary:
          "After 4 months of intense learning, I proudly completed the frontend curriculum and earned my Sparta Bootcamp certificate.",
        stack: ["React", "JavaScript", "API", "CSS", "Git"],
        learning:
          "I gained confidence in my ability to build real-world web applications and work in teams.",
      },
    },
    {
      date: "Mar 2025",
      title: "Frontend Intern at Kizling",
      shortDescription: "1-month internship experience building real features.",
      detail: {
        summary:
          "Worked as a frontend intern at Kizling. I built the homepage, landing page, and a challenge management page. Despite the initial challenges, I adapted quickly and contributed to production-level features.",
        stack: ["React", "Tailwind CSS", "Vite", "Zustand", "Supabase"],
        learning:
          "Experienced real-world collaboration with designers and developers. Learned to meet deadlines and maintain communication.",
        link: "https://www.kizling.com/",
      },
    },
    {
      date: "Mar 3, 2025",
      title: "Started Fomofix Project",
      shortDescription:
        "Built with Docker, Node.js, Express, PostgreSQL, EC2, Cloudinary, etc.",
      detail: {
        summary:
          "My first full-stack app, built entirely on my own. Users set a timer to achieve a goal, and if they leave or switch apps, they fail. Upon success, users can post their achievements. The app emphasizes focus and discipline.",
        stack: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Docker",
          "Cloudinary",
          "EC2",
          "Context API",
        ],
        learning:
          "I learned to balance internship and study schedules, and how to architect a full system with authentication, timers, and user posts.",
        link: "http://3.106.254.86:3000/",
      },
    },
    {
      date: "Apr 10, 2025",
      title: "Fomofix Deployed to EC2",
      shortDescription:
        "Frontend and backend fully deployed to EC2 using Docker.",
      detail: {
        summary:
          "Successfully containerized both frontend and backend, and deployed them to AWS EC2 using Docker Compose. Set up .envs, reverse proxies, and ensured everything ran smoothly in production.",
        stack: ["Docker", "EC2", "Nginx", "PostgreSQL", "Node.js", "Next.js"],
        learning:
          "Learned DevOps basics, secure deployment, and environment configuration for scalable hosting.",
      },
    },
    {
      date: "Apr 11, 2025",
      title: "Started React Native Dev",
      shortDescription:
        "Began building Fomofix mobile version using React Native.",
      detail: {
        summary:
          "Started building the mobile version of Fomofix using React Native and Expo. I reused logic from the web app and applied platform-specific UI practices.",
        stack: ["React Native", "Expo", "Context API"],
        learning:
          "Learned how to structure cross-platform codebases and optimize app logic for mobile.",
        link: "https://github.com/Raina-Moon/fomofix_app",
      },
    },
  ],
  ko: [
    {
      date: "2024년 9월",
      title: "Sparta 부트캠프 입학",
      shortDescription:
        "개발 공부를 본격적으로 시작하며 Sparta 부트캠프에 등록함.",
    },
    {
      date: "2024년 10월 24일",
      title: "영화 검색 사이트 개발",
      shortDescription:
        "TMDB API를 활용해 순수 JS, HTML, CSS로 영화 검색 기능 구현.",
    },
    {
      date: "2024년 11월 1일",
      title: "올림픽 메달 테이블 개발",
      shortDescription: "React, Vite.js, React Hook, CSS로 구성.",
    },
    {
      date: "2024년 11월 12일",
      title: "포켓몬 도감 페이지 개발",
      shortDescription: "Redux, React, styled-components, Vite.js 사용.",
    },
    {
      date: "2024년 11월 28일",
      title: "MBTI 검사 페이지 제작",
      shortDescription: "Axios, React, styled-components, Vite.js 사용.",
    },
    {
      date: "2024년 12월 2일",
      title: "붕어빵 위치 공유 사이트 개발",
      shortDescription:
        "Kakao Map SDK, Supabase, Zustand, React Query 등 다양한 기술 스택 사용.",
    },
    {
      date: "2024년 12월 19일",
      title: "LOL 챔피언 검색 서비스 개발",
      shortDescription: "LOL API, React, Tailwind, TypeScript, Next.js 활용.",
    },
    {
      date: "2024년 12월 30일",
      title: "멘토-멘티 연결 서비스 제작",
      shortDescription: "React, Zustand, Supabase, Tailwind, Next.js 등 사용.",
    },
    {
      date: "2025년 2월 7일",
      title: "여행 Q&A 플랫폼 개발",
      shortDescription:
        "OpenAI API, TOSS, Tiptap, 구글맵, i18next 등 다양한 라이브러리 적용.",
    },
    {
      date: "2025년 2월 10일",
      title: "Sparta 부트캠프 수료",
      shortDescription: "약 5개월 간의 부트캠프 교육과정을 성실히 수료.",
    },
    {
      date: "2025년 3월",
      title: "Kizling 웹 프론트엔드 인턴",
      shortDescription: "1개월간 실무 웹 개발 경험 쌓음.",
    },
    {
      date: "2025년 3월 3일",
      title: "Fomofix 개발 시작",
      shortDescription:
        "Docker, EC2, Node.js, Express, Cloudinary 등으로 백엔드 구축.",
    },
    {
      date: "2025년 4월 10일",
      title: "Fomofix EC2 배포 완료",
      shortDescription: "프론트와 백엔드 모두 EC2에 성공적으로 배포.",
    },
    {
      date: "2025년 4월 11일",
      title: "React Native 앱 개발 시작",
      shortDescription: "Fomofix의 모바일 버전 개발 시작.",
    },
  ],
};
