// Archivo: components/templates/AgencyTemplate.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  motion, 
  Variants, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue
} from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData, Feature } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO (Adaptado para estética Agency)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string; dots: string[];
  bgBase: string; bgBaseAlpha: string; bgCard: string; bgCardAlpha: string; bgNav: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string; bgMedium: string;
  borderSoft: string; borderHard: string; borderGlow: string;
  orb: string; shadowSoft: string; shadowMedium: string; shadowHard: string;
  selection: string;
  hexMain: string; // Necesario para las físicas de Framer Motion en el cursor
};

const THEMES: Record<string, ThemeStyle> = {
  minimalista: {
    id: 'minimalista', name: 'Elite Dark', desc: 'Negro profundo y blanco.', dots: ['bg-white', 'bg-slate-900'],
    bgBase: 'bg-[#050505]', bgBaseAlpha: 'bg-[#050505]/80',
    bgCard: 'bg-[#0a0a0a]', bgCardAlpha: 'bg-[#0a0a0a]/90', bgNav: 'bg-[#0a0a0a]/60',
    text: 'text-[#FAFAFA]', textLight: 'text-[#FAFAFA]/50', buttonText: 'text-[#050505]',
    bgMain: 'bg-white', hoverMain: 'hover:bg-gray-200', bgSoft: 'bg-white/5', bgMedium: 'bg-white/10',
    borderSoft: 'border-white/5', borderHard: 'border-white/20', borderGlow: 'border-white/30',
    orb: 'bg-white/10', shadowSoft: 'shadow-[0_0_20px_rgba(255,255,255,0.05)]', shadowMedium: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]', shadowHard: 'shadow-[0_0_50px_rgba(255,255,255,0.2)]',
    selection: 'selection:bg-white/20 selection:text-white',
    hexMain: '#ffffff'
  },
  moderno: {
    id: 'moderno', name: 'Cyber Blue', desc: 'Oscuro con cian vibrante.', dots: ['bg-cyan-400', 'bg-blue-900'],
    bgBase: 'bg-[#030712]', bgBaseAlpha: 'bg-[#030712]/80',
    bgCard: 'bg-[#0f172a]', bgCardAlpha: 'bg-[#0f172a]/90', bgNav: 'bg-[#0f172a]/60',
    text: 'text-white', textLight: 'text-slate-400', buttonText: 'text-slate-900',
    bgMain: 'bg-cyan-400', hoverMain: 'hover:bg-cyan-300', bgSoft: 'bg-cyan-500/10', bgMedium: 'bg-cyan-500/20',
    borderSoft: 'border-cyan-500/20', borderHard: 'border-cyan-500/40', borderGlow: 'border-cyan-400/50',
    orb: 'bg-cyan-600/20', shadowSoft: 'shadow-[0_0_20px_rgba(34,211,238,0.1)]', shadowMedium: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]', shadowHard: 'shadow-[0_0_50px_rgba(34,211,238,0.4)]',
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-200',
    hexMain: '#22d3ee'
  },
  editorial: {
    id: 'editorial', name: 'Luxe Gold', desc: 'Elegancia en oro y negro.', dots: ['bg-amber-500', 'bg-yellow-900'],
    bgBase: 'bg-[#000000]', bgBaseAlpha: 'bg-[#000000]/80',
    bgCard: 'bg-[#111111]', bgCardAlpha: 'bg-[#111111]/90', bgNav: 'bg-[#111111]/60',
    text: 'text-white', textLight: 'text-amber-100/50', buttonText: 'text-black',
    bgMain: 'bg-amber-500', hoverMain: 'hover:bg-amber-400', bgSoft: 'bg-amber-500/10', bgMedium: 'bg-amber-500/20',
    borderSoft: 'border-amber-500/20', borderHard: 'border-amber-500/40', borderGlow: 'border-amber-500/30',
    orb: 'bg-amber-600/20', shadowSoft: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]', shadowMedium: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]', shadowHard: 'shadow-[0_0_50px_rgba(245,158,11,0.4)]',
    selection: 'selection:bg-amber-500/30 selection:text-amber-200',
    hexMain: '#f59e0b'
  }
};

