"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { TroubleshootingTexts } from "@/libs/texts/troubleshooting";

interface SearchComponentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  texts: TroubleshootingTexts;
}

export const SearchComponent = ({
  searchQuery,
  onSearchChange,
  texts,
}: SearchComponentProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const prevSearchQueryRef = useRef(searchQuery);

  // 디바운스된 검색 함수
  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        onSearchChange(query);
      }, 300);
    },
    [onSearchChange]
  );

  useEffect(() => {
    debouncedSearch(localSearchQuery);
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localSearchQuery, debouncedSearch]);

  // 부모 컴포넌트에서 검색어가 초기화될 때 로컬 상태도 동기화
  useEffect(() => {
    if (searchQuery !== prevSearchQueryRef.current) {
      setLocalSearchQuery(searchQuery);
      prevSearchQueryRef.current = searchQuery;
    }
  }, [searchQuery]);

  return (
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          placeholder={texts.searchPlaceholder}
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};