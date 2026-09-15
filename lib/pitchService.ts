import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Pitch, PitchContent } from '@/types/pitch';

const PITCHES_COLLECTION = 'pitches';

export const getDefaultPitchContent = (clientName: string = 'Client Company'): PitchContent => {
  return {
    branding: {
      primaryColor: '#ff5e00',
      accentColor: '#3b82f6',
      darkBackground: true,
      fontFamily: 'Inter',
    },
    navbar: {
      brandName: clientName,
      logoUrl: '',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'FAQ', href: '#faq' },
      ],
      ctaText: 'Get Started',
      ctaLink: '#contact',
    },
    hero: {
      badge: 'NEXT-GENERATION DIGITAL EXPERIENCE',
      headline: `Empowering ${clientName} With High-Converting Digital Presence`,
      subheadline:
        'Transforming your brand into an industry leader with bespoke architecture, modern design aesthetics, and guaranteed conversion growth.',
      primaryCtaText: 'Schedule a Consultation',
      primaryCtaLink: '#contact',
      secondaryCtaText: 'Explore Capabilities',
      secondaryCtaLink: '#services',
      heroImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    services: {
      badge: 'CORE CAPABILITIES',
      title: 'Engineered For Sustainable Growth',
      subtitle: 'Comprehensive digital solutions designed specifically for high-performing modern enterprises.',
      items: [
        {
          id: '1',
          title: 'Custom Web & Mobile Architecture',
          description: 'High-speed, scalable, and responsive platforms built using state-of-the-art frameworks.',
          icon: 'Layers',
          badge: 'High Impact',
        },
        {
          id: '2',
          title: 'Conversion-Rate Optimization (CRO)',
          description: 'Data-backed user journeys and landing pages engineered to maximize sales & inquiries.',
          icon: 'TrendingUp',
          badge: 'Growth Engine',
        },
        {
          id: '3',
          title: 'AI Automation & System Integration',
          description: 'Automate repetitive workflows, customer management, and lead scoring with modern AI pipelines.',
          icon: 'Cpu',
          badge: 'Modern Tech',
        },
      ],
    },
    about: {
      badge: 'WHY PARTNER WITH US',
      title: 'Decades of Excellence in Delivering Measurable Business Value',
      description:
        'We combine bold creative vision with rigorous technical execution to craft memorable web experiences that resonate with your customers and drive bottom-line results.',
      metrics: [
        { id: '1', label: 'Average ROI Increase', value: '340%' },
        { id: '2', label: 'Lighthouse Performance', value: '99/100' },
        { id: '3', label: 'Client Retention Rate', value: '98.5%' },
      ],
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    },
    testimonials: {
      badge: 'CLIENT SATISFACTION',
      title: 'Loved by Founders & Industry Executives',
      subtitle: 'Read how our bespoke web experiences have transformed modern brands.',
      items: [
        {
          id: '1',
          name: 'Sarah Jenkins',
          role: 'Chief Executive Officer',
          company: 'Nexus Innovations',
          content:
            'The new platform increased our inbound qualified leads by 210% within the first 60 days. The design aesthetic is truly world-class.',
          rating: 5,
        },
        {
          id: '2',
          name: 'David Vance',
          role: 'VP of Marketing',
          company: 'Aether Cloud',
          content:
            'Exceptional attention to speed and detail. Our prospects constantly comment on how slick and professional our site looks.',
          rating: 5,
        },
      ],
    },
    ctaBanner: {
      title: 'Ready To Scale Your Digital Presence?',
      description:
        'Let’s partner together to build a standout web presence that converts visitors into long-term loyal clients.',
      buttonText: 'Claim Your Strategy Call',
      buttonLink: '#contact',
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Everything You Need To Know',
      subtitle: 'Clear answers to common questions about our launch process.',
      items: [
        {
          id: '1',
          question: 'How fast can this website be fully deployed?',
          answer:
            'With our modular architecture and streamlined design sprints, typical turnaround is between 5 to 14 business days from kickoff.',
        },
        {
          id: '2',
          question: 'Is the website optimized for mobile and search engines (SEO)?',
          answer:
            'Yes! Every template is fully responsive, achieves 95+ Google PageSpeed scores, and includes semantic schema markup for top search engine visibility.',
        },
        {
          id: '3',
          question: 'Can we customize sections or add new integrations later?',
          answer:
            'Absolutely. Our codebase is completely modular, allowing seamless addition of custom forms, CRM webhooks, and analytics pixels.',
        },
      ],
    },
    footer: {
      brandName: clientName,
      description: 'Engineered with passion by EagleX Development. Built for ambitious enterprises.',
      copyright: `© ${new Date().getFullYear()} ${clientName}. All rights reserved.`,
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  };
};

export async function getAllPitches(): Promise<Pitch[]> {
  try {
    const q = query(collection(db, PITCHES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Pitch[];
  } catch (err) {
    console.error('Error fetching pitches:', err);
    return [];
  }
}

export async function getPitchById(id: string): Promise<Pitch | null> {
  try {
    const docRef = doc(db, PITCHES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Pitch;
  } catch (err) {
    console.error(`Error fetching pitch ${id}:`, err);
    return null;
  }
}

export async function getPitchBySlug(slug: string): Promise<Pitch | null> {
  try {
    const q = query(collection(db, PITCHES_COLLECTION), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Pitch;
  } catch (err) {
    console.error(`Error fetching pitch by slug ${slug}:`, err);
    return null;
  }
}

export async function createPitch(
  data: Omit<Pitch, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount'>
): Promise<string> {
  const now = new Date().toISOString();
  const pitchPayload = {
    ...data,
    viewsCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, PITCHES_COLLECTION), pitchPayload);
  return docRef.id;
}

export async function updatePitch(id: string, data: Partial<Pitch>): Promise<void> {
  const docRef = doc(db, PITCHES_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deletePitch(id: string): Promise<void> {
  const docRef = doc(db, PITCHES_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function incrementPitchViews(id: string): Promise<void> {
  try {
    const docRef = doc(db, PITCHES_COLLECTION, id);
    await updateDoc(docRef, {
      viewsCount: increment(1),
    });
  } catch (err) {
    console.warn('Failed to increment views:', err);
  }
}
