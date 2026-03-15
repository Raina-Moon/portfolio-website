import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import TroubleshootingSection, {
  type TroubleshootingSectionHandler,
} from "@/components/Troubleshooting/TroubleshootingSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import {
  deletePost,
  fetchTroubleshootingPost,
  updatePost,
} from "@/libs/api/troubleshooting";
import { hasValidTroubleshootingToken } from "@/libs/troubleshootingAuth";
import type { Troubleshooting } from "@/types/types";
import { ArrowLeft, ArrowUpRight, Save, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  id: string;
};
const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));

export default function TroubleshootingEditDetailPage({ id }: Props) {
  const editorPassword = import.meta.env.PUBLIC_TROUBLESHOOTING_PASSWORD ?? "";
  const [authorized, setAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [post, setPost] = useState<Troubleshooting | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const sectionRef = useRef<TroubleshootingSectionHandler>(null);
  const numericId = Number(id);

  useEffect(() => {
    if (hasValidTroubleshootingToken(editorPassword)) {
      setAuthorized(true);
    }
    setAuthChecked(true);
  }, [editorPassword]);

  useEffect(() => {
    if (authChecked && !authorized) {
      window.location.href = "/troubleshooting/edit";
    }
  }, [authChecked, authorized]);

  useEffect(() => {
    if (!authorized || !Number.isFinite(numericId)) {
      setLoading(false);
      return;
    }

    let active = true;

    const loadPost = async () => {
      try {
        const data = await fetchTroubleshootingPost(numericId);
        if (!active) return;
        setPost(data);
      } catch (error) {
        console.error("Error fetching troubleshooting post:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPost();

    return () => {
      active = false;
    };
  }, [authorized, numericId]);

  const summary = useMemo(() => {
    if (!post) return "";
    const text = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text.length > 180 ? `${text.slice(0, 180).trim()}...` : text;
  }, [post]);

  const handleSave = async () => {
    const values = sectionRef.current?.getValues();
    if (!values || !values.title.trim() || !values.content.trim()) {
      window.alert("Please fill in the title and content before saving.");
      return;
    }

    setSaving(true);

    try {
      await updatePost(numericId, values.title.trim(), values.content, values.tags);
      window.location.href = "/troubleshooting/edit";
    } catch (error) {
      console.error("Failed to update post:", error);
      window.alert("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this troubleshooting post?");
    if (!confirmed) return;

    setDeleting(true);

    try {
      await deletePost(numericId);
      window.location.href = "/troubleshooting/edit";
    } catch (error) {
      console.error("Failed to delete post:", error);
      window.alert("Failed to delete post. Please try again.");
      setDeleting(false);
    }
  };

  if (!authChecked) {
    return <LoadingScreen label="Checking access" fullHeight />;
  }

  if (!authorized) {
    return <LoadingScreen label="Redirecting" fullHeight />;
  }

  return (
    <>
      <PortfolioHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10 lg:px-12">
        {loading ? (
          <LoadingScreen label="Loading post" fullHeight />
        ) : !post ? (
          <section className="rounded-[32px] border border-black/8 bg-white/72 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/36">
              Not found
            </p>
            <h1 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[2.4rem] leading-[0.98] tracking-[-0.06em] text-black/88">
              This post could not be loaded.
            </h1>
            <a
              href="/troubleshooting/edit"
              className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-black/10 bg-white/78 px-5 text-[11px] uppercase tracking-[0.16em] text-black/72 transition hover:bg-white"
            >
              Back to editor
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </section>
        ) : (
          <>
            <section className="rounded-[32px] border border-black/8 bg-white/72 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
              <a
                href="/troubleshooting/edit"
                className="inline-flex items-center gap-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/42 transition hover:text-black/68"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to editor list
              </a>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-black/36">
                    Editing post
                  </p>
                  <h1 className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.8rem,6vw,5rem)] leading-[0.94] tracking-[-0.08em] text-black/88">
                    {post.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-[16px] leading-7 text-black/56">
                    {summary || "No summary available yet."}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[22px] border border-black/8 bg-white/8 p-4">
                    <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36">
                      Published
                    </div>
                    <div className="mt-2 text-sm leading-6 text-black/74">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                  <div className="rounded-[22px] border border-black/8 bg-white/8 p-4">
                    <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.16em] text-black/36">
                      Tags
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/8 px-2.5 py-1 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-black/42"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[32px] border border-black/8 bg-white/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
              <TroubleshootingSection
                ref={sectionRef}
                postId={numericId}
                initialTitle={post.title}
                initialContent={post.content}
                initialTags={post.tags}
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || deleting}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-black/10 bg-black px-6 text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-3.5 w-3.5" />
                  {saving ? "Saving" : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-red-200 bg-white px-6 text-[11px] uppercase tracking-[0.16em] text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deleting ? "Deleting" : "Delete post"}
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
