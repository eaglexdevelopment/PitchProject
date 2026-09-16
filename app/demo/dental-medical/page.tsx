import React from 'react';
import DentalMedicalTemplate from '@/templates/DentalMedicalTemplate/DentalMedicalTemplate';
import { Pitch } from '@/types/pitch';

const mockDentalPitch: Pitch = {
  id: 'demo-dental-medical',
  title: 'Aurora Aesthetic & Surgical Dental Studio',
  clientName: 'Aurora Dental Studio',
  slug: 'aurora-dental-studio',
  status: 'published',
  templateId: 'dental-medical',
  viewsCount: 2380,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  content: {
    branding: {
      primaryColor: '#0d9488',
      accentColor: '#38bdf8',
      darkBackground: false,
      fontFamily: 'Playfair Display',
    },
    navbar: {
      brandName: 'Aurora Dental Studio',
      links: [
        { label: 'Specialties', href: '#treatments' },
        { label: 'Transformations', href: '#transformations' },
        { label: 'Comfort Menu', href: '#comfort' },
        { label: 'Financing', href: '#financing' },
        { label: 'FAQ', href: '#faq' },
      ],
      ctaText: 'Reserve Studio Visit',
      ctaLink: '#booking',
    },
    hero: {
      badge: 'VOTED #1 COSMETIC PRACTICE IN DALLAS 2026',
      headline: 'Architecting Natural Smiles. With Robotic Precision.',
      subheadline: 'Bespoke hand-sculpted porcelain veneers, iTero 5D Invisalign aligners, and guided dental implants tailored to your facial aesthetics.',
      primaryCtaText: 'Reserve VIP Consultation',
      primaryCtaLink: '#booking',
      secondaryCtaText: 'Explore Transformations',
      secondaryCtaLink: '#transformations',
      doctorImageUrl: '/images/dental/dr_sarah_jenkins.jpg',
      beforeImageUrl: '/images/dental/smile_before.jpg',
      afterImageUrl: '/images/dental/smile_after.jpg',
      clinicImageUrl: '/images/dental/treatment_suite.jpg',
    },
    services: {
      title: 'Clinical Specialties & Technology',
      subtitle: 'Where biological harmony meets digital dentistry.',
      items: [],
    },
    about: {
      title: 'Meet Dr. Sarah Jenkins, DDS, FAGD',
      description: 'Fellow of the International Academy of Aesthetic Dentistry with over 15 years crafting smiles for celebrities, executives, and families.',
      metrics: [
        { id: 'm1', label: 'Veneers Placed', value: '4,500+' },
        { id: 'm2', label: 'Patient Rating', value: '4.98 ★' },
        { id: 'm3', label: 'Clinical Osseointegration', value: '99.4%' },
      ],
    },
    testimonials: {
      title: 'Patient Stories & Transformations',
      subtitle: 'Real smiles, real confidence.',
      items: [],
    },
    ctaBanner: {
      title: 'Your Dream Smile Begins With One 3D Scan',
      description: 'Experience anxiety-free dentistry in our luxury uptown Dallas suites with 0% financing.',
      buttonText: 'Book Private Consultation',
      buttonLink: '#booking',
    },
    faq: {
      title: 'Clinical & Patient FAQ',
      items: [],
    },
    contact: {
      title: 'Studio Concierge',
      email: 'concierge@auroradental.com',
      phone: '(214) 880-9920',
      address: '2400 McKinney Avenue, Suite 600, Uptown Dallas, TX 75201',
    },
    footer: {
      brandName: 'Aurora Dental Studio',
      description: 'Elevating cosmetic and surgical dentistry through compassionate care, 3D robotics, and luxury hospitality.',
      copyright: '© 2026 Aurora Dental Studio. All rights reserved. ADA Certified • HIPAA Compliant',
      links: [
        { label: 'Specialties', href: '#treatments' },
        { label: 'Transformations', href: '#transformations' },
        { label: 'Comfort Menu', href: '#comfort' },
      ],
    },
  },
};

export default function DentalMedicalDemoPage() {
  return <DentalMedicalTemplate pitch={mockDentalPitch} />;
}
