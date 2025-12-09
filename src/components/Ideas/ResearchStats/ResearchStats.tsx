"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './ResearchStats.module.scss';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

const defaultStats: Stat[] = [
  { id: 1, value: 25, suffix: '+', label: 'Araştırma Projesi', icon: '📚', color: '#c4a35a' },
  { id: 2, value: 150, suffix: '+', label: 'Kaynak İnceleme', icon: '📖', color: '#8b7355' },
  { id: 3, value: 12, suffix: '', label: 'Yıllık Deneyim', icon: '⏳', color: '#a08060' },
  { id: 4, value: 8, suffix: '', label: 'Uluslararası İşbirliği', icon: '🌍', color: '#b09070' },
];

export default function ResearchStats() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(defaultStats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      defaultStats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.header}>
        <span className={styles.label}>SAYILARLA</span>
        <h2 className={styles.title}>Araştırma İstatistikleri</h2>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.statsGrid}>
        {defaultStats.map((stat, index) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}20` }}>
              <span className={styles.icon}>{stat.icon}</span>
            </div>
            <div className={styles.valueWrapper}>
              <span className={styles.value} style={{ color: stat.color }}>
                {animatedValues[index]}{stat.suffix}
              </span>
            </div>
            <span className={styles.statLabel}>{stat.label}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: isVisible ? '100%' : '0%',
                  backgroundColor: stat.color,
                  transition: 'width 2s ease-out'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

