"use client";

import { useRef, useState, useEffect } from 'react';
import { BooksSectionProps } from '@/types';
import BookCard from '../BookCard/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './BooksSection.module.scss';

export default function BooksSection({ books, onReview }: BooksSectionProps) {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const gridSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className={styles.booksSection}>
      {/* Kitap Yığını Galerisi Başlığı */}
      <div className={styles.stackHeader}>
        <h2 className={styles.stackTitle}>
          <span className={styles.stackIcon}>📚</span>
          Kitap Yığını Galerisi
        </h2>
        <p className={styles.stackDescription}>
          Kitapları üst üste dizilmiş gibi görüntüleyin. Sürükleyerek yığından kitap seçin.
        </p>
      </div>

      {/* Swiper Cards Effect */}
      <div className={styles.swiperContainer}>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className={styles.booksStack}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentBookIndex(swiper.activeIndex);
          }}
          cardsEffect={{
            slideShadows: false,
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
          }}
          loop={books.length > 1}
          speed={500}
        >
          {books.map((book, index) => (
            <SwiperSlide key={book.id} className={styles.bookSlide}>
              <div className={styles.slideContent}>
                <BookCard book={book} index={index} onReview={onReview} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigasyon ve Bilgi */}
        <div className={styles.stackNavigation}>
          <div className={styles.bookCounter}>
            <span className={styles.currentBook}>{currentBookIndex + 1}</span>
            <span className={styles.separator}>/</span>
            <span className={styles.totalBooks}>{books.length}</span>
          </div>
          <div className={styles.navHint}>
            <span className={styles.hintIcon}>👆</span>
            <span>Kitapları sürükleyerek yığından seçin</span>
          </div>
        </div>

        {/* Aşağı Kaydırma Butonu */}
        <button 
          className={styles.scrollButton}
          onClick={() => {
            if (gridSectionRef.current) {
              gridSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          aria-label="Aşağı kaydır"
        >
          <span className={styles.scrollIcon}>↓</span>
        </button>
      </div>

      {/* Klasik Grid Görünümü */}
      <div ref={gridSectionRef} className={styles.classicGridSection}>
        <h3 className={styles.gridTitle}>Tüm Kitaplar</h3>
        <div className={styles.booksGrid}>
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} onReview={onReview} />
          ))}
        </div>
      </div>
    </section>
  );
}
