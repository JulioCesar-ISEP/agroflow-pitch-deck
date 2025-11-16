'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ScrollIndicator.module.css'

export default function ScrollIndicator({ sections, autoHideDelay = 2500 }) {
    const [currentSection, setCurrentSection] = useState(null)
    const [nextSectionId, setNextSectionId] = useState(null)
    const [visible, setVisible] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Marcar que já estamos no client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Observar qual secção está mais visível
    useEffect(() => {
        if (!sections?.length || typeof window === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                let mostVisible = null
                let maxRatio = 0

                for (const entry of entries) {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio
                        mostVisible = entry
                    }
                }

                if (mostVisible?.target?.id) {
                    setCurrentSection(mostVisible.target.id)
                }
            },
            {
                threshold: [0.35, 0.5, 0.75],
            }
        )

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [sections])

    // A partir da currentSection, calcular a próxima secção
    useEffect(() => {
        if (!sections?.length) {
            setNextSectionId(null)
            return
        }

        const safeCurrent = currentSection ?? sections[0]
        const index = sections.indexOf(safeCurrent)

        if (index >= 0 && index < sections.length - 1) {
            setNextSectionId(sections[index + 1])
        } else {
            setNextSectionId(null)
        }
    }, [sections, currentSection])

    // Controlar visibilidade (aparece ao entrar numa secção, some depois de X ms)
    useEffect(() => {
        if (!isMounted || !nextSectionId) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timeout = setTimeout(() => {
            setVisible(false)
        }, autoHideDelay)

        return () => clearTimeout(timeout)
    }, [nextSectionId, autoHideDelay, isMounted])

    const handleClick = () => {
        if (!nextSectionId) return
        const el = document.getElementById(nextSectionId)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    if (!isMounted || !sections?.length) return null

    return (
        <AnimatePresence>
            {visible && nextSectionId && (
                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        onClick={handleClick}
                        className={styles.scrollButton}
                        aria-label="Scroll to next section"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 5V19M12 19L19 12M12 19L5 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
