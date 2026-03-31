// Archivo: components/templates/WaitlistTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO (Optimizado para Lanzamientos / Exclusividad)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string;
  bgBase: string; bgCard: string; bgCardAlpha: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string;
  borderSoft: string; borderHard: string; shadowMedium: string;
  selection: string; hexMain: string; hexAccent: string;
  isDark: boolean;
};

const THEMES: Record<string, ThemeStyle> = {
  stealth: {
    id: 'stealth', name: 'Stealth Dark', desc: 'Tech Startup, IA, Cyber.',
    bgBase: 'bg-[#050505]', bgCard: 'bg-[#111111]', bgCardAlpha: 'bg-[#111111]/80',
    text: 'text-white', textLight: 'text-zinc-500', buttonText: 'text-[#050505]',
    bgMain: 'bg-emerald-500', hoverMain: 'hover:bg-emerald-400', bgSoft: 'bg-emerald-500/10',
    borderSoft: 'border-white/10', borderHard: 'border-emerald-500/50', shadowMedium: 'shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    selection: 'selection:bg-emerald-500/30 selection:text-white', 
    hexMain: '#10b981', hexAccent: '#047857', isDark: true
  },
  minimal: {
    id: 'minimal', name: 'Clean Minimal', desc: 'Lujo, Moda, Agencias.',
    bgBase: 'bg-[#fafafa]', bgCard: 'bg-white', bgCardAlpha: 'bg-white/80',
    text: 'text-zinc-900', textLight: 'text-zinc-500', buttonText: 'text-white',
    bgMain: 'bg-zinc-900', hoverMain: 'hover:bg-zinc-800', bgSoft: 'bg-zinc-900/5',
    borderSoft: 'border-zinc-200', borderHard: 'border-zinc-400', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]',
    selection: 'selection:bg-zinc-900/20 selection:text-zinc-900', 
    hexMain: '#18181b', hexAccent: '#d4d4d8', isDark: false
  },
  hype: {
    id: 'hype', name: 'Hype Pop', desc: 'Web3, Gaming, Creadores.',
    bgBase: 'bg-[#0f0c29]', bgCard: 'bg-[#1a102a]', bgCardAlpha: 'bg-[#1a102a]/80',
    text: 'text-white', textLight: 'text-indigo-200/60', buttonText: 'text-white',
    bgMain: 'bg-indigo-500', hoverMain: 'hover:bg-indigo-400', bgSoft: 'bg-indigo-500/20',
    borderSoft: 'border-white/10', borderHard: 'border-indigo-500/50', shadowMedium: 'shadow-[0_0_40px_rgba(99,102,241,0.2)]',
    selection: 'selection:bg-indigo-500/30 selection:text-white', 
    hexMain: '#6366f1', hexAccent: '#c026d3', isDark: true
  }
};

// ---------------------------------------------------------------------------
// INTERFACES ESTRICTAS LOCALES PARA WAITLIST (Zero 'any')
// ---------------------------------------------------------------------------
export interface WaitlistState {
  currentSpot: number;
  totalCapacity?: number;
  activeUsers: number;
}

export interface ExtendedWaitlistData extends Omit<LandingData, 'theme'> {
  waitlist?: WaitlistState;
}

interface WaitlistTemplateProps {
  data: ExtendedWaitlistData;
}

