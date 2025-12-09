"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Book } from '@/types';
import styles from './BookDetailModal.module.scss';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

// Kitap boyutları hesaplama (mm cinsinden)
const calculateBookDimensions = (pageCount: number) => {
  const pageThickness = 0.1;
  const coverThickness = 4;
  const totalThickness = Math.round((pageCount * pageThickness) + coverThickness);
  const width = 135;
  const height = 210;
  
  return {
    width,
    height,
    thickness: totalThickness,
    thicknessPx: Math.max(15, Math.min(50, totalThickness * 0.8))
  };
};

export default function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  const [isBookOpened, setIsBookOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0); // 0 = sayfa 1-2, 1 = sayfa 3-4, vs.
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'left' | 'right' | null>(null);
  const [showLockedAnimation, setShowLockedAnimation] = useState(false);
  const [showBuyAnimation, setShowBuyAnimation] = useState(false);

  const dimensions = useMemo(() => {
    return calculateBookDimensions(book?.pageCount || 200);
  }, [book?.pageCount]);

  // Ücretsiz sayfa sayısı (%5)
  const freePageCount = useMemo(() => {
    const count = book?.pageCount || 200;
    return Math.max(4, Math.ceil(count * 0.05)); // Minimum 4 sayfa
  }, [book?.pageCount]);

  // Toplam spread sayısı (her spread 2 sayfa)
  const totalFreeSpread = Math.ceil(freePageCount / 2);

  // Sol ve sağ sayfa numaraları
  const leftPageNum = currentSpread * 2 + 1;
  const rightPageNum = currentSpread * 2 + 2;

  // Sağ sayfa kilitli mi?
  const isRightPageLocked = rightPageNum > freePageCount;
  const isNextSpreadLocked = (currentSpread + 1) * 2 + 1 > freePageCount;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isBookOpened) {
          setIsBookOpened(false);
          setIsOpening(false);
          setCurrentSpread(0);
        } else {
          onClose();
        }
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isBookOpened, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsBookOpened(false);
      setIsOpening(false);
      setCurrentSpread(0);
      setIsPageTurning(false);
      setTurnDirection(null);
    }
  }, [isOpen]);

  const handleBookClick = () => {
    if (isBookOpened || isOpening) return;
    
    setIsOpening(true);
    
    setTimeout(() => {
      setIsOpening(false);
      setIsBookOpened(true);
    }, 800);
  };

  const handleCloseBook = () => {
    setIsBookOpened(false);
    setCurrentSpread(0);
  };

  // Sol sayfaya tıklama - önceki spread'e git (sağa doğru çevir)
  const handleLeftPageClick = useCallback(() => {
    if (isPageTurning || currentSpread === 0) return;
    
    setIsPageTurning(true);
    setTurnDirection('right');
    
    setTimeout(() => {
      setCurrentSpread(prev => prev - 1);
      setIsPageTurning(false);
      setTurnDirection(null);
    }, 600);
  }, [isPageTurning, currentSpread]);

  // Sağ sayfaya tıklama - sonraki spread'e git (sola doğru çevir)
  const handleRightPageClick = useCallback(() => {
    if (isPageTurning) return;
    
    // Kilitli sayfaya tıklandıysa
    if (isRightPageLocked || isNextSpreadLocked) {
      triggerLockedAnimation();
      return;
    }
    
    setIsPageTurning(true);
    setTurnDirection('left');
    
    setTimeout(() => {
      setCurrentSpread(prev => prev + 1);
      setIsPageTurning(false);
      setTurnDirection(null);
    }, 600);
  }, [isPageTurning, isRightPageLocked, isNextSpreadLocked]);

  // Kilitli sayfa animasyonu
  const triggerLockedAnimation = () => {
    setShowLockedAnimation(true);
    setShowBuyAnimation(true);
    
    // 2 saniye sonra animasyonları kapat
    setTimeout(() => {
      setShowLockedAnimation(false);
      setShowBuyAnimation(false);
    }, 2000);
  };

  if (!isOpen || !book) return null;

  // Sayfa içeriği oluştur
  const getPageContent = (pageNum: number) => {
    const isLocked = pageNum > freePageCount;
    
    if (isLocked) {
      return (
        <div className={styles.lockedPageContent}>
          <div className={styles.lockIcon}>🔒</div>
          <p className={styles.lockText}>Bu sayfa kilitli</p>
          <p className={styles.lockSubtext}>Devamını okumak için satın alın</p>
        </div>
      );
    }

    // Dinamik sayfa içeriği
    if (pageNum === 1) {
      return (
        <>
          <p><strong>Bismillahirrahmanirrahim</strong></p>
          <p>Bu değerli eserin ilk sayfalarını okumaktasınız. Yazar, bu kitapta derin ilmi birikimini okuyucularla paylaşmaktadır.</p>
          <p>Kitabın tamamını okumak için satın alabilirsiniz.</p>
        </>
      );
    } else if (pageNum === 2) {
      return (
        <>
          <p><strong>İçindekiler</strong></p>
          <p>1. Giriş .......................... 5</p>
          <p>2. Temel Kavramlar ........ 15</p>
          <p>3. Ana Bölüm .................. 45</p>
          <p>4. Sonuç ........................ 180</p>
        </>
      );
    } else if (pageNum === 3) {
      return (
        <>
          <p><strong>Önsöz</strong></p>
          <p>Bu kitap, uzun yılların emeği ve araştırmasının ürünüdür. Okuyucularımıza faydalı olması dileğiyle...</p>
          <p>Yazarın önsözü bu sayfada yer almaktadır.</p>
        </>
      );
    } else if (pageNum === 4) {
      return (
        <>
          <p><strong>Takdim</strong></p>
          <p>Değerli okuyucular, elinizdeki bu eser, konusunda önemli bir kaynak niteliğindedir.</p>
          <p>Kitabın yazılış amacı ve hedef kitlesi hakkında bilgi verilmektedir.</p>
        </>
      );
    } else {
      return (
        <>
          <p><strong>Sayfa {pageNum}</strong></p>
          <p>Bu sayfa, kitabın {pageNum}. sayfasının önizlemesini içermektedir.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </>
      );
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {/* Kapatma butonu */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Kapat">
          ✕
        </button>

        {/* Kitap açılmadan önce - 3D Kapalı Kitap */}
        {!isBookOpened && (
          <div className={styles.closedBookContainer}>
            <div 
              className={`${styles.book3D} ${isOpening ? styles.bookOpening : ''}`}
              style={{ '--book-thickness': `${dimensions.thicknessPx}px` } as React.CSSProperties}
              onClick={handleBookClick}
            >
              <div className={styles.bookCoverFront}>
                <img src={book.image} alt={book.title} />
              </div>
              <div className={styles.bookCoverBack}></div>
              <div className={styles.bookSpine}>
                <span className={styles.spineTitle}>{book.title}</span>
              </div>
              <div className={styles.bookPages}></div>
              <div className={styles.bookTop}></div>
              <div className={styles.bookBottom}></div>
            </div>

            <div className={styles.bookSizeLabel}>
              {dimensions.width} × {dimensions.height} × {dimensions.thickness} mm
              <span>{book.pageCount} sayfa</span>
            </div>

            {!isOpening && (
              <div className={styles.clickHint}>
                <span>📖</span>
                <span>Kitabı açmak için tıklayın</span>
              </div>
            )}
          </div>
        )}

        {/* Kitap açıldıktan sonra - Açık Kitap Görünümü */}
        {isBookOpened && (
          <div className={`${styles.openBookContainer} ${showLockedAnimation ? styles.shakeBook : ''}`}>
            {/* Geri butonu */}
            <button className={styles.backToBookButton} onClick={handleCloseBook}>
              ← Kitabı Kapat
            </button>

            {/* Sayfa navigasyonu */}
            <div className={styles.pageNavigation}>
              <button 
                className={`${styles.navButton} ${currentSpread === 0 ? styles.disabled : ''}`}
                onClick={handleLeftPageClick}
                disabled={currentSpread === 0}
              >
                ‹ Önceki
              </button>
              <span className={styles.pageInfo}>
                Sayfa {leftPageNum}-{rightPageNum} / {freePageCount} ücretsiz
              </span>
              <button 
                className={`${styles.navButton} ${isNextSpreadLocked ? styles.locked : ''}`}
                onClick={handleRightPageClick}
              >
                {isNextSpreadLocked ? '🔒' : 'Sonraki ›'}
              </button>
            </div>

            {/* Açık kitap */}
            <div className={styles.openBook}>
              {/* Sol Sayfa */}
              <div 
                className={`${styles.leftPage} ${turnDirection === 'right' ? styles.turningRight : ''} ${currentSpread === 0 ? styles.firstPage : ''}`}
                onClick={handleLeftPageClick}
              >
                <div className={styles.pageContent}>
                  <div className={styles.pageHeader}>
                    <span className={styles.pageNumber}>Sayfa {leftPageNum}</span>
                    <span className={styles.pageTitle}>{book.title}</span>
                  </div>
                  <div className={styles.pageText}>
                    {getPageContent(leftPageNum)}
                  </div>
                  <div className={styles.pageFooter}>
                    {leftPageNum} / {book.pageCount}
                  </div>
                </div>
                {currentSpread > 0 && <div className={styles.pageCornerHint}>◂ tıkla</div>}
              </div>

              {/* Kitap Cildi */}
              <div className={styles.bookBinding}></div>

              {/* Sağ Sayfa */}
              <div 
                className={`${styles.rightPage} ${turnDirection === 'left' ? styles.turningLeft : ''} ${isRightPageLocked ? styles.lockedPage : ''}`}
                onClick={handleRightPageClick}
              >
                <div className={styles.pageContent}>
                  <div className={styles.pageHeader}>
                    <span className={styles.pageNumber}>Sayfa {rightPageNum}</span>
                    <span className={styles.pageTitle}>{book.title}</span>
                  </div>
                  <div className={styles.pageText}>
                    {getPageContent(rightPageNum)}
                  </div>
                  <div className={styles.pageFooter}>
                    {rightPageNum} / {book.pageCount}
                  </div>
                </div>
                {!isRightPageLocked && <div className={styles.pageCornerHint}>tıkla ▸</div>}
              </div>
            </div>

            {/* Ücretsiz önizleme bilgisi */}
            <div className={styles.previewInfo}>
              <span>📚 Ücretsiz önizleme: {freePageCount} sayfa ({Math.round((freePageCount / (book.pageCount || 200)) * 100)}%)</span>
            </div>
          </div>
        )}

        {/* Alt bilgi paneli */}
        <div className={styles.bookInfoPanel}>
          <div className={styles.bookInfoLeft}>
            <h2 className={styles.bookInfoTitle}>{book.title}</h2>
            <div className={styles.bookInfoMeta}>
              <span>✍️ {book.author || 'Süleyman Karakaş'}</span>
              <span>📅 {book.publishDate || '2024'}</span>
              <span>📄 {book.pageCount || 200} sayfa</span>
              <span>🏢 {book.publisher || 'Timaş Yayınları'}</span>
            </div>
          </div>
          
          <div className={styles.bookInfoRight}>
            <div className={styles.bookDimensions}>
              📐 {dimensions.thickness}mm kalınlık
            </div>
            <button 
              className={`${styles.buyButtonFloat} ${showBuyAnimation ? styles.buyAnimating : ''}`}
              onClick={() => window.open('#', '_blank')}
            >
              <span>🛒</span>
              <span>Satın Al - {book.price || '99,00 ₺'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
