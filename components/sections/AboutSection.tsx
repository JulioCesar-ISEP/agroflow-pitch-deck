'use client'

import { Box, Container, Typography, Grid, Card, CardContent, alpha, Stack, Chip, IconButton, Paper, Divider, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const ABOUT_CONTENT = {
  pt: {
    title: "Sobre Nós",
    subtitle: "Transformamos dados em sustentabilidade agrícola",
    missionTitle: "Missão",
    visionTitle: "Visão", 
    mission: "Capacitar os agricultores com tecnologia inteligente para otimizar o uso da água e aumentar a produtividade de forma sustentável.",
    vision: "Ser a referência global em soluções de agricultura digital que conciliam produtividade com preservação ambiental.",
    description: "Aliamos conhecimento em agronomia, ciência de dados e IoT para criar soluções práticas que respondem a desafios reais do campo.",
    valuesTitle: "Os Nossos Valores",
    sustainability: "Sustentabilidade",
    innovation: "Inovação",
    impact: "Impacto Mensurável",
    teamTitle: "Especialização Multidisciplinar",
    teamSubtitle: "Equipa com experiência combinada em:",
    agronomy: "Agronomia & Agricultura",
    technology: "Tecnologia & Ciência de Dados", 
    sustainabilityField: "Sustentabilidade Ambiental",
    odsTitle: "Compromisso com os ODS",
    odsSubtitle: "Trabalhamos diretamente com os Objetivos de Desenvolvimento Sustentável da ONU",
    ods2: {
      title: "ODS 2 – Fome Zero",
      description: "Agricultura sustentável para erradicar a fome e garantir segurança alimentar.",
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
    subtitle: "Turning data into agricultural sustainability", 
    missionTitle: "Mission",
    visionTitle: "Vision",
    mission: "Empowering farmers with smart technology to optimize water usage and boost sustainable productivity.",
    vision: "To become the global benchmark in digital agriculture solutions that balance productivity with environmental preservation.",
    description: "We combine expertise in agronomy, data science, and IoT to develop practical solutions that address real-world agricultural challenges.",
    valuesTitle: "Our Values",
    sustainability: "Sustainability",
    innovation: "Innovation",
    impact: "Measurable Impact", 
    teamTitle: "Multidisciplinary Expertise",
    teamSubtitle: "Our team brings combined experience in:",
    agronomy: "Agronomy & Agriculture",
    technology: "Technology & Data Science",
    sustainabilityField: "Environmental Sustainability",
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

export default function AboutSection() {
  const { language } = useLanguage()
  const theme = useTheme()
  const content = ABOUT_CONTENT[language]
  const isDark = theme.palette.mode === 'dark'

  const scrollToNext = () => {
    const nextSection = document.getElementById('solucao')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      id="sobre"
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
      {/* Background Pattern Minimalista */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? `
                radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)
              `
            : `
                radial-gradient(circle at 20% 30%, ${alpha('#41B360', 0.03)} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${alpha('#1EC5FA', 0.03)} 0%, transparent 50%)
              `,
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Minimalista */}
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

        {/* Seção Principal: Logo + Missão/Visão */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 8 }}>
          {/* Logo Section - Lado Esquerdo */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: 400,
                    height: 400,
                    backgroundColor: isDark ? theme.palette.background.paper : '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isDark 
                      ? '0 20px 60px rgba(0,0,0,0.4)'
                      : '0 20px 60px rgba(0,0,0,0.3)',
                    border: `3px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <Image 
                    src={isDark ? "/images/agroflow-no-bg.webp" : "/images/logo1.webp"}
                    alt="AgroFlow" 
                    width={380}
                    height={380}
                    style={{ 
                      objectFit: 'contain',
                      borderRadius: '50%',
                    }}
                    priority
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Content Section - Lado Direito */}
          <Grid item xs={12} md={6}>
            <Stack spacing={6}>
              {/* Missão */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.secondary.light,
                      mb: 3,
                      fontSize: '1.8rem',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {content.missionTitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.9),
                      fontSize: '1.2rem',
                      lineHeight: 1.8,
                      mb: 2,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {content.mission}
                  </Typography>
                </Box>
              </motion.div>

              {/* Visão */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.secondary.light,
                      mb: 3,
                      fontSize: '1.8rem',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {content.visionTitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.9),
                      fontSize: '1.2rem',
                      lineHeight: 1.8,
                      mb: 2,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {content.vision}
                  </Typography>
                </Box>
              </motion.div>

              {/* Descrição */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Paper
                  sx={{
                    p: 4,
                    background: isDark
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha('#04653B', 0.1),
                    border: `1px solid ${alpha(theme.palette.secondary.light, 0.2)}`,
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.9),
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    "{content.description}"
                  </Typography>
                </Paper>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: 8, 
          borderColor: alpha(theme.palette.secondary.light, 0.2),
          transition: 'all 0.3s ease-in-out',
        }} />

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: isDark ? theme.palette.primary.main : '#ffffff',
                mb: 4,
                fontSize: '2.2rem',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.valuesTitle}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Chip
                label={content.sustainability}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  py: 2,
                  px: 4,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              <Chip
                label={content.innovation}
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
                  color: theme.palette.secondary.light,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  py: 2,
                  px: 4,
                  border: `2px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              <Chip
                label={content.impact}
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  py: 2,
                  px: 4,
                  border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            </Stack>
          </Box>
        </motion.div>

        <Divider sx={{ 
          my: 8, 
          borderColor: alpha(theme.palette.secondary.light, 0.2),
          transition: 'all 0.3s ease-in-out',
        }} />

        {/* ODS Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: isDark ? theme.palette.primary.main : '#ffffff',
                mb: 2,
                fontSize: '2.2rem',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.odsTitle}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
                fontWeight: 400,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.odsSubtitle}
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[content.ods2, content.ods12, content.ods13].map((ods, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: isDark
                        ? alpha(theme.palette.primary.main, 0.05)
                        : alpha('#04653B', 0.05),
                      border: `1px solid ${alpha(theme.palette.secondary.light, 0.1)}`,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: alpha(theme.palette.secondary.light, 0.3),
                        background: isDark
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha('#04653B', 0.1),
                        boxShadow: isDark
                          ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`
                          : `0 8px 32px ${alpha('#04653B', 0.2)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 3,
                          background: `url(/images/ods${index === 0 ? '2' : index === 1 ? '12' : '13'}.png) center/contain no-repeat`,
                          filter: isDark 
                            ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
                            : 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                        }}
                      />
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: isDark ? theme.palette.text.primary : '#ffffff',
                          mb: 2,
                          fontSize: '1.3rem',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        {ods.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                          lineHeight: 1.6,
                          mb: 3,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        {ods.description}
                      </Typography>
                      <Chip
                        label={ods.goal}
                        sx={{
                          backgroundColor: alpha(theme.palette.secondary.light, 0.1),
                          color: theme.palette.secondary.light,
                          fontWeight: 500,
                          border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Divider sx={{ 
          my: 8, 
          borderColor: alpha(theme.palette.secondary.light, 0.2),
          transition: 'all 0.3s ease-in-out',
        }} />

        {/* Team Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: isDark ? theme.palette.primary.main : '#ffffff',
                mb: 1,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.teamTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                mb: 4,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {content.teamSubtitle}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Chip
                label={content.agronomy}
                variant="outlined"
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              <Chip
                label={content.technology}
                variant="outlined"
                sx={{
                  color: theme.palette.secondary.light,
                  borderColor: theme.palette.secondary.light,
                  fontWeight: 500,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              <Chip
                label={content.sustainabilityField}
                variant="outlined"
                sx={{
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.secondary.main,
                  fontWeight: 500,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            </Stack>
          </Box>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 4,
            }}
          >
            <IconButton
              onClick={scrollToNext}
              sx={{
                color: theme.palette.secondary.light,
                border: `2.5px solid ${alpha(theme.palette.secondary.light, 0.5)}`,
                width: 48,
                height: 48,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.secondary.main,
                  transform: 'translateY(6px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}