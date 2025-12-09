"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useScroll } from '@/hooks/useScroll';
import { INTERVIEWS_PAGE_DATA, INTERVIEWS, INTERVIEW_CATEGORIES } from '@/data/pages/interviews';
import Header from '@/components/Header/Header';
import InterviewCard from '@/components/InterviewCard/InterviewCard';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function InterviewsPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Kategori etiketleri
  const categoryLabels: Record<string, string> = {
    podcast: 'Podcast',
    interview: 'Röportaj',
    panel: 'Panel',
    conference: 'Konferans',
  };

  // Filtrelenmiş röportajlar
  const filteredInterviews = useMemo(() => {
    if (selectedCategory === null) {
      return INTERVIEWS;
    }
    return INTERVIEWS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Toplam istatistikler
  const stats = useMemo(() => ({
    total: INTERVIEWS.length,
    podcasts: INTERVIEWS.filter(i => i.category === 'podcast').length,
    interviews: INTERVIEWS.filter(i => i.category === 'interview').length,
    panels: INTERVIEWS.filter(i => i.category === 'panel' || i.category === 'conference').length,
  }), []);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Başlık Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{INTERVIEWS_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{INTERVIEWS_PAGE_DATA.title}</h1>
            <p className={styles.subtitle}>{INTERVIEWS_PAGE_DATA.description}</p>
            <div className={styles.titleUnderline}></div>

            {/* İletişim Notu */}
            <p className={styles.contactNote}>
              {INTERVIEWS_PAGE_DATA.contactText}{' '}
              <Link href="/contact" className={styles.contactLink}>
                {INTERVIEWS_PAGE_DATA.contactLinkText}
              </Link>
              {' '}ulaşabilirsiniz.
            </p>
          </div>

          {/* İstatistikler - Benim eklediğim özellik */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Toplam</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.podcasts}</span>
              <span className={styles.statLabel}>Podcast</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.interviews}</span>
              <span className={styles.statLabel}>Röportaj</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.panels}</span>
              <span className={styles.statLabel}>Panel</span>
            </div>
          </div>
        </section>

        {/* Filtre ve İçerik Bölümü */}
        <section className={styles.contentSection}>
          {/* Kategori Filtreleri */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterButton} ${selectedCategory === null ? styles.active : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Tümü
            </button>
            {INTERVIEW_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category] || category}
              </button>
            ))}
          </div>

          {/* Röportaj Listesi */}
          <div className={styles.interviewsList}>
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview, index) => (
                <InterviewCard key={interview.id} interview={interview} index={index} />
              ))
            ) : (
              <p className={styles.emptyState}>{INTERVIEWS_PAGE_DATA.emptyState}</p>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

