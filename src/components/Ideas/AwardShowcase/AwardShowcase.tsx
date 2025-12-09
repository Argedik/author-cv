"use client";

import { useState } from 'react';
import styles from './AwardShowcase.module.scss';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
  importance: 'gold' | 'silver' | 'bronze';
}

interface AwardShowcaseProps {
  awards: Award[];
}

export default function AwardShowcase({ awards }: AwardShowcaseProps) {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const topAwards = awards.filter(a => a.importance === 'gold').slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>EN DEĞERLI</span>
        <h2 className={styles.title}>Öne Çıkan Ödüller</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.showcase}>
        {topAwards.map((award, index) => (
          <div 
            key={award.id} 
            className={`${styles.awardPodium} ${styles[`position${index + 1}`]}`}
            onClick={() => setSelectedAward(award)}
          >
            <div className={styles.badge}>
              <div className={styles.badgeInner}>
                <span className={styles.badgeIcon}>{award.icon}</span>
                <span className={styles.badgeRank}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              </div>
              <div className={styles.ribbon}></div>
            </div>
            <div className={styles.podiumInfo}>
              <h3 className={styles.awardTitle}>{award.title}</h3>
              <span className={styles.awardOrg}>{award.organization}</span>
              <span className={styles.awardYear}>{award.year}</span>
            </div>
            <div className={styles.podiumBase}></div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAward && (
        <div className={styles.modal} onClick={() => setSelectedAward(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedAward(null)}>✕</button>
            <div className={styles.modalIcon}>{selectedAward.icon}</div>
            <h3 className={styles.modalTitle}>{selectedAward.title}</h3>
            <p className={styles.modalOrg}>{selectedAward.organization}</p>
            <span className={styles.modalYear}>{selectedAward.year}</span>
            <p className={styles.modalDesc}>{selectedAward.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

