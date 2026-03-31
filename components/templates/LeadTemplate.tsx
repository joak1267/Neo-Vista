// Archivo: components/templates/LeadTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData, Feature } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO (Optimizado para Alta Conversión)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string; dots: string[];
  bgBase: string; bgCard: string; bgCardAlpha: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string;
  borderSoft: string; borderHard: string; shadowMedium: string;
  selection: string;
};

const THEMES: Record<string, ThemeStyle> = {
  trust: {
    id: 'trust', name: 'Trust Blue', desc: 'Limpio y profesional.', dots: ['bg-blue-600', 'bg-slate-50'],
    bgBase: 'bg-slate-50', bgCard: 'bg-white', bgCardAlpha: 'bg-white/80',
    text: 'text-slate-900', textLight: 'text-slate-500', buttonText: 'text-white',
    bgMain: 'bg-blue-600', hoverMain: 'hover:bg-blue-700', bgSoft: 'bg-blue-50',
    borderSoft: 'border-slate-200', borderHard: 'border-blue-300', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]',
    selection: 'selection:bg-blue-600/20 selection:text-blue-900'
  },
  growth: {
    id: 'growth', name: 'Growth Dark', desc: 'Oscuro y tecnológico.', dots: ['bg-emerald-500', 'bg-gray-950'],
    bgBase: 'bg-gray-950', bgCard: 'bg-gray-900', bgCardAlpha: 'bg-gray-900/80',
    text: 'text-white', textLight: 'text-gray-400', buttonText: 'text-gray-950',
    bgMain: 'bg-emerald-500', hoverMain: 'hover:bg-emerald-400', bgSoft: 'bg-emerald-500/10',
    borderSoft: 'border-gray-800', borderHard: 'border-emerald-500/50', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)]',
    selection: 'selection:bg-emerald-500/30 selection:text-emerald-200'
  },
  creative: {
    id: 'creative', name: 'Creative Purple', desc: 'Vibrante y moderno.', dots: ['bg-fuchsia-600', 'bg-[#0f0a1a]'],
    bgBase: 'bg-[#0f0a1a]', bgCard: 'bg-[#1a102a]', bgCardAlpha: 'bg-[#1a102a]/80',
    text: 'text-white', textLight: 'text-fuchsia-200/60', buttonText: 'text-white',
    bgMain: 'bg-fuchsia-600', hoverMain: 'hover:bg-fuchsia-500', bgSoft: 'bg-fuchsia-600/10',
    borderSoft: 'border-fuchsia-900/30', borderHard: 'border-fuchsia-500/50', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(192,38,211,0.2)]',
    selection: 'selection:bg-fuchsia-500/30 selection:text-fuchsia-200'
  }
};

// ---------------------------------------------------------------------------
// TIPADO E INTERFACES
// ---------------------------------------------------------------------------
export interface ExtendedFeature extends Feature {
  tags?: string[];
}

