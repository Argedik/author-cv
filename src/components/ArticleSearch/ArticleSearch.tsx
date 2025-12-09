"use client";

/**
 * ÖZELLİK 3: ArticleSearch - Makale Arama
 * 
 * Bu component, makaleler arasında anahtar kelime ile arama yapmanızı sağlar.
 * Debounce özelliği ile performanslı arama yapar. Beğenmezseniz bu klasörü silebilirsiniz.
 */

import { useState, useEffect, useCallback } from 'react';
import { ArticleSearchProps } from '@/types';
import styles from './ArticleSearch.module.scss';

export default function ArticleSearch({ onSearch, placeholder = 'Makale ara...' }: ArticleSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search
  const debouncedSearch = useCallback((value: string) => {
    onSearch(value);
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
      {/* Arama İkonu */}
      <div className={styles.iconWrapper}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={styles.searchIcon}
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Arama Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={styles.searchInput}
      />

      {/* Temizle Butonu */}
      {query && (
        <button 
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Aramayı temizle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}

      {/* Arama İpuçları */}
      {isFocused && !query && (
        <div className={styles.hints}>
          <span className={styles.hintTitle}>Önerilen aramalar:</span>
          <div className={styles.hintTags}>
            <button onClick={() => setQuery('Tasavvuf')}>Tasavvuf</button>
            <button onClick={() => setQuery('Kur\'an')}>Kur'an</button>
            <button onClick={() => setQuery('Ahlak')}>Ahlak</button>
            <button onClick={() => setQuery('Hadis')}>Hadis</button>
          </div>
        </div>
      )}

      {/* Arama Sonuç Göstergesi */}
      {query && (
        <div className={styles.searchingIndicator}>
          <span className={styles.searchingText}>
            &quot;{query}&quot; için aranıyor...
          </span>
        </div>
      )}

      {/* Dekoratif Elemanlar */}
      <div className={styles.decorativeLeft}>❧</div>
      <div className={styles.decorativeRight}>❧</div>
    </div>
  );
}

