"use client";

import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { BOOKS } from '@/data/books';
import { BOOKS_PAGE_DATA } from '@/data/pages/books';
import { Book } from '@/types';
import Header from '@/components/Header/Header';
import BooksSection from '@/components/BooksSection/BooksSection';
import BookDetailModal from '@/components/BookDetailModal/BookDetailModal';
import Footer from '@/components/Footer/Footer';
import { FOOTER_DATA } from '@/data/footer';
import styles from './page.module.scss';

export default function BooksPage() {
  const scrolled = useScroll(50);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  return (
    <div className={styles.page}>
      <Header scrolled={scrolled} />
      <main className={styles.main}>
        {/* Başlık Bölümü */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{BOOKS_PAGE_DATA.title}</h1>
            <p className={styles.subtitle}>{BOOKS_PAGE_DATA.subtitle}</p>
            <div className={styles.titleUnderline}></div>
          </div>
        </section>

        {/* Kitaplar Bölümü */}
        <BooksSection books={BOOKS} onReview={handleReviewBook} />
      </main>
      
      {/* Footer */}
      <Footer data={FOOTER_DATA} />

      {/* Kitap Detay Modal */}
      <BookDetailModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

