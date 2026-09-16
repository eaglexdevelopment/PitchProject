'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ALLOWED_ADMIN_EMAILS = [
  'yash.gupta.11.7.2004@gmail.com',
  'rishipandey3697@gmail.com',
  'yashbjp888@gmail.com',
  'vishalkumar280404@gmail.com',
].map((e) => e.toLowerCase());

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Not logged in
        router.push('/login');
      } else if (!ALLOWED_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
        // Logged in, but unauthorized email
        auth.signOut().then(() => {
          router.push('/login?error=unauthorized');
        });
      } else {
        // Logged in and authorized
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
        <p style={{ color: '#111', fontFamily: 'system-ui, sans-serif' }}>Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
