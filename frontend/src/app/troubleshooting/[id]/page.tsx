import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const post = await fetchTroubleshootingPost(params.id);
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default page;
