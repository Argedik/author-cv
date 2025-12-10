"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { AWARDS_PAGE_DATA } from '@/data/pages/awards';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function AwardsPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [spotlightAward, setSpotlightAward] = useState<number | null>(null);

  const filteredAwards = selectedCategory === 'Tümü'
    ? AWARDS_PAGE_DATA.awards
    : AWARDS_PAGE_DATA.awards.filter(a => a.category === selectedCategory);

  // Önem sırasına göre ödüller
  const topAwards = AWARDS_PAGE_DATA.awards.filter(a => a.importance === 'gold').slice(0, 3);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Kupa Vitrini Hero */}
        <section className={styles.showcaseHero}>
          <div className={styles.showcaseGlass}>
            <div className={styles.glassReflection}></div>
            <div className={styles.showcaseContent}>
              <div className={styles.showcaseSpotlight}></div>
              <div className={styles.heroText}>
                <span className={styles.showcaseLabel}>{AWARDS_PAGE_DATA.subtitle}</span>
                <h1 className={styles.showcaseTitle}>{AWARDS_PAGE_DATA.title}</h1>
                <p className={styles.showcaseDesc}>{AWARDS_PAGE_DATA.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Podyum - En İyi 3 Ödül */}
        <section className={styles.podiumSection}>
          <div className={styles.podiumHeader}>
            <span className={styles.podiumIcon}>🏆</span>
            <h2>Öne Çıkan Başarılar</h2>
          </div>
          <div className={styles.podium}>
            {/* 2. Sıra */}
            {topAwards[1] && (
              <div className={styles.podiumPlace} data-place="2">
                <div className={styles.podiumTrophy}>
                  <span className={styles.trophyIcon}>{topAwards[1].icon}</span>
                </div>
                <div className={styles.podiumStand}>
                  <span className={styles.standNumber}>2</span>
                </div>
                <h3 className={styles.podiumTitle}>{topAwards[1].title}</h3>
                <span className={styles.podiumYear}>{topAwards[1].year}</span>
              </div>
            )}

            {/* 1. Sıra */}
            {topAwards[0] && (
              <div className={styles.podiumPlace} data-place="1">
                <div className={styles.podiumTrophy}>
                  <span className={styles.trophyIcon}>{topAwards[0].icon}</span>
                  <div className={styles.trophyGlow}></div>
                </div>
                <div className={styles.podiumStand}>
                  <span className={styles.standNumber}>1</span>
                  <div className={styles.standCrown}>👑</div>
                </div>
                <h3 className={styles.podiumTitle}>{topAwards[0].title}</h3>
                <span className={styles.podiumYear}>{topAwards[0].year}</span>
              </div>
            )}

            {/* 3. Sıra */}
            {topAwards[2] && (
              <div className={styles.podiumPlace} data-place="3">
                <div className={styles.podiumTrophy}>
                  <span className={styles.trophyIcon}>{topAwards[2].icon}</span>
                </div>
                <div className={styles.podiumStand}>
                  <span className={styles.standNumber}>3</span>
                </div>
                <h3 className={styles.podiumTitle}>{topAwards[2].title}</h3>
                <span className={styles.podiumYear}>{topAwards[2].year}</span>
              </div>
            )}
          </div>
        </section>

        {/* İstatistikler - Madalya Sayaçları */}
        <section className={styles.medalSection}>
          <div className={styles.medalRack}>
            {AWARDS_PAGE_DATA.stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={styles.medalHolder}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.medalRibbon}></div>
                <div className={styles.medal}>
                  <span className={styles.medalValue}>{stat.value}</span>
                </div>
                <span className={styles.medalLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Alıntı - Plaket */}
        <section className={styles.plaqueSection}>
          <div className={styles.plaque}>
            <div className={styles.plaqueDecor}></div>
            <blockquote className={styles.plaqueQuote}>
              "{AWARDS_PAGE_DATA.quote}"
            </blockquote>
            <cite className={styles.plaqueAuthor}>— {AWARDS_PAGE_DATA.quoteAuthor}</cite>
            <div className={styles.plaqueScrews}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        {/* Kategori Filtreleri - Vitrin Rafları */}
        <section className={styles.shelfTabs}>
          <div className={styles.tabsContainer}>
            {AWARDS_PAGE_DATA.categories.map((category) => (
              <button
                key={category}
                className={`${styles.shelfTab} ${selectedCategory === category ? styles.activeTab : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Ödüller Vitrini */}
        <section className={styles.displaySection}>
          <div className={styles.displayCabinet}>
            {filteredAwards.map((award, index) => (
              <article 
                key={award.id}
                className={`${styles.displayCase} ${styles[award.importance]} ${spotlightAward === award.id ? styles.spotlight : ''}`}
                onClick={() => setSpotlightAward(spotlightAward === award.id ? null : award.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.caseGlass}></div>
                <div className={styles.caseContent}>
                  <div className={styles.awardTrophy}>{award.icon}</div>
                  <div className={styles.awardInfo}>
                    <span className={styles.awardYear}>{award.year}</span>
                    <h3 className={styles.awardTitle}>{award.title}</h3>
                    <p className={styles.awardOrg}>{award.organization}</p>
                    <p className={styles.awardDesc}>{award.description}</p>
                    <span className={styles.awardCategory}>{award.category}</span>
                  </div>
                </div>
                <div className={styles.importanceTag}>
                  {award.importance === 'gold' ? '🥇' : award.importance === 'silver' ? '🥈' : '🥉'}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Alt Bilgi */}
        <section className={styles.awardsFooter}>
          <div className={styles.footerTrophies}>
            <span>🏆</span>
            <span>🎖️</span>
            <span>🏅</span>
          </div>
          <p className={styles.footerText}>
            "Başarı, çalışmanın meyvesidir."
          </p>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
