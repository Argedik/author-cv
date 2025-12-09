"use client";

import styles from './ResearchTimeline.module.scss';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface ResearchTimelineProps {
  items?: TimelineItem[];
}

const defaultItems: TimelineItem[] = [
  {
    year: '2012',
    title: 'Akademik Yolculuğun Başlangıcı',
    description: 'İlk araştırma projesiyle ilmi çalışmalara başlangıç.',
    icon: '🎓',
  },
  {
    year: '2015',
    title: 'Tefsir Araştırmaları',
    description: 'Osmanlı dönemi tefsir geleneği üzerine kapsamlı çalışmalar.',
    icon: '📜',
  },
  {
    year: '2018',
    title: 'Uluslararası İşbirlikleri',
    description: 'Dünya genelindeki araştırma merkezleriyle ortak projeler.',
    icon: '🌍',
  },
  {
    year: '2021',
    title: 'Dijital Arşiv Projesi',
    description: 'Yazma eserlerin dijital ortama aktarılması çalışması.',
    icon: '💻',
  },
  {
    year: '2024',
    title: 'Günümüz',
    description: 'Devam eden araştırma projeleri ve yeni keşifler.',
    icon: '🔬',
  },
];

export default function ResearchTimeline({ items = defaultItems }: ResearchTimelineProps) {
  return (
    <section className={styles.timeline}>
      <div className={styles.header}>
        <span className={styles.label}>ARAŞTIRMA SERÜVENİ</span>
        <h2 className={styles.title}>İlmî Yolculuk</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.line}></div>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.content}>
              <div className={styles.icon}>{item.icon}</div>
              <span className={styles.year}>{item.year}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
            <div className={styles.dot}></div>
          </div>
        ))}
      </div>
    </section>
  );
}

