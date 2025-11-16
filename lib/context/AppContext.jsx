// context/AppContext.jsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [language, setLanguage] = useState('pt')
    const [isDark, setIsDark] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    // Inicializar com valores salvos
    useEffect(() => {
        const savedTheme = localStorage.getItem('agroflow-theme')
        const savedLang = localStorage.getItem('agroflow-language')

        if (savedTheme) setIsDark(savedTheme === 'dark')
        if (savedLang) setLanguage(savedLang)

        setIsInitialized(true)
    }, [])

    // Aplicar tema ao documento
    useEffect(() => {
        if (!isInitialized) return

        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        localStorage.setItem('agroflow-theme', isDark ? 'dark' : 'light')
    }, [isDark, isInitialized])

    // Aplicar idioma ao documento
    useEffect(() => {
        if (!isInitialized) return

        document.documentElement.lang = language
        localStorage.setItem('agroflow-language', language)
    }, [language, isInitialized])

    const toggleTheme = () => setIsDark(!isDark)
    const toggleLanguage = () => setLanguage(lang => lang === 'pt' ? 'en' : 'pt')

    const value = {
        language,
        setLanguage,
        isDark,
        setIsDark,
        toggleTheme,
        toggleLanguage,
        isInitialized
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}