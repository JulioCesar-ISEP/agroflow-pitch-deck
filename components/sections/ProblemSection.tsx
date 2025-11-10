'use client'

import { 
  Box, Container, Typography, Grid, CardContent, Chip, 
  Button, alpha, Skeleton, Paper, IconButton, Stack, useTheme
} from '@mui/material'
import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/contexts/LanguageContext'
import { useState, useMemo, useEffect } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import WarningIcon from '@mui/icons-material/Warning'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ImageIcon from '@mui/icons-material/Image'

type YTVideo = {
  id: string;
  url: string;
  title: string;
  channel?: string;
  thumbnail?: string;
  publishedAt?: string;
};

interface ProblemData {
  title: string;
  subtitle: string;
  problems: Array<{
    title: string;
    description: string;
    icon: string;
    severity: string;
    stat: string;
    source: string;
    link: string;
  }>;
  watchVideo: string;
  showMore: string;
  showLess: string;
  criticalStats: string;
  documentaries: string;
}

const PROBLEM_DATA: Record<'pt' | 'en', ProblemData> = {
  pt: {
    title: "Desperdício de Água na Agricultura",
    subtitle: "Um problema global com impacto crítico em Portugal",

    problems: [
      {
        title: 'Setor Agrícola Consome 75% da Água em Portugal',
        description: 'A agricultura consome 75% da água em Portugal, com sistemas de rega obsoletos que causam desperdícios significativos.',
        icon: '💧',
        severity: 'Crítico',
        stat: '75%',
        source: 'Visão - Estudo Gulbenkian 2021',
        link: 'https://visao.pt/visao_verde/ambiente/2021-03-18-setor-agricola-responsavel-por-75-da-agua-utilizada-em-portugal-estudo/'
      },
      {
        title: 'Desafios na Gestão Hídrica Agrícola',
        description: 'Portugal enfrenta desafios críticos na gestão da água na agricultura, devido à falta de infraestruturas modernas e tecnologia.',
        icon: '🌾',
        severity: 'Crítico',
        stat: 'Crítico',
        source: 'Espaço Visual - Análise Técnica',
        link: 'https://www.espaco-visual.pt/desafios-hidricos-agricultura-portuguesa/'
      },
      {
        title: 'Uso da Água em Portugal',
        description: 'Estudo da Fundação Gulbenkian sobre padrões de consumo e desperdício de água no país e respetivas consequências.',
        icon: '📊',
        severity: 'Crítico',
        stat: '50%+',
        source: 'Fundação Gulbenkian (PDF)',
        link: 'https://gulbenkian.pt/wp-content/uploads/2020/06/Uso-da-%C3%A1gua-em-Portugal_Estudo-Gulbenkian.pdf'
      },
      {
        title: 'Consumo e Desperdício na Agricultura',
        description: 'Análise detalhada sobre como e onde ocorre o desperdício de água nos sistemas agrícolas portugueses.',
        icon: '⚙️',
        severity: 'Crítico',
        stat: '60%',
        source: 'Acorus - Estudo Técnico',
        link: 'https://acorus.pt/blog/consumo-e-desperdicio-de-agua'
      },
      {
        title: 'Desperdício Global de Água',
        description: 'Dados da FAO sobre desperdício de água a nível mundial, causas e impactos na agricultura.',
        icon: '🌍',
        severity: 'Crítico',
        stat: '75%',
        source: 'FAO - Organização das Nações Unidas',
        link: 'https://openknowledge.fao.org/server/api/core/bitstreams/1a52bc62-2f53-48db-8b35-e0d67ba93053/content'
      },
      {
        title: 'Causas e Impactos Ambientais',
        description: 'Relatório técnico sobre as causas do desperdício de água e os seus impactos ambientais.',
        icon: '💧',
        severity: 'Alto',
        stat: 'Severo',
        source: 'Portal Águas e Saneamento',
        link: 'https://aguasesaneamento.pt/acervo-tecnico/desperdicio-de-agua-no-planeta-causas-e-consequencias/'
      },
      {
        title: 'Portugal desperdiçou 191 milhões de m³ de água em 2023',
        description: 'As perdas nas redes de abastecimento custaram quase 152 milhões de euros.',
        icon: '🚰',
        severity: 'Alto',
        stat: '191M m³',
        source: 'CNN Portugal',
        link: 'https://cnnportugal.iol.pt/ersar/abastecimento/perdas-nas-redes-de-agua-custam-quase-152-milhoes/20250310/67cea3c8d34e3f0bae9b6bfc'
      },
      {
        title: 'Setor Agrícola é o Maior Consumidor de Água (70%)',
        description: 'Ficha temática sobre escassez de água analisa a disponibilidade hídrica e pressões sobre os recursos em Portugal continental.',
        icon: '💧',
        severity: 'Crítico',
        stat: '70%',
        source: 'REA - Portal do Estado do Ambiente',
        link: 'https://rea.apambiente.pt/content/escassez-de-%C3%A1gua#:~:text=Os%20setores%20com%20maior%20consumo,agravada%20no%20per%C3%ADodo%20mais%20recente.'
      }
    ],

    watchVideo: 'Ver Vídeo',
    showMore: 'Mostrar Mais',
    showLess: 'Mostrar Menos',
    criticalStats: 'Estatísticas Críticas',
    documentaries: 'Documentários & Estudos'
  },
  en: {
    title: "Water Waste in Agriculture",
    subtitle: "A global issue with critical impact in Portugal",

    problems: [
      {
        title: 'Agricultural Sector Uses 75% of Portugal’s Water',
        description: 'Agriculture consumes 75% of Portugal’s water, with outdated irrigation systems causing significant waste.',
        icon: '💧',
        severity: 'Critical',
        stat: '75%',
        source: 'Vision - Gulbenkian Study 2021',
        link: 'https://visao.pt/visao_verde/ambiente/2021-03-18-setor-agricola-responsavel-por-75-da-agua-utilizada-em-portugal-estudo/'
      },
      {
        title: 'Agricultural Water Management Challenges',
        description: 'Portugal faces major challenges in agricultural water management due to lack of modern infrastructure and technology.',
        icon: '🌾',
        severity: 'Critical',
        stat: 'Critical',
        source: 'Visual Space - Technical Analysis',
        link: 'https://www.espaco-visual.pt/desafios-hidricos-agricultura-portuguesa/'
      },
      {
        title: 'Water Usage in Portugal',
        description: 'Comprehensive study by the Gulbenkian Foundation on water consumption and waste patterns in Portugal.',
        icon: '📊',
        severity: 'Critical',
        stat: '50%+',
        source: 'Gulbenkian Foundation (PDF)',
        link: 'https://gulbenkian.pt/wp-content/uploads/2020/06/Uso-da-%C3%A1gua-em-Portugal_Estudo-Gulbenkian.pdf'
      },
      {
        title: 'Water Consumption and Waste',
        description: 'Detailed analysis of how and where water waste occurs in Portuguese agricultural systems.',
        icon: '⚙️',
        severity: 'Critical',
        stat: '60%',
        source: 'Acorus - Technical Study',
        link: 'https://acorus.pt/blog/consumo-e-desperdicio-de-agua'
      },
      {
        title: 'Global Water Waste',
        description: 'FAO data on global water waste, its causes and consequences for agriculture.',
        icon: '🌍',
        severity: 'Critical',
        stat: '75%',
        source: 'FAO - United Nations Organization',
        link: 'https://openknowledge.fao.org/server/api/core/bitstreams/1a52bc62-2f53-48db-8b35-e0d67ba93053/content'
      },
      {
        title: 'Causes and Environmental Impact',
        description: 'Technical report on the root causes of water waste and its environmental consequences.',
        icon: '💧',
        severity: 'High',
        stat: 'Severe',
        source: 'Water and Sanitation Portal',
        link: 'https://aguasesaneamento.pt/acervo-tecnico/desperdicio-de-agua-no-planeta-causas-e-consequencias/'
      },
      {
        title: 'Portugal Wasted 191 Million m³ of Water in 2023',
        description: 'Losses in water supply networks cost nearly €152 million.',
        icon: '🚰',
        severity: 'High',
        stat: '191M m³',
        source: 'CNN Portugal',
        link: 'https://cnnportugal.iol.pt/ersar/abastecimento/perdas-nas-redes-de-agua-custam-quase-152-milhoes/20250310/67cea3c8d34e3f0bae9b6bfc'
      },
      {
        title: 'Agriculture is the Largest Water Consumer (70%)',
        description: 'Thematic sheet on water scarcity analyzes water availability and pressures on resources in mainland Portugal.',
        icon: '💧',
        severity: 'Critical',
        stat: '70%',
        source: 'REA - Environment State Portal',
        link: 'https://rea.apambiente.pt/content/escassez-de-%C3%A1gua#:~:text=Os%20setores%20com%20maior%20consumo,agravada%20no%20per%C3%ADodo%20mais%20recente.'
      }
    ],

    watchVideo: 'Watch Video',
    showMore: 'Show More',
    showLess: 'Show Less',
    criticalStats: 'Critical Statistics',
    documentaries: 'Documentaries & Studies'
  }
};

