"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { RESEARCH_PAGE_DATA } from '@/data/pages/research';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function ResearchPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [openNoteId, setOpenNoteId] = useState<number | null>(null);

  const filteredProjects = selectedCategory === 'Tümü'
    ? RESEARCH_PAGE_DATA.projects
    : RESEARCH_PAGE_DATA.projects.filter(p => p.category === selectedCategory);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '✓ Tamamlandı';
      case 'ongoing': return '◉ Devam Ediyor';
      case 'planned': return '○ Planlanıyor';
      default: return status;
    }
  };

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Laboratuvar Defteri Hero */}
        <section className={styles.labHero}>
          <div className={styles.notebookCover}>
            <div className={styles.coverSpiral}>
              {[...Array(12)].map((_, i) => (
                <span key={i} className={styles.spiralRing}></span>
              ))}
            </div>
            <div className={styles.coverContent}>
              <div className={styles.coverLabel}>ARAŞTIRMA DEFTERİ</div>
              <h1 className={styles.coverTitle}>{RESEARCH_PAGE_DATA.title}</h1>
              <div className={styles.coverMeta}>
                <span className={styles.coverAuthor}>Süleyman Karakaş</span>
                <span className={styles.coverYear}>2024</span>
              </div>
              <p className={styles.coverDesc}>{RESEARCH_PAGE_DATA.description}</p>
            </div>
            <div className={styles.coverSticker}>
              <span>🔬</span>
              <span className={styles.stickerText}>İLİM</span>
            </div>
          </div>
        </section>

        {/* Alıntı - Yapışkan Not */}
        <section className={styles.stickyNoteSection}>
          <div className={styles.stickyNote}>
            <div className={styles.stickyPin}></div>
            <blockquote className={styles.stickyQuote}>
              "{RESEARCH_PAGE_DATA.quote}"
            </blockquote>
            <cite className={styles.stickyAuthor}>— {RESEARCH_PAGE_DATA.quoteAuthor}</cite>
          </div>
        </section>

        {/* İstatistikler - Araştırma Metrikleri */}
        <section className={styles.metricsSection}>
          <div className={styles.metricsHeader}>
            <span className={styles.clipIcon}>📎</span>
            <h2>Araştırma Metrikleri</h2>
          </div>
          <div className={styles.metricsBoard}>
            {RESEARCH_PAGE_DATA.stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={styles.metricCard}
                style={{ transform: `rotate(${(index - 1.5) * 2}deg)` }}
              >
                <span className={styles.metricValue}>{stat.value}</span>
                <span className={styles.metricLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Kategori Sekmeler - Defter Sekmeleri */}
        <section className={styles.tabsSection}>
          <div className={styles.notebookTabs}>
            {RESEARCH_PAGE_DATA.categories.map((category, index) => (
              <button
                key={category}
                className={`${styles.tab} ${selectedCategory === category ? styles.activeTab : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{ '--tab-index': index } as React.CSSProperties}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Projeler - Araştırma Notları */}
        <section className={styles.notesSection}>
          <div className={styles.notesGrid}>
            {filteredProjects.map((project, index) => (
              <article 
                key={project.id} 
                className={`${styles.researchNote} ${openNoteId === project.id ? styles.expanded : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setOpenNoteId(openNoteId === project.id ? null : project.id)}
              >
                {/* Defter Kağıdı Çizgileri */}
                <div className={styles.paperLines}>
                  {[...Array(8)].map((_, i) => (
                    <span key={i} className={styles.line}></span>
                  ))}
                </div>

                {/* Sol Kenar Boşluğu */}
                <div className={styles.paperMargin}></div>

                {/* İçerik */}
                <div className={styles.noteContent}>
                  <div className={styles.noteHeader}>
                    <span className={styles.noteIcon}>{project.icon}</span>
                    <div className={styles.noteHeaderText}>
                      <span className={styles.noteYear}>{project.year}</span>
                      <span className={`${styles.noteStatus} ${styles[project.status]}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.noteTitle}>{project.title}</h3>
                  
                  <p className={styles.noteDescription}>{project.description}</p>

                  <div className={styles.noteTags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.noteTag}>#{tag}</span>
                    ))}
                  </div>

                  <div className={styles.noteCategory}>
                    <span className={styles.categoryIcon}>📂</span>
                    {project.category}
                  </div>
                </div>

                {/* Sayfa Numarası */}
                <div className={styles.pageNumber}>
                  Sayfa {index + 1}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Alt Bilgi - Defter Kapağı Arkası */}
        <section className={styles.backCover}>
          <div className={styles.backContent}>
            <span className={styles.backIcon}>📚</span>
            <p className={styles.backText}>
              Bu araştırma defteri, ilmi çalışmalarımın bir özetini içermektedir.
            </p>
            <div className={styles.backSignature}>
              <span>Süleyman Karakaş</span>
              <span className={styles.signatureDate}>İstanbul, 2024</span>
            </div>
          </div>
        </section>
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}
