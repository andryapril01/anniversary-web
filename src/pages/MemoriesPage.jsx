import memoriesBackground from '../assets/picture/memories/background2.jpg'
import aeonPhoto from '../assets/picture/memories/Aeon.jpeg'
import baduyPhoto from '../assets/picture/memories/baduy 33.jpeg'
import landscapePhoto from '../assets/picture/memories/landscape.jpeg'
import studioPhoto from '../assets/picture/memories/studio.jpeg'
import trainPhoto from '../assets/picture/memories/trans kereta.jpeg'
import willyPhoto from '../assets/picture/memories/willy.jpeg'
import carPhoto from '../assets/picture/memories/transmobil.jpeg'
import snowPhoto from '../assets/picture/memories/trans salju.jpeg'

const memories = [
  aeonPhoto,
  baduyPhoto,
  landscapePhoto,
  studioPhoto,
  trainPhoto,
  willyPhoto,
  carPhoto,
  snowPhoto,
]

export default function MemoriesPage() {
  return (
    <section
      className="memories-page"
      id="memories"
      aria-labelledby="memories-title"
      style={{ backgroundImage: `url("${memoriesBackground}")` }}
    >
      <div className="memories-overlay" aria-hidden="true" />
      <div className="memories-heading">
        <p className="memories-eyebrow">LITTLE MOMENTS, BIG LOVE</p>
        <h2 className="memories-title" id="memories-title">Our Memories</h2>
        <p className="memories-subtitle">a few favorite moments with you ♡</p>
      </div>

      <div className="memories-marquee" aria-label="Foto-foto kenangan yang bergerak">
        <div className="memories-track">
          {[false, true].map((isLoopCopy) => (
            <div
              className="memories-group"
              key={isLoopCopy ? 'duplicate' : 'original'}
              aria-hidden={isLoopCopy}
            >
              {memories.map((src, index) => (
                <figure className="memory-card" key={src}>
                  <div className="memory-photo-wrap">
                    <img
                      className="memory-photo"
                      src={src}
                      alt={isLoopCopy ? '' : `Foto kenangan Andry dan Willy nomor ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                  <figcaption>
                    <span>memory no. {String(index + 1).padStart(2, '0')}</span>
                    <span className="memory-heart" aria-hidden="true">♥</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="memories-footer">TO BE CONTINUED, WITH YOU</p>
    </section>
  )
}
