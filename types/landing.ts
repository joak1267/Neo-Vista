// ✅ NUEVO: Definición estricta corregida para Landing Factory Pro

export type TemplateType = 
  | 'agency' 
  | 'lead' 
  | 'saas' 
  | 'personal' 
  | 'sales' 
  | 'linkbio' 
  | 'waitlist'
  | 'platform';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent?: string;    // Opcional para maquetas avanzadas
  background?: string; // Opcional
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface IntegrationLogo {
  id: string;
  name: string;
  iconName: string;
}

export interface LandingData {
  id: string;             // ✅ CLAVE: Requerido para ruteo por ID
  clientName: string;
  template: TemplateType;
  theme: ThemeConfig;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    image?: string;       // Cambiado a opcional (?) para evitar errores si no hay imagen
  };
  features?: Feature[];
  testimonials?: Testimonial[];
  pricing?: PricingPlan[];
  integrations?: IntegrationLogo[];
  spot?: number;          // Para Waitlist
  avatar?: string;        // Para LinkBio
}

// ✅ CAMBIO CRÍTICO: Esta interfaz debe coincidir con la raíz de tu JSON
export interface SystemConfig {
  activeTemplateId: string; // ✅ AGREGADO: Según el error en image_e73cdb.png
  clients: LandingData[];
}