import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const post = await fetchTroubleshootingPost(id);

  return (
    <div>
      <p>{post.title}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default page;
