"use client";

import styles from './PublisherMap.module.scss';

interface Publisher {
  id: number;
  name: string;
  logo: string;
  city: string;
  booksPublished: number;
}

interface PublisherMapProps {
  publishers: Publisher[];
}

export default function PublisherMap({ publishers }: PublisherMapProps) {
  const totalBooks = publishers.reduce((sum, p) => sum + p.booksPublished, 0);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>YAYINEVI HARİTASI</span>
        <h2 className={styles.title}>İşbirliği Ağımız</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.mapContainer}>
        {/* Türkiye Haritası Görsel Temsili */}
        <div className={styles.mapVisual}>
          <div className={styles.mapOutline}>
            {/* İstanbul */}
            <div className={styles.cityMarker} style={{ top: '25%', left: '85%' }}>
              <div className={styles.markerDot}></div>
              <div className={styles.markerPulse}></div>
              <span className={styles.markerLabel}>İstanbul</span>
              <span className={styles.markerCount}>
                {publishers.filter(p => p.city === 'İstanbul').length} Yayınevi
              </span>
            </div>

            {/* Ankara */}
            <div className={styles.cityMarker} style={{ top: '40%', left: '55%' }}>
              <div className={styles.markerDot}></div>
              <div className={styles.markerPulse}></div>
              <span className={styles.markerLabel}>Ankara</span>
              <span className={styles.markerCount}>
                {publishers.filter(p => p.city === 'Ankara').length} Yayınevi
              </span>
            </div>
          </div>
        </div>

        {/* Yayınevi Listesi */}
        <div className={styles.publishersList}>
          <div className={styles.listHeader}>
            <h3>Yayınevi Ortaklarımız</h3>
            <span className={styles.totalBooks}>{totalBooks} Eser</span>
          </div>
          
          {publishers.map((publisher, index) => (
            <div 
              key={publisher.id} 
              className={styles.publisherItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.publisherLogo}>{publisher.logo}</span>
              <div className={styles.publisherInfo}>
                <span className={styles.publisherName}>{publisher.name}</span>
                <span className={styles.publisherCity}>{publisher.city}</span>
              </div>
              <span className={styles.publisherBooks}>{publisher.booksPublished} Kitap</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

