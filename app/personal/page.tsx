import { Metadata } from 'next';
import PersonalTemplate from '@/components/templates/PersonalTemplate';
import { LandingData } from '@/types/landing';

export const metadata: Metadata = {
  title: 'Portfolio Personal',
  description: 'Conocé mi experiencia, proyectos y perfil profesional.',
};

export default function PersonalPage() {
  // ✅ FIX PROFESIONAL: Código completo y tipado estricto
  const personalData: LandingData = {
    id: 'personal-static-01', // ✅ NUEVO: ID obligatorio
    clientName: 'Juan Desarrollador',
    template: 'personal',
    theme: { 
      primary: '#2563eb', 
      secondary: '#1e40af'
    },
    hero: {
      headline: 'Hola, soy Desarrollador Full Stack',
      subheadline: 'Construyo soluciones web escalables, rápidas y eficientes.',
      ctaText: 'Hablemos',
      image: '/placeholder-profile.jpg'
    },
    features: [
      { id: '1', iconName: 'Code', title: 'Desarrollo Web', description: 'Creación de aplicaciones modernas y optimizadas.' },
      { id: '2', iconName: 'Server', title: 'Arquitectura Backend', description: 'Diseño de APIs robustas y bases de datos seguras.' },
      { id: '3', iconName: 'Smartphone', title: 'Diseño Responsivo', description: 'Interfaces que se adaptan a cualquier dispositivo.' },
    ],
  }; 

  return (
    <main>
      <PersonalTemplate data={personalData} />
    </main>
  );
}