// Componentes com estilo da Hero Section
interface FeaturedArticleProps {
  problem: ProblemData['problems'][0];
  language: 'pt' | 'en';
  theme: any;
}

const FeaturedArticle = ({ problem, language, theme }: FeaturedArticleProps) => {
  const isDark = theme.palette.mode === 'dark';
  
  const handleClick = () => {
    if (problem.link) {
      window.open(problem.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Paper
        sx={{
          overflow: 'hidden',
          background: isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`
            : `linear-gradient(135deg, ${alpha('#04653B', 0.95)} 0%, ${alpha('#1B5E20', 0.7)} 100%)`,
          color: '#fff',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: problem.link ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: 3,
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.2)',
          border: `2px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          '&:hover': problem.link ? {
            transform: 'translateY(-8px)',
            boxShadow: `0 30px 80px ${alpha(theme.palette.primary.main, 0.4)}`,
          } : {}
        }}
        onClick={handleClick}
      >
        <Box sx={{ 
          p: { xs: 4, md: 5 }, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2
        }}>
          <Chip
            label={language === 'pt' ? 'DESTAQUE PRINCIPAL' : 'MAIN FEATURE'}
            sx={{
              backgroundColor: alpha(theme.palette.secondary.light, 0.2),
              color: theme.palette.secondary.light,
              fontWeight: 800,
              fontSize: '0.75rem',
              width: 'fit-content',
              mb: 3,
              border: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
              textShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.3)}`,
            }}
          />
          
          <Box sx={{ fontSize: '4rem', mb: 3, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
            {problem.icon}
          </Box>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '4rem' },
              fontWeight: 900,
              mb: 2,
              lineHeight: 1.1,
              color: '#ffffff',
              textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
              background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
          >
            {problem.stat}
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              fontWeight: 800,
              mb: 3,
              opacity: 0.95,
              color: '#ffffff',
              lineHeight: 1.3,
            }}
          >
            {problem.title}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              opacity: 0.9,
              flexGrow: 1,
              color: '#ffffff',
              fontSize: '1.1rem',
            }}
          >
            {problem.description}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            pt: 3,
            borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.2)}`
          }}>
            <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 600, color: theme.palette.secondary.light }}>
              {problem.source}
            </Typography>
            {problem.link && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600, color: theme.palette.secondary.light }}>
                  {language === 'pt' ? 'Ver estudo completo' : 'View full study'}
                </Typography>
                <OpenInNewIcon sx={{ fontSize: 20, color: theme.palette.secondary.light }} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Glow Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.15)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </Paper>
    </motion.div>
  );
};

