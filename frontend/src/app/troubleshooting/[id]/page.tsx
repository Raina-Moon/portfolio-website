import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const post = await fetchTroubleshootingPost(id);

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-4 mx-4">
      <p className="text-4xl font-semibold">{post.title}</p>
      <p className="text-grey-700 text-sm mt-6">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <div className="border mx-4"/>
      <div dangerouslySetInnerHTML={{ __html: post.content }} 
      className="mt-7 mb-20"/>
    </div>
  );
};

export default Page;
