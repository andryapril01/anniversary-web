import storyPhoto from '../assets/picture/our story/foto 1.jpeg'
import storyVideo from '../assets/vidio/vidio 1.mp4'

export default function OurStoryPage() {
  return (
    <section className="story-page" id="our-story" aria-label="Our Story">
      <section className="story-panel story-photo-panel" aria-labelledby="story-title">
        <p className="story-eyebrow">A COLLECTION OF LITTLE MOMENTS</p>
        <h1 className="story-title" id="story-title">Our story</h1>
        <div className="story-photo-wrap">
          <img
            className="story-photo"
            src={storyPhoto}
            alt="Andry dan Willy tersenyum bersama"
          />
          <span className="photo-caption">my favorite memory ♡</span>
        </div>
        <p className="story-date">Andry &amp; Willy <span>—</span> always</p>
        <span className="story-sticker" aria-hidden="true">♡</span>
      </section>

      <section className="story-panel story-video-panel" aria-label="Video cerita Andry dan Willy">
        <div className="video-heading">
          <span className="video-kicker">A MOMENT TO KEEP</span>
          <span className="video-sparkle" aria-hidden="true">✳</span>
        </div>
        <div className="story-video-wrap">
          <video
            className="story-video"
            controls
            playsInline
            preload="metadata"
            aria-label="Video kenangan Andry dan Willy"
          >
            <source src={storyVideo} type="video/mp4" />
            Browser kamu tidak mendukung pemutar video.
          </video>
          <span className="video-caption">little things, forever us</span>
        </div>
        <p className="video-footnote">PRESS PLAY, RELIVE THE MOMENT</p>
      </section>
    </section>
  )
}
