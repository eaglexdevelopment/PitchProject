import Link from 'next/link';
import styles from './demo.module.css';

interface DemoItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: string;
  description: string;
  color: string;
  path: string;
  sections: string[];
}

const DEMOS: DemoItem[] = [
  {
    id: 'dental-medical',
    title: 'Aura Dental & Medical Studio',
    category: 'Healthcare & Clinical Luxury',
    badge: 'FLAGSHIP CLINICAL',
    icon: '🦷',
    description: 'Awwwards-level clinical luxury with 3D tooth laser scan HUD, interactive before/after transformation slider, and 3-step concierge booking wizard.',
    color: 'linear-gradient(135deg, #0d9488 0%, #38bdf8 100%)',
    path: '/demo/dental-medical',
    sections: ['3D Tooth Laser Scan HUD', 'Before & After Smile Slider', 'Spa Comfort Suite Menu', '0% Financing Calculator', '3-Step Booking Wizard', 'Doctor Bio & Certifications', 'Mobile Drawer Menu'],
  },
  {
    id: 'b2b-wholesale',
    title: 'BharatB2B Global Manufacturing & Wholesale',
    category: 'Manufacturing & B2B Wholesale',
    badge: 'GLOBAL B2B / INDIAMART',
    icon: '🏭',
    description: 'Dynamic wholesale & OEM export e-commerce portal with 3D Holo-Dock, material shader shifter, maritime sea radar, 3D container packing simulator, MTC chemical matrix, and direct RFQ dispatch.',
    color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #03080f 100%)',
    path: '/demo/b2b-wholesale',
    sections: ['3D Holo-Dock & Shaders', '360° Exploded View', 'Live Sea Freight Radar', '3D Container Simulator', 'Certified MTC Matrix', 'Direct Commercial RFQ Form', 'Printable Proforma Invoice'],
  },
  {
    id: 'saas',
    title: 'Minimal SaaS / Cloud Tech',
    category: 'Software & Startups',
    badge: 'INTERACTIVE PRODUCT',
    icon: '⚡',
    description: 'Crisp, high-converting SaaS layout featuring interactive product feature tabs, dark Bento grid, dynamic monthly/annual billing slider, and live code sandbox.',
    color: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    path: '/demo/saas',
    sections: ['Interactive Demo Hero', 'Feature Bento Grid', 'API Live Sandbox', 'Interactive Pricing Switch', 'Metrics & ROI', 'Interactive Tabs', 'Developer FAQ'],
  },
  {
    id: 'neo-brutalism',
    title: 'Neo-Brutalist Bold Studio',
    category: 'Agency & Trendsetter',
    badge: 'RAW & HIGH CONTRAST',
    icon: '💥',
    description: 'High-energy layout with solid black outlines, 3D offset drop shadows, sticker badges, dynamic kinetic marquee, and playful interactive project drawers.',
    color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    path: '/demo/neo-brutalism',
    sections: ['Sticker Hero Header', 'Kinetic Marquee', 'Bespoke Services Grid', 'Chunky Metric Counters', 'Interactive Case Cards', 'Raw Testimonial Wall', 'Bold CTA Banner'],
  },
  {
    id: 'obsidian',
    title: 'Obsidian Luxury Dark',
    category: 'Fintech & Enterprise',
    badge: 'ULTRA-PREMIUM',
    icon: '💎',
    description: 'Deep midnight aesthetic with emerald & cyan border glows, luxury serif typography, confidential investor intake form, and institutional trust proofs.',
    color: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #0f172a 100%)',
    path: '/demo/obsidian',
    sections: ['Midnight Glow Hero', 'Institutional Proofs', 'Wealth Architecture Grid', 'Confidential Intake Card', 'Executive Advisory', 'Security Accreditations', 'Bespoke Consultation'],
  },
  {
    id: 'cyber',
    title: 'Cyber Neon / AI Web3',
    category: 'AI & Next-Gen Tech',
    badge: 'FUTURISTIC TERMINAL',
    icon: '🔮',
    description: 'Ultra-modern dark theme with purple-cyan neon gradients, matrix grid patterns, interactive prompt generation simulator, and latency benchmarks.',
    color: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    path: '/demo/cyber',
    sections: ['Interactive Prompt Terminal', 'Matrix Grid Architecture', 'Latency Benchmarks', 'Neural Pipeline Cards', 'Developer API Quickstart', 'Protocol Metrics', 'Neural Web Waitlist'],
  },
];

export default function DemoIndexPage() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.badge}>EagleX Template Showcase</div>
          <h1 className={styles.title}>Bespoke Theme Demonstrations</h1>
          <p className={styles.subtitle}>
            Explore our standalone live theme builds. Each template features completely custom layout geometry, interactive components, and bespoke typography.
          </p>
          <Link href="/admin/pages" className={styles.backAdminBtn}>
            ← Back to Pitch Dashboard
          </Link>
        </div>

        <div className={styles.grid}>
          {DEMOS.map((demo) => (
            <div key={demo.id} className={styles.card}>
              <div className={styles.cardTop} style={{ background: demo.color }}>
                <div className={styles.topRow}>
                  <span className={styles.cardCategory}>{demo.category}</span>
                  <span className={styles.statusPill}>{demo.badge}</span>
                </div>
                <div className={styles.cardIcon}>{demo.icon}</div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{demo.title}</h3>
                <p className={styles.cardDesc}>{demo.description}</p>

                <div className={styles.sectionTags}>
                  {demo.sections.map((sec, i) => (
                    <span key={i} className={styles.sectionTag}>
                      {sec}
                    </span>
                  ))}
                </div>

                <Link href={demo.path} className={styles.viewBtn}>
                  Preview Live Template →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
