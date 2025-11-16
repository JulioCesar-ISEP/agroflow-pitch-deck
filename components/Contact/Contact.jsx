// components/Contact/Contact.jsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/lib/context/AppContext'
import styles from './Contact.module.css'

const CONTACT_CONTENT = {
  pt: {
    title: 'Contacte-nos',
    subtitle: 'Pronto para implementar rega inteligente?',
    formTitle: 'Solicitar Demonstração',
    nameLabel: 'O Seu Nome',
    emailLabel: 'O Seu Email',
    messageLabel: 'Como podemos ajudar?',
    sendButton: 'Enviar Mensagem',
    sending: 'A Enviar...',
    contactTitle: 'Informações de Contacto',
    email: 'contacto@agroflow.pt',
    phone: '+351 900 000 000',
    hours: 'Segunda a Sexta: 8h às 18h',
    location: 'Porto, Portugal',
    successMessage:
      'Mensagem enviada com sucesso! Em breve, a nossa equipa entrará em contacto.',
    errorMessage:
      'Erro ao enviar a mensagem. Por favor, tente novamente.',
    validationErrors: {
      nameTooShort: 'O nome deve ter pelo menos 2 caracteres',
      invalidEmail: 'Email inválido',
      messageTooShort: 'A mensagem deve ter pelo menos 10 caracteres',
    },
  },
  en: {
    title: 'Contact Us',
    subtitle: 'Ready to implement smart irrigation?',
    formTitle: 'Request a Demo',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    messageLabel: 'How can we assist you?',
    sendButton: 'Send Message',
    sending: 'Sending...',
    contactTitle: 'Contact Information',
    email: 'contact@agroflow.pt',
    phone: '+351 900 000 000',
    hours: 'Monday to Friday: 8AM to 6PM',
    location: 'Porto, Portugal',
    successMessage:
      'Message sent successfully! Our team will be in touch shortly.',
    errorMessage:
      'Error sending message. Please try again.',
    validationErrors: {
      nameTooShort: 'Name must be at least 2 characters',
      invalidEmail: 'Invalid email address',
      messageTooShort: 'Message must be at least 10 characters',
    },
  },
}

export default function Contact() {
  const { language, isDark } = useApp()
  const content = CONTACT_CONTENT[language]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({
    type: null,
    message: '',
  })

  const validateForm = () => {
    const newErrors = {}

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
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
      console.error('Error:', error)
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
      icon: '✉️',
      title: 'Email',
      value: content.email,
      color: 'var(--agroflow-primary-600)',
    },
    {
      icon: '📞',
      title: language === 'pt' ? 'Telefone' : 'Phone',
      value: content.phone,
      color: 'var(--agroflow-secondary-600)',
    },
    {
      icon: '🕒',
      title: language === 'pt' ? 'Horário' : 'Hours',
      value: content.hours,
      color: 'var(--agroflow-secondary-500)',
    },
    {
      icon: '📍',
      title: language === 'pt' ? 'Localização' : 'Location',
      value: content.location,
      color: 'var(--agroflow-primary-700)',
    },
  ]

  const scrollToTop = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="contato"
      className={`${styles.contact} ${isDark ? styles.dark : styles.light}`}
    >
      {/* Fundo com gradiente suave (coerente com About/Solution) */}
      <div className={styles.backgroundGradient} />

      {/* Padrão suave por cima do gradiente */}
      <div className={styles.backgroundPattern} />

      <div className={styles.container}>
        {/* Header em cartão translúcido */}
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

        <div className={styles.grid}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.contactTitle}>
                {content.contactTitle}
              </h3>

              <div className={styles.contactList}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * index,
                    }}
                    viewport={{ once: true }}
                    className={styles.contactCard}
                    style={{ '--accent-color': item.color }}
                  >
                    <div className={styles.contactIcon}>{item.icon}</div>
                    <div className={styles.contactDetails}>
                      <h4 className={styles.contactItemTitle}>
                        {item.title}
                      </h4>
                      <p className={styles.contactItemValue}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  {content.formTitle}
                </h3>

                <p className={styles.formDescription}>
                  {language === 'pt'
                    ? 'Preencha o formulário abaixo e nossa equipa entrará em contacto para agendar uma demonstração personalizada.'
                    : 'Fill out the form below and our team will contact you to schedule a personalized demo.'}
                </p>

                {/* Status Alert */}
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.alert} ${styles[status.type]
                      }`}
                  >
                    <div className={styles.alertContent}>
                      <span className={styles.alertIcon}>
                        {status.type === 'success' ? '✓' : '⚠'}
                      </span>
                      <div>
                        <strong className={styles.alertTitle}>
                          {status.type === 'success'
                            ? language === 'pt'
                              ? 'Sucesso!'
                              : 'Success!'
                            : language === 'pt'
                              ? 'Oops!'
                              : 'Oops!'}
                        </strong>
                        <p className={styles.alertMessage}>
                          {status.message}
                        </p>
                        {status.type === 'error' && (
                          <div className={styles.errorTips}>
                            <small>
                              {language === 'pt'
                                ? '💡 Dica:'
                                : '💡 Tip:'}
                            </small>
                            <ul>
                              <li>
                                {language === 'pt'
                                  ? 'Verifique a sua ligação à internet'
                                  : 'Check your internet connection'}
                              </li>
                              <li>
                                {language === 'pt'
                                  ? 'Tente novamente em alguns minutos'
                                  : 'Try again in a few minutes'}
                              </li>
                              <li>
                                {language === 'pt'
                                  ? 'Entre em contacto connosco diretamente'
                                  : 'Contact us directly'}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          setStatus({ type: null, message: '' })
                        }
                        className={styles.alertClose}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  </motion.div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className={styles.form}
                >
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label
                        htmlFor="name"
                        className={styles.label}
                      >
                        {content.nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.name ? styles.error : ''
                          }`}
                        disabled={loading}
                        required
                      />
                      {errors.name && (
                        <span className={styles.errorText}>
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        htmlFor="email"
                        className={styles.label}
                      >
                        {content.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.email ? styles.error : ''
                          }`}
                        disabled={loading}
                        required
                      />
                      {errors.email && (
                        <span className={styles.errorText}>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroupFull}>
                      <label
                        htmlFor="message"
                        className={styles.label}
                      >
                        {content.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`${styles.textarea} ${errors.message ? styles.error : ''
                          }`}
                        disabled={loading}
                        required
                      />
                      {errors.message && (
                        <span className={styles.errorText}>
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroupFull}>
                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: !loading ? 1.02 : 1,
                        }}
                        whileTap={{
                          scale: !loading ? 0.98 : 1,
                        }}
                        className={styles.submitButton}
                        disabled={loading}
                      >
                        {loading
                          ? content.sending
                          : content.sendButton}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
