'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Pitch,
  PitchContent,
  PitchStatus,
  TemplateId,
  DynamicSection,
  SectionType,
} from '@/types/pitch';
import { createPitch, updatePitch, getDefaultPitchContent } from '@/lib/pitchService';
import {
  TEMPLATES_LIST,
  getTemplateMetadata,
  getDefaultSectionsList,
  getTemplateComponent,
} from '@/templates/registry';
import ImageCropModal, { AspectRatioType } from '@/components/ImageCropModal';
import styles from '@/app/admin/pages/editor.module.css';

interface PitchEditorProps {
  initialPitch?: Pitch;
  isEditing?: boolean;
}

const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: 'Hero Section',
  marquee: 'Partner & Trust Logos (Marquee)',
  services: 'Services & Capabilities',
  about: 'About Us & Key Metrics',
  testimonials: 'Client Reviews & Social Proof',
  pricing: 'Pricing Packages',
  ctaBanner: 'Call-to-Action Banner',
  faq: 'FAQ Accordion',
  contact: 'Contact & Inquiries',
  footer: 'Footer & Links',
};

export default function PitchEditor({ initialPitch, isEditing = false }: PitchEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  // Floating Live Preview Modal State
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // AI Autofill Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiApiKey, setAiApiKey] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Image Crop & Cloudinary Upload Modal State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalConfig, setCropModalConfig] = useState<{
    title: string;
    initialSrc?: string | null;
    aspectRatio: AspectRatioType;
    targetField: string;
    targetIndex?: number;
  }>({
    title: 'Crop Image',
    initialSrc: null,
    aspectRatio: '3:4',
    targetField: 'hero.doctorImageUrl',
  });

  const openCropModalForField = (
    targetField: string,
    title: string,
    aspectRatio: AspectRatioType = 'free',
    currentSrc?: string,
    targetIndex?: number
  ) => {
    setCropModalConfig({
      title,
      initialSrc: currentSrc || null,
      aspectRatio,
      targetField,
      targetIndex,
    });
    setCropModalOpen(true);
  };

  const handleCropSuccess = (uploadedUrl: string) => {
    const { targetField, targetIndex } = cropModalConfig;

    if (targetField === 'hero.heroImageUrl') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, heroImageUrl: uploadedUrl } }));
    } else if (targetField === 'hero.doctorImageUrl') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, doctorImageUrl: uploadedUrl } }));
    } else if (targetField === 'hero.beforeImageUrl') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, beforeImageUrl: uploadedUrl } }));
    } else if (targetField === 'hero.afterImageUrl') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, afterImageUrl: uploadedUrl } }));
    } else if (targetField === 'hero.clinicImageUrl') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, clinicImageUrl: uploadedUrl } }));
    } else if (targetField === 'testimonials.item.avatar' && typeof targetIndex === 'number') {
      setContent((prev) => {
        const items = [...(prev.testimonials?.items || [])];
        if (items[targetIndex]) {
          items[targetIndex] = { ...items[targetIndex], avatarUrl: uploadedUrl };
        }
        return { ...prev, testimonials: { ...prev.testimonials, items } };
      });
    }
  };

  // Form States
  const [title, setTitle] = useState(initialPitch?.title || 'Bespoke Website Pitch');
  const [clientName, setClientName] = useState(initialPitch?.clientName || '');
  const [slug, setSlug] = useState(initialPitch?.slug || '');
  const [status, setStatus] = useState<PitchStatus>(initialPitch?.status || 'published');
  const [templateId, setTemplateId] = useState<TemplateId>(initialPitch?.templateId || 'apex-agency');
  const [content, setContent] = useState<PitchContent>(() => {
    const base = initialPitch?.content || getDefaultPitchContent('New Client');
    if (!base.sections || base.sections.length === 0) {
      base.sections = getDefaultSectionsList();
    }
    return base;
  });

  // Load saved API key from localStorage if available
  useEffect(() => {
    const savedKey = localStorage.getItem('eaglex_ai_api_key');
    if (savedKey) setAiApiKey(savedKey);
  }, []);

  // Auto generate slug from client name if creating
  useEffect(() => {
    if (!isEditing && clientName && !slug) {
      setSlug(
        clientName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  }, [clientName, isEditing, slug]);

  // When template changes, update the template styling tokens
  const handleTemplateChange = (newTplId: TemplateId) => {
    setTemplateId(newTplId);
    const meta = getTemplateMetadata(newTplId);
    setContent((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        primaryColor: meta.primaryColor,
        accentColor: meta.accentColor,
        fontFamily: meta.fontFamily,
        darkBackground: meta.darkBackground,
      },
    }));
  };

  // Section Order & Reorder Helpers
  const sections = content.sections || getDefaultSectionsList();

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIdx, 0, moved);
    setContent({ ...content, sections: newSections });
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setContent({ ...content, sections: newSections });
  };

  const toggleSectionEnabled = (index: number) => {
    const newSections = [...sections];
    newSections[index].enabled = !newSections[index].enabled;
    setContent({ ...content, sections: newSections });
  };

  const addSection = (type: SectionType) => {
    const newSec: DynamicSection = {
      id: `sec-${type}-${Date.now()}`,
      type,
      title: SECTION_TYPE_LABELS[type],
      enabled: true,
      data: {},
    };
    setContent({ ...content, sections: [...sections, newSec] });
    setActiveTab(type);
  };

  // AI Autofill Trigger
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter some notes or details about the client.');
      return;
    }

    setIsGeneratingAi(true);
    if (aiApiKey) {
      localStorage.setItem('eaglex_ai_api_key', aiApiKey);
    }

    try {
      const res = await fetch('/api/ai/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          templateId,
          apiKey: aiApiKey || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate content with AI');
      }

      const generated = json.data;
      if (generated.clientName) setClientName(generated.clientName);
      if (generated.title) setTitle(generated.title);
      if (generated.slug) setSlug(generated.slug);
      if (generated.content) {
        setContent({
          ...generated.content,
          sections: content.sections || getDefaultSectionsList(),
        });
      }

      setShowAiModal(false);
      alert('✨ AI successfully framed and filled all pitch sections!');
    } catch (err: any) {
      console.error(err);
      alert(`AI Generation Failed: ${err.message}`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Save to DB
  const handleSave = async (saveStatus: PitchStatus) => {
    if (!clientName.trim()) {
      alert('Please enter a Client Name.');
      setActiveTab('general');
      return;
    }
    if (!slug.trim()) {
      alert('Please enter a unique URL slug.');
      setActiveTab('general');
      return;
    }

    setSaving(true);
    try {
      if (isEditing && initialPitch?.id) {
        await updatePitch(initialPitch.id, {
          title,
          clientName,
          slug,
          status: saveStatus,
          templateId,
          content,
        });
        alert('Pitch successfully updated!');
        router.push('/admin/pages');
      } else {
        await createPitch({
          title,
          clientName,
          slug,
          status: saveStatus,
          templateId,
          content,
        });
        alert('Pitch successfully created!');
        router.push('/admin/pages');
      }
    } catch (err: any) {
      console.error('Error saving pitch:', err);
      alert(`Error saving pitch: ${err?.message || 'Check console'}`);
    } finally {
      setSaving(false);
    }
  };

  // Construct preview pitch object for real-time simulator
  const livePreviewPitch: Pitch = {
    title: title || 'Website Pitch',
    clientName: clientName || 'Client Company',
    slug: slug || 'preview-pitch',
    status,
    templateId,
    viewsCount: initialPitch?.viewsCount || 0,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const TemplateComponent = getTemplateComponent(templateId);
  const selectedMeta = getTemplateMetadata(templateId);

  return (
    <div className={styles.editorContainer}>
      {/* Sticky Action Bar */}
      <div className={styles.actionBar}>
        <div className={styles.actionLeft}>
          <Link href="/admin/pages" className={styles.backBtn}>
            ← Pages
          </Link>
          <div className={styles.editorTitle}>
            <h2>{isEditing ? `Edit: ${clientName || 'Untitled'}` : 'Create New Pitch'}</h2>
            <span>{slug ? `/p/${slug}` : 'Real-time multi-section engine'}</span>
          </div>
        </div>

        <div className={styles.actionRight}>
          <button
            type="button"
            onClick={() => setShowAiModal(true)}
            className={styles.aiAutofillBtn}
          >
            ✨ AI Autofill with LangChain
          </button>

          <button
            type="button"
            onClick={() => setShowFloatingPreview(true)}
            className={styles.previewToggleBtn}
          >
            👁️ Open Live Preview
          </button>

          <button
            type="button"
            onClick={() => handleSave('draft')}
            disabled={saving}
            className={styles.saveDraftBtn}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave('published')}
            disabled={saving}
            className={styles.publishBtn}
          >
            {saving ? 'Saving...' : '🚀 Publish Live'}
          </button>
        </div>
      </div>

      {/* Floating Action Button (FAB) in Bottom Right */}
      <button
        type="button"
        onClick={() => setShowFloatingPreview(true)}
        className={styles.floatingPreviewFab}
        title="Open Real-Time Live Preview"
      >
        <span className={styles.fabDot} />
        👁️ Live Preview
      </button>

      {/* Full Width Editor Card 1: 10-Template Dropdown Selector */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5e00" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Template Architecture (10 Predefined Themes)
            </h3>
            <p className={styles.sectionDesc}>
              Select any of the 10 conversion-optimized themes. The builder automatically adapts typography, colors, and layout.
            </p>
          </div>
        </div>

        <div className={styles.templateSelectWrapper}>
          <select
            value={templateId}
            onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
            className={styles.templateDropdown}
          >
            {TEMPLATES_LIST.map((tpl, i) => (
              <option key={tpl.id} value={tpl.id}>
                {i + 1}. {tpl.name} — [{tpl.badge}] ({tpl.category})
              </option>
            ))}
          </select>

          <div className={styles.templatePreviewBadge}>
            <span className={styles.templatePill} style={{ backgroundColor: selectedMeta.primaryColor }}>
              {selectedMeta.badge}
            </span>
            <span className={styles.templateMetaText}>
              <strong>{selectedMeta.name}:</strong> {selectedMeta.description}
            </span>
          </div>
        </div>
      </div>

      {/* Full Width Editor Card 2: Dynamic Modular Section Sequence Manager */}
      <div className={styles.sectionCard}>
        <div className={styles.sectionManagerHeader}>
          <div>
            <h3 className={styles.sectionTitle} style={{ fontSize: '1rem' }}>
              📑 Page Section Manager ({sections.length} Active Sections)
            </h3>
            <p className={styles.sectionDesc} style={{ fontSize: '0.85rem' }}>
              Click arrows to reorder, add new predefined components, or toggle visibility.
            </p>
          </div>

          <select
            onChange={(e) => {
              if (e.target.value) {
                addSection(e.target.value as SectionType);
                e.target.value = '';
              }
            }}
            defaultValue=""
            className={styles.addSectionSelect}
          >
            <option value="" disabled>
              + Add Predefined Component...
            </option>
            <option value="marquee">+ Partner / Brand Logos (Marquee)</option>
            <option value="pricing">+ Pricing Packages Table</option>
            <option value="services">+ Services & Capabilities</option>
            <option value="about">+ About Us & Metrics</option>
            <option value="testimonials">+ Client Reviews & Proof</option>
            <option value="ctaBanner">+ Call-To-Action Banner</option>
            <option value="faq">+ FAQ Accordion</option>
            <option value="contact">+ Contact & Inquiries</option>
          </select>
        </div>

        <div className={styles.sectionOrderList}>
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`${styles.sectionOrderItem} ${
                activeTab === sec.type ? styles.activeSec : ''
              }`}
            >
              <div className={styles.secItemLeft} onClick={() => setActiveTab(sec.type)}>
                <span className={styles.secTypeTag}>{sec.type}</span>
                <span className={styles.secItemTitle}>{sec.title || SECTION_TYPE_LABELS[sec.type]}</span>
                {!sec.enabled && (
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    (Hidden)
                  </span>
                )}
              </div>

              <div className={styles.secItemActions}>
                <button
                  type="button"
                  onClick={() => toggleSectionEnabled(idx)}
                  className={styles.secControlBtn}
                  title={sec.enabled ? 'Hide section' : 'Show section'}
                >
                  {sec.enabled ? '👁️' : '🚫'}
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className={styles.secControlBtn}
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className={styles.secControlBtn}
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => deleteSection(idx)}
                  className={`${styles.secControlBtn} ${styles.secDeleteBtn}`}
                  title="Delete Section"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className={styles.tabsContainer}>
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`${styles.tabBtn} ${activeTab === 'general' ? styles.activeTab : ''}`}
        >
          General & URL
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('branding')}
          className={`${styles.tabBtn} ${activeTab === 'branding' ? styles.activeTab : ''}`}
        >
          Theme & Colors
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('navbar')}
          className={`${styles.tabBtn} ${activeTab === 'navbar' ? styles.activeTab : ''}`}
        >
          Navbar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`${styles.tabBtn} ${activeTab === 'hero' ? styles.activeTab : ''}`}
        >
          Hero
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`${styles.tabBtn} ${activeTab === 'media' ? styles.activeTab : ''}`}
        >
          🖼️ Images & Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('marquee')}
          className={`${styles.tabBtn} ${activeTab === 'marquee' ? styles.activeTab : ''}`}
        >
          Marquee
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`${styles.tabBtn} ${activeTab === 'services' ? styles.activeTab : ''}`}
        >
          Services
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`${styles.tabBtn} ${activeTab === 'about' ? styles.activeTab : ''}`}
        >
          About
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`${styles.tabBtn} ${activeTab === 'pricing' ? styles.activeTab : ''}`}
        >
          Pricing
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('testimonials')}
          className={`${styles.tabBtn} ${activeTab === 'testimonials' ? styles.activeTab : ''}`}
        >
          Reviews
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ctaBanner')}
          className={`${styles.tabBtn} ${activeTab === 'ctaBanner' ? styles.activeTab : ''}`}
        >
          CTA Banner
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('faq')}
          className={`${styles.tabBtn} ${activeTab === 'faq' ? styles.activeTab : ''}`}
        >
          FAQ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.activeTab : ''}`}
        >
          Contact
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`${styles.tabBtn} ${activeTab === 'footer' ? styles.activeTab : ''}`}
        >
          Footer
        </button>
      </div>

      {/* TAB CONTENT: General */}
      {activeTab === 'general' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>General Pitch Metadata</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Client / Company Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Skyline Medical, Acme Corp"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Pitch Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bespoke Web Design Pitch"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>URL Slug *</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ padding: '0.65rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRight: 'none', borderRadius: '8px 0 0 8px', fontSize: '0.85rem', color: '#64748b' }}>
                  /p/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="custom-slug"
                  className={styles.input}
                  style={{ borderRadius: '0 8px 8px 0' }}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Publish Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PitchStatus)}
                className={styles.select}
              >
                <option value="published">● Live (Published)</option>
                <option value="draft">○ Draft</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Branding */}
      {activeTab === 'branding' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Branding & Theme Tokens</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Brand Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={content.branding.primaryColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, primaryColor: e.target.value },
                    })
                  }
                  style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={content.branding.primaryColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, primaryColor: e.target.value },
                    })
                  }
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Accent Highlight Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={content.branding.accentColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, accentColor: e.target.value },
                    })
                  }
                  style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={content.branding.accentColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      branding: { ...content.branding, accentColor: e.target.value },
                    })
                  }
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Theme Mode</label>
              <select
                value={content.branding.darkBackground ? 'dark' : 'light'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    branding: { ...content.branding, darkBackground: e.target.value === 'dark' },
                  })
                }
                className={styles.select}
              >
                <option value="dark">Dark Luxury Mode</option>
                <option value="light">Crisp Light Mode</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Navbar */}
      {activeTab === 'navbar' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Navbar Configuration</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Brand Title</label>
              <input
                type="text"
                value={content.navbar.brandName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    navbar: { ...content.navbar, brandName: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>CTA Button Text</label>
              <input
                type="text"
                value={content.navbar.ctaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    navbar: { ...content.navbar, ctaText: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Hero */}
      {activeTab === 'hero' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Hero Section</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Badge</label>
              <input
                type="text"
                value={content.hero.badge}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Headline</label>
              <input
                type="text"
                value={content.hero.headline}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Subheadline</label>
              <textarea
                value={content.hero.subheadline}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })
                }
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Button Text</label>
              <input
                type="text"
                value={content.hero.primaryCtaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, primaryCtaText: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Secondary Button Text</label>
              <input
                type="text"
                value={content.hero.secondaryCtaText || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, secondaryCtaText: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Hero Mockup / Platform Image URL</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={content.hero.heroImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, heroImageUrl: e.target.value },
                    })
                  }
                  placeholder="https://... or /images/..."
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.heroImageUrl',
                      'Crop Hero Platform / Mockup Image',
                      '16:9',
                      content.hero.heroImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', padding: '0 1rem', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Doctor / Speaker Portrait URL</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={content.hero.doctorImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, doctorImageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/dental/dr_sarah_jenkins.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.doctorImageUrl',
                      'Crop Doctor / Speaker Portrait (3:4 Ratio)',
                      '3:4',
                      content.hero.doctorImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Clinic / Suite Facility Photo URL</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={content.hero.clinicImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, clinicImageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/dental/treatment_suite.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.clinicImageUrl',
                      'Crop Clinic / Facility Photo (16:9 Ratio)',
                      '16:9',
                      content.hero.clinicImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Media & Images */}
      {activeTab === 'media' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>🖼️ Image Assets & Cloudinary Manager</h3>
              <p className={styles.sectionDesc}>
                Add direct image links or upload images to Cloudinary for hero banners, doctor profiles, and before/after comparisons.
              </p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* 1. Doctor Portrait */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Doctor / Primary Portrait (3:4 Aspect Ratio)</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={content.hero.doctorImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, doctorImageUrl: e.target.value },
                    })
                  }
                  placeholder="https://... or /images/dental/dr_sarah_jenkins.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.doctorImageUrl',
                      'Crop Doctor Portrait (3:4 Ratio)',
                      '3:4',
                      content.hero.doctorImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
              {content.hero.doctorImageUrl && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={content.hero.doctorImageUrl}
                    alt="Doctor Preview"
                    style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #00d4aa' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#10b981' }}>✓ Image Linked & Ready</span>
                </div>
              )}
            </div>

            {/* 2. Before / After Photos */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Before Comparison Photo URL</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={content.hero.beforeImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, beforeImageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/dental/smile_before.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.beforeImageUrl',
                      'Crop Before Transformation Photo (1:1 Ratio)',
                      '1:1',
                      content.hero.beforeImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
              {content.hero.beforeImageUrl && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={content.hero.beforeImageUrl}
                    alt="Before Preview"
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #00d4aa' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#10b981' }}>✓ Before Photo Loaded</span>
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>After Comparison Photo URL</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={content.hero.afterImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, afterImageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/dental/smile_after.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.afterImageUrl',
                      'Crop After Transformation Photo (1:1 Ratio)',
                      '1:1',
                      content.hero.afterImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
              {content.hero.afterImageUrl && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={content.hero.afterImageUrl}
                    alt="After Preview"
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #00d4aa' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#10b981' }}>✓ After Photo Loaded</span>
                </div>
              )}
            </div>

            {/* 3. Clinic Photo */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Clinic Facility / Suite Image URL (16:9 Aspect Ratio)</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  value={content.hero.clinicImageUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, clinicImageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/dental/treatment_suite.jpg"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() =>
                    openCropModalForField(
                      'hero.clinicImageUrl',
                      'Crop Clinic / Facility Photo (16:9 Ratio)',
                      '16:9',
                      content.hero.clinicImageUrl
                    )
                  }
                  className={styles.saveDraftBtn}
                  style={{ whiteSpace: 'nowrap', background: '#00d4aa', color: '#04070d', fontWeight: 600 }}
                >
                  ✂️ Crop & Upload
                </button>
              </div>
              {content.hero.clinicImageUrl && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={content.hero.clinicImageUrl}
                    alt="Facility Preview"
                    style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #00d4aa' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#10b981' }}>✓ Facility Photo Loaded</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Marquee */}
      {activeTab === 'marquee' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Partner & Trust Logos (Marquee)</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Section Heading</label>
              <input
                type="text"
                value={content.marquee?.title || 'TRUSTED BY LEADING ENTERPRISES'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    marquee: {
                      title: e.target.value,
                      items: content.marquee?.items || ['Forbes', 'Bloomberg', 'TechCrunch', 'Inc 5000'],
                    },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Brand Logos (comma separated)</label>
              <input
                type="text"
                value={(content.marquee?.items || []).join(', ')}
                onChange={(e) =>
                  setContent({
                    ...content,
                    marquee: {
                      title: content.marquee?.title || 'TRUSTED BY LEADING ENTERPRISES',
                      items: e.target.value.split(',').map((s) => s.trim()),
                    },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Services */}
      {activeTab === 'services' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Services & Capabilities</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section Title</label>
              <input
                type="text"
                value={content.services.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    services: { ...content.services, title: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section Subtitle</label>
              <input
                type="text"
                value={content.services.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    services: { ...content.services, subtitle: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.dynamicList} style={{ marginTop: '1.5rem' }}>
            {content.services.items.map((srv, idx) => (
              <div key={srv.id || idx} className={styles.dynamicItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIndex}>Service #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.services.items.filter((_, i) => i !== idx);
                      setContent({ ...content, services: { ...content.services, items: updated } });
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...content.services.items];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, services: { ...content.services, items: updated } });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Badge Tag</label>
                    <input
                      type="text"
                      value={srv.badge || ''}
                      onChange={(e) => {
                        const updated = [...content.services.items];
                        updated[idx].badge = e.target.value;
                        setContent({ ...content, services: { ...content.services, items: updated } });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Description</label>
                    <textarea
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services.items];
                        updated[idx].description = e.target.value;
                        setContent({ ...content, services: { ...content.services, items: updated } });
                      }}
                      className={styles.textarea}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newItem = {
                  id: Date.now().toString(),
                  title: 'New Capability',
                  description: 'High performance results for your company.',
                  badge: 'Growth',
                };
                setContent({
                  ...content,
                  services: { ...content.services, items: [...content.services.items, newItem] },
                });
              }}
              className={styles.addItemBtn}
            >
              + Add Service Card
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: About */}
      {activeTab === 'about' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>About Us & Key Metrics</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>About Title</label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, title: e.target.value } })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea
                value={content.about.description}
                onChange={(e) =>
                  setContent({ ...content, about: { ...content.about, description: e.target.value } })
                }
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.dynamicList} style={{ marginTop: '1.5rem' }}>
            {content.about.metrics.map((met, idx) => (
              <div key={met.id || idx} className={styles.dynamicItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIndex}>Metric #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.about.metrics.filter((_, i) => i !== idx);
                      setContent({ ...content, about: { ...content.about, metrics: updated } });
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Metric Value</label>
                    <input
                      type="text"
                      value={met.value}
                      onChange={(e) => {
                        const updated = [...content.about.metrics];
                        updated[idx].value = e.target.value;
                        setContent({ ...content, about: { ...content.about, metrics: updated } });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Metric Label</label>
                    <input
                      type="text"
                      value={met.label}
                      onChange={(e) => {
                        const updated = [...content.about.metrics];
                        updated[idx].label = e.target.value;
                        setContent({ ...content, about: { ...content.about, metrics: updated } });
                      }}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Pricing */}
      {activeTab === 'pricing' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Pricing Packages</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section Title</label>
              <input
                type="text"
                value={content.pricing?.title || 'Investment Plans'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    pricing: {
                      ...content.pricing,
                      title: e.target.value,
                      tiers: content.pricing?.tiers || [],
                    },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Section Subtitle</label>
              <input
                type="text"
                value={content.pricing?.subtitle || 'Choose the right scope'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    pricing: {
                      ...content.pricing,
                      title: content.pricing?.title || 'Investment Plans',
                      subtitle: e.target.value,
                      tiers: content.pricing?.tiers || [],
                    },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.dynamicList} style={{ marginTop: '1.5rem' }}>
            {(content.pricing?.tiers || []).map((tier, idx) => (
              <div key={tier.id || idx} className={styles.dynamicItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIndex}>Tier #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (content.pricing?.tiers || []).filter((_, i) => i !== idx);
                      setContent({
                        ...content,
                        pricing: {
                          title: content.pricing?.title || 'Investment Plans',
                          tiers: updated,
                        },
                      });
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tier Name</label>
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => {
                        const updated = [...(content.pricing?.tiers || [])];
                        updated[idx].name = e.target.value;
                        setContent({
                          ...content,
                          pricing: {
                            title: content.pricing?.title || 'Investment Plans',
                            tiers: updated,
                          },
                        });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Price (e.g. $2,490)</label>
                    <input
                      type="text"
                      value={tier.price}
                      onChange={(e) => {
                        const updated = [...(content.pricing?.tiers || [])];
                        updated[idx].price = e.target.value;
                        setContent({
                          ...content,
                          pricing: {
                            title: content.pricing?.title || 'Investment Plans',
                            tiers: updated,
                          },
                        });
                      }}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Testimonials */}
      {activeTab === 'testimonials' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Client Reviews & Testimonials</h3>
          </div>
          <div className={styles.dynamicList}>
            {content.testimonials.items.map((test, idx) => (
              <div key={test.id || idx} className={styles.dynamicItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIndex}>Review #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.testimonials.items.filter((_, i) => i !== idx);
                      setContent({
                        ...content,
                        testimonials: { ...content.testimonials, items: updated },
                      });
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Author Name</label>
                    <input
                      type="text"
                      value={test.name}
                      onChange={(e) => {
                        const updated = [...content.testimonials.items];
                        updated[idx].name = e.target.value;
                        setContent({
                          ...content,
                          testimonials: { ...content.testimonials, items: updated },
                        });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Content</label>
                    <textarea
                      value={test.content}
                      onChange={(e) => {
                        const updated = [...content.testimonials.items];
                        updated[idx].content = e.target.value;
                        setContent({
                          ...content,
                          testimonials: { ...content.testimonials, items: updated },
                        });
                      }}
                      className={styles.textarea}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CTA Banner */}
      {activeTab === 'ctaBanner' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>CTA Banner</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Banner Headline</label>
              <input
                type="text"
                value={content.ctaBanner.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    ctaBanner: { ...content.ctaBanner, title: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Supporting Text</label>
              <textarea
                value={content.ctaBanner.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    ctaBanner: { ...content.ctaBanner, description: e.target.value },
                  })
                }
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Button Text</label>
              <input
                type="text"
                value={content.ctaBanner.buttonText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    ctaBanner: { ...content.ctaBanner, buttonText: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FAQ */}
      {activeTab === 'faq' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>FAQ Accordion</h3>
          </div>
          <div className={styles.dynamicList}>
            {content.faq.items.map((item, idx) => (
              <div key={item.id || idx} className={styles.dynamicItem}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIndex}>Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.faq.items.filter((_, i) => i !== idx);
                      setContent({ ...content, faq: { ...content.faq, items: updated } });
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Question</label>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => {
                        const updated = [...content.faq.items];
                        updated[idx].question = e.target.value;
                        setContent({ ...content, faq: { ...content.faq, items: updated } });
                      }}
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.label}>Answer</label>
                    <textarea
                      value={item.answer}
                      onChange={(e) => {
                        const updated = [...content.faq.items];
                        updated[idx].answer = e.target.value;
                        setContent({ ...content, faq: { ...content.faq, items: updated } });
                      }}
                      className={styles.textarea}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Contact */}
      {activeTab === 'contact' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Contact & Inquiries</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="text"
                value={content.contact?.email || 'hello@clientcompany.com'}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: {
                      title: content.contact?.title || 'Get In Touch',
                      email: e.target.value,
                    },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Footer */}
      {activeTab === 'footer' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Footer Configuration</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Brand Name</label>
              <input
                type="text"
                value={content.footer.brandName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, brandName: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Copyright Text</label>
              <input
                type="text"
                value={content.footer.copyright}
                onChange={(e) =>
                  setContent({
                    ...content,
                    footer: { ...content.footer, copyright: e.target.value },
                  })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Modal Preview Component */}
      {showFloatingPreview && (
        <div className={styles.floatingModalBackdrop}>
          <div className={styles.floatingModalContent}>
            <div className={styles.floatingModalHeader}>
              <div className={styles.floatingModalTitle}>
                <span className={styles.fabDot} />
                Live Real-Time Preview ({selectedMeta.name})
              </div>

              <div className={styles.deviceControls}>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`${styles.deviceBtn} ${
                    previewDevice === 'desktop' ? styles.activeDevice : ''
                  }`}
                >
                  🖥️ Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`${styles.deviceBtn} ${
                    previewDevice === 'tablet' ? styles.activeDevice : ''
                  }`}
                >
                  📱 Tablet
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`${styles.deviceBtn} ${
                    previewDevice === 'mobile' ? styles.activeDevice : ''
                  }`}
                >
                  📱 Mobile
                </button>
              </div>

              <div className={styles.modalActionBtns}>
                <button
                  type="button"
                  onClick={() => setShowFloatingPreview(false)}
                  className={styles.closeModalIconBtn}
                  title="Close Preview"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.floatingModalBody}>
              <div
                className={styles.floatingFrameInner}
                style={{
                  maxWidth:
                    previewDevice === 'mobile'
                      ? '390px'
                      : previewDevice === 'tablet'
                      ? '768px'
                      : '100%',
                }}
              >
                <TemplateComponent pitch={livePreviewPitch} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Autofill Modal */}
      {showAiModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <h3>✨ AI Pitch Generator</h3>
                <p>Paste rough discovery notes and AI will structure all 10 website sections.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className={styles.modalCloseBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Client Discovery Notes / Business Information *
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Skyline Dentistry in Miami, Florida. 15 years experience, cosmetic veneers, emergency dental, wants modern luxury feel, highlight 500+ 5-star reviews..."
                className={styles.textarea}
                style={{ minHeight: '130px' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Groq / Moonshot / OpenAI API Key (Optional)</label>
              <input
                type="password"
                value={aiApiKey}
                onChange={(e) => setAiApiKey(e.target.value)}
                placeholder="gsk_... or sk-..."
                className={styles.input}
              />
              <span className={styles.helpText}>
                Leave blank to use environment default.
              </span>
            </div>

            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isGeneratingAi}
              className={styles.generateActionBtn}
            >
              {isGeneratingAi ? '⏳ Generating Pitch Content...' : '⚡ Generate & Seed Pitch Sections'}
            </button>
          </div>
        </div>
      )}

      {/* Interactive Image Crop & Cloudinary Upload Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        initialImageSrc={cropModalConfig.initialSrc}
        aspectRatioPreset={cropModalConfig.aspectRatio}
        title={cropModalConfig.title}
        onClose={() => setCropModalOpen(false)}
        onCropAndUploadSuccess={handleCropSuccess}
      />
    </div>
  );
}
