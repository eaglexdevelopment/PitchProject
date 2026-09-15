'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pitch } from '@/types/pitch';
import styles from './dental.module.css';

interface TemplateProps {
  pitch: Pitch;
}

// --- Custom Hand-Crafted SVGs ---
const Icons = {
  ToothSpark: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9.5 2 7 3.5 6 6C5 8.5 5 12 5 15C5 18 6.5 22 8.5 22C10.5 22 11 19 12 19C13 19 13.5 22 15.5 22C17.5 22 19 18 19 15C19 12 19 8.5 18 6C17 3.5 14.5 2 12 2Z" />
      <path d="M9 7C9.5 6.5 10.5 6 12 6" strokeDasharray="1 2" />
    </svg>
  ),
  ToothWireframe: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C9.5 2 7 3.5 6 6C5 8.5 5 12 5 15C5 18 6.5 22 8.5 22C10.5 22 11 19 12 19C13 19 13.5 22 15.5 22C17.5 22 19 18 19 15C19 12 19 8.5 18 6C17 3.5 14.5 2 12 2Z" />
      <line x1="6" y1="9" x2="18" y2="9" strokeDasharray="2 2" />
      <line x1="6" y1="14" x2="18" y2="14" strokeDasharray="2 2" />
      <line x1="12" y1="4" x2="12" y2="19" strokeDasharray="2 2" />
    </svg>
  ),
  VeneersCrown: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18L4 7L8 11L12 4L16 11L20 7L22 18H2Z" />
      <path d="M12 14C12 14 10 16 12 18" />
    </svg>
  ),
  DiamondAligner: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3H18L22 9L12 22L2 9L6 3Z" />
      <path d="M2 9H22" />
      <path d="M12 22L8 9L12 3L16 9L12 22Z" />
    </svg>
  ),
  Implant3D: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2V8" />
      <path d="M7 8H17L15 22H9L7 8Z" />
      <path d="M8 12H16" />
      <path d="M9 16H15" />
    </svg>
  ),
  SedationShield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22S4 18 4 10V4L12 2L20 4V10C20 18 12 22 12 22Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  ),
  LaserWave: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  AirwaySleep: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3A9 9 0 1 0 21 12A9 9 0 0 1 12 3Z" />
      <path d="M14 9H18L14 15H18" />
    </svg>
  ),
  Star: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Phone: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92V19.92C22 20.48 21.54 20.94 20.98 20.94C10.45 20.42 3.58 13.55 3.06 3.02C3.06 2.46 3.52 2 4.08 2H7.08C7.58 2 8 2.37 8.08 2.87C8.21 3.72 8.44 4.54 8.76 5.32C8.91 5.67 8.81 6.08 8.52 6.34L6.96 7.64C8.28 10.42 10.58 12.72 13.36 14.04L14.66 12.48C14.92 12.19 15.33 12.09 15.68 12.24C16.46 12.56 17.28 12.79 18.13 12.92C18.63 13 19 13.42 19 13.92V16.92H22Z" />
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  TvScreen: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  AromaPlant: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 2 4C2 9 5 14 12 12Z" />
      <path d="M12 12C12 7 17 4 22 4C22 9 19 14 12 12Z" />
    </svg>
  ),
  LoungeChair: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 19V21" />
      <path d="M18 19V21" />
      <path d="M4 11V15C4 16.1 4.9 17 6 17H18C19.1 17 20 16.1 20 15V11" />
      <path d="M6 11V6C6 4.9 6.9 4 8 4H16C17.1 4 18 4.9 18 6V11" />
    </svg>
  ),
};

