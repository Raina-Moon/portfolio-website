"use client";

import TroubleshootingSection, {
  TroubleshootingSectionHandler,
} from "@/components/Troubleshooting/TroubleshootingSection";
import {
  deletePost,
  fetchTroubleshootingPost,
  updatePost,
} from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [post, setPost] = useState<Troubleshooting | null>(null);
  const sectionRef = useRef<TroubleshootingSectionHandler>(null);

  const {id} = use(params)
  const numericId = Number(id);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchTroubleshootingPost(numericId);
        setPost(data);
      } catch (error) {
        console.error("Error fetching troubleshooting post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpload = async () => {
    const values = sectionRef.current?.getValues();
    console.log("Values from section:", values);

    if (!values || !values.title || !values.content) {
    alert("Please fill in all fields before uploading.");
    return;
  }

    try {
      await updatePost(numericId, values.title, values.content, values.tags);
      router.push("/troubleshooting/edit");
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  const handleDelete = async () => {
    await deletePost(numericId);
    router.push("/troubleshooting/edit");
  };

  return (
     <div>
    {!post ? (
      <p>Loading...</p>
    ) : (
      <>
        <TroubleshootingSection
          ref={sectionRef}
          postId={numericId}
          initialTitle={post.title}
          initialContent={post.content}
          initialTags={post.tags}
        />
        <button onClick={handleUpload}>Upload</button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded-md"
        >
          Delete
        </button>
      </>
    )}
  </div>
);
};

export default page;