// ---------------------------------------------------------------------------
// TIPADO ESTRICTO
// ---------------------------------------------------------------------------
export interface ExtendedFeature extends Feature {
  tags?: string[];
}

export interface ExtendedAgencyData extends LandingData {
  marqueeKeywords?: string[];
  featuredWorks?: { id: string; title: string; category: string; image: string }[]; 
  features?: ExtendedFeature[];
}

interface AgencyTemplateProps {
  data: ExtendedAgencyData;
}

// ---------------------------------------------------------------------------
// SAFE ICON RENDERER
// ---------------------------------------------------------------------------
interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const IconRenderer = ({ name, size = 24, className, color, strokeWidth = 1.5 }: IconRendererProps) => {
  const Icon = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Sparkles;
  return <Icon size={size} className={className} color={color} strokeWidth={strokeWidth} />;
};

// ---------------------------------------------------------------------------
// CUSTOM CURSOR OPTIMIZADO & MAGNETIC BUTTON
// ---------------------------------------------------------------------------
const CustomCursor = ({ t }: { t: ThemeStyle }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 400, mass: 0.05 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]')) setIsHovering(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]')) setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center will-change-transform"
      style={{ x: cursorXSpring, y: cursorYSpring, backgroundColor: isHovering ? t.hexMain : '#FAFAFA' }}
      animate={{ scale: isHovering ? 2.5 : 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <motion.div className="w-1 h-1 bg-white rounded-full" animate={{ opacity: isHovering ? 0 : 1 }} />
    </motion.div>
  );
};

const MagneticButton = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.1 }}
      className="inline-block"
      data-cursor="hover"
    >
      <button className={className} style={style}>{children}</button>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// ANIMACIONES Y COMPONENTES DE SECCIÓN
// ---------------------------------------------------------------------------
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
};

const charRevealItem: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

// ✅ ID "inicio" y SVGs nativos integrados
const HeroSection = ({ hero, t, clientName }: { hero: LandingData['hero']; t: ThemeStyle; clientName: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const characters = hero.headline.split('');

  return (
    <section id="inicio" ref={containerRef} className={`relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden ${t.bgBase} ${t.text} transition-colors duration-700`}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] rounded-full blur-[120px] pointer-events-none will-change-transform transition-colors duration-700" 
        style={{ backgroundColor: t.hexMain }} 
      />

      <motion.div style={{ opacity: opacityText }} className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center text-center perspective-1000">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className={`mb-12 inline-flex items-center gap-3 px-6 py-2.5 rounded-full border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md text-sm font-black uppercase tracking-[0.2em] shadow-2xl`}>
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_currentColor] ${t.bgMain}`}></span>
          {clientName}
        </motion.div>

        {/* ✅ Título 100% Sólido sin desvanecido */}
        <motion.h1 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="text-[4rem] sm:text-[7rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12 flex flex-wrap justify-center overflow-hidden py-4"
        >
          {characters.map((char, i) => (
            <motion.span key={i} variants={charRevealItem} className="inline-block origin-bottom">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.8 }} className={`text-xl md:text-3xl ${t.textLight} mb-16 max-w-3xl font-medium leading-tight transition-colors duration-700`}>
          {hero.subheadline}
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1 }} className="flex flex-col items-center">
          <MagneticButton 
            className={`px-12 py-6 rounded-full ${t.buttonText} font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform duration-300 flex items-center gap-3 group`}
            style={{ backgroundColor: t.hexMain }}
          >
            {hero.ctaText}
            <IconRenderer name="ArrowRight" size={24} className="group-hover:translate-x-2 transition-transform" />
          </MagneticButton>

          {/* ✅ SVGs nativos para redes sociales, sin hover de fondo */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className={`flex gap-6 mt-16 ${t.textLight}`}>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Github" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M12 18v-4"></path><path d="M5 20l-3-1"></path></svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Twitter" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const InfiniteMarquee = ({ keywords, t }: { keywords: string[]; t: ThemeStyle }) => {
  return (
    <section className={`py-12 ${t.bgBase} border-y ${t.borderSoft} overflow-hidden relative flex items-center transition-colors duration-700`}>
      <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-${t.bgBase.replace('bg-', '')} to-transparent z-10 pointer-events-none`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-${t.bgBase.replace('bg-', '')} to-transparent z-10 pointer-events-none`} />
      
      <motion.div 
        className="flex whitespace-nowrap items-center will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...keywords, ...keywords].map((word, i) => (
          <div key={i} className="flex items-center mx-12">
            <span className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter`}>
              {word}
            </span>
            <IconRenderer name="Star" size={32} className="mx-12 opacity-20" color={t.hexMain} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

