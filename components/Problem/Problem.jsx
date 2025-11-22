// components/Problem/Problem.jsx - Versão Ampliada
'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/lib/context/AppContext'
import styles from './Problem.module.css'

const PROBLEM_DATA = {
  pt: {
    title: 'Desperdício de Água na Agricultura',
    subtitle: 'Um problema que afeta especialmente pequenos e médios agricultores, dificultando o acesso à irrigação inteligente',
    problems: [
      {
        title: 'Setor Agrícola Consome 75% da Água em Portugal',
        description:
          'A agricultura consome 75% da água em Portugal, com sistemas de rega obsoletos que provocam desperdícios significativos. Pequenos agricultores são os mais afetados pela falta de tecnologias acessíveis.',
        icon: '💧',
        severity: 'Crítico',
        stat: '75%',
        source: 'Visão - Estudo Gulbenkian 2021',
        link: 'https://visao.pt/visao_verde/ambiente/2021-03-18-setor-agricola-responsavel-por-75-da-agua-utilizada-em-portugal-estudo/',
      },
      {
        title: 'Barreira Económica para Pequenos Agricultores',
        description:
          'Sistemas tradicionais de irrigação inteligente custam entre 10.000€ e 50.000€, tornando-se inacessíveis para 85% dos agricultores portugueses, que são pequenos e médios produtores.',
        icon: '💰',
        severity: 'Crítico',
        stat: '85%',
        source: 'INE - Agricultura Familiar 2023',
        link: 'https://www.animar-dl.pt/wp-content/uploads/2023/06/modo_visualizacao_revista_afavel.pdf',
      },
      {
        title: 'Desafios na Gestão Hídrica Agrícola',
        description:
          'Portugal enfrenta desafios críticos na gestão da água na agricultura devido à falta de infraestruturas modernas e de tecnologia acessível para pequenos produtores.',
        icon: '🌾',
        severity: 'Crítico',
        stat: 'Crítico',
        source: 'Espaço Visual - Análise Técnica',
        link: 'https://www.espaco-visual.pt/desafios-hidricos-agricultura-portuguesa/',
      },
      {
        title: 'Incompatibilidade com Equipamentos Existentes',
        description:
          '70% dos agricultores não podem modernizar sistemas porque as soluções atuais exigem substituição completa de válvulas e bombas, com custos proibitivos.',
        icon: '🔌',
        severity: 'Alto',
        stat: '70%',
        source: 'Estudo AgroFlow 2024',
        link: 'https://smi.ine.pt/UploadFile/Download/2730',
      },
      {
        title: 'Uso da Água em Portugal',
        description:
          'Estudo da Fundação Gulbenkian sobre padrões de consumo e desperdício de água no país e respetivas consequências para a agricultura familiar.',
        icon: '📊',
        severity: 'Crítico',
        stat: '50%+',
        source: 'Fundação Gulbenkian (PDF)',
        link: 'https://gulbenkian.pt/wp-content/uploads/2020/06/Uso-da-%C3%A1gua-em-Portugal_Estudo-Gulbenkian.pdf',
      },
      {
        title: 'Dependência da Rede Elétrica em Zonas Rurais',
        description:
          '45% das explorações agrícolas em Portugal têm acesso limitado ou inexistente à rede elétrica, impossibilitando sistemas de irrigação automatizados tradicionais.',
        icon: '⚡',
        severity: 'Alto',
        stat: '45%',
        source: 'INE - Estatísticas Agrícolas',
        link: 'https://smi.ine.pt/UploadFile/Download/2730',
      },
      {
        title: 'Consumo e Desperdício na Agricultura',
        description:
          'Análise detalhada de como e onde ocorre o desperdício de água nos sistemas agrícolas portugueses, com foco na pequena agricultura.',
        icon: '⚙️',
        severity: 'Crítico',
        stat: '60%',
        source: 'Acorus - Estudo Técnico',
        link: 'https://acorus.pt/blog/consumo-e-desperdicio-de-agua',
      },
      {
        title: 'Falta de Monitorização Remota',
        description:
          'Agricultores com terrenos dispersos perdem, em média, 3 horas diárias em deslocações para verificar sistemas de irrigação manual.',
        icon: '📱',
        severity: 'Médio',
        stat: '3h/dia',
        source: 'Inquérito AgroFlow',
        link: 'https://repositorio.ipsantarem.pt/bitstream/10400.15/4431/1/OC_DissertMest_AG_abr23.pdf',
      },
      {
        title: 'Desperdício Global de Água',
        description:
          'Dados da FAO sobre desperdício de água a nível mundial, causas e impactos na agricultura, destacando a necessidade de soluções acessíveis.',
        icon: '🌍',
        severity: 'Crítico',
        stat: '75%',
        source: 'FAO - Organização das Nações Unidas',
        link: 'https://openknowledge.fao.org/server/api/core/bitstreams/1a52bc62-2f53-48db-8b35-e0d67ba93053/content',
      },
      {
        title: 'Complexidade Tecnológica',
        description:
          '70% dos agricultores consideram as soluções atuais de irrigação inteligente demasiado complexas para operar sem formação especializada.',
        icon: '🤯',
        severity: 'Médio',
        stat: '70%',
        source: 'Pesquisa AgroFlow',
        link: 'https://lusoai.com/inteligencia-artificial/agricultura-baseada-em-inteligencia-artificial-o-futuro-da-sustentabilidade-em-portugal/',
      },
      {
        title: 'Causas e Impactos Ambientais',
        description:
          'Relatório técnico sobre as causas do desperdício de água e os seus impactos ambientais na agricultura portuguesa.',
        icon: '💧',
        severity: 'Alto',
        stat: 'Severo',
        source: 'Portal Águas e Saneamento',
        link: 'https://aguasesaneamento.pt/acervo-tecnico/desperdicio-de-agua-no-planeta-causas-e-consequencias/',
      },
      {
        title: 'Portugal Desperdiçou 191 Milhões de m³ de Água em 2023',
        description:
          'As perdas nas redes de abastecimento custaram quase 152 milhões de euros, com impacto direto na competitividade dos pequenos agricultores.',
        icon: '🚰',
        severity: 'Alto',
        stat: '191M m³',
        source: 'CNN Portugal',
        link: 'https://cnnportugal.iol.pt/ersar/abastecimento/perdas-nas-redes-de-agua-custam-quase-152-milhoes/20250310/67cea3c8d34e3f0bae9b6bfc',
      },
      {
        title: 'Setor Agrícola é o Maior Consumidor de Água (70%)',
        description:
          'Ficha temática sobre escassez de água analisa a disponibilidade hídrica e pressões sobre os recursos em Portugal continental.',
        icon: '💧',
        severity: 'Crítico',
        stat: '70%',
        source: 'REA - Portal do Estado do Ambiente',
        link: 'https://rea.apambiente.pt/content/escassez-de-%C3%A1gua#:~:text=Os%20setores%20com%20maior%20consumo,agravada%20no%20per%C3%ADodo%20mais%20recente.',
      },
    ],
    watchVideo: 'Ver Vídeo',
    showMore: 'Mostrar Mais',
    showLess: 'Mostrar Menos',
    criticalStats: 'Estatísticas Críticas',
    documentaries: 'Documentários & Estudos',
    problemChip: 'PROBLEMA NACIONAL'
  },
  en: {
    title: 'Water Waste in Agriculture',
    subtitle: 'A problem that especially affects small and medium farmers, limiting access to smart irrigation',
    problems: [
      {
        title: "Agricultural Sector Uses 75% of Portugal's Water",
        description:
          "Agriculture consumes 75% of Portugal's water, with outdated irrigation systems causing significant waste. Small farmers are the most affected by the lack of affordable technologies.",
        icon: '💧',
        severity: 'Critical',
        stat: '75%',
        source: 'Vision - Gulbenkian Study 2021',
        link: 'https://visao.pt/visao_verde/ambiente/2021-03-18-setor-agricola-responsavel-por-75-da-agua-utilizada-em-portugal-estudo/',
      },
      {
        title: 'Economic Barrier for Small Farmers',
        description:
          'Traditional smart irrigation systems cost between €10,000 and €50,000, making them inaccessible for 85% of Portuguese farmers who are small and medium producers.',
        icon: '💰',
        severity: 'Critical',
        stat: '85%',
        source: 'INE - Family Farming 2023',
        link: 'https://www.animar-dl.pt/wp-content/uploads/2023/06/modo_visualizacao_revista_afavel.pdf',
      },
      {
        title: 'Agricultural Water Management Challenges',
        description:
          'Portugal faces major challenges in agricultural water management due to lack of modern infrastructure and accessible technology for small producers.',
        icon: '🌾',
        severity: 'Critical',
        stat: 'Critical',
        source: 'Visual Space - Technical Analysis',
        link: 'https://www.espaco-visual.pt/desafios-hidricos-agricultura-portuguesa/',
      },
      {
        title: 'Incompatibility with Existing Equipment',
        description:
          '70% of farmers cannot modernize systems because current solutions require complete replacement of valves and pumps, with prohibitive costs.',
        icon: '🔌',
        severity: 'High',
        stat: '70%',
        source: 'AgroFlow Study 2024',
        link: 'https://smi.ine.pt/UploadFile/Download/2730',
      },
      {
        title: 'Water Usage in Portugal',
        description:
          'Comprehensive study by the Gulbenkian Foundation on water consumption and waste patterns in Portugal, focusing on family farming.',
        icon: '📊',
        severity: 'Critical',
        stat: '50%+',
        source: 'Gulbenkian Foundation (PDF)',
        link: 'https://gulbenkian.pt/wp-content/uploads/2020/06/Uso-da-%C3%A1gua-em-Portugal_Estudo-Gulbenkian.pdf',
      },
      {
        title: 'Grid Dependency in Rural Areas',
        description:
          '45% of farms in Portugal have limited or no access to electricity, preventing traditional automated irrigation systems.',
        icon: '⚡',
        severity: 'High',
        stat: '45%',
        source: 'INE - Agricultural Statistics',
        link: 'https://smi.ine.pt/UploadFile/Download/2730',
      },
      {
        title: 'Water Consumption and Waste',
        description:
          'Detailed analysis of how and where water waste occurs in Portuguese agricultural systems, with focus on small-scale farms.',
        icon: '⚙️',
        severity: 'Critical',
        stat: '60%',
        source: 'Acorus - Technical Study',
        link: 'https://acorus.pt/blog/consumo-e-desperdicio-de-agua',
      },
      {
        title: 'Lack of Remote Monitoring',
        description:
          'Farmers with dispersed fields lose an average of 3 hours daily traveling to check manual irrigation systems.',
        icon: '📱',
        severity: 'Medium',
        stat: '3h/day',
        source: 'AgroFlow Survey',
        link: 'https://repositorio.ipsantarem.pt/bitstream/10400.15/4431/1/OC_DissertMest_AG_abr23.pdf',
      },
      {
        title: 'Global Water Waste',
        description:
          'FAO data on global water waste, its causes and impacts on agriculture, highlighting the need for affordable solutions.',
        icon: '🌍',
        severity: 'Critical',
        stat: '75%',
        source: 'FAO - United Nations Organization',
        link: 'https://openknowledge.fao.org/server/api/core/bitstreams/1a52bc62-2f53-48db-8b35-e0d67ba93053/content',
      },
      {
        title: 'Technological Complexity',
        description:
          '70% of farmers consider current smart irrigation solutions too complex to operate without specialized training.',
        icon: '🤯',
        severity: 'Medium',
        stat: '70%',
        source: 'AgroFlow Research',
        link: 'https://lusoai.com/inteligencia-artificial/agricultura-baseada-em-inteligencia-artificial-o-futuro-da-sustentabilidade-em-portugal/',
      },
      {
        title: 'Causes and Environmental Impact',
        description:
          'Technical report on the root causes of water waste and its environmental consequences in Portuguese agriculture.',
        icon: '💧',
        severity: 'High',
        stat: 'Severe',
        source: 'Water and Sanitation Portal',
        link: 'https://aguasesaneamento.pt/acervo-tecnico/desperdicio-de-agua-no-planeta-causas-e-consequencias/',
      },
      {
        title: 'Portugal Wasted 191 Million m³ of Water in 2023',
        description:
          'Losses in water supply networks cost nearly €152 million, directly impacting small farmers.',
        icon: '🚰',
        severity: 'High',
        stat: '191M m³',
        source: 'CNN Portugal',
        link: 'https://cnnportugal.iol.pt/ersar/abastecimento/perdas-nas-redes-de-agua-custam-quase-152-milhoes/20250310/67cea3c8d34e3f0bae9b6bfc',
      },
      {
        title: 'Agriculture is the Largest Water Consumer (70%)',
        description:
          'Thematic sheet on water scarcity analyzing water availability and pressures on resources in mainland Portugal.',
        icon: '💧',
        severity: 'Critical',
        stat: '70%',
        source: 'REA - Environment State Portal',
        link: 'https://rea.apambiente.pt/content/escassez-de-%C3%A1gua#:~:text=Os%20setores%20com%20maior%20consumo,agravada%20no%20per%C3%ADodo%20mais%20recente.',
      },
    ],
    watchVideo: 'Watch Video',
    showMore: 'Show More',
    showLess: 'Show Less',
    criticalStats: 'Critical Statistics',
    documentaries: 'Documentaries & Studies',
    problemChip: 'NATIONAL PROBLEM'
  },
}

