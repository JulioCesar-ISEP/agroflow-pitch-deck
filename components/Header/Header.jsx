// components/Header/Header.jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import FlagIcon from '@/components/ui/FlagIcon'
import { useApp } from '@/lib/context/AppContext'
import styles from './Header.module.css'

const HEADER_CONTENT = {
  pt: {
    navItems: [
      { label: 'O Problema', href: '#problema' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'A Solução', href: '#solucao' },
      { label: 'A Nossa Equipa', href: '#time' },
      { label: 'Contacto', href: '#contato' },
    ],
    theme: 'Alternar tema',
    language: 'Mudar para Inglês',
  },
  en: {
    navItems: [
      { label: 'The Problem', href: '#problema' },
      { label: 'About Us', href: '#sobre' },
      { label: 'The Solution', href: '#solucao' },
      { label: 'Our Team', href: '#time' },
      { label: 'Contact', href: '#contato' },
    ],
    theme: 'Toggle theme',
    language: 'Switch to Portuguese',
  },
}

export default function Header() {
  const { language, isDark, toggleTheme, toggleLanguage } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const content = HEADER_CONTENT[language]

  return (
    <motion.header
      className={`
        ${styles.header} 
        ${scrolled ? styles.scrolled : ''} 
        ${isDark ? styles.dark : styles.light}
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* camada de fundo/gradiente para o header */}
      <div className={styles.headerBackground} />

      <div className={styles.container}>
        {/* Logo */}
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="#hero" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <Image
                src="/images/logo.webp"
                alt="AgroFlow"
                width={48}
                height={48}
                className={styles.logoImage}
                priority
              />
              <div className={styles.logoText}>
                <span className={styles.logoMain}>AgroFlow</span>
                <span className={styles.logoSub}>Smart Irrigation</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Navegação Desktop */}
        <nav className={styles.desktopNav}>
          {content.navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Ações */}
        <div className={styles.actions}>
          {/* Botão Idioma */}
          <motion.button
            onClick={toggleLanguage}
            className={styles.langBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={content.language}
          >
            <FlagIcon language={language} size={16} />
            <span className={styles.langText}>
              {language === 'pt' ? 'PT' : 'EN'}
            </span>
          </motion.button>

          {/* Botão Tema */}
          <motion.button
            onClick={toggleTheme}
            className={styles.themeBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={content.theme}
          >
            {isDark ? (
              <span className={styles.themeIcon}>☀️</span>
            ) : (
              <span className={styles.themeIcon}>🌙</span>
            )}
          </motion.button>

          {/* Menu Mobile */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={styles.mobileBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <span className={styles.mobileIcon}>
              {mobileOpen ? '✕' : '☰'}
            </span>
          </motion.button>
        </div>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {content.navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
