// Archivo: components/home/ProjectQuiz.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, 
  Rocket, Users, Link as LinkIcon, User, 
  Layers, Cpu, ShoppingCart, Timer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const landingTemplates = [
  { 
    id: 'SaaS', 
    title: 'SaaS Corporativo', 
    icon: Cpu, 
    desc: 'Sistema de ventas completo para software complejo. Incluye cotización interactiva y FAQ.' 
  },
  { 
    id: 'Personal', 
    title: 'Portafolio Profesional', 
    icon: User, 
    desc: 'Tu CV llevado al siguiente nivel. Muestra tu stack tecnológico, experiencia y proyectos.' 
  },
  { 
    id: 'Agency', 
    title: 'Agencia Creativa', 
    icon: Rocket, 
    desc: 'Diseño magnético de alto impacto. Ideal para vender servicios premium y demostrar autoridad.' 
  },
  { 
    id: 'Lead', 
    title: 'Captura de Leads', 
    icon: Users, 
    desc: 'Página hiper-optimizada para conversiones rápidas. Perfecta para regalar E-books o recursos.' 
  },
  { 
    id: 'Sales', 
    title: 'Página de Ventas (VSL)', 
    icon: ShoppingCart, 
    desc: 'Estructura persuasiva para cursos o mentorías High-Ticket. Incluye anclaje de precios.' 
  },
  { 
    id: 'LinkBio', 
    title: 'Link in Bio', 
    icon: LinkIcon, 
    desc: 'Centraliza tus redes sociales. Diseño Mobile-First con captura de emails integrada.' 
  },
  { 
    id: 'Waitlist', 
    title: 'Lista de Espera', 
    icon: Timer, 
    desc: 'Genera máxima expectativa y urgencia (FOMO) con contadores en vivo antes de tu lanzamiento.' 
  },
  { 
    id: 'Platform', 
    title: 'Plataforma Software', 
    icon: Layers, 
    desc: 'Muestra tu web en acción con mockups interactivos, integraciones y precios claros.' 
  }
];
const colorStyles = [
  { id: 'Corporativo', title: 'Corporativo', dots: ['bg-blue-600', 'bg-slate-400', 'bg-slate-800'] },
  { id: 'Moderno', title: 'Moderno', dots: ['bg-purple-500', 'bg-pink-500', 'bg-orange-400'] },
  { id: 'Minimalista', title: 'Minimalista', dots: ['bg-white', 'bg-slate-200', 'bg-slate-900'] },
];

const ProjectQuiz = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(''); 
  const [budget, setBudget] = useState('');

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const phone = "541125047228";
    const text = `🚀 *Nuevo Proyecto Neovista*\n\n` +
                 `📐 *Arquitectura:* ${selectedTemplate}\n` +
                 `🎨 *Estilo Visual:* ${selectedStyle}\n` +
                 `💰 *Presupuesto:* ${budget}\n\n` +
                 `_Enviado desde el Quiz de Neovista._`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    // ✅ MEJORA UI: Scroll invisible. Se puede scrollear pero no hay barra visual.
    <div className="w-full max-w-3xl mx-auto p-6 md:p-10 bg-slate-950 border border-white/5 rounded-3xl shadow-2xl 
                    max-h-[85vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Progreso */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-accent' : 'bg-white/10'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* --- PASO 1: LANDING FACTORY SELECTION --- */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">¿Qué arquitectura buscamos?</h2>
            <p className="text-slate-400 mb-8 font-light">Seleccioná la estructura que mejor se adapte a tu objetivo.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {landingTemplates.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTemplate(item.id)}
                  className={`flex flex-col p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                    selectedTemplate === item.id 
                    ? 'border-accent bg-accent/10' 
                    : 'border-white/5 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <item.icon size={20} className={selectedTemplate === item.id ? 'text-accent' : 'text-slate-500'} />
                  <h3 className="text-white font-bold mt-3 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  {selectedTemplate === item.id && <CheckCircle2 className="absolute top-4 right-4 text-accent" size={16} />}
                </button>
              ))}
            </div>
            <Button onClick={handleNext} disabled={!selectedTemplate} className="w-full h-14 text-lg">
              Continuar <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        )}

        {/* --- PASO 2: ESTILO VISUAL --- */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">Estética y ADN</h2>
            <p className="text-slate-400 mb-8 font-light">¿Qué vibras debe transmitir la marca?</p>
            
            <div className="space-y-4 mb-8">
              {colorStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${
                    selectedStyle === style.id ? 'border-accent bg-accent/5' : 'border-white/5 bg-white/[0.03]'
                  }`}
                >
                  <span className="text-white font-bold text-lg">{style.title}</span>
                  <div className="flex -space-x-2">
                    {style.dots.map((dot, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-950 ${dot}`} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={handlePrev} className="h-14 px-8 border-white/10">Volver</Button>
              <Button onClick={handleNext} disabled={!selectedStyle} className="flex-1 h-14 text-lg">Siguiente</Button>
            </div>
          </motion.div>
        )}

        {/* --- PASO 3: PRESUPUESTO --- */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">Inversión Estimada</h2>
            <p className="text-slate-400 mb-8 font-light">Ayúdanos a dimensionar el alcance del proyecto.</p>
            
            <div className="grid grid-cols-1 gap-3 mb-8">
              {['$500 - $1.000', '$1.000 - $2.500', '$2.500+ (High-end)'].map((range) => (
                <button
                  key={range}
                  onClick={() => setBudget(range)}
                  className={`p-5 rounded-2xl border text-center font-bold transition-all ${
                    budget === range ? 'border-accent bg-accent text-slate-950' : 'border-white/10 bg-white/[0.03] text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={handlePrev} className="h-14 px-8 border-white/10">Volver</Button>
              <Button onClick={handleSubmit} disabled={!budget} className="flex-1 h-14 text-lg bg-accent text-slate-950 font-black">
                Finalizar y Enviar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectQuiz;