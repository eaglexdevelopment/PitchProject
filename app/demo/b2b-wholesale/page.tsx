import React from 'react';
import B2BWholesaleTemplate from '@/templates/B2BWholesaleTemplate/B2BWholesaleTemplate';
import { Pitch } from '@/types/pitch';

const mockB2BPitch: Pitch = {
  id: 'demo-b2b-wholesale',
  title: 'Bharat Industrial Exports Ltd.',
  clientName: 'Bharat Industrial Exports Ltd.',
  slug: 'bharat-industrial-exports',
  status: 'published',
  templateId: 'b2b-wholesale',
  viewsCount: 1420,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  content: {
    branding: {
      primaryColor: '#f59e0b',
      accentColor: '#10b981',
      darkBackground: true,
      fontFamily: 'Outfit',
    },
    navbar: {
      brandName: 'Bharat Industrial Exports Ltd.',
      links: [
        { label: 'Industry Hub', href: '#hero' },
        { label: 'MOQ & Price Estimator', href: '#calculator' },
        { label: 'Product Catalog', href: '#catalog' },
        { label: 'Factory Floor', href: '#infrastructure' },
        { label: 'Compliance', href: '#certifications' },
        { label: 'Export Proofs', href: '#reviews' },
      ],
      ctaText: 'Request Bulk Quote',
      ctaLink: '#calculator',
    },
    hero: {
      badge: 'DIRECT OEM & EXPORT MANUFACTURER',
      headline: 'High-Precision CNC Machined & Forged Metal Components',
      subheadline: 'Exporting sub-millimeter custom turned components, flanges, and aero-grade fasteners directly to Tier-1 global industrial distributors.',
      primaryCtaText: 'Request Instant Bulk Quote',
      primaryCtaLink: '#calculator',
      secondaryCtaText: 'Order Sample Kit',
      secondaryCtaLink: '#catalog',
    },
    services: {
      title: 'Our Manufacturing Specialties',
      subtitle: 'Precision engineering and automated mass production lines.',
      items: [],
    },
    about: {
      title: 'About Our Export Hub',
      description: '50,000 sq.ft facility in Gujarat GIDC heavy engineering corridor.',
      metrics: [
        { id: 'm1', label: 'Machine Floor', value: '50+ CNCs' },
        { id: 'm2', label: 'Tolerance', value: '±0.005mm' },
        { id: 'm3', label: 'Direct Exports', value: '48+ Countries' },
      ],
    },
    testimonials: {
      title: 'Global Buyer Reviews',
      subtitle: 'Verified container exports to North America, Europe, and GCC.',
      items: [],
    },
    ctaBanner: {
      title: 'Ready for High-Volume OEM Production?',
      description: 'Get tailored container pricing and custom CAD manufacturing feasibility within 2 hours.',
      buttonText: 'Request Commercial Quotation',
      buttonLink: '#calculator',
    },
    faq: {
      title: 'Export & Trade Terms FAQ',
      items: [],
    },
    contact: {
      title: 'Global Trade Concierge',
      email: 'exports@bharatb2bhub.com',
      phone: '+91 98200 12345',
      address: 'Plot 45-48, Sector 9 Industrial Area, GIDC Heavy Engineering Zone, Gujarat, India',
    },
    footer: {
      brandName: 'Bharat Industrial Exports Ltd.',
      description: 'Premier OEM/ODM manufacturer and direct exporter certified under ISO 9001:2015, CE, and RoHS standards. Delivering direct container loads worldwide.',
      copyright: '© 2026 Bharat Industrial Exports Ltd. All rights reserved. IEC: 0314088921 | GSTIN: 27AAACB2201Q1Z4',
      links: [
        { label: 'Industry Hub', href: '#hero' },
        { label: 'MOQ Calculator', href: '#calculator' },
        { label: 'Product Catalog', href: '#catalog' },
      ],
    },
  },
};

export default function B2BWholesaleDemoPage() {
  return <B2BWholesaleTemplate pitch={mockB2BPitch} />;
}
