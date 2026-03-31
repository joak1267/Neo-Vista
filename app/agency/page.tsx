import { Metadata } from 'next';
import AgencyTemplate from '@/components/templates/AgencyTemplate';
import { LandingData } from '@/types/landing';

export const metadata: Metadata = {
  title: 'Agencia Creativa',
  description: 'Impulsamos tu marca con estrategias digitales de alto impacto.',
};

export default function AgencyPage() {
  // ✅ FIX PROFESIONAL: Código completo y tipado estricto con 'id' incluido
  const agencyData: LandingData = {
    id: 'agency-static-01', // ✅ NUEVO: ID obligatorio agregado
    clientName: 'Agencia Visionaria',
    template: 'agency',
    theme: { 
      primary: '#9333ea',
      secondary: '#7e22ce' 
    },
    hero: {
      headline: 'Transformamos tu visión en resultados reales',
      subheadline: 'Diseño, marketing y desarrollo web para marcas que buscan destacar en el mundo digital.',
      ctaText: 'Agendar Consultoría',
      image: '/placeholder-agency.jpg'
    },
    features: [
      { id: '1', iconName: 'TrendingUp', title: 'Estrategia Digital', description: 'Campañas orientadas a conversiones y crecimiento medible.' },
      { id: '2', iconName: 'PenTool', title: 'Diseño de Marca', description: 'Identidad visual única que conecta con tu audiencia ideal.' },
      { id: '3', iconName: 'Monitor', title: 'Desarrollo Web', description: 'Sitios corporativos y e-commerce de alto rendimiento.' },
    ],
  };

  return (
    <main>
      {/* ❌ ELIMINADO: data={agencyData as any} */}
      <AgencyTemplate data={agencyData} />
    </main>
  );
}