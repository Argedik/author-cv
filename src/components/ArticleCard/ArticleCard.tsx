"use client";

import { ArticleCardProps } from '@/types';
import styles from './ArticleCard.module.scss';

// Kategori renkleri
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    tefsir: '#2E7D32',
    hadis: '#1565C0',
    fiqh: '#6A1B9A',
    tasavvuf: '#C62828',
    ahlak: '#EF6C00',
    siyer: '#00838F',
    akaid: '#4527A0',
    diger: '#546E7A',
  };
  return colors[category] || colors.diger;
};

// Bookmark ikonu
const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? 'currentColor' : 'none'} 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function ArticleCard({ article, index, onAddToReadingList, isInReadingList }: ArticleCardProps) {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToReadingList) {
      onAddToReadingList(article);
    }
  };

  return (
    <article 
      className={styles.card}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Üst Kısım - Görsel Alanı */}
      <div className={styles.imageSection}>
        {/* Kategori renk şeridi */}
        <div 
          className={styles.categoryStripe}
          style={{ backgroundColor: getCategoryColor(article.category) }}
        />
        
        {/* Yeni Etiketi */}
        {article.isNew && (
          <span className={styles.newBadge}>YENİ</span>
        )}

        {/* Bookmark Butonu */}
        {onAddToReadingList && (
          <button 
            className={`${styles.bookmarkButton} ${isInReadingList ? styles.bookmarked : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isInReadingList ? 'Okuma listesinden çıkar' : 'Okuma listesine ekle'}
          >
            <BookmarkIcon filled={isInReadingList || false} />
          </button>
        )}

        {/* Dekoratif Arka Plan */}
        <div className={styles.decorativeBg}>
          <span className={styles.decorativeIcon}>📜</span>
        </div>
      </div>

      {/* Alt Kısım - İçerik */}
      <div className={styles.content}>
        {/* Başlık */}
        <h3 className={styles.title}>
          <a href={article.url}>{article.title}</a>
        </h3>

        {/* Açıklama */}
        <p className={styles.description}>{article.description}</p>

        {/* Meta Bilgiler */}
        <div className={styles.meta}>
          <span className={styles.source}>{article.source}</span>
          <span className={styles.separator}>•</span>
          <time className={styles.date}>{article.date}</time>
        </div>

        {/* Etiketler */}
        <div className={styles.tags}>
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className={styles.tag}
              style={{ 
                borderColor: getCategoryColor(article.category),
                color: getCategoryColor(article.category)
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Okuma Süresi */}
        <div className={styles.footer}>
          <span className={styles.readTime}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {article.readTime} okuma
          </span>
          <a href={article.url} className={styles.readMore}>
            Oku
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

