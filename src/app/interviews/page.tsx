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

// Platform renkleri
const platformColors: Record<string, string> = {
  'spotify': '#1DB954',
  'youtube': '#FF0000',
  'apple': '#FC3C44',
};

export default function InterviewsPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Mobil kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

          {/* Röportajlar Görünümü */}
          {filteredInterviews.length > 0 ? (
            isMobile ? (
              /* MOBİL - Ses Dalgası / Podcast Player Görünümü */
              <div className={styles.mobileAudioSection}>
                {/* Podcast Başlığı */}
                <div className={styles.audioHeader}>
                  <div className={styles.audioVisualizer}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                  </div>
                  <h3 className={styles.audioTitle}>Ses Arşivi</h3>
                  <p className={styles.audioSubtitle}>Dinlemek için röportaja dokunun</p>
                </div>

                {/* Playlist Görünümü */}
                <div className={styles.playlist}>
                  {filteredInterviews.map((interview, index) => (
                    <div 
                      key={interview.id}
                      className={`${styles.playlistItem} ${playingId === interview.id ? styles.playing : ''}`}
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      {/* Platform İkonu */}
                      <div 
                        className={styles.platformBadge}
                        style={{ backgroundColor: platformColors[interview.platform] || '#c4a35a' }}
                      >
                        {interview.platform === 'youtube' ? '▶' : '♫'}
                      </div>

                      {/* İçerik */}
                      <div className={styles.itemContent}>
                        <div className={styles.itemHeader}>
                          <span className={styles.showName}>{interview.showName}</span>
                          <span className={styles.duration}>{interview.duration}</span>
                        </div>
                        <h4 className={styles.episodeTitle}>{interview.episodeTitle}</h4>
                        <div className={styles.itemMeta}>
                          <span className={styles.host}>👤 {interview.host}</span>
                          <span className={styles.date}>📅 {interview.date}</span>
                        </div>
                        
                        {/* Kategori */}
                        <span className={`${styles.categoryTag} ${styles[interview.category]}`}>
                          {categoryLabels[interview.category] || interview.category}
                        </span>
                      </div>

                      {/* Oynat Butonu */}
                      <a 
                        href={interview.spotifyUrl || interview.youtubeUrl || interview.appleUrl || '#'}
                        className={styles.playButton}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setPlayingId(interview.id)}
                      >
                        <span className={styles.playIcon}>▶</span>
                      </a>

                      {/* Ses Dalgası Animasyonu (Oynatılıyorsa) */}
                      {playingId === interview.id && (
                        <div className={styles.waveAnimation}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* DESKTOP - 3D Küp Galerisi - Swiper Effect Cube */
              <div className={styles.cubeGallerySection}>
                <div className={styles.cubeHeader}>
                  <h2 className={styles.cubeTitle}>
                    <span className={styles.cubeIcon}>🎙️</span>
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
            )
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
