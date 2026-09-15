'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './brutal.module.css';

export default function NeoBrutalismDemoPage() {
  const [selectedCaseFilter, setSelectedCaseFilter] = useState('all');

  const cases = [
    {
      id: 'c1',
      client: 'HYPER-DRIVE FITNESS',
      category: 'branding',
      stat: '+340% MRR',
      tag: 'BRAND & WEB',
      desc: 'Complete high-voltage brand overhaul and Shopify checkout re-architecture.',
    },
    {
      id: 'c2',
      client: 'NEO-BANK FINTECH',
      category: 'product',
      stat: '$18M SEED ROUND',
      tag: 'MOBILE UI/UX',
      desc: 'Radical, anti-boring mobile banking interface for Gen Z crypto natives.',
    },
    {
      id: 'c3',
      client: 'SONIC BEATS AUDIO',
      category: 'branding',
      stat: '2.4M ACTIVE USERS',
      tag: 'CREATIVE DIRECTION',
      desc: 'Bold 3D interactive web audio synthesizer and viral landing campaign.',
    },
    {
      id: 'c4',
      client: 'VORTEX CLOUD API',
      category: 'product',
      stat: '99.9% CONVERSION',
      tag: 'DESIGN SYSTEM',
      desc: 'Developer documentation portal that makes APIs look like arcade games.',
    },
  ];

  const filteredCases =
    selectedCaseFilter === 'all'
      ? cases
      : cases.filter((c) => c.category === selectedCaseFilter);

  return (
    <div className={styles.container}>
      {/* 1. Kinetic Ticker */}
      <div className={styles.tickerWrap}>
        <div className={styles.tickerContent}>
          🔥 WE DON&apos;T MAKE BORING WEBSITES • 🏆 AWAWDS SITE OF THE YEAR • ⚡ HIGH VOLTAGE BRANDING & CODE • 🚀 400% AVERAGE CONVERSION LIFT • 💥 ACCEPTING Q4 CLIENTS • 🔥 WE DON&apos;T MAKE BORING WEBSITES • 🏆 AWAWDS SITE OF THE YEAR • ⚡ HIGH VOLTAGE BRANDING & CODE
        </div>
      </div>

      {/* 2. Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/demo" className={styles.brandLogo}>
            <span>KINETIC</span>
            <span className={styles.logoSticker}>RAW STUDIO</span>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#work" className={styles.navLink}>RADICAL WORK</a></li>
              <li><a href="#services" className={styles.navLink}>CAPABILITIES</a></li>
              <li><a href="#proof" className={styles.navLink}>PROOFS</a></li>
              <li><a href="#pitch" className={styles.navLink}>GET PITCHED</a></li>
            </ul>
          </nav>

          <a href="#pitch" className={styles.navCta}>
            START A PROJECT ⚡
          </a>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className={styles.heroSection}>
        <div>
          <div className={styles.heroSticker}>
            ★ TOP 1% INDEPENDENT CREATIVE AGENCY
          </div>

          <h1 className={styles.heroTitle}>
            WE BUILD DIGITAL EXPERIENCES THAT <span className={styles.highlightYellow}>REFUSE TO BE IGNORED.</span>
          </h1>

          <p className={styles.heroDesc}>
            Forget bland corporate templates. We craft high-octane branding, unapologetic design systems, and hyper-converting web applications that command absolute market attention.
          </p>

          <div className={styles.heroActionRow}>
            <a href="#pitch" className={styles.heroBtnPrimary}>
              BOOK STRATEGY CALL →
            </a>
            <a href="#work" className={styles.heroBtnSecondary}>
              VIEW ARCHIVE
            </a>
          </div>
        </div>

        <div className={styles.heroStickerBox}>
          <div className={styles.floatingTag1}>🚀 LIVE METRICS</div>

          <div className={styles.stickerMetricBox}>
            <div className={styles.stickerMetricNumber} style={{ color: '#ff4757' }}>
              $42.8M+
            </div>
            <div className={styles.stickerMetricLabel}>Client Revenue Generated</div>
          </div>

          <div className={styles.stickerMetricBox}>
            <div className={styles.stickerMetricNumber} style={{ color: '#2ed573' }}>
              4.8X
            </div>
            <div className={styles.stickerMetricLabel}>Average ROAS for D2C Brands</div>
          </div>

          <div className={styles.stickerMetricBox}>
            <div className={styles.stickerMetricNumber} style={{ color: '#1e90ff' }}>
              14 DAYS
            </div>
            <div className={styles.stickerMetricLabel}>Sprint Time from Concept to Launch</div>
          </div>
        </div>
      </section>

      {/* 4. Capabilities / Services Grid */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.heroSticker}>WHAT WE ACTUALLY DO</div>
          <h2 className={styles.sectionTitle}>UNFAIR ADVANTAGES FOR YOUR BRAND</h2>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div>
              <span className={styles.serviceBadge} style={{ background: '#ffe600' }}>01 / BRANDING</span>
              <h3 className={styles.serviceTitle}>Visual Identity & Manifesto</h3>
              <p className={styles.serviceDesc}>
                Logos that punch through noise, unapologetic typography systems, custom 3D iconography, and guidelines your team will actually follow.
              </p>
            </div>
            <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>→ LOGOS • GUIDELINES • MOTION</div>
          </div>

          <div className={styles.serviceCard}>
            <div>
              <span className={styles.serviceBadge} style={{ background: '#70a1ff' }}>02 / ENGINEERING</span>
              <h3 className={styles.serviceTitle}>Next.js Web Applications</h3>
              <p className={styles.serviceDesc}>
                Sub-second page speeds, interactive WebGL canvases, dynamic client portals, and bulletproof Firestore & Supabase backends.
              </p>
            </div>
            <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>→ APP DEV • WEBGL • CMS ENGINES</div>
          </div>

          <div className={styles.serviceCard}>
            <div>
              <span className={styles.serviceBadge} style={{ background: '#2ed573' }}>03 / REVENUE</span>
              <h3 className={styles.serviceTitle}>Conversion Architecture</h3>
              <p className={styles.serviceDesc}>
                Funnel wireframes, behavioral micro-copywriting, high-urgency checkout flows, and multivariate A/B testing rigs.
              </p>
            </div>
            <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>→ CRO AUDITS • A/B TEST • FUNNELS</div>
          </div>
        </div>
      </section>

      {/* 5. Project Showcase */}
      <section id="work" className={styles.caseSection}>
        <div className={styles.caseInner}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className={styles.heroSticker} style={{ background: '#ff6b81', color: '#fff' }}>PROOF OF WORK</div>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>SELECTED CLIENT WINS</h2>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedCaseFilter('all')}
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 900,
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  background: selectedCaseFilter === 'all' ? '#000' : '#fff',
                  color: selectedCaseFilter === 'all' ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                ALL
              </button>
              <button
                onClick={() => setSelectedCaseFilter('branding')}
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 900,
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  background: selectedCaseFilter === 'branding' ? '#000' : '#fff',
                  color: selectedCaseFilter === 'branding' ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                BRANDING
              </button>
              <button
                onClick={() => setSelectedCaseFilter('product')}
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 900,
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  background: selectedCaseFilter === 'product' ? '#000' : '#fff',
                  color: selectedCaseFilter === 'product' ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                PRODUCT / UX
              </button>
            </div>
          </div>

          <div className={styles.caseGrid}>
            {filteredCases.map((c) => (
              <div key={c.id} className={styles.caseCard}>
                <div className={styles.caseHeader}>
                  <strong style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{c.client}</strong>
                  <span className={styles.caseTag}>{c.tag}</span>
                </div>
                <div className={styles.caseResult}>{c.stat}</div>
                <p style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.5, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonial Wall */}
      <section id="proof" className={styles.testimonialSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.heroSticker}>DON&apos;T TAKE OUR WORD FOR IT</div>
          <h2 className={styles.sectionTitle}>UNFILTERED CLIENT PRAISE</h2>
        </div>

        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <div style={{ color: '#ff4757', fontSize: '1.2rem', marginBottom: '0.5rem' }}>★★★★★</div>
            <p className={styles.testimonialQuote}>
              &ldquo;They completely reinvented our brand tone. Within 30 days of launching the new site, our inbound demos skyrocketed by 280%.&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>Marcus Sterling</div>
            <div className={styles.testimonialRole}>CEO @ HyperDrive</div>
          </div>

          <div className={styles.testimonialCard}>
            <div style={{ color: '#ff4757', fontSize: '1.2rem', marginBottom: '0.5rem' }}>★★★★★</div>
            <p className={styles.testimonialQuote}>
              &ldquo;The fastest design-to-production turnaround I&apos;ve ever witnessed in 12 years of venture capital startups.&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>Elena Rostova</div>
            <div className={styles.testimonialRole}>Managing Partner @ Horizon VC</div>
          </div>

          <div className={styles.testimonialCard}>
            <div style={{ color: '#ff4757', fontSize: '1.2rem', marginBottom: '0.5rem' }}>★★★★★</div>
            <p className={styles.testimonialQuote}>
              &ldquo;Clean code, unforgettable visual punch, and zero fluff. Every dollar spent returned 5x in closed pipeline.&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>Devon Hayes</div>
            <div className={styles.testimonialRole}>Head of Growth @ Vortex</div>
          </div>
        </div>
      </section>

      {/* 7. Big Raw CTA */}
      <section id="pitch" className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>READY TO DOMINATE YOUR NICHE?</h2>
        <p className={styles.ctaSubtitle}>
          We take on only 2 new client partnerships per month. Tell us what you&apos;re building and let&apos;s assemble your unfair advantage.
        </p>
        <a
          href="mailto:contact@kineticstudio.com"
          style={{
            display: 'inline-block',
            background: '#ffe600',
            color: '#000000',
            fontSize: '1.3rem',
            fontWeight: 950,
            padding: '1.2rem 2.8rem',
            border: '4px solid #000000',
            boxShadow: '8px 8px 0px #000000',
            textDecoration: 'none',
          }}
        >
          CLAIM YOUR SPRINT SLOT 🔥
        </a>
      </section>

      {/* 8. Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>© {new Date().getFullYear()} KINETIC RAW CREATIVE STUDIO. NO BORING STUFF.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/demo" style={{ color: '#ffe600', textDecoration: 'none' }}>← DEMO HUB</Link>
            <Link href="/admin/pages" style={{ color: '#ffffff', textDecoration: 'none' }}>ADMIN PORTAL</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
