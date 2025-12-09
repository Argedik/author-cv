"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { RESEARCH_PAGE_DATA } from '@/data/pages/research';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import ResearchTimeline from '@/components/Ideas/ResearchTimeline/ResearchTimeline';
import ResearchStats from '@/components/Ideas/ResearchStats/ResearchStats';
import styles from './page.module.scss';

export default function ResearchPage() {
  const scrolled = useScroll(50);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredProjects = selectedCategory === 'Tümü'
    ? RESEARCH_PAGE_DATA.projects
    : RESEARCH_PAGE_DATA.projects.filter(p => p.category === selectedCategory);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'ongoing': return 'Devam Ediyor';
      case 'planned': return 'Planlanıyor';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return styles.completed;
      case 'ongoing': return styles.ongoing;
      case 'planned': return styles.planned;
      default: return '';
    }
  };

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Hero Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <span className={styles.sectionLabel}>{RESEARCH_PAGE_DATA.subtitle}</span>
            <h1 className={styles.title}>{RESEARCH_PAGE_DATA.title}</h1>
            <p className={styles.description}>{RESEARCH_PAGE_DATA.description}</p>
          </div>
        </section>

        {/* Alıntı */}
        <section className={styles.quoteSection}>
          <div className={styles.quoteContainer}>
            <span className={styles.quoteIcon}>"</span>
            <blockquote className={styles.quote}>{RESEARCH_PAGE_DATA.quote}</blockquote>
            <cite className={styles.quoteAuthor}>— {RESEARCH_PAGE_DATA.quoteAuthor}</cite>
          </div>
        </section>

        {/* Ideas Component 1: Research Stats */}
        <ResearchStats />

        {/* Kategori Filtreleme */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            {RESEARCH_PAGE_DATA.categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Projeler Grid */}
        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.projectIcon}>{project.icon}</div>
                <div className={styles.projectHeader}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span className={`${styles.projectStatus} ${getStatusClass(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <span className={styles.projectCategory}>{project.category}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Ideas Component 2: Research Timeline */}
        <ResearchTimeline />
      </main>
      
      <Footer data={FOOTER_DATA} />
    </div>
  );
}

