// Archivo: components/templates/PlatformTemplate.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData, Feature } from '@/types/landing';

// ---------------------------------------------------------------------------
// 1. MOTOR DE TEMAS EN VIVO (Optimizado para SaaS y Plataformas)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string;
  bgBase: string; bgCard: string; bgCardAlpha: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string;
  borderSoft: string; borderHard: string; shadowMedium: string;
  selection: string; hexMain: string; isDark: boolean;
};

const THEMES: Record<string, ThemeStyle> = {
  light: {
    id: 'light', name: 'Modern Light', desc: 'Estilo Stripe/Linear.',
    bgBase: 'bg-[#fafafa]', bgCard: 'bg-white', bgCardAlpha: 'bg-white/80',
    text: 'text-slate-900', textLight: 'text-slate-500', buttonText: 'text-white',
    bgMain: 'bg-indigo-600', hoverMain: 'hover:bg-indigo-700', bgSoft: 'bg-indigo-50',
    borderSoft: 'border-slate-200', borderHard: 'border-indigo-300', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]',
    selection: 'selection:bg-indigo-500/20 selection:text-indigo-900', hexMain: '#4f46e5', isDark: false
  },
  dark: {
    id: 'dark', name: 'Dark Tech', desc: 'Modo oscuro premium.',
    bgBase: 'bg-[#09090b]', bgCard: 'bg-[#18181b]', bgCardAlpha: 'bg-[#18181b]/80',
    text: 'text-white', textLight: 'text-zinc-400', buttonText: 'text-[#09090b]',
    bgMain: 'bg-cyan-400', hoverMain: 'hover:bg-cyan-300', bgSoft: 'bg-cyan-400/10',
    borderSoft: 'border-white/10', borderHard: 'border-cyan-500/50', shadowMedium: 'shadow-[0_0_40px_rgba(34,211,238,0.1)]',
    selection: 'selection:bg-cyan-500/30 selection:text-cyan-100', hexMain: '#22d3ee', isDark: true
  },
  enterprise: {
    id: 'enterprise', name: 'Enterprise', desc: 'Confianza B2B.',
    bgBase: 'bg-[#020617]', bgCard: 'bg-[#0f172a]', bgCardAlpha: 'bg-[#0f172a]/80',
    text: 'text-white', textLight: 'text-slate-400', buttonText: 'text-white',
    bgMain: 'bg-blue-600', hoverMain: 'hover:bg-blue-500', bgSoft: 'bg-blue-900/30',
    borderSoft: 'border-slate-800', borderHard: 'border-blue-500/50', shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(37,99,235,0.25)]',
    selection: 'selection:bg-blue-500/30 selection:text-blue-100', hexMain: '#2563eb', isDark: true
  }
};

// ---------------------------------------------------------------------------
// INTERFACES ESTRICTAS
// ---------------------------------------------------------------------------
export interface IntegrationLogo {
  id: string; name: string; iconName: string;
}

export interface PricingTier {
  id: string; name: string; description: string;
  monthlyPrice: string; annualPrice: string;
  features: string[]; isPopular?: boolean; ctaText: string;
}

export interface ExtendedPlatformData extends Omit<LandingData, 'theme' | 'pricing'> {
  integrations?: IntegrationLogo[];
  pricing?: PricingTier[];
}

interface PlatformTemplateProps {
  data: ExtendedPlatformData;
}

// ---------------------------------------------------------------------------
// SAFE ICON RENDERER
// ---------------------------------------------------------------------------
const SafeIcon = ({ name, size = 24, className, color, strokeWidth = 1.5 }: { name: string, size?: number, className?: string, color?: string, strokeWidth?: number }) => {
  const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Box;
  return <IconComponent size={size} className={className} color={color} strokeWidth={strokeWidth} />;
};

