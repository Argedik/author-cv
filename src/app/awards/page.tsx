"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { AWARDS_PAGE_DATA } from '@/data/pages/awards';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import AwardShowcase from '@/components/Ideas/AwardShowcase/AwardShowcase';
import AwardTimeline from '@/components/Ideas/AwardTimeline/AwardTimeline';
import styles from './page.module.scss';

export default function AwardsPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredAwards = selectedCategory === 'Tümü'
    ? AWARDS_PAGE_DATA.awards
    : AWARDS_PAGE_DATA.awards.filter(a => a.category === selectedCategory);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{AWARDS_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{AWARDS_PAGE_DATA.title}</h1>
            <p className={styles.description}>{AWARDS_PAGE_DATA.description}</p>
          </div>
        </section>

        {/* Alıntı */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteContainer}>
            <span className={styles.quoteIcon}>"</span>
            <blockquote className={styles.quote}>{AWARDS_PAGE_DATA.quote}</blockquote>
            <cite className={styles.quoteAuthor}>— {AWARDS_PAGE_DATA.quoteAuthor}</cite>
          </div>
        </section>

        {/* İstatistikler */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {AWARDS_PAGE_DATA.stats.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ideas Component 1: Award Showcase (Podyum) */}
        <AwardShowcase awards={AWARDS_PAGE_DATA.awards} />

        {/* Kategori Filtre */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            {AWARDS_PAGE_DATA.categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Ödüller Grid */}
        <section className={styles.awardsSection}>
          <div className={styles.awardsGrid}>
            {filteredAwards.map((award) => (
              <article key={award.id} className={`${styles.awardCard} ${styles[award.importance]}`}>
                <div className={styles.awardIcon}>{award.icon}</div>
                <div className={styles.awardHeader}>
                  <span className={styles.awardYear}>{award.year}</span>
                  <span className={styles.awardCategory}>{award.category}</span>
                </div>
                <h3 className={styles.awardTitle}>{award.title}</h3>
                <p className={styles.awardOrg}>{award.organization}</p>
                <p className={styles.awardDesc}>{award.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Ideas Component 2: Award Timeline */}
        <AwardTimeline awards={AWARDS_PAGE_DATA.awards} />
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

