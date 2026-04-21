import { HeroBanner } from "@/components/HeroBanner";
import { HomeEntryLoader } from "@/components/HomeEntryLoader";
import { HomeLastProjects } from "@/components/HomeLastProjects";
import PhotoGallery from "@/components/PhotoGallery";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Home() {
  return (
    <>
      <HomeEntryLoader />
      <HeroBanner />
      {/* Sabit hero için akışta yer tutar: kaydırınca sonraki bölümler üstte gelir */}
      <div className="h-dvh hidden md:block shrink-0" aria-hidden />
      <main
        id="content"
        className="relative z-10 text-foreground bg-[#f9f6f3]"
      >
        <HomeLastProjects />
        <PhotoGallery />
        <ProjectShowcase />
      </main>
    </>
  );
}
