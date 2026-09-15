'use client';

import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard Overview
          </h1>
          <p className={styles.pageSubtitle}>Real-time analytics & activity feed</p>
        </div>
        <div className={styles.liveBadge}>
          <div className={styles.liveDot}></div>
          LIVE SYSTEM
        </div>
      </div>

      <div className={styles.statsGrid}>
        {/* Total Inquiries Card */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className={styles.statValueContainer}>
            <span className={styles.statValue}>1</span>
            <span className={`${styles.statBadge} ${styles.badgeGray}`}>0 UNREAD</span>
          </div>
          <span className={styles.statLabel}>TOTAL INQUIRIES</span>
        </div>

        {/* Live Projects Card */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className={styles.statValueContainer}>
            <span className={styles.statValue}>7</span>
            <span className={`${styles.statBadge} ${styles.badgeOrange}`}>3 FEATURED</span>
          </div>
          <span className={styles.statLabel}>LIVE PROJECTS</span>
        </div>

        {/* Response Status Card */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className={styles.statValueContainer}>
            <span className={styles.statValue}>0</span>
            <span className={`${styles.statBadge} ${styles.badgeGreen}`}>ALL CAUGHT UP</span>
          </div>
          <span className={styles.statLabel}>RESPONSE STATUS</span>
        </div>
      </div>

      <div className={styles.lowerGrid}>
        {/* Recent Inquiries */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Recent Inquiries
            </h2>
            <Link href="/admin/inbox" className={styles.cardAction}>
              View Inbox ↗
            </Link>
          </div>
          
          <div className={styles.inquiryItem}>
            <div className={styles.inquiryLeft}>
              <div className={styles.inquiryAvatar}>J</div>
              <div>
                <span className={styles.inquiryName}>Jalaj Bhatt</span>
                <span className={styles.inquirySubject}>Hire me</span>
              </div>
            </div>
            <div className={styles.inquiryTime}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              May 29, 2026, 08:05 PM
            </div>
          </div>
        </div>

        {/* Portfolio Snapshot */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Portfolio Snapshot
            </h2>
            <Link href="/admin/projects" className={`${styles.cardAction} ${styles.cardActionOrange}`}>
              Manage Projects ↗
            </Link>
          </div>

          <div className={styles.portfolioGrid}>
            <div className={styles.portfolioItem} style={{ backgroundColor: '#0f172a', border: 'none' }}>
              {/* Skyline Theme Mockup Placeholder */}
              <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>SKYLINE TIME</div>
            </div>
            <div className={styles.portfolioItem}>
              {/* Other Theme Mockup Placeholder */}
              <span style={{ color: '#10b981' }}>OneAI Mockup</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
