import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Exhibition from "@/components/Exhibition";
import CharacterGallery from "@/components/CharacterGallery";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Exhibition />
        <CharacterGallery />
      </main>
      <Footer />
    </>
  );
}
