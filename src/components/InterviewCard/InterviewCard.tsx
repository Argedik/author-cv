"use client";

import { InterviewCardProps } from '@/types';
import styles from './InterviewCard.module.scss';
import { FaYoutube, FaSpotify, FaApple } from 'react-icons/fa6';

// Platform ikonları
const PlatformIcon = ({ platform }: { platform: string }) => {
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return <FaSpotify className={styles.platformIcon} />;
      case 'youtube':
        return <FaYoutube className={styles.platformIcon} />;
      case 'apple':
        return <FaApple className={styles.platformIcon} />;
      default:
        return <FaYoutube className={styles.platformIcon} />;
    }
  };

  return getIcon();
};

// Kategori etiketi
const CategoryBadge = ({ category }: { category: string }) => {
  const labels: Record<string, string> = {
    podcast: 'Podcast',
    interview: 'Röportaj',
    panel: 'Panel',
    conference: 'Konferans',
  };
  
  return (
    <span className={`${styles.categoryBadge} ${styles[category]}`}>
      {labels[category] || category}
    </span>
  );
};

export default function InterviewCard({ interview, index }: InterviewCardProps) {
  const getUrl = () => {
    return interview.spotifyUrl || interview.youtubeUrl || interview.appleUrl || '#';
  };

  return (
    <article 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Sol Taraf - Thumbnail/Platform */}
      <div className={styles.thumbnailSection}>
        <div className={styles.thumbnailContainer}>
          {/* Platform İkonu ve Arka Plan */}
          <div className={`${styles.platformBg} ${styles[interview.platform]}`}>
            <PlatformIcon platform={interview.platform} />
          </div>
          
          {/* Şov Adı */}
          <div className={styles.showOverlay}>
            <h4 className={styles.showName}>{interview.showName}</h4>
          </div>

          {/* Oynat Butonu */}
          <a href={getUrl()} className={styles.playButton} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Sağ Taraf - İçerik */}
      <div className={styles.content}>
        {/* Üst Bilgiler */}
        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.label}>Program:</span>
            <span className={styles.value}>{interview.showName}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Bölüm:</span>
            <a href={getUrl()} className={styles.episodeLink}>{interview.episodeTitle}</a>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.label}>Sunucu:</span>
            <span className={styles.value}>{interview.host}</span>
          </div>
        </div>

        {/* Tarih ve Süre */}
        <div className={styles.dateTime}>
          <time className={styles.date}>{interview.date}</time>
          <span className={styles.separator}>•</span>
          <span className={styles.duration}>{interview.duration}</span>
          <CategoryBadge category={interview.category} />
        </div>

        {/* Açıklama */}
        <p className={styles.description}>{interview.description}</p>

        {/* Dinle/İzle Butonu */}
        <a href={getUrl()} className={styles.listenButton} target="_blank" rel="noopener noreferrer">
          {interview.platform === 'youtube' ? 'İzle' : 'Dinle'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </article>
  );
}

