'use client'

import { Box, Container, Typography, Button, alpha, Stack, IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useLanguage } from '@/lib/contexts/LanguageContext'

const HERO_CONTENT = {
  pt: {
    title: {
      line1: "Revolucione",
      line2: "a Sua Rega"
    },
    stats: [
      { value: '35%', label: 'Menos Desperdício' },
      { value: '50%', label: 'Poupança de Água' },
      { value: '10km', label: 'Alcance de Comunicação' }
    ],
    buttons: {
      primary: "Saiba mais",
      secondary: "Agendar Demonstração"
    }
  },
  en: {
    title: {
      line1: "Revolutionize",
      line2: "Your Irrigation"
    },
    stats: [
      { value: '35%', label: 'Less Water Waste' },
      { value: '50%', label: 'Water Savings' },
      { value: '10km', label: 'Communication Range' }
    ],
    buttons: {
      primary: "Learn more",
      secondary: "Book a Demo"
    }
  }
}

const IMPACT_PHRASES = {
  pt: [
    "Reduza até 35% do desperdício de água na sua exploração agrícola",
    "Tecnologia IoT que poupa água e aumenta a produtividade",
    "Sistema autónomo com comunicação LoRa – até 10 km de alcance",
    "Machine Learning aplicado à rega inteligente",
    "Até 50% de poupança de água com Irrigação Deficitária Controlada",
    "Monitorize e controle a sua rega remotamente, 24 horas por dia"
  ],
  en: [
    "Reduce water waste by up to 35% on your farm",
    "IoT technology that saves water and boosts productivity",
    "Autonomous system with LoRa communication – up to 10km range",
    "Machine Learning applied to smart irrigation",
    "Achieve up to 50% water savings with Controlled Deficit Irrigation",
    "Monitor and control your irrigation remotely, 24/7"
  ]
}

