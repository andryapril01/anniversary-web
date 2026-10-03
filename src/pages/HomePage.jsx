import { useState } from 'react'
import couplePhoto from '../assets/picture/Andry dan Willy.jpg'
import couplePhotoBack from '../assets/picture/Andry dan Willy belakang.jpg'
import flowerPhoto from '../assets/picture/background.jpg'

const decorations = [
  { symbol: '★', className: 'star star-one' },
  { symbol: '♥', className: 'heart heart-one' },
  { symbol: '✦', className: 'star star-two' },
  { symbol: '♥', className: 'heart heart-two' },
  { symbol: '★', className: 'star star-three' },
  { symbol: '♥', className: 'heart heart-three' },
  { symbol: '✦', className: 'star star-four' },
  { symbol: '★', className: 'star star-five' },
  { symbol: '♥', className: 'heart heart-four' },
]

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section className="love-page" id="home">
      <div
        className="backdrop"
        style={{ backgroundImage: `url("${flowerPhoto}")` }}
        aria-hidden="true"
      />
      <div className="backdrop-wash" aria-hidden="true" />

      <div className="love-poster">
        <p className="poster-tag">A LITTLE LOVE STORY</p>
        <p className="poster-names">#ANDRY&amp;WILLY</p>

        <div className="photo-frame">
          <button
            className={`photo-flip${isFlipped ? ' is-flipped' : ''}`}
            type="button"
            aria-label={
              isFlipped
                ? 'Balikkan kartu ke foto depan'
                : 'Balikkan kartu untuk melihat pesan anniversary'
            }
            aria-pressed={isFlipped}
            onClick={() => setIsFlipped((flipped) => !flipped)}
          >
            <span className="photo-flip-inner">
              <span className="photo-side photo-front">
                <img className="couple-photo" src={couplePhoto} alt="Ilustrasi wajah Andry dan Willy" />
                <span className="photo-grain" aria-hidden="true" />
                <span className="love-note" aria-hidden="true">
                  <span className="script-note">oh, wait...</span>
                  <span className="yellow-note">are we</span>
                  <span className="yellow-note">in</span>
                  <span className="red-note">LOVE?</span>
                </span>
              </span>
              <span className="photo-side photo-back">
                <img
                  className="couple-photo"
                  src={couplePhotoBack}
                  alt="Pesan Happy 7th Anniversary untuk Andry dan Willy"
                />
              </span>
            </span>
          </button>
        </div>
        <p className="flip-hint" aria-hidden="true">
          <span className="flip-icon">↻</span>
          KLIK FOTO UNTUK MEMBALIKKAN
        </p>

        {decorations.map(({ symbol, className }) => (
          <span className={`decoration ${className}`} key={className} aria-hidden="true">
            {symbol}
          </span>
        ))}

        <p className="poster-footer">my favorite person, always ♡</p>
      </div>
    </section>
  )
}
