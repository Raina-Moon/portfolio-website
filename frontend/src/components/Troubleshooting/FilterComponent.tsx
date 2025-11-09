"use client";

import { TroubleshootingTexts } from "@/libs/texts/troubleshooting";

interface FilterComponentProps {
  selectedTag: string | null;
  searchQuery: string;
  tagCount: Record<string, number>;
  totalPosts: number;
  onTagChange: (tag: string | null) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  texts: TroubleshootingTexts;
}

export const FilterComponent = ({
  selectedTag,
  searchQuery,
  tagCount,
  totalPosts,
  onTagChange,
  onSearchChange,
  onClearFilters,
  texts,
}: FilterComponentProps) => {
  return (
    <div className="space-y-4">
      {/* 활성 필터 표시 및 초기화 버튼 */}
      {(selectedTag || searchQuery) && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {texts.searchLabel}: &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {texts.tagLabel}: {selectedTag}
                <button
                  onClick={() => onTagChange(null)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          
          <button
            onClick={onClearFilters}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 text-sm"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {texts.clearFilters}
          </button>
        </div>
      )}

      {/* 태그 목록 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">{texts.filterByTags}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagChange(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
              selectedTag === null
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {texts.all} ({totalPosts})
          </button>
          {Object.entries(tagCount)
            .sort(([, a], [, b]) => b - a)
            .map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => onTagChange(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                  selectedTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag} ({count})
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};