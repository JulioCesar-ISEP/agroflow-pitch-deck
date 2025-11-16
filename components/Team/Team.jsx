'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import styles from './Team.module.css'

const TEAM_CONTENT = {
  pt: {
    title: 'A Nossa Equipa',
    subtitle: 'Especialistas em tecnologia para uma agricultura sustentável',
    leonardo: {
      name: 'Leonardo Antunes',
      role: 'Programação Industrial & Python',
    },
    julio: {
      name: 'Júlio César',
      role: 'Desenvolvimento de Software',
    },
    daniel: {
      name: 'Daniel Pires',
      role: 'BI & Analytics',
    },
    henrique: {
      name: 'Henrique Ernesto',
      role: 'Infraestrutura & Hardware',
    },
    description:
      'Equipa multidisciplinar especializada em programação industrial, desenvolvimento web, análise de dados e infraestrutura para soluções completas de agricultura inteligente.',
    linkedin: 'Ver LinkedIn',
  },
  en: {
    title: 'Our Team',
    subtitle: 'Technology experts for sustainable agriculture',
    leonardo: {
      name: 'Leonardo Antunes',
      role: 'Industrial Programming & Python',
    },
    julio: {
      name: 'Júlio César',
      role: 'Software Development',
    },
    daniel: {
      name: 'Daniel Pires',
      role: 'BI & Analytics',
    },
    henrique: {
      name: 'Henrique Ernesto',
      role: 'Infrastructure & Hardware',
    },
    description:
      'Multidisciplinary team specialized in industrial programming, web development, data analysis and infrastructure for complete smart agriculture solutions.',
    linkedin: 'View LinkedIn',
  },
}

// Links do LinkedIn
const LINKEDIN_LINKS = {
  leonardo: 'https://linkedin.com/in/leonardo-antunes',
  julio: 'https://www.linkedin.com/in/j%C3%BAlio-c%C3%A9sar-70a533262/',
  daniel: 'https://www.linkedin.com/in/daniel-pires-b6b03a258',
  henrique: 'https://linkedin.com/in/henrique-ernesto',
}

export default function Team() {
  const { language, isDark } = useApp()
  const content = TEAM_CONTENT[language]

  // Definir cores baseadas no tema
  const roleColor = isDark ? '#86efa2ff' : '#1d6530ff'

  const teamMembers = [
    {
      id: 'leonardo',
      name: content.leonardo.name,
      role: content.leonardo.role,
      color: roleColor,
      image: '/images/leonardo.jpg',
    },
    {
      id: 'julio',
      name: content.julio.name,
      role: content.julio.role,
      color: roleColor,
      image: '/images/julio.jpg',
    },
    {
      id: 'daniel',
      name: content.daniel.name,
      role: content.daniel.role,
      color: roleColor,
      image: '/images/daniel.jpg',
    },
    {
      id: 'henrique',
      name: content.henrique.name,
      role: content.henrique.role,
      color: roleColor,
      image: '/images/henrique.jpg',
    },
  ]

  const handleLinkedInClick = (memberId) => {
    const linkedinUrl = LINKEDIN_LINKS[memberId]
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById('contato')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="time"
      className={`${styles.team} ${isDark ? styles.dark : styles.light}`}
    >
      {/* Fundo com gradiente suave (igual ao About/Solution) */}
      <div className={styles.backgroundGradient} />

      {/* Padrão suave por cima do gradiente */}
      <div className={styles.backgroundPattern} />

      <div className={styles.container}>
        {/* Header em cartão translúcido (coerente com About/Solution) */}
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

        {/* Team Grid - Layout Minimalista */}
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={member.id} className={styles.teamMember}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.memberContent}>
                  {/* Avatar Grande com Hover */}
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatarWrapper}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={180}
                        height={180}
                        className={styles.memberAvatar}
                      />

                      {/* Overlay do LinkedIn */}
                      <div
                        className={styles.linkedinOverlay}
                        onClick={() => handleLinkedInClick(member.id)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <button className={styles.linkedinButton}>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Nome e Cargo */}
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p
                    className={styles.memberRole}
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Descrição da Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={styles.teamDescription}
        >

        </motion.div>
      </div>
    </section>
  )
}