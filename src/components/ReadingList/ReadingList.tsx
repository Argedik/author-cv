"use client";

/**
 * ÖZELLİK 2: ReadingList - Okuma Listesi
 * 
 * Bu component, kullanıcının "Daha Sonra Oku" listesini gösterir.
 * Makaleler localStorage'da saklanır. Beğenmezseniz bu klasörü silebilirsiniz.
 */

import { ReadingListProps } from '@/types';
import styles from './ReadingList.module.scss';

export default function ReadingList({ articles, onRemove }: ReadingListProps) {
  if (articles.length === 0) {
    return (
      <aside className={styles.readingList}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>📚</div>
          <h3 className={styles.title}>Okuma Listem</h3>
        </div>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔖</span>
          <p>Henüz okuma listeniz boş.</p>
          <span className={styles.emptyHint}>Makalelerin yanındaki işarete tıklayarak buraya ekleyebilirsiniz.</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.readingList}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>📚</div>
        <h3 className={styles.title}>Okuma Listem</h3>
        <span className={styles.count}>{articles.length}</span>
      </div>

      <ul className={styles.list}>
        {articles.map((article, index) => (
          <li 
            key={article.id} 
            className={styles.item}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={styles.itemContent}>
              <a href={article.url} className={styles.itemTitle}>
                {article.title}
              </a>
              <div className={styles.itemMeta}>
                <span className={styles.itemReadTime}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {article.readTime}
                </span>
                <span className={styles.itemCategory}>{article.tags[0]}</span>
              </div>
            </div>
            <button 
              className={styles.removeButton}
              onClick={() => onRemove(article.id)}
              aria-label="Listeden kaldır"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {/* Toplam Okuma Süresi */}
      <div className={styles.footer}>
        <div className={styles.totalTime}>
          <span className={styles.totalLabel}>Toplam Okuma Süresi:</span>
          <span className={styles.totalValue}>
            ~{articles.reduce((total, article) => {
              const time = parseInt(article.readTime) || 0;
              return total + time;
            }, 0)} dk
          </span>
        </div>
        <button 
          className={styles.clearButton}
          onClick={() => articles.forEach(a => onRemove(a.id))}
        >
          Listeyi Temizle
        </button>
      </div>
    </aside>
  );
}

