"use client";

import { useState, useRef } from 'react';
import { BookCardProps } from '@/types';
import { BOOK_CARD_TEXT } from '@/data/bookCard';
import styles from './BookCard.module.scss';

export default function BookCard({ book, index }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <article 
      className={`${styles.bookCard} ${isHovered ? styles.hovered : ''}`} 
      data-index={index}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Kart içeriği */}
      <div className={styles.cardInner}>
        {/* Resim alanı */}
        <div className={styles.bookImageContainer}>
          {book.image ? (
            <img 
              src={book.image} 
              alt={book.title}
              className={styles.bookImage}
            />
          ) : (
            <div className={styles.bookImagePlaceholder}>
              <span className={styles.imageIcon}>📚</span>
            </div>
          )}
        </div>

        {/* Başlık - Her zaman görünür */}
        <div className={styles.bookTitleArea}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
        </div>

        {/* Hover'da görünen içerik */}
        <div className={styles.hoverContent}>
          <p className={styles.bookDescription}>{book.description}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.buyButton} onClick={(e) => e.stopPropagation()}>
              {BOOK_CARD_TEXT.buyButton}
            </button>
            <button className={styles.detailButton} onClick={(e) => e.stopPropagation()}>
              {BOOK_CARD_TEXT.reviewButton}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
