// Archivo: components/templates/SalesPageTemplate.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LandingData } from '@/types/landing';

// ---------------------------------------------------------------------------
// ✅ 1. MOTOR DE TEMAS EN VIVO (Optimizado para Ventas / Conversión)
// ---------------------------------------------------------------------------
export type ThemeStyle = {
  id: string; name: string; desc: string; dots: string[];
  bgBase: string; bgCard: string; bgCardAlpha: string;
  text: string; textLight: string; buttonText: string;
  bgMain: string; hoverMain: string; bgSoft: string;
  borderSoft: string; borderHard: string; borderGlow: string;
  shadowMedium: string; selection: string; accent: string;
};

const THEMES: Record<string, ThemeStyle> = {
  urgency: {
    id: 'urgency', name: 'Direct Response', desc: 'Oscuro con rojo. Alta urgencia.', dots: ['bg-red-600', 'bg-slate-900'],
    bgBase: 'bg-[#050505]', bgCard: 'bg-[#111111]', bgCardAlpha: 'bg-[#111111]/90',
    text: 'text-white', textLight: 'text-gray-400', buttonText: 'text-white',
    bgMain: 'bg-red-600', hoverMain: 'hover:bg-red-700', bgSoft: 'bg-red-500/10',
    borderSoft: 'border-white/5', borderHard: 'border-red-500/30', borderGlow: 'border-red-500/50',
    shadowMedium: 'shadow-[0_0_40px_rgba(220,38,38,0.2)]',
    selection: 'selection:bg-red-500/30 selection:text-white',
    accent: '#dc2626'
  },
  highticket: {
    id: 'highticket', name: 'High Ticket', desc: 'Negro y oro. Exclusividad.', dots: ['bg-amber-500', 'bg-black'],
    bgBase: 'bg-[#000000]', bgCard: 'bg-[#0a0a0a]', bgCardAlpha: 'bg-[#0a0a0a]/90',
    text: 'text-white', textLight: 'text-amber-100/50', buttonText: 'text-black',
    bgMain: 'bg-amber-500', hoverMain: 'hover:bg-amber-400', bgSoft: 'bg-amber-500/10',
    borderSoft: 'border-white/5', borderHard: 'border-amber-500/30', borderGlow: 'border-amber-500/50',
    shadowMedium: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    selection: 'selection:bg-amber-500/30 selection:text-amber-200',
    accent: '#f59e0b'
  },
  trust: {
    id: 'trust', name: 'Corporate Trust', desc: 'Claro y azul. Confianza B2B.', dots: ['bg-blue-600', 'bg-slate-50'],
    bgBase: 'bg-slate-50', bgCard: 'bg-white', bgCardAlpha: 'bg-white/90',
    text: 'text-slate-900', textLight: 'text-slate-600', buttonText: 'text-white',
    bgMain: 'bg-blue-600', hoverMain: 'hover:bg-blue-700', bgSoft: 'bg-blue-50',
    borderSoft: 'border-slate-200', borderHard: 'border-blue-300', borderGlow: 'border-blue-400/50',
    shadowMedium: 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]',
    selection: 'selection:bg-blue-600/20 selection:text-blue-900',
    accent: '#2563eb'
  }
};

// ---------------------------------------------------------------------------
// INTERFACES ESTRICTAS LOCALES
// ---------------------------------------------------------------------------
export interface Testimonial {
  id: string; name: string; role: string; content: string; rating: number; avatarUrl?: string;
}

export interface PriceAnchoring {
  realValue: string; todayPrice: string; discountText: string; currency?: string;
}

export interface GuaranteeData {
  title: string; description: string; badgeText: string;
}

export interface ExtendedSalesData extends Omit<LandingData, 'theme'> {
  testimonials?: Testimonial[];
  priceAnchoring?: PriceAnchoring;
  guarantee?: GuaranteeData;
}

interface SalesPageTemplateProps {
  data: ExtendedSalesData;
}

// ---------------------------------------------------------------------------
// SAFE ICON RENDERER
// ---------------------------------------------------------------------------
const SafeIcon = ({ name, size = 24, className, color }: { name: string, size?: number, className?: string, color?: string }) => {
  const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.CheckCircle;
  return <IconComponent size={size} className={className} color={color} strokeWidth={2} />;
};

