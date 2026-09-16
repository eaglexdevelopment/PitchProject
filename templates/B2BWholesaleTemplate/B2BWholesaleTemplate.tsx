'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Pitch } from '@/types/pitch';
import styles from './b2b.module.css';

interface TemplateProps {
  pitch: Pitch;
}

type CurrencyKey = 'USD' | 'INR' | 'EUR' | 'AED';
type MaterialShaderKey = 'ss316' | 'titanium' | 'brass' | 'textile';

interface CurrencyInfo {
  code: CurrencyKey;
  symbol: string;
  rate: number;
}

const CURRENCIES: Record<CurrencyKey, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  INR: { code: 'INR', symbol: '₹', rate: 83.5 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67 }
};

interface MaterialShaderConfig {
  id: MaterialShaderKey;
  label: string;
  badge: string;
  strokeColor: string;
  fillGradStart: string;
  fillGradEnd: string;
  luster: string;
  hardness: string;
  tensile: string;
  purity: string;
}

const MATERIAL_SHADERS: Record<MaterialShaderKey, MaterialShaderConfig> = {
  ss316: {
    id: 'ss316',
    label: 'SS 316L (Mirror Electro-Polish)',
    badge: 'ASTM A182 CRYOGENIC GRADE',
    strokeColor: '#38bdf8',
    fillGradStart: '#0284c7',
    fillGradEnd: '#e0f2fe',
    luster: 'Ra 0.4 µm (Optical Sheen)',
    hardness: 'Rockwell B 82 (HRB)',
    tensile: '560 MPa Ultimate Yield',
    purity: 'Cr 17.2% • Ni 11.4% • Mo 2.1%'
  },
  titanium: {
    id: 'titanium',
    label: 'Grade 5 Titanium (Iridescent Blue)',
    badge: 'AMS 4928 AEROSPACE GRADE',
    strokeColor: '#818cf8',
    fillGradStart: '#4338ca',
    fillGradEnd: '#c7d2fe',
    luster: 'Ra 0.2 µm (Anodized)',
    hardness: 'Rockwell C 36 (HRC)',
    tensile: '980 MPa Ultimate Yield',
    purity: 'Ti 89.5% • Al 6.1% • V 4.0%'
  },
  brass: {
    id: 'brass',
    label: 'IS-319 Free Cutting Brass (Gold Sheen)',
    badge: 'HIGH CONDUCTIVITY ALLOY',
    strokeColor: '#fbbf24',
    fillGradStart: '#d97706',
    fillGradEnd: '#fef3c7',
    luster: 'Ra 0.8 µm (Natural Gold)',
    hardness: 'Vickers HV 125',
    tensile: '420 MPa Ultimate Yield',
    purity: 'Cu 58.5% • Zn 38.2% • Pb 2.8%'
  },
  textile: {
    id: 'textile',
    label: 'GOTS 100% Organic Bio-Fiber',
    badge: 'GOTS CERTIFIED TEXTILE',
    strokeColor: '#34d399',
    fillGradStart: '#059669',
    fillGradEnd: '#d1fae5',
    luster: '240 GSM Ring-Spun',
    hardness: 'Bio-Enzyme Softened',
    tensile: 'Zero-Pilling Grade 4+',
    purity: '100% Combed Organic Cotton'
  }
};

interface OceanCorridor {
  id: string;
  name: string;
  vessel: string;
  distanceNm: string;
  transitDays: string;
  ratePerTeu: number;
  departureFrequency: string;
  customsChannel: string;
}

const OCEAN_CORRIDORS: OceanCorridor[] = [
  {
    id: 'hamburg',
    name: 'Port Mundra (India) ➔ Port of Hamburg (Germany)',
    vessel: 'MSC Gülsün (Voyage #IN-DE-442)',
    distanceNm: '6,420 NM',
    transitDays: '16-18 Days (Direct Sea)',
    ratePerTeu: 1450,
    departureFrequency: 'Every Tuesday & Friday',
    customsChannel: 'Green Line Fast-Track Clearance'
  },
  {
    id: 'houston',
    name: 'Port Mundra (India) ➔ Port of Houston (USA Gulf)',
    vessel: 'Maersk Mc-Kinney (Voyage #IN-US-891)',
    distanceNm: '8,850 NM',
    transitDays: '22-25 Days (Direct Sea)',
    ratePerTeu: 2150,
    departureFrequency: 'Weekly Saturday Sailing',
    customsChannel: 'US CBP ACE Manifest Pre-Cleared'
  },
  {
    id: 'jebel-ali',
    name: 'Port JNPT Mumbai (India) ➔ Port Jebel Ali (Dubai / UAE)',
    vessel: 'CMA CGM Antoine (Voyage #IN-AE-108)',
    distanceNm: '1,080 NM',
    transitDays: '3-4 Days (Express Corridor)',
    ratePerTeu: 480,
    departureFrequency: 'Daily Departures',
    customsChannel: 'GCC Direct Duty Exemption'
  },
  {
    id: 'rotterdam',
    name: 'Port Chennai (India) ➔ Port of Rotterdam (Netherlands)',
    vessel: 'Hapag-Lloyd Al Jmeliyah (Voyage #IN-NL-312)',
    distanceNm: '7,150 NM',
    transitDays: '18-20 Days (Direct Sea)',
    ratePerTeu: 1520,
    departureFrequency: 'Every Wednesday',
    customsChannel: 'EU EUR.1 Certificate Accompanied'
  }
];

interface SkuItem {
  id: string;
  sku: string;
  hsCode: string;
  name: string;
  material: string;
  moq: number;
  unit: string;
  priceTiers: { qty: string; priceUsd: number }[];
  chemicalComposition: { elem: string; val: string }[];
  tensileYield: string;
  hardness: string;
}

