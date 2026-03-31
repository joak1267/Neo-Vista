// Ubicación: /app/linkbio/page.tsx

import React from 'react';
// Importaremos el template cuando lo creemos en el próximo paso
import LinkBioTemplate from '@/components/templates/LinkBioTemplate';
import systemConfig from '@/lib/landing-config.json';

export default function LinkBioPage() {
  const configData = systemConfig.clients.find(client => client.template === 'linkbio');

  const data = configData || {
    clientName: "Juan Pérez",
    template: "linkbio",
    theme: { primary: "#ec4899" }, // Un rosa vibrante estilo Instagram
    hero: { 
      headline: "Creador de Contenido & Dev", 
      subheadline: "Encontrá todos mis recursos, cursos y redes sociales en un solo lugar.", 
      ctaText: "Seguime en Instagram" 
    },
    features: []
  };

  // Usamos "as any" temporalmente hasta que construyamos el template y sus interfaces
  return <LinkBioTemplate data={data as any} />;
}