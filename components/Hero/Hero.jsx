'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useApp } from '@/lib/context/AppContext'
import styles from './Hero.module.css'

const HERO_CONTENT = {
  pt: {
    title: {
      line1: 'Irrigação Inteligente',
      line2: 'Para Todos',
    },
    subtitle: 'Solução completa e acessível para pequenos e médios agricultores',
    stats: [
      { value: 'Até 50%', label: 'Poupança de Água' },
      { value: '0€', label: 'Sem Substituição de Equipamentos' },
      { value: '100%', label: 'Energia Solar' },
    ],
    buttons: {
      primary: 'Conhecer a Solução',
      secondary: 'Agendar Demonstração',
    },
  },
  en: {
    title: {
      line1: 'Smart Irrigation',
      line2: 'For Everyone',
    },
    subtitle: 'A complete and affordable solution for small and medium-sized farmers',
    stats: [
      { value: 'Up to 50%', label: 'Water Savings' },
      { value: '€0', label: 'No Equipment Replacement Needed' },
      { value: '100%', label: 'Solar Powered' },
    ],
    buttons: {
      primary: 'Learn More',
      secondary: 'Book a Demo',
    },
  },
}

const IMPACT_PHRASES = {
  pt: [
    'Compatível com o seu equipamento atual — sem custos de substituição',
    'Solução completa: hardware, software e energia solar integrados',
    'Monitorize e controle a sua irrigação remotamente, a partir de qualquer lugar',
    'Reduza custos e aumente a sustentabilidade da sua produção',
    'Tecnologia acessível para democratizar a irrigação inteligente',
    'Implementação rápida em qualquer terreno, mesmo em zonas remotas',
  ],
  en: [
    'Compatible with your existing equipment — no replacement costs',
    'Complete solution: integrated hardware, software, and solar power',
    'Monitor and control your irrigation remotely from anywhere',
    'Reduce costs and increase the sustainability of your production',
    'Accessible technology to democratize smart irrigation',
    'Quick implementation on any terrain, even in remote areas',
  ],
}

// Dados para a flor (1 centro + 6 pétalas)
const HEXAGON_IMAGES = [
  {
    id: 1,
    image: 'images/central.webp',
    alt: 'Sistema AgroFlow - Controlador Principal',
    position: 'center',
    icon: '💧',
  },
  {
    id: 2,
    image: 'https://amperi.com.br/wp-content/uploads/2024/08/celula-fotovoltaica.webp',
    alt: 'Placas Solares para Energia Sustentável',
    position: 'top',
    icon: '',
  },
  {
    id: 3,
    image: '/images/Aqua.png',
    alt: 'Agricultura de Precisão',
    position: 'top-right',
    icon: '',
  },
  {
    id: 4,
    image: '/images/Caput.png',
    alt: 'Sensor de Umidade do Solo',
    position: 'bottom-right',
    icon: '',
  },
  {
    id: 5,
    image: '/images/Solum.png',
    alt: 'Sistema de Irrigação Inteligente',
    position: 'bottom',
    icon: '',
  },
  {
    id: 6,
    image: '/images/portal-solo.jpg',
    alt: 'Gestão de Água Eficiente',
    position: 'bottom-left',
    icon: '',
  },
  {
    id: 7,
    image: '/images/Solum.png',
    alt: 'Interface do Sistema AgroFlow',
    position: 'top-left',
    icon: '',
  },
]

// posição das pétalas em formato de flor
const calculateFlowerPosition = (position, petalSize, isMobile) => {
  const radius = isMobile ? petalSize * 1.4 : petalSize * 1.9

  const positions = {
    center: { x: -65, y: -65 },
    top: { x: 0, y: -radius },
    'top-right': {
      x: radius * Math.cos(Math.PI / 6),
      y: -radius * Math.sin(Math.PI / 6),
    },
    'bottom-right': {
      x: radius * Math.cos(Math.PI / 6),
      y: radius * Math.sin(Math.PI / 6),
    },
    bottom: { x: 0, y: radius },
    'bottom-left': {
      x: -radius * Math.cos(Math.PI / 6),
      y: radius * Math.sin(Math.PI / 6),
    },
    'top-left': {
      x: -radius * Math.cos(Math.PI / 6),
      y: -radius * Math.sin(Math.PI / 6),
    },
  }

  return positions[position] || { x: 0, y: 0 }
}

