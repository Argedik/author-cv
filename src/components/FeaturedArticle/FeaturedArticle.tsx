"use client";

/**
 * ÖZELLİK 1: FeaturedArticle - Öne Çıkan Makale Vitrini
 * 
 * Bu component, sayfanın en üstünde büyük ve dikkat çekici bir şekilde
 * öne çıkan makaleyi gösterir. Beğenmezseniz bu klasörü silebilirsiniz.
 */

import { FeaturedArticleProps } from '@/types';
import styles from './FeaturedArticle.module.scss';

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        {/* Sol Taraf - Dekoratif Alan */}
        <div className={styles.decorativeSection}>
          <div className={styles.decorativeFrame}>
            <div className={styles.innerFrame}>
              <span className={styles.decorativeIcon}>📖</span>
              <div className={styles.patternOverlay}></div>
            </div>
          </div>
          
          {/* Osmanlı Motifi */}
          <div className={styles.ottomanPattern}>
            <span>❋</span>
            <span>❋</span>
            <span>❋</span>
          </div>
        </div>

        {/* Sağ Taraf - İçerik */}
        <div className={styles.content}>
          {/* Öne Çıkan Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>★</span>
            <span>ÖNE ÇIKAN MAKALE</span>
          </div>

          {/* Kategori */}
          <span className={styles.category}>
            {article.tags[0]}
          </span>

          {/* Başlık */}
          <h2 className={styles.title}>
            <a href={article.url}>{article.title}</a>
          </h2>

          {/* Açıklama */}
          <p className={styles.description}>{article.description}</p>

          {/* Meta Bilgiler */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{article.date}</span>
            </div>
            <div className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{article.readTime} okuma</span>
            </div>
            <div className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span>{article.source}</span>
            </div>
          </div>

          {/* Okuma Butonu */}
          <a href={article.url} className={styles.readButton}>
            Makaleyi Oku
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          {/* Etiketler */}
          <div className={styles.tags}>
            {article.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Alt Dekoratif Çizgi */}
      <div className={styles.bottomDecoration}>
        <span>❧</span>
        <div className={styles.line}></div>
        <span>❧</span>
      </div>
    </section>
  );
}

