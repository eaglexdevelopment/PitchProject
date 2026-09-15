'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pitch, PitchStatus } from '@/types/pitch';
import { getAllPitches, updatePitch, deletePitch } from '@/lib/pitchService';
import styles from './pages.module.css';

export default function PitchPagesAdmin() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PitchStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('grid');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadPitches = async () => {
    setLoading(true);
    const data = await getAllPitches();
    setPitches(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPitches();
  }, []);

  const handleToggleStatus = async (pitch: Pitch) => {
    if (!pitch.id) return;
    const newStatus: PitchStatus = pitch.status === 'published' ? 'draft' : 'published';
    try {
      await updatePitch(pitch.id, { status: newStatus });
      setPitches((prev) =>
        prev.map((p) => (p.id === pitch.id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error('Failed to toggle status:', err);
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (pitch: Pitch) => {
    if (!pitch.id) return;
    if (confirm(`Are you sure you want to delete the pitch for "${pitch.clientName}"?`)) {
      try {
        await deletePitch(pitch.id);
        setPitches((prev) => prev.filter((p) => p.id !== pitch.id));
      } catch (err) {
        console.error('Failed to delete pitch:', err);
        alert('Failed to delete pitch.');
      }
    }
  };

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${origin}/p/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Filter & Search
  const filteredPitches = pitches.filter((pitch) => {
    const matchesQuery =
      pitch.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pitch.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredPitches.length / itemsPerPage) || 1;
  const paginatedPitches = filteredPitches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats calculation
  const totalCount = pitches.length;
  const liveCount = pitches.filter((p) => p.status === 'published').length;
  const draftCount = pitches.filter((p) => p.status === 'draft').length;
  const totalViews = pitches.reduce((sum, p) => sum + (p.viewsCount || 0), 0);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff5e00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            Pitch Pages Hub
          </h1>
          <p>Create, customize, and share high-converting client website mockups in seconds.</p>
        </div>
        <Link href="/admin/pages/new" className={styles.createBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          + Create New Pitch
        </Link>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span className={styles.statLabel}>Total Pitches</span>
            <div className={`${styles.statIcon} ${styles.iconOrange}`}>📁</div>
          </div>
          <div className={styles.statValue}>{totalCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span className={styles.statLabel}>Live / Published</span>
            <div className={`${styles.statIcon} ${styles.iconGreen}`}>🟢</div>
          </div>
          <div className={styles.statValue}>{liveCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span className={styles.statLabel}>Drafts</span>
            <div className={`${styles.statIcon} ${styles.iconGray}`}>📝</div>
          </div>
          <div className={styles.statValue}>{draftCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <span className={styles.statLabel}>Total Client Views</span>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}>👁️</div>
          </div>
          <div className={styles.statValue}>{totalViews}</div>
        </div>
      </div>

      {/* Search & View Controls */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by client, title, or slug..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterActions}>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className={styles.selectInput}
          >
            <option value="all">All Statuses</option>
            <option value="published">Live (Published)</option>
            <option value="draft">Drafts</option>
          </select>

          <div className={styles.viewToggle}>
            <button
              onClick={() => setViewMode('grid')}
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              title="Card View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('row')}
              className={`${styles.viewBtn} ${viewMode === 'row' ? styles.active : ''}`}
              title="Row / Table View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pitches List Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#71717a' }}>
          Loading pitch pages...
        </div>
      ) : filteredPitches.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>No Pitch Pages Found</h3>
          <p className={styles.emptyDescription}>
            {searchQuery
              ? 'No pitches matched your search filter. Try clearing the search query.'
              : 'You haven’t created any client website pitches yet. Create your first dynamic pitch in under 5 minutes!'}
          </p>
          {!searchQuery && (
            <Link href="/admin/pages/new" className={styles.createBtn} style={{ marginTop: '0.5rem' }}>
              + Create First Pitch
            </Link>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* Cards View */
        <div className={styles.cardsGrid}>
          {paginatedPitches.map((pitch) => (
            <div key={pitch.id} className={styles.pitchCard}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.clientName}>{pitch.clientName}</div>
                  <h3 className={styles.pitchTitle}>{pitch.title}</h3>
                </div>
                <button
                  onClick={() => handleToggleStatus(pitch)}
                  className={`${styles.statusBadge} ${
                    pitch.status === 'published' ? styles.statusLive : styles.statusDraft
                  }`}
                  style={{ cursor: 'pointer', border: 'none' }}
                  title="Click to toggle status"
                >
                  {pitch.status === 'published' ? '● LIVE' : '○ DRAFT'}
                </button>
              </div>

              <div className={styles.cardMeta}>
                <div className={styles.metaRow}>
                  <span>Slug URL:</span>
                  <Link href={`/p/${pitch.slug}`} target="_blank" className={styles.slugLink}>
                    /p/{pitch.slug}
                  </Link>
                </div>
                <div className={styles.metaRow}>
                  <span>Template:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{pitch.templateId || 'Apex Agency'}</span>
                </div>
                <div className={styles.metaRow}>
                  <span>Client Views:</span>
                  <span style={{ fontWeight: 700, color: '#ff5e00' }}>{pitch.viewsCount || 0}</span>
                </div>
              </div>

              <div className={styles.cardActions}>
                <div className={styles.btnGroup}>
                  <Link href={`/admin/pages/${pitch.id}`} className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    Edit
                  </Link>
                  <Link href={`/p/${pitch.slug}`} target="_blank" className={styles.actionBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live View
                  </Link>
                  <button
                    onClick={() => handleCopyLink(pitch.slug)}
                    className={styles.actionBtn}
                    title="Copy shareable link"
                  >
                    {copiedSlug === pitch.slug ? '✓ Copied' : '🔗 Link'}
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(pitch)}
                  className={styles.iconBtn}
                  title="Delete pitch"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Row / Table View */
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client & Title</th>
                <th>Slug Link</th>
                <th>Template</th>
                <th>Status</th>
                <th>Views</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPitches.map((pitch) => (
                <tr key={pitch.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#111' }}>{pitch.clientName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{pitch.title}</div>
                  </td>
                  <td>
                    <Link href={`/p/${pitch.slug}`} target="_blank" className={styles.slugLink}>
                      /p/{pitch.slug}
                    </Link>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      {pitch.templateId || 'Apex Agency'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(pitch)}
                      className={`${styles.statusBadge} ${
                        pitch.status === 'published' ? styles.statusLive : styles.statusDraft
                      }`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Click to toggle status"
                    >
                      {pitch.status === 'published' ? '● LIVE' : '○ DRAFT'}
                    </button>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#ff5e00' }}>{pitch.viewsCount || 0}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <Link href={`/admin/pages/${pitch.id}`} className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                        Edit
                      </Link>
                      <Link href={`/p/${pitch.slug}`} target="_blank" className={styles.actionBtn}>
                        Live View ↗
                      </Link>
                      <button
                        onClick={() => handleCopyLink(pitch.slug)}
                        className={styles.actionBtn}
                        title="Copy Link"
                      >
                        {copiedSlug === pitch.slug ? '✓' : '🔗'}
                      </button>
                      <button
                        onClick={() => handleDelete(pitch)}
                        className={styles.iconBtn}
                        title="Delete pitch"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredPitches.length > itemsPerPage && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredPitches.length)} of {filteredPitches.length} pitches
          </div>
          <div className={styles.paginationBtns}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={styles.pageBtn}
            >
              ← Previous
            </button>
            <span style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
