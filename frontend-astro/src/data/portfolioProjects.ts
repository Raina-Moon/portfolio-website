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
    id: "zapex-battle",
    title: "Zapex Battle",
    category: "Realtime Product",
    year: "2025",
    tagline: "콘텐츠 배틀과 실시간 상호작용을 한 화면에서 밀어붙인 소셜 실험",
    summary:
      "짧은 몰입 안에 대결, 피드, 랭킹을 묶어 사용자 체류 시간을 높이는 인터랙티브 배틀 경험을 설계했습니다.",
    role: "Frontend Lead",
    timeline: "4 months",
    thumbnail: "/images/image_01.png",
    accent: "#ff7a59",
    stack: ["Next.js", "TypeScript", "WebRTC", "Tailwind CSS"],
    stats: [
      { label: "Focus", value: "Realtime stage UX" },
      { label: "Output", value: "Battle + feed surface" },
      { label: "Priority", value: "Latency & clarity" },
    ],
    overview:
      "라이브 분위기의 속도감과 피드 기반 확산을 동시에 보여주기 위한 프로젝트입니다. 복잡한 상태를 분리하고, 중요한 액션이 묻히지 않도록 시선 흐름을 먼저 설계했습니다.",
    detailSections: [
      {
        title: "What I Solved",
        body: [
          "배틀 시청, 투표, 결과 확인이 분절되지 않도록 하나의 흐름으로 연결했습니다.",
          "모바일에서도 라이브 무드를 유지할 수 있도록 화면 우선순위를 다시 구성했습니다.",
        ],
      },
      {
        title: "System Thinking",
        body: [
          "상태 변화가 잦은 영역은 컴포넌트 책임을 작게 쪼개고, 유저 액션에 바로 반응하는 인터랙션을 우선했습니다.",
          "이벤트성 화면에서 가장 중요한 것은 '지금 무엇을 해야 하는지'가 즉시 보이는 것이라고 판단했습니다.",
        ],
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Raina-Moon" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/daseul-moon-8b064128b/" },
    ],
  },
  {
    id: "moon-archive",
    title: "Moon Archive",
    category: "Brand Portfolio",
    year: "2026",
    tagline: "개인 브랜드와 작업 아카이브를 감성보다 구조로 정리한 포트폴리오 실험",
    summary:
      "소개 페이지를 넘어서 작업 맥락과 결정 이유가 보이도록 정보 구조를 재설계한 개인 포트폴리오 프로젝트입니다.",
    role: "Designer / Frontend",
    timeline: "3 weeks",
    thumbnail: "/images/moon_color.jpg",
    accent: "#9f8cff",
    stack: ["Astro", "React", "GSAP", "Tailwind CSS"],
    stats: [
      { label: "Focus", value: "Brand storytelling" },
      { label: "Output", value: "Interactive archive" },
      { label: "Priority", value: "Visual identity" },
    ],
    overview:
      "보여주기 위한 포트폴리오가 아니라, 어떤 문제를 어떻게 풀었는지를 빠르게 파악할 수 있는 구조를 목표로 했습니다.",
    detailSections: [
      {
        title: "Direction",
        body: [
          "카드형 포트폴리오 대신 씬 기반 탐색을 택해 기억에 남는 첫 인상을 만들었습니다.",
          "텍스트는 짧게 유지하고, 프로젝트별 핵심 판단을 드러내는 방식으로 정리했습니다.",
        ],
      },
      {
        title: "Why It Matters",
        body: [
          "채용 담당자나 협업 대상자는 긴 설명보다 작업 감각과 판단 기준을 먼저 확인합니다.",
          "그래서 이 프로젝트는 결과물보다 선택의 이유를 읽히게 하는 데 초점을 맞췄습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon" }],
  },
  {
    id: "sipsense",
    title: "SipSense",
    category: "Commerce Experience",
    year: "2024",
    tagline: "취향 탐색과 추천 여정을 시각적으로 단순화한 커머스형 UI",
    summary:
      "브랜드 탐색, 추천 흐름, 결과 확인 과정을 하나의 서사처럼 느끼게 만드는 구매 전 경험에 집중했습니다.",
    role: "Frontend Engineer",
    timeline: "6 weeks",
    thumbnail: "/images/sipsenselogo.webp",
    accent: "#efb36d",
    stack: ["React", "TypeScript", "Framer Motion", "Styled Components"],
    stats: [
      { label: "Focus", value: "Discovery flow" },
      { label: "Output", value: "Quiz to recommendation" },
      { label: "Priority", value: "Conversion clarity" },
    ],
    overview:
      "사용자가 자신의 취향을 입력하는 순간마다 다음 행동이 자연스럽게 이어지도록 화면 리듬을 설계했습니다.",
    detailSections: [
      {
        title: "Interaction",
        body: [
          "질문 카드 전환 속도와 결과 도달 타이밍을 세밀하게 조정해 이탈을 줄이는 데 집중했습니다.",
          "추천 결과는 설명 텍스트보다 시각 우선 정보 구조로 전환했습니다.",
        ],
      },
      {
        title: "Frontend Notes",
        body: [
          "애니메이션이 과하면 구매 맥락을 해칠 수 있어, 필요한 곳만 움직이도록 강도를 제한했습니다.",
          "질문 흐름은 재사용 가능한 상태 모델로 분리해 이후 확장이 가능하도록 만들었습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon" }],
  },
  {
    id: "pokemon-playground",
    title: "Pokemon Playground",
    category: "Playful Interface",
    year: "2024",
    tagline: "캐릭터 데이터를 탐험처럼 소비하게 만든 인터랙티브 토이 프로젝트",
    summary:
      "정적인 도감 형태를 벗어나, 빠르게 훑고 비교하고 저장하는 재미를 주는 카드 인터페이스를 구현했습니다.",
    role: "Solo Builder",
    timeline: "2 weeks",
    thumbnail: "/images/pokemon.webp",
    accent: "#69b5ff",
    stack: ["React", "TanStack Query", "Vite", "CSS Modules"],
    stats: [
      { label: "Focus", value: "Playful browse" },
      { label: "Output", value: "Card interaction" },
      { label: "Priority", value: "Speed & delight" },
    ],
    overview:
      "가볍게 즐길 수 있는 프로젝트라도 데이터 탐색 흐름과 카드 UX 완성도는 분명해야 한다는 기준으로 만들었습니다.",
    detailSections: [
      {
        title: "Product Lens",
        body: [
          "탐색성 높은 UI는 정보량보다 조작 피로를 줄이는 것이 중요하다고 보고, 한 번에 이해되는 카드를 설계했습니다.",
          "취향 저장과 비교를 쉽게 만들기 위해 카드 상태 변화를 명확하게 표현했습니다.",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "재미 중심 서비스일수록 첫 10초 안에 규칙이 이해되어야 합니다.",
          "작은 애니메이션도 목적이 분명할 때만 남기는 습관을 강화했습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon" }],
  },
  {
    id: "mentory",
    title: "Mentory",
    category: "Education Platform",
    year: "2023",
    tagline: "멘토링 신청부터 진행까지 흐름이 끊기지 않는 학습 서비스 경험",
    summary:
      "정보 탐색과 신청 결정을 가로막는 지점을 줄이고, 사용자가 안심하고 액션할 수 있는 화면 구조를 만들었습니다.",
    role: "Frontend Developer",
    timeline: "8 weeks",
    thumbnail: "/images/mentory.webp",
    accent: "#40c4aa",
    stack: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS"],
    stats: [
      { label: "Focus", value: "Trust building" },
      { label: "Output", value: "Mentoring journey" },
      { label: "Priority", value: "Decision support" },
    ],
    overview:
      "학습 서비스에서는 예쁜 화면보다 신뢰와 맥락 전달이 먼저라고 보고, 사용자가 망설이는 구간을 짧게 만드는 데 집중했습니다.",
    detailSections: [
      {
        title: "Decision Flow",
        body: [
          "멘토 정보, 후기, 신청 액션이 서로 멀어지지 않도록 정보 밀도를 조절했습니다.",
          "사용자가 지금 신청해도 되는지 판단할 근거를 한 화면 안에 배치했습니다.",
        ],
      },
      {
        title: "Implementation",
        body: [
          "상태 관리 범위를 줄여 페이지별 복잡도를 낮추고, 반복되는 레이아웃을 조립형으로 구성했습니다.",
          "데이터 로딩 상태에서도 UI 구조가 흔들리지 않게 스켈레톤 우선 설계를 사용했습니다.",
        ],
      },
    ],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/daseul-moon-8b064128b/" }],
  },
  {
    id: "timer-lab",
    title: "Timer Lab",
    category: "Utility Product",
    year: "2023",
    tagline: "작은 도구도 사용 습관을 만들 수 있게 다듬은 생산성 실험",
    summary:
      "시간 측정이라는 단순한 기능을 반복 사용 가능한 경험으로 전환하기 위해 피드백 속도와 조작성을 개선했습니다.",
    role: "Product Engineer",
    timeline: "10 days",
    thumbnail: "/images/TimerLogo.webp",
    accent: "#ff5a80",
    stack: ["Astro", "React", "TypeScript", "Local Storage"],
    stats: [
      { label: "Focus", value: "Repeat usability" },
      { label: "Output", value: "Habit-friendly timer" },
      { label: "Priority", value: "Fast interaction" },
    ],
    overview:
      "짧은 세션 안에서 반복 사용하는 도구는 설명 없이 바로 이해되고 즉시 조작되어야 한다는 점을 검증한 프로젝트입니다.",
    detailSections: [
      {
        title: "Execution",
        body: [
          "핵심 액션 버튼과 결과 피드백 간격을 줄여 사용자의 반응 속도에 맞췄습니다.",
          "재방문 시 이전 설정을 빠르게 복원하도록 최소 저장 전략을 사용했습니다.",
        ],
      },
      {
        title: "MVP Thinking",
        body: [
          "필수 흐름만 남기고 부가 기능은 제거해, 사용자가 제품 가치를 즉시 느끼는 데 집중했습니다.",
          "작은 도구일수록 시각적 군더더기가 오히려 사용성을 해친다는 점을 다시 확인했습니다.",
        ],
      },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Raina-Moon" }],
  },
];

export const getPortfolioProject = (id: string | null) =>
  portfolioProjects.find((project) => project.id === id);
