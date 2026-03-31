import React from 'react';
// ✅ FIX: Importamos el tipo extendido directamente desde el template
import PlatformTemplate, { ExtendedPlatformData } from '@/components/templates/PlatformTemplate';
import systemConfig from '@/lib/landing-config.json';

export default function PlatformPage() {
  const configData = systemConfig.clients.find(client => client.template === 'platform');

  // ✅ FIX: Casteamos explícitamente a ExtendedPlatformData, no a LandingData
  const data: ExtendedPlatformData = (configData as unknown as ExtendedPlatformData) || {
    id: 'platform-static-01',
    clientName: "Nexus Platform",
    template: "platform",
    theme: { 
      primary: "#3b82f6",
      secondary: "#2563eb", 
      accent: "#8b5cf6"
    },
    hero: { 
      headline: "El sistema operativo para escalar tu empresa", 
      subheadline: "Centralizá tus operaciones, automatizá flujos de trabajo y tomá decisiones basadas en datos en tiempo real.", 
      ctaText: "Comenzar Gratis" 
    },
    features: [
      { id: "f1", title: "Automatización IA", description: "Reglas inteligentes que trabajan por vos 24/7 sin escribir código.", iconName: "Bot" },
      { id: "f2", title: "Analíticas en Vivo", description: "Dashboards en tiempo real con exportación automática a PDF.", iconName: "BarChart3" },
      { id: "f3", title: "Colaboración", description: "Chat integrado, comentarios y menciones directo en tus documentos.", iconName: "Users" },
      { id: "f4", title: "Seguridad Bancaria", description: "Cifrado end-to-end, copias de seguridad cada 15 min y cumplimiento SOC2.", iconName: "ShieldCheck" }
    ],
    pricing: [
      { id: "p1", name: "Starter", description: "Ideal para equipos pequeños.", monthlyPrice: "29", annualPrice: "24", ctaText: "Plan Starter", features: ["3 Usuarios", "Soporte email", "1 Integración"] },
      { id: "p2", name: "Pro", description: "Para agencias y scale-ups.", monthlyPrice: "79", annualPrice: "64", ctaText: "Prueba 14 días", isPopular: true, features: ["Usuarios ilimitados", "Soporte 24/7", "API access", "Roles avanzados"] },
      { id: "p3", name: "Enterprise", description: "Control y seguridad total.", monthlyPrice: "199", annualPrice: "169", ctaText: "Contactar Ventas", features: ["SSO/SAML", "SLA 99.9%", "Account Manager", "Infraestructura dedicada"] }
    ]
  };

  return <PlatformTemplate data={data} />;
}