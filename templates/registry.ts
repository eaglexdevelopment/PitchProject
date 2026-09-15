import React from 'react';
import { Pitch, TemplateId, TemplateMetadata, DynamicSection } from '@/types/pitch';
import ApexAgencyTemplate from './ApexAgencyTemplate/ApexAgencyTemplate';
import DentalMedicalTemplate from './DentalMedicalTemplate/DentalMedicalTemplate';

export interface TemplateComponentProps {
  pitch: Pitch;
}

export const TEMPLATES_LIST: TemplateMetadata[] = [
  {
    id: 'dental-medical',
    name: 'Aura Dental & Medical Studio',
    category: 'Healthcare & Clinical',
    badge: 'FLAGSHIP CLINICAL',
    description: 'Awwwards-level clinical luxury with 3D tooth laser scan HUD, macro before/after smile slider, and 3-step booking wizard.',
    primaryColor: '#0d9488',
    accentColor: '#38bdf8',
    fontFamily: 'Playfair Display',
    darkBackground: false,
  },
  {
    id: 'apex-agency',
    name: 'EagleX Apex Agency',
    category: 'Agency & Creative',
    badge: 'FLAGSHIP AGENCY',
    description: 'Bespoke dark/light modern agency aesthetic with glassmorphism and glowing metric cards.',
    primaryColor: '#ff5e00',
    accentColor: '#3b82f6',
    fontFamily: 'Inter',
    darkBackground: true,
  },
  {
    id: 'saas-minimal',
    name: 'Minimal SaaS / Tech',
    category: 'Software & Startups',
    badge: 'HIGH-VELOCITY',
    description: 'Clean crisp aesthetic with high contrast typography and conversion focus.',
    primaryColor: '#2563eb',
    accentColor: '#10b981',
    fontFamily: 'Inter',
    darkBackground: false,
  },
  {
    id: 'obsidian-dark',
    name: 'Obsidian Luxury Dark',
    category: 'Enterprise & Fintech',
    badge: 'LUXURY',
    description: 'Deep midnight dark palette with subtle emerald borders and glowing counters.',
    primaryColor: '#10b981',
    accentColor: '#06b6d4',
    fontFamily: 'Inter',
    darkBackground: true,
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalist Bold',
    category: 'Trendsetter',
    badge: 'BOLD',
    description: 'High-energy layout with solid black borders, drop shadows, and vibrant yellow/orange blocks.',
    primaryColor: '#f59e0b',
    accentColor: '#ef4444',
    fontFamily: 'Inter',
    darkBackground: false,
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon / AI',
    category: 'Web3 & AI',
    badge: 'FUTURISTIC',
    description: 'Ultra-modern dark theme with purple-cyan neon gradients and matrix grid patterns.',
    primaryColor: '#8b5cf6',
    accentColor: '#06b6d4',
    fontFamily: 'Inter',
    darkBackground: true,
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Studio',
    category: 'Design & Architecture',
    badge: 'ELEGANT',
    description: 'Sophisticated typography-first layout inspired by modern architectural publications.',
    primaryColor: '#0f172a',
    accentColor: '#b45309',
    fontFamily: 'Playfair Display',
    darkBackground: false,
  },
  {
    id: 'corporate-trust',
    name: 'Corporate Trust B2B',
    category: 'Consulting & Legal',
    badge: 'ENTERPRISE',
    description: 'Deep navy and gold accents designed for high-ticket consulting and enterprise services.',
    primaryColor: '#1e3a8a',
    accentColor: '#d97706',
    fontFamily: 'Inter',
    darkBackground: false,
  },
  {
    id: 'hyper-convert',
    name: 'Hyper-Convert Sales',
    category: 'Direct Response',
    badge: 'CRO FOCUSED',
    description: 'Engineered for instant lead capture, countdown urgency banners, and guaranteed conversion.',
    primaryColor: '#dc2626',
    accentColor: '#f97316',
    fontFamily: 'Inter',
    darkBackground: false,
  },
  {
    id: 'glass-frost',
    name: 'Glass Frost UI',
    category: 'Modern Web App',
    badge: 'FROSTED',
    description: 'Layered frosted glass cards with ambient pastel backdrop orbs and soft shadows.',
    primaryColor: '#6366f1',
    accentColor: '#ec4899',
    fontFamily: 'Inter',
    darkBackground: true,
  },
  {
    id: 'warm-craft',
    name: 'Warm Artisan Craft',
    category: 'Boutique & Lifestyle',
    badge: 'ORGANIC',
    description: 'Earthy terracotta, warm taupe, and soft neutrals for culinary, hospitality, and artisan brands.',
    primaryColor: '#c2410c',
    accentColor: '#78716c',
    fontFamily: 'Inter',
    darkBackground: false,
  },
];

export const TEMPLATE_REGISTRY: Record<
  TemplateId,
  React.ComponentType<TemplateComponentProps>
> = {
  'dental-medical': DentalMedicalTemplate,
  'apex-agency': ApexAgencyTemplate,
  'saas-minimal': ApexAgencyTemplate,
  'obsidian-dark': ApexAgencyTemplate,
  'neo-brutalism': ApexAgencyTemplate,
  'cyber-neon': ApexAgencyTemplate,
  'editorial-serif': ApexAgencyTemplate,
  'corporate-trust': ApexAgencyTemplate,
  'hyper-convert': ApexAgencyTemplate,
  'glass-frost': ApexAgencyTemplate,
  'warm-craft': ApexAgencyTemplate,
};

export function getTemplateComponent(templateId: TemplateId): React.ComponentType<TemplateComponentProps> {
  return TEMPLATE_REGISTRY[templateId] || ApexAgencyTemplate;
}

export function getTemplateMetadata(templateId: TemplateId): TemplateMetadata {
  return (
    TEMPLATES_LIST.find((t) => t.id === templateId) || TEMPLATES_LIST[0]
  );
}

export function getDefaultSectionsList(): DynamicSection[] {
  return [
    { id: 'sec-hero', type: 'hero', title: 'Hero Section', enabled: true, data: {} },
    { id: 'sec-marquee', type: 'marquee', title: 'Partner & Trust Logos', enabled: true, data: {} },
    { id: 'sec-services', type: 'services', title: 'Services & Capabilities', enabled: true, data: {} },
    { id: 'sec-about', type: 'about', title: 'About Us & Key Metrics', enabled: true, data: {} },
    { id: 'sec-testimonials', type: 'testimonials', title: 'Client Reviews & Proof', enabled: true, data: {} },
    { id: 'sec-ctaBanner', type: 'ctaBanner', title: 'Call-to-Action Banner', enabled: true, data: {} },
    { id: 'sec-faq', type: 'faq', title: 'FAQ Accordion', enabled: true, data: {} },
    { id: 'sec-footer', type: 'footer', title: 'Footer & Links', enabled: true, data: {} },
  ];
}
