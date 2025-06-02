"use client";

import {
  deletePost,
  fetchTroubleshootingPost,
} from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Troubleshooting | null>(null);
  const [title, setTitle] = useState("");

  const id = parseInt(params.id, 10);

  const handleDelete = async () => {
    await deletePost(id);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchTroubleshootingPost(id);
        setPost(data);
        setTitle(data.title);
      } catch (error) {
        console.error("Error fetching troubleshooting post:", error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default page;
