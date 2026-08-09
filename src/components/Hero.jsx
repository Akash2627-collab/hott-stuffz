import './Hero.css'
import { useState, useEffect } from 'react'

const reels = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    link: "https://www.instagram.com/hott_stuffz_?igsh=MTd5dnlrcm1hMHEyNg=="
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    link: "https://www.instagram.com/hott_stuffz_?igsh=MTd5dnlrcm1hMHEyNg=="
  },
  {
    id: 3,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    link: "https://www.instagram.com/hott_stuffz_?igsh=MTd5dnlrcm1hMHEyNg=="
  },
]

function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reels.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function goNext() {
    setCurrent((prev) => (prev + 1) % reels.length)
  }

  function goPrev() {
    setCurrent((prev) => (prev - 1 + reels.length) % reels.length)
  }

  return (
    <section className="hero">

      <div className="hero-logo">
        <img src="updatedlogo.png" alt="Hott Stuffz" />
      </div>
      <div className="hero-middle">
  <div className="stay-hott">
    <span className="stay-text">STAY</span>
    <span className="hott-text">HOTT</span>
  </div>
</div>

      <div className="hero-reels">

        <div className="reel-carousel">

          <button className="reel-arrow" onClick={goPrev}>‹</button>

          <div
            className="reel-card"
            onClick={() => window.open(reels[current].link, '_blank')}
          >
            <video
              key={current}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={reels[current].video} type="video/mp4" />
            </video>
            <div className="reel-overlay">
              <span>▶ Watch on Instagram</span>
            </div>
          </div>

          <button className="reel-arrow" onClick={goNext}>›</button>

        </div>

        <div className="reel-dots">
          {reels.map((_, index) => (
            <span
              key={index}
              className={index === current ? 'dot active' : 'dot'}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>

    </section>
  )
}

export default Hero