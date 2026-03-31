// Archivo: components/templates/LinkBioTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO (Optimizado para Marcas Personales / Creators)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string;
  bgBase: string; bgCard: string; bgCardAlpha: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string;
  borderSoft: string; borderHard: string; shadowMedium: string;
  selection: string; ringColor: string;
};

const THEMES: Record<string, ThemeStyle> = {
  dark: {
    id: 'dark', name: 'Creator Dark', desc: 'Oscuro y tecnológico.',
    bgBase: 'bg-[#09090b]', bgCard: 'bg-[#18181b]', bgCardAlpha: 'bg-[#18181b]/80',
    text: 'text-white', textLight: 'text-zinc-400', buttonText: 'text-white',
    bgMain: 'bg-violet-600', hoverMain: 'hover:bg-violet-500', bgSoft: 'bg-violet-500/10',
    borderSoft: 'border-white/10', borderHard: 'border-violet-500/50', shadowMedium: 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
    selection: 'selection:bg-violet-500/30 selection:text-white', ringColor: 'focus:ring-violet-500/30'
  },
  light: {
    id: 'light', name: 'Minimal Light', desc: 'Limpio y elegante.',
    bgBase: 'bg-[#fafafa]', bgCard: 'bg-white', bgCardAlpha: 'bg-white/80',
    text: 'text-zinc-900', textLight: 'text-zinc-500', buttonText: 'text-white',
    bgMain: 'bg-zinc-900', hoverMain: 'hover:bg-zinc-800', bgSoft: 'bg-zinc-100',
    borderSoft: 'border-zinc-200', borderHard: 'border-zinc-300', shadowMedium: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
    selection: 'selection:bg-zinc-900/20 selection:text-zinc-900', ringColor: 'focus:ring-zinc-900/10'
  },
  neon: {
    id: 'neon', name: 'Neon Pop', desc: 'Vibrante y audaz.',
    bgBase: 'bg-[#0f0c29]', bgCard: 'bg-white/5', bgCardAlpha: 'bg-white/5',
    text: 'text-white', textLight: 'text-fuchsia-200/60', buttonText: 'text-white',
    bgMain: 'bg-fuchsia-600', hoverMain: 'hover:bg-fuchsia-500', bgSoft: 'bg-fuchsia-500/20',
    borderSoft: 'border-white/10', borderHard: 'border-fuchsia-500/50', shadowMedium: 'shadow-[0_8px_30px_rgba(192,38,211,0.2)]',
    selection: 'selection:bg-fuchsia-500/30 selection:text-white', ringColor: 'focus:ring-fuchsia-500/30'
  }
};

// ---------------------------------------------------------------------------
// INTERFACES ESTRICTAS LOCALES
// ---------------------------------------------------------------------------
export interface BioLink {
  id: string;
  title: string;
  url: string;
  iconName: string;
}

export interface ExtendedLinkBioData extends Omit<LandingData, 'theme'> {
  avatarUrl?: string;
  links?: BioLink[];
}

interface LinkBioTemplateProps {
  data: ExtendedLinkBioData;
}

// ---------------------------------------------------------------------------
// SAFE ICON RENDERER
// ---------------------------------------------------------------------------
const SafeIcon = ({ name, size = 24, className, color }: { name: string, size?: number, className?: string, color?: string }) => {
  const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Link;
  return <IconComponent size={size} className={className} color={color} strokeWidth={2} />;
};

