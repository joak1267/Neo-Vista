import { Metadata } from 'next';
import SaasTemplate from '@/components/templates/SaasTemplate';
import { LandingData } from '@/types/landing';

export const metadata: Metadata = {
  title: 'Plataforma SaaS',
  description: 'Descubrí nuestra solución de software como servicio para tu negocio.',
};

export default function SaasPage() {
  // ✅ FIX PROFESIONAL: Código completo y tipado estricto
  const saasData: LandingData = {
    id: 'saas-static-01', // ✅ NUEVO: ID obligatorio
    clientName: 'Mi SaaS Increíble',
    template: 'saas',
    theme: { 
      primary: '#16a34a', 
      secondary: '#15803d'
    },
    hero: {
      headline: 'La herramienta definitiva para tu equipo',
      subheadline: 'Automatizá procesos, ahorrá tiempo y escalá tu negocio hoy mismo.',
      ctaText: 'Comenzar Prueba Gratis',
      image: '/placeholder-saas.jpg'
    },
    features: [
      { id: '1', iconName: 'Zap', title: 'Ultra Rápido', description: 'Optimizado para una velocidad de respuesta extrema.' },
      { id: '2', iconName: 'ShieldCheck', title: 'Seguridad Nivel Banco', description: 'Tus datos siempre encriptados y protegidos.' },
      { id: '3', iconName: 'Users', title: 'Colaborativo', description: 'Trabajá en tiempo real con todo tu equipo.' },
    ],
    pricing: [
      { id: 'p1', name: 'Básico', price: '$9', features: ['1 Usuario', 'Soporte por email', '5GB Almacenamiento'] },
      { id: 'p2', isPopular: true, name: 'Pro', price: '$29', features: ['Usuarios ilimitados', 'Soporte 24/7', '100GB Almacenamiento'] },
    ],
  };

  return (
    <main>
      <SaasTemplate data={saasData} />
    </main>
  );
}