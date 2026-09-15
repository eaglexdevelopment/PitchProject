'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Pitch } from '@/types/pitch';
import { getPitchBySlug, incrementPitchViews } from '@/lib/pitchService';
import { getTemplateComponent } from '@/templates/registry';
import Link from 'next/link';

export default function PublicPitchPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPitch = async () => {
      setLoading(true);
      const data = await getPitchBySlug(slug);
      if (!data) {
        setNotFound(true);
      } else {
        setPitch(data);
        // Increment analytics view counter
        if (data.id) {
          incrementPitchViews(data.id);
        }
      }
      setLoading(false);
    };

    fetchPitch();
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#090d16',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 94, 0, 0.2)',
            borderTopColor: '#ff5e00',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: '0.95rem', color: '#94a3b8' }}>Loading custom experience...</p>
      </div>
    );
  }

  if (notFound || !pitch) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#090d16',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            maxWidth: '460px',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
            Pitch Not Found
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
            The website pitch for <code style={{ color: '#ff5e00' }}>{slug}</code> may have been moved or is currently unavailable.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.65rem 1.5rem',
              backgroundColor: '#ff5e00',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Visit EagleX Agency
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = getTemplateComponent(pitch.templateId);

  return (
    <>
      {pitch.status === 'draft' && (
        <div
          style={{
            backgroundColor: '#f59e0b',
            color: '#111827',
            padding: '0.5rem 1rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 9999,
          }}
        >
          ⚠️ DRAFT PREVIEW MODE — This pitch is currently saved as a draft and is not public.
        </div>
      )}
      <TemplateComponent pitch={pitch} />
    </>
  );
}
