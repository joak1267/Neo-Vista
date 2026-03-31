// Archivo: components/templates/PersonalTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData, Feature } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string; dots: string[];
  bgBase: string; bgBaseAlpha: string; bgCard: string; bgCardAlpha: string; bgNav: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string; bgMedium: string;
  borderSoft: string; borderHard: string; borderGlow: string;
  orb: string; shadowSoft: string; shadowMedium: string; shadowHard: string;
  selection: string;
};

const THEMES: Record<string, ThemeStyle> = {
  editorial: {
    id: 'editorial', name: 'Editorial', desc: 'Luz y elegancia.', dots: ['bg-slate-900', 'bg-[#FAF9F6]'],
    bgBase: 'bg-[#FAF9F6]', bgBaseAlpha: 'bg-[#FAF9F6]/80',
    bgCard: 'bg-white', bgCardAlpha: 'bg-white/50', bgNav: 'bg-white/60',
    text: 'text-slate-950', textLight: 'text-slate-600', buttonText: 'text-white',
    bgMain: 'bg-slate-900', hoverMain: 'hover:bg-slate-800', bgSoft: 'bg-slate-100', bgMedium: 'bg-slate-200',
    borderSoft: 'border-slate-900/10', borderHard: 'border-slate-900/20', borderGlow: 'border-slate-900/30',
    orb: 'bg-slate-300/30', shadowSoft: 'shadow-xl', shadowMedium: 'shadow-2xl', shadowHard: 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
    selection: 'selection:bg-slate-900 selection:text-white'
  },
  moderno: {
    id: 'moderno', name: 'Moderno', desc: 'Tonos Vibrantes.', dots: ['bg-purple-500', 'bg-cyan-400'],
    bgBase: 'bg-[#05080f]', bgBaseAlpha: 'bg-[#05080f]/80',
    bgCard: 'bg-[#0a0e17]', bgCardAlpha: 'bg-[#0a0e17]/90', bgNav: 'bg-[#0a0e17]/60',
    text: 'text-white', textLight: 'text-slate-400', buttonText: 'text-slate-900',
    bgMain: 'bg-cyan-400', hoverMain: 'hover:bg-cyan-300', bgSoft: 'bg-cyan-500/10', bgMedium: 'bg-cyan-500/20',
    borderSoft: 'border-cyan-500/30', borderHard: 'border-cyan-500/50', borderGlow: 'border-cyan-400/50',
    orb: 'bg-cyan-600/30', shadowSoft: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]', shadowMedium: 'shadow-[0_0_30px_rgba(34,211,238,0.4)]', shadowHard: 'shadow-[0_0_50px_rgba(34,211,238,0.6)]',
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-200'
  },
  minimalista: {
    id: 'minimalista', name: 'Minimalista', desc: 'Blanco y Negro.', dots: ['bg-white', 'bg-slate-900'],
    bgBase: 'bg-[#000000]', bgBaseAlpha: 'bg-[#000000]/80',
    bgCard: 'bg-[#111111]', bgCardAlpha: 'bg-[#111111]/90', bgNav: 'bg-[#111111]/60',
    text: 'text-white', textLight: 'text-gray-400', buttonText: 'text-black',
    bgMain: 'bg-white', hoverMain: 'hover:bg-gray-200', bgSoft: 'bg-white/5', bgMedium: 'bg-white/10',
    borderSoft: 'border-white/20', borderHard: 'border-white/30', borderGlow: 'border-white/40',
    orb: 'bg-white/10', shadowSoft: 'shadow-[0_0_20px_rgba(255,255,255,0.1)]', shadowMedium: 'shadow-[0_0_30px_rgba(255,255,255,0.2)]', shadowHard: 'shadow-[0_0_50px_rgba(255,255,255,0.3)]',
    selection: 'selection:bg-white/20 selection:text-white'
  }
};

// ---------------------------------------------------------------------------
// TIPADO ESTRICTO E INTERFACES EXTENDIDAS
// ---------------------------------------------------------------------------
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  iconName: string;
}

export interface ExtendedFeature extends Feature {
  tags?: string[];
}

export interface ExtendedPersonalData extends LandingData {
  projects?: Project[];
  education?: Education[];
  skills?: Skill[];
  features?: ExtendedFeature[];
}

interface PersonalTemplateProps {
  data: ExtendedPersonalData;
}

// ---------------------------------------------------------------------------
// SAFE ICON RENDERER
// ---------------------------------------------------------------------------
interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

