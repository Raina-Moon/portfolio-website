import InfiniteProjectGallery from "@/components/portfolio/InfiniteProjectGallery";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import { portfolioProjects } from "@/data/portfolioProjects";

export default function GalleryPage() {
  return (
    <main className="portfolio-shell text-black">
      <section className="relative min-h-screen w-full">
        <PortfolioHeader overlay />
        <InfiniteProjectGallery projects={portfolioProjects} />
      </section>
    </main>
  );
}
