"use client";

import styles from './AwardTimeline.module.scss';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  icon: string;
  importance: 'gold' | 'silver' | 'bronze';
}

interface AwardTimelineProps {
  awards: Award[];
}

export default function AwardTimeline({ awards }: AwardTimelineProps) {
  const sortedAwards = [...awards].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>ZAMAN ÇİZELGESİ</span>
        <h2 className={styles.title}>Ödül Tarihçesi</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.line}></div>
        
        {sortedAwards.map((award, index) => (
          <div 
            key={award.id} 
            className={`${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.yearBadge}>
              <span>{award.year}</span>
            </div>
            
            <div className={`${styles.card} ${styles[award.importance]}`}>
              <div className={styles.cardIcon}>{award.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{award.title}</h3>
                <span className={styles.cardOrg}>{award.organization}</span>
              </div>
              <div className={styles.importanceBadge}>
                {award.importance === 'gold' && '🥇'}
                {award.importance === 'silver' && '🥈'}
                {award.importance === 'bronze' && '🥉'}
              </div>
            </div>
            
            <div className={styles.dot}></div>
          </div>
        ))}
      </div>
    </section>
  );
}

