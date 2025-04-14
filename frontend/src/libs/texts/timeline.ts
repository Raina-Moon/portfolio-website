import { Language } from "../languageStore";

export interface TimelineItem {
    date: string;
    title: string;
    description: string;
  }
    
  export const timelineItems: Record<Language, TimelineItem[]> = {
    en: [
      {
        date: 'Sep 2024',
        title: 'Joined Sparta BootCamp',
        description: 'Started my coding journey by joining Sparta BootCamp.',
      },
      {
        date: 'Oct 24, 2024',
        title: 'Movie Search Engine',
        description: 'Built using TMDB API, vanilla JavaScript (DOM), HTML5, and CSS.',
      },
      {
        date: 'Nov 1, 2024',
        title: 'Olympic Medal Table',
        description: 'Developed with React, Vite.js, React Hook, and CSS.',
      },
      {
        date: 'Nov 12, 2024',
        title: 'Pokémon Encyclopedia',
        description: 'Used Redux, React, React Router DOM, styled-components, and Vite.js.',
      },
      {
        date: 'Nov 28, 2024',
        title: 'MBTI Test Page',
        description: 'Built using Axios, React, styled-components, Vite.js.',
      },
      {
        date: 'Dec 2, 2024',
        title: 'Boonguhppang Sharing Site',
        description: 'Used Kakao Maps, Supabase, Zustand, TanStack Query, Toastify, styled-components.',
      },
      {
        date: 'Dec 19, 2024',
        title: 'LOL Champion Search',
        description: 'Used LOL API, React, Tailwind CSS, TypeScript, Next.js, React Query.',
      },
      {
        date: 'Dec 30, 2024',
        title: 'Mentor-Mentee Matching',
        description: 'Made with React, Supabase, Zustand, Tailwind, Next.js, TypeScript.',
      },
      {
        date: 'Feb 7, 2025',
        title: 'Travel Q&A App',
        description: 'Used OpenAI API, TOSS Pay, Tiptap, Google Maps API, i18next, Next.js.',
      },
      {
        date: 'Feb 10, 2025',
        title: 'Sparta BootCamp Graduation',
        description: 'Successfully graduated from the Sparta coding bootcamp.',
      },
      {
        date: 'Mar 2025',
        title: 'Frontend Intern at Kizling',
        description: '1-month internship experience building real features.',
      },
      {
        date: 'Mar 3, 2025',
        title: 'Started Fomofix Project',
        description: 'Built with Docker, Node.js, Express, PostgreSQL, EC2, Cloudinary, etc.',
      },
      {
        date: 'Apr 10, 2025',
        title: 'Fomofix Deployed to EC2',
        description: 'Frontend and backend fully deployed to EC2 using Docker.',
      },
      {
        date: 'Apr 11, 2025',
        title: 'Started React Native Dev',
        description: 'Began building Fomofix mobile version using React Native.',
      },
    ],
    ko: [
      {
        date: '2024년 9월',
        title: 'Sparta 부트캠프 입학',
        description: '개발 공부를 본격적으로 시작하며 Sparta 부트캠프에 등록함.',
      },
      {
        date: '2024년 10월 24일',
        title: '영화 검색 사이트 개발',
        description: 'TMDB API를 활용해 순수 JS, HTML, CSS로 영화 검색 기능 구현.',
      },
      {
        date: '2024년 11월 1일',
        title: '올림픽 메달 테이블 개발',
        description: 'React, Vite.js, React Hook, CSS로 구성.',
      },
      {
        date: '2024년 11월 12일',
        title: '포켓몬 도감 페이지 개발',
        description: 'Redux, React, styled-components, Vite.js 사용.',
      },
      {
        date: '2024년 11월 28일',
        title: 'MBTI 검사 페이지 제작',
        description: 'Axios, React, styled-components, Vite.js 사용.',
      },
      {
        date: '2024년 12월 2일',
        title: '붕어빵 위치 공유 사이트 개발',
        description: 'Kakao Map SDK, Supabase, Zustand, React Query 등 다양한 기술 스택 사용.',
      },
      {
        date: '2024년 12월 19일',
        title: 'LOL 챔피언 검색 서비스 개발',
        description: 'LOL API, React, Tailwind, TypeScript, Next.js 활용.',
      },
      {
        date: '2024년 12월 30일',
        title: '멘토-멘티 연결 서비스 제작',
        description: 'React, Zustand, Supabase, Tailwind, Next.js 등 사용.',
      },
      {
        date: '2025년 2월 7일',
        title: '여행 Q&A 플랫폼 개발',
        description: 'OpenAI API, TOSS, Tiptap, 구글맵, i18next 등 다양한 라이브러리 적용.',
      },
      {
        date: '2025년 2월 10일',
        title: 'Sparta 부트캠프 수료',
        description: '약 5개월 간의 부트캠프 교육과정을 성실히 수료.',
      },
      {
        date: '2025년 3월',
        title: 'Kizling 웹 프론트엔드 인턴',
        description: '1개월간 실무 웹 개발 경험 쌓음.',
      },
      {
        date: '2025년 3월 3일',
        title: 'Fomofix 개발 시작',
        description: 'Docker, EC2, Node.js, Express, Cloudinary 등으로 백엔드 구축.',
      },
      {
        date: '2025년 4월 10일',
        title: 'Fomofix EC2 배포 완료',
        description: '프론트와 백엔드 모두 EC2에 성공적으로 배포.',
      },
      {
        date: '2025년 4월 11일',
        title: 'React Native 앱 개발 시작',
        description: 'Fomofix의 모바일 버전 개발 시작.',
      },
    ],
  };
  