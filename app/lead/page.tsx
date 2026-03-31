import { Metadata } from 'next';
import LeadTemplate from '@/components/templates/LeadTemplate';
import { LandingData } from '@/types/landing';

export const metadata: Metadata = {
  title: 'Descargá nuestro Ebook',
  description: 'Aprende los secretos de la industria con nuestro material exclusivo gratuito.',
};

export default function LeadPage() {
  // ✅ FIX PROFESIONAL: Código completo y tipado estricto
  const leadData: LandingData = {
    id: 'lead-static-01', // ✅ NUEVO: ID obligatorio
    clientName: 'Campaña Captación 2024',
    template: 'lead',
    theme: { 
      primary: '#f97316',
      secondary: '#ea580c' 
    },
    hero: {
      headline: 'Dominá el desarrollo web en 30 días',
      subheadline: 'Descargá nuestra guía definitiva paso a paso y empezá a crear aplicaciones modernas hoy mismo.',
      ctaText: 'Descargar Guía Gratuita',
      image: '/placeholder-lead.jpg'
    },
    features: [
      { id: '1', iconName: 'Download', title: 'Descarga Inmediata', description: 'Recibí el PDF directamente en tu bandeja de entrada.' },
      { id: '2', iconName: 'BookOpen', title: 'Contenido Exclusivo', description: 'Más de 50 páginas de material práctico y código real.' },
      { id: '3', iconName: 'Unlock', title: 'Acceso de por Vida', description: 'Guardalo y consultalo todas las veces que necesites.' },
    ],
  };

  return (
    <main>
      <LeadTemplate data={leadData} />
    </main>
  );
}