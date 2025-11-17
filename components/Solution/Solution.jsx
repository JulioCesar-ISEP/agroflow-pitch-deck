// components/Solution/Solution.jsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useApp } from '@/lib/context/AppContext'
import styles from './Solution.module.css'

const SOLUTION_CONTENT = {
  pt: {
    title: 'A Nossa Solução',
    subtitle: 'Sistema integrado de rega inteligente para pequenos e médios agricultores',
    portalTitle: 'AgroFlow Portal',
    portalSubtitle: 'Controlo total da sua plantação em qualquer lugar',
    portalDescription: 'Aceda ao portal através de qualquer dispositivo com ligação à Internet para monitorizar e controlar toda a sua operação de rega em tempo real.',
    portalFeatures: [
      'Estado da plantação e da rega em tempo real',
      'Histórico completo do sistema',
      'Previsão meteorológica integrada',
      'Relatórios de poupança de água',
      'Controlo remoto do sistema',
      'Alertas e notificações inteligentes',
    ],
    architectureTitle: 'Como Funciona o Sistema',
    architectureDescription: 'Arquitetura modular que se adapta à sua realidade, sem necessidade de substituir equipamentos existentes.',
    solumTitle: 'AgroFlow Solum',
    solumDescription: 'Sensor de solo inteligente com elevada eficiência energética',
    solumFeatures: [
      'Instalado diretamente na plantação',
      'Monitoriza em tempo real o estado do solo',
      'Até 5 anos sem necessidade de carregamento',
      'Comunicação wireless de longo alcance',
    ],
    aquaTitle: 'AgroFlow Aqua',
    aquaDescription: 'Controlador de rega compatível',
    aquaFeatures: [
      'Controla o acionamento do sistema de rega',
      'Instalação direta no sistema existente',
      'Não requer a aquisição de um novo sistema',
      'Funcionamento autónomo e fiável',
    ],
    caputTitle: 'AgroFlow Caput',
    caputDescription: 'Central de comunicação inteligente',
    caputFeatures: [
      'Posicionada num local com acesso à Internet',
      'Faz a ligação entre os dispositivos do campo e o Portal',
      'Processamento local de dados',
      'Comunicação bidirecional',
    ],
    portalComponentTitle: 'AgroFlow Portal',
    portalComponentDescription: 'Interface web de gestão completa',
    portalComponentFeatures: [
      'Acesso a partir de qualquer dispositivo com Internet',
      'Controlo total da operação',
      'Dados em tempo real e históricos',
      'Gestão multiplataforma',
    ],
    resultsTitle: 'Benefícios para o Agricultor',
    results: [
      'Redução de até 50% no consumo de água',
      'Poupança com os equipamentos existentes',
      'Monitorização 24/7 de qualquer local',
      'Retorno do investimento em 6-12 meses',
    ],
    dashboardTitle: 'Painel de Controlo',
    dashboardSubtitle: 'Visualização simulada do AgroFlow Portal',
    communicationTitle: 'Comunicação do Sistema',
    communicationDescription: 'Todos os dispositivos comunicam entre si de forma inteligente'
  },
  en: {
    title: 'Our Solution',
    subtitle: 'Integrated smart irrigation system for small and medium farmers',
    portalTitle: 'AgroFlow Portal',
    portalSubtitle: 'Complete control of your plantation anywhere',
    portalDescription: 'Access the portal through any internet-connected device to monitor and control your entire irrigation operation in real time.',
    portalFeatures: [
      'Real-time plantation and irrigation status',
      'Complete system history',
      'Integrated weather forecast',
      'Water savings reports',
      'Remote system control',
      'Smart alerts and notifications',
    ],
    architectureTitle: 'How the System Works',
    architectureDescription: 'Modular architecture that adapts to your reality, without needing to replace existing equipment.',
    solumTitle: 'AgroFlow Solum',
    solumDescription: 'Smart soil sensor with high energy efficiency',
    solumFeatures: [
      'Installed directly in the plantation',
      'Checks soil status in real time',
      'Up to 5 years without needing charging',
      'Long-range wireless communication',
    ],
    aquaTitle: 'AgroFlow Aqua',
    aquaDescription: 'Compatible irrigation controller',
    aquaFeatures: [
      'Controls irrigation system activation',
      'Direct installation in existing system',
      'No need to buy new system',
      'Autonomous and reliable operation',
    ],
    caputTitle: 'AgroFlow Caput',
    caputDescription: 'Smart communication hub',
    caputFeatures: [
      'Positioned in location with internet access',
      'Connects field devices to the Portal',
      'Local data processing',
      'Bidirectional communication',
    ],
    portalComponentTitle: 'AgroFlow Portal',
    portalComponentDescription: 'Complete web management interface',
    portalComponentFeatures: [
      'Access from any internet device',
      'Complete operation control',
      'Real-time and historical data',
      'Multi-platform management',
    ],
    resultsTitle: 'Farmer Benefits',
    results: [
      'Up to 50% reduction in water consumption',
      'Savings with existing equipment',
      '24/7 monitoring from anywhere',
      'Return on investment in 6-12 months',
    ],
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Simulated view of AgroFlow Portal',
    communicationTitle: 'System Communication',
    communicationDescription: 'All devices communicate with each other intelligently'
  },
}

