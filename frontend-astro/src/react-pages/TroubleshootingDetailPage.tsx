import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import type { Troubleshooting } from "@/types/types";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

const TroubleshootingDetailPage = ({ id }: Props) => {
  const [post, setPost] = useState<Troubleshooting | null>(null);

  useEffect(() => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;

    const fetchData = async () => {
      try {
        const data = await fetchTroubleshootingPost(numericId);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
  }, [id]);

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
      <div className="border mx-4" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="mt-7 mb-20" />
    </div>
  );
};

export default TroubleshootingDetailPage;
