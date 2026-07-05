import { site } from "@content/site";
import { getGalleries } from "@/lib/photos";
import { Hero } from "@/components/hero";
import { Gallery } from "@/components/gallery";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StickyNav } from "@/components/sticky-nav";

export default async function Home() {
  const galleries = await getGalleries();

  return (
    <>
      {site.showStickyNav && <StickyNav />}
      <main>
        <Hero />
        <Gallery galleries={galleries} />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
