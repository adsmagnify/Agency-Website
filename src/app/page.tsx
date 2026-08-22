import HeroSection from "@/components/HeroSection";
import GalleryTunnel from "@/components/GalleryTunnel";
import NextSection from "@/components/NextSection";
import SiteFooter from "@/components/SiteFooter";
import FluidReveal from "@/components/FluidReveal";

export default function Home() {
  return (
    <>
      <FluidReveal />
      <HeroSection />
      <GalleryTunnel />
      <NextSection />
      <SiteFooter />
    </>
  );
}