const IconRenderer = ({ name, size = 24, className, color }: IconRendererProps) => {
  const Icon = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Sparkles;
  return <Icon size={size} className={className} color={color} strokeWidth={1.5} />;
};

// ---------------------------------------------------------------------------
// ANIMACIONES
// ---------------------------------------------------------------------------
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

// ---------------------------------------------------------------------------
// SUB-COMPONENTES
// ---------------------------------------------------------------------------

// ✅ CAMBIO: ID "inicio" agregado a la sección
const AsymmetricHero = ({ hero, t }: { hero: LandingData['hero']; t: ThemeStyle }) => (
  <section id="inicio" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-[90rem] mx-auto pt-32 pb-24 overflow-visible">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative z-10">
      
      <motion.div className="lg:col-span-7 z-20 relative" variants={staggerContainer} initial="hidden" animate="visible">
        
        <motion.div variants={revealUp} className={`flex items-center gap-3 px-4 py-2 rounded-full border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md w-fit mb-8 shadow-sm`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${t.bgMain} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${t.bgMain}`}></span>
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider ${t.textLight}`}>Disponible para nuevos proyectos</span>
        </motion.div>
        
        <motion.h1 variants={revealUp} className={`text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black tracking-tighter mb-6 ${t.text} leading-[0.9] -ml-1 transition-colors duration-700`}>
          {hero.headline}
        </motion.h1>
        
        <motion.p variants={revealUp} className={`text-lg md:text-2xl ${t.textLight} mb-12 leading-relaxed max-w-xl font-light transition-colors duration-700`}>
          {hero.subheadline}
        </motion.p>
        
        <motion.div variants={revealUp} className="flex flex-wrap items-center gap-4">
          <button className={`px-8 py-4 rounded-full ${t.buttonText} font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-500 flex items-center gap-3 group ${t.bgMain} ${t.hoverMain}`}>
            {hero.ctaText} 
            <IconRenderer name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className={`px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-500 border ${t.borderSoft} hover:${t.borderHard} ${t.bgCardAlpha} backdrop-blur-sm ${t.text}`}>
            Ver CV
          </button>
        </motion.div>

        <motion.div variants={revealUp} className={`flex gap-6 mt-16 ${t.textLight}`}>
          
          <a href="#" target="_blank" rel="noreferrer" aria-label="Github" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              <path d="M12 18v-4"></path>
              <path d="M5 20l-3-1"></path>
            </svg>
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          <a href="#" target="_blank" rel="noreferrer" aria-label="Twitter" className={`p-3 rounded-full border ${t.borderSoft} hover:${t.text} transition-all duration-300 hover:-translate-y-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>

        </motion.div>
      </motion.div>

      <motion.div className="lg:col-span-5 relative w-full h-[35rem] lg:h-[45rem] lg:-ml-8 z-10" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}>
        <motion.div animate={{ y: ["-10px", "10px", "-10px"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className={`absolute -top-10 -left-10 w-32 h-32 rounded-full ${t.bgSoft} blur-2xl opacity-60 z-0`} />
        <motion.div animate={{ y: ["-10px", "10px", "-10px"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${t.bgMain} blur-3xl opacity-20 z-0`} />
        
        <div className={`relative z-10 w-full h-full ${t.bgMedium} rounded-[2.5rem] overflow-hidden border ${t.borderSoft} shadow-2xl transform lg:-rotate-2 hover:rotate-0 transition-all duration-700 group`}>
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-transparent to-black/20`}>
            {hero.image ? (
              <img src={hero.image} alt="Perfil" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            ) : (
              <IconRenderer name="Code2" size={120} className={`opacity-20 ${t.textLight} group-hover:scale-110 transition-transform duration-1000`} />
            )}
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-4">
               <div className={`p-3 rounded-full ${t.bgMain} ${t.buttonText}`}>
                 <IconRenderer name="Terminal" size={20} />
               </div>
               <div>
                 <p className="text-white font-bold text-sm">Full Stack Developer</p>
                 <p className="text-white/70 text-xs">Construyendo el futuro</p>
               </div>
             </div>
          </div>
        </div>
      </motion.div>
      
    </div>
  </section>
);

// ✅ CAMBIO: ID "dominio" agregado a la sección
const BentoGridExpertise = ({ features, t }: { features: ExtendedFeature[]; t: ThemeStyle }) => {
  if (!features || features.length === 0) return null;

  return (
    <section id="dominio" className="py-24 px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${t.text} leading-[0.9] transition-colors duration-700`}>
          Dominio<br/>Técnico.
        </h2>
        <p className={`text-xl ${t.textLight} max-w-md font-light leading-relaxed transition-colors duration-700`}>
          Arquitectura escalable combinada con diseño de interfaces de clase mundial.
        </p>
      </div>
      
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[22rem]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        {features.map((feat, i) => {
          let gridClasses = "md:col-span-1 md:row-span-1";
          if (i === 0 || i === 1) gridClasses = "md:col-span-2 md:row-span-1"; 

          const indexNum = (i + 1).toString().padStart(2, '0');
          
          return (
            <motion.div 
              key={feat.id || i} variants={revealUp} 
              className={`group relative ${t.bgCard} p-10 rounded-[2.5rem] border ${t.borderSoft} hover:${t.borderHard} hover:${t.shadowMedium} hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between ${gridClasses}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${t.bgSoft.replace('bg-', '')}/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className={`absolute top-0 right-0 p-8 text-6xl font-black ${t.textLight} opacity-5 group-hover:opacity-10 transition-opacity duration-500 font-serif italic -rotate-12 group-hover:rotate-0`}>
                {indexNum}
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${t.borderSoft} ${t.bgSoft} group-hover:scale-110 group-hover:rotate-6 shadow-sm transition-all duration-500`}>
                  <IconRenderer name={feat.iconName || 'Sparkles'} size={28} className={t.text} />
                </div>
                
                <div className={`w-10 h-10 rounded-full border ${t.borderSoft} flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${t.bgCard}`}>
                  <IconRenderer name="ArrowUpRight" size={18} className={t.text} />
                </div>
              </div>
              
              <div className="mt-auto pt-8 relative z-10">
                {feat.tags && feat.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feat.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className={`px-3 py-1 rounded-full text-xs font-bold border ${t.borderSoft} ${t.bgBaseAlpha} ${t.textLight}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className={`font-bold ${t.text} tracking-tight mb-4 text-2xl transition-colors duration-700`}>{feat.title}</h3>
                <p className={`${t.textLight} leading-relaxed font-light transition-colors duration-700`}>{feat.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

const TechStack = ({ skills, t }: { skills: Skill[]; t: ThemeStyle }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <section className={`py-24 px-6 md:px-12 max-w-[90rem] mx-auto border-t ${t.borderSoft} transition-colors duration-700 relative z-10`}>
      <h3 className={`text-3xl font-bold tracking-tight ${t.text} mb-12`}>Tecnologías & Herramientas</h3>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 px-6 py-3 rounded-full border ${t.borderSoft} ${t.bgCard} hover:${t.borderHard} hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm`}
          >
            <IconRenderer name={skill.iconName} size={20} className={t.textLight} />
            <span className={`font-medium ${t.text}`}>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ✅ CAMBIO: ID "formacion" agregado a la sección
const EducationTimeline = ({ education, t }: { education: Education[]; t: ThemeStyle }) => {
  if (!education || education.length === 0) return null;
  return (
    <section id="formacion" className={`py-24 px-6 md:px-12 max-w-[90rem] mx-auto border-t ${t.borderSoft} transition-colors duration-700 relative z-10`}>
      <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${t.text} mb-16 leading-[0.9]`}>Formación<br/>Académica.</h2>
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-500/20 before:to-transparent">
        {education.map((edu, i) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 ${t.bgBase} ${t.borderSoft} group-hover:${t.borderHard} text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-colors`}>
              <IconRenderer name="GraduationCap" size={16} className={t.text} />
            </div>
            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-3xl border ${t.borderSoft} ${t.bgCard} hover:${t.shadowMedium} transition-all duration-300`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <h4 className={`font-bold text-xl ${t.text}`}>{edu.degree}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.bgSoft} ${t.textLight}`}>{edu.period}</span>
              </div>
              <h5 className={`text-sm font-medium ${t.textLight} mb-4 flex items-center gap-2`}><IconRenderer name="Building2" size={14} /> {edu.institution}</h5>
              {edu.description && <p className={`text-sm ${t.textLight} leading-relaxed`}>{edu.description}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ✅ CAMBIO: ID "proyectos" agregado a la sección
const FeaturedWork = ({ projects, t }: { projects: Project[]; t: ThemeStyle }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="proyectos" className={`py-32 px-6 md:px-12 max-w-[90rem] mx-auto border-t ${t.borderSoft} transition-colors duration-700 relative z-10`}>
      <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${t.text} mb-20 leading-[0.9] transition-colors duration-700`}>Selected<br/>Works.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((proj, i) => (
          <motion.div 
            key={proj.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 } } }}
            className={`group flex flex-col relative rounded-[2.5rem] border ${t.borderSoft} ${t.bgCard} overflow-hidden hover:${t.shadowMedium} transition-all duration-500`}
          >
            <div className={`relative w-full aspect-video overflow-hidden ${t.bgMedium} border-b ${t.borderSoft}`}>
              {proj.image !== '/placeholder.jpg' ? (
                 <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${t.bgSoft} group-hover:scale-105 transition-all duration-1000`}><IconRenderer name="Laptop" size={64} className={`opacity-50 ${t.textLight}`} /></div>
              )}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{proj.category}</div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className={`text-3xl font-bold tracking-tight ${t.text} mb-3`}>{proj.title}</h3>
              <p className={`${t.textLight} font-light leading-relaxed mb-8 flex-grow`}>
                {proj.description || 'Proyecto de desarrollo enfocado en la escalabilidad y una experiencia de usuario fluida, implementando tecnologías modernas.'}
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-dashed border-gray-500/20">
                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-sm font-bold ${t.text} hover:${t.textLight} transition-colors`}><IconRenderer name="ExternalLink" size={18} /> Live Demo</a>}
                {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-sm font-bold ${t.text} hover:${t.textLight} transition-colors`}><IconRenderer name="Github" size={18} /> Source Code</a>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Footer Profesional Integrado
const PortfolioFooter = ({ t }: { t: ThemeStyle }) => (
  <footer className={`${t.bgBase} border-t ${t.borderSoft} pt-24 pb-12 px-6 transition-colors duration-700 relative z-10`}>
    <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      
      {/* Branding & Bio */}
      <div className="col-span-1 md:col-span-2">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.bgSoft} ${t.text} border ${t.borderSoft} mb-6`}>
          <IconRenderer name="Hexagon" size={24} />
        </div>
        <h3 className={`text-3xl font-black ${t.text} mb-4 tracking-tight`}>
          Desarrollo <br/> & Precisión.
        </h3>
        <p className={`${t.textLight} max-w-sm font-light leading-relaxed mb-8`}>
          Construyendo experiencias digitales escalables, arquitecturas robustas y diseño de clase mundial para la web moderna.
        </p>
        <a href="mailto:hola@tucorreo.com" className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold ${t.bgMain} ${t.buttonText} hover:${t.hoverMain} transition-all duration-300 ${t.shadowSoft}`}>
          <IconRenderer name="Mail" size={18} /> Hablemos
        </a>
      </div>
      
      {/* ✅ CAMBIO: Navegación Rápida con los href conectados a los IDs */}
      <div>
        <h4 className={`font-bold ${t.text} mb-6 tracking-widest uppercase text-xs opacity-80`}>Navegación</h4>
        <ul className="space-y-4 font-medium">
          <li><a href="#inicio" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`}><IconRenderer name="ChevronRight" size={14}/> Inicio</a></li>
          <li><a href="#dominio" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`}><IconRenderer name="ChevronRight" size={14}/> Dominio Técnico</a></li>
          <li><a href="#formacion" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`}><IconRenderer name="ChevronRight" size={14}/> Formación</a></li>
          <li><a href="#proyectos" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-2`}><IconRenderer name="ChevronRight" size={14}/> Proyectos</a></li>
        </ul>
      </div>

      {/* Redes Sociales */}
      <div>
        <h4 className={`font-bold ${t.text} mb-6 tracking-widest uppercase text-xs opacity-80`}>Conectar</h4>
        <ul className="space-y-4 font-medium">
          <li><a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`}><IconRenderer name="Github" size={18}/> GitHub</a></li>
          <li><a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`}><IconRenderer name="Linkedin" size={18}/> LinkedIn</a></li>
          <li><a href="#" className={`${t.textLight} hover:${t.text} transition-colors flex items-center gap-3`}><IconRenderer name="Twitter" size={18}/> Twitter / X</a></li>
        </ul>
      </div>
    </div>

    {/* Copyright & Bottom Bar */}
    <div className={`max-w-[90rem] mx-auto pt-8 border-t ${t.borderSoft} flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${t.textLight} font-light`}>
      <p>© {new Date().getFullYear()} Creado con precisión técnica. Todos los derechos reservados.</p>
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5"><IconRenderer name="MapPin" size={14} /> Buenos Aires</span>
        <span>•</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Disponible</span>
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
export default function PersonalTemplate({ data }: PersonalTemplateProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>('editorial');
  const [isMounted, setIsMounted] = useState(false);
  
  const t = THEMES[activeThemeId];
  const { hero, projects, education, skills, features } = data;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultFeatures: ExtendedFeature[] = [
    { id: 'f1', title: 'Eve Design', description: 'Creación de interfaces limpias, intuitivas y centradas en el usuario (UI), asegurando una experiencia óptima (UX).', iconName: 'PenTool', tags: ['Figma', 'Prototyping'] },
    { id: 'f2', title: 'Backend', description: 'Desarrollo de lógica de servidor robusta, APIs RESTful y gestión de microservicios escalables.', iconName: 'Server', tags: ['Node.js', 'Express'] },
    { id: 'f3', title: 'Performance & SEO', description: 'Análisis y optimización de aplicaciones para velocidad, core web vitals y visibilidad en motores de búsqueda.', iconName: 'Gauge', tags: ['Lighthouse', 'Next.js'] },
    { id: 'f4', title: 'Databases', description: 'Diseño, implementación y gestión eficiente de bases de datos relacionales y NoSQL.', iconName: 'Database', tags: ['PostgreSQL', 'Prisma'] },
    { id: 'f5', title: 'UI/UX & Animation', description: 'Interfaces fluidas e interactivas que enamoran al usuario, con microinteracciones y animaciones de alto rendimiento.', iconName: 'MousePointerSquareDashed', tags: ['Framer Motion', 'Tailwind'] },
    { id: 'f6', title: 'DevOps & Testing', description: 'Integración y despliegue continuo (CI/CD), testing automatizado y gestión de infraestructura en la nube.', iconName: 'Repeat', tags: ['AWS', 'Jenkins'] },
  ];

  const processedFeatures: ExtendedFeature[] = (features && features.length >= 6) 
    ? features 
    : defaultFeatures;

  const fallbackSkills: Skill[] = skills || [
    { name: 'React & Next.js', category: 'Frontend', iconName: 'Layers' },
    { name: 'TypeScript', category: 'Frontend', iconName: 'Code2' },
    { name: 'Node.js & Express', category: 'Backend', iconName: 'Server' },
    { name: 'PHP 8+ & Laravel', category: 'Backend', iconName: 'Terminal' },
    { name: 'MySQL / PostgreSQL', category: 'Database', iconName: 'Database' },
    { name: 'Tailwind CSS', category: 'Frontend', iconName: 'Palette' },
    { name: 'Figma / UI Design', category: 'Tools', iconName: 'PenTool' },
    { name: 'AWS / Vercel', category: 'Tools', iconName: 'Cloud' },
  ];

  const fallbackEducation: Education[] = education || [
    { id: 'e1', degree: 'Ingeniería en Sistemas de Información', institution: 'Universidad Tecnológica Nacional', period: '2015 - 2021', description: 'Especialización en arquitectura de software y bases de datos relacionales.' },
    { id: 'e2', degree: 'Frontend Advanced Certification', institution: 'Meta / Coursera', period: '2022', description: 'Dominio de React, hooks avanzados, performance y accesibilidad web (WCAG).' },
  ];

  const fallbackProjects: Project[] = projects || [
    { id: 'p1', title: 'Fintech Dashboard', category: 'Web App / React', image: '/placeholder.jpg', description: 'Panel de control financiero en tiempo real procesando miles de transacciones.', liveUrl: '#', githubUrl: '#' },
    { id: 'p2', title: 'E-Commerce Global', category: 'Next.js / Headless', image: '/placeholder.jpg', description: 'Arquitectura headless commerce optimizada para SEO técnico y tiempos de carga inferiores a 1 segundo.', liveUrl: '#' },
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#FAF9F6]"></div>;

  return (
    <div className={`relative min-h-screen ${t.bgBase} ${t.text} ${t.selection} font-sans overflow-hidden transition-colors duration-700`}>
      
      {/* Editorial Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <main className="relative z-10">
        <AsymmetricHero hero={hero} t={t} />
        <BentoGridExpertise features={processedFeatures} t={t} />
        <TechStack skills={fallbackSkills} t={t} />
        <EducationTimeline education={fallbackEducation} t={t} />
        <FeaturedWork projects={fallbackProjects} t={t} />
      </main>
      
      <PortfolioFooter t={t} />

      {/* Selector de Temas Flotante */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${t.bgCardAlpha} backdrop-blur-xl border ${t.borderSoft} p-2 rounded-full flex gap-2 shadow-2xl transition-colors duration-700`}>
        {Object.values(THEMES).map((themeObj) => (
          <button
            key={themeObj.id} onClick={() => setActiveThemeId(themeObj.id)}
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