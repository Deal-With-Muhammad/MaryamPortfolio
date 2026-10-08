import { About } from "@/components/about";
import { ArtGallery } from "@/components/art-gallery";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { RevealObserver } from "@/components/reveal-observer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <ArtGallery />
        <About />
        <Contact />
      </main>
      <RevealObserver />
    </>
  );
}
