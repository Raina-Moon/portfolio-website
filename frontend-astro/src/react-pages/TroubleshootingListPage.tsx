import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import { useLanguageStore } from "@/libs/languageStore";
import type { Troubleshooting } from "@/types/types";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const stripHtml = (value: string) =>
  value
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<code[\s\S]*?<\/code>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildSummary = (post: Troubleshooting, lang: string) => {
  const raw =
    lang !== post.language && post.translatedContent
      ? post.translatedContent
      : post.content;
  const text = stripHtml(raw);
  return text.length > 160 ? `${text.slice(0, 160).trim()}...` : text;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));

export default function TroubleshootingListPage() {
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchTroubleshootingPosts();
        setPosts(
          [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        console.error("Failed to fetch troubleshooting posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <PortfolioHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">
        <section className="max-w-3xl">
          <p className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.22em] text-black/42">
            Writing
          </p>
          <h1 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.06em] text-black/88">
            Debugging notes,
            <br />
            field logs, and small repairs.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-7 text-black/56">
            Technical notes from projects, deploys, broken layouts, hydration bugs,
            and the kinds of fixes that are easy to forget until they happen again.
          </p>
        </section>

        <section className="mt-12">
          {posts.length === 0 ? (
            <LoadingScreen label="Loading notes" fullHeight />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => {
            const title =
              lang !== post.language && post.translatedTitle
                ? post.translatedTitle
                : post.title;

            return (
              <article key={post.id} className="group h-full">
                <a
                  href={`/troubleshooting/${post.id}`}
                  className="flex h-full flex-col rounded-[28px] border border-black/8 bg-white/74 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-white/88 hover:shadow-[0_28px_80px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex items-center justify-between gap-4 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/38">
                    <span>{formatDate(post.createdAt)}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <h2 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-[1.9rem] leading-[1.02] tracking-[-0.05em] text-black/88">
                    {title}
                  </h2>

                  <p className="mt-4 flex-1 text-[15px] leading-7 text-black/56">
                    {buildSummary(post, lang)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/8 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-black/42"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </article>
            );
          })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
