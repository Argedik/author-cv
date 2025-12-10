"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { PUBLISHERS_PAGE_DATA } from '@/data/pages/publishers';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function PublishersPage() {
  const scrolled = useScroll(50);
  const [activePublisher, setActivePublisher] = useState<number | null>(null);

  const primaryPublishers = PUBLISHERS_PAGE_DATA.publishers.filter(p => p.type === 'primary');
  const secondaryPublishers = PUBLISHERS_PAGE_DATA.publishers.filter(p => p.type === 'secondary');

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Matbaa Hero */}
        <section className={styles.printshopHero}>
          <div className={styles.printingPress}>
            <div className={styles.pressRoller}></div>
            <div className={styles.pressBody}>
              <div className={styles.pressLabel}>{PUBLISHERS_PAGE_DATA.subtitle}</div>
              <h1 className={styles.pressTitle}>{PUBLISHERS_PAGE_DATA.title}</h1>
              <p className={styles.pressDesc}>{PUBLISHERS_PAGE_DATA.description}</p>
            </div>
            <div className={styles.paperStack}>
              <span className={styles.paper}></span>
              <span className={styles.paper}></span>
              <span className={styles.paper}></span>
            </div>
          </div>
          
          {/* Mürekkep Damlaları */}
          <div className={styles.inkDrops}>
            <span className={styles.inkDrop}></span>
            <span className={styles.inkDrop}></span>
            <span className={styles.inkDrop}></span>
          </div>
        </section>

        {/* Alıntı - Eski Kitap */}
        <section className={styles.oldBookSection}>
          <div className={styles.oldBook}>
            <div className={styles.bookSpine}></div>
            <div className={styles.bookPages}>
              <blockquote className={styles.bookQuote}>
                "{PUBLISHERS_PAGE_DATA.quote}"
              </blockquote>
              <cite className={styles.bookAuthor}>— {PUBLISHERS_PAGE_DATA.quoteAuthor}</cite>
            </div>
          </div>
        </section>

        {/* İstatistikler - Baskı Sayaçları */}
        <section className={styles.printCounters}>
          <div className={styles.counterHeader}>
            <span className={styles.counterIcon}>🖨️</span>
            <h2>Baskı İstatistikleri</h2>
          </div>
          <div className={styles.counterGrid}>
            {PUBLISHERS_PAGE_DATA.stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={styles.counter}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.counterDisplay}>
                  <span className={styles.counterValue}>{stat.value}</span>
                </div>
                <span className={styles.counterLabel}>{stat.label}</span>
                <div className={styles.counterGear}>⚙️</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ana Yayınevleri - Baskı Plakaları */}
        <section className={styles.primarySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine}></div>
            <h2 className={styles.headerTitle}>
              <span className={styles.headerIcon}>📚</span>
              Ana Yayınevleri
            </h2>
            <div className={styles.headerLine}></div>
          </div>

          <div className={styles.printPlates}>
            {primaryPublishers.map((publisher, index) => (
              <article 
                key={publisher.id}
                className={`${styles.printPlate} ${activePublisher === publisher.id ? styles.active : ''}`}
                onClick={() => setActivePublisher(activePublisher === publisher.id ? null : publisher.id)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={styles.plateFrame}>
                  <div className={styles.plateLogo}>{publisher.logo}</div>
                  <h3 className={styles.plateName}>{publisher.name}</h3>
                  <span className={styles.plateCity}>📍 {publisher.city}</span>
                  <p className={styles.plateDesc}>{publisher.description}</p>
                  
                  <div className={styles.plateStats}>
                    <div className={styles.bookCount}>
                      <span className={styles.countIcon}>📖</span>
                      <span className={styles.countValue}>{publisher.booksPublished}</span>
                      <span className={styles.countLabel}>Eser</span>
                    </div>
                  </div>

                  <a 
                    href={publisher.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.plateLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Web Sitesi →
                  </a>
                </div>
                
                {/* Baskı Efekti */}
                <div className={styles.printEffect}>
                  <span>BASILIYOR...</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Diğer Yayınevleri - Kağıt Ruloları */}
        <section className={styles.secondarySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLine}></div>
            <h2 className={styles.headerTitle}>
              <span className={styles.headerIcon}>🤝</span>
              İşbirliği Yaptığımız Yayınevleri
            </h2>
            <div className={styles.headerLine}></div>
          </div>

          <div className={styles.paperRolls}>
            {secondaryPublishers.map((publisher, index) => (
              <article 
                key={publisher.id}
                className={styles.paperRoll}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.rollCore}></div>
                <div className={styles.rollContent}>
                  <span className={styles.rollLogo}>{publisher.logo}</span>
                  <div className={styles.rollInfo}>
                    <h4 className={styles.rollName}>{publisher.name}</h4>
                    <span className={styles.rollMeta}>
                      {publisher.city} • {publisher.booksPublished} Eser
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Alt Bilgi - Matbaa İmzası */}
        <section className={styles.printshopFooter}>
          <div className={styles.footerStamp}>
            <div className={styles.stampContent}>
              <span className={styles.stampIcon}>📚</span>
              <span className={styles.stampText}>KALİTELİ BASKI</span>
              <span className={styles.stampYear}>2024</span>
            </div>
          </div>
          <p className={styles.footerText}>
            "İyi bir kitap, en iyi dosttur."
          </p>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
