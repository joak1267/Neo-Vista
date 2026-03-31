// Archivo: components/ui/Logo.tsx
'use client';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  isFooter?: boolean; 
}

export const Logo = ({ className = "", isFooter = false }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center relative group ${className}`}>
      
      {/* ✅ LÓGICA: La luz de fondo (Glow) SOLO aparece si NO es el footer */}
      {!isFooter && (
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 blur-2xl transition-all duration-500 rounded-full pointer-events-none" />
      )}
      
      <Image 
        src="/logo-neovista-premium.webp" 
        alt="Neovista"
        width={400} 
        height={100}
        // ✅ LÓGICA: Los efectos de hover intensos se aplican solo si isFooter es false
        className={`
          relative z-10 object-contain transition-all duration-300 ease-in-out
          ${!isFooter 
            ? 'group-hover:opacity-100 group-hover:drop-shadow-[0_0_25px_rgba(16,185,129,0.9)] group-hover:scale-105 opacity-90 w-40 md:w-48' 
            : 'w-32 md:w-40 opacity-70 group-hover:opacity-100' // En footer es más chico y sin brillo
          }
        `}
        priority={!isFooter} 
      />
    </div>
  );
};