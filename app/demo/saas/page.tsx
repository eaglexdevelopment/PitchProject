'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './saas.module.css';

export default function SaasDemoPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'workflow' | 'security'>('analytics');
  const [activeLang, setActiveLang] = useState<'node' | 'python' | 'curl'>('node');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const codeSnippets = {
    node: `import { EagleX } from '@eaglex/sdk';

const client = new EagleX({ apiKey: process.env.EAGLEX_KEY });

// Deploy high-velocity micro-app
const deployment = await client.pitches.deploy({
  slug: 'enterprise-cloud-pitch',
  template: 'saas-minimal',
  realtimeTelemetries: true
});

console.log(\`Live at: \${deployment.url}\`);`,
    python: `from eaglex import EagleX

client = EagleX(api_key="sk_live_99214")

# Stream real-time pitch conversions
pitch = client.pitches.create(
    name="Acme Corp Enterprise Pitch",
    template="saas-minimal",
    auto_enrich=True
)

print(f"Active slug: {pitch.slug}")`,
    curl: `curl -X POST https://api.eaglex.cloud/v1/pitches \\
  -H "Authorization: Bearer sk_live_8912" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Fintech Alpha",
    "template": "saas-minimal"
  }'`
  };

  return (
    <div className={styles.container}>
      {/* 1. Announcement Bar */}
      <div className={styles.announcementBar}>
        🚀 <strong>EagleX Cloud 3.0 is live</strong> — Deploy instant dynamic pitches with sub-millisecond Edge caching. 
        <span className={styles.announcementLink}>Read Announcement →</span>
      </div>

      {/* 2. Sticky Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/demo" className={styles.brandLogo}>
            <div className={styles.logoBadge}>E</div>
            <span>EagleX Cloud</span>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#features" className={styles.navLink}>Platform</a></li>
              <li><a href="#developers" className={styles.navLink}>Developers</a></li>
              <li><a href="#metrics" className={styles.navLink}>Telemetries</a></li>
              <li><a href="#pricing" className={styles.navLink}>Pricing</a></li>
              <li><a href="#faq" className={styles.navLink}>FAQ</a></li>
            </ul>
          </nav>

          <div className={styles.navActions}>
            <Link href="/demo" className={styles.signInLink}>← All Themes</Link>
            <a href="#pricing" className={styles.primaryCta}>Start Free Trial</a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroPill}>
          <span>⚡</span> Next-Gen Real-Time Pitch Infrastructure
        </div>

        <h1 className={styles.heroTitle}>
          Build, ship, & track high-stakes <span className={styles.heroTitleHighlight}>client pitches</span> at hyperspeed.
        </h1>

        <p className={styles.heroSubtitle}>
          The unified developer platform for high-velocity agencies and tech companies. Deploy custom proposal portals with automated AI enrichment in under 60 seconds.
        </p>

        <div className={styles.heroButtons}>
          <a href="#pricing" className={styles.heroCtaPrimary}>
            Launch Console Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#developers" className={styles.heroCtaSecondary}>
            View API Docs
          </a>
        </div>

        {/* 4. Interactive Product Sandbox */}
        <div className={styles.productWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowControls}>
              <div className={styles.dotRed}></div>
              <div className={styles.dotYellow}></div>
              <div className={styles.dotGreen}></div>
            </div>

            <div className={styles.tabGroup}>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabBtnActive : ''}`}
              >
                📊 Realtime Analytics
              </button>
              <button 
                onClick={() => setActiveTab('workflow')}
                className={`${styles.tabBtn} ${activeTab === 'workflow' ? styles.tabBtnActive : ''}`}
              >
                ⚡ Edge Pipelines
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`${styles.tabBtn} ${activeTab === 'security' ? styles.tabBtnActive : ''}`}
              >
                🛡️ SOC-2 Compliance
              </button>
            </div>
          </div>

          <div className={styles.windowBody}>
            {activeTab === 'analytics' && (
              <div>
                <div className={styles.analyticsGrid}>
                  <div className={styles.analyticsCard}>
                    <div className={styles.analyticsLabel}>
                      <span>Pitch Views Today</span>
                      <span className={styles.analyticsDelta}>+34.2%</span>
                    </div>
                    <div className={styles.analyticsValue}>14,892</div>
                  </div>

                  <div className={styles.analyticsCard}>
                    <div className={styles.analyticsLabel}>
                      <span>Average Engagement</span>
                      <span className={styles.analyticsDelta}>+18.7%</span>
                    </div>
                    <div className={styles.analyticsValue}>4m 32s</div>
                  </div>

                  <div className={styles.analyticsCard}>
                    <div className={styles.analyticsLabel}>
                      <span>Proposal Win Rate</span>
                      <span className={styles.analyticsDelta}>+62.0%</span>
                    </div>
                    <div className={styles.analyticsValue}>78.4%</div>
                  </div>
                </div>

                <div className={styles.chartContainer}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0' }}>Pitch Viewer Traffic (Last 7 Days)</span>
                    <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>Live Stream Active</span>
                  </div>
                  <div className={styles.chartBarGroup}>
                    {[
                      { day: 'Mon', h: '45%' },
                      { day: 'Tue', h: '65%' },
                      { day: 'Wed', h: '82%' },
                      { day: 'Thu', h: '54%' },
                      { day: 'Fri', h: '95%' },
                      { day: 'Sat', h: '70%' },
                      { day: 'Sun', h: '88%' }
                    ].map((item, i) => (
                      <div key={i} className={styles.chartBarCol}>
                        <div className={styles.chartBar} style={{ height: item.h }}></div>
                        <span className={styles.chartBarDay}>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div style={{ padding: '1rem', color: '#cbd5e1' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.2rem' }}>Automated AI Enrichment Pipeline</h4>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Every time your sales team pastes a client brief, EagleX runs multi-stage vector search across your firm&apos;s case studies, pricing sheets, and past winning proposals.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ background: '#171d31', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.25rem' }}>1. Ingestion</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Client brief parsed & tokenized</div>
                  </div>
                  <div style={{ background: '#171d31', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ color: '#a855f7', fontWeight: 700, marginBottom: '0.25rem' }}>2. Semantic Match</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Best layout & sections selected</div>
                  </div>
                  <div style={{ background: '#171d31', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.25rem' }}>3. Edge Delivery</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Generated URL ready to share</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ padding: '1rem', color: '#cbd5e1' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.2rem' }}>Bank-Grade Security Architecture</h4>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Keep your sensitive enterprise contract numbers and proposal data strictly confidential with end-to-end encrypted Firestore vaults and signed token access.
                </p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span> SOC-2 Type II Certified
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span> AES-256 GCM Data Encryption
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span> SSO / SAML 2.0 Ready
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Bento Grid Features */}
      <section id="features" className={styles.bentoSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Engineered For Speed</div>
          <h2 className={styles.sectionHeading}>Everything You Need To Close Enterprise Deals</h2>
          <p className={styles.sectionSub}>A purpose-built suite of sales engineering and dynamic presentation tools.</p>
        </div>

        <div className={styles.bentoGrid}>
          <div className={`${styles.bentoCard} ${styles.bentoColSpan2}`}>
            <div>
              <div className={styles.bentoIcon}>⚡</div>
              <h3 className={styles.bentoTitle}>Sub-30ms Global Edge Delivery</h3>
              <p className={styles.bentoDesc}>
                Our multi-region edge caches prerender every pitch page so your prospective Fortune 500 clients experience instantaneous page loads anywhere in the world.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem', background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Global Average TTFB: <strong style={{ color: '#10b981' }}>18ms</strong></span>
              <span>Lighthouse Score: <strong style={{ color: '#10b981' }}>100/100</strong></span>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div>
              <div className={styles.bentoIcon}>🔒</div>
              <h3 className={styles.bentoTitle}>NDA & Password Gating</h3>
              <p className={styles.bentoDesc}>
                Lock individual pitch links behind verified corporate emails, one-time passwords, or instant digital NDA signatures.
              </p>
            </div>
          </div>

          <div className={styles.bentoCard}>
            <div>
              <div className={styles.bentoIcon}>📈</div>
              <h3 className={styles.bentoTitle}>Realtime Heatmaps</h3>
              <p className={styles.bentoDesc}>
                Know precisely which slide, pricing matrix tier, or case study your client spent 5 minutes reviewing before they reply.
              </p>
            </div>
          </div>

          <div className={`${styles.bentoCard} ${styles.bentoColSpan2}`}>
            <div>
              <div className={styles.bentoIcon}>🤖</div>
              <h3 className={styles.bentoTitle}>AI Auto-Enrichment from Client URL</h3>
              <p className={styles.bentoDesc}>
                Simply type the prospect&apos;s website domain. Our AI crawler extracts their brand palette, logo, value proposition, and automatically seeds the proposal.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ background: '#1e293b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#38bdf8' }}>LangChain RAG</span>
              <span style={{ background: '#1e293b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#a855f7' }}>Auto Logo Fetch</span>
              <span style={{ background: '#1e293b', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#10b981' }}>Tone Alignment</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Developer API Sandbox */}
      <section id="developers" className={styles.codeSection}>
        <div>
          <div className={styles.sectionTag}>Developer First</div>
          <h2 className={styles.sectionHeading} style={{ textAlign: 'left' }}>
            Integrate with your CRM & Zapier in 3 lines of code.
          </h2>
          <p className={styles.sectionSub} style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
            Trigger customized pitch generation automatically whenever a deal reaches the &quot;Proposal Requested&quot; stage in Salesforce or HubSpot.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> Webhook support for instant slack alerts on page view
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> TypeScript, Python, and Go official SDKs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span style={{ color: '#10b981' }}>✓</span> 99.99% Guaranteed SLA uptime
            </div>
          </div>
        </div>

        <div className={styles.codeBox}>
          <div className={styles.codeHeader}>
            <div className={styles.langTabs}>
              <button 
                onClick={() => setActiveLang('node')}
                className={`${styles.langTab} ${activeLang === 'node' ? styles.langTabActive : ''}`}
              >
                Node.js
              </button>
              <button 
                onClick={() => setActiveLang('python')}
                className={`${styles.langTab} ${activeLang === 'python' ? styles.langTabActive : ''}`}
              >
                Python
              </button>
              <button 
                onClick={() => setActiveLang('curl')}
                className={`${styles.langTab} ${activeLang === 'curl' ? styles.langTabActive : ''}`}
              >
                cURL
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>v3.4.0</span>
          </div>
          <pre className={styles.codeContent}>
            <code>{codeSnippets[activeLang]}</code>
          </pre>
        </div>
      </section>

      {/* 7. Interactive Pricing Section */}
      <section id="pricing" className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Transparent Tiers</div>
          <h2 className={styles.sectionHeading}>Predictable Pricing for Growing Agencies</h2>
          <p className={styles.sectionSub}>Choose the plan that matches your monthly pitch volume.</p>
        </div>

        <div className={styles.billingToggle}>
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`${styles.billingToggleBtn} ${billingCycle === 'monthly' ? styles.billingToggleBtnActive : ''}`}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setBillingCycle('annual')}
            className={`${styles.billingToggleBtn} ${billingCycle === 'annual' ? styles.billingToggleBtnActive : ''}`}
          >
            Annual Billing <span className={styles.discountBadge}>SAVE 20%</span>
          </button>
        </div>

        <div className={styles.pricingGrid}>
          {/* Starter */}
          <div className={styles.pricingCard}>
            <h3 className={styles.tierName}>Growth</h3>
            <p className={styles.tierDesc}>Ideal for boutique studios and freelance consultants.</p>
            <div className={styles.tierPrice}>
              {billingCycle === 'annual' ? '$49' : '$59'}
              <span className={styles.tierPeriod}> / month</span>
            </div>
            <ul className={styles.tierFeatures}>
              <li className={styles.tierFeature}><span>✓</span> Up to 15 Active Pitch Links</li>
              <li className={styles.tierFeature}><span>✓</span> 10 Bespoke Themes</li>
              <li className={styles.tierFeature}><span>✓</span> AI Content Auto-Fill</li>
              <li className={styles.tierFeature}><span>✓</span> Basic Viewer Analytics</li>
            </ul>
            <button className={styles.tierBtn}>Select Growth</button>
          </div>

          {/* Pro (Popular) */}
          <div className={`${styles.pricingCard} ${styles.popularPricingCard}`}>
            <div className={styles.popularBadge}>MOST POPULAR</div>
            <h3 className={styles.tierName}>Scale Agency</h3>
            <p className={styles.tierDesc}>For scaling digital agencies delivering high-volume pitches.</p>
            <div className={styles.tierPrice}>
              {billingCycle === 'annual' ? '$119' : '$149'}
              <span className={styles.tierPeriod}> / month</span>
            </div>
            <ul className={styles.tierFeatures}>
              <li className={styles.tierFeature}><span>✓</span> <strong>Unlimited</strong> Pitch Links</li>
              <li className={styles.tierFeature}><span>✓</span> Custom Domain Routing</li>
              <li className={styles.tierFeature}><span>✓</span> Real-Time Viewer Heatmaps</li>
              <li className={styles.tierFeature}><span>✓</span> Team Multi-Seat Access</li>
              <li className={styles.tierFeature}><span>✓</span> Priority API Webhooks</li>
            </ul>
            <button className={`${styles.tierBtn} ${styles.tierBtnPrimary}`}>Start 14-Day Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className={styles.pricingCard}>
            <h3 className={styles.tierName}>Enterprise</h3>
            <p className={styles.tierDesc}>Dedicated infrastructure and custom SLAs for global firms.</p>
            <div className={styles.tierPrice}>
              {billingCycle === 'annual' ? '$399' : '$499'}
              <span className={styles.tierPeriod}> / month</span>
            </div>
            <ul className={styles.tierFeatures}>
              <li className={styles.tierFeature}><span>✓</span> Dedicated Edge Clusters</li>
              <li className={styles.tierFeature}><span>✓</span> Custom Design System Engine</li>
              <li className={styles.tierFeature}><span>✓</span> SAML SSO & Audit Logs</li>
              <li className={styles.tierFeature}><span>✓</span> 24/7 Dedicated Account Director</li>
            </ul>
            <button className={styles.tierBtn}>Talk to Enterprise</button>
          </div>
        </div>
      </section>

      {/* 8. Collapsible FAQ */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Got Questions?</div>
          <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
        </div>

        {[
          {
            q: 'Can I connect our agency custom domain to pitch pages?',
            a: 'Yes. On the Scale and Enterprise plans, you can map your custom domain (e.g., pitches.youragency.com) with automatic SSL certification.'
          },
          {
            q: 'How does the AI Auto-Fill feature work?',
            a: 'When you paste raw notes or bullet points about a prospective client, our LangChain-powered engine formats it into high-converting headlines, value props, and bespoke pricing matrices tailored to the chosen template.'
          },
          {
            q: 'Can I password protect confidential client proposals?',
            a: 'Yes, every pitch can be secured with a PIN code, client email verification gate, or auto-expiring timer.'
          }
        ].map((item, idx) => (
          <div key={idx} className={styles.faqItem}>
            <button 
              className={styles.faqHeader}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span>{item.q}</span>
              <span>{openFaq === idx ? '−' : '+'}</span>
            </button>
            {openFaq === idx && (
              <div className={styles.faqContent}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 9. Minimal Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>© {new Date().getFullYear()} EagleX Cloud Technologies Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/demo" style={{ color: '#94a3b8', textDecoration: 'none' }}>Theme Showcase</Link>
            <Link href="/admin/pages" style={{ color: '#94a3b8', textDecoration: 'none' }}>Admin Console</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
