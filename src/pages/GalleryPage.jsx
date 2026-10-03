import { useEffect, useState } from 'react'

const GARDEN_STORAGE_KEY = 'andry-willy-flower-garden-v1'
const QUICK_FLOWER_WATERINGS = 5

function createGardenState() {
  return {
    quick: { waterings: 0, harvested: 0 },
    real: { waterings: 0, lastWateredDate: null, targetWaterings: null },
  }
}

function readGardenState() {
  try {
    const saved = window.localStorage.getItem(GARDEN_STORAGE_KEY)
    if (!saved) return createGardenState()

    const parsed = JSON.parse(saved)
    if (
      !Number.isInteger(parsed.quick?.waterings) ||
      !Number.isInteger(parsed.quick?.harvested) ||
      !Number.isInteger(parsed.real?.waterings) ||
      (parsed.real?.lastWateredDate !== null &&
        typeof parsed.real?.lastWateredDate !== 'string') ||
      (parsed.real?.targetWaterings !== null &&
        !Number.isInteger(parsed.real?.targetWaterings))
    ) {
      throw new Error('Format progres kebun tidak valid.')
    }

    return parsed
  } catch (error) {
    console.warn('Progres kebun tidak dapat dimuat; memulai dengan kebun baru.', error)
    return createGardenState()
  }
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function daysUntilNewYearsEve() {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const newYearsEve = new Date(today.getFullYear(), 11, 31)
  return Math.max(1, Math.round((newYearsEve - startOfToday) / 86400000) + 1)
}

function FlowerPlant({ progress, bloomed, label }) {
  const plantScale = Math.max(0.08, progress)
  const flowerScale = bloomed ? 1 : 0

  return (
    <div className="flower-scene">
      <svg className="flower-illustration" viewBox="0 0 240 250" role="img" aria-label={label}>
        <ellipse className="soil-shadow" cx="120" cy="222" rx="74" ry="13" />
        <path className="soil-line" d="M51 215 Q120 204 189 215" />
        <g className="plant-growth" style={{ '--plant-scale': plantScale }}>
          <path className="flower-stem" d="M120 215 C116 179 126 147 119 118 C115 99 119 82 120 68" />
          <path className="flower-leaf" d="M119 174 C94 173 80 157 77 140 C99 140 115 151 119 174Z" />
          <path className="flower-leaf leaf-second" d="M121 151 C144 149 159 134 162 117 C141 118 126 131 121 151Z" />
          <path className="flower-leaf" d="M119 126 C100 125 89 113 87 99 C104 100 116 109 119 126Z" />
          <path className="flower-leaf leaf-second" d="M120 105 C137 103 147 92 149 78 C134 80 123 89 120 105Z" />
          <g className="plant-blossom" style={{ '--flower-scale': flowerScale }}>
            <ellipse className="flower-petal" cx="120" cy="47" rx="11" ry="18" />
            <ellipse className="flower-petal" cx="120" cy="87" rx="11" ry="18" />
            <ellipse className="flower-petal" cx="100" cy="67" rx="18" ry="11" />
            <ellipse className="flower-petal" cx="140" cy="67" rx="18" ry="11" />
            <ellipse className="flower-petal" cx="106" cy="53" rx="11" ry="18" transform="rotate(-45 106 53)" />
            <ellipse className="flower-petal" cx="134" cy="53" rx="11" ry="18" transform="rotate(45 134 53)" />
            <ellipse className="flower-petal" cx="106" cy="81" rx="11" ry="18" transform="rotate(45 106 81)" />
            <ellipse className="flower-petal" cx="134" cy="81" rx="11" ry="18" transform="rotate(-45 134 81)" />
            <circle className="flower-center" cx="120" cy="67" r="12" />
            <circle className="flower-center-dot" cx="116" cy="64" r="2" />
            <circle className="flower-center-dot" cx="124" cy="70" r="2" />
          </g>
          {!bloomed && <ellipse className="flower-bud" cx="120" cy="64" rx="11" ry="17" />}
        </g>
      </svg>
    </div>
  )
}

function ProgressBar({ className = '', label, value, max, progress }) {
  return (
    <div
      className={`garden-progress ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <span style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

export default function GalleryPage() {
  const [garden, setGarden] = useState(readGardenState)
  const [today, setToday] = useState(() => getLocalDateKey())

  useEffect(() => {
    const dateCheck = window.setInterval(() => setToday(getLocalDateKey()), 60_000)
    return () => window.clearInterval(dateCheck)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(garden))
    } catch (error) {
      console.warn('Progres kebun tidak dapat disimpan di browser ini.', error)
    }
  }, [garden])

  const quickProgress = Math.min(garden.quick.waterings / QUICK_FLOWER_WATERINGS, 1)
  const realTarget = garden.real.targetWaterings ?? daysUntilNewYearsEve()
  const realProgress = Math.min(garden.real.waterings / realTarget, 1)
  const hasWateredRealToday = garden.real.lastWateredDate === today

  const waterQuickFlower = () => {
    setGarden((previous) => {
      if (previous.quick.waterings >= QUICK_FLOWER_WATERINGS) return previous
      return {
        ...previous,
        quick: { ...previous.quick, waterings: previous.quick.waterings + 1 },
      }
    })
  }

  const harvestQuickFlower = () => {
    setGarden((previous) => {
      if (previous.quick.waterings < QUICK_FLOWER_WATERINGS) return previous
      return {
        ...previous,
        quick: { waterings: 0, harvested: previous.quick.harvested + 1 },
      }
    })
  }

  const waterRealFlower = () => {
    if (hasWateredRealToday) return

    setGarden((previous) => {
      if (previous.real.lastWateredDate === today) return previous
      const targetWaterings = previous.real.targetWaterings ?? daysUntilNewYearsEve()
      return {
        ...previous,
        real: {
          waterings: Math.min(previous.real.waterings + 1, targetWaterings),
          lastWateredDate: today,
          targetWaterings,
        },
      }
    })
  }

  const lastWateredText = garden.real.lastWateredDate
    ? new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${garden.real.lastWateredDate}T12:00:00`))
    : null

  return (
    <section className="gallery-page" id="gallery" aria-labelledby="garden-title">
      <div className="garden-heading">
        <p className="garden-eyebrow">A LITTLE GARDEN FOR TWO</p>
        <h2 className="garden-title" id="garden-title">Our love garden</h2>
        <p className="garden-intro">
          Rawat bunga kita—satu tumbuh bersama waktu, satu lagi untuk dirayakan berkali-kali.
        </p>
      </div>

      <div className="garden-grid">
        <article className="garden-card quick-garden">
          <div className="garden-card-heading">
            <span className="garden-mode">GROW &amp; PICK</span>
            <span className="garden-card-heart" aria-hidden="true">♡</span>
          </div>
          <h3 className="garden-card-title">Bunga hari ini</h3>
          <p className="garden-card-description">
            Siram sampai mekar, petik, lalu mulai lagi kapan saja.
          </p>
          <FlowerPlant
            progress={quickProgress}
            bloomed={quickProgress >= 1}
            label={
              quickProgress >= 1
                ? 'Bunga sudah mekar'
                : `Bunga tumbuh ${Math.round(quickProgress * 100)} persen`
            }
          />
          <div className="garden-progress-copy">
            <span>{quickProgress >= 1 ? 'Mekar sempurna!' : 'Pertumbuhan bunga'}</span>
            <span>{garden.quick.waterings}/{QUICK_FLOWER_WATERINGS} siraman</span>
          </div>
          <ProgressBar
            label="Pertumbuhan bunga hari ini"
            value={garden.quick.waterings}
            max={QUICK_FLOWER_WATERINGS}
            progress={quickProgress}
          />
          <button
            className={`garden-action${quickProgress >= 1 ? ' harvest-action' : ''}`}
            type="button"
            onClick={quickProgress >= 1 ? harvestQuickFlower : waterQuickFlower}
          >
            {quickProgress >= 1 ? '🌼 Petik bunga' : '💧 Siram bunga'}
          </button>
          <p className="garden-footnote">
            {garden.quick.harvested > 0
              ? `Sudah dipetik ${garden.quick.harvested} kali · tumbuh cepat, bisa diulang`
              : 'Tumbuh cepat · progres tersimpan di browser ini'}
          </p>
        </article>

        <article className="garden-card daily-garden">
          <div className="garden-card-heading">
            <span className="garden-mode">GROW WITH TIME</span>
            <span className="garden-card-heart" aria-hidden="true">♥</span>
          </div>
          <h3 className="garden-card-title">Bunga masa depan</h3>
          <p className="garden-card-description">
            Satu siraman setiap hari. Mekar perlahan menuju 31 Desember.
          </p>
          <FlowerPlant
            progress={realProgress}
            bloomed={realProgress >= 1}
            label={
              realProgress >= 1
                ? 'Bunga masa depan mekar'
                : `Bunga masa depan tumbuh ${Math.round(realProgress * 100)} persen`
            }
          />
          <div className="garden-progress-copy">
            <span>{realProgress >= 1 ? 'Mekar bersama waktu ♡' : 'Perjalanan menuju mekar'}</span>
            <span>{garden.real.waterings}/{realTarget} hari</span>
          </div>
          <ProgressBar
            className="real-progress"
            label="Pertumbuhan bunga masa depan"
            value={garden.real.waterings}
            max={realTarget}
            progress={realProgress}
          />
          <button
            className="garden-action real-action"
            type="button"
            onClick={waterRealFlower}
            disabled={hasWateredRealToday || realProgress >= 1}
          >
            {realProgress >= 1
              ? '🌷 Bunga sudah mekar'
              : hasWateredRealToday
                ? '✓ Sudah disiram hari ini'
                : '💧 Siram hari ini'}
          </button>
          <p className="garden-footnote">
            {lastWateredText
              ? `Siraman terakhir: ${lastWateredText} · satu kali per hari`
              : 'Belum disiram · progres disimpan di browser ini'}
          </p>
        </article>
      </div>
    </section>
  )
}
