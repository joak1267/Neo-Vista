// Archivo: components/templates/SaasTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData, Feature, PricingPlan } from '@/types/landing';

// ---------------------------------------------------------------------------
// ✅ 1. MOTOR DE TEMAS EN VIVO (Mapeo de colores)
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
  moderno: {
    id: 'moderno', name: 'Moderno', desc: 'Tonos Vibrantes. Energía y creatividad.', dots: ['bg-purple-500', 'bg-cyan-400'],
    bgBase: 'bg-[#05080f]', bgBaseAlpha: 'bg-[#05080f]/80',
    bgCard: 'bg-[#0a0e17]', bgCardAlpha: 'bg-[#0a0e17]/90', bgNav: 'bg-[#0a0e17]/60',
    text: 'text-cyan-400', textLight: 'text-cyan-300', buttonText: 'text-slate-900',
    bgMain: 'bg-cyan-400', hoverMain: 'hover:bg-cyan-300', bgSoft: 'bg-cyan-500/10', bgMedium: 'bg-cyan-500/20',
    borderSoft: 'border-cyan-500/30', borderHard: 'border-cyan-500/50', borderGlow: 'border-cyan-400/50',
    orb: 'bg-cyan-600/30', shadowSoft: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]', shadowMedium: 'shadow-[0_0_30px_rgba(34,211,238,0.4)]', shadowHard: 'shadow-[0_0_50px_rgba(34,211,238,0.6)]',
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-200'
  },
  corporativo: {
    id: 'corporativo', name: 'Corporativo', desc: 'Tonos Azules y Grises. Seriedad y confianza.', dots: ['bg-blue-600', 'bg-slate-500'],
    bgBase: 'bg-slate-950', bgBaseAlpha: 'bg-slate-950/80',
    bgCard: 'bg-slate-900', bgCardAlpha: 'bg-slate-900/90', bgNav: 'bg-slate-900/60',
    text: 'text-blue-400', textLight: 'text-blue-300', buttonText: 'text-white',
    bgMain: 'bg-blue-600', hoverMain: 'hover:bg-blue-500', bgSoft: 'bg-blue-500/10', bgMedium: 'bg-blue-500/20',
    borderSoft: 'border-blue-500/30', borderHard: 'border-blue-500/50', borderGlow: 'border-blue-400/50',
    orb: 'bg-blue-600/30', shadowSoft: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]', shadowMedium: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]', shadowHard: 'shadow-[0_0_50px_rgba(59,130,246,0.6)]',
    selection: 'selection:bg-blue-500/30 selection:text-blue-200'
  },
  minimalista: {
    id: 'minimalista', name: 'Minimalista', desc: 'Blanco, Negro y acento. Elegancia pura.', dots: ['bg-white', 'bg-slate-900'],
    bgBase: 'bg-[#000000]', bgBaseAlpha: 'bg-[#000000]/80',
    bgCard: 'bg-[#111111]', bgCardAlpha: 'bg-[#111111]/90', bgNav: 'bg-[#111111]/60',
    text: 'text-white', textLight: 'text-gray-200', buttonText: 'text-black',
    bgMain: 'bg-white', hoverMain: 'hover:bg-gray-200', bgSoft: 'bg-white/5', bgMedium: 'bg-white/10',
    borderSoft: 'border-white/20', borderHard: 'border-white/30', borderGlow: 'border-white/40',
    orb: 'bg-white/10', shadowSoft: 'shadow-[0_0_20px_rgba(255,255,255,0.1)]', shadowMedium: 'shadow-[0_0_30px_rgba(255,255,255,0.2)]', shadowHard: 'shadow-[0_0_50px_rgba(255,255,255,0.3)]',
    selection: 'selection:bg-white/20 selection:text-white'
  }
};

