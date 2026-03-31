'use client';
import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

export default function Showcase() {
  return (
    <section id="showcase" className="py-32 bg-slate-900/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent font-bold mb-4">
              Nuestra Factoría
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
              Sistemas de Diseño Dinámicos
            </h2>
          </div>
          <p className="text-slate-400 font-body text-lg max-w-sm">
            Estructuras modulares listas para escalar tu presencia en tiempo récord.
          </p>
        </div>

        {/* Grilla de Demos Personalizada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. SAAS AVANZADO */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link href="/saas-techflow" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">SaaS Corporativo</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Sistema de ventas completo para software complejo. Incluye cotización interactiva paso a paso y FAQ.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 2. PORTAFOLIO PERSONAL */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/personal-jdoe" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Portafolio Profesional</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Tu CV llevado al siguiente nivel. Muestra tu stack tecnológico, experiencia y proyectos destacados.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 3. AGENCIA CREATIVA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link href="/agency-creative" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Agencia Creativa</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Diseño magnético de alto impacto. Ideal para vender servicios premium y demostrar autoridad visual.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 4. CAPTURA DE LEADS */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <Link href="/lead-ebook" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Captura de Leads</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Página hiper-optimizada para conversiones rápidas. Perfecta para regalar E-books o recursos gratuitos.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 5. PÁGINA DE VENTAS (VSL) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <Link href="/sales-masterclass" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Página de Ventas (VSL)</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Estructura persuasiva para cursos o mentorías High-Ticket. Incluye anclaje de precios y testimonios.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 6. LINK IN BIO */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <Link href="/linkbio-juan" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Link in Bio</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Centraliza tus redes sociales en un solo lugar. Diseño Mobile-First con captura de emails integrada.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 7. WAITLIST */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
            <Link href="/waitlist-x" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Lista de Espera</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Genera máxima expectativa y urgencia (FOMO) con contadores en vivo antes de tu próximo lanzamiento.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

          {/* 8. PLATFORM */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
            <Link href="/platform-nexus" className="group block bg-white/[0.03] border border-white/5 rounded-2xl p-10 hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <LayoutTemplate className="text-accent" size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">Plataforma Software</h3>
              <p className="text-slate-400 font-body text-sm mb-8 leading-relaxed">
                Muestra tu aplicación web en acción. Destaca con mockups interactivos, integraciones y precios claros.
              </p>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Ver Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}