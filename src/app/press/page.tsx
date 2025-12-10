"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { PRESS_PAGE_DATA } from '@/data/pages/press';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function PressPage() {
  const scrolled = useScroll(50);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getTypeFromMediaType = (mediaType: string): string | null => {
    const typeMap: Record<string, string> = {
      'Gazete': 'newspaper',
      'Dergi': 'magazine',
      'TV': 'tv',
      'Radyo': 'radio',
      'Online': 'online',
    };
    return typeMap[mediaType] || null;
  };

  const filteredItems = selectedType 
    ? PRESS_PAGE_DATA.pressItems.filter(item => {
        const mappedType = getTypeFromMediaType(selectedType);
        return mappedType ? item.type === mappedType : false;
      })
    : PRESS_PAGE_DATA.pressItems;

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Gazete Manşeti Hero */}
        <section className={styles.newsroomHero}>
          <div className={styles.newspaperFront}>
            <div className={styles.newspaperHeader}>
              <span className={styles.editionDate}>Özel Sayı • 2024</span>
              <h1 className={styles.masthead}>{PRESS_PAGE_DATA.title}</h1>
              <div className={styles.headerDecor}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className={styles.headlineSection}>
              <span className={styles.headlineLabel}>{PRESS_PAGE_DATA.subtitle}</span>
              <p className={styles.headlineText}>{PRESS_PAGE_DATA.description}</p>
            </div>
            <div className={styles.newspaperColumns}>
              <div className={styles.column}></div>
              <div className={styles.column}></div>
              <div className={styles.column}></div>
            </div>
          </div>
        </section>

        {/* İstatistikler - Haber Ticker */}
        <section className={styles.tickerSection}>
          <div className={styles.tickerContainer}>
            <div className={styles.tickerLabel}>
              <span className={styles.liveIcon}></span>
              CANLI
            </div>
            <div className={styles.tickerContent}>
              {PRESS_PAGE_DATA.stats.map((stat, index) => (
                <span key={stat.id} className={styles.tickerItem}>
                  <span className={styles.tickerValue}>{stat.value}</span>
                  <span className={styles.tickerText}>{stat.label}</span>
                  {index < PRESS_PAGE_DATA.stats.length - 1 && (
                    <span className={styles.tickerSeparator}>•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Basın İletişim - Mikrofon Kartı */}
        <section className={styles.pressContactSection}>
          <div className={styles.microphoneCard}>
            <div className={styles.micIcon}>🎙️</div>
            <div className={styles.micContent}>
              <h2 className={styles.contactTitle}>{PRESS_PAGE_DATA.contactInfo.title}</h2>
              <p className={styles.contactNote}>{PRESS_PAGE_DATA.contactInfo.note}</p>
              <div className={styles.contactLinks}>
                <a href={`mailto:${PRESS_PAGE_DATA.contactInfo.email}`} className={styles.contactLink}>
                  <span className={styles.linkIcon}>✉️</span>
                  <span>{PRESS_PAGE_DATA.contactInfo.email}</span>
                </a>
                <span className={styles.contactPhone}>
                  <span className={styles.linkIcon}>📞</span>
                  <span>{PRESS_PAGE_DATA.contactInfo.phone}</span>
                </span>
              </div>
            </div>
            <div className={styles.soundWaves}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        {/* Basın Alıntıları - TV Ekranı */}
        <section className={styles.quotesSection}>
          <div className={styles.tvScreen}>
            <div className={styles.tvFrame}>
              <div className={styles.screenContent}>
                {PRESS_PAGE_DATA.quotes.slice(0, 1).map((quote) => (
                  <div key={quote.id} className={styles.quoteDisplay}>
                    <div className={styles.channelBadge}>{quote.outlet}</div>
                    <blockquote className={styles.tvQuote}>
                      "{quote.text}"
                    </blockquote>
                    <cite className={styles.quoterName}>— {quote.author}</cite>
                  </div>
                ))}
                <div className={styles.liveIndicator}>
                  <span className={styles.recDot}></span>
                  KAYIT
                </div>
              </div>
              <div className={styles.screenReflection}></div>
            </div>
            <div className={styles.tvStand}></div>
          </div>
        </section>

        {/* Medya Tipi Filtreleri */}
        <section className={styles.mediaFilters}>
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${selectedType === null ? styles.active : ''}`}
              onClick={() => setSelectedType(null)}
            >
              Tümü
            </button>
            {PRESS_PAGE_DATA.mediaTypes.map((type) => (
              <button
                key={type}
                className={`${styles.filterTab} ${selectedType === type ? styles.active : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type === 'TV' ? '📺 TV' : 
                 type === 'Radyo' ? '📻 Radyo' : 
                 type === 'Gazete' || type === 'Dergi' ? '📰 Basılı' : 
                 type === 'Online' ? '💻 Online' : type}
              </button>
            ))}
          </div>
        </section>

        {/* Medya Haberleri - Gazete Küpürleri */}
        <section className={styles.clippingsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.headerIcon}>📰</span>
            <h2>Medya Haberleri</h2>
          </div>

          <div className={styles.clippingsWall}>
            {filteredItems.slice(0, 8).map((item, index) => (
              <article 
                key={item.id}
                className={styles.clipping}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 2)}deg)`
                }}
              >
                <div className={styles.clippingPin}></div>
                <div className={styles.clippingContent}>
                  <div className={styles.clippingHeader}>
                    <span className={styles.outletLogo}>{item.outletLogo}</span>
                    <span className={styles.outletName}>{item.outlet}</span>
                  </div>
                  <h3 className={styles.clippingTitle}>{item.title}</h3>
                  <div className={styles.clippingMeta}>
                    <span className={styles.clippingDate}>{item.date}</span>
                    <span className={styles.clippingType}>
                      {item.type === 'tv' ? '📺' : 
                       item.type === 'radio' ? '📻' : 
                       item.type === 'newspaper' || item.type === 'magazine' ? '📰' : '💻'}
                    </span>
                  </div>
                </div>
                <div className={styles.clippingTape}></div>
              </article>
            ))}
          </div>
        </section>

        {/* Alt Bilgi - Basın Rozeti */}
        <section className={styles.pressFooter}>
          <div className={styles.pressBadge}>
            <div className={styles.badgeContent}>
              <span className={styles.badgeIcon}>📰</span>
              <span className={styles.badgeText}>BASIN</span>
            </div>
            <div className={styles.badgeLanyard}></div>
          </div>
          <p className={styles.footerText}>
            "Haber, toplumun aynasıdır."
          </p>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
