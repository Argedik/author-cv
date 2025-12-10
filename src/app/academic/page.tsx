"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { ACADEMIC_PAGE_DATA } from '@/data/pages/academic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function AcademicPage() {
  const scrolled = useScroll(50);
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Diploma Çerçevesi Hero */}
        <section className={styles.diplomaHero}>
          <div className={styles.diplomaFrame}>
            <div className={styles.frameCorner} data-corner="tl"></div>
            <div className={styles.frameCorner} data-corner="tr"></div>
            <div className={styles.frameCorner} data-corner="bl"></div>
            <div className={styles.frameCorner} data-corner="br"></div>
            
            <div className={styles.diplomaContent}>
              <div className={styles.academicSeal}>🎓</div>
              <div className={styles.diplomaLabel}>{ACADEMIC_PAGE_DATA.subtitle}</div>
              <h1 className={styles.diplomaTitle}>{ACADEMIC_PAGE_DATA.title}</h1>
              <div className={styles.diplomaDivider}>
                <span></span>
                <span className={styles.dividerIcon}>⚜️</span>
                <span></span>
              </div>
              <p className={styles.diplomaDesc}>{ACADEMIC_PAGE_DATA.description}</p>
              <div className={styles.diplomaSignature}>
                <span className={styles.signatureName}>Süleyman Karakaş</span>
                <span className={styles.signatureTitle}>İlahiyatçı & Yazar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Alıntı - Akademik Tablo */}
        <section className={styles.quoteBoard}>
          <div className={styles.chalkboard}>
            <div className={styles.chalkFrame}></div>
            <div className={styles.chalkContent}>
              <blockquote className={styles.chalkQuote}>
                "{ACADEMIC_PAGE_DATA.quote}"
              </blockquote>
              <cite className={styles.chalkAuthor}>— {ACADEMIC_PAGE_DATA.quoteAuthor}</cite>
            </div>
            <div className={styles.chalkTray}>
              <span className={styles.chalk}></span>
              <span className={styles.chalk}></span>
              <span className={styles.eraser}></span>
            </div>
          </div>
        </section>

        {/* İstatistikler - Akademik Kartlar */}
        <section className={styles.credentialsSection}>
          <div className={styles.credentialsHeader}>
            <span className={styles.headerIcon}>🏛️</span>
            <h2>Akademik Başarılar</h2>
          </div>
          <div className={styles.credentialsGrid}>
            {ACADEMIC_PAGE_DATA.stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={styles.credentialCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.credentialRibbon}></div>
                <span className={styles.credentialValue}>{stat.value}</span>
                <span className={styles.credentialLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Eğitim Geçmişi - Diploma Serisi */}
        <section className={styles.degreesSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerDecor}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorIcon}>📜</span>
              <span className={styles.decorLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Akademik Dereceler</h2>
          </div>

          <div className={styles.degreesShowcase}>
            {ACADEMIC_PAGE_DATA.degrees.map((degree, index) => (
              <div 
                key={degree.id}
                className={`${styles.degreeFrame} ${selectedDegree === degree.id ? styles.selected : ''}`}
                onClick={() => setSelectedDegree(selectedDegree === degree.id ? null : degree.id)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.frameOrnament}></div>
                <div className={styles.degreeContent}>
                  <span className={styles.degreeIcon}>{degree.icon}</span>
                  <span className={styles.degreeYear}>{degree.year}</span>
                  <h3 className={styles.degreeName}>{degree.degree}</h3>
                  <p className={styles.degreeField}>{degree.field}</p>
                  <p className={styles.degreeInstitution}>{degree.institution}</p>
                </div>
                <div className={styles.frameSeal}>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yayınlar Listesi */}
        <section className={styles.publicationsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerDecor}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorIcon}>📚</span>
              <span className={styles.decorLine}></span>
            </div>
            <h2 className={styles.sectionTitle}>Akademik Yayınlar</h2>
          </div>

          <div className={styles.publicationsList}>
            {ACADEMIC_PAGE_DATA.publications.map((pub, index) => (
              <article 
                key={pub.id} 
                className={styles.publicationItem}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={styles.pubIndex}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.pubContent}>
                  <h4 className={styles.pubTitle}>{pub.title}</h4>
                  <div className={styles.pubMeta}>
                    <span className={styles.pubType}>{pub.type}</span>
                    <span className={styles.pubYear}>{pub.year}</span>
                    {pub.journal && <span className={styles.pubJournal}>{pub.journal}</span>}
                  </div>
                </div>
                <div className={styles.pubStatus}>
                  {pub.status === 'published' ? '✓' : '◌'}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Alt Bilgi */}
        <section className={styles.academicFooter}>
          <div className={styles.footerContent}>
            <div className={styles.graduationCap}>🎓</div>
            <p className={styles.footerQuote}>
              "İlim, insanın en değerli hazinesidir."
            </p>
          </div>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