// ---------------------------------------------------------------------------
// TIPADO ESTRICTO ORIGINAL
// ---------------------------------------------------------------------------
export interface FAQItem { id: string; question: string; answer: string; }
export interface DetailedBenefit { id: string; title: string; description: string; iconName: string; reverse?: boolean; }
export interface ExtendedSaasData extends LandingData { socialProofLogos?: string[]; detailedBenefits?: DetailedBenefit[]; faqs?: FAQItem[]; }

interface SaasTemplateProps { data: ExtendedSaasData; }

const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const fadeUpItem: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } } };

// ---------------------------------------------------------------------------
// ✅ 2. MODAL DEL QUIZ 
// ---------------------------------------------------------------------------
const ProjectQuizModal = ({ isOpen, onClose, t, activeThemeId, setActiveThemeId }: { isOpen: boolean; onClose: () => void, t: ThemeStyle, activeThemeId: string, setActiveThemeId: (id: string) => void }) => {
  const [step, setStep] = useState(1);
  const [webType, setWebType] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (!isOpen) setTimeout(() => { setStep(1); setWebType(''); setBudget(''); }, 500);
  }, [isOpen]);

  const handleSubmit = () => {
    const phone = "541125047228";
    const text = `¡Hola Neovista! 👋\nQuiero cotizar una *${webType}* con un estilo visual *${t.name}*.\nMi presupuesto estimado es de *${budget}*.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className={`absolute inset-0 ${t.bgBaseAlpha} backdrop-blur-md transition-colors duration-700`} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-full max-w-2xl ${t.bgCardAlpha} border ${t.borderSoft} backdrop-blur-2xl rounded-3xl p-6 md:p-10 ${t.shadowSoft} overflow-hidden transition-colors duration-700`}>
            
            <div className={`absolute top-0 right-0 w-64 h-64 ${t.bgSoft} blur-[80px] rounded-full pointer-events-none transition-colors duration-700`} />
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><Icons.X size={20} /></button>

            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? `${t.bgMain} ${t.shadowSoft}` : 'bg-white/10'}`} />
              ))}
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">¿Qué plataforma necesitas?</h2>
                <p className="text-slate-400 mb-8">Seleccioná la arquitectura base para tu proyecto.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {['SaaS Platform', 'Landing Page', 'E-commerce'].map((type) => (
                    <button key={type} onClick={() => setWebType(type)} className={`p-6 rounded-2xl border text-left transition-all duration-300 ${webType === type ? `${t.borderGlow} ${t.bgSoft} ${t.shadowSoft}` : `border-white/10 bg-white/5 hover:${t.borderHard}`}`}>
                      <h3 className={`font-bold ${webType === type ? t.text : 'text-white'}`}>{type}</h3>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} disabled={!webType} className={`w-full py-4 rounded-xl font-bold ${t.bgMain} ${t.buttonText} disabled:opacity-50 disabled:cursor-not-allowed ${t.hoverMain} transition-all flex justify-center items-center gap-2`}>
                  Siguiente paso <Icons.ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Preferencia de Color</h2>
                <p className="text-slate-400 mb-8">Definí el ADN visual de tu marca. Observá el fondo.</p>
                <div className="space-y-4 mb-8">
                  {Object.values(THEMES).map((style) => (
                    <button key={style.id} onClick={() => setActiveThemeId(style.id)} className={`w-full p-5 rounded-2xl border text-left flex justify-between items-center transition-all duration-300 ${activeThemeId === style.id ? `${t.borderGlow} ${t.bgSoft} ${t.shadowSoft}` : `border-white/10 bg-white/5 hover:${t.borderHard}`}`}>
                      <div>
                        <h3 className={`font-bold mb-1 ${activeThemeId === style.id ? t.text : 'text-white'}`}>{style.name}</h3>
                        <p className="text-sm text-slate-400">{style.desc}</p>
                      </div>
                      <div className="flex -space-x-2">
                        {style.dots.map((dot, i) => <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 ${dot}`} />)}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold border border-white/10 text-white hover:bg-white/5 transition-all">Volver</button>
                  <button onClick={() => setStep(3)} className={`flex-1 py-4 rounded-xl font-bold ${t.bgMain} ${t.buttonText} ${t.hoverMain} transition-all`}>Siguiente paso</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Presupuesto Estimado</h2>
                <p className="text-slate-400 mb-8">Ayudanos a dimensionar tu proyecto.</p>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {['$500 - $1.000', '$1.000 - $3.000', 'Más de $3.000 (A medida)'].map((rango) => (
                    <button key={rango} onClick={() => setBudget(rango)} className={`p-5 rounded-2xl border text-center font-bold transition-all duration-300 ${budget === rango ? `${t.borderGlow} ${t.bgMain} ${t.buttonText} ${t.shadowMedium}` : `border-white/10 bg-white/5 text-white hover:${t.borderHard}`}`}>
                      {rango}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-bold border border-white/10 text-white hover:bg-white/5 transition-all">Volver</button>
                  <button onClick={handleSubmit} disabled={!budget} className={`flex-1 py-4 rounded-xl font-black ${t.bgMain} ${t.buttonText} disabled:opacity-50 disabled:cursor-not-allowed ${t.hoverMain} hover:${t.shadowMedium} transition-all flex justify-center items-center gap-2`}>
                    Cotizar Ahora <Icons.MessageCircle size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------------
// ✅ 3. TODOS LOS COMPONENTES ORIGINALES INTACTOS
// ---------------------------------------------------------------------------

// ⚡ MEJORA BRUTAL: Navbar estilo "Floating Pill" con Glassmorphism avanzado
const Navbar = ({ clientName, t }: { clientName: string, t: ThemeStyle }) => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="fixed top-0 md:top-6 left-0 right-0 z-50 mx-auto max-w-6xl px-4 transition-all duration-700"
  >
    <div className={`h-16 md:h-20 w-full rounded-2xl md:rounded-[2rem] ${t.bgNav} backdrop-blur-2xl border ${t.borderSoft} flex items-center justify-between px-4 md:px-8 shadow-2xl transition-colors duration-700`}>
      
      {/* IZQUIERDA: LOGO */}
      <div className="flex items-center gap-3 font-black text-xl text-white tracking-tight z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.bgSoft} ${t.text} border ${t.borderSoft} ${t.shadowSoft} transition-colors duration-700`}>
          <Icons.Hexagon size={20} />
        </div>
        {clientName}
      </div>

      {/* CENTRO: ENLACES (Centrado Absoluto Perfecto) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-inner">
        {['Plataforma', 'Precios', 'FAQ'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </div>

      {/* DERECHA: CTA (Botón) */}
      <div className="z-10">
        <a href="#pricing" className={`px-6 py-2.5 rounded-full ${t.buttonText} text-sm font-bold ${t.bgMain} ${t.hoverMain} ${t.shadowSoft} hover:${t.shadowMedium} transition-all duration-300 flex items-center gap-2 group`}>
          Planes
          <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

    </div>
  </motion.nav>
);

const Hero = ({ hero, openQuiz, t }: { hero: LandingData['hero']; openQuiz: () => void, t: ThemeStyle }) => (
  <section className="relative pt-48 pb-32 px-6 w-full flex flex-col items-center text-center overflow-hidden">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] ${t.orb} blur-[140px] pointer-events-none -z-10 transition-colors duration-700`} />
    
    <motion.div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${t.borderSoft} ${t.bgSoft} backdrop-blur-md text-sm font-medium mb-8 ${t.textLight} ${t.shadowSoft} transition-colors duration-700`} initial="hidden" animate="visible" variants={fadeUpItem}>
      <span className={`flex h-2 w-2 rounded-full ${t.bgMain} animate-pulse`}></span>
      SaaS Enterprise v2.0
    </motion.div>

    <motion.h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 max-w-6xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 leading-[1.05]" initial="hidden" animate="visible" variants={fadeUpItem}>
      {hero.headline}
    </motion.h1>
    
    <motion.p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-light" initial="hidden" animate="visible" variants={fadeUpItem}>
      {hero.subheadline}
    </motion.p>
    
    <motion.div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-24" initial="hidden" animate="visible" variants={fadeUpItem}>
      <button onClick={openQuiz} className={`px-10 py-5 rounded-xl ${t.buttonText} font-black text-xl ${t.bgMain} ${t.hoverMain} ${t.shadowMedium} hover:${t.shadowHard} hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3`}>
        Empezar un proyecto <Icons.Rocket size={24} />
      </button>
      <button className={`px-10 py-5 rounded-xl bg-white/5 backdrop-blur-md text-white font-bold text-xl border border-white/10 hover:${t.borderHard} hover:bg-white/10 transition-all flex items-center justify-center gap-3`}>
        <Icons.PlayCircle size={24} className={`${t.text} transition-colors`} /> Ver Demo
      </button>
    </motion.div>

    <motion.div className="w-full max-w-6xl relative" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}>
      <div className={`absolute inset-0 ${t.bgMedium} blur-[100px] rounded-full z-0 transition-colors duration-700`} />
      <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className={`w-full aspect-[16/9] md:aspect-[21/9] rounded-xl ${t.bgCard} overflow-hidden relative flex items-center justify-center border border-[#1f2937] transition-colors duration-700`}>
          <Icons.Activity size={64} className="text-[#1f2937]" />
          <div className={`absolute inset-0 bg-gradient-to-t from-${t.bgCard.replace('bg-', '')} via-transparent to-transparent`} />
        </div>
      </div>
    </motion.div>
  </section>
);

