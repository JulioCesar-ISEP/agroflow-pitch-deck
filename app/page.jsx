import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Problem from '@/components/Problem/Problem'
import About from '@/components/About/About'
import Solution from '@/components/Solution/Solution'
import Team from '@/components/Team/Team'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import ScrollIndicator from '@/components/ScrollIndicator/ScrollIndicator'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" aria-hidden="true" />

        <Problem />
        <div className="section-divider" aria-hidden="true" />

        <About />
        <div className="section-divider" aria-hidden="true" />

        <Solution />
        <div className="section-divider" aria-hidden="true" />

        <Team />
        <div className="section-divider" aria-hidden="true" />

        <Contact />

        <ScrollIndicator
          sections={['hero', 'problema', 'sobre', 'solucao', 'time', 'contato']}
          autoHideDelay={3500}
        />
      </main>
      <Footer />
    </>
  )
}
