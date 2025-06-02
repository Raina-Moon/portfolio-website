"use client";

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const totalPosts = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-row px-5 py-10">
      <aside className="border-r border-gray-300 pr-10 h-full">
        <p className="text-gray-800 font-bold text-6xl mb-6">Tags</p>
        <ul>
          <li onClick={() => setSelectedTag(null)}>
            <p
              className="text-gray-700 font-semibold text-xl mb-2"
              style={{ cursor: "pointer" }}
            >
              All ({posts.length})
            </p>
          </li>
          {Object.entries(tagCount).map(([tag, count]) => (
            <li
              key={tag}
              onClick={() => handleTagChange(tag)}
              style={{ cursor: "pointer" }}
            >
              <p className="text-gray-700 font-semibold text-xl mb-2 ml-3 hover:underline">
                {tag} ({count})
              </p>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex flex-col w-full ml-10 mx-20 mt-10 mb-20">
        <ul>
          {paginatedPosts.map((item) => (
            <li key={item.id} className="mb-4 border-b border-gray-300 pb-2 hover:bg-gray-50">
              <Link href={`/troubleshooting/${item.id}`} className="flex flex-row justify-between items-center">
                <p className="text-2xl text-gray-900">{item.title}</p>
                <p className="text-gray-600">{new Date(item.createdAt).toDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPosts }, (_, idx) => idx + 1).map(
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
      </div>
    </div>
  );
};

export default Page;