const SocialProof = ({ t }: { t: ThemeStyle }) => (
  <section className={`py-12 border-b border-white/5 ${t.bgCard} transition-colors duration-700`}>
    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Potenciando equipos de alto rendimiento</p>
    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale select-none text-slate-300 hover:grayscale-0 transition-all duration-700">
      <div className="flex items-center gap-2 text-2xl font-bold font-sans"><Icons.Hexagon size={32} /> <span>Astra</span></div>
      <div className="flex items-center gap-2 text-2xl font-bold font-sans tracking-tight"><Icons.Layers size={32} /> <span>Nexus</span></div>
      <div className="flex items-center gap-2 text-2xl font-bold font-serif italic"><Icons.Command size={32} /> <span>Cmdq</span></div>
      <div className="flex items-center gap-2 text-2xl font-black font-sans uppercase tracking-widest"><Icons.Cpu size={32} /> <span>SYNAPSE</span></div>
    </div>
  </section>
);

const Features = ({ features, t }: { features: Feature[], t: ThemeStyle }) => (
  <section id="features" className="py-32 px-6 w-full max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">Ingeniería de precisión.</h2>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Arquitectura robusta diseñada para la velocidad, escalabilidad y una experiencia de desarrollo sin fricciones.</p>
    </div>
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
      {features.map((feature, index) => {
        const IconComponent = (Icons as Record<string, any>)[feature.iconName] || Icons.Code2;
        const isWide = index === 0 || index === 3; 
        return (
          <motion.div key={feature.id} variants={fadeUpItem} className={`group relative bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/10 hover:${t.borderGlow} hover:bg-white/10 hover:${t.shadowSoft} hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}>
            <div className={`absolute -top-20 -right-20 w-64 h-64 ${t.bgMedium} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 ${t.text} group-hover:scale-110 group-hover:${t.bgMedium} group-hover:${t.borderHard} transition-all duration-500 shadow-lg relative z-10`}>
              <IconComponent size={28} />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

const DetailedBenefits = ({ benefits, t }: { benefits: DetailedBenefit[], t: ThemeStyle }) => {
  if (!benefits || benefits.length === 0) return null;
  return (
    <section className={`py-32 px-6 ${t.bgCard} overflow-hidden border-t border-white/5 transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto space-y-40">
        {benefits.map((benefit) => {
          const IconComp = (Icons as Record<string, any>)[benefit.iconName] || Icons.Cpu;
          return (
            <motion.div key={benefit.id} className={`flex flex-col gap-16 items-center ${benefit.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpItem}>
              <div className="flex-1 space-y-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${t.bgSoft} border ${t.borderSoft} ${t.text} ${t.shadowSoft} transition-colors duration-700`}>
                  <IconComp size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">{benefit.title}</h3>
                <p className="text-xl text-slate-400 leading-relaxed font-light">{benefit.description}</p>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-center gap-3 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10"><Icons.Check size={18} className={`${t.text} transition-colors`} /> Despliegue en milisegundos</li>
                  <li className="flex items-center gap-3 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10"><Icons.Check size={18} className={`${t.text} transition-colors`} /> Monitoreo en tiempo real</li>
                </ul>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <Icons.Terminal size={80} className="text-white/10" />
                  <div className={`absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 ${t.bgMain} transition-colors duration-700`} />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const Pricing = ({ pricing, t }: { pricing: PricingPlan[], t: ThemeStyle }) => {
  if (!pricing || pricing.length === 0) return null;
  return (
    <section id="pricing" className="py-32 px-6 w-full max-w-6xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">Precios transparentes.</h2>
        <p className="text-xl text-slate-400 font-light">Escala tu infraestructura sin costos ocultos.</p>
      </div>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {pricing.map((plan) => (
          <motion.div key={plan.id} variants={fadeUpItem} className={`relative p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 backdrop-blur-xl ${plan.isPopular ? `bg-gradient-to-b from-white/5 to-${t.bgCard.replace('bg-', '')} border ${t.borderGlow} ${t.shadowSoft} scale-105 z-10` : `bg-white/5 border border-white/10 hover:${t.borderHard} hover:bg-white/10`}`}>
            {plan.isPopular && (
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-1.5 rounded-full text-xs font-black ${t.buttonText} ${t.bgMain} tracking-widest uppercase ${t.shadowSoft} transition-colors duration-700`}>
                Enterprise
              </div>
            )}
            <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-slate-300'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-10">
              <span className="text-6xl font-black tracking-tighter text-white">{plan.price}</span><span className="text-slate-500">/mes</span>
            </div>
            <ul className="space-y-5 mb-10 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Icons.CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? t.text : 'text-slate-500'} transition-colors`} />
                  <span className={`${plan.isPopular ? 'text-white font-medium' : 'text-slate-400'}`}>{feat}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-5 rounded-2xl font-bold text-base transition-all ${plan.isPopular ? `${t.bgMain} ${t.buttonText} ${t.hoverMain} ${t.shadowMedium}` : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}>
              Elegir {plan.name}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const FAQAccordion = ({ faqs, t }: { faqs: FAQItem[], t: ThemeStyle }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  if (!faqs || faqs.length === 0) return null;
  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16"><h2 className="text-4xl font-black text-white tracking-tight">Preguntas Frecuentes</h2></div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className={`border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden transition-colors hover:${t.borderHard}`}>
            <button className="w-full px-8 py-6 text-left flex justify-between items-center text-white font-bold" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
              {faq.question}
              <Icons.ChevronDown className={`w-5 h-5 ${t.text} transition-all duration-300 ${openId === faq.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openId === faq.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-slate-400 leading-relaxed font-light">{faq.answer}</motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const FooterAndCTA = ({ t }: { t: ThemeStyle }) => (
  <>
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.05)]">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${t.orb} pointer-events-none transition-colors duration-700`} />
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter relative z-10 leading-[1.1]">Desplegá tu potencial.</h2>
        <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto relative z-10 font-light">Unite a los equipos líderes que ya están construyendo el futuro con nuestra infraestructura.</p>
        <button className={`px-12 py-6 rounded-2xl ${t.buttonText} font-black text-xl ${t.bgMain} ${t.hoverMain} ${t.shadowMedium} hover:scale-105 transition-all relative z-10`}>
          Iniciar prueba de 14 días
        </button>
      </div>
    </section>
    
    <footer className={`${t.bgBase} border-t border-white/5 pt-20 pb-10 px-6 transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
        <div className="col-span-2">
          <div className="font-bold text-2xl text-white mb-6 flex items-center gap-2">
            <Icons.Hexagon size={28} className={`${t.text} transition-colors`} /> SaaS v2.0
          </div>
          <p className="text-slate-500 text-base max-w-sm leading-relaxed font-light">Infraestructura escalable y segura para la próxima generación de empresas en internet.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Producto</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Plataforma</a></li>
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Precios</a></li>
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Recursos</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Documentación</a></li>
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Blog</a></li>
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Comunidad</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-wide">Legal</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Privacidad</a></li>
            <li><a href="#" className={`hover:${t.text} transition-colors`}>Términos</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 font-medium">
        <p>© {new Date().getFullYear()} SaaS Enterprise. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className={`text-slate-500 hover:${t.text} transition-colors`}><Icons.Globe size={22} /></a>
          <a href="#" className={`text-slate-500 hover:${t.text} transition-colors`}><Icons.MessageSquare size={22} /></a>
          <a href="#" className={`text-slate-500 hover:${t.text} transition-colors`}><Icons.Mail size={22} /></a>
        </div>
      </div>
    </footer>
  </>
);

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Orquestador global)
// ---------------------------------------------------------------------------
export default function SaasTemplate({ data }: SaasTemplateProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  // ✅ AQUÍ VIVE EL ESTADO GLOBAL DEL COLOR
  const [activeThemeId, setActiveThemeId] = useState<string>('moderno');
  
  // Extraemos el objeto de colores en base a lo que el usuario eligió
  const t = THEMES[activeThemeId];

  const { hero, features, pricing, clientName } = data;

  // Fallbacks originales intactos
  const fallbackBenefits: DetailedBenefit[] = data.detailedBenefits || [
    { id: 'b1', title: 'Infraestructura Global', description: 'Desplegá tu código en el edge en milisegundos. Sin configuraciones complejas.', iconName: 'Globe', reverse: false },
    { id: 'b2', title: 'Seguridad Zero Trust', description: 'Cifrado de extremo a extremo, prevención de DDoS y cumplimiento SOC2 integrado.', iconName: 'Shield', reverse: true }
  ];

  const fallbackFAQs: FAQItem[] = data.faqs || [
    { id: 'f1', question: '¿Cómo funciona el proceso de migración?', answer: 'Nuestro equipo de ingenieros se encarga de la migración completa sin tiempo de inactividad (Zero Downtime) utilizando nuestras herramientas CLI propietarias.' },
    { id: 'f2', question: '¿Tienen soporte técnico 24/7?', answer: 'Sí, todos los planes Enterprise incluyen un canal de Slack dedicado y soporte L3 con tiempo de respuesta garantizado de 15 minutos.' }
  ];

  return (
    <div className={`min-h-screen ${t.bgBase} ${t.selection} font-sans overflow-hidden text-slate-200 relative transition-colors duration-700`}>
      <Navbar clientName={clientName} t={t} />
      
      <main>
        <Hero hero={hero} openQuiz={() => setIsQuizOpen(true)} t={t} />
        <SocialProof t={t} />
        <Features features={features} t={t} />
        <DetailedBenefits benefits={fallbackBenefits} t={t} />
        <Pricing pricing={pricing || []} t={t} />
        <FAQAccordion faqs={fallbackFAQs} t={t} />
        <FooterAndCTA t={t} />
      </main>

      {/* Quiz */}
      <ProjectQuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        t={t} 
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}
      />

      {/* ✅ VOLVIÓ EL THEME SWITCHER FLOTANTE */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#0a0e17]/80 backdrop-blur-xl border border-white/10 p-2 rounded-full flex gap-2 shadow-2xl">
        {Object.values(THEMES).map((theme) => (
          <button
            key={theme.id}
            onClick={() => setActiveThemeId(theme.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeThemeId === theme.id 
                ? `${t.bgMain} ${t.buttonText} shadow-lg ${t.shadowSoft}` 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

    </div>
  );
}