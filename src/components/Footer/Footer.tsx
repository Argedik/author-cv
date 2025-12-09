"use client";

import { useState, useEffect, useRef } from 'react';
import { FooterProps } from '@/types';
import LegalPopup from '@/components/LegalPopup/LegalPopup';
import styles from './Footer.module.scss';

export default function Footer({ data }: FooterProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const privacyLinkRef = useRef<HTMLAnchorElement>(null);
  const termsLinkRef = useRef<HTMLAnchorElement>(null);

  const handleLegalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkRef: React.RefObject<HTMLAnchorElement | null>) => {
    e.preventDefault();
    
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.top - 10, // Linkin üstünde 10px yukarıda
        left: rect.left + rect.width / 2, // Linkin ortası
      });
      setShowPopup(true);
    }
  };

  // 3 saniye sonra otomatik kapat
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        setPopupPosition(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <footer className={styles.footer}>
      {/* Dekoratif üst kenar */}
      <div className={styles.topBorder}>
        <div className={styles.borderPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Üst kısım - Ana içerik */}
        <div className={styles.mainContent}>
          {/* Brand bölümü */}
          <div className={styles.brandSection}>
            <h3 className={styles.brandName}>{data.brand.name}</h3>
            <div className={styles.brandUnderline}></div>
            <p className={styles.brandDescription}>{data.brand.description}</p>
            
            {/* Sosyal medya */}
            <div className={styles.socialLinks}>
              {data.social.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={styles.socialLink}
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigasyon linkleri */}
          <div className={styles.navSections}>
            {data.navigation.map((section, index) => (
              <div key={index} className={styles.navSection}>
                <h4 className={styles.navTitle}>{section.title}</h4>
                <ul className={styles.navList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className={styles.navLink}>
                        <span className={styles.linkArrow}>›</span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* İletişim bölümü */}
          <div className={styles.contactSection}>
            <h4 className={styles.contactTitle}>İletişim</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉</span>
                <a href={`mailto:${data.contact.email}`} className={styles.contactLink}>
                  {data.contact.email}
                </a>
              </div>
              {data.contact.address && (
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span className={styles.contactText}>{data.contact.address}</span>
                </div>
              )}
            </div>

            {/* Dekoratif imza */}
            <div className={styles.signature}>
              <span className={styles.quill}>✒</span>
              <span className={styles.year}>MMXXIV</span>
            </div>
          </div>
        </div>

        {/* Dekoratif ayırıcı */}
        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <div className={styles.dividerOrnament}>❦</div>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Alt kısım - Copyright */}
        <div className={styles.bottomContent}>
          <p className={styles.copyright}>{data.copyright}</p>
          <div className={styles.legalLinks}>
            <a 
              ref={privacyLinkRef}
              href="#" 
              className={styles.legalLink}
              onClick={(e) => handleLegalLinkClick(e, privacyLinkRef)}
            >
              Gizlilik Politikası
            </a>
            <span className={styles.legalDivider}>|</span>
            <a 
              ref={termsLinkRef}
              href="#" 
              className={styles.legalLink}
              onClick={(e) => handleLegalLinkClick(e, termsLinkRef)}
            >
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>

      {/* Dekoratif alt kenar - Kitap sayfası hissi */}
      <div className={styles.bottomDecoration}>
        <div className={styles.pageEdge}></div>
      </div>

      {/* Popup */}
      <LegalPopup 
        isOpen={showPopup} 
        position={popupPosition}
        onClose={() => {
          setShowPopup(false);
          setPopupPosition(null);
        }} 
      />
    </footer>
  );
}

