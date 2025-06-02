"use client";

import TroubleshootingSection from "@/components/Troubleshooting/TroubleshootingSection";
import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Troubleshooting[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("troubleshooting-password");
    if (saved === "true") {
      setAuthorized(true);
    }

    const fetchPosts = async () => {
      try {
        const data = await fetchTroubleshootingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching troubleshooting posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const checkedPassword = () => {
    if (password === process.env.NEXT_PUBLIC_TROUBLESHOOTING_PASSWORD) {
      sessionStorage.setItem("troubleshooting-password", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  return authorized ? (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link
              href={`/troubleshooting/edit/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <TroubleshootingSection />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Troubleshooting Section</h1>
      <p className="mb-4">
        Please enter the password to access the troubleshooting section.
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
        placeholder="Enter password"
      />
      <button
        onClick={checkedPassword}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default page;