// ✅ CAMBIO: Grilla Bento mejorada (3 columnas perfectas, números de agua estilo Editorial y mejor proporción)
const ServicesBentoGrid = ({ features, t }: { features: ExtendedFeature[]; t: ThemeStyle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  // Suavizamos un poco el parallax para que las tarjetas no se superpongan tanto
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

  if (!features || features.length === 0) return null;

  return (
    <section id="servicios" ref={containerRef} className={`py-32 px-6 ${t.bgBase} ${t.text} relative transition-colors duration-700`}>
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        {/* Cabecera de Sección */}
        <div className="mb-20 md:flex justify-between items-end border-b border-white/10 pb-12">
          <h2 className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-0">
            Design.<br /><span style={{ color: t.hexMain }}>Code.</span><br />Scale.
          </h2>
          <p className={`max-w-md ${t.textLight} text-lg md:text-xl font-medium text-left md:text-right pb-4`}>
            Soluciones de ingeniería y diseño creadas para posicionar a tu marca en la élite digital.
          </p>
        </div>
        
        {/* ✅ FIX: Grilla simétrica de 3 columnas (Perfecta para 6 servicios) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const mouseX = useMotionValue(0);
            const mouseY = useMotionValue(0);

            const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
              const { left, top } = currentTarget.getBoundingClientRect();
              mouseX.set(clientX - left);
              mouseY.set(clientY - top);
            };

            return (
              <motion.div 
                key={feat.id}
                // Hacemos que la columna del medio suba y baje diferente para darle dinamismo
                style={{ y: i % 3 === 1 ? yParallax : 0 }}
                onMouseMove={handleMouseMove}
                data-cursor="hover"
                className={`group relative ${t.bgCard} p-10 lg:p-12 rounded-[2.5rem] border ${t.borderSoft} hover:${t.borderHard} overflow-hidden flex flex-col justify-between cursor-none transition-all duration-500 min-h-[420px]`}
              >
                {/* Linterna seguidora del mouse */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform"
                  style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${t.hexMain}15, transparent 80%)` }}
                />

                {/* ✅ NUEVO: Número de fondo estilo Agencia Awwwards (Marca de agua) */}
                <div 
                  className="absolute top-6 right-8 text-[6rem] lg:text-[8rem] font-black opacity-[0.03] pointer-events-none leading-none select-none transition-opacity duration-500 group-hover:opacity-10" 
                  style={{ color: t.hexMain }}
                >
                  0{i + 1}
                </div>

                <div className="flex justify-between items-start relative z-10 mb-12">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${t.bgBase} border ${t.borderSoft} group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 shadow-xl`}>
                    <IconRenderer name={feat.iconName || 'Sparkles'} size={28} color={t.hexMain} strokeWidth={1.5} />
                  </div>
                  
                  <div className={`relative overflow-hidden w-12 h-12 rounded-full border ${t.borderSoft} bg-transparent flex items-center justify-center group-hover:bg-white transition-colors duration-300`}>
                    <motion.div 
                      className={`absolute inset-0 flex items-center justify-center ${t.text} group-hover:text-black`}
                      variants={{
                        rest: { x: 0, y: 0 },
                        hover: { x: [0, 40, -40, 0], y: [0, -40, 40, 0], transition: { duration: 0.6, ease: "easeInOut" } }
                      }}
                      initial="rest"
                      whileHover="hover"
                    >
                      <IconRenderer name="ArrowUpRight" size={24} />
                    </motion.div>
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                  {feat.tags && feat.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {feat.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className={`px-3 py-1 rounded-full text-xs font-bold border ${t.borderSoft} ${t.bgBaseAlpha} ${t.textLight}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className={`text-2xl lg:text-3xl font-black mb-4 tracking-tight group-hover:text-white transition-colors ${t.text}`}>{feat.title}</h3>
                  <p className={`${t.textLight} text-base leading-relaxed font-medium`}>{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ✅ ID "proyectos"
const FeaturedWork = ({ works, t }: { works: ExtendedAgencyData['featuredWorks']; t: ThemeStyle }) => {
  if (!works || works.length === 0) return null;

  return (
    <section id="proyectos" className={`py-32 ${t.bgBase} ${t.text} transition-colors duration-700`}>
      <div className="max-w-[90rem] mx-auto px-6">
        <h2 className="text-[3rem] md:text-[5rem] font-black tracking-tighter mb-16">
          Selected <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${t.hexMain}, #ffffff)` }}>Works</span>
        </h2>
        
        <div className="flex flex-col gap-24">
          {works.map((work) => (
            <motion.div 
              key={work.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className={`group relative w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden ${t.bgCard}`}
              data-cursor="hover"
            >
              <Image 
                src={work.image} 
                alt={`Caso de estudio: ${work.title}`} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full flex justify-between items-end">
                <div>
                  <p className="text-sm md:text-lg font-bold uppercase tracking-widest mb-4" style={{ color: t.hexMain }}>{work.category}</p>
                  <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white">{work.title}</h3>
                </div>
                <div className="hidden md:flex w-20 h-20 rounded-full bg-white/10 backdrop-blur-md items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <IconRenderer name="ArrowUpRight" size={32} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ✅ NUEVO: Footer Estructurado e ID "contacto" con enlaces interconectados
const AgencyFooter = ({ t, clientName }: { t: ThemeStyle; clientName: string }) => (
  <footer id="contacto" className={`${t.bgBase} border-t ${t.borderSoft} pt-24 pb-12 px-6 transition-colors duration-700 relative z-10`}>
    <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      
      <div className="col-span-1 md:col-span-2">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.bgSoft} ${t.text} border ${t.borderSoft} mb-6`}>
          <IconRenderer name="Hexagon" size={24} />
        </div>
        <h3 className={`text-3xl font-black ${t.text} mb-4 tracking-tight`}>
          Diseño.<br/>Código.<br/>Escala.
        </h3>
        <p className={`${t.textLight} max-w-sm font-light leading-relaxed mb-8`}>
          Agencia boutique especializada en experiencias digitales de alto impacto para marcas líderes.
        </p>
        <a href="mailto:hola@agencia.com" className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold ${t.bgMain} ${t.buttonText} hover:${t.hoverMain} transition-all duration-300 ${t.shadowSoft}`} data-cursor="hover">
          <IconRenderer name="Mail" size={18} /> Iniciar Proyecto
        </a>
      </div>
      
      <div>
        <h4 className={`font-bold ${t.text} mb-6 tracking-widest uppercase text-xs opacity-80`}>Navegación</h4>
        <ul className="space-y-4 font-medium">
          <li><a href="#inicio" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`} data-cursor="hover"><IconRenderer name="ChevronRight" size={14}/> Inicio</a></li>
          <li><a href="#servicios" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`} data-cursor="hover"><IconRenderer name="ChevronRight" size={14}/> Servicios</a></li>
          <li><a href="#proyectos" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`} data-cursor="hover"><IconRenderer name="ChevronRight" size={14}/> Proyectos</a></li>
          <li><a href="#contacto" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`} data-cursor="hover"><IconRenderer name="ChevronRight" size={14}/> Contacto</a></li>
        </ul>
      </div>

      <div>
        <h4 className={`font-bold ${t.text} mb-6 tracking-widest uppercase text-xs opacity-80`}>Social</h4>
        <ul className="space-y-4 font-medium">
          
          {/* GitHub */}
          <li>
            <a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                <path d="M12 18v-4"></path>
                <path d="M5 20l-3-1"></path>
              </svg>
              GitHub
            </a>
          </li>

          {/* LinkedIn */}
          <li>
            <a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
          </li>

          {/* Twitter / X */}
          <li>
            <a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              Twitter / X
            </a>
          </li>

          {/* Dribbble */}
          <li>
            <a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`} data-cursor="hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
              </svg>
              Dribbble
            </a>
          </li>

        </ul>
      </div>
    </div>

    <div className={`max-w-[90rem] mx-auto pt-8 border-t ${t.borderSoft} flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${t.textLight} font-light`}>
      <p>© {new Date().getFullYear()} {clientName}. Signature Experience.</p>
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5"><IconRenderer name="MapPin" size={14} /> Global</span>
        <span>•</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open for work</span>
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL Y HYDRATION GUARD
// ---------------------------------------------------------------------------
export default function AgencyTemplate({ data }: AgencyTemplateProps) {
  // ✅ AQUÍ SE CONTROLA EL TEMA (Arrancamos con Elite Dark por defecto)
  const [activeThemeId, setActiveThemeId] = useState<string>('minimalista');
  const t = THEMES[activeThemeId];

  const { hero, features, clientName, marqueeKeywords, featuredWorks } = data;
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);

  // ✅ Integración robusta: 6 tarjetas fijas con iconos específicos si no los provee la DB
  const defaultFeatures: ExtendedFeature[] = [
    { id: 'f1', title: 'UX/UI Design', description: 'Creación de interfaces limpias, intuitivas y centradas en el usuario (UI), asegurando una experiencia óptima (UX).', iconName: 'PenTool', tags: ['Figma', 'Prototyping'] },
    { id: 'f2', title: 'Backend Arch', description: 'Desarrollo de lógica de servidor robusta, APIs RESTful y gestión de microservicios escalables.', iconName: 'Server', tags: ['Node.js', 'Express'] },
    { id: 'f3', title: 'Performance & SEO', description: 'Análisis y optimización de aplicaciones para velocidad, core web vitals y visibilidad.', iconName: 'Gauge', tags: ['Lighthouse', 'Next.js'] },
    { id: 'f4', title: 'Data Modeling', description: 'Diseño, implementación y gestión eficiente de bases de datos relacionales y NoSQL.', iconName: 'Database', tags: ['PostgreSQL', 'Prisma'] },
    { id: 'f5', title: 'Fluid Animation', description: 'Interfaces fluidas e interactivas que enamoran al usuario, con microinteracciones y animaciones de alto rendimiento.', iconName: 'MousePointerSquareDashed', tags: ['Framer Motion'] },
    { id: 'f6', title: 'DevOps & CI/CD', description: 'Integración y despliegue continuo (CI/CD), testing automatizado y gestión de infraestructura en la nube.', iconName: 'Repeat', tags: ['AWS', 'Docker'] },
  ];

  const processedFeatures: ExtendedFeature[] = (features && features.length >= 6) 
    ? features 
    : defaultFeatures;

  const fallbackKeywords = marqueeKeywords || ["Estrategia Digital", "Desarrollo Web", "UI/UX Design", "E-Commerce", "Branding", "Escalabilidad"];
  const showcaseWorks = featuredWorks || [
    { id: '1', title: 'Fintech Revolution', category: 'App Design / Dev', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', title: 'Global E-Commerce', category: 'Web Platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' }
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className={`relative min-h-screen ${t.bgBase} font-sans selection:bg-white/20 selection:text-white overflow-hidden cursor-none transition-colors duration-700`}>
      
      {/* Cursor magnético ahora obedece al tema */}
      <CustomCursor t={t} />

      <div 
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.02] mix-blend-screen" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="relative z-10">
        <HeroSection hero={hero} t={t} clientName={clientName} />
        <InfiniteMarquee keywords={fallbackKeywords} t={t} />
        <ServicesBentoGrid features={processedFeatures} t={t} />
        <FeaturedWork works={showcaseWorks} t={t} />
      </main>
      
      {/* Footer Profesional */}
      <AgencyFooter t={t} clientName={clientName} />

      {/* Selector de Temas Flotante */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${t.bgCardAlpha} backdrop-blur-xl border ${t.borderSoft} p-2 rounded-full flex gap-2 shadow-2xl transition-colors duration-700`}>
        {Object.values(THEMES).map((themeObj) => (
          <button
            key={themeObj.id} onClick={() => setActiveThemeId(themeObj.id)}
            data-cursor="hover"
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeThemeId === themeObj.id 
                ? `${t.bgMain} ${t.buttonText} shadow-lg ${t.shadowSoft}` 
                : `${t.textLight} hover:${t.text} hover:bg-white/10`
            }`}
          >
            {themeObj.name}
          </button>
        ))}
      </div>

    </div>
  );
}