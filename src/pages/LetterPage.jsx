import { useState } from 'react'

const dailyNotes = [
  {
    thought: 'Cinta bukan hanya tentang menemukan keindahan, tetapi juga belajar melihatnya setiap hari.',
    inspiration: 'Gagasan Plato tentang cinta dan keindahan',
  },
  {
    thought: 'Persahabatan yang dirawat dengan kebaikan bisa menjadi rumah paling hangat bagi cinta.',
    inspiration: 'Pemikiran Aristoteles tentang persahabatan',
  },
  {
    thought: 'Mencintai adalah kata kerja: ia hidup dalam perhatian kecil yang kita berikan dengan tulus.',
    inspiration: 'Pemikiran Erich Fromm tentang seni mencintai',
  },
  {
    thought: 'Cinta yang dewasa memberi ruang bagi dua hati untuk tumbuh tanpa kehilangan arah pulang.',
    inspiration: 'Renungan tentang cinta dan kebebasan',
  },
  {
    thought: 'Kebahagiaan sering bersembunyi dalam hal sederhana yang kita syukuri bersama.',
    inspiration: 'Filsafat hidup yang penuh syukur',
  },
  {
    thought: 'Dua orang tidak harus sempurna untuk saling menemani dengan sepenuh hati.',
    inspiration: 'Renungan tentang kemanusiaan dan kasih',
  },
  {
    thought: 'Kesetiaan tumbuh dari pilihan-pilihan kecil untuk hadir, lagi dan lagi.',
    inspiration: 'Pemikiran tentang komitmen dan kebajikan',
  },
  {
    thought: 'Mendengarkan dengan sungguh-sungguh adalah salah satu cara paling lembut untuk berkata, aku peduli.',
    inspiration: 'Renungan tentang perhatian dan kepedulian',
  },
  {
    thought: 'Cinta membuat perjalanan panjang terasa berarti karena kita menjalaninya bersama.',
    inspiration: 'Renungan tentang makna dan kebersamaan',
  },
  {
    thought: 'Kelembutan bukan kelemahan; ia adalah keberanian untuk menjaga hati tetap terbuka.',
    inspiration: 'Pemikiran tentang keberanian dan kasih',
  },
  {
    thought: 'Hubungan yang baik bukan tanpa badai, melainkan tempat untuk saling menggenggam saat hujan.',
    inspiration: 'Renungan tentang keteguhan dalam cinta',
  },
  {
    thought: 'Menyayangi seseorang berarti ikut merayakan versi dirinya yang terus bertumbuh.',
    inspiration: 'Renungan tentang cinta dan pertumbuhan',
  },
  {
    thought: 'Rasa terima kasih mengubah momen biasa menjadi kenangan yang ingin kita simpan.',
    inspiration: 'Filsafat hidup yang penuh syukur',
  },
  {
    thought: 'Cinta yang tulus tidak meminta kita berhenti menjadi diri sendiri; ia menemani kita menjadi lebih utuh.',
    inspiration: 'Renungan tentang cinta dan jati diri',
  },
]

const encouragements = [
  'Semoga semua urusanmu hari ini dimudahkan. Jangan lupa senyum, ya.',
  'Semangat menjalani hari ini, sayang. Pelan-pelan saja, kamu pasti bisa.',
  'Semoga langkahmu hari ini ringan dan banyak hal baik datang menghampirimu.',
  'Jangan lupa istirahat dan minum air, ya. Aku selalu dukung kamu.',
  'Apa pun yang kamu hadapi hari ini, ingat kamu hebat dan tidak sendirian.',
  'Semoga harimu dipenuhi kabar baik, hati yang tenang, dan alasan untuk tersenyum.',
  'Lakukan yang terbaik semampumu hari ini. Selebihnya, biarkan waktu membantu.',
]

const dayNames = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
]

function getDayOfYear(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - startOfYear) / 86400000)
}

export default function LetterPage() {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()
  const dayOfYear = getDayOfYear(today)
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today)
  const dailyNote = dailyNotes[(dayOfYear - 1) % dailyNotes.length]
  const encouragement = encouragements[(dayOfYear - 1) % encouragements.length]

  return (
    <section className="letter-page" id="letter" aria-labelledby="letter-title">
      <div className="letter-decoration letter-decoration-one" aria-hidden="true">♡</div>
      <div className="letter-decoration letter-decoration-two" aria-hidden="true">✦</div>

      <div className="letter-heading">
        <p className="letter-eyebrow">A LITTLE NOTE, JUST FOR YOU</p>
        <h2 className="letter-title" id="letter-title">Surat untuk Willy</h2>
        <p className="letter-subtitle">Ada pesan kecil yang menunggumu hari ini.</p>
      </div>

      {!isOpen ? (
        <div className="envelope-wrap">
          <div className="envelope" aria-hidden="true">
            <span className="envelope-heart">♥</span>
          </div>
          <button className="open-letter-button" type="button" onClick={() => setIsOpen(true)}>
            <span aria-hidden="true">💌</span>
            Buka surat hari ini
          </button>
          <p className="envelope-hint">Satu surat kecil, khusus untukmu ♡</p>
        </div>
      ) : (
        <article className="daily-letter">
          <div className="letter-topline">
            <span>UNTUK WILLY, DENGAN CINTA</span>
            <span aria-hidden="true">♡</span>
          </div>
          <p className="letter-date">{dayNames[today.getDay()]}, {formattedDate}</p>
          <div className="letter-rule" aria-hidden="true"><span>✦</span></div>
          <div className="letter-message">
            <p className="letter-greeting">Hai sayangkuh, Willy Yantika ♡</p>
            <p>
              Selamat hari {dayNames[today.getDay()]}, tanggal {formattedDate}. Semangat,
              ya, kamu hari ini!
            </p>
            <p>{encouragement}</p>
            <p className="letter-signoff">Aku sayang kamu, selalu.</p>
          </div>

          <blockquote className="daily-reflection">
            <span className="reflection-label">RENUNGAN CINTA HARI INI</span>
            <p>“{dailyNote.thought}”</p>
            <cite>{dailyNote.inspiration}</cite>
          </blockquote>

          <p className="letter-signature">Dengan cinta, selalu ♡</p>
          <button
            className="close-letter-button"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Lipat kembali surat
          </button>
        </article>
      )}
    </section>
  )
}
