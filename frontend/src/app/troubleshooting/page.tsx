"use client";

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import { useLanguageStore } from "@/libs/languageStore";
import { troubleshootingTexts } from "@/libs/texts/troubleshooting";
import { SearchComponent } from "@/components/Troubleshooting/SearchComponent";
import { FilterComponent } from "@/components/Troubleshooting/FilterComponent";
import { highlightText } from "@/utils/highlightText";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

const Page = () => {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  // 언어 설정
  const { lang } = useLanguageStore();
  const t = troubleshootingTexts[lang];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchTroubleshootingPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch troubleshooting posts:", err);
        alert("Failed to fetch troubleshooting posts. Please try again later.");
      }
    };
    fetchPosts();
  }, []);

  // 검색과 태그 필터링을 위한 메모이제이션된 계산
  const { filteredPosts, tagCount } = useMemo(() => {
    let filtered = posts;

    // 검색어로 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 선택된 태그로 필터링
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // 태그 카운트 계산 (필터링 전 전체 포스트 기준)
    const tagCount: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

    return { filteredPosts: filtered, tagCount };
  }, [posts, searchQuery, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTag(null);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <SearchComponent
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              texts={t}
            />
          </div>
          
          <FilterComponent
            selectedTag={selectedTag}
            searchQuery={searchQuery}
            tagCount={tagCount}
            totalPosts={posts.length}
            onTagChange={handleTagChange}
            onSearchChange={handleSearchChange}
            onClearFilters={clearFilters}
            texts={t}
          />
        </div>

        {/* 결과 개수 표시 */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPosts.length > 0 ? (
              <>
                {lang === 'ko' ? (
                  <>
                    총 <span className="font-medium text-gray-900">{filteredPosts.length}</span>{t.totalResults}
                    {filteredPosts.length !== posts.length && (
                      <span className="text-gray-500"> (전체 {posts.length}{t.filteredResults})</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="font-medium text-gray-900">{filteredPosts.length}</span> {t.totalResults}
                    {filteredPosts.length !== posts.length && (
                      <span className="text-gray-500"> ({t.filteredResults} {posts.length})</span>
                    )}
                  </>
                )}
              </>
            ) : (<></>)}
          </p>
        </div>

        {/* 포스트 목록 */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {paginatedPosts.map((item) => (
              <Link
                key={item.id}
                href={`/troubleshooting/${item.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {highlightText(item.title, searchQuery)}
                    </h2>
                    <time className="text-sm text-gray-500 ml-4 flex-shrink-0">
                      {new Date(item.createdAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US')}
                    </time>
                  </div>
                  
                  {/* 콘텐츠 미리보기 */}
                  {item.content && (
                    <p className="text-gray-600 line-clamp-2 mb-3">
                      {highlightText(
                        item.content.replace(/<[^>]*>/g, '').slice(0, 150) + 
                        (item.content.length > 150 ? (lang === 'ko' ? '...' : '...') : ''),
                        searchQuery
                      )}
                    </p>
                  )}
                  
                  {/* 태그 */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            selectedTag === tag
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {highlightText(tag, searchQuery)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
              />
            </svg>
            <p className="text-gray-500 text-lg">{t.noResults}</p>
            <p className="text-gray-400 text-sm mt-2">{t.noResultsDescription}</p>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  {t.previous}
                </button>
              )}
              
              {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                .filter(page => {
                  const start = Math.max(1, currentPage - 2);
                  const end = Math.min(totalPages, currentPage + 2);
                  return page >= start && page <= end;
                })
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  {t.next}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