interface ArticleCardProps {
  problem: ProblemData['problems'][0];
  language: 'pt' | 'en';
  theme: any;
}

const ArticleCard = ({ problem, language, theme }: ArticleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme.palette.mode === 'dark';
  
  const handleClick = () => {
    if (problem.link) {
      window.open(problem.link, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Paper
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha('#04653B', 0.08)} 0%, ${alpha('#1B5E20', 0.04)} 100%)`,
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${alpha(theme.palette.secondary.light, 0.15)}`,
          borderRadius: 2.5,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: problem.link ? 'pointer' : 'default',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': problem.link ? {
            transform: 'translateY(-6px)',
            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderColor: alpha(theme.palette.secondary.light, 0.3),
            background: isDark
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
              : `linear-gradient(135deg, ${alpha('#04653B', 0.12)} 0%, ${alpha('#1B5E20', 0.08)} 100%)`,
          } : {}
        }}
        onMouseEnter={() => problem.link && setIsHovered(true)}
        onMouseLeave={() => problem.link && setIsHovered(false)}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 2.5 }}>
          <Box sx={{ 
            fontSize: '2.5rem', 
            flexShrink: 0,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
          }}>
            {problem.icon}
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2.8rem',
              fontWeight: 900,
              background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1,
              textShadow: `0 2px 8px ${alpha(theme.palette.secondary.main, 0.3)}`,
            }}
          >
            {problem.stat}
          </Typography>
        </Box>
        
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: isDark ? theme.palette.common.white : '#ffffff',
            fontSize: '1.2rem',
            lineHeight: 1.3,
            mb: 2,
            textShadow: isDark ? 'none' : `0 2px 8px ${alpha('#04653B', 0.3)}`,
          }}
        >
          {problem.title}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            flexGrow: 1,
            color: isDark ? alpha(theme.palette.common.white, 0.9) : alpha('#ffffff', 0.9),
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {problem.description}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          pt: 2.5, 
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}` 
        }}>
          <Typography variant="caption" sx={{ 
            fontWeight: 600, 
            fontSize: '0.8rem',
            color: alpha(theme.palette.secondary.light, 0.9),
          }}>
            {problem.source}
          </Typography>
          {problem.link && (
            <Box sx={{ 
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)', 
              transition: 'transform 0.2s',
              color: theme.palette.secondary.light
            }}>
              <OpenInNewIcon sx={{ fontSize: 18 }} />
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

interface VideoItemProps {
  video: YTVideo;
  language: 'pt' | 'en';
  theme: any;
}

const VideoItem = ({ video, language, theme }: VideoItemProps) => {
  const content = PROBLEM_DATA[language];
  const isDark = theme.palette.mode === 'dark';
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/,
      /youtu\.be\/([^?]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };
  
  const videoId = getYouTubeId(video.url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  
  const handlePlay = () => {
    if (embedUrl) {
      setIsPlaying(true);
    }
  };
  
  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(video.url, '_blank', 'noopener,noreferrer');
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Paper
        sx={{
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha('#04653B', 0.08)} 0%, ${alpha('#1B5E20', 0.04)} 100%)`,
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${alpha(theme.palette.secondary.light, 0.15)}`,
          borderRadius: 2.5,
          '&:hover': embedUrl ? {
            transform: 'translateY(-6px)',
            boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderColor: alpha(theme.palette.secondary.light, 0.3),
          } : {}
        }}
      >
        {isPlaying && embedUrl ? (
          <Box sx={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={video.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: 200,
              backgroundColor: alpha(theme.palette.secondary.light, 0.1),
              cursor: embedUrl ? 'pointer' : 'default',
              '&:hover .play-button': embedUrl ? {
                transform: 'scale(1.15)'
              } : {}
            }}
            onClick={handlePlay}
          >
            {video.thumbnail && !imageError ? (
              <>
                {imageLoading && (
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={200}
                    sx={{ 
                      position: 'absolute',
                      bgcolor: alpha(theme.palette.secondary.light, 0.2)
                    }} 
                  />
                )}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: imageLoading ? 'none' : 'block'
                  }}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <Box sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.6)} 100%)`,
                flexDirection: 'column',
                color: 'white',
                textAlign: 'center',
                p: 2
              }}>
                <ImageIcon sx={{ fontSize: 48, mb: 2, opacity: 0.8 }} />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 600,
                    lineHeight: 1,
                    opacity: 0.9
                  }}
                >
                  {language === 'pt' ? 'MINIATURA INDISPONÍVEL' : 'THUMBNAIL UNAVAILABLE'}
                </Typography>
              </Box>
            )}
            {embedUrl && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: alpha(theme.palette.primary.main, 0.3),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 1 }
                }}
              >
                <Box
                  className="play-button"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: alpha(theme.palette.secondary.light, 0.9),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 30 }} />
                </Box>
              </Box>
            )}
          </Box>
        )}
        
        {!isPlaying && (
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.secondary.light }}>
                {video.channel}
              </Typography>
              {video.publishedAt && (
                <Typography variant="caption" sx={{ color: alpha(theme.palette.secondary.light, 0.7) }}>
                  {new Date(video.publishedAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? theme.palette.common.white : '#ffffff',
                fontSize: '1rem',
                lineHeight: 1.3,
                mb: 2,
                minHeight: '2.6rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textShadow: isDark ? 'none' : `0 2px 8px ${alpha('#04653B', 0.3)}`,
              }}
            >
              {video.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button
                size="small"
                startIcon={<PlayArrowIcon />}
                disabled={!embedUrl}
                sx={{
                  color: embedUrl ? theme.palette.secondary.light : alpha(theme.palette.secondary.light, 0.5),
                  fontWeight: 600,
                  padding: '6px 12px'
                }}
                onClick={handlePlay}
              >
                {content.watchVideo}
              </Button>
              <IconButton 
                size="small" 
                onClick={handleOpenInNewTab}
                sx={{ color: theme.palette.secondary.light }}
              >
                <OpenInNewIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </CardContent>
        )}
      </Paper>
    </motion.div>
  );
};

