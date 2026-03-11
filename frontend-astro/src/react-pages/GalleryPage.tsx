import InfiniteProjectGallery from "@/components/portfolio/InfiniteProjectGallery";
import { portfolioProjects } from "@/data/portfolioProjects";
import { Mail } from "lucide-react";

export default function GalleryPage() {
  return (
    <main className="portfolio-shell text-black">
      <section className="relative min-h-screen w-full">
        <header className="absolute inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <nav className="grid gap-2 sm:grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,0.6fr))]">
            <a className="portfolio-nav portfolio-nav-active" href="/">
              UNVEIL + PROJECTS
            </a>
            <span className="portfolio-nav">RESEARCH</span>
            <span className="portfolio-nav">STUDIO</span>
            <a className="portfolio-nav" href="mailto:contact@raina-moon.com">
              CONTACT
            </a>
          </nav>

          <div className="hidden items-center justify-end sm:flex">
            <a className="portfolio-nav justify-center" href="mailto:contact@raina-moon.com">
              <Mail className="h-3.5 w-3.5" />
            </a>
          </div>
          </div>
        </header>

        <InfiniteProjectGallery projects={portfolioProjects} />
      </section>
    </main>
  );
}