// ---------------------------------------------------------------------------
// MESH GRADIENT ANIMADO (Adaptativo a temas claros y oscuros)
// ---------------------------------------------------------------------------
const AnimatedMeshBackground = ({ t }: { t: ThemeStyle }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Orbe Principal */}
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        x: ['-20%', '10%', '-20%'],
        y: ['-10%', '20%', '-10%']
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 ${t.isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
      style={{ backgroundColor: t.hexMain }}
    />
    {/* Orbe Secundario (Accent) */}
    <motion.div
      animate={{ 
        scale: [1, 1.5, 1],
        x: ['20%', '-10%', '20%'],
        y: ['20%', '-20%', '20%']
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-20 ${t.isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
      style={{ backgroundColor: t.hexAccent }}
    />
    {/* Textura de Ruido (Grain) para aspecto premium */}
    <div 
      className={`absolute inset-0 opacity-[0.03] ${t.isDark ? 'mix-blend-screen' : 'mix-blend-darken'}`} 
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
  </div>
);

// ---------------------------------------------------------------------------
// CONTADOR ANIMADO (Efecto ruleta de números)
// ---------------------------------------------------------------------------
const AnimatedCounter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Orquestador Minimalista)
// ---------------------------------------------------------------------------
export default function WaitlistTemplate({ data }: WaitlistTemplateProps) {
  // ✅ ESTADO DEL TEMA
  const [activeThemeId, setActiveThemeId] = useState<string>('stealth');
  const t = THEMES[activeThemeId];

  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const { hero, waitlist, clientName } = data;

  // Fallbacks de datos temporales si la DB no envía info
  const safeWaitlist = waitlist || {
    currentSpot: 14592,
    activeUsers: 341
  };

  // Hydration Guard
  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center font-sans ${t.bgBase} ${t.text} ${t.selection} overflow-hidden transition-colors duration-700`}>
      
      {/* Fondo Animado Reactivo al Tema */}
      <AnimatedMeshBackground t={t} />

      {/* Contenedor Principal (Minimalismo y FOMO) */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-12 pb-24">
        
        {/* Micro-interacción: Estado en vivo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className={`mb-12 inline-flex items-center gap-3 px-5 py-2 rounded-full border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md text-xs font-bold uppercase tracking-widest shadow-sm transition-colors duration-700`}
        >
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${t.bgMain}`} />
            <span className={`relative inline-flex rounded-full h-3 w-3 ${t.bgMain}`} />
          </span>
          <span className={t.textLight}>
            <AnimatedCounter value={safeWaitlist.activeUsers} /> personas viendo esta página
          </span>
        </motion.div>

        {/* Headline Masivo */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-[3.5rem] md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-8 ${t.text} transition-colors duration-700`}
        >
          {hero.headline}
        </motion.h1>

        {/* Subheadline Persuasivo */}
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-xl md:text-2xl ${t.textLight} font-medium mb-16 max-w-2xl leading-relaxed transition-colors duration-700`}
        >
          {hero.subheadline}
        </motion.p>

        {/* Formulario / Input Gigante */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-xl relative"
        >
          {!submitted ? (
            <form 
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="relative group w-full"
            >
              {/* Efecto Glow Dinámico detrás del input al hacer focus */}
              <div 
                className={`absolute -inset-1 rounded-full blur-xl transition-opacity duration-500 pointer-events-none ${isFocused ? 'opacity-40' : 'opacity-0'} ${t.bgMain}`} 
              />
              
              {/* Caja del Input adaptativa al tema */}
              <div className={`relative flex flex-col sm:flex-row items-center ${t.bgCard} border ${t.borderSoft} rounded-[2rem] sm:rounded-full p-2 transition-all duration-300 ${isFocused ? t.borderHard : ''} ${t.shadowMedium}`}>
                
                <div className="hidden sm:block pl-6 pr-2">
                  <Icons.Mail size={24} className={`${isFocused ? t.text : t.textLight} transition-colors`} />
                </div>
                
                <input
                  type="email"
                  required
                  placeholder="Tu mejor correo electrónico..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full bg-transparent border-none text-center sm:text-left text-lg ${t.text} placeholder:${t.textLight} focus:outline-none focus:ring-0 py-4 font-medium transition-colors`}
                />
                
                <button 
                  type="submit"
                  className={`w-full sm:w-auto shrink-0 px-8 py-4 mt-2 sm:mt-0 rounded-full font-bold uppercase tracking-widest text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] ${t.bgMain} ${t.buttonText} shadow-lg`}
                >
                  {hero.ctaText}
                </button>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 text-center backdrop-blur-md`}
            >
              <Icons.CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-500" />
              <h3 className={`text-3xl font-black ${t.text} mb-2 tracking-tight`}>¡Lugar Reservado!</h3>
              <p className={t.textLight}>Revisá tu bandeja de entrada para confirmar tu acceso anticipado.</p>
            </motion.div>
          )}

          {/* Prueba Social / Posición */}
          {!submitted && (
            <div className={`mt-8 text-sm font-bold ${t.textLight} flex flex-wrap items-center justify-center gap-2 transition-colors duration-700`}>
              <Icons.Users size={18} />
              Ya hay <strong className={`text-lg ${t.text} px-1`}><AnimatedCounter value={safeWaitlist.currentSpot} /></strong> personas en la lista.
            </div>
          )}
        </motion.div>

      </main>

      {/* Footer Minimalista */}
      <div className={`absolute bottom-8 left-0 w-full text-center text-xs font-bold tracking-widest ${t.textLight} uppercase opacity-60 transition-colors duration-700`}>
        © {new Date().getFullYear()} {clientName || 'Brand'}. Acceso Restringido.
      </div>

      {/* ✅ SELECTOR DE TEMAS FLOTANTE */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${t.bgCardAlpha} backdrop-blur-xl border ${t.borderSoft} p-2 rounded-full flex gap-2 shadow-2xl transition-colors duration-700`}>
        {Object.values(THEMES).map((themeObj) => (
          <button
            key={themeObj.id} onClick={() => setActiveThemeId(themeObj.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeThemeId === themeObj.id 
                ? `${t.bgMain} ${t.buttonText} shadow-lg ${t.shadowMedium}` 
                : `${t.textLight} hover:${t.text} hover:bg-black/5 dark:hover:bg-white/10`
            }`}
          >
            {themeObj.name}
          </button>
        ))}
      </div>

    </div>
  );
}