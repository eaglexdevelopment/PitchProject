'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Pitch } from '@/types/pitch';
import { getPitchById } from '@/lib/pitchService';
import PitchEditor from '@/components/PitchEditor';
import Link from 'next/link';

export default function EditPitchPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      const data = await getPitchById(id);
      if (!data) {
        alert('Pitch not found.');
        router.push('/admin/pages');
      } else {
        setPitch(data);
      }
      setLoading(false);
    };
    load();
  }, [id, router]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
        Loading pitch editor...
      </div>
    );
  }

  if (!pitch) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p>Pitch not found.</p>
        <Link href="/admin/pages" style={{ color: '#ff5e00', fontWeight: 600 }}>
          ← Return to Pitch Pages
        </Link>
      </div>
    );
  }

  return <PitchEditor initialPitch={pitch} isEditing={true} />;
}
