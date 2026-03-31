// Ubicación: /app/[template]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import systemConfig from '@/lib/landing-config.json';

// Importación de TODAS las maquetas
import AgencyTemplate from '@/components/templates/AgencyTemplate';
import LeadTemplate from '@/components/templates/LeadTemplate';
import SaasTemplate from '@/components/templates/SaasTemplate';
import PersonalTemplate from '@/components/templates/PersonalTemplate';
import PlatformTemplate from '@/components/templates/PlatformTemplate';
import SalesPageTemplate from '@/components/templates/SalesPageTemplate';
import LinkBioTemplate from '@/components/templates/LinkBioTemplate';
import WaitlistTemplate from '@/components/templates/WaitlistTemplate';

interface DynamicLandingPageProps {
  params: Promise<{ template: string }>;
}

export default async function DynamicLandingPage({ params }: DynamicLandingPageProps) {
  const { template: currentId } = await params;

  // Buscamos por ID único
  const clientData = systemConfig.clients.find(client => client.id === currentId);

  if (!clientData) notFound();

  // Renderizado según el campo 'template' del objeto encontrado
  switch (clientData.template) {
    case 'saas':
      return <SaasTemplate data={clientData as any} />;
    case 'personal':
      return <PersonalTemplate data={clientData as any} />;
    case 'agency':
      return <AgencyTemplate data={clientData as any} />;
    case 'lead':
      return <LeadTemplate data={clientData as any} />;
    case 'platform':
      return <PlatformTemplate data={clientData as any} />;
    case 'sales':
      return <SalesPageTemplate data={clientData as any} />;
    case 'linkbio':
      return <LinkBioTemplate data={clientData as any} />;
    case 'waitlist':
      return <WaitlistTemplate data={clientData as any} />;
    default:
      notFound();
  }
}