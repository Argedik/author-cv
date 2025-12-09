"use client";

import { useState } from 'react';
import styles from './MediaGallery.module.scss';

interface PressItem {
  id: number;
  title: string;
  outlet: string;
  outletLogo: string;
  date: string;
  type: 'newspaper' | 'magazine' | 'tv' | 'radio' | 'online';
  excerpt: string;
}

interface MediaGalleryProps {
  items: PressItem[];
  types: string[];
}

const typeMap: Record<string, string> = {
  'Tümü': 'all',
  'Gazete': 'newspaper',
  'Dergi': 'magazine',
  'TV': 'tv',
  'Radyo': 'radio',
  'Online': 'online',
};

const typeIcons: Record<string, string> = {
  newspaper: '📰',
  magazine: '📖',
  tv: '📺',
  radio: '📻',
  online: '🌐',
};

export default function MediaGallery({ items, types }: MediaGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [selectedItem, setSelectedItem] = useState<PressItem | null>(null);

  const filteredItems = activeFilter === 'Tümü'
    ? items
    : items.filter(item => item.type === typeMap[activeFilter]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>MEDYA GALERİSİ</span>
        <h2 className={styles.title}>Basın Yansımaları</h2>
        <div className={styles.underline}></div>
      </div>

      {/* Filtreler */}
      <div className={styles.filters}>
        {types.map((type) => (
          <button
            key={type}
            className={`${styles.filterBtn} ${activeFilter === type ? styles.active : ''}`}
            onClick={() => setActiveFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Galeri Grid */}
      <div className={styles.gallery}>
        {filteredItems.map((item, index) => (
          <article 
            key={item.id} 
            className={styles.card}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedItem(item)}
          >
            <div className={styles.cardMedia}>
              <span className={styles.mediaIcon}>{typeIcons[item.type]}</span>
              <span className={styles.mediaType}>{item.type.toUpperCase()}</span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.outlet}>{item.outlet}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.cardOverlay}>
              <span>Detayları Gör</span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className={styles.modal} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedItem(null)}>✕</button>
            <div className={styles.modalMedia}>
              <span className={styles.modalIcon}>{typeIcons[selectedItem.type]}</span>
            </div>
            <span className={styles.modalOutlet}>{selectedItem.outlet}</span>
            <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
            <span className={styles.modalDate}>{selectedItem.date}</span>
            <p className={styles.modalExcerpt}>{selectedItem.excerpt}</p>
          </div>
        </div>
      )}
    </section>
  );
}

