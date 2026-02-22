import TroubleshootingSection, {
  type TroubleshootingSectionHandler,
} from "@/components/Troubleshooting/TroubleshootingSection";
import {
  deletePost,
  fetchTroubleshootingPost,
  updatePost,
} from "@/libs/api/troubleshooting";
import type { Troubleshooting } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
};

const TroubleshootingEditDetailPage = ({ id }: Props) => {
  const [post, setPost] = useState<Troubleshooting | null>(null);
  const sectionRef = useRef<TroubleshootingSectionHandler>(null);

  const numericId = Number(id);

  useEffect(() => {
    if (!Number.isFinite(numericId)) return;

    const fetchPost = async () => {
      try {
        const data = await fetchTroubleshootingPost(numericId);
        setPost(data);
      } catch (error) {
        console.error("Error fetching troubleshooting post:", error);
      }
    };
    fetchPost();
  }, [numericId]);

  const handleUpload = async () => {
    const values = sectionRef.current?.getValues();

    if (!values || !values.title || !values.content) {
      alert("Please fill in all fields before uploading.");
      return;
    }

    try {
      await updatePost(numericId, values.title, values.content, values.tags);
      window.location.href = "/troubleshooting/edit";
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  const handleDelete = async () => {
    await deletePost(numericId);
    window.location.href = "/troubleshooting/edit";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {!post ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            <a href="/troubleshooting/edit" className="text-sm text-gray-500 hover:text-gray-700">
              &larr; Back to list
            </a>
          </div>
          <TroubleshootingSection
            ref={sectionRef}
            postId={numericId}
            initialTitle={post.title}
            initialContent={post.content}
            initialTags={post.tags}
          />
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleUpload}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2.5 bg-white text-red-600 font-medium rounded-lg border border-red-300 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TroubleshootingEditDetailPage;
