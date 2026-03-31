// ✅ CAMBIO: Actualizamos todas las rutas de importación de 'landing' a 'home'
// ✅ CAMBIO: Incluimos el nuevo componente Showcase

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Showcase from "@/components/home/Showcase";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Showcase />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}