// --- NOVO: Componente de Imagem Estática do Portal ---
const PortalStaticImage = ({ language }) => {
  const isPt = language === 'pt'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={styles.portalStaticContainer}
    >
      <div className={styles.portalImageWrapper}>
        <Image
          src="/images/portal-solo.jpg"
          alt={isPt ? "AgroFlow Portal Dashboard" : "AgroFlow Portal Dashboard"}
          width={1600}
          height={900}
          className={styles.portalStaticImage}
          priority
          quality={90}
        />
      </div>
    </motion.div>
  )
}

// --- NOVO: layout tipo imagem (Portal + Nuvem + 3 dispositivos) ---
const SystemInfographic = ({ language, content, isDark }) => {
  const textTopLeft =
    language === 'pt'
      ? 'Tenha controlo total sobre a sua plantação, em qualquer lugar do mundo, através do AgroFlow Portal.'
      : 'Have full control of your farm from anywhere in the world through the AgroFlow Portal.'

  const textTopCenter =
    language === 'pt'
      ? 'Para aceder ao Portal, basta um dispositivo com ligação à Internet.'
      : 'To access the Portal, you only need an internet-connected device.'

  const textTopRight =
    language === 'pt'
      ? 'No Portal poderá consultar o estado da plantação e da rega, histórico do sistema, previsão meteorológica, poupança hídrica, entre outras funcionalidades.'
      : 'In the Portal, you can view crop and irrigation status, system history, weather forecasts, water savings, and more.'

  // Ícones de comunicação (light / dark)
  const cloudIconSrc = isDark
    ? '/images/internet-cloud-w.webp'
    : '/images/internet-cloud.webp'

  const waveLeftSrc = isDark
    ? '/images/onda1-w.webp'
    : '/images/onda1.webp'

  const waveRightSrc = isDark
    ? '/images/onda2-w.webp'
    : '/images/onda2.webp'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={styles.infographicSection}
    >
      {/* Top row: 2 bolhas + Portal ao centro */}
      <div className={styles.infographicTopGrid}>
        <div className={styles.infographicBubble}>
          {textTopLeft}
        </div>

        <div className={styles.infographicTopCenter}>
          <div className={styles.portalDevicesWrapper}>
            <Image
              src="/images/Portal.png"
              alt="AgroFlow Portal"
              width={520}
              height={260}
              className={styles.portalDevices}
            />
          </div>
          <span className={styles.portalTag}>{content.portalTitle}</span>
          <div
            className={`${styles.infographicBubble} ${styles.infographicBubbleSmall}`}
          >
            {textTopCenter}
          </div>
        </div>

        <div className={styles.infographicBubble}>
          {textTopRight}
        </div>
      </div>

      {/* Nuvem / Internet (ícone) */}
      <div className={styles.cloudSection}>
        <div className={styles.cloudIcon}>
          <Image
            src={cloudIconSrc}
            alt=""
            width={160}
            height={90}
            className={styles.cloudIconImage}
          />
        </div>
        <span className={styles.cloudLabel}>Internet</span>
      </div>

      {/* Cards inferiores: Solum, Caput, Aqua */}
      <div className={styles.infographicBottomGrid}>
        {/* Solum */}
        <article className={styles.deviceCard}>
          <div className={styles.devicePhotoWrapper}>
            <Image
              src="/images/Solum.png"
              alt={content.solumTitle}
              width={380}
              height={220}
              className={styles.devicePhoto}
            />
            <span className={styles.deviceTag}>{content.solumTitle}</span>
          </div>
          <div className={styles.deviceBubble}>
            {language === 'pt'
              ? 'Instalado diretamente na sua plantação, monitoriza em tempo real o estado do solo.'
              : 'Installed directly in the field, it monitors soil conditions in real time.'}
          </div>
          <div className={styles.deviceExtra}>
            {language === 'pt'
              ? 'Alta eficiência energética, podendo funcionar até 5 anos sem necessidade de carregamento.'
              : 'Highly energy-efficient, operating for up to 5 years without needing to be recharged.'}
          </div>
        </article>

        {/* Caput */}
        <article className={styles.deviceCard}>
          <div className={styles.devicePhotoWrapper}>
            <Image
              src="/images/Caput.png"
              alt={content.caputTitle}
              width={380}
              height={220}
              className={styles.devicePhoto}
            />
            <span className={styles.deviceTag}>{content.caputTitle}</span>
          </div>
          <div className={styles.deviceBubble}>
            {language === 'pt'
              ? 'Deve ser colocado num local com acesso à Internet. Faz a ligação entre os dispositivos instalados no campo e o AgroFlow Portal.'
              : 'It must be placed in a location with internet access. It connects all field devices to the AgroFlow Portal.'}
          </div>
        </article>

        {/* Aqua */}
        <article className={styles.deviceCard}>
          <div className={styles.devicePhotoWrapper}>
            <Image
              src="/images/Aqua.png"
              alt={content.aquaTitle}
              width={380}
              height={220}
              className={styles.devicePhoto}
            />
            <span className={styles.deviceTag}>{content.aquaTitle}</span>
          </div>
          <div className={styles.deviceBubble}>
            {language === 'pt'
              ? 'Controla o acionamento do sistema de rega.'
              : 'Controls the activation of the irrigation system.'}
          </div>
          <div className={styles.deviceExtra}>
            {language === 'pt'
              ? 'Pode ser instalado diretamente no sistema já existente, dispensando a compra de um novo.'
              : 'It can be installed directly in your existing system, eliminating the need to purchase a new one.'}
          </div>
        </article>

        {/* Ícones de comunicação (ondas) entre Solum/Caput e Caput/Aqua */}
        <div className={styles.wirelessWaveLeft} aria-hidden="true">
          <Image
            src={waveLeftSrc}
            alt=""
            width={60}
            height={120}
            className={styles.waveIcon}
          />
        </div>

        <div className={styles.wirelessWaveRight} aria-hidden="true">
          <Image
            src={waveRightSrc}
            alt=""
            width={60}
            height={120}
            className={styles.waveIcon}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Solution() {
  const { language, isDark } = useApp()
  const content = SOLUTION_CONTENT[language]

  return (
    <section
      id="solucao"
      className={`${styles.solution} ${isDark ? styles.dark : ''}`}
    >
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

        {/* Infográfico (Portal + Nuvem + Dispositivos) */}
        <SystemInfographic language={language} content={content} isDark={isDark} />

        {/* Dashboard Static Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.dashboardSection}
        >
          <div className={styles.dashboardHeader}>
            <h2 className={styles.dashboardTitle}>{content.dashboardTitle}</h2>
            <p className={styles.dashboardSubtitle}>{content.dashboardSubtitle}</p>
          </div>

          <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContent}>
              <div className={styles.dashboardDemo}>
                <PortalStaticImage language={language} />
              </div>

              <div className={styles.dashboardFeatures}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.featuresList}>
                    <h3>{content.portalTitle}</h3>
                    <p className={styles.portalDescription}>
                      {content.portalDescription}
                    </p>

                    <div className={styles.portalFeaturesGrid}>
                      {content.portalFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className={styles.portalFeatureItem}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={styles.featureCheck}>✓</div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.resultsCard}>
            <div className={styles.resultsContent}>
              <h2 className={styles.resultsTitle}>
                {content.resultsTitle}
              </h2>

              <div className={styles.resultsGrid}>
                {content.results.map((result, index) => (
                  <div key={index} className={styles.resultItem}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={styles.resultContent}>
                        <div className={styles.resultIcon}>✓</div>
                        <p className={styles.resultText}>{result}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}