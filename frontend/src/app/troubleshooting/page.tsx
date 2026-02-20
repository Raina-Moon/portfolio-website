"use client";

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type SortOrder = "newest" | "oldest";

const Page = () => {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const postsPerPage = 10;

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

  const tagCount: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, selectedTag, debouncedSearch, sortOrder]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 300);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-row px-5 py-10">
      <aside className="border-r border-gray-300 pr-10 h-full">
        <p className="text-gray-800 font-bold text-6xl mb-6">Tags</p>
        <ul>
          <li onClick={() => handleTagChange(null)}>
            <p
              className={`font-semibold text-xl mb-2 cursor-pointer ${
                selectedTag === null ? "text-blue-600" : "text-gray-700"
              }`}
            >
              All ({posts.length})
            </p>
          </li>
          {Object.entries(tagCount).map(([tag, count]) => (
            <li
              key={tag}
              onClick={() => handleTagChange(tag)}
              className="cursor-pointer"
            >
              <p
                className={`font-semibold text-xl mb-2 ml-3 hover:underline ${
                  selectedTag === tag ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {tag} ({count})
              </p>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex flex-col w-full ml-10 mx-20 mt-10 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title or content..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <div className="flex rounded-lg border border-gray-300 overflow-hidden shrink-0">
            <button
              onClick={() => handleSortChange("newest")}
              className={`px-3 py-2 text-sm ${
                sortOrder === "newest"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => handleSortChange("oldest")}
              className={`px-3 py-2 text-sm ${
                sortOrder === "oldest"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Oldest
            </button>
          </div>
        </div>

        <ul>
          {paginatedPosts.map((item) => (
            <li key={item.id} className="mb-4 border-b border-gray-300 pb-2 hover:bg-gray-50">
              <Link href={`/troubleshooting/${item.id}`} className="flex flex-row justify-between items-center">
                <p className="text-2xl text-gray-900">{item.title}</p>
                <p className="text-gray-600">{new Date(item.createdAt).toDateString()}</p>
              </Link>
            </li>
          ))}
          {paginatedPosts.length === 0 && (
            <li className="text-gray-500 text-center py-10">No posts found.</li>
          )}
        </ul>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  onClick={() => setCurrentPage(page)}
                  key={page}
                  className={`px-3 py-1 mx-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
