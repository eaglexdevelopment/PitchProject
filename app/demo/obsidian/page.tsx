'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './obsidian.module.css';

export default function ObsidianDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    capital: '$10M - $50M',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      {/* 1. Header */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/demo" className={styles.brandLogo}>
            <div className={styles.logoGem}>◆</div>
            <span>Obsidian Capital</span>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#thesis" className={styles.navLink}>Investment Thesis</a></li>
              <li><a href="#governance" className={styles.navLink}>Governance</a></li>
              <li><a href="#performance" className={styles.navLink}>Performance</a></li>
              <li><a href="#advisory" className={styles.navLink}>Advisory Board</a></li>
            </ul>
          </nav>

          <a href="#intake" className={styles.navCta}>
            Confidential Inquiry
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroTag}>
          <span>◆</span> Institutional Private Equity & Sovereign Wealth Architecture
        </div>

        <h1 className={styles.heroTitle}>
          Preserving and compounding generational wealth with <span className={styles.heroEmerald}>uncompromising rigor</span>.
        </h1>

        <p className={styles.heroDesc}>
          Advising ultra-high-net-worth families, enterprise founders, and institutional sovereign funds across global alternative investments, private credit, and cross-border M&A.
        </p>

        <div className={styles.heroStatsRow}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>$3.8B+</div>
            <div className={styles.statLabel}>Capital Advised</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statValue}>26.4%</div>
            <div className={styles.statLabel}>Net 10-Yr IRR</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statValue}>42</div>
            <div className={styles.statLabel}>Active Portfolio Firms</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statValue}>Zero</div>
            <div className={styles.statLabel}>Capital Impairments</div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars */}
      <section id="thesis" className={styles.pillarsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.heroTag}>DISCIPLINED CAPITAL ALLOCATION</div>
          <h2 className={styles.sectionHeading}>The Obsidian Investment Philosophy</h2>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div>
              <div className={styles.pillarNumber}>PILLAR 01 // ASYMMETRY</div>
              <h3 className={styles.pillarTitle}>Direct Private Credit & Real Assets</h3>
              <p className={styles.pillarDesc}>
                Senior secured debt facilities backed by institutional infrastructure and mission-critical enterprise software cash flows.
              </p>
            </div>
          </div>

          <div className={styles.pillarCard}>
            <div>
              <div className={styles.pillarNumber}>PILLAR 02 // GOVERNANCE</div>
              <h3 className={styles.pillarTitle}>Majority Control Buyouts</h3>
              <p className={styles.pillarDesc}>
                Partnering with founder-led market champions generating $10M–$50M EBITDA with deep competitive moats and margin expansion runway.
              </p>
            </div>
          </div>

          <div className={styles.pillarCard}>
            <div>
              <div className={styles.pillarNumber}>PILLAR 03 // LIQUIDITY</div>
              <h3 className={styles.pillarTitle}>Sovereign Risk Mitigation</h3>
              <p className={styles.pillarDesc}>
                Jurisdictional diversification across Switzerland, Singapore, and North America with strict capital preservation mandates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Confidential Intake Form */}
      <section id="intake" className={styles.intakeSection}>
        <div className={styles.intakeCard}>
          <div className={styles.intakeHeader}>
            <div className={styles.heroTag} style={{ justifyContent: 'center' }}>ENCRYPTED CHANNEL</div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
              Request Confidential Memorandum
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
              Direct access is restricted to qualified institutional buyers and family office principals.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛡️</div>
              <h3 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>Inquiry Received Under NDA</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                Thank you, <strong>{formData.name}</strong>. Our senior partner will transmit the encrypted diligence vault credentials to <strong>{formData.email}</strong> within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div>
                <label className={styles.formLabel}>Principal / Officer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / Dr. Alexander Vance"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Institution / Family Office</label>
                <input
                  type="text"
                  placeholder="Vance Heritage Partners LLC"
                  className={styles.formInput}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Confidential Email *</label>
                <input
                  type="email"
                  required
                  placeholder="principal@vancepartners.ch"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Deployment Mandate Size</label>
                <select
                  className={styles.formInput}
                  value={formData.capital}
                  onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                >
                  <option value="$5M - $10M">$5M - $10M</option>
                  <option value="$10M - $50M">$10M - $50M</option>
                  <option value="$50M - $250M">$50M - $250M</option>
                  <option value="$250M+">$250M+ (Sovereign Allocation)</option>
                </select>
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Specific Allocation Thesis or Mandate</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your liquidity horizon, geographic target, and return threshold..."
                  className={styles.formInput}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className={styles.formGroupFull} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                <input type="checkbox" required defaultChecked id="ndaCheck" />
                <label htmlFor="ndaCheck">I certify that I am a Qualified Institutional Buyer or Accredited Investor.</label>
              </div>

              <div className={styles.formGroupFull}>
                <button type="submit" className={styles.submitBtn}>
                  Request Encrypted Diligence Package →
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>© {new Date().getFullYear()} OBSIDIAN CAPITAL GROUP AG. ZURICH • LONDON • NEW YORK.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/demo" style={{ color: '#34d399', textDecoration: 'none' }}>Theme Directory</Link>
            <Link href="/admin/pages" style={{ color: '#cbd5e1', textDecoration: 'none' }}>EagleX Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
