import type { Language } from "../languageStore";

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
          "Subabase Auth",
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
    {
      date: "May 2025",
      title: "SipSense – Cola Intake Tracker (iOS/Android)",
      shortDescription:
        "Shipped my first mobile app to the Apple App Store and Google Play. Tracks daily cola intake with playful animations and a bold red UI.",
      detail: {
        summary:
          "Built and released SipSense, a mobile app that lets users log daily cola intake. I focused on attractive, satisfying animations and a vibrant red UI that reflects the cola theme. This was my first end-to-end store launch (build/signing, listings, review). Android: https://play.google.com/store/apps/details?id=com.mds64.sipsense&pcampaignid=web_share | App Store: https://apps.apple.com/kr/app/sipsense/id6746238876?l=en-GB | Frontend: https://github.com/Raina-Moon/cola-calc-app | Backend: https://github.com/Raina-Moon/cola-calc-backend",
        stack: [
          "React Native",
          "Expo",
          "TypeScript",
          "Node.js",
          "Express",
          "PostgreSQL",
        ],
        learning:
          "Learned the iOS/Android store submission process, release management, and how to design motion-rich yet performant mobile UI.",
        link: "https://github.com/Raina-Moon/cola-calc-app",
      },
    },
    {
      date: "Jul 2025",
      title: "Korips – Korea Hot Spring Booking (Lodges & Tickets)",
      shortDescription:
        "A multilingual hot-spring lodging & ticket reservation platform for both locals and international visitors.",
      detail: {
        summary:
          "As travel to Korea surged and there was no official service by the Korea Hot Spring Association, I built Korips: a Next.js platform where anyone—Korean or international visitors—can discover famous Korean hot springs and book lodges or day tickets with ease. The app supports full i18n, rich-editor posts, and payments.",
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Redux",
          "Axios",
          "Tailwind CSS",
          "Sass",
          "Radix UI",
          "i18next",
          "Tiptap",
          "Toss Payments",
          "Node.js",
          "Express",
          "Prisma",
          "JWT",
          "PostgreSQL",
          "Docker",
          "Cloudinary",
          "DeepL",
          "GitHub Actions",
          "Nodemailer",
          "ESLint",
        ],
        learning:
          "Designed an end-to-end reservation flow (inventory, payments, i18n, email) and productionized CI/CD with Docker and GitHub Actions.",
        link: "https://github.com/Raina-Moon/korip-web",
      },
    },
    {
      date: "Nov 2025",
      title: "Joined Byaht as Junior Frontend Developer",
      shortDescription:
        "Joined Byaht as a junior frontend developer and started contributing to product features.",
      detail: {
        summary:
          "Began my role as a junior frontend developer at Byaht, collaborating with the team to build and improve user-facing features.",
      },
    },
    {
      date: "2026",
      title: "2026 Roadmap",
      shortDescription: "Preparing the next chapter and upcoming projects.",
      detail: {
        summary:
          "Planning and building new experiences for 2026. More updates coming soon.",
      },
    },
  ],
  ko: [
    {
      date: "2024년 9월 30일",
      title: "Sparta 부트캠프 입학",
      shortDescription:
        "개발 공부를 본격적으로 시작하며 Sparta 부트캠프에 등록함.",
      detail: {
        summary:
          "평소 수학 문제 푸는 걸 좋아하다가 논리적인 사고와 흥미를 바탕으로 자연스럽게 코딩에 관심을 가지게 되었습니다. 이후 한국에서 가장 유명한 부트캠프 중 하나인 Sparta Coding Club에 입학하면서 본격적인 프론트엔드 개발자의 길을 걷기 시작했습니다.",
        stack: ["HTML", "CSS", "JavaScript"],
        learning:
          "프론트엔드 개발의 기초를 익히고, 체계적으로 학습 계획을 세우는 방법을 배웠습니다.",
      },
    },
    {
      date: "2024년 10월 24일",
      title: "영화 검색 사이트 개발",
      shortDescription:
        "TMDB API를 활용해 순수 JS, HTML, CSS로 영화 검색 기능 구현.",
      detail: {
        summary:
          "처음으로 외부 API를 사용한 프로젝트입니다. TMDB API와 바닐라 JavaScript를 활용해 영화 검색 엔진을 만들었고, DOM 조작을 통해 동적인 데이터를 파싱하고 렌더링하는 법을 익혔습니다.",
        stack: ["JavaScript", "HTML", "CSS", "TMDB API"],
        learning:
          "API의 작동 원리를 이해하고, 실시간 검색 데이터를 기반으로 UI를 동적으로 업데이트하는 경험을 쌓았습니다.",
        link: "https://github.com/Raina-Moon/Movie-Search-Engine",
      },
    },
    {
      date: "2024년 11월 1일",
      title: "올림픽 메달 테이블 개발",
      shortDescription: "React, Vite.js, React Hook, CSS로 구성.",
      detail: {
        summary:
          "2024 파리 올림픽 메달 트래커 앱을 개발했습니다. 국가별 메달 수를 추가하거나 업데이트할 수 있으며, 금메달 수 기준으로 자동 정렬되며 중복 입력 방지 기능과 알림 메시지도 포함되어 있습니다.",
        stack: ["React", "Vite", "React Hook", "CSS"],
        learning:
          "React를 사용한 컴포넌트 구조화 및 상태 관리를 연습하고, 사용자의 입력을 효과적으로 반영하는 UI 흐름을 구현했습니다.",
        link: "https://github.com/Raina-Moon/Olympic-Medal-Table",
      },
    },
    {
      date: "2024년 11월 12일",
      title: "포켓몬 도감 페이지 개발",
      shortDescription: "Redux, React, styled-components, Vite.js 사용.",
      detail: {
        summary:
          "Redux와 React Router DOM을 통해 포켓몬 리스트와 상세 페이지를 구현했습니다. 글로벌 상태 관리를 최적화하며, 불필요한 렌더링을 최소화하는 데 중점을 두었습니다.",
        stack: [
          "Redux",
          "React",
          "React Router DOM",
          "Vite.js",
          "styled-components",
        ],
        learning:
          "Redux를 활용한 상태 관리 및 SPA 구조에서의 라우팅을 익혔습니다.",
        link: "https://pokemon-dex-pink-five.vercel.app/",
      },
    },
    {
      date: "2024년 11월 28일",
      title: "MBTI 검사 페이지 제작",
      shortDescription: "Axios, React, styled-components, Vite.js 사용.",
      detail: {
        summary:
          "사용자 인증, 결과 공유, 프로필 편집 기능이 있는 MBTI 테스트 앱을 제작했습니다. Supabase 기반의 로그인/회원가입 시스템을 구현하고, 닉네임 및 프로필 사진 수정 기능도 추가했습니다.",
        stack: [
          "React",
          "Axios",
          "styled-components",
          "Vite.js",
          "Supabase Auth",
        ],
        learning:
          "인증 기능의 흐름과, 사용자 정보를 저장하고 수정하는 방법을 익혔습니다.",
        link: "https://mbti-app-nine.vercel.app/",
      },
    },
    {
      date: "2024년 12월 2일",
      title: "붕어빵 위치 공유 사이트 개발",
      shortDescription:
        "Kakao Map SDK, Supabase, Zustand, React Query 등 다양한 기술 스택 사용.",
      detail: {
        summary:
          "'붕빵사조'는 전국 붕어빵 가게 위치를 유저들이 직접 공유할 수 있는 위치 기반 서비스입니다. 저에게는 첫 팀 프로젝트였으며, CRUD 로직 전반을 담당했습니다. Kakao Maps API를 활용해 사용자가 지도를 클릭하면 자동으로 주소가 입력되고, 게시물은 지도 위에 실시간으로 표시됩니다.",
        stack: [
          "Kakao Maps SDK",
          "Supabase",
          "Zustand",
          "React Query",
          "styled-components",
        ],
        learning:
          "팀원들과의 협업을 통해 실무와 유사한 개발 프로세스를 처음 경험해보았고, 실시간 위치 기반 서비스를 통합하는 방법을 익힐 수 있었습니다.",
        link: "https://egeosajo.vercel.app/",
      },
    },
    {
      date: "2024년 12월 19일",
      title: "LOL 챔피언 검색 서비스 개발",
      shortDescription: "LOL API, React, Tailwind, TypeScript, Next.js 활용.",
      detail: {
        summary:
          "Riot의 LOL API를 활용해 챔피언 데이터를 불러와 시각화한 프로젝트입니다. Next.js, TypeScript, Tailwind를 처음으로 본격적으로 사용했으며, 개발 속도가 향상되면서 UI/UX 디자인에 더 많은 신경을 쓸 수 있었습니다.",
        stack: [
          "Next.js",
          "TypeScript",
          "React Query",
          "Tailwind CSS",
          "LOL API",
        ],
        learning:
          "타입 안전성과 서버 사이드 렌더링을 활용해 성능 좋은 웹 애플리케이션을 만드는 방법을 배웠습니다.",
        link: "https://lol-app-sigma.vercel.app/",
      },
    },
    {
      date: "2024년 12월 30일",
      title: "멘토-멘티 연결 서비스 제작",
      shortDescription: "React, Zustand, Supabase, Tailwind, Next.js 등 사용.",
      detail: {
        summary:
          "개발자 간 멘토-멘티를 연결해주는 'Mentory' 플랫폼을 만들었습니다. Supabase의 인증 기능, 로그인 및 회원가입 폼, 홈 레이아웃을 구현했으며, GitHub 로그인 시 Supabase 트리거를 통해 자동으로 닉네임과 프로필 이미지가 등록되도록 설정했습니다.",
        stack: [
          "Supabase",
          "Next.js",
          "React",
          "Tailwind",
          "TypeScript",
          "Zustand",
        ],
        learning:
          "서드파티 인증 시스템과 Supabase 트리거를 활용하는 경험을 통해 인증 흐름을 유연하게 설계하는 능력을 키웠습니다.",
        link: "https://mentory-seven.vercel.app/",
      },
    },
    {
      date: "2025년 2월 7일",
      title: "여행 Q&A 플랫폼 개발",
      shortDescription:
        "OpenAI API, TOSS, Tiptap, 구글맵, i18next 등 다양한 라이브러리 적용.",
      detail: {
        summary:
          "'Heylocal'은 여행자가 현지인에게 직접 질문을 할 수 있는 Q&A 서비스입니다. 저는 질문과 답변 기능의 CRUD 전체를 직접 개발했으며, Tiptap 에디터를 활용해 블로그처럼 자유로운 포스팅이 가능하도록 구현했습니다. Google Maps API를 연동하여 위치 정보를 기반으로 한 게시물 작성이 가능하며, TOSS 결제 API를 통해 유저가 포인트를 충전하고 질문을 구매할 수 있도록 만들었습니다. 또한, 댓글 기능은 답변을 구매한 사용자에게만 허용하도록 제한을 걸었습니다.",
        stack: [
          "Next.js",
          "OpenAI API",
          "Tiptap",
          "Google Maps API",
          "TOSS Payments",
          "i18next",
        ],
        learning:
          "처음으로 디자이너들과 협업하며, 실제 서비스 수준의 UX를 고려한 개발을 경험했습니다. 결제 API를 도입하며 외부 시스템과의 연동을 익혔고, 권한에 따른 기능 제한을 구현하며 사용자 흐름을 세밀하게 설계할 수 있었습니다.",
        link: "https://heylocal.site/",
      },
    },
    {
      date: "2025년 2월 10일",
      title: "Sparta 부트캠프 수료",
      shortDescription: "약 5개월 간의 부트캠프 교육과정을 성실히 수료.",
      detail: {
        summary:
          "약 4개월간 집중적으로 학습하며 Sparta 부트캠프의 프론트엔드 과정 전 과정을 수료했습니다. 다양한 실전 프로젝트를 진행하며 개발자로서의 기초 체력을 다졌고, 체계적인 커리큘럼 덕분에 빠르게 성장할 수 있었습니다.",
        stack: ["React", "JavaScript", "API", "CSS", "Git"],
        learning:
          "실제 서비스를 만들 수 있는 기술력을 쌓았고, 팀 프로젝트를 통해 협업의 중요성과 개발자 간 커뮤니케이션 능력을 키울 수 있었습니다.",
      },
    },
    {
      date: "2025년 3월",
      title: "Kizling 웹 프론트엔드 인턴",
      shortDescription: "1개월간 실무 웹 개발 경험 쌓음.",
      detail: {
        summary:
          "Kizling에서 웹 프론트엔드 인턴으로 1개월간 근무하며, 홈페이지, 랜딩페이지, 챌린지 심사용 테이블 페이지를 구현했습니다. 처음 접한 실무 환경에 적응하느라 어려움도 있었지만, 빠르게 습득하여 실제 서비스에 반영되는 기능을 개발하는 데 성공했습니다.",
        stack: ["React", "Tailwind CSS", "Vite", "Zustand", "Supabase"],
        learning:
          "디자이너 및 다른 개발자들과의 협업을 통해 실무 커뮤니케이션을 익혔고, 데드라인 내에 기능을 완성하며 업무 효율과 책임감을 기를 수 있었습니다.",
        link: "https://www.kizling.com/",
      },
    },
    {
      date: "2025년 3월 3일",
      title: "Fomofix 개발 시작",
      shortDescription:
        "Docker, EC2, Node.js, Express, Cloudinary 등으로 백엔드 구축.",
      detail: {
        summary:
          "제가 처음으로 기획부터 개발까지 독립적으로 만든 풀스택 애플리케이션입니다. 사용자는 타이머를 설정해 목표를 수행하며, 중간에 다른 앱을 열거나 세션을 이탈하면 실패 처리됩니다. 성공 시에는 해당 내용을 포스팅할 수 있어, 현대인의 집중력 문제를 해결하기 위한 목적을 담고 있습니다.",
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
          "인턴과 병행하며 작업 일정을 효율적으로 조율하는 법을 배웠고, 사용자 인증부터 타이머 동작, 포스트 기능까지 전체 시스템 아키텍처를 직접 구성해보며 풀스택 개발자로서의 실력을 키울 수 있었습니다.",
        link: "http://3.106.254.86:3000/",
      },
    },
    {
      date: "2025년 4월 10일",
      title: "Fomofix EC2 배포 완료",
      shortDescription: "프론트와 백엔드 모두 EC2에 성공적으로 배포.",
      detail: {
        summary:
          "프론트엔드와 백엔드를 각각 Docker로 컨테이너화하고, 이를 AWS EC2 인스턴스에 Docker Compose를 이용해 배포하였습니다. .env 설정, 리버스 프록시 구성, 보안 세팅 등 프로덕션 환경에서 필요한 전반적인 세팅을 직접 수행했습니다.",
        stack: ["Docker", "EC2", "Nginx", "PostgreSQL", "Node.js", "Next.js"],
        learning:
          "DevOps의 기초적인 흐름을 이해하게 되었고, 실제 서비스를 안전하고 효율적으로 운영하기 위한 배포 및 인프라 구성 능력을 갖출 수 있었습니다.",
      },
    },
    {
      date: "2025년 4월 11일",
      title: "React Native 앱 개발 시작",
      shortDescription: "Fomofix의 모바일 버전 개발 시작.",
      detail: {
        summary:
          "기존 Fomofix 웹 애플리케이션의 핵심 로직을 바탕으로 모바일 버전을 React Native와 Expo를 이용해 개발 중입니다. 웹과 모바일 간 차이를 고려하여 플랫폼별 UI/UX에 맞는 구조로 재설계하고 있습니다.",
        stack: ["React Native", "Expo", "Context API"],
        learning:
          "크로스 플랫폼 환경에서의 코드 구조 설계와 모바일 환경에 맞는 최적화 방식을 익히며, 앱 로직을 더욱 유연하게 구성하는 능력을 키우고 있습니다.",
        link: "https://github.com/Raina-Moon/fomofix_app",
      },
    },
    {
      date: "2025년 5월",
      title: "SipSense – 콜라 섭취 기록 앱 (iOS/Android)",
      shortDescription:
        "하루 콜라 섭취량을 기록하는 모바일 앱을 처음 개발·출시. 애니메이션과 레드 톤 UI/UX 적용, 앱스토어·구글플레이 동시 배포.",
      detail: {
        summary:
          "사용자가 하루에 마신 콜라 양을 간편하게 기록할 수 있는 SipSense를 개발했습니다. 어트랙티브한 애니메이션 효과와 콜라의 상징색인 강렬한 레드 UI로 구성했으며, 애플 앱스토어와 구글 플레이 모두에 정식 배포를 완료했습니다. Android: https://play.google.com/store/apps/details?id=com.mds64.sipsense&pcampaignid=web_share | App Store: https://apps.apple.com/kr/app/sipsense/id6746238876?l=en-GB | 프론트엔드: https://github.com/Raina-Moon/cola-calc-app | 백엔드: https://github.com/Raina-Moon/cola-calc-backend",
        stack: [
          "React Native",
          "Expo",
          "TypeScript",
          "Node.js",
          "Express",
          "PostgreSQL",
        ],
        learning:
          "iOS/Android 스토어 심사 및 배포 절차를 처음 경험했고, 모션이 많은 UI를 성능 저하 없이 구현·최적화하는 방법을 익혔습니다.",
        link: "https://github.com/Raina-Moon/cola-calc-app",
      },
    },
    {
      date: "2025년 7월",
      title: "Korips – 한국 온천 숙소/티켓 예약 플랫폼",
      shortDescription:
        "내국인·외국인 모두 쉽게 사용할 수 있는 다국어 온천 숙박/티켓 예약 서비스.",
      detail: {
        summary:
          "한국 여행 수요가 증가하는 가운데 한국온천협회 차원의 공식 서비스가 없어, 국내뿐 아니라 해외 이용자도 쉽게 접근할 수 있는 ‘Korips’를 구축했습니다. 유명 온천을 소개하고 숙소/티켓을 간편하게 예약할 수 있으며, 다국어(i18n), 리치 텍스트 포스팅, 결제를 지원합니다.",
        stack: [
          "Next.js",
          "React",
          "TypeScript",
          "Redux",
          "Axios",
          "Tailwind CSS",
          "Sass",
          "Radix UI",
          "i18next",
          "Tiptap",
          "Toss Payments",
          "Node.js",
          "Express",
          "Prisma",
          "JWT",
          "PostgreSQL",
          "Docker",
          "Cloudinary",
          "DeepL",
          "GitHub Actions",
          "Nodemailer",
          "ESLint",
        ],
        learning:
          "재고/예약, 결제 연동, 다국어 지원, 이메일 알림 등 엔드투엔드 예약 흐름을 설계하고 Docker·GitHub Actions 기반 배포 자동화를 구축했습니다.",
        link: "https://github.com/Raina-Moon/korip-web",
      },
    },
    {
      date: "2025년 11월",
      title: "Byaht 주니어 프론트엔드 합류",
      shortDescription:
        "Byaht에 주니어 프론트엔드로 합류해 제품 기능 개발에 참여.",
      detail: {
        summary:
          "Byaht에서 주니어 프론트엔드로 입사하여 팀과 협업하며 사용자 기능을 개발하고 개선하는 역할을 시작했습니다.",
      },
    },
    {
      date: "2026년",
      title: "2026 로드맵",
      shortDescription: "다음 프로젝트와 새로운 도전을 준비 중.",
      detail: {
        summary:
          "2026년에 선보일 새로운 작업들을 준비하고 있습니다. 곧 업데이트될 예정입니다.",
      },
    },
  ],
};
