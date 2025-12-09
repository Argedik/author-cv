"use client";

import { InterviewCardProps } from '@/types';
import styles from './InterviewCard.module.scss';

// Platform ikonları
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'spotify':
      return (
        <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'apple':
      return (
        <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.34 0A5.328 5.328 0 0 0 0 5.34v13.32A5.328 5.328 0 0 0 5.34 24h13.32A5.328 5.328 0 0 0 24 18.66V5.34A5.328 5.328 0 0 0 18.66 0zm6.525 3.6c.398 0 1.122.122 1.764.869.506.59.506 1.614.506 2.063 0 .122 0 .237-.012.31-.137.03-.505.085-.908.085-.506 0-.968-.073-1.36-.24-.578-.247-.98-.72-.98-1.528 0-.17.024-.543.188-.889.195-.412.516-.67.802-.67zm-3.396.754c.18 0 .48.024.78.085-.073.262-.134.554-.134.87 0 1.352.76 2.252 1.856 2.735.566.25 1.212.352 1.82.352.398 0 .773-.04 1.074-.098-.012.25-.012.481-.012.7 0 1.79-.385 3.335-1.06 4.577-.724 1.334-1.803 2.438-3.335 2.438-.688 0-1.224-.183-1.75-.365-.554-.191-1.096-.378-1.872-.378-.83 0-1.42.208-1.989.408-.52.183-1.017.356-1.632.356-.712 0-1.33-.219-1.864-.58.7-.926 1.108-2.07 1.108-3.298 0-1.62-.784-2.904-1.8-3.765.5-.602 1.242-1.037 2.222-1.037.7 0 1.261.195 1.788.378.48.165.932.321 1.47.321.524 0 1.007-.168 1.518-.347.557-.195 1.148-.402 1.867-.402z"/>
        </svg>
      );
    default:
      return (
        <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
  }
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

