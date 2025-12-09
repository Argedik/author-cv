"use client";

import { useState } from 'react';
import styles from './PublicationsList.module.scss';

interface Publication {
  id: number;
  title: string;
  type: 'book' | 'article' | 'thesis' | 'conference';
  year: string;
  publisher: string;
  description: string;
  citations?: number;
}

interface PublicationsListProps {
  publications: Publication[];
}

const typeLabels = {
  book: { label: 'Kitap', icon: '📕' },
  article: { label: 'Makale', icon: '📄' },
  thesis: { label: 'Tez', icon: '📜' },
  conference: { label: 'Konferans', icon: '🎤' },
};

export default function PublicationsList({ publications }: PublicationsListProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(p => p.type === filter);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>BİLİMSEL KATKI</span>
        <h2 className={styles.title}>Yayınlar</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          Tümü
        </button>
        {Object.entries(typeLabels).map(([key, value]) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
            onClick={() => setFilter(key)}
          >
            {value.icon} {value.label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filteredPublications.map((pub, index) => (
          <article 
            key={pub.id} 
            className={styles.card}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.typeIcon}>
                {typeLabels[pub.type].icon}
              </span>
              <span className={styles.type}>{typeLabels[pub.type].label}</span>
              <span className={styles.year}>{pub.year}</span>
            </div>
            
            <h3 className={styles.pubTitle}>{pub.title}</h3>
            <p className={styles.publisher}>{pub.publisher}</p>
            <p className={styles.description}>{pub.description}</p>
            
            {pub.citations && (
              <div className={styles.citations}>
                <span className={styles.citationIcon}>📊</span>
                <span>{pub.citations} Atıf</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

