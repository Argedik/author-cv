"use client";

import { useScroll } from '@/hooks/useScroll';
import { PUBLISHERS_PAGE_DATA } from '@/data/pages/publishers';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import PublisherMap from '@/components/Ideas/PublisherMap/PublisherMap';
import BookDistribution from '@/components/Ideas/BookDistribution/BookDistribution';
import styles from './page.module.scss';

export default function PublishersPage() {
  const scrolled = useScroll(50);

  const primaryPublishers = PUBLISHERS_PAGE_DATA.publishers.filter(p => p.type === 'primary');
  const secondaryPublishers = PUBLISHERS_PAGE_DATA.publishers.filter(p => p.type === 'secondary');

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{PUBLISHERS_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{PUBLISHERS_PAGE_DATA.title}</h1>
            <p className={styles.description}>{PUBLISHERS_PAGE_DATA.description}</p>
          </div>
        </section>

        {/* Alıntı */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteContainer}>
            <span className={styles.quoteIcon}>"</span>
            <blockquote className={styles.quote}>{PUBLISHERS_PAGE_DATA.quote}</blockquote>
            <cite className={styles.quoteAuthor}>— {PUBLISHERS_PAGE_DATA.quoteAuthor}</cite>
          </div>
        </section>

        {/* İstatistikler */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {PUBLISHERS_PAGE_DATA.stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ana Yayınevleri */}
        <section className={styles.publishersSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>ANA ORTAKLAR</span>
            <h2 className={styles.sectionTitle}>Ana Yayınevleri</h2>
            <div className={styles.sectionUnderline}></div>
          </div>

          <div className={styles.primaryGrid}>
            {primaryPublishers.map((publisher) => (
              <article key={publisher.id} className={styles.publisherCard}>
                <div className={styles.publisherLogo}>{publisher.logo}</div>
                <h3 className={styles.publisherName}>{publisher.name}</h3>
                <span className={styles.publisherCity}>{publisher.city}</span>
                <p className={styles.publisherDesc}>{publisher.description}</p>
                <div className={styles.publisherStats}>
                  <span className={styles.bookCount}>{publisher.booksPublished} Eser</span>
                </div>
                <a 
                  href={publisher.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.publisherLink}
                >
                  Web Sitesi →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Diğer Yayınevleri */}
        <section className={styles.secondarySection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>DİĞER</span>
            <h2 className={styles.sectionTitle}>İşbirliği Yaptığımız Yayınevleri</h2>
            <div className={styles.sectionUnderline}></div>
          </div>

          <div className={styles.secondaryGrid}>
            {secondaryPublishers.map((publisher) => (
              <article key={publisher.id} className={styles.secondaryCard}>
                <span className={styles.secondaryLogo}>{publisher.logo}</span>
                <div className={styles.secondaryInfo}>
                  <h4 className={styles.secondaryName}>{publisher.name}</h4>
                  <span className={styles.secondaryCity}>{publisher.city} • {publisher.booksPublished} Eser</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ideas Component 1: Publisher Map */}
        <PublisherMap publishers={PUBLISHERS_PAGE_DATA.publishers} />

        {/* Ideas Component 2: Book Distribution */}
        <BookDistribution distribution={PUBLISHERS_PAGE_DATA.bookDistribution} />
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

