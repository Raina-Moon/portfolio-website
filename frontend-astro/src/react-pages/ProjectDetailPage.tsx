import type { PortfolioProject } from "@/data/portfolioProjects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type Props = {
  project?: PortfolioProject;
  otherProjects: PortfolioProject[];
};

export default function ProjectDetailPage({ project, otherProjects }: Props) {
  if (!project) {
    return (
      <main className="portfolio-shell min-h-screen px-5 py-10 text-black sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-start justify-center">
          <a href="/" className="portfolio-action">
            <ArrowLeft className="h-4 w-4" />
            Back to gallery
          </a>
          <h1 className="mt-8 text-[clamp(2.5rem,8vw,6rem)] font-semibold tracking-[-0.08em] text-black/84">
            Project not found
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-black/56">
            유효한 `id` 값이 없습니다. 홈에서 다시 프로젝트를 선택해 주세요.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="portfolio-shell min-h-screen px-5 py-4 text-black sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="portfolio-action">
            <ArrowLeft className="h-4 w-4" />
            Back to gallery
          </a>
          <div className="text-xs uppercase tracking-[0.3em] text-black/38">
            Query route / project?id={project.id}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-black/8 bg-white/56 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-black/40">
              <span>{project.category}</span>
              <span>{project.year}</span>
              <span>{project.timeline}</span>
            </div>

            <h1 className="mt-6 max-w-[10ch] text-[clamp(3.4rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-black/84">
              {project.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68">
              {project.tagline}
            </p>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-black/56 sm:text-[15px]">
              {project.overview}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {project.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-black/8 bg-black/[0.03] p-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.25em] text-black/38">
                    {item.label}
                  </div>
                  <div className="mt-3 text-base font-medium text-black/78">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-black/8 bg-[#ebe7df] shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full min-h-[360px] w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(17,18,21,0.56)), radial-gradient(circle at top left, ${project.accent}88, transparent 38%)`,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="max-w-xl text-sm leading-7 text-white/84">{project.summary}</div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="space-y-6 rounded-[30px] border border-black/8 bg-white/56 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8">
            {project.detailSections.map((section) => (
              <article key={section.title}>
                <div className="text-xs uppercase tracking-[0.28em] text-black/38">
                  {section.title}
                </div>
                <div className="mt-4 space-y-4 text-sm leading-7 text-black/58 sm:text-[15px]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-black/8 bg-white/56 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-black/38">Role</div>
              <div className="mt-4 text-2xl font-medium tracking-[-0.04em] text-black/80">{project.role}</div>

              <div className="mt-8 text-xs uppercase tracking-[0.28em] text-black/38">Stack</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-black/62"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="portfolio-action w-full justify-between"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-black/8 bg-white/56 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8">
              <div className="text-xs uppercase tracking-[0.28em] text-black/38">
                More Work
              </div>
              <div className="mt-5 space-y-3">
                {otherProjects.map((item) => (
                  <a
                    key={item.id}
                    href={`/project?id=${item.id}`}
                    className="flex items-center justify-between rounded-[22px] border border-black/8 bg-black/[0.03] px-4 py-4 transition hover:border-black/16 hover:bg-black/[0.05]"
                  >
                    <div>
                      <div className="text-sm font-medium text-black/78">{item.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-black/38">
                        {item.category}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-black/42" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