// ---------------------------------------------------------------------------
// ANIMACIONES REUTILIZABLES
// ---------------------------------------------------------------------------
const fadeUpOnce: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// ---------------------------------------------------------------------------
// SUB-COMPONENTES DE SECCIÓN (Integrados con Theme Engine)
// ---------------------------------------------------------------------------

// ✅ CAMBIO: HeroParallax mejorado con una Interfaz de Usuario (UI Skeleton) súper realista dentro del mockup
const HeroParallax = ({ hero, t }: { hero: LandingData['hero']; t: ThemeStyle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className={`relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center ${t.bgBase} transition-colors duration-700`}>
      
      {/* Glow de fondo animado */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: t.hexMain }} 
      />

      {/* Contenido de Texto y Botones */}
      <motion.div style={{ opacity: opacityText }} className="relative z-10 max-w-4xl mx-auto mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${t.borderSoft} ${t.bgCardAlpha} backdrop-blur-md text-sm font-semibold mb-8 ${t.text}`}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.hexMain }}></span>
          Plataforma de Nueva Generación
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] mb-6 ${t.text} transition-colors duration-700`}
        >
          {hero.headline}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-xl md:text-2xl ${t.textLight} font-medium mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-700`}
        >
          {hero.subheadline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className={`w-full sm:w-auto px-8 py-4 rounded-xl ${t.buttonText} font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2 ${t.bgMain} ${t.hoverMain}`}>
            {hero.ctaText} <Icons.ArrowRight size={20} />
          </button>
          <button className={`w-full sm:w-auto px-8 py-4 rounded-xl ${t.text} font-bold text-lg border ${t.borderSoft} ${t.bgCardAlpha} hover:${t.bgSoft} backdrop-blur-sm transition-colors`}>
            Agendar Demo
          </button>
        </motion.div>
      </motion.div>

      {/* ✅ MOCKUP DEL DASHBOARD ULTRA-REALISTA */}
      <motion.div 
        style={{ y: mockupY }}
        initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, type: 'spring' }}
        className={`relative z-20 w-full max-w-5xl mx-auto aspect-[16/10] md:aspect-video rounded-2xl md:rounded-[2rem] border ${t.borderHard} ${t.bgCard} shadow-2xl overflow-hidden flex flex-col transition-colors duration-700`}
      >
        {/* Fake Browser/App Header */}
        <div className={`w-full h-10 md:h-12 border-b ${t.borderSoft} flex items-center px-4 gap-2 shrink-0 ${t.bgSoft} transition-colors duration-700`}>
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          
          <div className={`ml-4 flex-1 max-w-md h-5 md:h-6 rounded-md ${t.bgBase} border ${t.borderSoft} flex items-center px-3 opacity-50 hidden sm:flex`}>
            <Icons.Lock size={10} className={t.textLight} />
            <div className={`w-24 h-2 ml-2 rounded-full ${t.bgSoft}`} />
          </div>
        </div>

        {/* Fake App Body (Estructura de Panel de Control) */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Sidebar (Menú Lateral) */}
          <div className={`hidden sm:flex flex-col w-48 lg:w-64 border-r ${t.borderSoft} ${t.bgBase} p-4 gap-4 transition-colors duration-700`}>
            <div className={`w-20 h-5 rounded-md mb-4 ${t.bgSoft}`} style={{ backgroundColor: t.hexMain, opacity: 0.5 }} />
            
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-full h-10 rounded-lg flex items-center px-3 gap-3 transition-colors ${i === 1 ? t.bgSoft : ''}`}>
                <div className={`w-5 h-5 rounded-md ${t.bgSoft} ${i === 1 ? 'opacity-100' : 'opacity-40'}`} style={{ backgroundColor: i === 1 ? t.hexMain : '' }} />
                <div className={`w-16 h-2 rounded-full ${i === 1 ? t.bgMain : t.bgSoft}`} />
              </div>
            ))}
          </div>

          {/* Main Content (Área Principal) */}
          <div className={`flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-6 ${t.bgCard} transition-colors duration-700`}>
            
            {/* Top Bar (Perfil y Búsqueda) */}
            <div className="flex justify-between items-center mb-2">
              <div className={`w-32 h-6 md:h-8 rounded-lg ${t.bgSoft}`} />
              <div className="flex gap-3">
                 <div className={`hidden md:block w-8 h-8 rounded-full ${t.bgSoft}`} />
                 <div className={`w-8 h-8 rounded-full border border-dashed ${t.borderSoft}`} style={{ borderColor: t.hexMain }} />
              </div>
            </div>

            {/* Stats Grid (3 Tarjetas de Métricas) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className={`p-4 rounded-xl border ${t.borderSoft} ${t.bgBase} shadow-sm flex flex-col justify-center transition-colors duration-700 ${i === 3 ? 'hidden md:flex' : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`w-8 h-8 rounded-lg ${t.bgSoft} opacity-70`} style={{ backgroundColor: i === 1 ? t.hexMain : '' }} />
                      <div className={`w-10 h-4 rounded-full ${t.bgSoft}`} />
                    </div>
                    <div className={`w-20 h-4 md:h-5 rounded-md ${t.bgSoft} mb-2`} />
                    <div className={`w-12 h-3 md:h-4 rounded-md ${t.bgSoft} opacity-50`} />
                 </div>
               ))}
            </div>

            {/* Chart Area (Gráfico Falso Abajo) */}
            <div className={`flex-1 rounded-xl border ${t.borderSoft} ${t.bgBase} relative overflow-hidden transition-colors duration-700`}>
               {/* Líneas de cuadrícula sutiles */}
               <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
                  <div className={`w-full h-px ${t.bgMain}`} />
                  <div className={`w-full h-px ${t.bgMain}`} />
                  <div className={`w-full h-px ${t.bgMain}`} />
               </div>
               
               {/* Degradado simulando el área bajo una curva de gráfico */}
               <div 
                 className="absolute inset-x-0 bottom-0 h-3/4 opacity-30" 
                 style={{ background: `linear-gradient(to top, ${t.hexMain}, transparent)` }} 
               />
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ✅ CAMBIO: Marquee Infinito a prueba de bases de datos con pocos logos
const InfiniteMarquee = ({ integrations, t }: { integrations: IntegrationLogo[]; t: ThemeStyle }) => {
  if (!integrations || integrations.length === 0) return null;
  
  // MAGIA ACÁ: Forzamos la repetición 20 veces.
  // Si tenés solo 2 logos, esto crea 40. Si tenés 5, crea 100.
  // Esto asegura que la tira sea tan larga que jamás se vea el borde vacío en ninguna pantalla del mundo.
  const loopList = Array(20).fill(integrations).flat();

  return (
    <section className={`py-12 border-y ${t.borderSoft} ${t.bgBase} overflow-hidden relative transition-colors duration-700`}>
      
      {/* Sombras difuminadas laterales */}
      <div className={`absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-${t.bgBase.replace('bg-', '')} to-transparent z-10 pointer-events-none`} />
      <div className={`absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-${t.bgBase.replace('bg-', '')} to-transparent z-10 pointer-events-none`} />
      
      <p className={`relative z-20 text-center text-sm font-bold ${t.textLight} uppercase tracking-widest mb-10`}>
        Se conecta con tus herramientas favoritas
      </p>
      
      {/* Contenedor del Carrusel */}
      <motion.div 
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        // Aumenté un poco la duración (a 50) para que la velocidad sea agradable a la vista, ya que ahora la tira es mucho más larga
        transition={{ repeat: Infinity, ease: "linear", duration: 50 }} 
      >
        {loopList.map((item, i) => (
          <div key={`${item.id}-${i}`} className={`flex items-center gap-3 mx-10 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default`}>
            <SafeIcon name={item.iconName} size={32} color={t.hexMain} />
            <span className={`text-2xl font-bold ${t.text} tracking-tight`}>{item.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const BentoFeatures = ({ features, t }: { features: Feature[]; t: ThemeStyle }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className={`py-32 px-6 ${t.bgBase} transition-colors duration-700`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black ${t.text} mb-4 tracking-tighter transition-colors duration-700`}>
            Todo lo que necesitás. <br/>Sin la complejidad.
          </h2>
        </div>

        {/* Grilla Asimétrica Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {features.map((feat, i) => {
            const isLarge = i === 0 || i === 3; 
            return (
              <motion.div 
                key={feat.id || i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpOnce}
                className={`relative ${t.bgCard} rounded-3xl p-8 border ${t.borderSoft} overflow-hidden group hover:${t.borderHard} ${t.shadowMedium} transition-all duration-500 flex flex-col justify-between ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${t.hexMain})` }}
                />
                
                <div className={`w-14 h-14 rounded-2xl ${t.bgSoft} flex items-center justify-center border ${t.borderSoft} group-hover:scale-110 transition-transform shadow-sm`}>
                  <SafeIcon name={feat.iconName} size={28} color={t.hexMain} />
                </div>

                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold ${t.text} mb-3 tracking-tight transition-colors duration-700`}>{feat.title}</h3>
                  <p className={`${t.textLight} font-medium leading-relaxed max-w-md transition-colors duration-700`}>{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ✅ CAMBIO: Pricing mejorado para adaptarse a cualquier cantidad de planes (centrado automático) y corregir textos vacíos
const PricingToggle = ({ pricing, t }: { pricing: PricingTier[]; t: ThemeStyle }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  if (!pricing || pricing.length === 0) return null;

  return (
    <section id="precios" className={`py-32 px-6 ${t.bgCard} border-t ${t.borderSoft} relative overflow-hidden transition-colors duration-700`}>
      
      {/* Brillo de fondo sutil para darle aspecto Premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: t.hexMain }} />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className={`text-4xl md:text-5xl font-black ${t.text} mb-8 tracking-tighter transition-colors duration-700`}>Precios simples y escalables</h2>
        
        {/* Switch Animado Mensual/Anual */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`font-bold ${!isAnnual ? t.text : t.textLight}`}>Mensual</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            aria-label="Alternar facturación"
            className={`relative w-16 h-8 rounded-full ${t.bgSoft} border ${t.borderSoft} p-1 transition-colors`}
          >
            <motion.div 
              animate={{ x: isAnnual ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full shadow-md"
              style={{ backgroundColor: t.hexMain }}
            />
          </button>
          <span className={`font-bold flex items-center gap-2 ${isAnnual ? t.text : t.textLight}`}>
            Anual <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest font-black">Ahorrás 20%</span>
          </span>
        </div>

        {/* ✅ FIX: Cambiamos Grid por FlexWrap para que los planes siempre queden centrados (sean 1, 2 o 3) */}
        <div className="flex flex-wrap justify-center items-stretch gap-8 text-left">
          {pricing.map((tier, i) => (
            <motion.div 
              key={tier.id}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
              // Fijamos un ancho ideal para cada tarjeta para que no se estiren de más
              className={`relative w-full md:w-[340px] rounded-[2.5rem] p-8 border flex flex-col transition-all duration-500 ${tier.isPopular ? `${t.borderHard} ${t.bgBase} ${t.shadowMedium} md:-translate-y-4 z-10` : `${t.borderSoft} ${t.bgCardAlpha} hover:${t.borderHard}`}`}
            >
              {tier.isPopular && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${t.bgMain} ${t.buttonText} shadow-lg whitespace-nowrap`}>
                  Más Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-bold ${t.text} mb-2`}>{tier.name}</h3>
              
              {/* ✅ FIX: Si no hay descripción en la DB, ponemos un texto de respaldo automático */}
              <p className={`${t.textLight} text-sm mb-6 ${tier.description ? 'min-h-[40px]' : ''}`}>
                {tier.description || 'Plan ideal para potenciar tus resultados.'}
              </p>
              
              <div className="mb-8">
                <span className={`text-5xl font-black ${t.text} flex items-baseline gap-1`}>
                  $
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                    >
                      {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-lg ${t.textLight} font-medium`}>/mes</span>
                </span>
              </div>

              {/* ✅ FIX: Arreglado el error de 'hover:hover:' que rompía Tailwind */}
              <button 
                className={`w-full py-4 rounded-xl font-bold mb-8 transition-all active:scale-95 shadow-md ${tier.isPopular ? `${t.bgMain} ${t.buttonText} ${t.hoverMain}` : `${t.bgSoft} ${t.text} border ${t.borderSoft} hover:bg-black/5 dark:hover:bg-white/5`}`}
              >
                {tier.ctaText || 'Elegir Plan'}
              </button>

              <div className="flex flex-col gap-4 flex-1">
                <p className={`text-xs font-bold ${t.text} uppercase tracking-widest mb-2 opacity-80`}>Qué incluye:</p>
                
                {/* Fallback de características si la DB lo manda vacío */}
                {tier.features && tier.features.length > 0 ? (
                  tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Icons.Check size={18} className="mt-0.5 shrink-0" style={{ color: t.hexMain }} />
                      <span className={`${t.textLight} text-sm font-medium`}>{feature}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-3">
                    <Icons.Check size={18} className="mt-0.5 shrink-0" style={{ color: t.hexMain }} />
                    <span className={`${t.textLight} text-sm font-medium`}>Acceso completo a la plataforma</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ✅ NUEVO: Footer SaaS Estructurado (Producto, Recursos, Legal)
const PlatformFooter = ({ t, clientName }: { t: ThemeStyle; clientName: string }) => (
  <footer className={`${t.bgBase} border-t ${t.borderSoft} pt-20 pb-10 px-6 transition-colors duration-700`}>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-1">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${t.bgMain} ${t.buttonText} mb-6 shadow-lg`}>
          <Icons.Box size={24} />
        </div>
        <h4 className={`text-xl font-black ${t.text} mb-4 tracking-tight`}>{clientName}</h4>
        <p className={`${t.textLight} text-sm font-medium leading-relaxed`}>
          Construyendo el futuro del software escalable. Herramientas diseñadas para equipos de alto rendimiento.
        </p>
      </div>
      <div>
        <h5 className={`font-bold ${t.text} mb-6 uppercase tracking-widest text-xs opacity-80`}>Producto</h5>
        <ul className={`space-y-4 text-sm font-medium ${t.textLight}`}>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Características</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Integraciones</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Precios</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Changelog</a></li>
        </ul>
      </div>
      <div>
        <h5 className={`font-bold ${t.text} mb-6 uppercase tracking-widest text-xs opacity-80`}>Recursos</h5>
        <ul className={`space-y-4 text-sm font-medium ${t.textLight}`}>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Documentación</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Blog</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Comunidad</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Centro de Ayuda</a></li>
        </ul>
      </div>
      <div>
        <h5 className={`font-bold ${t.text} mb-6 uppercase tracking-widest text-xs opacity-80`}>Legal</h5>
        <ul className={`space-y-4 text-sm font-medium ${t.textLight}`}>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Privacidad</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Términos de Servicio</a></li>
          <li><a href="#" className={`hover:${t.text} transition-colors`}>Seguridad SOC2</a></li>
          {/* ✅ FIX: SVGs nativos para redes sociales (evita el crasheo de lucide-react) */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-dashed border-gray-500/20">
             <a href="#" aria-label="Twitter" className={`hover:${t.text} transition-colors`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
               </svg>
             </a>
             <a href="#" aria-label="LinkedIn" className={`hover:${t.text} transition-colors`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                 <rect x="2" y="9" width="4" height="12"></rect>
                 <circle cx="4" cy="4" r="2"></circle>
               </svg>
             </a>
             <a href="#" aria-label="GitHub" className={`hover:${t.text} transition-colors`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                 <path d="M12 18v-4"></path>
                 <path d="M5 20l-3-1"></path>
               </svg>
             </a>
          </div>
        </ul>
      </div>
    </div>
    <div className={`max-w-6xl mx-auto pt-8 border-t ${t.borderSoft} flex flex-col md:flex-row justify-between items-center gap-4 text-sm ${t.textLight} font-medium`}>
      <p>© {new Date().getFullYear()} {clientName}. Todos los derechos reservados.</p>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        Todos los sistemas operacionales
      </div>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Orquestador)
// ---------------------------------------------------------------------------
export default function PlatformTemplate({ data }: PlatformTemplateProps) {
  // ✅ ESTADO DEL TEMA
  const [activeThemeId, setActiveThemeId] = useState<string>('light');
  const t = THEMES[activeThemeId];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { hero, features, integrations, pricing, clientName } = data;

  // Fallbacks Inteligentes (Para asegurar que la UI siempre se vea completa)
  const safeIntegrations: IntegrationLogo[] = integrations || [
    { id: '1', name: 'Slack', iconName: 'Slack' },
    { id: '2', name: 'Github', iconName: 'Github' },
    { id: '3', name: 'Figma', iconName: 'Figma' },
    { id: '4', name: 'Trello', iconName: 'Trello' },
    { id: '5', name: 'Database', iconName: 'Database' }
  ];

  const safeFeatures: Feature[] = (features && features.length >= 4) ? features : [
    { id: 'f1', title: 'Analíticas en Tiempo Real', description: 'Visualizá tus métricas clave con dashboards interactivos y reportes exportables.', iconName: 'BarChart3' },
    { id: 'f2', title: 'Automatización Inteligente', description: 'Creá flujos de trabajo personalizados sin escribir una sola línea de código.', iconName: 'Workflow' },
    { id: 'f3', title: 'Seguridad Enterprise', description: 'Encriptación de extremo a extremo, cumplimiento SOC2 y control de accesos SSO.', iconName: 'ShieldCheck' },
    { id: 'f4', title: 'Colaboración Global', description: 'Trabajá en equipo de forma asíncrona con roles, permisos y comentarios en vivo.', iconName: 'Users' }
  ];

  const safePricing: PricingTier[] = pricing || [
    { id: 'p1', name: 'Starter', description: 'Para equipos pequeños dando sus primeros pasos.', monthlyPrice: '29', annualPrice: '24', ctaText: 'Comenzar Gratis', features: ['Hasta 3 usuarios', 'Analíticas básicas', 'Soporte por email'] },
    { id: 'p2', name: 'Pro', description: 'Para agencias y equipos en crecimiento acelerado.', monthlyPrice: '79', annualPrice: '64', ctaText: 'Prueba Gratuita', isPopular: true, features: ['Usuarios ilimitados', 'Analíticas avanzadas', 'Integraciones premium', 'Soporte prioritario 24/7'] },
    { id: 'p3', name: 'Enterprise', description: 'Seguridad y control para grandes corporaciones.', monthlyPrice: '199', annualPrice: '169', ctaText: 'Contactar Ventas', features: ['Todo lo del plan Pro', 'SSO & SAML', 'SLA garantizado del 99.9%', 'Account Manager dedicado'] }
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#fafafa]" />;

  return (
    <div className={`min-h-screen ${t.bgBase} ${t.selection} font-sans overflow-hidden transition-colors duration-700`}>
      <main>
        <HeroParallax hero={hero} t={t} />
        <InfiniteMarquee integrations={safeIntegrations} t={t} />
        <BentoFeatures features={safeFeatures} t={t} />
        <PricingToggle pricing={safePricing} t={t} />
      </main>

      <PlatformFooter t={t} clientName={clientName || 'SaaS Platform'} />

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