"use client";

import Image from 'next/image';
import { useScroll } from '@/hooks/useScroll';
import { ABOUT_PAGE_DATA } from '@/data/pages/about';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

// Sosyal medya ikonları
const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function AboutPage() {
  const scrolled = useScroll(50);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{ABOUT_PAGE_DATA.subtitle}</span>
            <h1 className={styles.name}>{ABOUT_PAGE_DATA.name}</h1>
            
            {/* Profil Fotoğrafı */}
            <div className={styles.profileImageWrapper}>
              <div className={styles.profileImageFrame}>
                <Image
                  src={ABOUT_PAGE_DATA.profileImage}
                  alt={ABOUT_PAGE_DATA.name}
                  width={200}
                  height={200}
                  className={styles.profileImage}
                />
              </div>
            </div>

            {/* Unvanlar */}
            <div className={styles.titles}>
              {ABOUT_PAGE_DATA.titles.map((title, index) => (
                <span key={index} className={styles.titleItem}>
                  {title}
                  {index < ABOUT_PAGE_DATA.titles.length - 1 && <span className={styles.titleDivider}>•</span>}
                </span>
              ))}
            </div>

            {/* Sosyal Medya */}
            <div className={styles.socialLinks}>
              {ABOUT_PAGE_DATA.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Alıntı Bölümü */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteContainer}>
            <span className={styles.quoteIconLeft}>"</span>
            <blockquote className={styles.quote}>
              {ABOUT_PAGE_DATA.quote}
            </blockquote>
            <span className={styles.quoteIconRight}>"</span>
            {ABOUT_PAGE_DATA.quoteAuthor && (
              <cite className={styles.quoteAuthor}>— {ABOUT_PAGE_DATA.quoteAuthor}</cite>
            )}
          </div>
        </section>

        {/* İstatistikler */}
        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            {ABOUT_PAGE_DATA.stats.map((stat, index) => (
              <div key={stat.id} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                {index < ABOUT_PAGE_DATA.stats.length - 1 && (
                  <div className={styles.statDivider}></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Biyografi Bölümü */}
        <section className={styles.biographySection}>
          <div className={styles.biographyContainer}>
            {ABOUT_PAGE_DATA.biography.map((section) => (
              <article key={section.id} className={styles.biographyItem}>
                <h2 className={styles.biographyTitle}>{section.title}</h2>
                <p className={styles.biographyContent}>{section.content}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Hayat Yolculuğu Timeline - Benim eklediğim özel özellik */}
        <section className={styles.timelineSection}>
          <div className={styles.timelineHeader}>
            <span className={styles.timelineLabel}>HAYAT YOLCULUĞUM</span>
            <h2 className={styles.timelineTitle}>Önemli Dönüm Noktaları</h2>
            <div className={styles.timelineUnderline}></div>
          </div>

          <div className={styles.timelineContainer}>
            <div className={styles.timelineLine}></div>
            {ABOUT_PAGE_DATA.timeline.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.timelineIcon}>{item.icon}</div>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineItemTitle}>{item.title}</h3>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
                <div className={styles.timelineDot}></div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

