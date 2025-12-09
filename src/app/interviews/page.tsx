"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useScroll } from '@/hooks/useScroll';
import { INTERVIEWS_PAGE_DATA, INTERVIEWS, INTERVIEW_CATEGORIES } from '@/data/pages/interviews';
import Header from '@/components/Header/Header';
import InterviewCard from '@/components/InterviewCard/InterviewCard';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';

// SwiperJS
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cube';

import styles from './page.module.scss';

export default function InterviewsPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

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

  // Kategori değiştiğinde slide'ı sıfırla
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
      setCurrentSlideIndex(0);
    }
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

          {/* İstatistikler */}
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

          {/* 3D Küp Galerisi - Swiper Effect Cube */}
          {filteredInterviews.length > 0 ? (
            <div className={styles.cubeGallerySection}>
              <div className={styles.cubeHeader}>
                <h2 className={styles.cubeTitle}>
                  <span className={styles.cubeIcon}>🎲</span>
                  Röportaj Küpü Galerisi
                </h2>
                <p className={styles.cubeDescription}>
                  Küpü döndürerek röportajlar arasında gezinin. Her yüz farklı bir röportajı gösterir.
                </p>
              </div>

              <div className={styles.swiperContainer}>
                <Swiper
                  effect="cube"
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  modules={[EffectCube]}
                  className={styles.interviewsCube}
                  loop={filteredInterviews.length > 1}
                  speed={600}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentSlideIndex(swiper.realIndex);
                  }}
                >
                  {filteredInterviews.map((interview, index) => (
                    <SwiperSlide key={interview.id} className={styles.cubeSlide}>
                      <div className={styles.cubeSlideContent}>
                        <InterviewCard interview={interview} index={index} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigasyon İpuçları */}
                <div className={styles.cubeNavigation}>
                  <div className={styles.navHint}>
                    <span className={styles.hintIcon}>👆</span>
                    <span>Küpü sürükleyerek döndürebilir veya ok tuşlarını kullanabilirsiniz</span>
                  </div>
                  <div className={styles.cubeCounter}>
                    <span className={styles.currentIndex}>{currentSlideIndex + 1}</span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.totalCount}>{filteredInterviews.length}</span>
                  </div>
                </div>
              </div>

              {/* Klavye Navigasyonu Bilgisi */}
              <div className={styles.keyboardHint}>
                <span className={styles.keyIcon}>⌨️</span>
                <span>Klavye ile gezinmek için: <kbd>←</kbd> <kbd>→</kbd> tuşlarını kullanın</span>
              </div>
            </div>
          ) : (
            <p className={styles.emptyState}>{INTERVIEWS_PAGE_DATA.emptyState}</p>
          )}

          {/* Klasik Liste Görünümü (Alternatif) */}
          <div className={styles.classicViewSection}>
            <h3 className={styles.classicViewTitle}>Tüm Röportajlar</h3>
            <div className={styles.interviewsList}>
              {filteredInterviews.map((interview, index) => (
                <InterviewCard key={interview.id} interview={interview} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
