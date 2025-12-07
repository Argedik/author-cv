"use client";

import { useState, useRef, useEffect } from 'react';
import { BookCardProps } from '@/types';
import { BOOK_CARD_TEXT } from '@/data/bookCard';
import styles from './BookCard.module.scss';

export default function BookCard({ book, index }: BookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [flipSide, setFlipSide] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Kitap açılıyor
      setTimeout(() => {
        setIsBookOpen(true);
      }, 100);
    } else {
      setIsBookOpen(false);
      setCurrentPage(0);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsBookOpen(false);
    setCurrentPage(0);
  };

  const handleNextPage = (side: 'left' | 'right' = 'right') => {
    if (isFlipping || currentPage >= 4 || !isBookOpen) return;
    setIsFlipping(true);
    setFlipDirection('next');
    setFlipSide(side);
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
      setIsFlipping(false);
      setFlipDirection(null);
      setFlipSide(null);
    }, 700);
  };

  const handlePrevPage = (side: 'left' | 'right' = 'left') => {
    if (isFlipping || currentPage <= 0 || !isBookOpen) return;
    setIsFlipping(true);
    setFlipDirection('prev');
    setFlipSide(side);
    setTimeout(() => {
      setCurrentPage(currentPage - 1);
      setIsFlipping(false);
      setFlipDirection(null);
      setFlipSide(null);
    }, 700);
  };

  const handleLeftPageClick = () => {
    if (currentPage > 0) {
      handlePrevPage('left');
    }
  };

  const handleRightPageClick = () => {
    if (currentPage < 4) {
      handleNextPage('right');
    }
  };

  // Touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !isBookOpen) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextPage('right');
    }
    if (isRightSwipe) {
      handlePrevPage('left');
    }
  };

  return (
    <>
      <article 
        className={`${styles.bookCard} ${isExpanded ? styles.expanded : ''}`} 
        data-index={index}
        onClick={handleCardClick}
      >
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
              <span className={styles.imageText}>{BOOK_CARD_TEXT.bookImage}</span>
            </div>
          )}
        </div>

        <div className={styles.bookContent}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          <p className={styles.bookDescription}>{book.description}</p>

          <div className={styles.bookButtons}>
                <button className={styles.buyButton} onClick={(e) => e.stopPropagation()}>{BOOK_CARD_TEXT.buyButton}</button>
                <button className={styles.reviewButton} onClick={(e) => e.stopPropagation()}>{BOOK_CARD_TEXT.reviewButton}</button>
          </div>
        </div>
      </article>

      {/* Mobil expanded view - kitap açılmış hali */}
      {isExpanded && (
        <div className={styles.mobileExpandedView}>
          <div className={styles.expandedOverlay} onClick={handleClose}></div>
          <div className={styles.expandedContent}>
            {/* Kitap - kapalı veya açılmış */}
            <div 
              className={`${styles.openedBook} ${isBookOpen ? styles.bookOpen : styles.bookClosed}`}
              ref={bookRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Kapalı kitap görünümü */}
              {!isBookOpen && (
                <div className={styles.closedBook}>
                  <div className={styles.bookCover}>
                    <div className={styles.coverSpine}></div>
                    <div className={styles.coverFront}>
                      <div className={styles.coverTitle}>{book.title}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Açılmış kitap görünümü */}
              {isBookOpen && (
                <>
                  {/* Sol sayfa - tıklanabilir */}
                  <div 
                    className={`${styles.bookPageLeft} ${currentPage > 0 && isFlipping && flipSide === 'left' ? (flipDirection === 'prev' ? styles.flippingLeftPrev : styles.flippingLeftNext) : ''}`}
                    onClick={handleLeftPageClick}
                    style={{ cursor: currentPage > 0 ? 'pointer' : 'default' }}
                  >
                    <div className={styles.pageContent}>
                      {currentPage === 0 && (
                        <>
                          <div className={styles.pageHeader}>{BOOK_CARD_TEXT.cover}</div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                        </>
                      )}
                      {currentPage === 1 && (
                        <>
                          <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 1</div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                        </>
                      )}
                      {currentPage === 2 && (
                        <>
                          <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 2</div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                        </>
                      )}
                      {currentPage === 3 && (
                        <>
                          <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 3</div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                        </>
                      )}
                      {currentPage === 4 && (
                        <>
                          <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 4</div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                          <div className={styles.pageLine}></div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Ciltleme */}
                  <div className={styles.bookSpine}></div>

                  {/* Sağ sayfa - ön sayfa (çevrilen) */}
                  <div className={styles.bookPagesContainer}>
                {/* Sayfa 0 - İlk sayfa (sadece %5 görünür) */}
                {currentPage === 0 && (
                  <div className={`${styles.bookPageRight} ${styles.page0}`}>
                    <div className={styles.pageContent}>
                      <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 1</div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                    </div>
                  </div>
                )}

                {/* Sayfa 1 */}
                {currentPage === 1 && (
                  <div 
                    className={`${styles.bookPageRight} ${styles.page1} ${isFlipping && flipSide === 'right' ? (flipDirection === 'next' ? styles.flippingRightNext : styles.flippingRightPrev) : ''}`}
                    onClick={handleRightPageClick}
                    style={{ cursor: currentPage < 4 ? 'pointer' : 'default' }}
                  >
                    <div className={styles.pageContent}>
                      <div className={styles.pageHeader}>Sayfa 2</div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                    </div>
                  </div>
                )}

                {/* Sayfa 2 */}
                {currentPage === 2 && (
                  <div 
                    className={`${styles.bookPageRight} ${styles.page2} ${isFlipping && flipSide === 'right' ? (flipDirection === 'next' ? styles.flippingRightNext : styles.flippingRightPrev) : ''}`}
                    onClick={handleRightPageClick}
                    style={{ cursor: currentPage < 4 ? 'pointer' : 'default' }}
                  >
                    <div className={styles.pageContent}>
                      <div className={styles.pageHeader}>Sayfa 3</div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                    </div>
                  </div>
                )}

                {/* Sayfa 3 */}
                {currentPage === 3 && (
                  <div 
                    className={`${styles.bookPageRight} ${styles.page3} ${isFlipping && flipSide === 'right' ? (flipDirection === 'next' ? styles.flippingRightNext : styles.flippingRightPrev) : ''}`}
                    onClick={handleRightPageClick}
                    style={{ cursor: currentPage < 4 ? 'pointer' : 'default' }}
                  >
                    <div className={styles.pageContent}>
                      <div className={styles.pageHeader}>Sayfa 4</div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                    </div>
                  </div>
                )}

                {/* Sayfa 4 */}
                {currentPage === 4 && (
                  <div 
                    className={`${styles.bookPageRight} ${styles.page4} ${isFlipping && flipSide === 'right' ? (flipDirection === 'next' ? styles.flippingRightNext : styles.flippingRightPrev) : ''}`}
                    onClick={handleRightPageClick}
                    style={{ cursor: currentPage < 4 ? 'pointer' : 'default' }}
                  >
                    <div className={styles.pageContent}>
                      <div className={styles.pageHeader}>{BOOK_CARD_TEXT.page} 5</div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                      <div className={styles.pageLine}></div>
                    </div>
                  </div>
                )}
              </div>
                </>
              )}
            </div>

            {/* Sayfa navigasyon butonları - sadece kitap açıkken */}
            {isBookOpen && (
              <div className={styles.pageNavigation}>
              <button 
                className={`${styles.pageNavButton} ${currentPage === 0 ? styles.disabled : ''}`}
                onClick={() => handlePrevPage('left')}
                disabled={currentPage === 0}
              >
                    {BOOK_CARD_TEXT.previousPage}
              </button>
              <span className={styles.pageIndicator}>
                {currentPage + 1} / 5
              </span>
              <button 
                className={`${styles.pageNavButton} ${currentPage >= 4 ? styles.disabled : ''}`}
                onClick={() => handleNextPage('right')}
                disabled={currentPage >= 4}
              >
                    {BOOK_CARD_TEXT.nextPage}
              </button>
              </div>
            )}

            {/* Yazılar ve butonlar - alta */}
            <div className={styles.expandedInfo}>
              <h2 className={styles.expandedTitle}>{book.title}</h2>
              <p className={styles.expandedDescription}>{book.description}</p>
              <div className={styles.expandedButtons}>
                    <button className={styles.buyButton}>{BOOK_CARD_TEXT.buyButton}</button>
                    <button className={styles.reviewButton}>{BOOK_CARD_TEXT.reviewButton}</button>
              </div>
                  <button className={styles.closeButton} onClick={handleClose}>{BOOK_CARD_TEXT.closeButton}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

