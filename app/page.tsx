import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import Nav from "@/components/Nav";
import Sketches from "@/components/Sketches";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Sketches />
        <Contact />
      </main>
    </>
  );
}
