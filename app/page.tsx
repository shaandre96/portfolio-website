import { ScrollDraw } from "@/components/animation/ScrollDraw";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="shell">
      <main className="main" id="top">
        <ScrollDraw />
        <Hero />
        <About />
        <SelectedWork />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
