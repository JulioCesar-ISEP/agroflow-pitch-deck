'use client'

import { Box, Container, Typography, Grid, Card, CardContent, alpha, Stack, Chip, IconButton, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'

const SOLUTION_CONTENT = {
  pt: {
    title: "A Nossa Solução",
    subtitle: "Tecnologia inteligente para revolucionar a gestão de recursos na agricultura",
    portalTitle: "AgroFlow Portal",
    portalSubtitle: "Interface moderna para gestão completa da rega inteligente",
    portalDescription: "O nosso portal web responsivo oferece controlo total sobre o sistema de rega, com visualização em tempo real, relatórios detalhados e controlo remoto a partir de qualquer dispositivo.",
    portalFeatures: [
      "Dashboard em tempo real com dados do solo e do clima",
      "Controlo manual remoto do sistema de rega",
      "Relatórios de consumo e poupança de água",
      "Gráficos evolutivos e previsões meteorológicas",
      "Compatibilidade total com desktop e mobile",
      "Alertas inteligentes e notificações"
    ],
    architectureTitle: "Arquitetura do Sistema",
    architectureDescription: "Sistema modular com comunicação LoRa de longo alcance (até 10 km) e processamento em nuvem com Machine Learning.",
    solumTitle: "AgroFlow Solum",
    solumDescription: "Sensores inteligentes de solo com ESP32 e energia solar",
    solumFeatures: [
      "Medição contínua da humidade do solo",
      "Autodiagnóstico e bateria solar",
      "Comunicação LoRa (até 10 km)",
      "Armazenamento local em caso de falhas"
    ],
    aquaTitle: "AgroFlow Aqua",
    aquaDescription: "Controlador de rega com relés inteligentes",
    aquaFeatures: [
      "Controlo preciso de válvulas",
      "Acionamento por comandos remotos",
      "Operação autónoma em caso de falhas",
      "Integração com sistemas existentes"
    ],
    caputTitle: "AgroFlow Caput",
    caputDescription: "Central de comunicação e processamento local",
    caputFeatures: [
      "Recebe dados dos sensores Solum",
      "Retransmite comandos para o Aqua",
      "Armazenamento local autónomo",
      "Comunicação web com o servidor"
    ],
    serverTitle: "Servidor Central com IA",
    serverDescription: "Processamento com Machine Learning e análise de dados",
    serverFeatures: [
      "Modelos de ML para maior eficiência",
      "Integração com APIs meteorológicas",
      "Decisão automática de rega",
      "Base de dados e analytics"
    ],
    resultsTitle: "Resultados Esperados",
    results: [
      "Redução de até 30% no consumo de água",
      "Aumento de 25% na produtividade",
      "Retorno do investimento em menos de 12 meses",
      "Monitorização 24/7 da plantação"
    ]
  },
  en: {
    title: "Our Solution",
    subtitle: "Smart technology to revolutionize resource management in agriculture",
    portalTitle: "AgroFlow Portal",
    portalSubtitle: "Modern interface for complete smart irrigation management",
    portalDescription: "Our responsive web portal offers full control over the irrigation system, with real-time visualization, detailed reports, and remote access from any device.",
    portalFeatures: [
      "Real-time dashboard with soil and weather data",
      "Remote manual control of the irrigation system",
      "Water consumption and savings reports",
      "Evolution charts and weather forecasts",
      "Full desktop and mobile compatibility",
      "Smart alerts and notifications"
    ],
    architectureTitle: "System Architecture",
    architectureDescription: "Modular system with long-range LoRa communication (up to 10 km) and cloud-based processing using Machine Learning.",
    solumTitle: "AgroFlow Solum",
    solumDescription: "Smart soil sensors powered by ESP32 and solar energy",
    solumFeatures: [
      "Continuous soil moisture measurement",
      "Self-diagnosis and solar battery",
      "LoRa communication (up to 10 km)",
      "Local storage in case of failures"
    ],
    aquaTitle: "AgroFlow Aqua",
    aquaDescription: "Irrigation controller with smart relays",
    aquaFeatures: [
      "Precise valve control",
      "Remote command activation",
      "Autonomous operation during failures",
      "Integration with existing systems"
    ],
    caputTitle: "AgroFlow Caput",
    caputDescription: "Communication hub and local processing unit",
    caputFeatures: [
      "Receives data from Solum sensors",
      "Retransmits commands to Aqua",
      "Autonomous local storage",
      "Web communication with the server"
    ],
    serverTitle: "AI Central Server",
    serverDescription: "Processing powered by Machine Learning and analytics",
    serverFeatures: [
      "ML models for improved efficiency",
      "Integration with weather APIs",
      "Automated irrigation decisions",
      "Database and analytics"
    ],
    resultsTitle: "Expected Results",
    results: [
      "Up to 30% reduction in water consumption",
      "25% increase in productivity",
      "ROI in less than 12 months",
      "24/7 crop monitoring"
    ]
  }
}

export default function SolutionSection() {
  const { language } = useLanguage()
  const theme = useTheme()
  const content = SOLUTION_CONTENT[language]

  const isDark = theme.palette.mode === 'dark'

  const scrollToNext = () => {
    const contactSection = document.getElementById('time')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const architectureComponents = [
    {
      title: content.solumTitle,
      description: content.solumDescription,
      features: content.solumFeatures,
      color: theme.palette.primary.main
    },
    {
      title: content.aquaTitle,
      description: content.aquaDescription, 
      features: content.aquaFeatures,
      color: theme.palette.secondary.main
    },
    {
      title: content.caputTitle,
      description: content.caputDescription,
      features: content.caputFeatures,
      color: theme.palette.primary.light
    },
    {
      title: content.serverTitle,
      description: content.serverDescription,
      features: content.serverFeatures,
      color: theme.palette.primary.dark
    }
  ]

  return (
    <Box
      id="solucao"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: isDark 
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`
          : `linear-gradient(135deg, #ffffffff 0%, #dbdbdbff 100%)`,
        color: theme.palette.text.primary,
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
                color: theme.palette.primary.main,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                letterSpacing: '-0.5px',
              }}
            >
              {content.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.3rem',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {content.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Seção Principal: Portal em Destaque */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 12 }}>
          {/* Imagem do Portal - Lado Esquerdo */}
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
                  width: '100%',
                  height: '100%',
                  minHeight: 400,
                }}
              >
                <Image
                  src="/images/desktop+mobile.webp"
                  alt={language === 'pt' ? 'AgroFlow Portal - Desktop e Mobile' : 'AgroFlow Portal - Desktop and Mobile'}
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                  priority
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Descrição do Portal - Lado Direito */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box>
                  <Chip
                    label={language === 'pt' ? "INTERFACE PRINCIPAL" : "MAIN INTERFACE"}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 2,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {content.portalTitle}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      fontSize: '1.3rem',
                      fontWeight: 500,
                    }}
                  >
                    {content.portalSubtitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      mb: 4,
                    }}
                  >
                    {content.portalDescription}
                  </Typography>
                </Box>
              </motion.div>

              {/* Funcionalidades do Portal */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Grid container spacing={2}>
                  {content.portalFeatures.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: 'white',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.95rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>

        {/* Arquitetura do Sistema */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2,
                  fontSize: '2.2rem',
                }}
              >
                {content.architectureTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                }}
              >
                {content.architectureDescription}
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {architectureComponents.map((component, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: theme.palette.background.paper,
                        border: `1px solid ${alpha(component.color, 0.2)}`,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          borderColor: alpha(component.color, 0.4),
                          boxShadow: `0 8px 24px ${alpha(component.color, 0.1)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: alpha(component.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: component.color,
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: component.color,
                            fontSize: '1.1rem',
                            mb: 1,
                          }}
                        >
                          {component.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.85rem',
                            mb: 2,
                            lineHeight: 1.4,
                          }}
                        >
                          {component.description}
                        </Typography>
                        <Stack spacing={1}>
                          {component.features.slice(0, 2).map((feature, featureIndex) => (
                            <Typography
                              key={featureIndex}
                              variant="caption"
                              sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem',
                                lineHeight: 1.3,
                                display: 'block',
                              }}
                            >
                              • {feature}
                            </Typography>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Resultados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card 
            sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`,
              color: 'white',
              borderRadius: 2,
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  fontSize: '2rem',
                  color: 'white'
                }}
              >
                {content.resultsTitle}
              </Typography>
              
              <Grid container spacing={4}>
                {content.results.map((result, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: alpha(theme.palette.secondary.light, 0.2),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                          }}
                        >
                          ✓
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: alpha('#ffffff', 0.9),
                            lineHeight: 1.5,
                            fontSize: '0.95rem',
                          }}
                        >
                          {result}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '10px',
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
    </Box>
  )
}