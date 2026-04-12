import AboutSection from "@/components/AboutSection";
import { HeroBanner } from "@/components/HeroBanner";
import { HomeLastProjects } from "@/components/HomeLastProjects";
import PhotoGallery from "@/components/PhotoGallery";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Home() {
  return (
    <>
      <HeroBanner />
      {/* Sabit hero için akışta yer tutar: kaydırınca sonraki bölümler üstte gelir */}
      <div className="h-dvh shrink-0" aria-hidden />
      <main
        id="content"
        className="relative z-10 text-foreground bg-[#f9f6f3]"
      >
        <AboutSection />
        <PhotoGallery />
        <HomeLastProjects />
        <ProjectShowcase />
      </main>
    </>
  );
}
