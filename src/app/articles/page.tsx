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

import styles from './page.module.scss';

// LocalStorage key
const READING_LIST_KEY = 'suleymankarakas_reading_list';

export default function ArticlesPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingList, setReadingList] = useState<Article[]>([]);
  const [isClient, setIsClient] = useState(false);

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

              {/* Makale Grid */}
              <div className={styles.articlesGrid}>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      index={index}
                      onAddToReadingList={handleAddToReadingList}
                      isInReadingList={readingList.some(a => a.id === article.id)}
                    />
                  ))
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

            {/* Sağ Taraf - Okuma Listesi */}
            {/* ÖZELLİK 2: Okuma Listesi */}
            {/* Bu bölümü kaldırmak için: src/components/ReadingList klasörünü silin ve aşağıdaki satırları kaldırın */}
            {isClient && (
              <div className={styles.sidebarSection}>
                <ReadingList 
                  articles={readingList}
                  onRemove={handleRemoveFromReadingList}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

