"use client";

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/libs/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);

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

  return (
    <div>
      <ul>
        {posts.map((item) => (
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