// ---------------------------------------------------------------------------
// ANIMACIONES FLUIDAS (Móvil)
// ---------------------------------------------------------------------------
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
export default function LinkBioTemplate({ data }: LinkBioTemplateProps) {
  // ✅ ESTADO DEL TEMA
  const [activeThemeId, setActiveThemeId] = useState<string>('dark');
  const t = THEMES[activeThemeId];

  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const { hero, avatarUrl, links } = data;

 // ✅ CAMBIO: Reducido a los 5 enlaces más estratégicos y de mayor conversión
  const defaultLinks: BioLink[] = [
    { id: '1', title: 'Mi Sitio Web Oficial', url: '#', iconName: 'Globe' },
    { id: '2', title: 'Mi Canal de YouTube', url: '#', iconName: 'Youtube' },
    { id: '3', title: 'Sígueme en Instagram', url: '#', iconName: 'Instagram' },
    { id: '4', title: 'Agendar Consultoría 1:1', url: '#', iconName: 'Calendar' },
    { id: '5', title: 'Descargar E-book Gratis', url: '#', iconName: 'Download' }
  ];

  // ✅ LÓGICA INTELIGENTE: Actualizamos la regla a 5. Si la DB manda menos de 5, forzamos los nuestros.
  const safeLinks: BioLink[] = (links && links.length >= 5) 
    ? links 
    : defaultLinks;

  const safeAvatar = avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&auto=format&fit=crop";

  // Hydration Guard
  if (!isMounted) return <div className="min-h-screen bg-[#09090b]" />;

  return (
    <div className={`min-h-screen ${t.bgBase} flex justify-center ${t.text} ${t.selection} font-sans overflow-y-auto relative transition-colors duration-700`}>
      
      {/* Fondo sutil tipo Mesh Animado que reacciona al tema */}
      <div 
        className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0 transition-colors duration-700"
        style={{ background: `radial-gradient(circle at 50% 0%, ${t.bgMain.replace('bg-', '')} 0%, transparent 50%)` }}
      />
      {/* Textura de ruido sutil para hacerlo más premium */}
      <div className="fixed inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Layout Mobile-First (max-w-md para simular pantalla de celular) */}
      <main className="w-full max-w-md px-6 py-12 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="w-full flex flex-col items-center"
        >
          {/* ✅ Avatar con borde y glow dinámico */}
          <motion.div variants={itemReveal} className="relative mb-6">
            <motion.div 
              className={`absolute -inset-1.5 rounded-full blur-md opacity-50 ${t.bgMain} transition-colors duration-700`}
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className={`relative w-28 h-28 rounded-full border-4 ${t.bgBase} overflow-hidden z-10 shadow-xl transition-colors duration-700`}>
              <img src={safeAvatar} alt={hero.headline} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* ✅ Bio / Headers */}
          <motion.h1 variants={itemReveal} className={`text-2xl font-black mb-2 text-center tracking-tight ${t.text} transition-colors duration-700`}>
            {hero.headline}
          </motion.h1>
          <motion.p variants={itemReveal} className={`${t.textLight} text-center text-sm font-medium mb-6 px-4 leading-relaxed transition-colors duration-700`}>
            {hero.subheadline}
          </motion.p>

          {/* ✅ Redes Sociales Mínimas bajo el texto (SVGs nativos para evitar fallos de librería) */}
          <motion.div variants={itemReveal} className="flex gap-4 mb-10">
            
            {/* Twitter / X */}
            <a href="#" aria-label="Twitter" className={`p-2 rounded-full ${t.bgSoft} ${t.textLight} hover:${t.text} hover:scale-110 transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram" className={`p-2 rounded-full ${t.bgSoft} ${t.textLight} hover:${t.text} hover:scale-110 transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className={`p-2 rounded-full ${t.bgSoft} ${t.textLight} hover:${t.text} hover:scale-110 transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            {/* GitHub */}
            <a href="#" aria-label="GitHub" className={`p-2 rounded-full ${t.bgSoft} ${t.textLight} hover:${t.text} hover:scale-110 transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                <path d="M12 18v-4"></path>
                <path d="M5 20l-3-1"></path>
              </svg>
            </a>

          </motion.div>

          {/* ✅ Smart Links (Botones) interactivos */}
          <div className="w-full flex flex-col gap-4 mb-12">
            {safeLinks.map((link) => (
              <motion.a
                key={link.id}
                variants={itemReveal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={link.url}
                className={`group relative w-full p-4 rounded-[1.25rem] flex items-center justify-between border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md overflow-hidden transition-all duration-300 hover:${t.borderHard} ${t.shadowMedium}`}
              >
                {/* Relleno sutil al pasar el mouse */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${t.bgSoft}`} />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.bgBase} border ${t.borderSoft} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <SafeIcon name={link.iconName} size={20} className={t.text} />
                  </div>
                  <span className={`font-bold text-[15px] tracking-tight ${t.text}`}>{link.title}</span>
                </div>
                <Icons.ChevronRight size={20} className={`${t.textLight} group-hover:${t.text} transition-colors relative z-10`} />
              </motion.a>
            ))}
          </div>

          {/* ✅ Micro-Lead Capture Integrado (Newsletter) */}
          <motion.div variants={itemReveal} className={`w-full p-6 rounded-[1.5rem] border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md ${t.shadowMedium} transition-all duration-700`}>
            <div className={`flex items-center justify-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest ${t.textLight}`}>
              <Icons.Mail size={16} className={`text-${t.bgMain.replace('bg-', '')}`} />
              <span>Newsletter VIP</span>
            </div>
            
            {!submitted ? (
              <form 
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <div 
                    className={`absolute inset-0 rounded-xl blur-md transition-opacity duration-300 pointer-events-none ${t.bgMain} ${isFocused ? 'opacity-20' : 'opacity-0'}`} 
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Tu mejor email..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full relative bg-transparent border ${t.borderSoft} rounded-xl px-4 py-3 text-sm ${t.text} focus:outline-none focus:border-transparent focus:ring-2 ${t.ringColor} transition-all placeholder:${t.textLight}`}
                  />
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3.5 rounded-xl ${t.buttonText} ${t.bgMain} ${t.hoverMain} font-black text-sm uppercase tracking-wider shadow-lg transition-all`}
                >
                  Suscribirme
                </motion.button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 text-center">
                <Icons.CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-500" />
                <p className={`font-bold ${t.text} text-sm`}>¡Estás dentro!</p>
                <p className={`text-xs ${t.textLight} mt-1`}>Revisá tu bandeja de entrada.</p>
              </motion.div>
            )}
          </motion.div>

        </motion.div>
        
        {/* Footer miniatura */}
        <p className={`mt-12 text-xs font-medium ${t.textLight} opacity-50`}>
          Powered by LinkBio™
        </p>

      </main>

      {/* ✅ SELECTOR DE TEMAS FLOTANTE */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${t.bgCardAlpha} backdrop-blur-xl border ${t.borderSoft} p-1.5 rounded-full flex gap-1 shadow-2xl transition-colors duration-700`}>
        {Object.values(THEMES).map((themeObj) => (
          <button
            key={themeObj.id} onClick={() => setActiveThemeId(themeObj.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeThemeId === themeObj.id 
                ? `${t.bgMain} ${t.buttonText} shadow-md` 
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