const FeaturedArticle = ({ problem, language, isDark }) => {
  const handleClick = () => {
    if (problem.link) {
      window.open(problem.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div
        className={`${styles.featuredArticle} ${isDark ? styles.dark : ''}`}
        onClick={handleClick}
        style={{ cursor: problem.link ? 'pointer' : 'default' }}
      >
        <div className={styles.featuredContent}>
          <span className={styles.featuredChip}>
            {language === 'pt' ? 'DESTAQUE PRINCIPAL' : 'MAIN FEATURE'}
          </span>

          <div className={styles.featuredIcon}>{problem.icon}</div>

          <div className={styles.featuredStat}>{problem.stat}</div>

          <h3 className={styles.featuredTitle}>{problem.title}</h3>

          <p className={styles.featuredDescription}>{problem.description}</p>

          <div className={styles.featuredFooter}>
            <span className={styles.featuredSource}>{problem.source}</span>
            {problem.link && (
              <div className={styles.featuredLink}>
                <span>
                  {language === 'pt'
                    ? 'Ver estudo completo'
                    : 'View full study'}
                </span>
                <span className={styles.linkIcon}>↗</span>
              </div>
            )}
          </div>
        </div>

        {/* Glow Effect */}
        <div className={styles.featuredGlow}></div>
      </div>
    </motion.div>
  )
}

const ArticleCard = ({ problem, language, isDark }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (problem.link) {
      window.open(problem.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className={`${styles.articleCard} ${isDark ? styles.dark : ''}`}
        onMouseEnter={() => problem.link && setIsHovered(true)}
        onMouseLeave={() => problem.link && setIsHovered(false)}
        onClick={handleClick}
        style={{ cursor: problem.link ? 'pointer' : 'default' }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>{problem.icon}</div>
          <div className={styles.cardStat}>{problem.stat}</div>
        </div>

        <h4 className={styles.cardTitle}>{problem.title}</h4>

        <p className={styles.cardDescription}>{problem.description}</p>

        <div className={styles.cardFooter}>
          <span className={styles.cardSource}>{problem.source}</span>
          {problem.link && (
            <div
              className={`${styles.cardLink} ${isHovered ? styles.hovered : ''
                }`}
            >
              <span className={styles.linkIcon}>↗</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const VideoItem = ({ video, language, isDark }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const getYouTubeId = (url) => {
    if (!url) return null

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  const videoId = getYouTubeId(video.url)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null

  const handlePlay = () => {
    if (embedUrl) {
      setIsPlaying(true)
    }
  }

  const handleOpenInNewTab = (e) => {
    e.stopPropagation()
    window.open(video.url, '_blank', 'noopener,noreferrer')
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className={`${styles.videoItem} ${isDark ? styles.dark : ''}`}>
        {isPlaying && embedUrl ? (
          <div className={styles.videoEmbed}>
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className={styles.videoThumbnail}
            onClick={handlePlay}
            style={{ cursor: embedUrl ? 'pointer' : 'default' }}
          >
            {video.thumbnail && !imageError ? (
              <>
                {imageLoading && (
                  <div className={styles.videoSkeleton}></div>
                )}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={styles.thumbnailImage}
                  style={{ display: imageLoading ? 'none' : 'block' }}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className={styles.thumbnailPlaceholder}>
                <div className={styles.placeholderIcon}>🖼️</div>
                <span className={styles.placeholderText}>
                  {language === 'pt'
                    ? 'MINIATURA INDISPONÍVEL'
                    : 'THUMBNAIL UNAVAILABLE'}
                </span>
              </div>
            )}
            {embedUrl && (
              <div className={styles.videoOverlay}>
                <motion.div
                  className={styles.playButton}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.playIcon}>▶</span>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {!isPlaying && (
          <div className={styles.videoContent}>
            <div className={styles.videoMeta}>
              <span className={styles.videoChannel}>{video.channel}</span>
              {video.publishedAt && (
                <span className={styles.videoDate}>
                  {new Date(video.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <h4 className={styles.videoTitle}>{video.title}</h4>

            <div className={styles.videoActions}>
              <button
                className={styles.playAction}
                disabled={!embedUrl}
                onClick={handlePlay}
              >
                <span className={styles.playActionIcon}>▶</span>
                {language === 'pt' ? 'Ver Vídeo' : 'Watch Video'}
              </button>
              <button
                className={styles.externalAction}
                onClick={handleOpenInNewTab}
              >
                <span className={styles.externalIcon}>↗</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const SectionHeader = ({
  title,
  expanded,
  onToggle,
  showToggle = true,
  language,
}) => {
  const content = PROBLEM_DATA[language]

  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      {showToggle && (
        <button onClick={onToggle} className={styles.toggleButton}>
          <span>{expanded ? content.showLess : content.showMore}</span>
          <span className={styles.toggleIcon}>
            {expanded ? '▲' : '▼'}
          </span>
        </button>
      )}
    </div>
  )
}

export default function Problem() {
  const { language, isDark } = useApp()
  const [videos, setVideos] = useState([])
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [statsExpanded, setStatsExpanded] = useState(false)
  const [videosExpanded, setVideosExpanded] = useState(false)

  const content = PROBLEM_DATA[language]

  useEffect(() => {
    console.log('🔄 Iniciando busca de vídeos...')

    setLoadingVideos(true)
    try {
      const query = language === 'pt'
        ? 'irrigação sustentável água agricultura pequeno produtor'
        : 'sustainable irrigation water agriculture small farmer'

      const timestamp = Date.now()
      const videosResponse = fetch(`/api/news/yto?q=${encodeURIComponent(query)}&max=12&t=${timestamp}`)

      videosResponse.then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      }).then(videosData => {
        if (videosData?.videos && Array.isArray(videosData.videos)) {
          setVideos(videosData.videos)
        } else {
          throw new Error('Formato de dados inválido')
        }
      }).catch(error => {
        console.error('❌ Erro ao buscar vídeos:', error)
        setVideos([])
      }).finally(() => {
        setLoadingVideos(false)
      })
    } catch (error) {
      console.error('❌ Erro ao buscar vídeos:', error)
      setVideos([])
      setLoadingVideos(false)
    }
  }, [language])

  const fallbackVideos = useMemo(() => [
    {
      id: '1',
      url: 'https://www.youtube.com/watch?v=vp5cf7UfxR0',
      title: language === 'pt'
        ? 'Sistemas de Irrigação Inteligente para Agricultura Sustentável'
        : 'Smart Irrigation Systems for Sustainable Agriculture',
      channel: language === 'pt' ? 'Tecnologia Agrícola' : 'Agricultural Technology',
      thumbnail: '',
      publishedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      url: 'https://www.youtube.com/watch?v=UNBr-VqbZ_g',
      title: language === 'pt'
        ? 'Gestão Eficiente da Água na Agricultura Portuguesa'
        : 'Efficient Water Management in Portuguese Agriculture',
      channel: language === 'pt' ? 'Agricultura Moderna' : 'Modern Agriculture',
      thumbnail: '',
      publishedAt: '2024-01-12T00:00:00Z'
    },
    {
      id: '3',
      url: 'https://www.youtube.com/watch?v=BXnbVvP4y3U',
      title: language === 'pt'
        ? 'Tecnologias para Reduzir Desperdício de Água no Campo'
        : 'Technologies to Reduce Water Waste in the Field',
      channel: language === 'pt' ? 'Inovação no Campo' : 'Field Innovation',
      thumbnail: '',
      publishedAt: '2024-01-10T00:00:00Z'
    }
  ], [language])

  const displayVideos = videos && videos.length > 0 ? videos : fallbackVideos
  const statsToShow = statsExpanded ? content.problems.slice(3) : content.problems.slice(3, 9)
  const videosToShow = videosExpanded ? displayVideos : displayVideos.slice(0, 3)

  return (
    <section
      id="problema"
      className={`
        agroflow-section-shell
        ${isDark ? 'agroflow-section-shell--dark' : 'agroflow-section-shell--light'}
        ${styles.problem}
        ${isDark ? styles.dark : styles.light}
      `}
    >
      {/* Fundo global reutilizável (mesmo padrão do About) */}
      <div className="agroflow-section-bgGradient" />
      <div className="agroflow-section-bgPattern" />

      {/* Círculos decorativos específicos desta secção */}
      <div className={styles.decorativeElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      {/* Conteúdo principal com o mesmo container global do About */}
      <div className={`agroflow-section-content ${styles.container}`}>
        {/* Header Atualizado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <span className={styles.warningChip}>
              <span className={styles.warningIcon}>⚠️</span>
              {content.problemChip}
            </span>

            <h1 className={styles.mainTitle}>{content.title}</h1>

            <p className={styles.mainSubtitle}>{content.subtitle}</p>
          </div>
        </motion.div>

        {/* Featured Section - Mantendo os links importantes */}
        <div className={styles.featuredSection}>
          <div className={styles.featuredGrid}>
            <div className={styles.featuredMain}>
              {content.problems[0] ? (
                <FeaturedArticle problem={content.problems[0]} language={language} isDark={isDark} />
              ) : (
                <div className={styles.placeholderCard}>
                  <p>{language === 'pt' ? 'Dados não disponíveis' : 'Data not available'}</p>
                </div>
              )}
            </div>
            <div className={styles.featuredSidebar}>
              {content.problems.slice(1, 3).map((problem, index) => (
                <ArticleCard key={index} problem={problem} language={language} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>

        {/* Problem Grid - Expandido com mais problemas */}
        <div className={styles.statsSection}>
          <SectionHeader
            title={content.criticalStats}
            expanded={statsExpanded}
            onToggle={() => setStatsExpanded(!statsExpanded)}
            language={language}
          />

          <div className={styles.statsGrid}>
            {statsToShow.map((problem, index) => (
              <div key={index} className={styles.statItem}>
                <ArticleCard problem={problem} language={language} isDark={isDark} />
              </div>
            ))}
          </div>

          {!statsExpanded && content.problems.length > 9 && (
            <div className={styles.showMoreSection}>
              <button
                className={styles.showMoreButton}
                onClick={() => setStatsExpanded(true)}
              >
                <span className={styles.plusIcon}>+</span>
                {language === 'pt'
                  ? `Ver mais ${content.problems.length - 9} estatísticas`
                  : `View ${content.problems.length - 9} more statistics`}
              </button>
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className={styles.videosSection}>
          <SectionHeader
            title={content.documentaries}
            expanded={videosExpanded}
            onToggle={() => setVideosExpanded(!videosExpanded)}
            language={language}
          />

          {loadingVideos ? (
            <div className={styles.videosGrid}>
              {[...Array(3)].map((_, index) => (
                <div key={index} className={styles.videoSkeletonCard}>
                  <div className={styles.videoSkeleton}></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className={styles.videosGrid}>
                {videosToShow.map((video, index) => (
                  <div key={video.id || index} className={styles.videoItemWrapper}>
                    <VideoItem video={video} language={language} isDark={isDark} />
                  </div>
                ))}
              </div>

              {!videosExpanded && displayVideos.length > 3 && (
                <div className={styles.showMoreSection}>
                  <button
                    className={styles.showMoreButton}
                    onClick={() => setVideosExpanded(true)}
                  >
                    <span className={styles.plusIcon}>+</span>
                    {language === 'pt'
                      ? `Ver mais ${displayVideos.length - 3} vídeos`
                      : `View ${displayVideos.length - 3} more videos`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action Final - Conectando com a democratização */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={`${styles.ctaSection} ${isDark ? styles.dark : ''}`}>
            <div className={styles.ctaGlow}></div>

            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                {language === 'pt'
                  ? 'Estes problemas têm solução acessível'
                  : 'These problems have an affordable solution'
                }
              </h2>

              <p className={styles.ctaDescription}>
                {language === 'pt'
                  ? 'A AgroFlow foi criada especificamente para democratizar a irrigação inteligente. Uma solução compatível com equipamentos existentes, alimentada por energia solar e acessível para pequenos e médios agricultores.'
                  : 'AgroFlow was created specifically to democratize smart irrigation. A solution compatible with existing equipment, solar-powered and affordable for small and medium farmers.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}