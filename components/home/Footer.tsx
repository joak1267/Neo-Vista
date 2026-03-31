// Archivo: components/home/Footer.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link'; 
import { Mail, Link as LinkIcon } from "lucide-react";
import type { TeamMember } from "@/types/data";
import teamData from "@/data/team.json";

const team: TeamMember[] = teamData as TeamMember[];
const EMAIL = "xo.alt999@proton.me";
const PORTFOLIO_URL = "https://portafolio-joa-tech.vercel.app/";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-24 bg-secondary/5 relative overflow-hidden">
      {/* Luz ambiental de fondo súper sutil (no interactiva) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          
          {/* Marca - Diseño Premium Estático */}
          <div className="md:col-span-1 py-4">
            {/* ✅ CORRECCIÓN: Quitamos el "group" y "hover:scale". El logo ya NO reacciona al mouse. */}
            <Link href="/" className="block mb-6 relative z-10">
              <Image 
                src="/logo-neovista-premium.webp" 
                alt="Neovista"
                width={160}
                height={40}
                // ✅ CORRECCIÓN: Lo dejamos un poco más opaco (80%) para que no compita visualmente
                className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                priority
              />
              {/* ✅ CORRECCIÓN: Eliminé el div que generaba la nube verde molesta */}
            </Link>
            
            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm ml-1">
              Elevando estándares en el desarrollo web. Tu presencia digital, al siguiente nivel.
            </p>
          </div>

          {/* Equipo Core */}
          <div className="md:col-span-1 pt-8 md:pt-4">
            <h4 className="font-body text-xs font-bold text-foreground uppercase tracking-[0.2em] mb-6 border-b border-border pb-2 inline-block">
              Equipo Core
            </h4>
            <ul className="space-y-4">
              {team.map((member) => (
                <li key={member.id} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-sm font-medium text-muted-foreground group-hover:border-accent transition-colors">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <a 
                      href={PORTFOLIO_URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-body text-sm font-medium text-foreground hover:text-accent transition-all duration-300 block w-fit"
                    >
                      {member.name}
                    </a>
                    <p className="font-body text-xs text-muted-foreground font-light">{member.role}</p>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors p-2 hover:bg-card rounded-full"
                    >
                      <LinkIcon size={16} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto rápido */}
          {/* ✅ CORRECCIÓN: Agregué flex-col e items-start para que el título y el mail se apilen verticalmente perfecto */}
          <div className="md:col-span-1 pt-8 md:pt-4 flex flex-col items-start">
            <h4 className="font-body text-xs font-bold text-foreground uppercase tracking-[0.2em] mb-6 border-b border-border pb-2 inline-block">
              Contacto
            </h4>
            <a
              href={`mailto:${EMAIL}`}
              // ✅ CORRECCIÓN: Usamos flex puro para la caja del mail
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors font-body text-sm group"
            >
              <div className="p-2 rounded-lg bg-card border border-border/50 group-hover:border-accent group-hover:bg-card transition-colors">
                <Mail size={16} className="text-accent group-hover:text-accent transition-colors" />
              </div>
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-body text-xs tracking-wide font-light">
            © {new Date().getFullYear()} Neovista. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-light">
          <Link href="/privacidad" className="cursor-pointer hover:text-white transition-colors">
            Privacidad
          </Link>
          <Link href="/terminos" className="cursor-pointer hover:text-white transition-colors">
            Términos
          </Link>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;