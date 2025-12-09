"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { ARTICLES_PAGE_DATA, ARTICLES, ARTICLE_CATEGORIES, FEATURED_ARTICLE } from '@/data/pages/articles';
import { Article, ArticleCategory } from '@/types';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';

// Özel Özellik Componentleri
import FeaturedArticle from '@/components/FeaturedArticle/FeaturedArticle';
import ReadingList from '@/components/ReadingList/ReadingList';
import ArticleSearch from '@/components/ArticleSearch/ArticleSearch';
import ArticleCard from '@/components/ArticleCard/ArticleCard';

// SwiperJS
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import styles from './page.module.scss';

// LocalStorage key
const READING_LIST_KEY = 'suleymankarakas_reading_list';

export default function ArticlesPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingList, setReadingList] = useState<Article[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isReadingListModalOpen, setIsReadingListModalOpen] = useState(false);

  // Client-side hydration fix
  useEffect(() => {
    setIsClient(true);
    // LocalStorage'dan okuma listesini al
    const saved = localStorage.getItem(READING_LIST_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReadingList(parsed);
      } catch {
        console.error('Reading list parse error');
      }
    }
  }, []);

  // Okuma listesini kaydet
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(READING_LIST_KEY, JSON.stringify(readingList));
    }
  }, [readingList, isClient]);

  // Okuma listesine ekle/çıkar
  const handleAddToReadingList = useCallback((article: Article) => {
    setReadingList(prev => {
      const exists = prev.find(a => a.id === article.id);
      if (exists) {
        return prev.filter(a => a.id !== article.id);
      }
      return [...prev, article];
    });
  }, []);

  // Okuma listesinden kaldır
  const handleRemoveFromReadingList = useCallback((id: number) => {
    setReadingList(prev => prev.filter(a => a.id !== id));
  }, []);

  // Arama fonksiyonu
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filtrelenmiş makaleler (öne çıkan hariç)
  const filteredArticles = useMemo(() => {
    let result = ARTICLES.filter(a => !a.isFeatured); // Öne çıkan makaleyi çıkar

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory);
    }

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.tags.some(tag => tag.toLowerCase().includes(query)) ||
        a.source.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Başlık Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{ARTICLES_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{ARTICLES_PAGE_DATA.title}</h1>
            <p className={styles.subtitle}>{ARTICLES_PAGE_DATA.description}</p>
            <div className={styles.titleUnderline}></div>
          </div>
        </section>

        {/* ÖZELLİK 1: Öne Çıkan Makale */}
        {/* Bu bölümü kaldırmak için: src/components/FeaturedArticle klasörünü silin ve aşağıdaki satırı kaldırın */}
        <FeaturedArticle article={FEATURED_ARTICLE} />

        {/* ÖZELLİK 3: Arama */}
        {/* Bu bölümü kaldırmak için: src/components/ArticleSearch klasörünü silin ve aşağıdaki satırı kaldırın */}
        <div className={styles.searchSection}>
          <ArticleSearch 
            onSearch={handleSearch} 
            placeholder={ARTICLES_PAGE_DATA.searchPlaceholder}
          />
        </div>

        {/* Kategori Filtreleri */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            {ARTICLE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterButton} ${selectedCategory === cat.key ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Ana İçerik */}
        <section className={styles.contentSection}>
          <div className={styles.contentGrid}>
            {/* Sol Taraf - Makale Listesi */}
            <div className={styles.articlesSection}>
              {/* Sonuç Bilgisi */}
              {searchQuery && (
                <p className={styles.searchResults}>
                  &quot;{searchQuery}&quot; için <strong>{filteredArticles.length}</strong> sonuç bulundu
                </p>
              )}

              {/* Swiper Coverflow ile Makaleler */}
              {filteredArticles.length > 0 ? (
                <div className={styles.swiperContainer}>
                  <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 30,
                      stretch: 0,
                      depth: 150,
                      modifier: 1.2,
                      slideShadows: true,
                    }}
                    modules={[EffectCoverflow]}
                    className={styles.articlesSwiper}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        coverflowEffect: {
                          rotate: 15,
                          stretch: 0,
                          depth: 80,
                          modifier: 1.1,
                        },
                      },
                      640: {
                        slidesPerView: 1.2,
                        spaceBetween: 30,
                        coverflowEffect: {
                          rotate: 20,
                          stretch: 0,
                          depth: 100,
                          modifier: 1.15,
                        },
                      },
                      1024: {
                        slidesPerView: 1.5,
                        spaceBetween: 40,
                        coverflowEffect: {
                          rotate: 25,
                          stretch: 0,
                          depth: 120,
                          modifier: 1.2,
                        },
                      },
                      1280: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                        coverflowEffect: {
                          rotate: 30,
                          stretch: 0,
                          depth: 150,
                          modifier: 1.2,
                        },
                      },
                    }}
                  >
                    {filteredArticles.map((article, index) => (
                      <SwiperSlide key={article.id} className={styles.swiperSlide}>
                        <ArticleCard 
                          article={article} 
                          index={index}
                          onAddToReadingList={handleAddToReadingList}
                          isInReadingList={readingList.some(a => a.id === article.id)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>📄</span>
                  <p>{ARTICLES_PAGE_DATA.emptyState}</p>
                  <button 
                    className={styles.resetButton}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Floating Reading List Button */}
        {isClient && (
          <button
            className={styles.floatingReadingListButton}
            onClick={() => setIsReadingListModalOpen(true)}
            aria-label="Okuma listesini aç"
          >
            <span className={styles.buttonIcon}>📚</span>
            {readingList.length > 0 && (
              <span className={styles.badge}>{readingList.length}</span>
            )}
          </button>
        )}

        {/* Reading List Modal */}
        {isClient && isReadingListModalOpen && (
          <div 
            className={styles.readingListModal}
            onClick={() => setIsReadingListModalOpen(false)}
          >
            <div 
              className={styles.readingListModalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.readingListModalHeader}>
                <h3>
                  <span>📚</span>
                  Okuma Listem
                  {readingList.length > 0 && (
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      color: '#8b7355',
                      marginLeft: '8px'
                    }}>
                      ({readingList.length})
                    </span>
                  )}
                </h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsReadingListModalOpen(false)}
                  aria-label="Kapat"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className={styles.readingListModalBody}>
                <ReadingList 
                  articles={readingList}
                  onRemove={handleRemoveFromReadingList}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
