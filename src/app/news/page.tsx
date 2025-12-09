"use client";

import { useState, useMemo, useRef, useCallback } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { NEWS_PAGE_DATA, NEWS_ITEMS, NEWS_YEARS } from '@/data/pages/news';
import Header from '@/components/Header/Header';
import NewsCard from '@/components/NewsCard/NewsCard';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/virtual';
import styles from './page.module.scss';

export default function NewsPage() {
  const scrolled = useScroll(50);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Filtrelenmiş haberler
  const filteredNews = useMemo(() => {
    if (selectedYear === null) {
      return NEWS_ITEMS;
    }
    return NEWS_ITEMS.filter(item => item.year === selectedYear);
  }, [selectedYear]);

  // İlk 7 haberi göster, geri kalanı pagination ile
  const displayedNews = useMemo(() => {
    return filteredNews.slice(0, 7);
  }, [filteredNews]);

  // Virtual slides için tüm haberler
  const allNews = useMemo(() => {
    return filteredNews;
  }, [filteredNews]);

  // Özel pagination butonları
  const handlePrev4 = useCallback(() => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      const newIndex = Math.max(0, currentIndex - 4);
      swiperRef.current.slideTo(newIndex);
    }
  }, []);

  const handleGoToFirst = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, []);

  const handleGoTo10 = useCallback(() => {
    if (swiperRef.current) {
      const targetIndex = Math.min(9, allNews.length - 1);
      swiperRef.current.slideTo(targetIndex);
    }
  }, [allNews.length]);

  const handleGoTo100 = useCallback(() => {
    if (swiperRef.current) {
      const targetIndex = Math.min(99, allNews.length - 1);
      swiperRef.current.slideTo(targetIndex);
    }
  }, [allNews.length]);

  const handleGoToLast = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(allNews.length - 1);
    }
  }, [allNews.length]);

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
          
          {/* Medya Kiti - Hero Section Altında */}
          <div className={styles.mediaKitHero}>
            <p className={styles.mediaKitHeroTitle}>Bir haber mi hazırlıyorsunuz?</p>
            <a href="#" className={styles.mediaKitHeroLink}>
              <span>Medya Kitini İndir</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </a>
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

            </div>
          </aside>

          {/* Sağ - Haberler Listesi */}
          <div className={styles.newsSection}>
            <h2 className={styles.newsSectionTitle}>Haberler</h2>
            
            {/* Swiper ile Haberler */}
            {allNews.length > 0 ? (
              <div className={styles.swiperContainer}>
                <Swiper
                  modules={[Virtual]}
                  spaceBetween={20}
                  slidesPerView={5}
                  slidesPerGroup={1}
                  virtual
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                    640: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 1.5,
                      spaceBetween: 25,
                    },
                    1024: {
                      slidesPerView: 1.8,
                      spaceBetween: 30,
                    },
                    1280: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                  }}
                  className={styles.newsSwiper}
                >
                  {allNews.map((news, index) => (
                    <SwiperSlide key={news.id} virtualIndex={index}>
                      <NewsCard news={news} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Özel Pagination Butonları */}
                <div className={styles.customPagination}>
                  <button 
                    className={styles.paginationButton}
                    onClick={handlePrev4}
                    aria-label="Önceki 4 haber"
                  >
                    ← Önceki 4
                  </button>
                  <button 
                    className={styles.paginationButton}
                    onClick={handleGoToFirst}
                    aria-label="1. habere git"
                  >
                    1. Haber
                  </button>
                  <button 
                    className={styles.paginationButton}
                    onClick={handleGoTo10}
                    disabled={allNews.length < 10}
                    aria-label="10. habere git"
                  >
                    10. Haber
                  </button>
                  <button 
                    className={styles.paginationButton}
                    onClick={handleGoTo100}
                    disabled={allNews.length < 100}
                    aria-label="100. habere git"
                  >
                    100. Haber
                  </button>
                  <button 
                    className={styles.paginationButton}
                    onClick={handleGoToLast}
                    aria-label="Son habere git"
                  >
                    Son Haber
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.emptyState}>{NEWS_PAGE_DATA.emptyState}</p>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
