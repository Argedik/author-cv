import { HeroSectionProps } from '@/types';
import styles from './HeroSection.module.scss';

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSubtitle}>{subtitle}</p>
    </section>
  );
}