export default function DentalMedicalTemplate({ pitch }: TemplateProps) {
  const content = pitch.content;

  // Images with defaults
  const doctorImg = content.hero?.doctorImageUrl || '/images/dental/dr_sarah_jenkins.jpg';
  const beforeImg = content.hero?.beforeImageUrl || '/images/dental/smile_before.jpg';
  const afterImg = content.hero?.afterImageUrl || '/images/dental/smile_after.jpg';
  const clinicImg = content.hero?.clinicImageUrl || '/images/dental/treatment_suite.jpg';
  const phone = content.contact?.phone || '(214) 880-9920';
  const brandName = content.navbar?.brandName || pitch.clientName || 'Aurora Dental Studio';

  // 1. Hero Mode Switcher State
  const [heroMode, setHeroMode] = useState<'veneers' | 'invisalign' | 'laser'>('veneers');

  // 2. Before & After Slider State
  const [sliderPos, setSliderPos] = useState(50);

  // 3. 3-Step Booking Funnel State
  const [funnelStep, setFunnelStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('Porcelain Veneers');
  const [preferredTime, setPreferredTime] = useState('Morning (8:00 AM – 12:00 PM)');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // 4. Financing Calculator State
  const [calcCost, setCalcCost] = useState(5200);
  const [calcInsurance, setCalcInsurance] = useState(1800);
  const [calcMonths, setCalcMonths] = useState(24);

  // 5. FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroModes = {
    veneers: {
      tag: 'Biomimetic 3D Scan',
      val: 'Enamel Purity: 99.4%',
      sub: 'Shade: OM1 Natural Translucent',
      quote: '“Zero pain in 2 visits. Changed my life!”',
      author: 'Sarah M. (Veneers Patient)'
    },
    invisalign: {
      tag: 'iTero 5D Optical Map',
      val: 'Arch Symmetry: 99.8%',
      sub: 'SmartTrack Clear Orthodontics',
      quote: '“No metal brackets. 6 months to perfection.”',
      author: 'David R. (Invisalign Patient)'
    },
    laser: {
      tag: 'Hydro-Kinetic Laser',
      val: 'Cellular Healing: 4X Speed',
      sub: 'Needle-Free & Drill-Free',
      quote: '“I didn’t even feel the laser at all.”',
      author: 'Elena T. (Laser Patient)'
    }
  };

  const currentHud = heroModes[heroMode];

  const concerns = [
    { id: 'veneers', title: 'Porcelain Veneers', sub: 'Custom hand-layered aesthetic smile design', IconComp: Icons.VeneersCrown },
    { id: 'invisalign', title: 'Invisalign Aligners', sub: 'Clear orthodontic teeth straightening', IconComp: Icons.DiamondAligner },
    { id: 'emergency', title: 'Urgent Emergency Care', sub: 'Same-day pain relief & restoration', IconComp: Icons.LaserWave },
    { id: 'implants', title: 'Guided 3D Implants', sub: 'Permanent titanium/zirconia root replacement', IconComp: Icons.Implant3D },
    { id: 'sedation', title: 'Anxiety-Free Sedation', sub: 'Zero-fear comfortable twilight sleep', IconComp: Icons.SedationShield },
    { id: 'sleep', title: 'Sleep Apnea & TMJ', sub: 'Non-surgical medical airway orthotics', IconComp: Icons.AirwaySleep },
  ];

  const treatments = [
    {
      id: 'veneers',
      name: 'Hand-Layered Porcelain Veneers',
      duration: '2 Studio Visits',
      IconComp: Icons.VeneersCrown,
      desc: 'Individually sculpted ultra-thin feldspathic porcelain laminates designed to harmonize with your facial symmetry and natural enamel translucency.',
      points: ['Digital 3D smile mockup preview', 'Minimally invasive biomimetic prep', 'Stain-resistant 20+ year longevity'],
      insurance: 'Partial Aesthetic Coverage / 0% Financing'
    },
    {
      id: 'invisalign',
      name: 'Invisalign Diamond Provider',
      duration: '4 – 9 Months',
      IconComp: Icons.DiamondAligner,
      desc: 'High-precision iTero Element 5D digital scanning paired with custom SmartTrack aligners for discreet orthodontic alignment without metal brackets.',
      points: ['Zero physical impression putty', 'Remote iOS/Android weekly check-ins', 'Includes complimentary laser whitening'],
      insurance: 'Up to $2,500 PPO Orthodontic Benefit'
    },
    {
      id: 'implants',
      name: 'Computer-Guided 3D Implants',
      duration: 'Same-Day Placement',
      IconComp: Icons.Implant3D,
      desc: 'Biocompatible ceramic zirconia and titanium implants placed using 3D Cone Beam CT surgical guides for permanent, natural-feeling restorations.',
      points: ['Sub-millimeter robotic accuracy', '99.4% clinical osseointegration', 'Lifetime structural foundation warranty'],
      insurance: 'Major Restorative PPO Accepted'
    },
    {
      id: 'sedation',
      name: 'Anxiety-Free Twilight Sedation',
      duration: 'Zero Pain',
      IconComp: Icons.SedationShield,
      desc: 'Designed specifically for patients with dental apprehension. Sleep comfortably through your procedure with board-certified twilight sedation.',
      points: ['Wake up with full treatment complete', 'Zero memory of the procedure', 'Continuous vital telemetry monitoring'],
      insurance: 'Available across all clinical treatments'
    },
    {
      id: 'laser',
      name: 'Hydro-Kinetic Laser Dentistry',
      duration: '30 Minutes',
      IconComp: Icons.LaserWave,
      desc: 'Biolase Waterlase technology replaces traditional drills with water and light energy for needle-free cavity preps and gum contouring.',
      points: ['No needles or lingering numbness', 'Accelerated micro-cellular healing', 'Zero bleeding or surgical sutures'],
      insurance: 'Standard Restorative Billing Codes'
    },
    {
      id: 'tmj',
      name: 'Sleep Apnea & TMJ Airway',
      duration: 'Custom Orthotic',
      IconComp: Icons.AirwaySleep,
      desc: 'Custom medical oral appliances engineered to stop heavy snoring, relieve TMJ tension headaches, and restore restorative REM sleep.',
      points: ['FDA-cleared medical device', 'CPAP-free comfortable sleep', 'Prevents night-time bruxism wear'],
      insurance: 'Medical Insurance Direct Reimbursement'
    }
  ];

  const netFinancing = Math.max(0, calcCost - calcInsurance);
  const monthlyEst = Math.round(netFinancing / calcMonths);

  const handleFunnelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please fill out your contact details.');
      return;
    }
    setBookingConfirmed(true);
  };

  return (
    <div className={styles.container}>
      {/* 1. Top Concierge & Emergency Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.emergencyBadge}>
            <div className={styles.pulseDot}></div>
            <span>Accepting New Patients This Week • 24/7 Concierge Hotline</span>
          </div>

          <div className={styles.topLinks}>
            <span>Mon – Fri: 7:30 AM – 6:30 PM • Sat: 8:30 AM – 3:00 PM</span>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className={styles.topPhone}>
              <Icons.Phone /> {phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Luxury Sticky Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="#hero" className={styles.brandLogo}>
            <div className={styles.logoMonogram}>
              <Icons.ToothSpark />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>{brandName}</span>
              <span className={styles.brandSub}>Aesthetic & Clinical Excellence</span>
            </div>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#hero" className={styles.navLink}>Experience</a></li>
              <li><a href="#transformations" className={styles.navLink}>Transformations</a></li>
              <li><a href="#treatments" className={styles.navLink}>Specialties</a></li>
              <li><a href="#comfort" className={styles.navLink}>Spa Comfort</a></li>
              <li><a href="#financing" className={styles.navLink}>Financing & Insurance</a></li>
              <li><a href="#faq" className={styles.navLink}>FAQ</a></li>
            </ul>
          </nav>

          <a href="#booking" className={styles.navCta}>
            <Icons.Clock /> {content.navbar?.ctaText || 'Reserve Studio Visit'}
          </a>
        </div>
      </header>

      {/* 3. Hero Section */}
      <div className={styles.heroWrapper}>
        <div className={styles.auroraMeshBg}></div>
        <div className={styles.auroraMeshLeft}></div>

        <section id="hero" className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <Icons.DiamondAligner /> {content.hero?.badge || 'Voted #1 Cosmetic Practice in Dallas 2026'}
            </div>

            <h1 className={styles.heroTitle}>
              {content.hero?.headline?.includes('.') ? (
                <>
                  {content.hero.headline.split('.')[0]}. <br />
                  <span className={styles.headlineItalic}>{content.hero.headline.split('.').slice(1).join('.')}</span>
                </>
              ) : (
                content.hero?.headline || (
                  <>
                    Modern Aesthetics. <br />
                    <span className={styles.headlineItalic}>Gentle Precision.</span>
                  </>
                )
              )}
            </h1>

            <p className={styles.heroDesc}>
              {content.hero?.subheadline ||
                'Elevating dental care to an art form. From custom hand-layered porcelain veneers to zero-pain sedation, experience clinical excellence in an anxiety-free luxury environment.'}
            </p>

            {/* Interactive Mode Switcher for Live HUD */}
            <div className={styles.modeSwitcherContainer}>
              <div className={styles.modeSwitcherLabel}>Explore Clinical Specialties:</div>
              <div className={styles.modeChipsGroup}>
                <button
                  className={`${styles.modeChip} ${heroMode === 'veneers' ? styles.modeChipActive : ''}`}
                  onClick={() => setHeroMode('veneers')}
                >
                  <Icons.VeneersCrown /> Porcelain Veneers
                </button>
                <button
                  className={`${styles.modeChip} ${heroMode === 'invisalign' ? styles.modeChipActive : ''}`}
                  onClick={() => setHeroMode('invisalign')}
                >
                  <Icons.DiamondAligner /> Invisalign
                </button>
                <button
                  className={`${styles.modeChip} ${heroMode === 'laser' ? styles.modeChipActive : ''}`}
                  onClick={() => setHeroMode('laser')}
                >
                  <Icons.LaserWave /> Laser Dentistry
                </button>
              </div>
            </div>

            <div className={styles.heroActions}>
              <a href="#booking" className={styles.primaryCtaBtn}>
                {content.hero?.primaryCtaText || 'Schedule Consultation'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a href="#transformations" className={styles.secondaryPlayBtn}>
                <div className={styles.playCircle}>▶</div>
                <span>{content.hero?.secondaryCtaText || 'View Smile Gallery'}</span>
              </a>
            </div>

            <div className={styles.trustStrip}>
              <div className={styles.trustReviewBlock}>
                <div className={styles.starsRow}>
                  <Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star />
                  <strong style={{ color: '#0f172a', marginLeft: '6px', fontSize: '0.9rem' }}>4.99 / 5.0</strong>
                </div>
                <span className={styles.trustLabel}>1,420+ Verified Patient Reviews</span>
              </div>

              <div className={styles.trustBadgeItem}>
                <div style={{ color: '#0d9488' }}><Icons.Check /></div>
                <span>Invisalign Diamond Provider</span>
              </div>

              <div className={styles.trustBadgeItem}>
                <div style={{ color: '#0d9488' }}><Icons.Check /></div>
                <span>30+ PPO Plans Accepted</span>
              </div>
            </div>
          </div>

          {/* Doctor Visual Stage */}
          <div className={styles.doctorStage}>
            <div className={styles.radarRing1}></div>
            <div className={styles.radarRing2}></div>

            {/* Live 3D Tooth Scanner Widget */}
            <div className={styles.hudScannerWidget}>
              <div className={styles.toothScannerFrame}>
                <Icons.ToothWireframe />
                <div className={styles.laserScanline}></div>
              </div>
              <div className={styles.hudTelemetryMeta}>
                <span className={styles.hudTag}>{currentHud.tag}</span>
                <span className={styles.hudValue}>{currentHud.val}</span>
                <span className={styles.hudSub}>{currentHud.sub}</span>
              </div>
            </div>

            {/* Doctor Portrait Portal */}
            <div className={styles.doctorCardPortal}>
              <Image
                src={doctorImg}
                alt="Doctor Portrait"
                width={440}
                height={560}
                className={styles.doctorImage}
                priority
              />
            </div>

            {/* Live Audio Equalizer Testimonial Widget */}
            <div className={styles.hudAudioWidget}>
              <div className={styles.audioEqualizer}>
                <div className={`${styles.eqBar} ${styles.eqBar1}`}></div>
                <div className={`${styles.eqBar} ${styles.eqBar2}`}></div>
                <div className={`${styles.eqBar} ${styles.eqBar3}`}></div>
                <div className={`${styles.eqBar} ${styles.eqBar4}`}></div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Verified Patient Audio
                </div>
                <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                  {currentHud.quote}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  {currentHud.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Luxury Infinite Trust Ribbon */}
        <div className={styles.ribbonWrap}>
          <div className={styles.ribbonTrack}>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Harvard Dental Clinical Faculty</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> ADA Certified 2026</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> 100% Pain-Free Sedation Guarantee</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Top 1% Invisalign Diamond Provider</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Same-Day Ceramic CEREC Restorations</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> 1,420+ 5-Star Verified Reviews</div>
            {/* Duplicated for infinite loop */}
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Harvard Dental Clinical Faculty</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> ADA Certified 2026</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> 100% Pain-Free Sedation Guarantee</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Top 1% Invisalign Diamond Provider</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> Same-Day Ceramic CEREC Restorations</div>
            <div className={styles.ribbonItem}><div className={styles.ribbonDot}></div> 1,420+ 5-Star Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* 5. Real-Photo Before & After Smile Slider Section */}
      <section id="transformations" className={styles.beforeAfterSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>REAL PATIENT TRANSFORMATIONS</div>
          <h2 className={styles.sectionTitle}>Precision Clinical Results</h2>
          <p className={styles.sectionSub}>
            Drag the interactive slider below to inspect actual porcelain veneer transformations photographed under high-magnification clinical studio lighting.
          </p>
        </div>

        <div className={styles.sliderLayout}>
          <div className={styles.photoComparisonContainer}>
            <div className={styles.photoAfterLayer}>
              <Image
                src={afterImg}
                alt="After: Porcelain Veneers Smile Makeover"
                width={700}
                height={420}
                className={styles.comparisonImage}
              />
              <div className={`${styles.photoPillLabel} ${styles.labelAfter}`}>
                After: 8 Porcelain Veneers
              </div>
            </div>

            <div className={styles.photoBeforeLayer} style={{ width: `${sliderPos}%` }}>
              <div style={{ width: '600px', height: '100%', position: 'relative' }}>
                <Image
                  src={beforeImg}
                  alt="Before: Discolored and Uneven Teeth"
                  width={700}
                  height={420}
                  className={styles.comparisonImage}
                />
              </div>
              <div className={`${styles.photoPillLabel} ${styles.labelBefore}`}>
                Before: Staining & Wear
              </div>
            </div>

            <div className={styles.sliderDivider} style={{ left: `${sliderPos}%` }}>
              <div className={styles.sliderThumbBtn}>⇄</div>
            </div>
          </div>

          <div>
            <div className={styles.caseStudyCard}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Case #1,402 • Patient: Claire M. (Age 32)
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', margin: '0.5rem 0 1rem 0' }}>
                &ldquo;I used to hide my smile in every single photo. Now I can&apos;t stop smiling.&rdquo;
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                A digital 3D aesthetic mockup was prepared to optimize tooth proportions and enamel translucency. The veneers were bonded in two comfortable studio visits.
              </p>

              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                  <span>Interactive Split Position:</span>
                  <span style={{ color: '#0d9488' }}>{sliderPos}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0d9488', cursor: 'ew-resize' }}
                />
              </div>

              <a href="#booking" className={styles.primaryCtaBtn} style={{ width: '100%', justifyContent: 'center' }}>
                Design My New Smile →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Specialty Treatment Cards */}
      <section id="treatments" className={styles.treatmentsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>COMPREHENSIVE CLINICAL SUITE</div>
          <h2 className={styles.sectionTitle}>{content.services?.title || 'Precision Dental Specialties'}</h2>
          <p className={styles.sectionSub}>
            {content.services?.subtitle || 'Every treatment is performed using minimally invasive biomimetic principles to preserve your natural tooth structure.'}
          </p>
        </div>

        <div className={styles.treatmentsGrid}>
          {treatments.map((item) => {
            const Icon = item.IconComp;
            return (
              <div key={item.id} className={styles.treatmentCard}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className={styles.iconCircle}>
                      <Icon />
                    </div>
                    <span className={styles.treatmentDuration}>{item.duration}</span>
                  </div>

                  <h3 className={styles.treatmentName}>{item.name}</h3>
                  <p className={styles.treatmentDescription}>{item.desc}</p>

                  <ul className={styles.treatmentPoints}>
                    {item.points.map((pt, i) => (
                      <li key={i} className={styles.treatmentPoint}>
                        <div style={{ color: '#0d9488' }}><Icons.Check /></div>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: 600 }}>
                    🛡️ {item.insurance}
                  </div>
                  <a href="#booking" className={styles.treatmentCardCta}>
                    <span>Book {item.name.split(' ')[0]} Visit</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Interactive 3-Step Assessment Booking Funnel */}
      <section id="booking" className={styles.bookingFunnelSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>CONCIERGE APPOINTMENT INTAKE</div>
          <h2 className={styles.sectionTitle}>Reserve Your Studio Consultation</h2>
          <p className={styles.sectionSub}>
            Select your clinical priority below. Our patient coordinator will confirm your reserved chair time within 15 minutes.
          </p>
        </div>

        <div className={styles.funnelCard}>
          <div className={styles.funnelProgress}>
            <div className={`${styles.stepDot} ${funnelStep >= 1 ? styles.stepDotActive : ''}`}>1</div>
            <div className={`${styles.stepLine} ${funnelStep >= 2 ? styles.stepLineActive : ''}`}></div>
            <div className={`${styles.stepDot} ${funnelStep >= 2 ? styles.stepDotActive : ''}`}>2</div>
            <div className={`${styles.stepLine} ${funnelStep >= 3 ? styles.stepLineActive : ''}`}></div>
            <div className={`${styles.stepDot} ${funnelStep >= 3 ? styles.stepDotActive : ''}`}>3</div>
          </div>

          {bookingConfirmed ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Icons.Check />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.85rem', fontWeight: 700, color: '#0f766e', margin: '0 0 0.75rem 0' }}>
                Consultation Request Confirmed
              </h3>
              <p style={{ fontSize: '1rem', color: '#334155', maxWidth: '520px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
                Thank you, <strong>{patientName}</strong>. We have reserved your provisional time slot for <strong>{selectedConcern}</strong> ({preferredTime}). Our coordinator will text <strong>{patientPhone}</strong> with clinic arrival details.
              </p>
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  setFunnelStep(1);
                }}
                className={styles.secondaryPlayBtn}
                style={{ margin: '0 auto' }}
              >
                Schedule Another Visit
              </button>
            </div>
          ) : (
            <div>
              {/* Step 1: Select Concern */}
              {funnelStep === 1 && (
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Step 1: Select Your Clinical Focus
                  </h3>
                  <div className={styles.concernGrid}>
                    {concerns.map((c) => {
                      const Icon = c.IconComp;
                      return (
                        <div
                          key={c.id}
                          className={`${styles.concernBtn} ${selectedConcern === c.title ? styles.concernBtnActive : ''}`}
                          onClick={() => setSelectedConcern(c.title)}
                        >
                          <div style={{ color: '#0d9488' }}><Icon /></div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{c.title}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{c.sub}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                      onClick={() => setFunnelStep(2)}
                      className={styles.primaryCtaBtn}
                      style={{ padding: '0.9rem 2.5rem' }}
                    >
                      Continue to Preferred Time →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Preferred Time */}
              {funnelStep === 2 && (
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Step 2: When Would You Like to Visit?
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {[
                      { label: 'Morning', time: '8:00 AM – 12:00 PM' },
                      { label: 'Afternoon', time: '12:00 PM – 4:00 PM' },
                      { label: 'Evening', time: '4:00 PM – 6:30 PM' }
                    ].map((slot, idx) => (
                      <div
                        key={idx}
                        className={`${styles.concernBtn} ${preferredTime.includes(slot.label) ? styles.concernBtnActive : ''}`}
                        onClick={() => setPreferredTime(`${slot.label} (${slot.time})`)}
                        style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.5rem 1rem' }}
                      >
                        <div style={{ color: '#0d9488', marginBottom: '0.5rem' }}><Icons.Clock /></div>
                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{slot.label}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{slot.time}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button onClick={() => setFunnelStep(1)} className={styles.secondaryPlayBtn}>
                      ← Back
                    </button>
                    <button onClick={() => setFunnelStep(3)} className={styles.primaryCtaBtn}>
                      Continue to Contact Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {funnelStep === 3 && (
                <form onSubmit={handleFunnelSubmit}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 600, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Step 3: Where Should We Send Your Confirmation?
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jessica Sterling"
                        style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem' }}
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                        Mobile Phone (For SMS Confirmation) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(214) 555-0199"
                        style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem' }}
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="jessica@example.com"
                        style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.95rem' }}
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#475569' }}>
                    Summary: <strong>{selectedConcern}</strong> • Preferred: <strong>{preferredTime}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button type="button" onClick={() => setFunnelStep(2)} className={styles.secondaryPlayBtn}>
                      ← Back
                    </button>
                    <button type="submit" className={styles.primaryCtaBtn} style={{ padding: '0.95rem 2.5rem' }}>
                      Confirm & Reserve Consultation ⚡
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 8. Spa-Level Comfort Menu */}
      <section id="comfort" className={styles.comfortSection}>
        <div className={styles.comfortGrid}>
          <div className={styles.comfortImageFrame}>
            <Image
              src={clinicImg}
              alt="Luxury Treatment Suite"
              width={640}
              height={460}
              className={styles.comfortPhoto}
            />
          </div>

          <div>
            <div className={styles.sectionTag}>ZERO-ANXIETY AMENITIES</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 600, color: '#0f172a', margin: '0 0 1rem 0' }}>
              The Comfort Menu
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
              We reimagined the dental operatory as a calming wellness sanctuary. Every suite is equipped with hospital-grade comfort amenities designed to alleviate dental apprehension.
            </p>

            <div className={styles.amenityList}>
              <div className={styles.amenityItem}>
                <div style={{ color: '#0d9488' }}><Icons.TvScreen /></div>
                <div className={styles.amenityTitle}>Ceiling 4K OLED Screens</div>
                <div className={styles.amenityDesc}>Stream Netflix or Spotify during treatment with Bose active noise-canceling headphones.</div>
              </div>

              <div className={styles.amenityItem}>
                <div style={{ color: '#0d9488' }}><Icons.AromaPlant /></div>
                <div className={styles.amenityTitle}>Organic Aromatherapy</div>
                <div className={styles.amenityDesc}>Lavender essential oil diffusers and warm lemon-scented towels after every visit.</div>
              </div>

              <div className={styles.amenityItem}>
                <div style={{ color: '#0d9488' }}><Icons.LoungeChair /></div>
                <div className={styles.amenityTitle}>Heated Italian Leather Chairs</div>
                <div className={styles.amenityDesc}>Ergonomic memory-foam seating with gentle heated lumbar support.</div>
              </div>

              <div className={styles.amenityItem}>
                <div style={{ color: '#0d9488' }}><Icons.SedationShield /></div>
                <div className={styles.amenityTitle}>Zero-Fear Twilight Sedation</div>
                <div className={styles.amenityDesc}>Board-certified nitrous oxide and oral sedation so you feel relaxed and at ease.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Financing Calculator */}
      <section id="financing" className={styles.financingSection}>
        <div className={styles.financingCard}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              TRANSPARENT PRICING ESTIMATOR
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
              0% APR Monthly Financing
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.65, margin: '0 0 2rem 0' }}>
              We partner with CareCredit®, Sunbit®, and Proceed Finance to ensure world-class aesthetic dentistry fits comfortably into your monthly lifestyle.
            </p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700 }}>
                <span>Estimated Procedure Cost:</span>
                <span style={{ color: '#38bdf8' }}>${calcCost.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={calcCost}
                onChange={(e) => setCalcCost(Number(e.target.value))}
                className={styles.calcSlider}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700 }}>
                <span>Expected Insurance Benefit:</span>
                <span style={{ color: '#4ade80' }}>-${calcInsurance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="250"
                value={calcInsurance}
                onChange={(e) => setCalcInsurance(Number(e.target.value))}
                className={styles.calcSlider}
              />
            </div>
          </div>

          <div className={styles.monthlyPaymentBox}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Estimated Monthly Payment
            </div>
            <div className={styles.monthlyAmount}>${monthlyEst}</div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Spread across <strong>{calcMonths} Months</strong> at 0% APR
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {[12, 24, 36].map((m) => (
                <button
                  key={m}
                  onClick={() => setCalcMonths(m)}
                  style={{
                    background: calcMonths === m ? '#0d9488' : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {m} Mo
                </button>
              ))}
            </div>

            <a href="#booking" className={styles.primaryCtaBtn} style={{ width: '100%', justifyContent: 'center' }}>
              Check Pre-Approval With Zero Credit Impact →
            </a>
          </div>
        </div>
      </section>

      {/* 10. Clinical FAQ */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>CLINICAL & INSURANCE FAQ</div>
          <h2 className={styles.sectionTitle}>{content.faq?.title || 'Frequently Asked Questions'}</h2>
        </div>

        {(content.faq?.items && content.faq.items.length > 0 ? content.faq.items : [
          {
            id: 'f1',
            question: 'How many studio visits are required for porcelain veneers?',
            answer: 'Most smile transformations require only 2 visits. Visit 1 involves high-resolution digital 3D scans and preparing temporary trial smiles so you can test-drive your aesthetic look. Visit 2 is the final bonding of your custom hand-layered porcelain veneers.'
          },
          {
            id: 'f2',
            question: 'Does dental treatment hurt at our studio?',
            answer: 'No. We specialize in 100% pain-free dentistry. We utilize computer-assisted anesthesia delivery, gentle Biolase laser technology, and twilight sedation options so you will never feel discomfort.'
          },
          {
            id: 'f3',
            question: 'Do you accept major dental PPO insurance plans?',
            answer: 'Yes, we are in-network with over 30 major PPO dental plans including Delta Dental, Cigna, MetLife, Aetna, Guardian, and United Healthcare. Our billing coordinators handle all insurance claims directly on your behalf.'
          },
          {
            id: 'f4',
            question: 'What if I have an emergency tooth pain or fracture?',
            answer: `We reserve emergency chair slots every single day. If you are experiencing pain, call us directly at ${phone} for same-day clinical relief.`
          }
        ]).map((item, idx) => (
          <div key={item.id || idx} className={styles.faqItem}>
            <button
              className={styles.faqHeader}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span>{item.question}</span>
              <span style={{ color: '#0d9488', fontSize: '1.25rem' }}>{openFaq === idx ? '−' : '+'}</span>
            </button>
            {openFaq === idx && (
              <div className={styles.faqContent}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 11. Luxury Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.brandLogo} style={{ color: '#ffffff', marginBottom: '1rem' }}>
              <div className={styles.logoMonogram}>
                <Icons.ToothSpark />
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandName} style={{ color: '#ffffff' }}>{brandName}</span>
                <span className={styles.brandSub} style={{ color: '#38bdf8' }}>Aesthetic & Clinical Excellence</span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65, maxWidth: '320px' }}>
              {content.footer?.description ||
                'Elevating cosmetic and surgical dentistry through compassionate care, 3D robotics, and luxury hospitality.'}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>Specialties</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <li>Porcelain Veneers</li>
              <li>Invisalign Diamond</li>
              <li>3D Guided Implants</li>
              <li>Sedation Dentistry</li>
              <li>Laser Therapy</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>Studio Location</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
              {content.contact?.address || '2400 McKinney Avenue, Suite 600, Uptown Dallas, TX 75201'}<br />
              Valet Parking Available
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>Concierge</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              Direct: {phone}<br />
              Email: {content.contact?.email || 'care@auroradental.com'}
            </p>
            <div style={{ color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700 }}>
              Powered by EagleX Engine
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div>{content.footer?.copyright || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}</div>
          <div>ADA Certified • HIPAA Compliant • 0% Financing Partner</div>
        </div>
      </footer>
    </div>
  );
}
