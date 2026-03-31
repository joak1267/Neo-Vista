// Archivo: components/home/About.tsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
import { SearchCheck, Target, Zap, Award } from 'lucide-react'; // ✅ FIX 3: Añadimos Award

// ---------------------------------------------------------------------------
// 1. ANIMACIONES COMUNES (Tipado arreglado)
// ---------------------------------------------------------------------------
// ✅ FIX 2: Le asignamos el tipo 'Variants' para que TypeScript no tire error
const fadeUpOnce: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// ---------------------------------------------------------------------------
// 2. SUB-COMPONENTE: Pilar de Valor
// ---------------------------------------------------------------------------
const ValuePillar = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:items-start group p-4 rounded-xl transition-colors hover:bg-white/5">
    <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
      <Icon className="text-accent" size={32} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-1 font-display tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed font-body group-hover:text-slate-400 transition-colors">{description}</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// 3. COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
// ✅ FIX 1: Quitamos el requerimiento de las Props para que no de error
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Lógica interactiva para la linterna del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      id="nosotros" 
      ref={sectionRef} 
      className="py-32 md:py-48 relative overflow-hidden bg-slate-950 transition-colors duration-700"
    >
      {/* Glow de fondo animado y con parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Cabecera Editorial */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpOnce}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent font-black mb-5">
            Quiénes somos
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[0.9] mb-12">
            Sobre Neovista
          </h2>
        </motion.div>

        {/* MOCKUP DE TARJETA INTERACTIVA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpOnce}
          onMouseMove={handleMouseMove}
          className="group relative w-full max-w-5xl mx-auto border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 bg-white/[0.02] backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50 hover:shadow-accent/5"
        >
          {/* Linterna seguidora del mouse */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              // ✅ FIX 2: Cambiamos 't.hexMain' que no existía acá, por un blanco sutil universal
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`,
            }}
          />

          {/* Contenido de la Tarjeta */}
          <div className="relative z-10">
            
            {/* Introducción Persuasiva */}
            <p className="text-xl md:text-3xl text-slate-300 font-display font-bold leading-[1.2] mb-12 max-w-4xl tracking-tight">
              Transformamos ideas en experiencias digitales de <span className="text-white">alto impacto</span>. Desde Buenos Aires para el mundo, fusionamos obsesión técnica con diseño disruptivo.
            </p>

            {/* Grilla Bento Interna de Pilares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-dashed border-zinc-800/60 pt-12">
              <ValuePillar 
                icon={SearchCheck} 
                title="Detalle Obsesivo" 
                description="Cada píxel, cada línea de código tiene un propósito claro y refinado."
              />
              <ValuePillar 
                icon={Zap} 
                title="Conversión Radikal" 
                description="Estructuras modulares diseñadas matemáticamente para vender más."
              />
              <ValuePillar 
                icon={Target} 
                title="Ingeniería Elite" 
                description="Potenciado por Next.js & React para una velocidad de carga extrema."
              />
            </div>

            {/* Divisor Editorial Mínimo */}
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-10 opacity-60"></div>

            {/* Firma del Fundador */}
            <p className="text-center text-slate-500 font-body text-sm tracking-wide font-medium flex items-center justify-center gap-3">
              <Award size={18} className="text-accent opacity-60" />
              <span>Fundado por <span className="text-slate-200 font-bold">Jowidev</span></span>
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}