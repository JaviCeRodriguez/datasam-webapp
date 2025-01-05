import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { ParticlesHome } from "@/components/sections/particles-home";
import { UsefulLinksHome } from "@/components/sections/useful-links-home";

export default function Home() {
  return (
    <div>
      <ParticlesHome />

      <div className="relative z-10 p-4 bg-white md:p-10">
        <About />
        <UsefulLinksHome />
        <Footer />
      </div>
    </div>
  );
}
