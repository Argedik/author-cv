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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const gridSectionRef = useRef<HTMLDivElement | null>(null);

  // Mobil kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobil - Kitap Rafı Görünümü
  if (isMobile) {
    return (
      <section className={styles.booksSection}>
        {/* Mobil Başlık */}
        <div className={styles.mobileHeader}>
          <div className={styles.shelfDecoration}>
            <span className={styles.shelfIcon}>📖</span>
          </div>
          <h2 className={styles.mobileTitle}>Kitaplığım</h2>
          <p className={styles.mobileSubtitle}>Kapağa dokunarak kitabı keşfedin</p>
        </div>

        {/* Kitap Rafı */}
        <div className={styles.bookshelf}>
          {/* Raf Üst Kısmı */}
          <div className={styles.shelfTop}>
            {books.map((book, index) => (
              <div 
                key={book.id}
                className={`${styles.bookSpine} ${selectedBookId === book.id ? styles.selected : ''}`}
                onClick={() => setSelectedBookId(selectedBookId === book.id ? null : book.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={styles.spineContent}
                  style={{ 
                    background: `linear-gradient(180deg, 
                      hsl(${(index * 45) % 360}, 35%, 45%) 0%, 
                      hsl(${(index * 45) % 360}, 40%, 35%) 100%)` 
                  }}
                >
                  <span className={styles.spineTitle}>{book.title}</span>
                  <span className={styles.spineAuthor}>{book.author || 'Süleyman Karakaş'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Raf Tahtası */}
          <div className={styles.shelfBoard}>
            <div className={styles.shelfShadow}></div>
          </div>
        </div>

        {/* Seçili Kitap Detayı */}
        {selectedBookId && (
          <div className={styles.selectedBookDetail}>
            {books.filter(b => b.id === selectedBookId).map((book) => (
              <div key={book.id} className={styles.bookPreview}>
                <div className={styles.previewImage}>
                  <img src={book.image} alt={book.title} />
                </div>
                <div className={styles.previewInfo}>
                  <h3 className={styles.previewTitle}>{book.title}</h3>
                  <p className={styles.previewAuthor}>{book.author || 'Süleyman Karakaş'}</p>
                  <p className={styles.previewDesc}>{book.description}</p>
                  <button 
                    className={styles.previewButton}
                    onClick={() => onReview && onReview(book)}
                  >
                    İncele
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tüm Kitaplar Listesi */}
        <div className={styles.mobileBooksList}>
          <h3 className={styles.listTitle}>
            <span className={styles.listIcon}>📚</span>
            Tüm Kitaplar
          </h3>
          <div className={styles.booksGrid}>
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} onReview={onReview} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop - Slider Görünümü
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
