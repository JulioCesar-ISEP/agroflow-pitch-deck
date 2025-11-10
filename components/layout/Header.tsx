'use client'

import { AppBar, Toolbar, Button, Box, Container, IconButton, Menu, MenuItem, Typography, alpha, useTheme as useMUITheme } from '@mui/material'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useTheme } from '@/lib/contexts/ThemeContext'
import Image from 'next/image'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const HEADER_CONTENT = {
  pt: {
    navItems: [
      { label: 'O Problema', href: '#problema' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'A Solução', href: '#solucao' },
      { label: 'A Nossa Equipa', href: '#time' },
      { label: 'Contacto', href: '#contato' },
    ]
  },
  en: {
  navItems: [
    { label: 'The Problem', href: '#problema' },
    { label: 'About Us', href: '#sobre' },
    { label: 'The Solution', href: '#solucao' },
    { label: 'Our Team', href: '#time' },
    { label: 'Contact', href: '#contato' },
  ]
}
}

// Componente para renderizar bandeiras de forma consistente
const FlagIcon = ({ language }: { language: 'pt' | 'en' }) => {
  return (
    <Box
      sx={{
        fontSize: '1.3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 18,
        overflow: 'hidden',
        borderRadius: '1px',
        // Forçar renderização consistente do emoji
        fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif',
        lineHeight: 1,
      }}
    >
      {language === 'pt' ? '🇵🇹' : '🇬🇧'}
    </Box>
  )
}

export default function Header() {
  const { language, toggleLanguage } = useLanguage()
  const { theme: currentTheme, toggleTheme } = useTheme()
  const muiTheme = useMUITheme()
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)
  const content = HEADER_CONTENT[language]

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const isDark = currentTheme === 'dark'

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: muiTheme.palette.background.paper,
        backdropFilter: 'blur(25px)',
        boxShadow: muiTheme.shadows[1],
        borderBottom: `1px solid ${alpha(muiTheme.palette.primary.main, 0.1)}`,
        zIndex: 1100,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          gap: { xs: 2, md: 3 },
          minHeight: { xs: '70px', md: '85px' },
          py: { xs: 1, md: 1.5 },
        }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}
          >
            <Box
              component={Link}
              href="#hero"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  '& .logo-glow': {
                    boxShadow: `0 12px 36px ${alpha(muiTheme.palette.primary.main, 0.25)}`,
                    transform: 'translateY(-2px)',
                  }
                }
              }}
            >
              {/* Logo Container */}
              <Box
                className="logo-glow"
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 2px 15px ${alpha(muiTheme.palette.primary.main, 0.15)}`,
                }}
              >
                <Image 
                  src="/images/logo.webp" 
                  alt="AgroFlow" 
                  width={95}
                  height={65}
                  style={{ 
                    objectFit: 'contain',
                    height: 'auto',
                    borderRadius: '6px',
                  }}
                  priority
                />
              </Box>

              {/* Logo Text - Desktop Only */}
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Typography
                  variant="h5"
                  sx={{
                    background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 850,
                    fontSize: '1.75rem',
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                    mb: 0.25,
                  }}
                >
                  AgroFlow
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    fontWeight: 650,
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Smart Irrigation
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            gap: 0.5,
            justifyContent: 'center',
            flex: 1,
          }}>
            {content.navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
              >
                <Button
                  component={Link}
                  href={item.href}
                  sx={{
                    color: muiTheme.palette.text.primary,
                    fontWeight: 650,
                    fontSize: '0.95rem',
                    px: 2.8,
                    py: 1.3,
                    borderRadius: 2.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2.5px',
                      background: `linear-gradient(90deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.secondary.main} 100%)`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateX(-50%)',
                      borderRadius: '2px 2px 0 0',
                    },
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)',
                      '&::before': {
                        width: '75%',
                      }
                    },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Right Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            flex: '0 0 auto' 
          }}>
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <IconButton
                onClick={toggleTheme}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  color: muiTheme.palette.text.primary,
                  border: `1.5px solid ${alpha(muiTheme.palette.primary.main, 0.2)}`,
                  background: alpha(muiTheme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(12px)',
                  '&:hover': {
                    color: muiTheme.palette.primary.main,
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.12),
                    borderColor: alpha(muiTheme.palette.primary.main, 0.4),
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(muiTheme.palette.primary.main, 0.15)}`,
                  },
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </motion.div>

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              <Button
                onClick={toggleLanguage}
                startIcon={<FlagIcon language={language} />}
                sx={{
                  color: muiTheme.palette.text.primary,
                  fontSize: '0.85rem',
                  px: 1.8,
                  py: 0.9,
                  borderRadius: 2,
                  border: `1.5px solid ${alpha(muiTheme.palette.primary.main, 0.2)}`,
                  background: alpha(muiTheme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'none',
                  minWidth: 'auto',
                  fontWeight: 650,
                  '&:hover': {
                    color: muiTheme.palette.primary.main,
                    backgroundColor: alpha(muiTheme.palette.primary.main, 0.12),
                    borderColor: alpha(muiTheme.palette.primary.main, 0.4),
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 16px ${alpha(muiTheme.palette.primary.main, 0.12)}`,
                  },
                }}
                title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              >
                {language === 'pt' ? 'PT' : 'EN'}
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <IconButton
                  onClick={handleMobileMenuOpen}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: muiTheme.palette.text.primary,
                    border: `1.5px solid ${alpha(muiTheme.palette.primary.main, 0.2)}`,
                    background: alpha(muiTheme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(12px)',
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                      backgroundColor: alpha(muiTheme.palette.primary.main, 0.12),
                      borderColor: alpha(muiTheme.palette.primary.main, 0.4),
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 20px ${alpha(muiTheme.palette.primary.main, 0.15)}`,
                    },
                  }}
                  aria-label="Menu"
                >
                  <MenuIcon sx={{ fontSize: '1.4rem', fontWeight: 700 }} />
                </IconButton>
              </motion.div>
            </Box>

            {/* Mobile Menu */}
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: muiTheme.palette.background.paper,
                  backdropFilter: 'blur(25px)',
                  borderRadius: '14px',
                  boxShadow: muiTheme.shadows[8],
                  mt: 1.5,
                  border: `1px solid ${alpha(muiTheme.palette.primary.main, 0.1)}`,
                  minWidth: 220,
                  overflow: 'hidden',
                  '& .MuiList-root': {
                    py: 1.5,
                  }
                },
              }}
            >
              {content.navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MenuItem
                    component={Link}
                    href={item.href}
                    onClick={handleMobileMenuClose}
                    sx={{
                      color: muiTheme.palette.text.primary,
                      fontWeight: 650,
                      fontSize: '0.95rem',
                      py: 1.75,
                      px: 3,
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderBottom: `1px solid ${alpha(muiTheme.palette.primary.main, 0.06)}`,
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                      '&:hover': {
                        color: muiTheme.palette.primary.main,
                        backgroundColor: alpha(muiTheme.palette.primary.main, 0.08),
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                </motion.div>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}