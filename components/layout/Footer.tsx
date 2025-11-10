'use client'

import { Box, Container, Typography, Link, Grid, Divider, Stack, IconButton } from '@mui/material'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Image from 'next/image'

const FOOTER_CONTENT = {
  pt: {
    tagline: "Regue com Precisão: Tecnologia ao Serviço da Água e da Sustentabilidade",
    linksTitle: "Navegação",
    about: "Sobre Nós",
    solution: "A Solução", 
    team: "A Nossa Equipa",
    contact: "Contacto",
    contactTitle: "Contacto",
    email: "contacto@agroflow.pt",
    location: "Porto, Portugal",
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço"
  },
  en: {
    tagline: "Irrigate with Precision: Technology at the Service of Water and Sustainability",
    linksTitle: "Navigation", 
    about: "About Us",
    solution: "The Solution",
    team: "Our Team",
    contact: "Contact",
    contactTitle: "Contact",
    email: "contact@agroflow.pt",
    location: "Porto, Portugal",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service"
  }
}

export default function Footer() {
  const { language } = useLanguage()
  const content = FOOTER_CONTENT[language]

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#042009ff', 
        color: '#ffffff', // Texto branco
        pt: 6,
        pb: 3,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Image 
                    src="/images/agroflow-no-bg.webp" 
                    alt="AgroFlow" 
                    width={150} // Ajuste conforme necessário
                    height={150} // Ajuste conforme necessário
                    priority
                  />
                </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#ffffff', // Texto branco
                  lineHeight: 1.6,
                  maxWidth: 300,
                  opacity: 0.9,
                }}
              >
                {content.tagline}
              </Typography>
            </Box>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '1px solid #ffffff',
                  '&:hover': {
                    color: '#000000',
                    backgroundColor: '#ffffff',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => window.open('https://linkedin.com/company/agroflow', '_blank')}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '1px solid #ffffff',
                  '&:hover': {
                    color: '#000000',
                    backgroundColor: '#ffffff',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => window.location.href = `mailto:${content.email}`}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                color: '#ffffff', // Texto branco
                mb: 2,
              }}
            >
              {content.linksTitle}
            </Typography>
            <Stack spacing={1}>
              <Link 
                href="#sobre"
                onClick={() => scrollToSection('sobre')}
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.about}
              </Link>
              <Link 
                href="#solucao"
                onClick={() => scrollToSection('solucao')}
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.solution}
              </Link>
              <Link 
                href="#time"
                onClick={() => scrollToSection('time')}
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.team}
              </Link>
              <Link 
                href="#contato"
                onClick={() => scrollToSection('contato')}
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.contact}
              </Link>
            </Stack>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                color: '#ffffff', // Texto branco
                mb: 2,
              }}
            >
              {content.contactTitle}
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ fontSize: '1.2rem', color: '#ffffff', opacity: 0.9 }} />
                <Link 
                  href={`mailto:${content.email}`}
                  sx={{ 
                    color: '#ffffff', // Texto branco
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: '#ffffff',
                    },
                  }}
                >
                  {content.email}
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOnIcon sx={{ fontSize: '1.2rem', color: '#ffffff', opacity: 0.9 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#ffffff', // Texto branco
                    fontSize: '0.9rem',
                    opacity: 0.9,
                  }}
                >
                  {content.location}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                color: '#ffffff', // Texto branco
                mb: 2,
              }}
            >
              {language === 'pt' ? 'Legal' : 'Legal'}
            </Typography>
            <Stack spacing={1}>
              <Link 
                href="#"
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.privacy}
              </Link>
              <Link 
                href="#"
                sx={{ 
                  color: '#ffffff', // Texto branco
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: '#ffffff',
                  },
                }}
              >
                {content.terms}
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#ffffff', opacity: 0.3 }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#ffffff', // Texto branco
              fontSize: '0.8rem',
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} AgroFlow. {content.rights}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}