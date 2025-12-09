"use client";

import Image from 'next/image';
import { useScroll } from '@/hooks/useScroll';
import { ABOUT_PAGE_DATA } from '@/data/pages/about';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import { 
  FaYoutube, 
  FaXTwitter, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaSpotify 
} from 'react-icons/fa6';
import styles from './page.module.scss';

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
              {ABOUT_PAGE_DATA.socialLinks.map((social) => {
                // Icon seçimi - Footer'daki gibi
                const getIcon = () => {
                  const iconName = social.name.toLowerCase();
                  if (iconName.includes('youtube')) return <FaYoutube />;
                  if (iconName.includes('x') || iconName.includes('twitter')) return <FaXTwitter />;
                  if (iconName.includes('linkedin')) return <FaLinkedin />;
                  if (iconName.includes('facebook')) return <FaFacebook />;
                  if (iconName.includes('instagram')) return <FaInstagram />;
                  if (iconName.includes('spotify')) return <FaSpotify />;
                  return null;
                };

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {getIcon()}
                  </a>
                );
              })}
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

