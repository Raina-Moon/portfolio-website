"use client"

import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import { CodeBlockRenderer } from "@/components/Troubleshooting/CodeBlockRenderer";
import { Troubleshooting } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams()
  const [post, setPost] = useState<Troubleshooting | null>(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchData = async () => {
      try {
        const data = await fetchTroubleshootingPost(Number(params.id));
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
},[params])

  if (!post) {
    return (
      <div className="flex flex-col p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-4 mx-4">
        <p className="text-4xl font-semibold">{post.title}</p>
        <p className="text-grey-700 text-sm mt-6">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <div className="border mx-4"/>
      <CodeBlockRenderer htmlContent={post.content} />
    </div>
  );
};

export default Page;
