// app/layout.jsx
import '../styles/globals.css'
import { AppProvider } from '@/lib/context/AppContext'

export const metadata = {
  title: 'AgroFlow - Smart Irrigation',
  description: 'Revolucionando a agricultura com IoT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}