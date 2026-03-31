'use client';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo"; // ✅ NUEVO: Importamos el logo

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Showcase", href: "#showcase" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* ✅ MEJORA UI: Reemplazamos texto plano por el nuevo Logo 2.0 */}
        <button onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo />
        </button>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-body text-sm font-medium text-slate-400 hover:text-accent transition-all duration-300 relative group"
            >
              {l.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <button className="md:hidden text-foreground p-2 bg-white/5 rounded-lg" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú Mobile */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 px-6 py-8 space-y-6">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block font-body text-lg text-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;