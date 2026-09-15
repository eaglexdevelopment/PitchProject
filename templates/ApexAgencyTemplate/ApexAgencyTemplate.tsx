'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pitch } from '@/types/pitch';
import styles from './ApexAgencyTemplate.module.css';

interface TemplateProps {
  pitch: Pitch;
}

export default function ApexAgencyTemplate({ pitch }: TemplateProps) {
  const { content } = pitch;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const primaryColor = content.branding?.primaryColor || '#ff5e00';
  const isLight = !content.branding?.darkBackground;

  // Render individual sections
  const renderHero = () => (
    <section key="sec-hero" className={styles.heroSection}>
      {content.hero?.badge && (
        <div className={styles.heroBadge}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: primaryColor,
            }}
          />
          {content.hero.badge}
        </div>
      )}

      <h1 className={styles.heroHeadline}>{content.hero?.headline}</h1>

      <p className={styles.heroSubheadline}>{content.hero?.subheadline}</p>

      <div className={styles.heroCtaGroup}>
        <a
          href={content.hero?.primaryCtaLink || '#contact'}
          className={styles.primaryHeroBtn}
          style={{ backgroundColor: primaryColor }}
        >
          {content.hero?.primaryCtaText || 'Get Started'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        {content.hero?.secondaryCtaText && (
          <a href={content.hero?.secondaryCtaLink || '#services'} className={styles.secondaryHeroBtn}>
            {content.hero.secondaryCtaText}
          </a>
        )}
      </div>

      {content.hero?.heroImageUrl && (
        <div className={styles.heroImageContainer}>
          <img
            src={content.hero.heroImageUrl}
            alt={`${pitch.clientName} platform preview`}
            className={styles.heroImg}
          />
        </div>
      )}
    </section>
  );

  const renderMarquee = () => {
    const marqueeItems = content.marquee?.items || [
      'Forbes',
      'Bloomberg',
      'TechCrunch',
      'Inc 5000',
      'Fast Company',
    ];

    return (
      <div
        key="sec-marquee"
        style={{
          padding: '2.5rem 1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: '#94a3b8',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
          }}
        >
          {content.marquee?.title || 'TRUSTED BY LEADING ENTERPRISES'}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {marqueeItems.map((brand, i) => (
            <span
              key={i}
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: isLight ? '#475569' : '#cbd5e1',
                opacity: 0.85,
                letterSpacing: '-0.02em',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderServices = () => {
    if (!content.services?.items?.length) return null;
    return (
      <section key="sec-services" id="services" className={styles.section}>
        <div className={styles.sectionHeader}>
          {content.services.badge && (
            <span className={styles.sectionBadge} style={{ color: primaryColor }}>
              {content.services.badge}
            </span>
          )}
          <h2 className={styles.sectionTitle}>{content.services.title}</h2>
          {content.services.subtitle && (
            <p className={styles.sectionSubtitle}>{content.services.subtitle}</p>
          )}
        </div>

        <div className={styles.servicesGrid}>
          {content.services.items.map((srv, idx) => (
            <div key={srv.id || idx} className={styles.serviceCard}>
              <div className={styles.cardIcon} style={{ color: primaryColor }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              {srv.badge && <span className={styles.cardBadge}>{srv.badge}</span>}
              <h3 className={styles.cardTitle}>{srv.title}</h3>
              <p className={styles.cardDesc}>{srv.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAbout = () => {
    if (!content.about) return null;
    return (
      <section key="sec-about" id="about" className={styles.section}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutLeft}>
            {content.about.badge && (
              <span className={styles.sectionBadge} style={{ color: primaryColor }}>
                {content.about.badge}
              </span>
            )}
            <h2 className={styles.sectionTitle}>{content.about.title}</h2>
            <p className={styles.aboutDescription}>{content.about.description}</p>

            {content.about.metrics?.length > 0 && (
              <div className={styles.metricsGrid}>
                {content.about.metrics.map((met, i) => (
                  <div key={met.id || i} className={styles.metricCard}>
                    <span className={styles.metricValue} style={{ color: primaryColor }}>
                      {met.value}
                    </span>
                    <span className={styles.metricLabel}>{met.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {content.about.imageUrl && (
            <div>
              <img
                src={content.about.imageUrl}
                alt="About capability"
                className={styles.aboutImage}
              />
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderPricing = () => {
    if (!content.pricing?.tiers?.length) return null;
    return (
      <section key="sec-pricing" id="pricing" className={styles.section}>
        <div className={styles.sectionHeader}>
          {content.pricing.badge && (
            <span className={styles.sectionBadge} style={{ color: primaryColor }}>
              {content.pricing.badge}
            </span>
          )}
          <h2 className={styles.sectionTitle}>{content.pricing.title}</h2>
          {content.pricing.subtitle && (
            <p className={styles.sectionSubtitle}>{content.pricing.subtitle}</p>
          )}
        </div>

        <div className={styles.servicesGrid}>
          {content.pricing.tiers.map((tier, idx) => (
            <div
              key={tier.id || idx}
              className={styles.serviceCard}
              style={
                tier.isPopular
                  ? {
                      borderColor: primaryColor,
                      boxShadow: `0 0 30px rgba(255, 94, 0, 0.15)`,
                    }
                  : {}
              }
            >
              {tier.isPopular && (
                <span
                  style={{
                    backgroundColor: primaryColor,
                    color: 'white',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    alignSelf: 'flex-start',
                  }}
                >
                  MOST POPULAR
                </span>
              )}
              <h3 className={styles.cardTitle}>{tier.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: primaryColor }}>
                  {tier.price}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/{tier.period}</span>
              </div>
              <p className={styles.cardDesc}>{tier.description}</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tier.features?.map((feat, fIdx) => (
                  <li key={fIdx} style={{ fontSize: '0.875rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: primaryColor, fontWeight: 'bold' }}>✓</span> {feat}
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaLink || '#contact'}
                className={styles.primaryHeroBtn}
                style={{ backgroundColor: primaryColor, marginTop: 'auto', textAlign: 'center', justifyContent: 'center' }}
              >
                {tier.ctaText || 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderTestimonials = () => {
    if (!content.testimonials?.items?.length) return null;
    return (
      <section key="sec-testimonials" id="reviews" className={styles.section}>
        <div className={styles.sectionHeader}>
          {content.testimonials.badge && (
            <span className={styles.sectionBadge} style={{ color: primaryColor }}>
              {content.testimonials.badge}
            </span>
          )}
          <h2 className={styles.sectionTitle}>{content.testimonials.title}</h2>
          {content.testimonials.subtitle && (
            <p className={styles.sectionSubtitle}>{content.testimonials.subtitle}</p>
          )}
        </div>

        <div className={styles.reviewsGrid}>
          {content.testimonials.items.map((review, i) => (
            <div key={review.id || i} className={styles.reviewCard}>
              <div className={styles.reviewStars}>
                {'★'.repeat(review.rating || 5)}
              </div>
              <p className={styles.reviewQuote}>"{review.content}"</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.authorAvatar}>
                  {review.name ? review.name.charAt(0) : 'U'}
                </div>
                <div>
                  <span className={styles.authorName}>{review.name}</span>
                  <span className={styles.authorRole}>
                    {review.role} {review.company ? `· ${review.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCtaBanner = () => {
    if (!content.ctaBanner) return null;
    return (
      <section key="sec-ctaBanner" id="contact" className={styles.section}>
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>{content.ctaBanner.title}</h2>
          <p className={styles.ctaDesc}>{content.ctaBanner.description}</p>
          <a
            href={content.ctaBanner.buttonLink || '#'}
            className={styles.primaryHeroBtn}
            style={{ backgroundColor: primaryColor }}
          >
            {content.ctaBanner.buttonText}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>
    );
  };

  const renderFaq = () => {
    if (!content.faq?.items?.length) return null;
    return (
      <section key="sec-faq" id="faq" className={styles.section}>
        <div className={styles.sectionHeader}>
          {content.faq.badge && (
            <span className={styles.sectionBadge} style={{ color: primaryColor }}>
              {content.faq.badge}
            </span>
          )}
          <h2 className={styles.sectionTitle}>{content.faq.title}</h2>
          {content.faq.subtitle && (
            <p className={styles.sectionSubtitle}>{content.faq.subtitle}</p>
          )}
        </div>

        <div className={styles.faqList}>
          {content.faq.items.map((item, idx) => (
            <div key={item.id || idx} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{item.question}</span>
                <span style={{ fontSize: '1.25rem', color: primaryColor }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </div>
              {openFaq === idx && <div className={styles.faqAnswer}>{item.answer}</div>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderContact = () => {
    if (!content.contact) return null;
    return (
      <section key="sec-contact" className={styles.section} style={{ textAlign: 'center' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge} style={{ color: primaryColor }}>
            {content.contact.badge || 'INQUIRIES'}
          </span>
          <h2 className={styles.sectionTitle}>{content.contact.title || 'Start Your Project'}</h2>
          <p className={styles.sectionSubtitle}>
            Direct communication channel for {pitch.clientName}
          </p>
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '1.5rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: primaryColor }}>
            📧 {content.contact.email}
          </div>
        </div>
      </section>
    );
  };

  // Section render mapping table
  const sectionRendererMap: Record<string, () => React.ReactNode> = {
    hero: renderHero,
    marquee: renderMarquee,
    services: renderServices,
    about: renderAbout,
    pricing: renderPricing,
    testimonials: renderTestimonials,
    ctaBanner: renderCtaBanner,
    faq: renderFaq,
    contact: renderContact,
  };

  const dynamicSections = content.sections || [
    { id: '1', type: 'hero', title: 'Hero', enabled: true, data: {} },
    { id: '2', type: 'marquee', title: 'Marquee', enabled: true, data: {} },
    { id: '3', type: 'services', title: 'Services', enabled: true, data: {} },
    { id: '4', type: 'about', title: 'About', enabled: true, data: {} },
    { id: '5', type: 'pricing', title: 'Pricing', enabled: true, data: {} },
    { id: '6', type: 'testimonials', title: 'Testimonials', enabled: true, data: {} },
    { id: '7', type: 'ctaBanner', title: 'CTA', enabled: true, data: {} },
    { id: '8', type: 'faq', title: 'FAQ', enabled: true, data: {} },
  ];

  return (
    <div
      className={`${styles.container} ${isLight ? styles.lightMode : ''}`}
      style={
        {
          '--primary-color': primaryColor,
          '--accent-color': content.branding?.accentColor || '#3b82f6',
        } as React.CSSProperties
      }
    >
      <div className={styles.glowBackground} />

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="#" className={styles.brandLogo}>
            <span className={styles.brandDot} style={{ backgroundColor: primaryColor }} />
            {content.navbar?.brandName || pitch.clientName}
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              {(content.navbar?.links || []).map((lnk, i) => (
                <li key={i}>
                  <a href={lnk.href} className={styles.navLink}>
                    {lnk.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={content.navbar?.ctaLink || '#contact'}
            className={styles.navCta}
            style={{ backgroundColor: primaryColor }}
          >
            {content.navbar?.ctaText || 'Get In Touch'}
          </a>
        </div>
      </header>

      {/* Render sections dynamically in order */}
      {dynamicSections
        .filter((sec) => sec.enabled !== false)
        .map((sec) => {
          const renderer = sectionRendererMap[sec.type];
          return renderer ? renderer() : null;
        })}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Link href="#" className={styles.brandLogo}>
              <span className={styles.brandDot} style={{ backgroundColor: primaryColor }} />
              {content.footer?.brandName || pitch.clientName}
            </Link>
            <p className={styles.footerDesc}>{content.footer?.description}</p>
          </div>

          <ul className={styles.footerLinks}>
            {(content.footer?.links || []).map((lnk, i) => (
              <li key={i}>
                <a href={lnk.href} className={styles.footerLink}>
                  {lnk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerBottom}>{content.footer?.copyright}</div>
      </footer>

      {/* Agency Watermark */}
      <a href="https://eaglex.co.in" target="_blank" rel="noreferrer" className={styles.agencyBadge}>
        <span>⚡ Pitch Concept by</span>
        <strong style={{ color: '#ff5e00' }}>EagleX</strong>
      </a>
    </div>
  );
}