interface LeadTemplateProps {
  data: LandingData & { features?: ExtendedFeature[] };
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

const SafeIcon = ({ name, size = 24, className, color }: IconRendererProps) => {
  const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.CheckCircle;
  return <IconComponent size={size} className={className} color={color} strokeWidth={1.5} />;
};

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
export default function LeadTemplate({ data }: LeadTemplateProps) {
  // ✅ ESTADO DEL TEMA
  const [activeThemeId, setActiveThemeId] = useState<string>('trust');
  const t = THEMES[activeThemeId];

  const { hero, features } = data;
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="min-h-screen bg-gray-50" />; 

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Fallback Features por si no vienen de la DB
  const displayFeatures = features && features.length > 0 ? features : [
    { id: '1', title: 'Estrategia Probada', description: 'Framework paso a paso utilizado por cientos de empresas.', iconName: 'TrendingUp' },
    { id: '2', title: 'Plantillas Listas', description: 'Recursos listos para copiar, pegar y empezar a generar resultados.', iconName: 'Copy' },
    { id: '3', title: 'Acceso Inmediato', description: 'Recibí todo el material en tu correo en cuestión de segundos.', iconName: 'Unlock' },
    { id: '4', title: 'Soporte Exclusivo', description: 'Invitación a nuestra comunidad privada de fundadores.', iconName: 'Users' }
  ];

  return (
    <div className={`min-h-screen ${t.bgBase} ${t.text} ${t.selection} font-sans flex flex-col justify-center overflow-hidden relative transition-colors duration-700`}>
      
      {/* Background Ambient Glow adaptado al tema */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ${t.bgMain} opacity-20 blur-[120px] rounded-full pointer-events-none transition-colors duration-700`} />

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20 w-full relative z-10">
        <div className={`${t.bgCardAlpha} backdrop-blur-2xl rounded-[2.5rem] ${t.shadowMedium} border ${t.borderSoft} overflow-hidden flex flex-col lg:flex-row transition-all duration-700`}>
          
          {/* COLUMNA IZQUIERDA: Copy y Formulario (Conversion Zone) */}
          <motion.div 
            className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative z-10"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className={`flex items-center gap-2 mb-8 inline-flex px-4 py-2 rounded-full ${t.bgSoft} border ${t.borderSoft} text-sm font-bold uppercase tracking-wider w-max transition-colors duration-700`}>
              <Icons.Zap size={16} className={t.text} />
              <span className={t.text}>Material Gratuito</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight ${t.text} transition-colors duration-700`}>
              {hero.headline}
            </motion.h1>
            
            <motion.p variants={fadeUp} className={`text-lg md:text-xl ${t.textLight} mb-10 leading-relaxed font-medium max-w-lg transition-colors duration-700`}>
              {hero.subheadline}
            </motion.p>

            <motion.form 
              variants={fadeUp}
              className="flex flex-col gap-4 mb-8 w-full max-w-md relative" 
              onSubmit={(e) => {
                e.preventDefault();
                // Lógica de submit futura
              }}
            >
              <div className="relative">
                <Icons.User size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.textLight}`} />
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Tu nombre completo" 
                  className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-transparent border ${t.borderSoft} focus:bg-transparent focus:border-transparent focus:ring-2 focus:ring-${t.bgMain.replace('bg-', '')} transition-all duration-300 font-medium placeholder:${t.textLight} ${t.text}`}
                />
              </div>
              <div className="relative">
                <Icons.Mail size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.textLight}`} />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Tu mejor email" 
                  className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-transparent border ${t.borderSoft} focus:bg-transparent focus:border-transparent focus:ring-2 focus:ring-${t.bgMain.replace('bg-', '')} transition-all duration-300 font-medium placeholder:${t.textLight} ${t.text}`}
                />
              </div>
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full py-5 rounded-2xl ${t.buttonText} font-black text-lg overflow-hidden transition-all shadow-xl hover:shadow-2xl mt-2 flex justify-center items-center gap-2 ${t.bgMain} ${t.hoverMain}`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <span>{hero.ctaText}</span>
                <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.form>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="flex items-center gap-3">
                <Icons.ShieldCheck size={20} className="text-emerald-500" />
                <span className={`text-sm font-semibold ${t.textLight}`}>Privacidad 100% Segura</span>
              </div>
              <div className={`hidden sm:block w-1 h-1 rounded-full ${t.bgSoft}`} />
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full ${t.bgCard} border-2 ${t.borderSoft} flex items-center justify-center overflow-hidden`}>
                      <Icons.User size={14} className={t.textLight} />
                    </div>
                  ))}
                </div>
                <span className={`text-sm font-bold ${t.text}`}>+5,000 descargas</span>
              </div>
            </motion.div>
          </motion.div>

          {/* COLUMNA DERECHA: Bento Benefits Layout dinámico */}
          <motion.div 
            className={`flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center ${t.bgMain} transition-colors duration-700`}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className={`text-3xl font-black ${t.buttonText} mb-8 tracking-tight`}>¿Qué vas a conseguir?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayFeatures.map((feature) => (
                  <motion.div 
                    key={feature.id} 
                    whileHover={{ y: -5 }}
                    className="group bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 cursor-default"
                  >
                    <div 
                      className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner ${t.buttonText}`}
                    >
                      <SafeIcon name={feature.iconName} size={24} />
                    </div>
                    <h4 className={`font-bold text-lg ${t.buttonText} mb-2 leading-tight`}>{feature.title}</h4>
                    <p className={`${t.buttonText} opacity-80 text-sm leading-relaxed`}>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

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