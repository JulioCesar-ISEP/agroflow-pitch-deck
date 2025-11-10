'use client'

import { Box, Container, Typography, Grid, Avatar, alpha, IconButton, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const TEAM_CONTENT = {
  pt: {
    title: "A Nossa Equipa",
    subtitle: "Especialistas em tecnologia para uma agricultura sustentável",
    leonardo: {
      name: "Leonardo Antunes",
      role: "Programação Industrial & Python"
    },
    julio: {
      name: "Júlio César",
      role: "Desenvolvimento de Software"
    },
    daniel: {
      name: "Daniel Pires",
      role: "BI & Analytics"
    },
    henrique: {
      name: "Henrique Ernesto",
      role: "Infraestrutura & Hardware"
    },
    description: "Equipa multidisciplinar especializada em programação industrial, desenvolvimento web, análise de dados e infraestrutura para soluções completas de agricultura inteligente.",
    linkedin: "Ver LinkedIn"
  },
  en: {
    title: "Our Team",
    subtitle: "Technology experts for sustainable agriculture",
    leonardo: {
      name: "Leonardo Antunes",
      role: "Industrial Programming & Python"
    },
    julio: {
      name: "Júlio César",
      role: "Software Development"
    },
    daniel: {
      name: "Daniel Pires",
      role: "BI & Analytics"
    },
    henrique: {
      name: "Henrique Ernesto",
      role: "Infrastructure & Hardware"
    },
    description: "Multidisciplinary team specialized in industrial programming, web development, data analysis and infrastructure for complete smart agriculture solutions.",
    linkedin: "View LinkedIn"
  }
}

// Links do LinkedIn
const LINKEDIN_LINKS = {
  leonardo: "https://linkedin.com/in/leonardo-antunes",
  julio: "https://www.linkedin.com/in/j%C3%BAlio-c%C3%A9sar-70a533262/", 
  daniel: "https://www.linkedin.com/in/daniel-pires-b6b03a258",
  henrique: "https://linkedin.com/in/henrique-ernesto"
}

export default function TeamSection() {
  const { language } = useLanguage()
  const theme = useTheme()
  const content = TEAM_CONTENT[language]
  const isDark = theme.palette.mode === 'dark'

  const teamMembers = [
    {
      id: 'leonardo',
      name: content.leonardo.name,
      role: content.leonardo.role,
      color: '#41B360',
      image: '/images/leonardo.jpg'
    },
    {
      id: 'julio',
      name: content.julio.name,
      role: content.julio.role,
      color: '#1EC5FA',
      image: '/images/julio.jpg'
    },
    {
      id: 'daniel',
      name: content.daniel.name,
      role: content.daniel.role,
      color: '#78d2eeff',
      image: '/images/daniel.jpg'
    },
    {
      id: 'henrique',
      name: content.henrique.name,
      role: content.henrique.role,
      color: '#27b52eff',
      image: '/images/henrique.jpg'
    }
  ]

  const handleLinkedInClick = (memberId: string) => {
    const linkedinUrl = LINKEDIN_LINKS[memberId as keyof typeof LINKEDIN_LINKS]
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
    <Box 
      id="time"
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 50%, ${theme.palette.background.default} 100%)`
          : 'linear-gradient(135deg, #0A2E1D 0%, #1A4D34 50%, #0A2E1D 100%)',
        color: isDark ? theme.palette.text.primary : '#ffffff',
        py: 8,
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? `
                radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)
              `
            : `
                radial-gradient(circle at 20% 30%, ${alpha('#41B360', 0.05)} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${alpha('#1EC5FA', 0.05)} 0%, transparent 50%)
              `,
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: isDark ? theme.palette.primary.main : '#ffffff',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                letterSpacing: '-0.5px',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.3rem',
                fontWeight: 400,
                lineHeight: 1.6,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Team Grid - Layout Minimalista */}
        <Grid container spacing={6} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  {/* Avatar Grande com Hover */}
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      mb: 3,
                      '&:hover .linkedin-overlay': {
                        opacity: 1,
                      },
                      '&:hover .member-avatar': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 0 0 4px ${alpha(member.color, 0.3)}`,
                      }
                    }}
                  >
                    <Avatar
                      className="member-avatar"
                      src={member.image}
                      sx={{
                        width: 180,
                        height: 180,
                        mx: 'auto',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 8px 32px ${alpha('#000000', isDark ? 0.4 : 0.2)}`,
                        border: `3px solid ${alpha(isDark ? theme.palette.primary.main : '#ffffff', 0.1)}`,
                        objectFit: 'cover',
                      }}
                    />

                    {/* Overlay do LinkedIn */}
                    <Box
                      className="linkedin-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        background: alpha('#000000', 0.6),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleLinkedInClick(member.id)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          sx={{
                            color: '#ffffff',
                            backgroundColor: alpha('#0077B5', 0.9),
                            '&:hover': {
                              backgroundColor: '#0077B5',
                            },
                            boxShadow: '0 4px 20px rgba(0, 119, 181, 0.4)',
                            transition: 'all 0.3s ease',
                          }}
                          size="large"
                        >
                          <LinkedInIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </Box>

                  {/* Nome e Cargo */}
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: isDark ? theme.palette.text.primary : '#ffffff',
                      fontSize: '1.5rem',
                      mb: 1,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {member.name}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{
                      color: member.color,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      opacity: 0.9,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {member.role}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Descrição da Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
                fontWeight: 400,
                lineHeight: 1.7,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.description}
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
        }}
      >
        <IconButton
          onClick={scrollToNext}
          sx={{
            color: isDark ? theme.palette.secondary.light : '#90E4FE',
            border: `2.5px solid ${alpha(isDark ? theme.palette.secondary.light : '#90E4FE', 0.5)}`,
            width: 48,
            height: 48,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha(isDark ? theme.palette.secondary.light : '#90E4FE', 0.12),
              color: isDark ? theme.palette.secondary.main : '#1EC5FA',
              borderColor: isDark ? theme.palette.secondary.main : '#1EC5FA',
              transform: 'translateY(6px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </motion.div>
    </Box>
  )
}