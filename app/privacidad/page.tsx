'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              <ShieldCheck className="text-accent" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white font-display tracking-tight">Política de Privacidad</h1>
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
              <span className="text-accent text-sm font-black tracking-widest opacity-50">01</span> Información que recopilamos
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">En Neovista, recopilamos información personal que nos proporcionas directamente cuando te pones en contacto con nosotros, solicitas un presupuesto o te suscribes a nuestro newsletter. Esto puede incluir tu nombre, dirección de correo electrónico y detalles de tu proyecto.</p>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">02</span> Uso de la información
            </h2>
            <p className="mb-4">Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 space-y-3 group-hover:text-slate-300 transition-colors duration-300">
              <li>Proporcionar, operar y mantener nuestros servicios de agencia.</li>
              <li>Personalizar y expandir tu experiencia en nuestra web.</li>
              <li>Comprender y analizar el impacto de nuestros sistemas de diseño.</li>
              <li>Comunicarnos contigo para soporte, reuniones o actualizaciones del proyecto.</li>
            </ul>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">03</span> Tecnologías de Rastreo
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">Utilizamos cookies esenciales y tecnologías de seguimiento modernas para asegurar el rendimiento fluido de nuestras animaciones y guardar tus preferencias de temas visuales. Puedes configurar tu navegador para limitar este comportamiento si lo deseas.</p>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-white mb-4 font-display flex items-center gap-3">
              <span className="text-accent text-sm font-black tracking-widest opacity-50">04</span> Seguridad
            </h2>
            <p className="mb-4 group-hover:text-slate-300 transition-colors duration-300">La integridad de tus datos es crítica. Aplicamos estándares de encriptación modernos y servidores de alta seguridad. Sin embargo, debes saber que ninguna transmisión por Internet es 100% infranqueable, aunque nos acercamos lo más posible a ello.</p>
          </section>

          <section className="mt-16 pt-12 border-t border-white/10">
            <p className="text-base text-slate-500">¿Dudas sobre nuestra privacidad? Hablemos: <br/> 
              <a href="mailto:xo.alt999@proton.me" className="text-accent font-bold hover:text-white transition-colors mt-2 inline-block">xo.alt999@proton.me</a>
            </p>
          </section>
        </motion.div>

      </div>
    </main>
  );
}