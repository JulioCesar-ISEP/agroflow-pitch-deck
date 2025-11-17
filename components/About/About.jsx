// components/About/About.jsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import styles from './About.module.css'

const ABOUT_CONTENT = {
  pt: {
    title: "Sobre Nós",
    subtitle: "Democratizar a rega inteligente para todos os agricultores",
    missionTitle: "Missão",
    visionTitle: "Visão",
    mission: "Tornar a rega inteligente acessível a pequenos e médios agricultores através de tecnologia compatível, sustentável e de fácil implementação.",
    vision: "Ser a referência em soluções de rega inteligente que empoderam agricultores de todos os tamanhos, promovendo a sustentabilidade e a eficiência hídrica.",
    description: "Combinamos tecnologia IoT, energia solar e compatibilidade com equipamentos existentes para criar soluções que resolvem problemas reais do campo de forma acessível.",
    valuesTitle: "Os Nossos Valores",
    accessibility: "Acessibilidade",
    compatibility: "Compatibilidade",
    sustainability: "Sustentabilidade",
    innovation: "Inovação",
    teamTitle: "Especialização com Foco no Agricultor",
    teamSubtitle: "Equipa com experiência prática em:",
    agronomy: "Agricultura Familiar & Pequena Produção",
    technology: "Tecnologia Acessível & IoT",
    sustainabilityField: "Soluções Sustentáveis & Energia Solar",
    odsTitle: "Compromisso com os ODS",
    odsSubtitle: "Trabalhamos diretamente com os Objetivos de Desenvolvimento Sustentável da ONU",
    ods2: {
      title: "ODS 2 – Fome Zero",
      description: "Agricultura sustentável para erradicar a fome e garantir a segurança alimentar.",
      goal: "Aumentar a produtividade agrícola de forma sustentável"
    },
    ods12: {
      title: "ODS 12 – Consumo Responsável",
      description: "Assegurar padrões sustentáveis de produção e consumo.",
      goal: "Reduzir o desperdício de água e de recursos naturais"
    },
    ods13: {
      title: "ODS 13 – Ação Climática",
      description: "Combater as alterações climáticas e os seus impactos.",
      goal: "Mitigar emissões através da agricultura inteligente"
    },
    cta: "Conheça a Nossa Solução",
    learnMore: "Saiba Mais"
  },
  en: {
    title: "About Us",
    subtitle: "Democratizing smart irrigation for all farmers",
    missionTitle: "Mission",
    visionTitle: "Vision",
    mission: "Make smart irrigation accessible for small and medium farmers through compatible, sustainable and easy-to-implement technology.",
    vision: "To become the reference in smart irrigation solutions that empower farmers of all sizes, promoting sustainability and water efficiency.",
    description: "We combine IoT technology, solar power and compatibility with existing equipment to create solutions that solve real field problems affordably.",
    valuesTitle: "Our Values",
    accessibility: "Accessibility",
    compatibility: "Compatibility",
    sustainability: "Sustainability",
    innovation: "Innovation",
    teamTitle: "Farmer-Focused Expertise",
    teamSubtitle: "Our team brings practical experience in:",
    agronomy: "Family Farming & Small Production",
    technology: "Accessible Technology & IoT",
    sustainabilityField: "Sustainable Solutions & Solar Energy",
    odsTitle: "Commitment to the SDGs",
    odsSubtitle: "We actively support the UN Sustainable Development Goals",
    ods2: {
      title: "SDG 2 – Zero Hunger",
      description: "Sustainable agriculture to end hunger and ensure food security.",
      goal: "Boost agricultural productivity sustainably"
    },
    ods12: {
      title: "SDG 12 – Responsible Consumption",
      description: "Ensure sustainable production and consumption patterns.",
      goal: "Reduce water waste and natural resource usage"
    },
    ods13: {
      title: "SDG 13 – Climate Action",
      description: "Combat climate change and its impacts.",
      goal: "Mitigate emissions through smart agriculture"
    },
    cta: "Explore Our Solution",
    learnMore: "Learn More"
  }
}

export default function About() {
  const { language, isDark } = useApp()
  const content = ABOUT_CONTENT[language]

  const scrollToNext = () => {
    const nextSection = document.getElementById('solucao')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="sobre"
      className={`${styles.about} ${isDark ? styles.dark : styles.light}`}
    >
      {/* Fundo em camadas: gradiente + padrões suaves */}
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </motion.div>

        {/* Main Content: Logo + Mission/Vision */}
        <div className={styles.mainGrid}>
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.logoSection}
          >
            <div className={styles.logoContainer}>
              <Image
                src={isDark ? "/images/agroflow-no-bg.webp" : "/images/logo1.webp"}
                alt="AgroFlow"
                width={380}
                height={380}
                className={styles.logoImage}
                priority
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={styles.contentBlock}
            >
              <h3 className={styles.contentTitle}>{content.missionTitle}</h3>
              <p className={styles.contentText}>{content.mission}</p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className={styles.contentBlock}
            >
              <h3 className={styles.contentTitle}>{content.visionTitle}</h3>
              <p className={styles.contentText}>{content.vision}</p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.descriptionCard}>
                <p className={styles.descriptionText}>
                  "{content.description}"
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.valuesSection}
        >
          <h2 className={styles.valuesTitle}>{content.valuesTitle}</h2>
          <div className={styles.valuesGrid}>
            <span className={`${styles.valueChip} ${styles.sustainability}`}>
              {content.sustainability}
            </span>
            <span className={`${styles.valueChip} ${styles.innovation}`}>
              {content.innovation}
            </span>
            <span className={`${styles.valueChip} ${styles.impact}`}>
              {content.compatibility}
            </span>
          </div>
        </motion.div>

        <div className={styles.divider}></div>

        {/* ODS Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.odsSection}
        >
          <h2 className={styles.odsTitle}>{content.odsTitle}</h2>
          <p className={styles.odsSubtitle}></p>

          <div className={styles.odsGrid}>
            {[content.ods2, content.ods12, content.ods13].map((ods, index) => {
              const odsNumber = index === 0 ? '2' : index === 1 ? '12' : '13';
              const imageSuffix = isDark ? '' : '-black';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.odsCard}
                >
                  <div
                    className={styles.odsIcon}
                    style={{
                      backgroundImage: `url(/images/ods${odsNumber}${imageSuffix}.webp)`
                    }}
                  ></div>
                  <h3 className={styles.odsCardTitle}>{ods.title}</h3>
                  <p className={styles.odsCardDescription}>{ods.goal}</p>
                  
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className={styles.divider}></div>

        {/* Team Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.teamSection}
        >
          <h3 className={styles.teamTitle}>{content.teamTitle}</h3>
          <p className={styles.teamSubtitle}></p>
          <div className={styles.expertiseGrid}>
            <span className={styles.expertiseChip}>{content.agronomy}</span>
            <span className={styles.expertiseChip}>{content.technology}</span>
            <span className={styles.expertiseChip}>{content.sustainabilityField}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
