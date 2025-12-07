"use client";

import { useScroll } from '@/hooks/useScroll';
import { ABOUT_DATA } from '@/data/about';
import { REFERENCES_DATA } from '@/data/references';
import { FOOTER_DATA } from '@/data/footer';
import Header from '@/components/Header/Header';
import AboutSection from '@/components/AboutSection/AboutSection';
import ReferencesSection from '@/components/ReferencesSection/ReferencesSection';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.scss';

export default function Home() {
  const scrolled = useScroll(50);

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* About Section - Ana sayfa hero alanı - Yazar tanıtımı */}
        <AboutSection data={ABOUT_DATA} />
        
        {/* References Section - Referanslar */}
        <ReferencesSection data={REFERENCES_DATA} />
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