const SKU_DATABASE: SkuItem[] = [
  {
    id: 'flg-316',
    sku: 'IND-FLG-316L',
    hsCode: '7307.21.00 (Stainless Steel Flanges)',
    name: '5-Axis CNC Flange Hub (SS 316L)',
    material: 'ASTM A182 / F316L Dual Certified',
    moq: 100,
    unit: 'pcs',
    priceTiers: [
      { qty: '100-499 pcs', priceUsd: 14.5 },
      { qty: '500-1,999 pcs', priceUsd: 11.2 },
      { qty: '2,000+ pcs', priceUsd: 8.8 }
    ],
    chemicalComposition: [
      { elem: 'Carbon (C)', val: '0.022%' },
      { elem: 'Chromium (Cr)', val: '17.20%' },
      { elem: 'Nickel (Ni)', val: '11.40%' },
      { elem: 'Molybdenum (Mo)', val: '2.15%' },
      { elem: 'Iron (Fe)', val: 'Balance' }
    ],
    tensileYield: 'Yield: 240 MPa • Tensile: 560 MPa',
    hardness: 'Rockwell B 82 (HRB)'
  },
  {
    id: 'ti-fastener',
    sku: 'AER-TI-6AL4V',
    hsCode: '8108.90.00 (Titanium Articles & Fasteners)',
    name: 'Aerospace Grade 5 Titanium Fasteners (DIN 933)',
    material: 'Ti-6Al-4V Grade 5 (AMS 4928)',
    moq: 500,
    unit: 'pcs',
    priceTiers: [
      { qty: '500-1,999 pcs', priceUsd: 3.8 },
      { qty: '2,000-9,999 pcs', priceUsd: 2.95 },
      { qty: '10,000+ pcs', priceUsd: 2.2 }
    ],
    chemicalComposition: [
      { elem: 'Titanium (Ti)', val: '89.50%' },
      { elem: 'Aluminum (Al)', val: '6.10%' },
      { elem: 'Vanadium (V)', val: '4.05%' },
      { elem: 'Iron (Fe)', val: '0.15%' },
      { elem: 'Oxygen (O)', val: '0.12%' }
    ],
    tensileYield: 'Yield: 880 MPa • Tensile: 980 MPa',
    hardness: 'Rockwell C 36 (HRC)'
  },
  {
    id: 'brass-terminal',
    sku: 'ELE-BRS-319',
    hsCode: '8538.90.00 (Electrical Neutral Links)',
    name: 'High-Conductivity Brass Neutral Links (IEC)',
    material: 'Free Cutting Brass IS-319 / CuZn39Pb3',
    moq: 1000,
    unit: 'pcs',
    priceTiers: [
      { qty: '1,000-4,999 pcs', priceUsd: 0.95 },
      { qty: '5,000-19,999 pcs', priceUsd: 0.78 },
      { qty: '20,000+ pcs', priceUsd: 0.62 }
    ],
    chemicalComposition: [
      { elem: 'Copper (Cu)', val: '58.50%' },
      { elem: 'Zinc (Zn)', val: '38.20%' },
      { elem: 'Lead (Pb)', val: '2.80%' },
      { elem: 'Iron (Fe)', val: '0.35%' },
      { elem: 'Impurities', val: '< 0.15%' }
    ],
    tensileYield: 'Tensile: 420 MPa • Elongation: 18%',
    hardness: 'Vickers HV 125'
  }
];