// tamanhos da flor
const PETAL_SIZE_DESKTOP = 110
const PETAL_SIZE_MOBILE = 70
const CENTER_SIZE_DESKTOP = 180
const CENTER_SIZE_MOBILE = 120

export default function Hero() {
  const { language } = useApp()
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const content = HERO_CONTENT[language]
  const phrases = IMPACT_PHRASES[language]

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Rotação de frases
  useEffect(() => {
    setCurrentPhrase(0)
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [phrases])

  const scrollToNext = () => {
    const nextSection = document.getElementById('problema')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Tamanhos responsivos
  const petalSize = isMobile ? PETAL_SIZE_MOBILE : PETAL_SIZE_DESKTOP
  const centerSize = isMobile ? CENTER_SIZE_MOBILE : CENTER_SIZE_DESKTOP
  const honeycombSize = isMobile ? 320 : 540

  return (
    <section id="hero" className={styles.hero}>
      {/* Background com gradiente suave */}
      <div className={styles.backgroundGradient} />

      {/* Elementos decorativos sutis */}
      <div className={styles.decorativeElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Texto Principal */}
          <div className={styles.textContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.titleSection}
            >
              <h1 className={styles.mainTitle}>
                <span className={styles.titleLine1}>{content.title.line1}</span>
                <span className={styles.titleLine2}>{content.title.line2}</span>
              </h1>
              <p className={styles.subtitle}>{content.subtitle}</p>
            </motion.div>

            {/* Frase Dinâmica */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.phraseSection}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className={styles.dynamicPhrase}
                >
                  {phrases[currentPhrase]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={styles.statsSection}
            >
              <div className={styles.statsGrid}>
                {content.stats.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Botões de Ação */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={styles.buttonsSection}
            >
              <div className={styles.buttonsGrid}>
                <Link href="#solucao" className={styles.primaryButton}>
                  {content.buttons.primary}
                </Link>
                <Link href="#contato" className={styles.secondaryButton}>
                  {content.buttons.secondary}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Flor de círculos (colmeia) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={styles.visualSection}
          >
            <div
              className={styles.honeycomb}
              style={{
                width: `${honeycombSize}px`,
                height: `${honeycombSize}px`,
              }}
            >
              {HEXAGON_IMAGES.map((hexagon, index) => {
                const isCenter = hexagon.position === 'center'
                const size = isCenter ? centerSize : petalSize
                const position = calculateFlowerPosition(
                  hexagon.position,
                  petalSize,
                  isMobile
                )
                const centerOffset = isMobile ? petalSize * 1.5 : petalSize * 2

                return (
                  <motion.div
                    key={hexagon.id}
                    className={styles.hexagonContainer}
                    style={{
                      position: 'absolute',
                      left: `${position.x + centerOffset}px`,
                      top: `${position.y + centerOffset}px`,
                      transformOrigin: 'center center',
                      zIndex: isCenter ? 5 : 2,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={!isMobile ? {
                      scale: 1.15,
                      zIndex: 10,
                      transition: { duration: 0.3 },
                    } : {}}
                  >
                    <div
                      className={`${styles.hexagon} ${isCenter ? styles.centerHexagon : styles.petalHexagon
                        }`}
                      style={{
                        backgroundImage: `url(${hexagon.image})`,
                        width: `${size * 2}px`,
                        height: `${size * 2}px`,
                      }}
                      aria-label={hexagon.alt}
                    >
                      <div className={styles.hexagonOverlay} />

                      {/* Ícone / gotas flutuantes */}
                      {isCenter ? (
                        <motion.div
                          className={styles.floatingDrops}
                          animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <span className={`${styles.drop} ${styles.dropSmall}`}>
                            💧
                          </span>
                          <span className={`${styles.drop} ${styles.dropSmall}`}>
                            💧
                          </span>
                          <span className={`${styles.drop} ${styles.dropLarge}`}>
                            💧
                          </span>
                        </motion.div>
                      ) : (
                        hexagon.icon && (
                          <motion.div
                            className={styles.floatingIcon}
                            animate={{
                              y: [0, -6, 0],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.2,
                            }}
                          >
                            {hexagon.icon}
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )
              })}

              {/* Efeito de brilho geral */}
              <div className={styles.honeycombGlow} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}