'use client'

import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Button, Alert, alpha, Paper, TextField, Stack, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const CONTACT_CONTENT = {
  pt: {
    title: "Contacte-nos",
    subtitle: "Pronto para implementar rega inteligente?",
    formTitle: "Solicitar Demonstração",
    nameLabel: "O Seu Nome",
    emailLabel: "O Seu Email",
    messageLabel: "Como podemos ajudar?",
    sendButton: "Enviar Mensagem",
    sending: "A Enviar...",
    contactTitle: "Informações de Contacto",
    email: "contacto@agroflow.pt",
    phone: "+351 900 000 000",
    hours: "Segunda a Sexta: 8h às 18h",
    location: "Porto, Portugal",
    successMessage: "Mensagem enviada com sucesso! Em breve, a nossa equipa entrará em contacto.",
    errorMessage: "Erro ao enviar a mensagem. Por favor, tente novamente.",
    validationErrors: {
      nameTooShort: "O nome deve ter pelo menos 2 caracteres",
      invalidEmail: "Email inválido",
      messageTooShort: "A mensagem deve ter pelo menos 10 caracteres"
    }
  },
  en: {
    title: "Contact Us",
    subtitle: "Ready to implement smart irrigation?",
    formTitle: "Request a Demo",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    messageLabel: "How can we assist you?",
    sendButton: "Send Message",
    sending: "Sending...",
    contactTitle: "Contact Information",
    email: "contact@agroflow.pt",
    phone: "+351 900 000 000",
    hours: "Monday to Friday: 8AM to 6PM",
    location: "Porto, Portugal",
    successMessage: "Message sent successfully! Our team will be in touch shortly.",
    errorMessage: "Error sending message. Please try again.",
    validationErrors: {
      nameTooShort: "Name must be at least 2 characters",
      invalidEmail: "Invalid email address",
      messageTooShort: "Message must be at least 10 characters"
    }
  }
}

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactSection() {
  const { language } = useLanguage()
  const theme = useTheme()
  const content = CONTACT_CONTENT[language]
  const isDark = theme.palette.mode === 'dark'

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Validação
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = content.validationErrors.nameTooShort
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = content.validationErrors.invalidEmail
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = content.validationErrors.messageTooShort
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Limpar erro do campo ao começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: content.successMessage,
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.error || content.errorMessage,
        })
      }
    } catch (error) {
      console.error('Erro:', error)
      setStatus({
        type: 'error',
        message: content.errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: '2rem' }} />,
      title: "Email",
      value: content.email,
      color: theme.palette.primary.main
    },
    {
      icon: <PhoneIcon sx={{ fontSize: '2rem' }} />,
      title: language === 'pt' ? "Telefone" : "Phone",
      value: content.phone,
      color: theme.palette.secondary.main
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: '2rem' }} />,
      title: language === 'pt' ? "Horário" : "Hours",
      value: content.hours,
      color: theme.palette.secondary.light
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: '2rem' }} />,
      title: language === 'pt' ? "Localização" : "Location",
      value: content.location,
      color: theme.palette.primary.dark
    }
  ]

  const scrollToTop = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      id="contato"
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

        <Grid container spacing={6}>
          {/* Informações de Contato */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: isDark ? theme.palette.primary.main : '#ffffff',
                    mb: 4,
                    fontSize: '1.8rem',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {content.contactTitle}
                </Typography>

                <Stack spacing={3}>
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <Card
                        sx={{
                          background: isDark
                            ? alpha(theme.palette.primary.main, 0.1)
                            : alpha('#04653B', 0.1),
                          border: `1px solid ${alpha(item.color, 0.2)}`,
                          borderRadius: 2,
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            borderColor: alpha(item.color, 0.4),
                            background: isDark
                              ? alpha(theme.palette.primary.main, 0.2)
                              : alpha('#04653B', 0.2),
                            boxShadow: isDark
                              ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`
                              : `0 8px 24px ${alpha('#04653B', 0.2)}`,
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box
                              sx={{
                                color: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: alpha(item.color, 0.1),
                                flexShrink: 0,
                                transition: 'all 0.3s ease-in-out',
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: isDark ? theme.palette.text.primary : '#ffffff',
                                  fontSize: '1rem',
                                  mb: 0.5,
                                  transition: 'all 0.3s ease-in-out',
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: isDark ? theme.palette.text.secondary : alpha('#ffffff', 0.8),
                                  fontSize: '0.95rem',
                                  transition: 'all 0.3s ease-in-out',
                                }}
                              >
                                {item.value}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>

          {/* Formulário */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Paper
                sx={{
                  p: { xs: 3, md: 5 },
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.95)
                    : alpha('#ffffff', 0.95),
                  borderRadius: 3,
                  boxShadow: isDark
                    ? '0 20px 60px rgba(0,0,0,0.4)'
                    : '0 20px 60px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: isDark ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: isDark ? theme.palette.primary.main : '#2E7D32',
                    mb: 1,
                    fontSize: '1.8rem',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {content.formTitle}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: isDark ? theme.palette.text.secondary : alpha('#2E7D32', 0.8),
                    mb: 4,
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {language === 'pt'
                    ? 'Preencha o formulário abaixo e nossa equipe entrará em contacto para agendar uma demonstração personalizada.'
                    : 'Fill out the form below and our team will contact you to schedule a personalized demo.'
                  }
                </Typography>

                {/* Alert de Status */}
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Alert
                      severity={status.type}
                      icon={status.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                          width: '100%',
                        }
                      }}
                      onClose={() => setStatus({ type: null, message: '' })}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {status.type === 'success'
                            ? (language === 'pt' ? '✓ Sucesso!' : '✓ Success!')
                            : (language === 'pt' ? '⚠ Oops!' : '⚠ Oops!')}
                        </Typography>
                        <Typography variant="body2">
                          {status.message}
                        </Typography>
                        {status.type === 'error' && (
                          <Box sx={{ mt: 1.5, fontSize: '0.85rem', opacity: 0.9 }}>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                              {language === 'pt'
                                ? '💡 Dica: Se o problema persistir:'
                                : '💡 Tip: If the problem persists:'}
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                              {language === 'pt'
                                ? '1. Verifique sua conexão de internet'
                                : '1. Check your internet connection'}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {language === 'pt'
                                ? '2. Tente novamente em alguns minutos'
                                : '2. Try again in a few minutes'}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {language === 'pt'
                                ? '3. Entre em contacto conosco diretamente'
                                : '3. Contact us directly'}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={content.nameLabel}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        required
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: isDark ? alpha(theme.palette.background.default, 0.8) : '#ffffff',
                            color: isDark ? theme.palette.text.primary : 'inherit',
                            '&:hover fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: isDark ? theme.palette.text.secondary : 'inherit',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={content.emailLabel}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        required
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: isDark ? alpha(theme.palette.background.default, 0.8) : '#ffffff',
                            color: isDark ? theme.palette.text.primary : 'inherit',
                            '&:hover fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: isDark ? theme.palette.text.secondary : 'inherit',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={content.messageLabel}
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        variant="outlined"
                        required
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            background: isDark ? alpha(theme.palette.background.default, 0.8) : '#ffffff',
                            color: isDark ? theme.palette.text.primary : 'inherit',
                            '&:hover fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: isDark ? theme.palette.text.secondary : 'inherit',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        whileHover={{ scale: !loading ? 1.02 : 1 }}
                        whileTap={{ scale: !loading ? 0.98 : 1 }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          size="large"
                          variant="contained"
                          disabled={loading}
                          sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            color: theme.palette.common.white,
                            borderRadius: 2,
                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
                              boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                            },
                            '&:disabled': {
                              opacity: 0.7,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {loading ? content.sending : content.sendButton}
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll para voltar ao topo */}
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
          onClick={scrollToTop}
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
          <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </motion.div>
    </Box>
  )
}