// ---------------------------------------------------------------------------
// VARIANTES DE ANIMACIÓN
// ---------------------------------------------------------------------------
const fadeUpOnce: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// ---------------------------------------------------------------------------
// SUB-COMPONENTES DE SECCIÓN (Integrados con Theme Engine)
// ---------------------------------------------------------------------------

// ✅ CAMBIO: Adaptación dinámica de colores en el Hero
const VSLHero = ({ hero, t }: { hero: LandingData['hero']; t: ThemeStyle }) => (
  <section id="inicio" className={`pt-24 pb-16 px-4 flex flex-col items-center text-center ${t.bgBase} ${t.text} transition-colors duration-700`}>
    <motion.div initial="hidden" animate="visible" variants={fadeUpOnce} className="max-w-4xl mx-auto relative z-10">
      
      <div className={`inline-block px-5 py-1.5 mb-6 border ${t.borderHard} ${t.bgSoft} ${t.text} rounded-full text-sm font-bold uppercase tracking-widest animate-pulse shadow-sm`}>
        Atención: Oferta por tiempo limitado
      </div>
      
      <h1 className={`text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-8 ${t.text} transition-colors duration-700`}>
        {hero.headline}
      </h1>
      
      <p className={`text-xl md:text-2xl ${t.textLight} font-medium mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-700`}>
        {hero.subheadline}
      </p>

      {/* VSL Section - Contenedor de video con Glow dinámico */}
      <div className={`relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden ${t.shadowMedium} border ${t.borderSoft} ${t.bgCard} flex items-center justify-center group cursor-pointer transition-all duration-700`}>
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${t.accent}, transparent 70%)` }}
        />
        <div className={`relative z-10 w-20 h-20 rounded-full ${t.bgMain} ${t.buttonText} shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20`}>
          <Icons.Play className="w-8 h-8 ml-2" fill="currentColor" />
        </div>
        <div className={`absolute bottom-4 left-4 right-4 flex justify-between text-xs font-bold ${t.textLight} tracking-widest uppercase`}>
          <span>Video Revelación</span>
          <span>Click para reproducir</span>
        </div>
      </div>

    </motion.div>
  </section>
);

// ✅ CAMBIO: Social Proof convertido en Carrusel Infinito Automático (Marquee)
const SocialProofWall = ({ testimonials, t }: { testimonials: Testimonial[]; t: ThemeStyle }) => {
  if (!testimonials || testimonials.length === 0) return null;

  // Duplicamos el array para lograr el efecto infinito sin cortes
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonios" className={`py-32 ${t.bgBase} border-t ${t.borderSoft} transition-colors duration-700 relative overflow-hidden`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
      
      <div className="w-full relative z-10">
        
        {/* Cabecera y Título */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpOnce} className="text-center mb-16 px-4">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${t.bgSoft} border ${t.borderSoft} text-sm font-bold uppercase tracking-widest mb-6`} style={{ color: t.accent }}>
            <Icons.Star size={16} fill="currentColor" /> Casos de Éxito
          </div>
          <h2 className={`text-4xl md:text-6xl font-black ${t.text} tracking-tighter mb-6 transition-colors duration-700`}>
            Resultados <span style={{ color: t.accent }}>Reales</span>
          </h2>
          <p className={`${t.textLight} text-xl md:text-2xl max-w-2xl mx-auto font-light transition-colors duration-700`}>
            Más de 2,000 alumnos ya transformaron su vida aplicando nuestro método exacto.
          </p>
        </motion.div>

        {/* ✅ CONTENEDOR DEL CARRUSEL INFINITO */}
        <div className="relative flex overflow-hidden w-full group">
          
          {/* Sombras difuminadas en los bordes para transición suave */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-${t.bgBase.replace('bg-', '')} to-transparent z-20 pointer-events-none`} />
          <div className={`absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-${t.bgBase.replace('bg-', '')} to-transparent z-20 pointer-events-none`} />

          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }} // Se mueve exactamente la mitad (por eso duplicamos los datos)
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 45, // 👈 Si querés que vaya más rápido, bajá este número. Si querés más lento, subilo.
            }}
          >
            {duplicatedTestimonials.map((testimonio, i) => (
              <div 
                key={`${testimonio.id}-${i}`}
                // Las tarjetas tienen un ancho fijo y no se achican (shrink-0)
                className={`shrink-0 w-[85vw] sm:w-[400px] lg:w-[420px] relative ${t.bgCard} p-10 rounded-[2.5rem] border ${t.borderSoft} hover:${t.borderHard} ${t.shadowMedium} hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col`}
              >
                <Icons.Quote className={`absolute top-6 right-6 w-20 h-20 ${t.textLight} opacity-5 group-hover:opacity-10 transition-opacity duration-500 -rotate-12`} />
                
                <div className="flex gap-1.5 mb-8 relative z-10">
                  {[...Array(testimonio.rating || 5)].map((_, idx) => (
                    <Icons.Star key={idx} className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" />
                  ))}
                </div>
                
                <p className={`${t.text} text-lg md:text-xl font-medium mb-10 leading-relaxed relative z-10 flex-grow transition-colors duration-700 whitespace-normal`}>
                  "{testimonio.content}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-dashed border-white/10 relative z-10">
                  <div className={`w-14 h-14 rounded-full ${t.bgSoft} flex items-center justify-center overflow-hidden border-2 ${t.borderSoft} transition-colors duration-500 shrink-0`}>
                    {testimonio.avatarUrl ? (
                       <img src={testimonio.avatarUrl} alt={testimonio.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <Icons.User className={t.textLight} size={24} />
                    )}
                  </div>
                  <div className="whitespace-normal">
                    <h4 className={`font-bold text-lg ${t.text} flex items-center gap-2 transition-colors duration-700`}>
                      {testimonio.name}
                      <Icons.BadgeCheck size={18} className="text-blue-500 shrink-0" />
                    </h4>
                    <p className={`text-sm font-bold ${t.textLight} uppercase tracking-wider transition-colors duration-700`}>{testimonio.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};


// ✅ CAMBIO: Pricing Section refinada, más compacta, elegante y menos "gigante"
const PricingSection = ({ data, t, ctaText }: { data: PriceAnchoring; t: ThemeStyle; ctaText: string }) => (
  <section id="oferta" className={`py-20 ${t.bgBase} border-t ${t.borderSoft} relative overflow-hidden transition-colors duration-700`}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-15" style={{ backgroundColor: t.accent }} />

    {/* ✅ Redujimos de max-w-4xl a max-w-2xl para que la tarjeta no sea tan ancha y luzca más premium */}
    <div className="max-w-2xl mx-auto px-4 relative z-10">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpOnce}
        // ✅ Redujimos el padding y suavizamos el borde curvo
        className={`${t.bgCard} border ${t.borderHard} rounded-[2.5rem] p-8 md:p-12 text-center ${t.shadowMedium} relative overflow-hidden transition-all duration-700`}
      >
        {/* Etiqueta superior más delicada */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 px-6 py-2 rounded-b-xl font-black text-xs tracking-widest uppercase shadow-lg ${t.bgMain} ${t.buttonText}`}>
          Oferta Especial Limitada
        </div>

        {/* Título más proporcionado */}
        <h2 className={`text-3xl md:text-4xl font-black ${t.text} mt-6 mb-8 tracking-tighter transition-colors duration-700`}>Tu Inversión Hoy</h2>
        
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-red-500 text-lg md:text-xl font-black uppercase tracking-widest line-through mb-1 decoration-red-500/50 decoration-[2px]">
            Valor Real: {data.currency || '$'}{data.realValue}
          </p>
          <div className="flex items-center justify-center gap-4 my-1">
            {/* ✅ Precio bajado de 8rem a 5.5rem. Sigue siendo impactante pero no ocupa media pantalla */}
            <span className={`text-6xl md:text-[5.5rem] font-black tracking-tighter leading-none ${t.text} transition-colors duration-700`}>
              {data.currency || '$'}{data.todayPrice}
            </span>
          </div>
          <div className={`mt-5 font-bold px-5 py-2.5 rounded-full text-sm ${t.bgSoft} border ${t.borderSoft} inline-flex items-center gap-2`} style={{ color: t.accent }}>
            <Icons.Tag size={16} /> {data.discountText}
          </div>
        </div>

        {/* Lista de beneficios ajustada para ser más fina y legible */}
        <div className="max-w-sm mx-auto text-left mb-10 space-y-3">
          {[
            'Acceso inmediato y de por vida', 
            'Todas las actualizaciones futuras GRATIS', 
            'Soporte prioritario y comunidad privada', 
            'Garantía incondicional de satisfacción'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${t.bgSoft}`} style={{ color: t.accent }}>
                <Icons.Check size={12} strokeWidth={3} />
              </div>
              <span className={`${t.text} font-medium md:text-base`}>{item}</span>
            </div>
          ))}
        </div>

        {/* ✅ Botón de compra más armónico (menor padding vertical y texto más equilibrado) */}
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className={`group relative w-full py-5 rounded-2xl ${t.buttonText} ${t.bgMain} ${t.hoverMain} font-black text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300`}
        >
          <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {ctaText} <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
        
        {/* Sellos de confianza más discretos */}
        <div className={`mt-8 pt-6 border-t border-dashed border-white/10 text-xs md:text-sm font-medium flex flex-wrap items-center justify-center gap-3 md:gap-6 ${t.textLight} transition-colors duration-700`}>
          <span className="flex items-center gap-1.5"><Icons.ShieldCheck size={16} className="text-green-500" /> Compra Segura</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="flex items-center gap-1.5"><Icons.Lock size={16} className="text-green-500" /> Encriptación 256-bit</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="flex items-center gap-1.5"><Icons.RotateCcw size={16} className="text-green-500" /> Devolución Garantizada</span>
        </div>
      </motion.div>
    </div>
  </section>
);
// ✅ CAMBIO: Guarantee Section adaptada
const GuaranteeSection = ({ guarantee, t }: { guarantee: GuaranteeData; t: ThemeStyle }) => (
  <section id="garantia" className={`py-24 ${t.bgBase} border-t ${t.borderSoft} transition-colors duration-700`}>
    <div className="max-w-3xl mx-auto px-4 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpOnce} className="flex flex-col items-center">
        
        <div className={`w-24 h-24 mb-8 flex items-center justify-center rounded-full ${t.bgSoft} border ${t.borderSoft} text-green-500 shadow-inner`}>
          <Icons.ShieldCheck size={48} />
        </div>
        <h2 className={`text-3xl md:text-5xl font-black ${t.text} tracking-tighter mb-6 transition-colors duration-700`}>{guarantee.title}</h2>
        <p className={`text-xl ${t.textLight} leading-relaxed mb-8 transition-colors duration-700`}>{guarantee.description}</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/20">
          <Icons.CheckCircle2 size={20} />
          {guarantee.badgeText}
        </div>

      </motion.div>
    </div>
  </section>
);

// ✅ NUEVO: Footer exclusivo para Sales Pages (Compliance & Legal)
const SalesFooter = ({ t }: { t: ThemeStyle }) => (
  <footer className={`${t.bgBase} border-t ${t.borderSoft} py-12 px-6 transition-colors duration-700 text-center`}>
    <div className="max-w-4xl mx-auto">
      <div className={`flex flex-wrap justify-center gap-6 mb-8 text-sm font-bold ${t.textLight}`}>
        <a href="#" className={`hover:${t.text} transition-colors`}>Términos y Condiciones</a>
        <a href="#" className={`hover:${t.text} transition-colors`}>Política de Privacidad</a>
        <a href="#" className={`hover:${t.text} transition-colors`}>Descargo de Responsabilidad</a>
        <a href="#" className={`hover:${t.text} transition-colors`}>Soporte</a>
      </div>
      
      <p className={`text-xs ${t.textLight} leading-relaxed opacity-70 mb-6`}>
        DESCARGO DE RESPONSABILIDAD: Los resultados expuestos en esta página son testimonios reales de nuestros clientes, 
        pero no son garantía de que obtengas los mismos resultados. El éxito de cada persona depende de su dedicación, 
        esfuerzo y contexto particular. Toda la información provista tiene fines educativos. <br/><br/>
        Este sitio no forma parte de Facebook Inc., Meta Inc., ni Google LLC. Tampoco está respaldado por ellos en ninguna forma. 
        FACEBOOK y GOOGLE son marcas registradas.
      </p>
      
      <p className={`text-sm font-medium ${t.textLight}`}>
        © {new Date().getFullYear()} Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Orquestador)
// ---------------------------------------------------------------------------
export default function SalesPageTemplate({ data }: SalesPageTemplateProps) {
  // ✅ ESTADO DEL TEMA
  const [activeThemeId, setActiveThemeId] = useState<string>('urgency');
  const t = THEMES[activeThemeId];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { hero, testimonials, priceAnchoring, guarantee } = data;

  // ✅ CAMBIO: Ampliamos a 6 testimonios orientados a conversión para generar más impacto
 // ✅ CAMBIO CRÍTICO: Definimos los 6 testimonios por defecto
  const defaultTestimonials = [
    { 
      id: 't1', 
      name: 'Martín S.', 
      role: 'Emprendedor', 
      content: 'Recuperé la inversión el primer día. Literalmente un antes y un después en mi negocio. El método es a prueba de tontos.', 
      rating: 5 
    },
    { 
      id: 't2', 
      name: 'Laura G.', 
      role: 'Diseñadora', 
      content: 'No creía en estos programas, pero la cantidad de valor práctico que tiene me voló la cabeza. Ya no compito por precio.', 
      rating: 5 
    },
    { 
      id: 't3', 
      name: 'Carlos D.', 
      role: 'Agencia', 
      content: 'Aplicamos el módulo 3 y cerramos un cliente high-ticket esa misma semana. Pagó el programa 10 veces.', 
      rating: 5 
    },
    { 
      id: 't4', 
      name: 'Sofía M.', 
      role: 'Freelancer', 
      content: 'Pude duplicar mis precios en solo 2 semanas. El guión de ventas y las plantillas son oro puro. Altamente recomendado.', 
      rating: 5 
    },
    { 
      id: 't5', 
      name: 'Javier T.', 
      role: 'Consultor', 
      content: 'Había probado otras mentorías antes, pero esta es la única que me dio un paso a paso real, directo y sin relleno.', 
      rating: 5 
    },
    { 
      id: 't6', 
      name: 'Elena R.', 
      role: 'Creadora de Contenido', 
      content: 'La mejor decisión del año. Pasé de no saber cómo vender a tener la agenda llena por 3 meses enteros. Increíble.', 
      rating: 5 
    },
  ];

  // ✅ LÓGICA INTELIGENTE: Si la DB manda menos de 6, forzamos los nuestros.
  const safeTestimonials = (testimonials && testimonials.length >= 6) 
    ? testimonials 
    : defaultTestimonials;
  const safePrice = priceAnchoring || { realValue: '997', todayPrice: '97', discountText: 'Ahorrás un 90% solo por hoy' };
  const safeGuarantee = guarantee || { 
    title: 'Garantía Incondicional de 14 Días', 
    description: 'Entrá, consumí todo el material, descargá los recursos. Si sentís que no vale 10 veces lo que pagaste, mandame un email y te devuelvo hasta el último centavo sin hacerte preguntas.',
    badgeText: 'Riesgo 0% para vos'
  };

  if (!isMounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className={`relative min-h-screen ${t.bgBase} ${t.selection} font-sans transition-colors duration-700`}>
      <main>
        <VSLHero hero={hero} t={t} />
        <SocialProofWall testimonials={safeTestimonials} t={t} />
        <PricingSection data={safePrice} t={t} ctaText={hero.ctaText} />
        <GuaranteeSection guarantee={safeGuarantee} t={t} />
      </main>

      {/* ✅ FOOTER COMPLIANCE INTEGRADO */}
      <SalesFooter t={t} />

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