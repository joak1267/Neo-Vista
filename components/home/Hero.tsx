// Archivo: components/home/Hero.tsx
'use client';

// ✅ MEJORA UI: Agregamos AnimatePresence para animar la entrada/salida del modal
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react"; // Importamos el ícono X para cerrar
import { useState } from "react";
import ProjectQuiz from "@/components/home/ProjectQuiz"; // ✅ IMPORTAMOS TU QUIZ

const Hero = () => {
  // ✅ LÓGICA: Estado para controlar si el Quiz está abierto o cerrado
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-accent font-semibold mb-6">
              Agencia de Diseño Estratégico — Buenos Aires
            </p>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
              Diseñamos <br />
              <span className="text-gradient">visiones digitales</span>
            </h1>

            <p className="font-body text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Creamos plataformas de alto impacto que transforman la percepción de tu marca y multiplican tus resultados.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* ✅ LÓGICA: Cambiamos el onClick para que abra el modal en lugar de hacer scroll */}
              <Button 
                size="lg" 
                variant="accent" 
                className="h-14 px-10 text-base shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] transition-all group"
                onClick={() => setIsQuizOpen(true)}
              >
                Iniciar Proyecto
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-10 text-base border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => scrollTo("servicios")}
              >
                Explorar servicios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ NUEVO: MODAL DEL QUIZ CON ANIMACIÓN */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Fondo oscuro con desenfoque (Backdrop) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuizOpen(false)} // Si hace clic afuera, se cierra
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Contenedor del Quiz */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl z-10"
            >
              {/* Botón flotante para cerrar el modal */}
              <button
                onClick={() => setIsQuizOpen(false)}
                className="absolute -top-12 right-0 md:-right-12 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                title="Cerrar"
              >
                <X size={24} />
              </button>

              {/* Inyectamos el componente que armamos antes */}
              <ProjectQuiz />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;