interface SectionHeaderProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  showToggle?: boolean;
  language: 'pt' | 'en';
  theme: any;
}

const SectionHeader = ({ 
  title, 
  expanded, 
  onToggle, 
  showToggle = true,
  language,
  theme
}: SectionHeaderProps) => {
  const content = PROBLEM_DATA[language];
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          color: isDark ? theme.palette.common.white : '#ffffff',
          fontSize: { xs: '2rem', md: '2.5rem' },
          textShadow: isDark ? 'none' : `0 4px 20px ${alpha('#04653B', 0.5)}`,
          background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text'
        }}
      >
        {title}
      </Typography>
      
      {showToggle && (
        <Button
          onClick={onToggle}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            color: theme.palette.secondary.light,
            fontWeight: 700,
            border: `2px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
            px: 2,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.light, 0.1),
              borderColor: theme.palette.secondary.light,
            }
          }}
        >
          {expanded ? content.showLess : content.showMore}
        </Button>
      )}
    </Box>
  );
};

export default function StyledProblemSection() {
  const { language } = useLanguage();
  const theme = useTheme();
  const content = PROBLEM_DATA[language];
  const isDark = theme.palette.mode === 'dark';

  const [videos, setVideos] = useState<YTVideo[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [videosExpanded, setVideosExpanded] = useState(false);

  const scrollToNext = () => {
    const nextSection = document.getElementById('sobre')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    console.log('🔄 Iniciando busca de vídeos...');
    
    setLoadingVideos(true);
    try {
      const query = language === 'pt' 
        ? 'irrigação sustentável água agricultura' 
        : 'sustainable irrigation water agriculture';
      
      const timestamp = Date.now();
      const videosResponse = fetch(`/api/news/yto?q=${encodeURIComponent(query)}&max=12&t=${timestamp}`);
      
      videosResponse.then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then(videosData => {
        if (videosData?.videos && Array.isArray(videosData.videos)) {
          setVideos(videosData.videos);
        } else {
          throw new Error('Formato de dados inválido');
        }
      }).catch(error => {
        console.error('❌ Erro ao buscar vídeos:', error);
        setVideos([]);
      }).finally(() => {
        setLoadingVideos(false);
      });
    } catch (error) {
      console.error('❌ Erro ao buscar vídeos:', error);
      setVideos([]);
      setLoadingVideos(false);
    }
  }, [language]);

  const fallbackVideos = useMemo((): YTVideo[] => [
    {
      id: '1',
      url: 'https://www.youtube.com/watch?v=vp5cf7UfxR0',
      title: language === 'pt' ? 'Sistemas de Irrigação Inteligente para Agricultura Sustentável' : 'Smart Irrigation Systems for Sustainable Agriculture',
      channel: language === 'pt' ? 'Tecnologia Agrícola' : 'Agricultural Technology',
      thumbnail: '',
      publishedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      url: 'https://www.youtube.com/watch?v=UNBr-VqbZ_g',
      title: language === 'pt' ? 'Gestão Eficiente da Água na Agricultura Portuguesa' : 'Efficient Water Management in Portuguese Agriculture',
      channel: language === 'pt' ? 'Agricultura Moderna' : 'Modern Agriculture',
      thumbnail: '',
      publishedAt: '2024-01-12T00:00:00Z'
    },
    {
      id: '3',
      url: 'https://www.youtube.com/watch?v=BXnbVvP4y3U',
      title: language === 'pt' ? 'Tecnologias para Reduzir Desperdício de Água no Campo' : 'Technologies to Reduce Water Waste in the Field',
      channel: language === 'pt' ? 'Inovação no Campo' : 'Field Innovation',
      thumbnail: '',
      publishedAt: '2024-01-10T00:00:00Z'
    }
  ], [language]);

  const displayVideos = videos && videos.length > 0 ? videos : fallbackVideos;

  const statsToShow = statsExpanded ? content.problems.slice(3) : content.problems.slice(3, 6);
  const videosToShow = videosExpanded ? displayVideos : displayVideos.slice(0, 3);

  return (
    <Box
      id="problema"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: isDark ? theme.palette.text.primary : '#ffffffa6',
        py: 8,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`
          : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Background Image - Apenas no tema claro */}
      {!isDark && (
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
      )}

      {/* Gradient Overlay Principal - Apenas no tema claro */}
      {!isDark && (
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
      )}

      {/* Overlay Adicional para Profundidade */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? `
                radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)
              `
            : `
                radial-gradient(circle at 20% 50%, ${alpha('#41B360', 0.08)} 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, ${alpha('#1EC5FA', 0.08)} 0%, transparent 50%)
              `,
          zIndex: 2,
        }}
      />

      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<WarningIcon />}
              label={language === 'pt' ? 'Problema Crítico Nacional' : 'National Critical Problem'}
              sx={{
                backgroundColor: alpha('#F44336', 0.2),
                color: isDark ? theme.palette.common.white : '#ffffff',
                fontWeight: 800,
                fontSize: '0.95rem',
                py: 1.5,
                px: 2,
                mb: 4,
                border: `1px solid ${alpha('#F44336', 0.3)}`,
                textShadow: isDark ? 'none' : `0 2px 8px ${alpha('#F44336', 0.3)}`,
              }}
            />
            
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                mb: 3,
                fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.5rem' },
                fontWeight: 900,
                color: isDark ? theme.palette.common.white : '#ffffff',
                lineHeight: 1.05,
                textShadow: isDark ? 'none' : `0 4px 20px ${alpha('#04653B', 0.5)}`,
                letterSpacing: '-0.5px',
              }}
            >
              {content.title}
            </Typography>
            
            <Typography
              variant="h4"
              component="p"
              align="center"
              sx={{
                mb: 6,
                color: isDark ? alpha(theme.palette.common.white, 0.9) : alpha('#ffffff', 0.9),
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: 500,
                lineHeight: 1.6,
                textShadow: isDark ? 'none' : `0 2px 8px ${alpha('#04653B', 0.3)}`,
              }}
            >
              {content.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Featured Section */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {content.problems[0] ? (
                <FeaturedArticle problem={content.problems[0]} language={language} theme={theme} />
              ) : (
                <Paper sx={{ p: 4, textAlign: 'center', background: 'rgba(255,255,255,0.1)' }}>
                  <Typography color="text.secondary">
                    {language === 'pt' ? 'Dados não disponíveis' : 'Data not available'}
                  </Typography>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3} sx={{ height: '100%' }}>
                {content.problems.slice(1, 3).map((problem, index) => (
                  <ArticleCard key={index} problem={problem} language={language} theme={theme} />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Problem Grid */}
        <Box sx={{ mb: 10 }}>
          <SectionHeader 
            title={content.criticalStats}
            expanded={statsExpanded}
            onToggle={() => setStatsExpanded(!statsExpanded)}
            language={language}
            theme={theme}
          />
          
          <Grid container spacing={3}>
            {statsToShow.map((problem, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ArticleCard problem={problem} language={language} theme={theme} />
              </Grid>
            ))}
          </Grid>

          {!statsExpanded && content.problems.length > 6 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setStatsExpanded(true)}
                sx={{
                  color: theme.palette.secondary.light,
                  borderColor: theme.palette.secondary.light,
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.light, 0.1),
                    borderColor: theme.palette.secondary.main,
                  }
                }}
              >
                {language === 'pt' ? `Ver mais ${content.problems.length - 6} estatísticas` : `View ${content.problems.length - 6} more statistics`}
              </Button>
            </Box>
          )}
        </Box>

        {/* Videos Section */}
        <Box sx={{ mb: 8 }}>
          <SectionHeader 
            title={content.documentaries}
            expanded={videosExpanded}
            onToggle={() => setVideosExpanded(!videosExpanded)}
            language={language}
            theme={theme}
          />
          
          {loadingVideos ? (
            <Grid container spacing={3}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.secondary.light, 0.1) }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Grid container spacing={3}>
                {videosToShow.map((video, index) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id || index}>
                    <VideoItem video={video} language={language} theme={theme} />
                  </Grid>
                ))}
              </Grid>

              {!videosExpanded && displayVideos.length > 3 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setVideosExpanded(true)}
                    sx={{
                      color: theme.palette.secondary.light,
                      borderColor: theme.palette.secondary.light,
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.light, 0.1),
                        borderColor: theme.palette.secondary.main,
                      }
                    }}
                  >
                    {language === 'pt' ? `Ver mais ${displayVideos.length - 3} vídeos` : `View ${displayVideos.length - 3} more videos`}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Call to Action Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Paper
            sx={{
              mt: 6,
              p: 2,
              textAlign: 'center',
              background: isDark
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
                : `linear-gradient(135deg, ${alpha('#04653B', 0.2)} 0%, ${alpha('#1B5E20', 0.15)} 100%)`,
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.1)} 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: isDark ? theme.palette.common.white : '#ffffff',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  textShadow: isDark ? 'none' : `0 4px 20px ${alpha('#04653B', 0.5)}`,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                }}
              >
                {language === 'pt' 
                  ? 'Juntos podemos resolver este problema' 
                  : 'Together we can solve this problem'
                }
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: isDark ? alpha(theme.palette.common.white, 0.9) : alpha('#ffffff', 0.9),
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  textShadow: isDark ? 'none' : `0 2px 8px ${alpha('#04653B', 0.3)}`,
                }}
              >
                {language === 'pt'
                  ? 'A AgroFlow está desenvolvendo soluções inteligentes para combater o desperdício de água na agricultura. Descubra como podemos ajudar.'
                  : 'AgroFlow is developing intelligent solutions to combat water waste in agriculture. Discover how we can help.'
                }
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '-45px',
            left: '50%',
            transform:'translateX(-50%)',
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
      </Container>
    </Box>
  );
}