export default function EnhancedHeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const { language } = useLanguage()
  const content = HERO_CONTENT[language]
  const phrases = IMPACT_PHRASES[language]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [phrases.length])

  const scrollToNext = () => {
    const nextSection = document.getElementById('problema')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#ffffffa6',
        pt: { xs: 12, md: 10 },
        pb: 6,
      }}
    >
      {/* Background Image como Sombra - Totalmente ao Fundo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/background.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          opacity: 0.50,
          filter: 'brightness(0.5) contrast(2.7)',
        }}
      />

      {/* Gradient Overlay Principal - Em cima da imagem */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(180deg, ${alpha('#04653B', 0.92)} 0%, ${alpha('#1B5E20', 0.88)} 50%, ${alpha('#04653B', 0.92)} 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Overlay Adicional para Profundidade */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#41B360', 0.08)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#1EC5FA', 0.08)} 0%, transparent 50%)
          `,
          zIndex: 2,
        }}
      />

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Stack 
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 3, lg: 4, xl: 6 }}
          sx={{ 
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Conteúdo de Texto - Centralizado e Alinhado */}
          <Box sx={{ 
            flex: 1,
            textAlign: 'center',
            maxWidth: '600px',
            mx: 'auto',
            width: '100%',
          }}>
            <Stack spacing={3.5} alignItems="center">
              {/* Título Principal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.5rem' },
                    fontWeight: 850,
                    color: '#ffffff',
                    lineHeight: 1.05,
                    mb: 1,
                    textShadow: `0 4px 20px ${alpha('#04653B', 0.5)}`,
                    letterSpacing: '-0.5px',
                  }}
                >
                  {content.title.line1}
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'block', 
                      background: 'linear-gradient(135deg, #90E4FE 0%, #41B360 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontSize: { xs: '3.2rem', sm: '4.2rem', md: '5rem' },
                      fontWeight: 900,
                    }}
                  >
                    {content.title.line2}
                  </Box>
                </Typography>
              </motion.div>

              {/* Frase Dinâmica */}
              <motion.div
                key={currentPhrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.4rem' },
                      fontWeight: 500,
                      color: alpha('#ffffff', 0.95),
                      lineHeight: 1.5,
                      textShadow: `0 2px 8px ${alpha('#04653B', 0.3)}`,
                      maxWidth: '550px',
                      minHeight: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {phrases[currentPhrase]}
                  </Typography>
                </AnimatePresence>
              </motion.div>

              {/* Estatísticas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 2, sm: 4, md: 5 }}
                  justifyContent="center"
                  sx={{ 
                    mb: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  {content.stats.map((stat) => (
                    <Box key={stat.label} sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          color: '#90E4FE', 
                          fontWeight: 850,
                          fontSize: { xs: '1.8rem', md: '2.2rem' },
                          mb: 0.5,
                          textShadow: `0 2px 8px ${alpha('#1EC5FA', 0.3)}`,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: alpha('#ffffff', 0.85), 
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2.5}
                  justifyContent="center"
                  sx={{ mb: 2, width: '100%' }}
                >
                  <Button
                    component={Link}
                    href="#solucao"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4.5,
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 700,
                      background: `linear-gradient(135deg, #41B360 0%, #2E7D32 100%)`,
                      color: '#ffffff',
                      borderRadius: 2.5,
                      boxShadow: `0 12px 32px ${alpha('#41B360', 0.35)}`,
                      border: `2px solid ${alpha('#90E4FE', 0.2)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, #4CC469 0%, #3A9241 100%)`,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 16px 40px ${alpha('#41B360', 0.45)}`,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    {content.buttons.primary}
                  </Button>
                  
                  <Button
                    component={Link}
                    href="#contato"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4.5,
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderColor: '#90E4FE',
                      color: '#90E4FE',
                      borderWidth: 2.5,
                      borderRadius: 2.5,
                      backgroundColor: alpha('#90E4FE', 0.08),
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: '#1EC5FA',
                        backgroundColor: alpha('#1EC5FA', 0.15),
                        color: '#1EC5FA',
                        transform: 'translateY(-3px)',
                        boxShadow: `0 12px 32px ${alpha('#1EC5FA', 0.25)}`,
                        borderWidth: 2.5,
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    {content.buttons.secondary}
                  </Button>
                </Stack>
              </motion.div>
            </Stack>
          </Box>

          {/* Container da Imagem - Visível apenas em Desktop */}
          <Box sx={{ 
            flex: 1,
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '600px',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Polígono com Imagem */}
              <Box
                sx={{
                  position: 'relative',
                  width: '520px',
                  height: '520px',
                  borderRadius: '60% 40% 75% 25% / 40% 60% 40% 60%',
                  overflow: 'hidden',
                  background: `
                    url("https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80") center/cover
                  `,
                  border: `2.5px solid ${alpha('#90E4FE', 0.4)}`,
                  boxShadow: `
                    0 30px 60px ${alpha('#04653B', 0.35)},
                    inset 0 0 80px ${alpha('#1EC5FA', 0.15)},
                    0 0 60px ${alpha('#41B360', 0.25)}
                  `,
                  transform: 'rotate(-5deg)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'rotate(-2deg) scale(1.04)',
                    borderRadius: '55% 45% 65% 35% / 45% 55% 45% 55%',
                    boxShadow: `
                      0 35px 70px ${alpha('#04653B', 0.4)},
                      inset 0 0 100px ${alpha('#1EC5FA', 0.2)},
                      0 0 80px ${alpha('#41B360', 0.35)}
                    `,
                  },
                }}
              >
                {/* Overlay Sutil */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${alpha('#04653B', 0.2)} 0%, ${alpha('#1EC5FA', 0.1)} 100%)`,
                  }}
                />
                
                {/* Elementos Flutuantes */}
                <motion.div
                  animate={{ 
                    y: [0, -25, 0],
                    rotate: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: '15%',
                    left: '12%',
                    zIndex: 10,
                  }}
                >
                  <Box sx={{ fontSize: '25px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    💧
                  </Box>
                  <Box sx={{ fontSize: '50px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    💧
                  </Box>
                  <Box sx={{ fontSize: '75px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    💧
                  </Box>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    zIndex: 10,
                  }}
                >
                </motion.div>

                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    right: '30%',
                    zIndex: 10,
                  }}
                >
                  <Box sx={{ fontSize: '35px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                    ⚡
                  </Box>
                </motion.div>
              </Box>

              {/* Glow Effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '580px',
                  height: '580px',
                  background: `radial-gradient(circle, ${alpha('#90E4FE', 0.2)} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(30px)',
                  zIndex: -1,
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </Box>
        </Stack>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <IconButton
            onClick={scrollToNext}
            sx={{
              color: '#90E4FE',
              border: `2.5px solid ${alpha('#90E4FE', 0.5)}`,
              width: 48,
              height: 48,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: alpha('#90E4FE', 0.12),
                color: '#1EC5FA',
                borderColor: '#1EC5FA',
                transform: 'translateY(6px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
      </motion.div>

      {/* Gradient Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: `linear-gradient(180deg, transparent 0%, ${alpha('#04653B', 0.8)} 100%)`,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}