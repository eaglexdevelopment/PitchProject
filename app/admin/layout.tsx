'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AuthGuard from '@/components/AuthGuard';
import styles from './admin.module.css';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('eaglex_sidebar_collapsed');
    if (saved !== null) {
      setIsCollapsed(saved === 'true');
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('eaglex_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className={styles.layoutContainer}>
        {/* Collapsible Sidebar */}
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
          <div className={styles.logoContainer}>
            {!isCollapsed && (
              <div>
                <div className={styles.logoText}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2400/svg">
                    <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="#ff5e00" />
                    <path d="M2 17L12 22L22 17" stroke="#ff5e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#ff5e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  EAGLE<span>X</span>
                </div>
                <div className={styles.logoSubtext}>COMMAND CENTER</div>
              </div>
            )}

            {isCollapsed && (
              <div style={{ margin: '0 auto' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2400/svg">
                  <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="#ff5e00" />
                </svg>
              </div>
            )}

            <button
              onClick={toggleSidebar}
              className={styles.collapseToggleBtn}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          <nav className={styles.nav}>
            <Link
              href="/admin"
              className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}
              title={isCollapsed ? 'Overview' : undefined}
            >
              <div className={styles.navItemIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                </svg>
              </div>
              {!isCollapsed && <span className={styles.navItemLabel}>Overview</span>}
            </Link>

            <Link
              href="/admin/pages"
              className={`${styles.navItem} ${pathname.startsWith('/admin/pages') ? styles.active : ''}`}
              title={isCollapsed ? 'Pitch Pages' : undefined}
            >
              <div className={styles.navItemIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              {!isCollapsed && <span className={styles.navItemLabel}>Pitch Pages</span>}
            </Link>
          </nav>

          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
              </div>
              {!isCollapsed && (
                <div className={styles.userDetails}>
                  <span className={styles.userEmail}>{userEmail || 'Admin User'}</span>
                  <span className={styles.userRole}>ADMINISTRATOR</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className={styles.signOutBtn}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
