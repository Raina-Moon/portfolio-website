import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import CodeBlock from "@/components/Troubleshooting/CodeBlock";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { fetchTroubleshootingPost, fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { useLanguageStore } from "@/libs/languageStore";
import type { Troubleshooting } from "@/types/types";
import parse, { type DOMNode, Element, domToReact } from "html-react-parser";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  id: string;
};

const formatLongDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));

const estimateReadTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const minutes = Math.max(1, Math.round(text.split(" ").length / 180));
  return `${minutes} min read`;
};

export default function TroubleshootingDetailPage({ id }: Props) {
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
        setAllPosts(
          postsData.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchData();
  }, [id]);

  const displayTitle = useMemo(() => {
    if (!post) return "";
    return lang !== post.language && post.translatedTitle
      ? post.translatedTitle
      : post.title;
  }, [lang, post]);

  const displayContent = useMemo(() => {
    if (!post) return "";
    return lang !== post.language && post.translatedContent
      ? post.translatedContent
      : post.content;
  }, [lang, post]);

  const { prevPost, nextPost } = useMemo(() => {
    if (!post || allPosts.length === 0) return { prevPost: null, nextPost: null };
    const idx = allPosts.findIndex((p) => p.id === post.id);
    return {
      prevPost: idx > 0 ? allPosts[idx - 1] : null,
      nextPost: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
    };
  }, [allPosts, post]);

  const content = useMemo(() => {
    if (!displayContent) return null;

    return parse(displayContent, {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.name === "pre") {
          const codeEl = domNode.children.find(
            (child): child is Element =>
              child instanceof Element && child.name === "code"
          );
          const code = codeEl
            ? domToReact(codeEl.children as DOMNode[])
            : domToReact(domNode.children as DOMNode[]);
          const codeText = extractText(domNode);

          return <CodeBlock code={codeText}>{code}</CodeBlock>;
        }
      },
    });
  }, [displayContent]);

  if (!post) {
    return (
      <>
        <PortfolioHeader />
        <div className="px-6 py-10 sm:px-10">
          <LoadingScreen label="Loading post" fullHeight />
        </div>
      </>
    );
  }

  const getDisplayTitle = (item: Troubleshooting) =>
    lang !== item.language && item.translatedTitle ? item.translatedTitle : item.title;

  return (
    <>
      <PortfolioHeader />
      <main className="px-6 pb-28 pt-12 sm:px-10">
        <article className="mx-auto max-w-3xl">
          <a
            href="/troubleshooting"
            className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/38"
          >
            Back to writing
          </a>

          <header className="mt-10 border-b border-black/10 pb-10">
            <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/36">
              {formatLongDate(post.createdAt)} · {estimateReadTime(displayContent)}
            </div>
            <h1 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,7vw,5.6rem)] leading-[0.94] tracking-[-0.07em] text-black/88">
              {displayTitle}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/8 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-black/42"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="troubleshooting-content mt-12 font-[Georgia,'Times_New_Roman',serif] text-[20px] leading-[1.95] text-black/78">
            {content}
          </div>

          <nav className="mt-20 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-2">
            {prevPost ? (
              <a
                href={`/troubleshooting/${prevPost.id}`}
                className="rounded-[24px] border border-black/8 bg-white/66 p-5 transition hover:bg-white/82"
              >
                <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/34">
                  Previous
                </div>
                <div className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-[1.5rem] leading-[1.08] tracking-[-0.04em] text-black/84">
                  {getDisplayTitle(prevPost)}
                </div>
              </a>
            ) : <div />}

            {nextPost ? (
              <a
                href={`/troubleshooting/${nextPost.id}`}
                className="rounded-[24px] border border-black/8 bg-white/66 p-5 text-left transition hover:bg-white/82 sm:text-right"
              >
                <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/34">
                  Next
                </div>
                <div className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-[1.5rem] leading-[1.08] tracking-[-0.04em] text-black/84">
                  {getDisplayTitle(nextPost)}
                </div>
              </a>
            ) : <div />}
          </nav>
        </article>
      </main>
    </>
  );
}

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
