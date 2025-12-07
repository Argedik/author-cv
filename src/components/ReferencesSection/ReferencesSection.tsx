"use client";

import { useEffect, useRef, useState } from 'react';
import { ReferencesSectionProps } from '@/types';
import styles from './ReferencesSection.module.scss';

export default function ReferencesSection({ data }: ReferencesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="references" className={styles.referencesSection} ref={sectionRef}>
      {/* Dekoratif üst */}
      <div className={styles.decorativeTop}>
        <div className={styles.ornamentWave}></div>
      </div>

      {/* Başlık */}
      <div className={styles.headerWrapper}>
        <span className={styles.subtitle}>{data.subtitle}</span>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.titleDecoration}>
          <span className={styles.decorLine}></span>
          <span className={styles.decorSymbol}>☙</span>
          <span className={styles.decorLine}></span>
        </div>
      </div>

      {/* 3D Carousel Container */}
      <div className={styles.carouselContainer}>
        <div className={`${styles.carousel} ${isVisible ? styles.animate : ''}`}>
          {/* Sol taraftan gelen kartlar */}
          <div className={styles.trackLeft}>
            {data.references.slice(0, 3).map((ref, index) => (
              <div
                key={ref.id}
                className={styles.referenceCard}
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.quoteIcon}>❝</div>
                  <p className={styles.quoteText}>{ref.quote}</p>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {ref.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.authorDetails}>
                      <h4 className={styles.authorName}>{ref.name}</h4>
                      <p className={styles.authorTitle}>{ref.title}</p>
                      <p className={styles.authorOrg}>{ref.organization}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>

          {/* Sağ taraftan gelen kartlar */}
          <div className={styles.trackRight}>
            {data.references.slice(3, 6).map((ref, index) => (
              <div
                key={ref.id}
                className={styles.referenceCard}
                style={{
                  animationDelay: `${index * 0.3 + 0.15}s`,
                }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.quoteIcon}>❝</div>
                  <p className={styles.quoteText}>{ref.quote}</p>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {ref.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.authorDetails}>
                      <h4 className={styles.authorName}>{ref.name}</h4>
                      <p className={styles.authorTitle}>{ref.title}</p>
                      <p className={styles.authorOrg}>{ref.organization}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Merkez dekoratif öğe */}
        <div className={styles.centerDecoration}>
          <div className={styles.centerOrb}>
            <span className={styles.orbIcon}>✦</span>
          </div>
          <div className={styles.orbRings}>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
          </div>
        </div>
      </div>

      {/* Dekoratif alt */}
      <div className={styles.decorativeBottom}>
        <div className={styles.patternLine}></div>
        <div className={styles.centerMark}>❧</div>
        <div className={styles.patternLine}></div>
      </div>
    </section>
  );
}

