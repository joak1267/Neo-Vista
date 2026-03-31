// Ubicación: /app/waitlist/page.tsx

import React from 'react';
// Importaremos el template cuando lo creemos
import WaitlistTemplate from '@/components/templates/WaitlistTemplate';
import systemConfig from '@/lib/landing-config.json';

export default function WaitlistPage() {
  const configData = systemConfig.clients.find(client => client.template === 'waitlist');

  const data = configData || {
    clientName: "App Secreta",
    template: "waitlist",
    theme: { primary: "#eab308" }, // Un amarillo/dorado para generar FOMO/Expectativa
    hero: { 
      headline: "Algo grande está por llegar.", 
      subheadline: "Sumate a la lista de espera para tener acceso anticipado y beneficios exclusivos antes del lanzamiento global.", 
      ctaText: "UNIRME A LA FILA" 
    },
    features: []
  };

  return <WaitlistTemplate data={data as any} />;
}