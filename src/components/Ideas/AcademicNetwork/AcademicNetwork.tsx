"use client";

import styles from './AcademicNetwork.module.scss';

interface Collaboration {
  id: number;
  institution: string;
  country: string;
  type: string;
  year: string;
  icon: string;
}

interface AcademicNetworkProps {
  collaborations: Collaboration[];
}

export default function AcademicNetwork({ collaborations }: AcademicNetworkProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>GLOBAL AĞ</span>
        <h2 className={styles.title}>Akademik İşbirlikleri</h2>
        <div className={styles.underline}></div>
        <p className={styles.subtitle}>
          Dünya genelindeki prestijli kurumlarla yürütülen ortak çalışmalar
        </p>
      </div>

      <div className={styles.networkContainer}>
        {/* Merkez */}
        <div className={styles.center}>
          <div className={styles.centerCircle}>
            <span className={styles.centerIcon}>🎓</span>
            <span className={styles.centerText}>Süleyman Karakaş</span>
          </div>
        </div>

        {/* İşbirliği Kartları */}
        <div className={styles.collaborationsGrid}>
          {collaborations.map((collab, index) => (
            <div 
              key={collab.id} 
              className={styles.collabCard}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.cardIcon}>{collab.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.institution}>{collab.institution}</h3>
                <span className={styles.country}>{collab.country}</span>
                <span className={styles.type}>{collab.type}</span>
                <span className={styles.year}>{collab.year}</span>
              </div>
              <div className={styles.connector}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Dünya Haritası Efekti */}
      <div className={styles.worldMap}>
        <div className={styles.mapOverlay}></div>
      </div>
    </section>
  );
}

