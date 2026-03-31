'use client';
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";

const PHONE_NUMBER = "+54 11 25047228";
const EMAIL = "xo.alt999@proton.me";

const Contact = () => {
  return (
    // ✅ MEJORA UI: Sección con fondo oscuro y gradiente invertido para fusionarse con el Footer
    <section id="contacto" className="py-32 relative bg-slate-900/30 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-accent font-bold mb-4">
            Hablemos
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
            Contacto
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tarjeta Email */}
          <motion.a
            href={`mailto:${EMAIL}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            // ✅ MEJORA UI: Hover premium con sombras, bordes esmeralda y escalado de contenido
            className="flex flex-col items-start gap-5 border border-white/5 rounded-2xl p-10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/40 transition-all duration-500 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-accent/30 group-hover:scale-110 transition-all duration-500">
              <Mail className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">Email</h3>
              <p className="font-body text-slate-400 group-hover:text-white transition-colors text-sm font-light">
                {EMAIL}
              </p>
            </div>
          </motion.a>

          {/* Tarjeta Teléfono */}
          <motion.a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start gap-5 border border-white/5 rounded-2xl p-10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/40 transition-all duration-500 group shadow-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-accent/30 group-hover:scale-110 transition-all duration-500">
              <Phone className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">Teléfono</h3>
              <p className="font-body text-slate-400 group-hover:text-white transition-colors text-sm font-light">
                {PHONE_NUMBER}
              </p>
            </div>
          </motion.a>

          {/* Tarjeta WhatsApp */}
          <motion.a
            href={`https://wa.me/541125047228?text=Hola! Me interesaba una página web`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start gap-5 border border-white/5 rounded-2xl p-10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/40 transition-all duration-500 group shadow-lg relative overflow-hidden"
          >
            {/* ✅ MEJORA UI: Un destello sutil de fondo exclusivo para WhatsApp (como CTA principal de contacto) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            
            <div className="w-14 h-14 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-accent/30 group-hover:scale-110 transition-all duration-500 relative z-10">
              <MessageCircle className="text-accent" size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="font-body text-slate-400 group-hover:text-white transition-colors text-sm font-light">
                Abrir chat directo
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;