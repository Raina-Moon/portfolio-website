export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioSection = {
  title: string;
  body: string[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  summary: string;
  role: string;
  timeline: string;
  thumbnail: string;
  accent: string;
  stack: string[];
  stats: Array<{ label: string; value: string }>;
  overview: string;
  detailSections: PortfolioSection[];
  links: PortfolioLink[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "sipsense",
    title: "SipSense",
    category: "Mobile App",
    year: "2025",
    tagline: "하루 콜라 섭취량을 기록하는 iOS/Android 앱을 직접 출시한 모바일 프로젝트",
    summary:
      "어트랙티브한 애니메이션과 강렬한 레드 톤 UI를 적용해, 기록 경험 자체가 만족스럽게 느껴지도록 설계한 앱입니다.",
    role: "Mobile Frontend Developer",
    timeline: "App Store / Play Store launch",
    thumbnail: "/images/sipsenselogo.webp",
    accent: "#efb36d",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    stats: [
      { label: "Focus", value: "Motion-rich logging UX" },
      { label: "Output", value: "iOS + Android release" },
      { label: "Priority", value: "Store-ready polish" },
    ],
    overview:
      "사용자가 하루에 마신 콜라 양을 간편하게 기록할 수 있는 앱입니다. 첫 모바일 앱 출시 프로젝트였고, 빌드/서명/스토어 등록/심사까지 끝까지 직접 진행했습니다.",
    detailSections: [
      {
        title: "Build & Release",
        body: [
          "애플 앱스토어와 구글 플레이 모두에 정식 배포를 완료했습니다.",
          "모션이 많은 UI를 성능 저하 없이 유지하면서도 만족감 있는 기록 경험을 만들었습니다.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "스토어 심사 및 배포 절차를 처음 경험했고, release management 흐름을 익혔습니다.",
          "모션 중심 모바일 UI를 설계할 때 시각적 만족감과 성능 사이의 균형이 중요하다는 점을 배웠습니다.",
        ],
      },
    ],
    links: [
      { label: "Frontend", href: "https://github.com/Raina-Moon/cola-calc-app" },
      { label: "Backend", href: "https://github.com/Raina-Moon/cola-calc-backend" },
    ],
  },
  {
    id: "mentory",
    title: "Mentory",
    category: "Mentor Platform",
    year: "2024",
    tagline: "개발자 멘토-멘티 연결 흐름을 설계한 매칭 플랫폼 프로젝트",
    summary:
      "Supabase 인증, 로그인/회원가입 폼, 홈 레이아웃, GitHub 로그인 트리거까지 직접 구현한 멘토링 서비스입니다.",
    role: "Frontend Developer",
    timeline: "Matching platform build",
    thumbnail: "/images/mentory.webp",
    accent: "#40c4aa",
    stack: ["Supabase", "Next.js", "React", "Tailwind", "TypeScript", "Zustand"],
    stats: [
      { label: "Focus", value: "Auth + onboarding" },
      { label: "Output", value: "Mentor matching flow" },
      { label: "Priority", value: "Trust & profile setup" },
    ],
    overview:
      "개발자 간 멘토-멘티를 연결해주는 플랫폼입니다. 인증과 프로필 생성 흐름을 매끄럽게 연결하는 데 집중했습니다.",
    detailSections: [
      {
        title: "What I Built",
        body: [
          "Supabase auth 기반 로그인/회원가입 흐름을 구현했습니다.",
          "GitHub 로그인 시 트리거를 통해 프로필 이미지와 닉네임이 자동 등록되도록 연결했습니다.",
        ],
      },
      {
        title: "Learning",
        body: [
          "서드파티 인증과 Supabase 트리거를 함께 다루며 인증 흐름 설계 경험을 키웠습니다.",
          "상태 관리와 사용자 온보딩 흐름이 제품 신뢰도에 직접 연결된다는 점을 배웠습니다.",
        ],
      },
    ],
    links: [{ label: "Project", href: "https://mentory-seven.vercel.app/" }],
  },
  {
    id: "korips",
    title: "Korips",
    category: "Reservation Platform",
    year: "2025",
    tagline: "국내외 사용자를 위한 한국 온천 숙소/티켓 예약 플랫폼",
    summary:
      "온천 숙소와 티켓을 예약할 수 있는 다국어 서비스로, i18n, 리치 텍스트 포스팅, 결제까지 포함한 end-to-end 예약 경험을 구현했습니다.",
    role: "Frontend Developer",
    timeline: "3 months",
    thumbnail: "/images/koripsLogo.webp",
    accent: "#7ea6ff",
    stack: ["Next.js", "React", "TypeScript", "Redux", "Axios", "Tailwind CSS", "Sass", "Radix UI", "i18next", "Tiptap", "Toss Payments", "Node.js", "Express", "Prisma", "JWT", "PostgreSQL", "Docker", "Cloudinary", "DeepL", "GitHub Actions", "Nodemailer"],
    stats: [
      { label: "Focus", value: "Reservation + payment" },
      { label: "Output", value: "Multilingual booking platform" },
      { label: "Priority", value: "Ops-ready flow" },
    ],
    overview:
      "한국온천협회 차원의 공식 서비스가 없는 상황에서, 내국인과 외국인 모두 쉽게 접근할 수 있는 예약 플랫폼을 구축한 프로젝트입니다.",
    detailSections: [
      {
        title: "What I Built",
        body: [
          "온천 소개, 숙소/티켓 예약, 리치 텍스트 포스팅, 다국어(i18n), 결제 흐름을 하나의 서비스로 연결했습니다.",
          "Docker와 GitHub Actions 기반으로 운영 가능한 배포 흐름까지 다뤘습니다.",
        ],
      },
      {
        title: "Learning",
        body: [
          "재고/예약, 결제, i18n, 이메일 알림이 연결된 end-to-end 예약 시스템을 설계하는 경험을 쌓았습니다.",
          "프로덕션 수준에서 CI/CD와 운영 흐름을 함께 고려하는 시각을 갖게 됐습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon/korip-web" }],
  },
  {
    id: "hey-local",
    title: "Hey! Local",
    category: "Travel Q&A App",
    year: "2025",
    tagline: "여행자가 현지인에게 질문하고 답을 사는 구조를 만든 Q&A 플랫폼",
    summary:
      "질문/답변 CRUD, Tiptap 에디터, Google Maps API, TOSS 결제, 구매자 전용 댓글 권한까지 구현한 여행 Q&A 서비스입니다.",
    role: "Frontend Developer",
    timeline: "5 weeks",
    thumbnail: "/icons/heylocal.svg",
    accent: "#5ac58f",
    stack: ["Next.js", "OpenAI API", "Tiptap", "Google Maps API", "TOSS Payments", "i18next"],
    stats: [
      { label: "Focus", value: "Q&A + payment flow" },
      { label: "Output", value: "Travel advice platform" },
      { label: "Priority", value: "Permissions & UX" },
    ],
    overview:
      "여행자가 현지인에게 직접 질문할 수 있는 서비스입니다. 질문과 답변 전 과정을 다루면서 결제와 권한 제어까지 연결했습니다.",
    detailSections: [
      {
        title: "What I Built",
        body: [
          "질문/답변 CRUD 전체를 직접 구현했고, Tiptap 에디터로 자유로운 포스팅이 가능하게 만들었습니다.",
          "Google Maps API로 위치 기반 게시물을 지원하고, TOSS 결제로 포인트 충전 및 질문 구매 흐름을 연결했습니다.",
        ],
      },
      {
        title: "Learning",
        body: [
          "결제 API와 실제 서비스 수준의 사용자 권한 설계를 함께 다루는 경험을 했습니다.",
          "디자이너와 협업하며 UX 완성도를 높이는 방법을 배웠습니다.",
        ],
      },
    ],
    links: [{ label: "Project", href: "https://heylocal.site/" }],
  },
  {
    id: "byaht",
    title: "BYAHT",
    category: "Frontend Role",
    year: "2026",
    tagline: "주니어 프론트엔드 개발자로 합류해 실제 제품 기능 개선을 시작한 커리어 카드",
    summary:
      "Byaht에서 주니어 프론트엔드로 합류해 팀과 협업하며 사용자 기능을 개발하고 개선하기 시작한 역할 기반 프로젝트입니다.",
    role: "Junior Frontend Developer",
    timeline: "Team collaboration",
    thumbnail: "/images/image_02.png",
    accent: "#d18cff",
    stack: ["React", "TypeScript", "Product Frontend"],
    stats: [
      { label: "Focus", value: "User-facing features" },
      { label: "Output", value: "Product contributions" },
      { label: "Priority", value: "Team execution" },
    ],
    overview:
      "Byaht에서 주니어 프론트엔드 개발자로 합류하며 실제 서비스 기능을 개발하고 개선하기 시작한 커리어 포인트입니다.",
    detailSections: [
      {
        title: "Role",
        body: [
          "팀과 협업하며 사용자 기능을 개발하고 개선하는 역할을 맡았습니다.",
          "실제 제품 환경에서 기능 개발, 유지보수, 협업 흐름을 경험하기 시작한 시점입니다.",
        ],
      },
    ],
    links: [],
  },
  {
    id: "stackly",
    title: "Stackly",
    category: "Social Product",
    year: "2026",
    tagline: "피그마 스타일 실시간 협업, 칸반보드, 보이스톡을 결합한 end-to-end 협업 플랫폼",
    summary:
      "Next.js 프론트엔드, NestJS 백엔드, PostgreSQL, Socket.IO, WebRTC를 혼자 묶어 실시간 협업 제품 전체를 설계·구현한 프로젝트입니다.",
    role: "Solo Fullstack Builder",
    timeline: "End-to-end solo build",
    thumbnail: "/images/image_03.png",
    accent: "#77b9ff",
    stack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Socket.IO", "WebRTC (simple-peer)", "Tailwind CSS", "TanStack Query", "Turborepo", "Protobuf", "Rust/WASM", "Docker"],
    stats: [
      { label: "Focus", value: "Realtime collaboration" },
      { label: "Output", value: "Kanban + voice workspace" },
      { label: "Priority", value: "Responsiveness" },
    ],
    overview:
      "Stackly는 칸반보드, 실시간 프레즌스, 보이스톡을 하나로 묶은 협업 플랫폼입니다. 제품 구조부터 실시간 메시지 최적화까지 혼자 end-to-end로 다뤘습니다.",
    detailSections: [
      {
        title: "What I Built",
        body: [
          "Next.js 프론트엔드, NestJS 백엔드, PostgreSQL 데이터 모델링까지 전체 아키텍처를 설계하고 구현했습니다.",
          "Socket.IO 기반 실시간 협업과 WebRTC(simple-peer) 기반 보이스톡 시그널링을 구현했습니다.",
        ],
      },
      {
        title: "Performance",
        body: [
          "Protobuf + Rust/WASM 기반 실시간 메시지 처리 최적화를 적용해 협업 인터랙션 반응성을 개선했습니다.",
          "보드/일정 관리 흐름까지 포함해 협업 제품으로서 필요한 핵심 사용 흐름을 직접 연결했습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon/stackly.git" }],
  },
  {
    id: "zapex-app",
    title: "Zapex App",
    category: "Mobile Product",
    year: "2025",
    tagline: "모바일 중심 사용 흐름과 브랜드 감각을 함께 담기 위한 앱 카드",
    summary:
      "기존 Zapex 관련 작업과 별개로 앱 차원의 결과물을 묶어 보여주기 위한 placeholder 카드입니다.",
    role: "App Frontend",
    timeline: "TBD",
    thumbnail: "/images/image_01.png",
    accent: "#ff8c6e",
    stack: ["React Native", "TypeScript", "Expo"],
    stats: [
      { label: "Focus", value: "Mobile flow" },
      { label: "Output", value: "App UI" },
      { label: "Priority", value: "Speed" },
    ],
    overview:
      "추후 Zapex App asset과 세부 설명을 추가하기 위한 프로젝트 카드입니다.",
    detailSections: [
      {
        title: "Placeholder",
        body: [
          "썸네일과 링크는 나중에 실제 asset으로 교체할 예정입니다.",
        ],
      },
    ],
    links: [],
  },
  {
    id: "tshela-baby-invitation",
    title: "Tshela's Baby Invitation",
    category: "Event Microsite",
    year: "2025",
    tagline: "초대장의 감정선과 정보 전달을 함께 담기 위한 마이크로사이트 카드",
    summary:
      "실제 초대장 asset 추가 전, 프로젝트 위치와 기본 설명을 잡아두기 위한 placeholder 카드입니다.",
    role: "Designer / Frontend",
    timeline: "TBD",
    thumbnail: "/images/moon_color.jpg",
    accent: "#f2b0a2",
    stack: ["Astro", "React", "Tailwind CSS"],
    stats: [
      { label: "Focus", value: "Invitation flow" },
      { label: "Output", value: "Microsite" },
      { label: "Priority", value: "Tone" },
    ],
    overview:
      "행사용 마이크로사이트 자산이 준비되기 전 임시로 구성한 카드입니다.",
    detailSections: [
      {
        title: "Placeholder",
        body: [
          "실제 비주얼과 카피는 이후 asset 추가와 함께 교체됩니다.",
        ],
      },
    ],
    links: [],
  },
];

export const getPortfolioProject = (id: string | null) =>
  portfolioProjects.find((project) => project.id === id);
