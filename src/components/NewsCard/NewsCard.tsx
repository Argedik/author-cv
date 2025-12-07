"use client";

import { NewsCardProps } from '@/types';
import styles from './NewsCard.module.scss';

export default function NewsCard({ news, index }: NewsCardProps) {
  return (
    <article 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Kaynak Logosu */}
      <div className={styles.sourceContainer}>
        <div className={styles.sourceLogo}>
          <span className={styles.sourceText}>{news.source}</span>
        </div>
      </div>

      {/* İçerik */}
      <div className={styles.content}>
        {/* Tarih */}
        <time className={styles.date}>{news.date}</time>

        {/* Başlık */}
        <h3 className={styles.title}>{news.title}</h3>

        {/* Açıklama */}
        <p className={styles.description}>{news.description}</p>

        {/* Devamını Oku */}
        <a href={news.url} className={styles.readMore}>
          Devamını Oku
          <svg 
            className={styles.arrow} 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </article>
  );
}

