'use client';
import { motion } from "framer-motion";
import { Globe, Server, Sparkles } from "lucide-react";
import type { Service } from "@/types/data";
import servicesData from "@/data/services.json";

const iconMap: Record<string, typeof Globe> = { Globe, Server, Sparkles };
const services: Service[] = servicesData as Service[];

const Services = () => {
  return (
    <section id="servicios" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent font-bold mb-4">Especialidades</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">Lo que impulsamos</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                // ✅ MEJORA UI: Bordes redondeados generosos y sombra suave
                className="relative group p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 hover:border-accent/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                {Icon && (
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:border-accent/40 transition-colors">
                    <Icon className="text-accent" size={32} />
                  </div>
                )}
                <h3 className="font-display text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 font-body text-base leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;