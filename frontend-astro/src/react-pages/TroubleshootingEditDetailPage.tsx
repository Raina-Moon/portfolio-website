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

export default TroubleshootingEditDetailPage;
