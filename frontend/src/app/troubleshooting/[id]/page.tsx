"use client"

import { fetchTroubleshootingPost } from "@/libs/api/troubleshooting";
import { Troubleshooting } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import CodeBlock from "@/components/Troubleshooting/CodeBlock";

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
  }, [params]);

  if (!post) {
    return (
      <div className="flex flex-col p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const content = parse(post.content, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeEl = domNode.children.find(
          (child): child is Element => child instanceof Element && child.name === "code"
        );
        const code = codeEl
          ? domToReact(codeEl.children as DOMNode[])
          : domToReact(domNode.children as DOMNode[]);
        const codeText = extractText(domNode);

        return <CodeBlock code={codeText}>{code}</CodeBlock>;
      }
    },
  });

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-4 mx-4">
        <p className="text-4xl font-semibold">{post.title}</p>
        <p className="text-grey-700 text-sm mt-6">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <div className="border mx-4"/>
      <div className="troubleshooting-content mt-7 mb-20 mx-4">
        {content}
      </div>
    </div>
  );
};

function extractText(node: Element): string {
  let text = "";
  for (const child of node.children) {
    if (child.type === "text") {
      text += (child as unknown as { data: string }).data;
    } else if (child instanceof Element) {
      text += extractText(child);
    }
  }
  return text;
}

export default Page;
