import { fetchTroubleshootingPost, fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import type { Troubleshooting } from "@/types/types";
import React, { useEffect, useMemo, useState } from "react";
import parse, { type DOMNode, domToReact, Element } from "html-react-parser";
import CodeBlock from "@/components/Troubleshooting/CodeBlock";
import { useLanguageStore } from "@/libs/languageStore";

type Props = {
  id: string;
};

const TroubleshootingDetailPage = ({ id }: Props) => {
  const [post, setPost] = useState<Troubleshooting | null>(null);
  const [allPosts, setAllPosts] = useState<Troubleshooting[]>([]);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;

    const fetchData = async () => {
      try {
        const [postData, postsData] = await Promise.all([
          fetchTroubleshootingPost(numericId),
          fetchTroubleshootingPosts(),
        ]);
        setPost(postData);
        setAllPosts(postsData.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ));
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
  }, [id]);

  const displayTitle = useMemo(() => {
    if (!post) return "";
    if (lang !== post.language && post.translatedTitle) return post.translatedTitle;
    return post.title;
  }, [post, lang]);

  const displayContent = useMemo(() => {
    if (!post) return "";
    if (lang !== post.language && post.translatedContent) return post.translatedContent;
    return post.content;
  }, [post, lang]);

  const { prevPost, nextPost } = useMemo(() => {
    if (!post || allPosts.length === 0) return { prevPost: null, nextPost: null };
    const idx = allPosts.findIndex((p) => p.id === post.id);
    return {
      prevPost: idx > 0 ? allPosts[idx - 1] : null,
      nextPost: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
    };
  }, [post, allPosts]);

  if (!post) {
    return (
      <div className="flex flex-col p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const content = parse(displayContent, {
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

  const getDisplayTitle = (p: Troubleshooting) => {
    if (lang !== p.language && p.translatedTitle) return p.translatedTitle;
    return p.title;
  };

  return (
    <div className="flex flex-col px-6 py-20">
      <div className="flex justify-between items-center mb-4 mx-4">
        <p className="text-4xl font-semibold">{displayTitle}</p>
        <p className="text-grey-700 text-sm mt-6">{new Date(post.createdAt).toDateString()}</p>
      </div>
      <div className="border mx-4" />
      <div className="troubleshooting-content mt-7 mb-12 mx-4">
        {content}
      </div>

      {/* Prev / Next Navigation */}
      <nav className="mx-4 border-t border-gray-200 pt-6 grid grid-cols-2 gap-4">
        {prevPost ? (
          <a
            href={`/troubleshooting/${prevPost.id}`}
            className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition"
          >
            <span className="text-xs text-gray-400 mb-1">&larr; Previous</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-1">
              {getDisplayTitle(prevPost)}
            </span>
          </a>
        ) : (
          <div />
        )}
        {nextPost ? (
          <a
            href={`/troubleshooting/${nextPost.id}`}
            className="group flex flex-col items-end text-right p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition"
          >
            <span className="text-xs text-gray-400 mb-1">Next &rarr;</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-1">
              {getDisplayTitle(nextPost)}
            </span>
          </a>
        ) : (
          <div />
        )}
      </nav>
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

export default TroubleshootingDetailPage;
