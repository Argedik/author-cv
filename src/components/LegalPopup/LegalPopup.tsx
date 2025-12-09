"use client";

import { useEffect, useRef } from 'react';
import styles from './LegalPopup.module.scss';

interface LegalPopupProps {
  isOpen: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}

export default function LegalPopup({ isOpen, position, onClose }: LegalPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && position && popupRef.current) {
      // Popup'ı linkin üzerinde ortalamak için
      const updatePosition = () => {
        if (popupRef.current) {
          const popupWidth = popupRef.current.offsetWidth || 350;
          const adjustedLeft = position.left - popupWidth / 2;
          
          // Ekran sınırlarını kontrol et
          const maxLeft = window.innerWidth - popupWidth - 20;
          const minLeft = 20;
          const finalLeft = Math.max(minLeft, Math.min(adjustedLeft, maxLeft));
          
          // Popup'ı linkin üzerinde göster (yukarıda)
          popupRef.current.style.left = `${finalLeft}px`;
          popupRef.current.style.top = `${position.top}px`;
          popupRef.current.style.transform = 'translateY(-100%)';
        }
      };

      // İlk render için - popup render olduktan sonra
      const timer = setTimeout(() => {
        updatePosition();
      }, 0);

      // Scroll ve resize için
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, position]);

  if (!isOpen || !position) return null;

  return (
    <>
      {/* Overlay - sadece tıklama için */}
      <div className={styles.popupOverlay} onClick={onClose} />
      
      {/* Popup - tıklanan linkin üzerinde */}
      <div 
        ref={popupRef}
        className={styles.popup}
        style={{
          left: position.left,
          top: position.top,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Yön işareti - aşağı ok */}
        <div className={styles.popupArrow}></div>
        
        <div className={styles.popupContent}>
          <div className={styles.popupIcon}>🤔</div>
          <p className={styles.popupText}>Ekleyelim mi kaldıralım mı hocam</p>
          <button 
            className={styles.popupClose}
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}

