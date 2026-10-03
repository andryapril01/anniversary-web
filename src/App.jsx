import { useEffect, useRef, useState } from 'react'
import anniversaryMusic from './assets/music/Ed Sheeran - Photograph (Official Music Video).mp3'
import EmptyPage from './pages/EmptyPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LetterPage from './pages/LetterPage.jsx'
import MemoriesPage from './pages/MemoriesPage.jsx'
import OurStoryPage from './pages/OurStoryPage.jsx'
import './App.css'

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'gallery', label: 'Flowers' },
  { id: 'memories', label: 'Memories' },
  { id: 'letter', label: 'Letter', icon: '💌' },
]

const emptySections = navigation.filter(
  ({ id }) => !['home', 'our-story', 'gallery', 'memories', 'letter'].includes(id),
)

function getInitialSection() {
  const hash = window.location.hash.slice(1)
  return navigation.some(({ id }) => id === hash) ? hash : 'home'
}

function App() {
  const audioRef = useRef(null)
  const [activeSection, setActiveSection] = useState(getInitialSection)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.55
      const visibleSection = navigation.find(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return false

        const { top, bottom } = section.getBoundingClientRect()
        return top <= marker && bottom > marker
      })

      if (visibleSection) setActiveSection(visibleSection.id)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play()
      .then(() => {
        setIsMusicPlaying(true)
        setAutoplayBlocked(false)
      })
      .catch(() => {
        setIsMusicPlaying(false)
        setAutoplayBlocked(true)
      })
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      await audio.play()
      setAutoplayBlocked(false)
    } catch {
      setAutoplayBlocked(true)
    }
  }

  return (
    <div className="site-shell">
      <audio
        ref={audioRef}
        src={anniversaryMusic}
        loop
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Andry dan Willy - Home">
          <span className="brand-heart" aria-hidden="true">♥</span>
          <span>Andry &amp; Willy</span>
        </a>
        <nav className="main-nav" aria-label="Navigasi utama">
          {navigation.map(({ id, label, icon }) => (
            <a
              className={`nav-link${activeSection === id ? ' is-active' : ''}${icon ? ' letter-link' : ''}`}
              href={`#${id}`}
              key={id}
              aria-label={icon ? label : undefined}
              aria-current={activeSection === id ? 'page' : undefined}
              title={icon ? label : undefined}
            >
              {icon ? <span aria-hidden="true">{icon}</span> : label}
            </a>
          ))}
        </nav>
      </header>

      <main className="one-page-content">
        <HomePage />
        <OurStoryPage />
        <GalleryPage />
        <MemoriesPage />
        <LetterPage />
        {emptySections.map(({ id, label }) => (
          <EmptyPage id={id} label={label} key={id} />
        ))}
      </main>

      <button
        className={`music-toggle${isMusicPlaying ? ' is-playing' : ''}`}
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? 'Jeda musik' : 'Putar musik'}
        title={
          autoplayBlocked && !isMusicPlaying
            ? 'Klik untuk mulai memutar musik'
            : isMusicPlaying
              ? 'Jeda musik'
              : 'Putar musik'
        }
      >
        <span className="music-icon" aria-hidden="true">
          {isMusicPlaying ? '♫' : '♪'}
        </span>
        <span className="music-label">
          {autoplayBlocked && !isMusicPlaying
            ? 'Putar musik'
            : isMusicPlaying
              ? 'Music on'
              : 'Music off'}
        </span>
      </button>
    </div>
  )
}

export default App
