"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/types';
import { NAV_ITEMS } from '@/data/navigation';
import { BRAND_NAME } from '@/data/common';
import styles from './Header.module.scss';

export default function Header({ scrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo}>{BRAND_NAME}</Link>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            const isHashLink = item.href.startsWith('#');
            
            if (isHashLink) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Menü"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button
          className={styles.closeMenuButton}
          onClick={closeMenu}
          aria-label="Menüyü Kapat"
        >
          ✕
        </button>
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            const isHashLink = item.href.startsWith('#');
            
            if (isHashLink) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              );
            }
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </>
  );
}

