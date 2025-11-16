// components/ui/FlagIcon/FlagIcon.jsx
'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import styles from './FlagIcon.module.css'

// Evite exportações nomeadas complexas - use default export
const FlagIconComponent = ({ language = 'pt', size = 24 }) => {
    const [imgError, setImgError] = useState(false)

    const flagConfig = useMemo(() => {
        return language === 'pt'
            ? {
                src: '/images/flags/pt-flag.svg',
                alt: 'Bandeira de Portugal',
                cssClass: styles.portugal
            }
            : {
                src: '/images/flags/gb-flag.svg',
                alt: 'Flag of United Kingdom',
                cssClass: styles.english
            }
    }, [language])

    // Fallback para CSS se a imagem falhar
    if (imgError) {
        return (
            <div
                className={`${styles.flagContainer} ${flagConfig.cssClass}`}
                style={{
                    width: size,
                    height: size * 0.75,
                }}
            />
        )
    }

    return (
        <div
            className={styles.flagContainer}
            style={{
                width: size,
                height: size * 0.75,
            }}
        >
            <Image
                src={flagConfig.src}
                alt={flagConfig.alt}
                width={size}
                height={size * 0.75}
                className={styles.flagImage}
                onError={() => setImgError(true)}
                priority={size > 32}
            />
        </div>
    )
}

// Exportação padrão única
export default FlagIconComponent

// Exportações nomeadas separadas (opcional)
export const CSSFlagIcon = ({ language = 'pt', size = 24 }) => (
    <div
        className={`${styles.flagContainer} ${language === 'pt' ? styles.portugal : styles.english}`}
        style={{
            width: size,
            height: size * 0.75,
        }}
    />
)

export const SimpleFlagIcon = CSSFlagIcon