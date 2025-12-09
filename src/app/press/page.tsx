"use client";

import { useScroll } from '@/hooks/useScroll';
import { PRESS_PAGE_DATA } from '@/data/pages/press';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import MediaGallery from '@/components/Ideas/MediaGallery/MediaGallery';
import PressQuotes from '@/components/Ideas/PressQuotes/PressQuotes';
import styles from './page.module.scss';

export default function PressPage() {
  const scrolled = useScroll(50);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{PRESS_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{PRESS_PAGE_DATA.title}</h1>
            <p className={styles.description}>{PRESS_PAGE_DATA.description}</p>
          </div>
        </section>

        {/* İstatistikler */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {PRESS_PAGE_DATA.stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Basın İletişim */}
        <section className={styles.contactSection}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📬</div>
            <h2 className={styles.contactTitle}>{PRESS_PAGE_DATA.contactInfo.title}</h2>
            <p className={styles.contactNote}>{PRESS_PAGE_DATA.contactInfo.note}</p>
            <div className={styles.contactDetails}>
              <a href={`mailto:${PRESS_PAGE_DATA.contactInfo.email}`} className={styles.contactLink}>
                <span className={styles.linkIcon}>✉️</span>
                {PRESS_PAGE_DATA.contactInfo.email}
              </a>
              <span className={styles.contactPhone}>
                <span className={styles.linkIcon}>📞</span>
                {PRESS_PAGE_DATA.contactInfo.phone}
              </span>
            </div>
          </div>
        </section>

        {/* Ideas Component 1: Media Gallery */}
        <MediaGallery items={PRESS_PAGE_DATA.pressItems} types={PRESS_PAGE_DATA.mediaTypes} />

        {/* Ideas Component 2: Press Quotes */}
        <PressQuotes quotes={PRESS_PAGE_DATA.quotes} />

        {/* Son Haberler Listesi */}
        <section className={styles.newsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>GÜNCEL</span>
            <h2 className={styles.sectionTitle}>Son Medya Haberleri</h2>
            <div className={styles.sectionUnderline}></div>
          </div>

          <div className={styles.newsList}>
            {PRESS_PAGE_DATA.pressItems.slice(0, 5).map((item, index) => (
              <article 
                key={item.id} 
                className={styles.newsItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles.newsIcon}>{item.outletLogo}</span>
                <div className={styles.newsContent}>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsOutlet}>{item.outlet}</span>
                    <span className={styles.newsDivider}>•</span>
                    <span className={styles.newsDate}>{item.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