export default function B2BWholesaleTemplate({ pitch }: TemplateProps) {
  const content = pitch.content;

  // Mobile Drawer Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Currency State
  const [currency, setCurrency] = useState<CurrencyKey>('USD');
  const curr = CURRENCIES[currency];

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * curr.rate;
    if (converted >= 1000) {
      return `${curr.symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  // 1. Holo-Dock 3D State
  const [activeShader, setActiveShader] = useState<MaterialShaderKey>('ss316');
  const [isExplodedView, setIsExplodedView] = useState(false);
  const shader = MATERIAL_SHADERS[activeShader];

  // 2. Maritime Sea Radar State
  const [activeCorridorId, setActiveCorridorId] = useState('hamburg');
  const activeCorridor = OCEAN_CORRIDORS.find((c) => c.id === activeCorridorId) || OCEAN_CORRIDORS[0];

  // 3. Container Simulator State
  const [calcQty, setCalcQty] = useState(2500);
  const baseCostPerUnitUsd = 12.0;
  const unitDiscount = calcQty >= 2000 ? 0.35 : calcQty >= 1000 ? 0.2 : 0;
  const effectiveUnitCostUsd = baseCostPerUnitUsd * (1 - unitDiscount);
  const totalCostUsd = effectiveUnitCostUsd * calcQty;

  // Pallet math (250 pcs / pallet, max 10 pallets in 20ft container)
  const activePallets = Math.min(10, Math.ceil(calcQty / 250));

  // 4. SKU Data Table State
  const [searchFilter] = useState('');
  const [expandedSkuId, setExpandedSkuId] = useState<string | null>('flg-316');

  // 5. Proforma Modal State
  const [proformaModalOpen, setProformaModalOpen] = useState(false);
  const [buyerCompany, setBuyerCompany] = useState('Hansas Industrial Procurement GmbH');
  const [buyerCountry, setBuyerCountry] = useState('Germany');

  // 6. Dynamic RFQ Form State
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqPort, setRfqPort] = useState('Port of Hamburg (Germany)');
  const [rfqProduct, setRfqProduct] = useState('5-Axis CNC Flanges (SS 316L)');
  const [rfqTargetQty, setRfqTargetQty] = useState('2,500 pcs');
  const [rfqMtcRequired, setRfqMtcRequired] = useState(true);
  const [rfqSampleKit, setRfqSampleKit] = useState(false);
  const [rfqNotes, setRfqNotes] = useState('');
  const [rfqSubmittedId, setRfqSubmittedId] = useState<string | null>(null);

  // 7. Dynamic FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredSkus = useMemo(() => {
    return SKU_DATABASE.filter(
      (s) =>
        s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.material.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter]);

  const brandName = content.navbar?.brandName || pitch.clientName || 'Bharat Industrial Exports Ltd.';
  const phone = content.contact?.phone || '+91 98200 12345';
  const email = content.contact?.email || 'exports@bharatb2bhub.com';

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `RFQ-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqSubmittedId(generatedRef);
  };

  // Dynamic Capabilities Fallback
  const dynamicServices = content.services?.items?.length
    ? content.services.items
    : [
        {
          id: 's1',
          title: '5-Axis CNC Machining & Turning',
          description: 'Sub-micron precision milling on German DMG Mori centers with ±0.005mm ISO 2768-m tolerance guarantee.',
          badge: 'ISO 9001:2015 CERTIFIED',
          icon: '⚙️'
        },
        {
          id: 's2',
          title: 'Cold Forging & Fasteners',
          description: 'High-speed automated heading lines forging DIN 933 aerospace titanium & stainless hex bolts up to M36.',
          badge: 'DIN / ASTM / ASME COMPLIANT',
          icon: '🔩'
        },
        {
          id: 's3',
          title: 'Full Ocean Container Drayage',
          description: 'Direct bonded transit from Gujarat industrial corridor to Port Mundra & JNPT with automated ACE manifest clearance.',
          badge: 'FOB / CIF / DDP WORLDWIDE',
          icon: '🚢'
        },
        {
          id: 's4',
          title: 'Metallurgical Lab & CMM Testing',
          description: 'In-house optical emission spectrometers, coordinate measuring machines (CMM), and EN 10204 3.1 certification.',
          badge: '100% BATCH TRACEABILITY',
          icon: '🔬'
        }
      ];

  // Dynamic Testimonials Fallback
  const dynamicTestimonials = content.testimonials?.items?.length
    ? content.testimonials.items
    : [
        {
          id: 't1',
          name: 'Klaus Lindner',
          role: 'Head of Global Procurement',
          company: 'Hansas Automation GmbH (Stuttgart, Germany)',
          content: 'Bharat Exports delivered 8 container loads of custom 316L machined hubs with zero dimensional defect across 40,000 units. Their EN 10204 3.1 MTC chemistry matched our lab spectrometer 100%.'
        },
        {
          id: 't2',
          name: 'Marcus Vance',
          role: 'VP Supply Chain',
          company: 'Vance Energy & Offshore LLC (Houston, TX, USA)',
          content: 'The 3D container packing simulator allowed us to maximize our 20ft container cube to 98% efficiency. Direct CIF shipping to Port of Houston arrived 3 days ahead of schedule with all US customs pre-cleared.'
        },
        {
          id: 't3',
          name: 'Tariq Al-Mansoor',
          role: 'Managing Director',
          company: 'Gulf Heavy Industries (Jebel Ali, UAE)',
          content: 'Best OEM partner for precision brass electrical links. With 3-day transit from JNPT to Jebel Ali, our assembly lines maintain zero buffer inventory without any supply disruption.'
        }
      ];

  // Dynamic FAQ Fallback
  const dynamicFaqs = content.faq?.items?.length
    ? content.faq.items
    : [
        {
          id: 'f1',
          question: 'What are your standard international commercial payment terms?',
          answer: 'We support Irrevocable Letter of Credit (L/C at Sight / 30-90 Days) issued by top-tier international banks, Telegraphic Transfer (TT 30% advance deposit with 70% against Bill of Lading scan), and Escrow Trade Finance.'
        },
        {
          id: 'f2',
          question: 'How do you guarantee material quality and chemical traceability?',
          answer: 'Every export batch is accompanied by an authentic Mill Test Certificate (MTC) adhering to EN 10204 3.1 standard. We perform 100% positive material identification (PMI) using optical spectrometers and CMM dimensional inspections.'
        },
        {
          id: 'f3',
          question: 'What is your sample dispatch and custom tooling turnaround time?',
          answer: 'For standard catalog SKUs, pre-production sample kits are dispatched via DHL/FedEx Express within 48 hours. Custom CNC parts requiring specialized tooling have a sample turnaround of 7-10 business days.'
        },
        {
          id: 'f4',
          question: 'Can you handle FOB, CIF, and DDP shipping terms?',
          answer: 'Yes. We provide complete FOB pricing out of Port Mundra and Port JNPT Mumbai, as well as CIF container freight directly to your designated seaport in Europe, North America, Middle East, or Asia.'
        }
      ];

  return (
    <div className={styles.container}>
      {/* 1. Global Commodity & Freight Index Ticker */}
      <div className={styles.tickerBar}>
        <div className={styles.tickerTrack}>
          <span className={styles.tickerItem}>
            <span>ASTM SS 316L Index:</span> <span className={styles.tickerUp}>$4,150/MT ▲ (+1.4%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>LME Copper Grade A:</span> <span className={styles.tickerUp}>$9,240/MT ▲ (+0.8%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>GOTS Combed Cotton Yarn 30s:</span> <span className={styles.tickerDown}>$3.85/kg ▼ (-0.6%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>1121 Basmati Export FOB:</span> <span className={styles.tickerUp}>$1,050/MT ▲ (+2.1%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>Drewry World Container Index (WCI):</span> <span className={styles.tickerDown}>$2,840/FEU ▼ (-1.2%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>USD / INR Exchange Benchmark:</span> <span style={{ color: '#ffffff' }}>83.52</span>
          </span>
          {/* Duplicate track for seamless infinite marquee */}
          <span className={styles.tickerItem}>
            <span>ASTM SS 316L Index:</span> <span className={styles.tickerUp}>$4,150/MT ▲ (+1.4%)</span>
          </span>
          <span className={styles.tickerItem}>
            <span>LME Copper Grade A:</span> <span className={styles.tickerUp}>$9,240/MT ▲ (+0.8%)</span>
          </span>
        </div>
      </div>

      {/* 2. Enterprise Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="#holo-hero" className={styles.brandLogo}>
            {content.navbar?.logoUrl ? (
              <img src={content.navbar.logoUrl} alt={brandName} className={styles.customBrandLogoImg} />
            ) : (
              <div className={styles.logoIconBox}>B2B</div>
            )}
            <div className={styles.brandText}>
              <span className={styles.brandName}>{brandName}</span>
              <span className={styles.brandSub}>Global Supply & Export Terminal</span>
            </div>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#holo-hero" className={styles.navLink}>3D Holo-Dock</a></li>
              <li><a href="#maritime-radar" className={styles.navLink}>Sea Freight Radar</a></li>
              <li><a href="#container-simulator" className={styles.navLink}>Container Simulator</a></li>
              <li><a href="#sku-matrix" className={styles.navLink}>MTC SKU Database</a></li>
              <li><a href="#rfq-form" className={styles.navLink}>Direct RFQ Dispatch</a></li>
              <li><a href="#capabilities" className={styles.navLink}>Capabilities</a></li>
              <li><a href="#faq" className={styles.navLink}>Trade FAQ</a></li>
            </ul>
          </nav>

          <div className={styles.navRightGroup}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyKey)}
              className={styles.currencySelector}
              aria-label="Select Currency"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="AED">AED (د.إ)</option>
            </select>

            <button
              type="button"
              className={styles.navQuoteBtn}
              onClick={() => setProformaModalOpen(true)}
            >
              📑 Generate Export Proforma
            </button>

            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawerOverlay} onClick={() => setMobileMenuOpen(false)}>
            <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.mobileDrawerHeader}>
                <div className={styles.brandLogo}>
                  {content.navbar?.logoUrl ? (
                    <img src={content.navbar.logoUrl} alt={brandName} className={styles.customBrandLogoImg} />
                  ) : (
                    <div className={styles.logoIconBox}>B2B</div>
                  )}
                  <div className={styles.brandText}>
                    <span className={styles.brandName} style={{ color: '#ffffff' }}>{brandName}</span>
                    <span className={styles.brandSub}>Export Terminal Menu</span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.drawerCloseBtn}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </div>

              <ul className={styles.mobileNavLinks}>
                <li><a href="#holo-hero" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>3D Holo-Dock Hero</a></li>
                <li><a href="#maritime-radar" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>Global Sea Freight Radar</a></li>
                <li><a href="#container-simulator" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>3D Container Packing Simulator</a></li>
                <li><a href="#sku-matrix" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>Certified MTC SKU Matrix</a></li>
                <li><a href="#rfq-form" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>Direct Commercial RFQ Dispatch</a></li>
                <li><a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>OEM Facilities & Accreditations</a></li>
                <li><a href="#faq" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>Export & LC Trade FAQ</a></li>
              </ul>

              <div className={styles.mobileDrawerFooter}>
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className={styles.mobileCallBtn}>
                  📞 Call Trade Desk: {phone}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProformaModalOpen(true);
                  }}
                  className={styles.mobileDrawerQuoteBtn}
                >
                  📑 Generate Export Proforma
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section: The 3D Industrial Holo-Dock */}
      <section id="holo-hero" className={styles.holoHeroSection}>
        <div className={styles.holoHeroInner}>
          <div>
            <div className={styles.heroBadge}>
              <span>⭐</span> {shader.badge} • IEC: 0314088921
            </div>

            <h1 className={styles.heroTitle}>
              {content.hero?.headline ? (
                content.hero.headline
              ) : (
                <>Sub-Micron OEM Machining & <span className={styles.highlightBronze}>Global Container Terminal</span></>
              )}
            </h1>

            <p className={styles.heroSubtitle}>
              {content.hero?.subheadline ||
                'Exporting high-precision 5-axis CNC turned components, titanium aerospace fasteners, and certified industrial commodities directly from audited Indian manufacturing floors.'}
            </p>

            {/* Material Shader Selector */}
            <div className={styles.shaderSelectorBox}>
              <div className={styles.shaderLabel}>
                🎨 Live Material Shader Shifter (Inspect Metallic Luster):
              </div>
              <div className={styles.shaderChips}>
                {(Object.keys(MATERIAL_SHADERS) as MaterialShaderKey[]).map((key) => {
                  const s = MATERIAL_SHADERS[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveShader(key)}
                      className={`${styles.shaderChip} ${activeShader === key ? styles.shaderChipActive : ''}`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.heroActionsRow}>
              <button
                type="button"
                className={styles.primaryHeroBtn}
                onClick={() => setProformaModalOpen(true)}
              >
                📑 Request Live Proforma Invoice →
              </button>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20Bharat%20Exports,%20I%20am%20interested%20in%20inspecting%20${shader.label}%20production%20batches.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryHeroBtn}
                style={{ textDecoration: 'none' }}
              >
                💬 Trade Desk WhatsApp
              </a>
            </div>
          </div>

          {/* Hero Right: 3D Holographic CNC Machine Holo-Dock */}
          <div className={styles.holoDockCard}>
            <div className={styles.holoDockHeader}>
              <div className={styles.spindleRpmLive}>
                <span className={styles.spindleDot}></span>
                <span>SPINDLE: 14,200 RPM • LIVE CMM PASS</span>
              </div>

              {/* Exploded View Toggle */}
              <div className={styles.viewModeToggle}>
                <button
                  type="button"
                  onClick={() => setIsExplodedView(false)}
                  className={`${styles.viewModeBtn} ${!isExplodedView ? styles.viewModeBtnActive : ''}`}
                >
                  🧩 Assembled
                </button>
                <button
                  type="button"
                  onClick={() => setIsExplodedView(true)}
                  className={`${styles.viewModeBtn} ${isExplodedView ? styles.viewModeBtnActive : ''}`}
                >
                  💥 Exploded 360°
                </button>
              </div>
            </div>

            {/* 3D Holo-Stage Area with Exploded View Simulation */}
            <div className={styles.holoStageArea}>
              <div className={styles.holoLaserLine}></div>

              {/* Dynamic SVG Hologram with Exploded View Transform */}
              <svg width="280" height="220" viewBox="0 0 280 220" fill="none">
                <defs>
                  <linearGradient id="materialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={shader.fillGradStart} stopOpacity="0.85" />
                    <stop offset="100%" stopColor={shader.fillGradEnd} stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {!isExplodedView ? (
                  /* ASSEMBLED STATE */
                  <g style={{ transition: 'all 0.4s ease' }}>
                    <ellipse cx="140" cy="110" rx="90" ry="45" fill="url(#materialGrad)" stroke={shader.strokeColor} strokeWidth="2" />
                    <ellipse cx="140" cy="110" rx="55" ry="25" fill="#03060c" stroke={shader.strokeColor} strokeWidth="1.5" />
                    <ellipse cx="140" cy="110" rx="30" ry="12" fill="#060a12" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="80" cy="110" r="6" fill={shader.strokeColor} />
                    <circle cx="200" cy="110" r="6" fill={shader.strokeColor} />
                    <circle cx="140" cy="80" r="6" fill={shader.strokeColor} />
                    <circle cx="140" cy="140" r="6" fill={shader.strokeColor} />
                  </g>
                ) : (
                  /* EXPLODED 360 VIEW STATE */
                  <g style={{ transition: 'all 0.4s ease' }}>
                    {/* Layer 1: Outer Flange Ring */}
                    <g transform="translate(0, -35)">
                      <ellipse cx="140" cy="80" rx="90" ry="40" fill="url(#materialGrad)" stroke={shader.strokeColor} strokeWidth="1.8" />
                      <text x="15" y="75" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono">[01] Flange Ring Ø140mm</text>
                      <line x1="85" y1="75" x2="110" y2="78" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    </g>

                    {/* Layer 2: Cryogenic Seal */}
                    <g transform="translate(0, 0)">
                      <ellipse cx="140" cy="110" rx="55" ry="25" fill="#090d16" stroke="#f59e0b" strokeWidth="2" />
                      <text x="195" y="115" fill="#f59e0b" fontSize="10" fontFamily="JetBrains Mono">[02] Cryo Gasket</text>
                      <line x1="165" y1="112" x2="190" y2="112" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    </g>

                    {/* Layer 3: Inner Honed Sleeve */}
                    <g transform="translate(0, 35)">
                      <ellipse cx="140" cy="140" rx="32" ry="14" fill="url(#materialGrad)" stroke={shader.strokeColor} strokeWidth="2" />
                      <text x="15" y="155" fill="#34d399" fontSize="10" fontFamily="JetBrains Mono">[03] Honed Sleeve H7</text>
                      <line x1="85" y1="150" x2="115" y2="145" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Telemetry Overlay Grid */}
            <div className={styles.telemetryOverlayGrid}>
              <div className={styles.telemetryCell}>
                <div className={styles.telemetryKey}>Surface Roughness (Ra)</div>
                <div className={styles.telemetryVal} style={{ color: '#38bdf8' }}>{shader.luster}</div>
              </div>

              <div className={styles.telemetryCell}>
                <div className={styles.telemetryKey}>Tensile Yield Capacity</div>
                <div className={styles.telemetryVal} style={{ color: '#34d399' }}>{shader.tensile}</div>
              </div>

              <div className={styles.telemetryCell}>
                <div className={styles.telemetryKey}>Hardness Scale</div>
                <div className={styles.telemetryVal}>{shader.hardness}</div>
              </div>

              <div className={styles.telemetryCell}>
                <div className={styles.telemetryKey}>Chemical Purity</div>
                <div className={styles.telemetryVal} style={{ color: '#fbbf24', fontSize: '0.78rem' }}>{shader.purity}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Global Maritime Sea Radar Map */}
      <section id="maritime-radar" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>[LIVE MARITIME SEA RADAR]</div>
          <h2 className={styles.sectionTitle}>Global Container Logistics & Ocean Corridors</h2>
          <p className={styles.sectionSubtitle}>
            Interactive maritime radar monitoring active departures, green-channel customs clearance, and real-time container freight rates.
          </p>
        </div>

        <div className={styles.radarCard}>
          {/* Radar Screen Area */}
          <div className={styles.radarDisplayArea}>
            <div className={styles.radarSweepRing}></div>
            <div className={styles.radarSweepLine}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 5, flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                📡 NAUTICAL RADAR • ACTIVE CORRIDOR: {activeCorridor.id.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                GPS: 24°50&apos;N 69°42&apos;E
              </span>
            </div>

            {/* Simulated Vessel Tracking Visual */}
            <div style={{ textAlign: 'center', zIndex: 5, background: 'rgba(3, 6, 12, 0.85)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>🚢</div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontFamily: 'Space Grotesk' }}>{activeCorridor.vessel}</div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'JetBrains Mono', marginTop: '0.2rem' }}>
                Distance: {activeCorridor.distanceNm} • Transit: {activeCorridor.transitDays}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 5, fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'JetBrains Mono', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span>ORIGIN: PORT MUNDRA / JNPT</span>
              <span>DESTINATION: {activeCorridor.name.split('➔')[1]?.trim()}</span>
            </div>
          </div>

          {/* Corridor Selection List */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'JetBrains Mono' }}>
              Select Active Sea Route Corridor:
            </div>

            {OCEAN_CORRIDORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCorridorId(c.id)}
                className={`${styles.radarCorridorBtn} ${activeCorridorId === c.id ? styles.radarCorridorBtnActive : ''}`}
              >
                <span>🚢 {c.name.split('➔')[1]?.trim()}</span>
                <span style={{ fontFamily: 'JetBrains Mono' }}>{formatPrice(c.ratePerTeu)}/TEU</span>
              </button>
            ))}

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '10px', marginTop: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Customs & Compliance Protocol:</div>
              <div style={{ color: '#34d399', fontSize: '0.84rem', fontWeight: 700 }}>{activeCorridor.customsChannel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3D Cutaway Container Pallet Packing Simulator */}
      <section id="container-simulator" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>[PHYSICAL CONTAINER LOAD PHYSICS]</div>
          <h2 className={styles.sectionTitle}>3D Cutaway 20ft Container Packing Simulator</h2>
          <p className={styles.sectionSubtitle}>
            Scale your order volume to observe pallets dynamically loading and stacking inside a standard 20ft sea container cutaway.
          </p>
        </div>

        <div className={styles.containerSimCard}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', fontFamily: 'JetBrains Mono' }}>
                Procurement Volume: {calcQty.toLocaleString()} Units
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Space Grotesk' }}>
                Unit FOB: {formatPrice(effectiveUnitCostUsd)}
              </span>
            </div>

            <input
              type="range"
              min="500"
              max="2500"
              step="250"
              value={calcQty}
              onChange={(e) => setCalcQty(Number(e.target.value))}
              className={styles.rfqInput}
              style={{ width: '100%', accentColor: '#d97706', height: '8px', cursor: 'pointer', margin: '0.75rem 0 1.5rem 0', padding: 0 }}
            />

            {/* Container Cutaway Bay */}
            <div className={styles.containerBayStage}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'JetBrains Mono', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>📦 20FT SEA CONTAINER (ISO 668)</span>
                <span style={{ color: '#34d399' }}>{activePallets} / 10 PALLETS LOADED ({activePallets * 10}% FULL)</span>
              </div>

              {/* 10-Pallet Grid */}
              <div className={styles.palletGrid}>
                {Array.from({ length: 10 }).map((_, pIdx) => (
                  <div
                    key={pIdx}
                    className={`${styles.palletBlock} ${pIdx < activePallets ? styles.palletBlockActive : ''}`}
                  >
                    {pIdx < activePallets ? `PALLET #${pIdx + 1}` : '[EMPTY]'}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'center' }}>
                ⚖️ Weight Distribution: Balanced • Center of Gravity Offset: 0.02%
              </div>
            </div>
          </div>

          <div style={{ background: '#0f172a', color: '#ffffff', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', marginBottom: '0.4rem' }}>
              Total Order Value (FOB Mundra)
            </div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', marginBottom: '1rem' }}>
              {formatPrice(totalCostUsd)}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Includes ISPM-15 heat-treated export fumigation, anti-static VCI foil sealing, and container drayage to the port terminal.
            </p>

            <button
              type="button"
              className={styles.rfqSubmitBtn}
              onClick={() => setProformaModalOpen(true)}
            >
              Generate Official Proforma Invoice →
            </button>
          </div>
        </div>
      </section>

      {/* 6. High-Density SKU Data Matrix */}
      <section id="sku-matrix" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>[METALLURGICAL SKU DATABASE]</div>
          <h2 className={styles.sectionTitle}>Certified Mill Test (MTC) Chemical Matrix</h2>
          <p className={styles.sectionSubtitle}>
            Inspect full EN 10204 3.1 material traceability, chemical ratios, and multi-tier volume wholesale rates.
          </p>
        </div>

        <div className={styles.skuTableCard}>
          <div className={styles.tableContainer}>
            <table className={styles.skuTable}>
              <thead>
                <tr>
                  <th>Part SKU</th>
                  <th>Description</th>
                  <th>Standard & Grade</th>
                  <th>MOQ</th>
                  <th>Starting Price ({curr.code})</th>
                  <th>MTC Telemetry</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkus.map((sku) => (
                  <React.Fragment key={sku.id}>
                    <tr style={{ background: expandedSkuId === sku.id ? '#fef3c7' : 'transparent' }}>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{sku.sku}</td>
                      <td><strong>{sku.name}</strong></td>
                      <td style={{ color: '#d97706', fontWeight: 600 }}>{sku.material}</td>
                      <td>{sku.moq.toLocaleString()} {sku.unit}</td>
                      <td style={{ fontWeight: 800, fontFamily: 'JetBrains Mono' }}>
                        {formatPrice(sku.priceTiers[sku.priceTiers.length - 1].priceUsd)} / {sku.unit}
                      </td>
                      <td>
                        <button
                          type="button"
                          style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          onClick={() => setExpandedSkuId(expandedSkuId === sku.id ? null : sku.id)}
                        >
                          {expandedSkuId === sku.id ? 'Hide MTC ▲' : 'Inspect MTC ▼'}
                        </button>
                      </td>
                    </tr>

                    {expandedSkuId === sku.id && (
                      <tr>
                        <td colSpan={6} className={styles.expandRow}>
                          <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
                              🧪 Certified Chemical Composition (MTC EN 10204 3.1):
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                              {sku.tensileYield} • {sku.hardness}
                            </span>
                          </div>

                          <div className={styles.chemCompositionGrid}>
                            {sku.chemicalComposition.map((chem, cIdx) => (
                              <div key={cIdx} className={styles.chemBox}>
                                <div style={{ color: '#64748b', fontSize: '0.68rem' }}>{chem.elem}</div>
                                <div style={{ color: '#0f172a', fontWeight: 800 }}>{chem.val}</div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Direct RFQ & Sample Dispatch Lead Capture Form */}
      <section id="rfq-form" className={styles.rfqSection}>
        <div className={styles.rfqContainer}>
          <div className={styles.sectionHeader} style={{ marginBottom: '2.5rem' }}>
            <div className={styles.sectionTag} style={{ color: '#f59e0b' }}>[DIRECT COMMERCIAL DESK]</div>
            <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>Commercial RFQ & Sample Dispatch</h2>
            <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>
              Submit your project specifications or CAD drawing details for guaranteed container quotation within 2 business hours.
            </p>
          </div>

          <div className={styles.rfqCard}>
            {rfqSubmittedId ? (
              <div className={styles.rfqSuccessBanner}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: '#10b981' }}>
                  Commercial RFQ Dispatched Successfully!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '550px', margin: '0 auto 1.5rem auto' }}>
                  Your inquiry reference <strong>{rfqSubmittedId}</strong> has been registered with our Gujarat Export Trade Desk. Our engineering procurement director will review your tolerances and provide an official signed quote.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20Bharat%20Exports,%20I%20have%20submitted%20RFQ%20reference%20${rfqSubmittedId}%20for%20${rfqProduct}%20(${rfqTargetQty}).%20Please%20prioritize%20quotation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.rfqSubmitBtn}
                    style={{ textDecoration: 'none', background: '#25d366', color: '#ffffff', width: 'auto', padding: '0.75rem 1.5rem' }}
                  >
                    💬 Connect with Trade Desk on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setRfqSubmittedId(null)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Submit Another RFQ
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className={styles.rfqFormGrid}>
                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Consignee / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bosch Automotive Procurement GmbH"
                    value={rfqCompany}
                    onChange={(e) => setRfqCompany(e.target.value)}
                    className={styles.rfqInput}
                  />
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Procurement Officer / Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johannes Weber"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    className={styles.rfqInput}
                  />
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Corporate Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="j.weber@company.com"
                    value={rfqEmail}
                    onChange={(e) => setRfqEmail(e.target.value)}
                    className={styles.rfqInput}
                  />
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 170 1234567"
                    value={rfqPhone}
                    onChange={(e) => setRfqPhone(e.target.value)}
                    className={styles.rfqInput}
                  />
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Component & Material Category</label>
                  <select
                    value={rfqProduct}
                    onChange={(e) => setRfqProduct(e.target.value)}
                    className={styles.rfqSelect}
                  >
                    <option value="5-Axis CNC Flanges (SS 316L)">5-Axis CNC Flanges & Hubs (SS 316L)</option>
                    <option value="Titanium Fasteners Grade 5 (DIN 933)">Aerospace Grade 5 Titanium Fasteners</option>
                    <option value="Free Cutting Brass Links (IS-319)">Electrical Neutral Links & Terminals (Brass)</option>
                    <option value="GOTS Organic Ring-Spun Cotton">GOTS 100% Organic Bio-Fiber Textile</option>
                    <option value="Custom CAD Drawing / OEM Part">Custom 2D/3D CAD Drawing OEM Fabrication</option>
                  </select>
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Target Order Volume / Schedule</label>
                  <select
                    value={rfqTargetQty}
                    onChange={(e) => setRfqTargetQty(e.target.value)}
                    className={styles.rfqSelect}
                  >
                    <option value="Trial Batch (500 - 1,000 pcs)">Trial Batch (500 - 1,000 pcs)</option>
                    <option value="Half Container (2,500 pcs)">Half Container (2,500 pcs / 10 Pallets)</option>
                    <option value="Full Container Load (FCL 20ft)">Full Container Load (FCL 20ft / 20 Pallets)</option>
                    <option value="Annual Supply Contract (100k+ pcs)">Annual Supply Contract (100k+ pcs)</option>
                  </select>
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Destination Seaport / Airport</label>
                  <input
                    type="text"
                    placeholder="e.g. Port of Hamburg (Germany) / Port of Houston (USA)"
                    value={rfqPort}
                    onChange={(e) => setRfqPort(e.target.value)}
                    className={styles.rfqInput}
                  />
                </div>

                <div className={styles.rfqFormGroup}>
                  <label className={styles.rfqLabel}>Quality & Certification Requirements</label>
                  <div className={styles.rfqCheckboxGroup}>
                    <label className={styles.rfqCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={rfqMtcRequired}
                        onChange={(e) => setRfqMtcRequired(e.target.checked)}
                      />
                      <span>EN 10204 3.1 MTC Traceability</span>
                    </label>
                    <label className={styles.rfqCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={rfqSampleKit}
                        onChange={(e) => setRfqSampleKit(e.target.checked)}
                      />
                      <span>Dispatch Express Sample Kit</span>
                    </label>
                  </div>
                </div>

                <div className={`${styles.rfqFormGroup} ${styles.rfqFullCol}`}>
                  <label className={styles.rfqLabel}>Technical Specifications / CAD Drawing Link / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specify surface roughness (Ra), critical tolerances, thread pitches, or Google Drive / WeTransfer drawing links..."
                    value={rfqNotes}
                    onChange={(e) => setRfqNotes(e.target.value)}
                    className={styles.rfqTextarea}
                  />
                </div>

                <div className={styles.rfqFullCol}>
                  <button type="submit" className={styles.rfqSubmitBtn}>
                    📑 Dispatch Official Commercial RFQ →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. Manufacturing Infrastructure & Capabilities */}
      <section id="capabilities" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>[MANUFACTURING EXCELLENCE]</div>
          <h2 className={styles.sectionTitle}>
            {content.services?.title || 'Factory Floor Infrastructure & OEM Capabilities'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {content.services?.subtitle ||
              'Certified 50,000 sq.ft heavy engineering plant equipped with robotic CNC turning centers and ISO 17025 testing laboratories.'}
          </p>
        </div>

        <div className={styles.capabilitiesGrid}>
          {dynamicServices.map((srv) => (
            <div key={srv.id} className={styles.capabilityCard}>
              <div>
                <div className={styles.capabilityIconBox}>
                  {srv.icon || '⚙️'}
                </div>
                <h3 className={styles.capabilityTitle}>{srv.title}</h3>
                <p className={styles.capabilityDesc}>{srv.description}</p>
              </div>
              {srv.badge && <span className={styles.capabilityBadge}>{srv.badge}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Global Buyer Proof & Testimonials */}
      <section id="testimonials" className={styles.section} style={{ background: '#03060c', borderRadius: '24px', padding: '4.5rem 2.5rem', color: '#ffffff', margin: '2rem auto' }}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag} style={{ color: '#f59e0b' }}>[GLOBAL SUPPLY PROOF]</div>
          <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
            {content.testimonials?.title || 'Verified Tier-1 Procurement Reviews'}
          </h2>
          <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>
            {content.testimonials?.subtitle ||
              'Delivering certified direct container loads across North America, the European Union, and GCC industrial hubs.'}
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          {dynamicTestimonials.map((t) => (
            <div key={t.id} className={styles.testimonialCard}>
              <div className={styles.testimonialQuote}>“{t.content}”</div>
              <div className={styles.testimonialAuthorRow}>
                <div className={styles.testimonialAvatar}>
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialCompany}>{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Trade & Export FAQ Accordion */}
      <section id="faq" className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>[GLOBAL TRADE COMPLIANCE]</div>
          <h2 className={styles.sectionTitle}>
            {content.faq?.title || 'Export Logistics, Payment Terms & FAQ'}
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to know regarding international letters of credit, customs clearances, and container shipping lead times.
          </p>
        </div>

        <div className={styles.faqAccordion}>
          {dynamicFaqs.map((faq, idx) => (
            <div key={faq.id || idx} className={styles.faqItem}>
              <button
                type="button"
                className={styles.faqHeader}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <span style={{ color: '#d97706', fontSize: '1.25rem' }}>{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className={styles.faqBody}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. Printable Export Proforma Invoice Modal */}
      {proformaModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setProformaModalOpen(false)}>
          <div className={styles.invoiceModalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.invoiceModalClose}
              onClick={() => setProformaModalOpen(false)}
            >
              ✕
            </button>

            <div className={styles.invoiceHeaderRow}>
              <div>
                <h3 className={styles.invoiceTitle}>COMMERCIAL PROFORMA INVOICE</h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem', fontFamily: 'JetBrains Mono' }}>
                  REF: PI-IND-2026-8942 • DATE: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#0f172a' }}>
                <strong>{brandName}</strong><br />
                IEC: 0314088921 | GSTIN: 27AAACB2201Q1Z4<br />
                Gujarat GIDC Export Zone, India
              </div>
            </div>

            <div className={styles.invoiceDetailsGrid}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Consignee / Buyer Company:</label>
                <input
                  type="text"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className={styles.rfqInput}
                  style={{ width: '100%', marginTop: '0.2rem', padding: '0.4rem', color: '#0f172a', background: '#f8fafc', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Destination Country / Port:</label>
                <input
                  type="text"
                  value={buyerCountry}
                  onChange={(e) => setBuyerCountry(e.target.value)}
                  className={styles.rfqInput}
                  style={{ width: '100%', marginTop: '0.2rem', padding: '0.4rem', color: '#0f172a', background: '#f8fafc', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.invoiceTable}>
                <thead>
                  <tr>
                    <th>Item / HS Code</th>
                    <th>Quantity</th>
                    <th>Rate ({curr.code})</th>
                    <th>Total Amount ({curr.code})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>5-Axis Flange Hub SS 316L (HS: 7307.21)</td>
                    <td>{calcQty.toLocaleString()} pcs</td>
                    <td>{formatPrice(effectiveUnitCostUsd)}</td>
                    <td>{formatPrice(totalCostUsd)}</td>
                  </tr>
                  <tr>
                    <td>Seaworthy Wooden Fumigated Palletization (ISPM-15)</td>
                    <td>{activePallets} Pallets</td>
                    <td>Included (FOB)</td>
                    <td>{curr.symbol}0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '2px solid #0f172a', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Payment Terms: <strong>Irrevocable LC at Sight / TT 30-70</strong></div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Loading Port: <strong>Port Mundra / JNPT Mumbai, India</strong></div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total FOB Payable:</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', fontFamily: 'Space Grotesk' }}>
                  {formatPrice(totalCostUsd)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20Bharat%20Exports,%20I%20have%20reviewed%20Proforma%20Invoice%20PI-IND-2026-8942%20for%20${calcQty}%20units%20to%20${buyerCountry}.%20Please%20confirm%20production%20slot.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rfqSubmitBtn}
                style={{ flex: 1, textDecoration: 'none', textAlign: 'center', background: '#25d366', color: '#ffffff' }}
              >
                💬 Confirm Proforma via WhatsApp
              </a>
              <button
                type="button"
                className={styles.rfqSubmitBtn}
                style={{ flex: 1, background: '#0f172a', color: '#ffffff' }}
                onClick={() => setProformaModalOpen(false)}
              >
                Close Proforma
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Global Trade Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.brandLogo} style={{ color: '#ffffff', marginBottom: '1rem' }}>
              {content.footer?.logoUrl || content.navbar?.logoUrl ? (
                <img
                  src={content.footer?.logoUrl || content.navbar?.logoUrl || ''}
                  alt={brandName}
                  className={styles.customFooterLogoImg}
                />
              ) : (
                <div className={styles.logoIconBox}>B2B</div>
              )}
              <div className={styles.brandText}>
                <span className={styles.brandName} style={{ color: '#ffffff' }}>{brandName}</span>
                <span className={styles.brandSub}>Manufacturing & Global Exports</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.65, maxWidth: '320px' }}>
              {content.footer?.description ||
                'Premier OEM/ODM manufacturer and direct exporter certified under ISO 9001:2015, CE, and RoHS standards. Delivering direct container loads worldwide.'}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>Export Corridors</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <li>Port Mundra ➔ Hamburg (Germany)</li>
              <li>Port Mundra ➔ Houston (USA)</li>
              <li>Port JNPT ➔ Jebel Ali (Dubai)</li>
              <li>Port Chennai ➔ Rotterdam (Netherlands)</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>Facility & Logistics</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
              {content.contact?.address || 'Plot 45-48, Sector 9 Industrial Area, GIDC Heavy Engineering Zone, Gujarat, India'}<br />
              Bonded Port Links: Mundra & JNPT
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>Commercial Trade Desk</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              Direct WhatsApp: {phone}<br />
              Proforma Inquiries: {email}
            </p>
            <div style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 800 }}>
              ⭐ IndiaMART TrustSEAL & Star Supplier Verified
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div>
            {content.footer?.copyright || `© ${new Date().getFullYear()} ${brandName}. All rights reserved. IEC: 0314088921 | GSTIN: 27AAACB2201Q1Z4`}
          </div>
          <div>
            FOB/CIF Ocean Freight • LCL/FCL Sea Cargo • ISO 9001:2015 Certified • EN 10204 3.1 Traceability
          </div>
        </div>
      </footer>
    </div>
  );
}
