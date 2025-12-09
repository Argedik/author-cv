"use client";

import { useState, useEffect } from 'react';
import styles from './PressQuotes.module.scss';

interface Quote {
  id: number;
  quote: string;
  source: string;
  date: string;
}

interface PressQuotesProps {
  quotes: Quote[];
}

export default function PressQuotes({ quotes }: PressQuotesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>BASIN SÖYLÜYOR</span>
        <h2 className={styles.title}>Basından Alıntılar</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.carousel}>
        <div className={styles.quoteContainer}>
          {quotes.map((quote, index) => (
            <div 
              key={quote.id}
              className={`${styles.quoteSlide} ${index === activeIndex ? styles.active : ''}`}
            >
              <div className={styles.quoteIcon}>"</div>
              <blockquote className={styles.quoteText}>
                {quote.quote}
              </blockquote>
              <div className={styles.quoteMeta}>
                <span className={styles.quoteSource}>{quote.source}</span>
                <span className={styles.quoteDivider}>•</span>
                <span className={styles.quoteDate}>{quote.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* İndikatörler */}
        <div className={styles.indicators}>
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Alıntı ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigasyon okları */}
        <button 
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => setActiveIndex((prev) => (prev - 1 + quotes.length) % quotes.length)}
          aria-label="Önceki"
        >
          ‹
        </button>
        <button 
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => setActiveIndex((prev) => (prev + 1) % quotes.length)}
          aria-label="Sonraki"
        >
          ›
        </button>
      </div>

      {/* Mini alıntı kartları */}
      <div className={styles.miniCards}>
        {quotes.map((quote, index) => (
          <div 
            key={quote.id}
            className={`${styles.miniCard} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <span className={styles.miniSource}>{quote.source}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

