"use client";

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

  return (
    <div>
      <aside>
        <p>Tags</p>
        <ul>
          <li onClick={() => setSelectedTag(null)}>All ({posts.length})</li>
          {Object.entries(tagCount).map(([tag, count]) => (
            <li
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{ cursor: "pointer" }}
            >
              {tag} ({count})
            </li>
          ))}
        </ul>
      </aside>

      <ul>
        {filteredPosts.map((item) => (
          <li key={item.id}>
            <Link href={`/troubleshooting/${item.id}`}>
              <p>{item.title}</p>
              <p>{item.createdAt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
