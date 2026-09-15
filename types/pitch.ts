export type PitchStatus = 'draft' | 'published';

export type TemplateId =
  | 'dental-medical'
  | 'apex-agency'
  | 'saas-minimal'
  | 'obsidian-dark'
  | 'neo-brutalism'
  | 'cyber-neon'
  | 'editorial-serif'
  | 'corporate-trust'
  | 'hyper-convert'
  | 'glass-frost'
  | 'warm-craft';

export type SectionType =
  | 'hero'
  | 'marquee'
  | 'services'
  | 'about'
  | 'testimonials'
  | 'pricing'
  | 'ctaBanner'
  | 'faq'
  | 'contact'
  | 'footer';

export interface DynamicSection {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  data: Record<string, any>;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface PitchContent {
  branding: {
    primaryColor: string;
    accentColor: string;
    darkBackground: boolean;
    fontFamily: string;
  };
  navbar: {
    brandName: string;
    logoUrl?: string;
    links: NavLink[];
    ctaText: string;
    ctaLink: string;
  };
  sections?: DynamicSection[];
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    heroImageUrl?: string;
    doctorImageUrl?: string;
    beforeImageUrl?: string;
    afterImageUrl?: string;
    clinicImageUrl?: string;
  };
  marquee?: {
    title: string;
    items: string[];
  };
  services: {
    badge?: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  about: {
    badge?: string;
    title: string;
    description: string;
    metrics: MetricItem[];
    imageUrl?: string;
  };
  testimonials: {
    badge?: string;
    title: string;
    subtitle?: string;
    items: TestimonialItem[];
  };
  pricing?: {
    badge?: string;
    title: string;
    subtitle?: string;
    tiers: PricingTier[];
  };
  ctaBanner: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  faq: {
    badge?: string;
    title: string;
    subtitle?: string;
    items: FaqItem[];
  };
  contact?: {
    badge?: string;
    title: string;
    subtitle?: string;
    email: string;
    phone?: string;
    address?: string;
  };
  footer: {
    brandName: string;
    description: string;
    copyright: string;
    links: FooterLink[];
  };
}

export interface Pitch {
  id?: string;
  title: string;
  clientName: string;
  slug: string;
  status: PitchStatus;
  templateId: TemplateId;
  viewsCount: number;
  content: PitchContent;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  category: string;
  badge: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  darkBackground: boolean;
}
