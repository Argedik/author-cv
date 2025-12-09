"use client";

import { useScroll } from '@/hooks/useScroll';
import { ACADEMIC_PAGE_DATA } from '@/data/pages/academic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import PublicationsList from '@/components/Ideas/PublicationsList/PublicationsList';
import AcademicNetwork from '@/components/Ideas/AcademicNetwork/AcademicNetwork';
import styles from './page.module.scss';

export default function AcademicPage() {
  const scrolled = useScroll(50);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{ACADEMIC_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{ACADEMIC_PAGE_DATA.title}</h1>
            <p className={styles.description}>{ACADEMIC_PAGE_DATA.description}</p>
          </div>
        </section>

        {/* Alıntı */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteContainer}>
            <span className={styles.quoteIcon}>"</span>
            <blockquote className={styles.quote}>{ACADEMIC_PAGE_DATA.quote}</blockquote>
            <cite className={styles.quoteAuthor}>— {ACADEMIC_PAGE_DATA.quoteAuthor}</cite>
          </div>
        </section>

        {/* İstatistikler */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {ACADEMIC_PAGE_DATA.stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Eğitim Geçmişi */}
        <section className={styles.degreesSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>EĞİTİM</span>
            <h2 className={styles.sectionTitle}>Akademik Geçmiş</h2>
            <div className={styles.sectionUnderline}></div>
          </div>

          <div className={styles.degreesTimeline}>
            {ACADEMIC_PAGE_DATA.degrees.map((degree, index) => (
              <div key={degree.id} className={styles.degreeCard}>
                <div className={styles.degreeIcon}>{degree.icon}</div>
                <div className={styles.degreeContent}>
                  <span className={styles.degreeYear}>{degree.year}</span>
                  <h3 className={styles.degreeName}>{degree.degree}</h3>
                  <p className={styles.degreeField}>{degree.field}</p>
                  <p className={styles.degreeInstitution}>{degree.institution}</p>
                </div>
                {index < ACADEMIC_PAGE_DATA.degrees.length - 1 && (
                  <div className={styles.degreeLine}></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Ideas Component 1: Publications List */}
        <PublicationsList publications={ACADEMIC_PAGE_DATA.publications} />

        {/* Ideas Component 2: Academic Network */}
        <AcademicNetwork collaborations={ACADEMIC_PAGE_DATA.collaborations} />
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

