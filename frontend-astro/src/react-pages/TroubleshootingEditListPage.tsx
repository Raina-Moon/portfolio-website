import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import TroubleshootingSection, {
  type TroubleshootingSectionHandler,
} from "@/components/Troubleshooting/TroubleshootingSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import {
  createTroubleshootingPost,
  fetchTroubleshootingPosts,
} from "@/libs/api/troubleshooting";
import {
  hasValidTroubleshootingToken,
  issueTroubleshootingToken,
} from "@/libs/troubleshootingAuth";
import type { Troubleshooting } from "@/types/types";
import { ArrowUpRight, LockKeyhole, Plus, Sparkles } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));

const sortPosts = (items: Troubleshooting[]) =>
  [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

export default function TroubleshootingEditListPage() {
  const editorPassword = import.meta.env.PUBLIC_TROUBLESHOOTING_PASSWORD ?? "";
  const [authorized, setAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Troubleshooting[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const sectionRef = useRef<TroubleshootingSectionHandler>(null);

  useEffect(() => {
    if (hasValidTroubleshootingToken(editorPassword)) {
      setAuthorized(true);
    }
    setAuthChecked(true);
  }, [editorPassword]);

  useEffect(() => {
    if (!authorized) {
      setLoading(false);
      return;
    }

    let active = true;

    const loadPosts = async () => {
      try {
        const data = await fetchTroubleshootingPosts();
        if (!active) return;
        setPosts(sortPosts(data));
      } catch (error) {
        console.error("Error fetching troubleshooting posts:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, [authorized]);

  const latestPost = useMemo(() => posts[0] ?? null, [posts]);

  const checkPassword = () => {
    if (password === editorPassword) {
      issueTroubleshootingToken(editorPassword);
      setAuthorized(true);
      setLoading(true);
      return;
    }

    window.alert("Incorrect password");
  };

  const handleCreate = async () => {
    const values = sectionRef.current?.getValues();
    if (!values || !values.title.trim() || !values.content.trim()) {
      window.alert("Please fill in the title and content before publishing.");
      return;
    }

    setSubmitting(true);

    try {
      await createTroubleshootingPost(
        values.title.trim(),
        values.content,
        values.tags
      );
      const data = await fetchTroubleshootingPosts();
      setPosts(sortPosts(data));
      window.alert("Post created successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Failed to create post:", error);
      window.alert("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authChecked) {
    return <LoadingScreen label="Checking access" fullHeight />;
  }

  if (!authorized) {
    return (
      <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <section className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.22em] text-black/38">
              Private Editor
            </p>
            <h1 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.08em] text-black/88">
              Troubleshooting
              <br />
              control room.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-black/56">
              Draft, revise, and ship technical notes in the same visual system as the public archive.
            </p>
          </div>

          <div className="rounded-[32px] border border-black/8 bg-white/72 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/8 bg-white/72 text-black/72">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-[Georgia,'Times_New_Roman',serif] text-[2.1rem] leading-[0.98] tracking-[-0.06em] text-black/88">
              Enter editor password
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-black/54">
              Access is stored in `localStorage` with a 7-day expiry token.
            </p>

            <div className="mt-8">
              <label
                htmlFor="editor-password"
                className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36"
              >
                Password
              </label>
              <input
                id="editor-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") checkPassword();
                }}
                className="mt-2 w-full rounded-[18px] border border-black/10 bg-white/78 px-4 py-3 text-[15px] text-black/82 outline-none transition focus:border-black/24"
                placeholder="Enter password"
              />
            </div>

            <button
              type="button"
              onClick={checkPassword}
              className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-full border border-black/10 bg-black px-6 text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-black/88"
            >
              Unlock editor
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <PortfolioHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">
        <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[32px] border border-black/8 bg-white/70 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/38">
              <Sparkles className="h-3.5 w-3.5" />
              Editor dashboard
            </div>
            <h1 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.08em] text-black/88">
              Write fixes
              <br />
              before they vanish.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-7 text-black/56">
              Manage the troubleshooting archive, publish new notes, and keep the operational memory in one place.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-black/8 bg-white/78 p-4">
                <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36">
                  Total posts
                </div>
                <div className="mt-2 text-[2rem] font-semibold tracking-[-0.06em] text-black/84">
                  {posts.length}
                </div>
              </div>
              <div className="rounded-[22px] border border-black/8 bg-white/78 p-4">
                <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36">
                  Latest entry
                </div>
                <div className="mt-2 text-sm leading-6 text-black/72">
                  {latestPost ? latestPost.title : "No posts yet"}
                </div>
              </div>
            </div>

            <a
              href="/troubleshooting"
              className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-black/10 bg-white/76 px-5 text-[11px] uppercase tracking-[0.16em] text-black/72 transition hover:bg-white"
            >
              Open public archive
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-[32px] border border-black/8 bg-white/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/38">
              <Plus className="h-3.5 w-3.5" />
              New post
            </div>
            <h2 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[2.2rem] leading-[0.98] tracking-[-0.06em] text-black/88">
              Compose a new troubleshooting note
            </h2>
            <div className="mt-6">
              <TroubleshootingSection ref={sectionRef} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCreate}
                disabled={submitting}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-black/10 bg-black px-6 text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Publishing" : "Publish note"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-black/8 bg-white/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/36">
                Existing posts
              </p>
              <h2 className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-[2rem] leading-[0.98] tracking-[-0.06em] text-black/88">
                Edit the archive
              </h2>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <LoadingScreen label="Loading posts" fullHeight={false} />
            ) : posts.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {posts.map((post) => (
                  <a
                    key={post.id}
                    href={`/troubleshooting/edit/${post.id}`}
                    className="group rounded-[24px] border border-black/8 bg-white/82 p-5 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-4 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36">
                      <span>{formatDate(post.createdAt)}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <h3 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[1.85rem] leading-[1.02] tracking-[-0.05em] text-black/86">
                      {post.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/8 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-black/42"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-black/12 bg-white/54 px-5 py-8 text-[15px] text-black/48">
                No posts yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
