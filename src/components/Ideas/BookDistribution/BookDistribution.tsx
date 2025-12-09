"use client";

import { useEffect, useState, useRef } from 'react';
import styles from './BookDistribution.module.scss';

interface Distribution {
  region: string;
  percentage: number;
  icon: string;
}

interface BookDistributionProps {
  distribution: Distribution[];
}

export default function BookDistribution({ distribution }: BookDistributionProps) {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  const sortedDistribution = [...distribution].sort((a, b) => b.percentage - a.percentage);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>DAĞITIM</span>
        <h2 className={styles.title}>Bölgesel Okuyucu Dağılımı</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.chartContainer}>
        {/* Pasta Grafik */}
        <div className={styles.pieChartWrapper}>
          <div className={styles.pieChart}>
            {sortedDistribution.map((item, index) => {
              const previousPercentages = sortedDistribution
                .slice(0, index)
                .reduce((sum, d) => sum + d.percentage, 0);
              
              return (
                <div
                  key={item.region}
                  className={styles.pieSlice}
                  style={{
                    '--percentage': item.percentage,
                    '--offset': previousPercentages,
                    '--color': `hsl(${40 + index * 15}, 50%, ${55 - index * 5}%)`,
                    animationDelay: `${index * 0.2}s`,
                  } as React.CSSProperties}
                ></div>
              );
            })}
            <div className={styles.pieCenter}>
              <span className={styles.pieCenterIcon}>📚</span>
              <span className={styles.pieCenterText}>Türkiye</span>
            </div>
          </div>
        </div>

        {/* Bar Grafik */}
        <div className={styles.barChart}>
          {sortedDistribution.map((item, index) => (
            <div key={item.region} className={styles.barItem}>
              <div className={styles.barLabel}>
                <span className={styles.barIcon}>{item.icon}</span>
                <span className={styles.barRegion}>{item.region}</span>
              </div>
              <div className={styles.barWrapper}>
                <div 
                  className={styles.barFill}
                  style={{
                    width: animated ? `${item.percentage}%` : '0%',
                    backgroundColor: `hsl(${40 + index * 15}, 50%, ${55 - index * 5}%)`,
                    transitionDelay: `${index * 0.1}s`,
                  }}
                ></div>
              </div>
              <span className={styles.barValue}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

