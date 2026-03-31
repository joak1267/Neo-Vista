'use client';

import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 font-body relative overflow-hidden selection:bg-accent/30 selection:text-white">
      
      {/* Brillo ambiental sutil en el fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-accent transition-colors mb-16 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Volver al inicio
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Scale className="text-accent" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white font-display tracking-tight">Términos y Condiciones</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-12 border-b border-white/10 pb-12">
            Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-12 text-lg font-light leading-relaxed text-slate-400"
        >
          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">01</span> Acuerdo de Servicio
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">Al interactuar con Neovista, contratar nuestros servicios o explorar nuestras arquitecturas de diseño, aceptas estos términos como un contrato vinculante. Si no estás de acuerdo con la excelencia y normativas que exigimos, te pedimos que no utilices la plataforma.</p>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">02</span> Propiedad Intelectual
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">El código, las animaciones fluidas, los motores de temas y la estructura visual de nuestras "Arquitecturas" (SaaS, Agency, Personal, etc.) son activos digitales exclusivos de Neovista.</p>
            <ul className="list-disc pl-6 space-y-3 group-hover:text-slate-300 transition-colors duration-300">
              <li>Puedes inspirarte en nuestras demos.</li>
              <li>Está estrictamente prohibida la clonación comercial de nuestros motores de código sin una licencia de agencia explícita.</li>
              <li>Los activos entregados en proyectos de clientes finales pasan a ser propiedad del cliente según el contrato firmado.</li>
            </ul>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">03</span> Limitación de Responsabilidad
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">Nuestros productos digitales están diseñados para el máximo rendimiento, pero Neovista no se hará responsable de caídas de servidores de terceros (como Vercel o AWS), ni de lucro cesante derivado de la mala configuración por parte del usuario final en sus propios entornos de despliegue.</p>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">04</span> Modificaciones
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">La web evoluciona rápido y nosotros también. Nos reservamos el derecho de actualizar, mutar o cambiar estas condiciones de servicio sin previo aviso, manteniendo siempre la fecha de última actualización en la cabecera de este documento.</p>
          </section>

          <section className="mt-16 pt-12 border-t border-white/10">
            <p className="text-base text-slate-500">¿Asuntos legales o licencias comerciales? <br/> 
              <a href="mailto:xo.alt999@proton.me" className="text-accent font-bold hover:text-white transition-colors mt-2 inline-block">xo.alt999@proton.me</a>
            </p>
          </section>
        </motion.div>

      </div>
    </main>
  );
}