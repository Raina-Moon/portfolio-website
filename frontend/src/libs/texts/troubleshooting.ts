import { Language } from "../languageStore";

export interface TroubleshootingTexts {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  clearFilters: string;
  filterByTags: string;
  all: string;
  searchLabel: string;
  tagLabel: string;
  totalResults: string;
  filteredResults: string;
  noResults: string;
  noResultsDescription: string;
  previous: string;
  next: string;
  readMore: string;
}

export const troubleshootingTexts: Record<Language, TroubleshootingTexts> = {
  en: {
    title: "Troubleshooting",
    subtitle: "Sharing problem-solving experiences and knowledge",
    searchPlaceholder: "Search by title, content, or tags...",
    clearFilters: "Clear Filters",
    filterByTags: "Filter by Tags",
    all: "All",
    searchLabel: "Search",
    tagLabel: "Tag",
    totalResults: "total posts",
    filteredResults: "out of",
    noResults: "No posts found matching your search criteria",
    noResultsDescription: "Try searching with different keywords",
    previous: "Previous",
    next: "Next",
    readMore: "Read more...",
  },
  ko: {
    title: "문제 해결",
    subtitle: "문제 해결 경험과 지식을 공유합니다",
    searchPlaceholder: "제목, 내용, 태그로 검색...",
    clearFilters: "필터 초기화",
    filterByTags: "태그로 필터링",
    all: "전체",
    searchLabel: "검색",
    tagLabel: "태그",
    totalResults: "개의 글",
    filteredResults: "개 중",
    noResults: "검색 조건에 맞는 글을 찾을 수 없습니다",
    noResultsDescription: "다른 키워드로 검색해보세요",
    previous: "이전",
    next: "다음",
    readMore: "더 보기...",
  },
};