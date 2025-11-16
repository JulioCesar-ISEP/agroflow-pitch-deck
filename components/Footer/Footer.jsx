// components/Footer/Footer.jsx
'use client'

import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import styles from './Footer.module.css'

const FOOTER_CONTENT = {
  pt: {
    tagline:
      'Regue com Precisão: Tecnologia ao Serviço da Água e da Sustentabilidade',
    linksTitle: 'Navegação',
    about: 'Sobre Nós',
    solution: 'A Solução',
    team: 'A Nossa Equipa',
    contact: 'Contacto',
    contactTitle: 'Contacto',
    email: 'contacto@agroflow.pt',
    location: 'Porto, Portugal',
    rights: 'Todos os direitos reservados.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    legal: 'Legal',
  },
  en: {
    tagline:
      'Irrigate with Precision: Technology at the Service of Water and Sustainability',
    linksTitle: 'Navigation',
    about: 'About Us',
    solution: 'The Solution',
    team: 'Our Team',
    contact: 'Contact',
    contactTitle: 'Contact',
    email: 'contact@agroflow.pt',
    location: 'Porto, Portugal',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    legal: 'Legal',
  },
}

export default function Footer() {
  const { language, isDark } = useApp()
  const content = FOOTER_CONTENT[language]

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigationLinks = [
    {
      href: '#sobre',
      label: content.about,
      onClick: () => scrollToSection('sobre'),
    },
    {
      href: '#solucao',
      label: content.solution,
      onClick: () => scrollToSection('solucao'),
    },
    {
      href: '#time',
      label: content.team,
      onClick: () => scrollToSection('time'),
    },
    {
      href: '#contato',
      label: content.contact,
      onClick: () => scrollToSection('contato'),
    },
  ]

  const legalLinks = [
    { href: '#', label: content.privacy },
    { href: '#', label: content.terms },
  ]

  return (
    <footer
      className={`${styles.footer} ${isDark ? styles.dark : styles.light
        }`}
    >
      {/* Fundo com gradiente suave + padrão, alinhado ao resto do site */}
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <Image
                src="/images/agroflow-no-bg.webp"
                alt="AgroFlow"
                width={150}
                height={150}
                priority
              />
            </div>
            
          </div>

          {/* Navigation Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>
              {content.linksTitle}
            </h3>
            <nav className={styles.linksList}>
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={link.onClick}
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>
              {content.contactTitle}
            </h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉</span>
                <a
                  href={`mailto:${content.email}`}
                  className={styles.contactLink}
                >
                  {content.email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.contactText}>
                  {content.location}
                </span>
              </div>
              {/* Social Links */}
              <div className={styles.socialLinks}>
                <button
                  className={styles.socialButton}
                  onClick={() =>
                    window.open(
                      'https://linkedin.com/company/agroflow',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  aria-label="LinkedIn"
                  type="button"
                >
                  <span className={styles.socialIcon}>in</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className={styles.legalSection}>
            <h3 className={styles.sectionTitle}>
              {content.legal}
            </h3>
            <nav className={styles.linksList}>
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={styles.link}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} AgroFlow. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
