"use client";

import { useState, useMemo } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { NEWS_PAGE_DATA, NEWS_ITEMS, NEWS_YEARS } from '@/data/pages/news';
import Header from '@/components/Header/Header';
import NewsCard from '@/components/NewsCard/NewsCard';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function NewsPage() {
  const scrolled = useScroll(50);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Filtrelenmiş haberler
  const filteredNews = useMemo(() => {
    if (selectedYear === null) {
      return NEWS_ITEMS;
    }
    return NEWS_ITEMS.filter(item => item.year === selectedYear);
  }, [selectedYear]);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Başlık Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>BASINDA BİZ</span>
            <h1 className={styles.title}>{NEWS_PAGE_DATA.title}</h1>
            <p className={styles.subtitle}>{NEWS_PAGE_DATA.description}</p>
            <div className={styles.titleUnderline}></div>
          </div>
        </section>

        {/* İçerik Bölümü */}
        <section className={styles.contentSection}>
          {/* Sol Sidebar - Yıl Filtreleri */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <h3 className={styles.sidebarTitle}>Haberler</h3>
              <ul className={styles.yearList}>
                <li>
                  <button
                    className={`${styles.yearButton} ${selectedYear === null ? styles.active : ''}`}
                    onClick={() => setSelectedYear(null)}
                  >
                    <span className={styles.yearIcon}>❯</span>
                    Tümü
                  </button>
                </li>
                {NEWS_YEARS.map((year) => (
                  <li key={year}>
                    <button
                      className={`${styles.yearButton} ${selectedYear === year ? styles.active : ''}`}
                      onClick={() => setSelectedYear(year)}
                    >
                      <span className={styles.yearIcon}>❯</span>
                      {year}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Medya Kiti */}
              <div className={styles.mediaKit}>
                <p className={styles.mediaKitTitle}>Bir haber mi hazırlıyorsunuz?</p>
                <a href="#" className={styles.mediaKitLink}>Medya Kitini İndir</a>
              </div>
            </div>
          </aside>

          {/* Sağ - Haberler Listesi */}
          <div className={styles.newsSection}>
            <h2 className={styles.newsSectionTitle}>Haberler</h2>
            <div className={styles.newsList}>
              {filteredNews.length > 0 ? (
                filteredNews.map((news, index) => (
                  <NewsCard key={news.id} news={news} index={index} />
                ))
              ) : (
                <p className={styles.emptyState}>{NEWS_PAGE_DATA.emptyState}</p>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

