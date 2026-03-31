// Ubicación: /app/sales/page.tsx

import React from 'react';
import SalesPageTemplate from '@/components/templates/SalesPageTemplate';
import systemConfig from '@/lib/landing-config.json';

export default function SalesPage() {
  // 1. Buscamos si ya existe la configuración para 'sales' en tu JSON
  const configData = systemConfig.clients.find(client => client.template === 'sales');

  // 2. Fallback de datos (por si aún no lo agregaste al JSON)
  const data = configData || {
    clientName: "Masterclass Pro",
    template: "sales",
    theme: { 
      primary: "#ef4444", // Rojo agresivo para conversiones
      accent: "#f59e0b"   // Amarillo/Naranja para los precios
    },
    hero: { 
      headline: "El Sistema Definitivo para Escalar tu Negocio", 
      subheadline: "Descubrí el paso a paso exacto para facturar múltiples 6 cifras sin depender de referidos ni trabajar 14 horas al día.", 
      ctaText: "QUIERO ACCESO INMEDIATO" 
    },
    features: []
  };

  // 3. Renderizamos el arquetipo pasándole la data
  return <SalesPageTemplate data={data as any} />;
}