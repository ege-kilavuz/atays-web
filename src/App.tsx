import './App.css'
import { useMemo, useState } from 'react'
import aiBg from './assets/bg_dashboard_ai.jpg'
import calendarBg from './assets/bg_dashboard_calendar.jpg'
import pruningBg from './assets/bg_dashboard_pruning.jpg'
import graftingBg from './assets/bg_grafting_eye_olive.jpg'
import graftingHeader from './assets/grafting_header.jpg'
import pruningHeader from './assets/pruning_header.jpg'

type RootTab = 'dashboard' | 'chat' | 'settings'
type DetailScreen = 'dashboard' | 'pruning' | 'grafting' | 'calendar' | 'realtime'

type DashboardTile = {
  key: Exclude<DetailScreen, 'dashboard'>
  title: string
  subtitle: string
  image: string
  icon: string
}

type Technique = {
  title: string
  description: string
  detail: string
  image: string
}

const dashboardTiles: DashboardTile[] = [
  {
    key: 'realtime',
    title: 'Akıllı Analiz',
    subtitle: 'Hastalık ve Budama Tespiti',
    image: aiBg,
    icon: '✦',
  },
  {
    key: 'grafting',
    title: 'Aşılama Rehberi',
    subtitle: 'Teknikler ve Takvim',
    image: graftingBg,
    icon: '✳',
  },
  {
    key: 'pruning',
    title: 'Budama Kütüphanesi',
    subtitle: 'Bilgi ve İpuçları',
    image: pruningBg,
    icon: '✂',
  },
  {
    key: 'calendar',
    title: 'Tarım Takvimi',
    subtitle: '12 Aylık Bakım Planı',
    image: calendarBg,
    icon: '☷',
  },
]

const pruningTechniques: Technique[] = [
  {
    title: 'Şekil Budaması',
    description: 'Genç zeytin fidanlarına dikimden sonra verilir. Ağacın ana iskeletini oluşturur.',
    detail:
      '1. Dikimden sonraki ilk yıllarda ana gövde yüksekliğini belirleyin (genellikle 80–100 cm). 2. Bu yükseklikten çıkan 3–4 güçlü dalı ana iskelet dalı olarak bırakın. 3. Gövdeye çok dik açıyla çıkan veya gövdeyi boğan sürgünleri alın. 4. Ağacın orta kısmını çok kapatmayın; içeriye ışık ve hava girmesini sağlayın.',
    image: pruningBg,
  },
  {
    title: 'Ürün Budaması',
    description: 'Mahsuldar zeytin ağaçlarında her yıl yapılır. Verimi artırır ve güneş ışığı dengesini sağlar.',
    detail:
      'İç kısımda birbirine sürten, kırık veya içe doğru büyüyen dalları temizleyin. Aşağıya sarkan ve güneşi kesen dalları kademeli olarak alın. Ağacın tacında ışık boşlukları bırakın.',
    image: pruningHeader,
  },
  {
    title: 'Gençleştirme Budaması',
    description: 'Yaşlı ve verimden düşmüş zeytin ağaçlarını canlandırmak için yapılan sert budamadır.',
    detail:
      'Tamamen kuru ve hastalıklı dalları temizleyin. Çok kalın ve içe bakan ana dalları birkaç sezona yayarak alın. Tek sezonda ağacı çıplak bırakmayın.',
    image: pruningBg,
  },
  {
    title: 'Aralama Budaması',
    description: 'Dalların birbirine girmesini engellemek ve hava sirkülasyonunu artırmak için yapılır.',
    detail:
      'Tacın iç kısmında birbirini gölgeleyen dalları belirleyin. Zayıf olanları dipten veya uygun bir yan daldan kesin. Taç içinde pencere gibi boşluklar oluşturun.',
    image: pruningHeader,
  },
]

const graftingTechniques: Technique[] = [
  {
    title: 'Göz Aşısı',
    description: 'Zeytin ağacında su yürüdüğü dönemde yapılır. En verimli yöntemlerden biridir.',
    detail:
      'Sağlıklı bir daldan iyi olgunlaşmış göz seçin. Anaçta T şeklinde kesim yapın, gözü yerleştirin ve aşı bandı ile sarın. İlkbaharda, su yürümesi başladığında uygulanır.',
    image: graftingBg,
  },
  {
    title: 'Kalem Aşısı (Yarma)',
    description: 'Delice yabani zeytinleri verimli hale getirmek için sık kullanılır.',
    detail:
      'Anaç dalı düzgün kesilir, ortasına yarma açılır. Kama biçiminde hazırlanmış kalem kambiyum hizalanarak yerleştirilir. Bağ ve macunla kapatılır.',
    image: graftingHeader,
  },
  {
    title: 'Kabuk Altı Aşısı',
    description: 'Ağaçlar kabuk vermeye başladığında uygulanır. Tutma oranı yüksektir.',
    detail:
      'Kesim yüzeyinin kenarından kabuk kaldırılır. İnceltilmiş kalem kabuk ile odun arasına oturtulur. Sıkı bağ ve aşı macunu ile tamamlanır.',
    image: graftingBg,
  },
]

const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

const monthlyPlan = [
  ['Ocak', 'Hasat tamamlanmışsa derin sürüm yapılır. Toprağa ahır gübresi verilebilir. Yeni zeytinlikler için fidan çukurları açılır.'],
  ['Şubat', 'Gençleştirme budaması yapılabilir. Halkalı leke ve kansere karşı bordo bulamacı uygulanır. Fidan dikimine devam edilir.'],
  ['Mart', 'Budama, gübreleme ve toprak işleme yapılır. Kompoze gübre uygulaması sürdürülür. Don riskine karşı dikkatli olunmalıdır.'],
  ['Nisan', 'Azotlu gübreler toprağa verilip karıştırılır. Halkalı leke ve zeytin güvesine karşı ilaçlama yapılır.'],
  ['Mayıs', 'Çiçeklenme öncesi sulama yapılır. Yabancı ot mücadelesi ve hafif toprak işleme önemlidir.'],
  ['Haziran', 'Hava çok kurak gitmişse sulama yapılır. Zeytin güvesi takibi sürdürülür.'],
  ['Temmuz', 'Sulama ve toprak işleme yapılır. Zararlı takibi önemlidir.'],
  ['Ağustos', 'Sulama işlemlerine devam edilir. Hasat öncesi hazırlıklar gözden geçirilir.'],
  ['Eylül', 'Yeşil sofralık zeytin hasadı başlar. Taneler yeşilden sarıya döndüğünde toplanır.'],
  ['Ekim', 'Yeşil sofralık hasadı ve erken hasat yağlık üretimi devam eder.'],
  ['Kasım', 'Siyah sofralık ve yağlık zeytin hasadı başlar. Meyvelerin tamamen kararması beklenir.'],
  ['Aralık', 'Hasat işlemleri tamamlanır. Hasat ve budama sonrası bordo bulamacı uygulaması yapılır.'],
] as const

const todayTasks = [
  'Sulama durumunu kontrol et',
  'Zararlı gözlemi yap',
  'Güneş almayan iç dalları işaretle',
]

const suggestions = [
  'Bugün yağış görünmüyor; genç ağaçlar için hafif sulama planlanabilir.',
  'Budama sonrası bakırlı uygulama düşünülmeli.',
]

const chatMessages = [
  {
    role: 'user',
    text: 'Bu ay zeytin ağacım için hangi bakım işlemlerini önerirsin?',
  },
  {
    role: 'ai',
    text: 'Bu dönemde sulama ihtiyacı, zararlı takibi ve gerekiyorsa hafif ürün budaması birlikte değerlendirilmelidir. İstersen takvim bölümünden aylık bakım planını açabilirsin.',
  },
]

function App() {
  const [rootTab, setRootTab] = useState<RootTab>('dashboard')
  const [detailScreen, setDetailScreen] = useState<DetailScreen>('dashboard')
  const [selectedMonth, setSelectedMonth] = useState('Mayıs')
  const [themeMode, setThemeMode] = useState('system')
  const [treeType, setTreeType] = useState('Zeytin Ağacı')

  const graftingRecommendation = useMemo(() => {
    if (selectedMonth === 'Mart' || selectedMonth === 'Nisan') return 'Mart-Nisan: Kabuk altı ve kalem aşısı için en uygun dönemdir.'
    if (selectedMonth === 'Mayıs') return 'Mayıs: Tüm aşı yöntemleri için ideal zamandır.'
    if (selectedMonth === 'Haziran') return 'Haziran: Göz aşısı için son uygun haftalardır.'
    return 'Bu ay zeytin aşılaması için genellikle uygun değildir. Bahar aylarını bekleyiniz.'
  }, [selectedMonth])

  const openModule = (screen: Exclude<DetailScreen, 'dashboard'>) => {
    setRootTab('dashboard')
    setDetailScreen(screen)
  }

  const renderDashboard = () => (
    <div className="screen-scroll">
      <section className="hero-surface card card-soft">
        <h1 className="display-title">Zeytin Öncüleri</h1>
        <p className="hero-subtitle">Yapay Zeka Destekli Zeytin Yönetim Paneli</p>
      </section>

      <section className="dashboard-grid">
        {dashboardTiles.map((tile) => (
          <button key={tile.key} className="dashboard-tile" onClick={() => openModule(tile.key)}>
            <img src={tile.image} alt="" />
            <div className="tile-overlay" />
            <div className="tile-content">
              <div className="tile-icon">{tile.icon}</div>
              <h3>{tile.title}</h3>
              <p>{tile.subtitle}</p>
            </div>
          </button>
        ))}
      </section>

      <section className="card tasks-card">
        <h3>Bugünün Görevleri</h3>
        <div className="task-list">
          {todayTasks.map((task) => (
            <div key={task} className="task-row">
              <span className="task-dot" />
              <span>{task}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderPruning = () => (
    <div className="detail-screen">
      <header className="topbar">
        <button className="icon-button" onClick={() => setDetailScreen('dashboard')}>←</button>
        <div className="topbar-title">Budama Kütüphanesi</div>
      </header>
      <div className="screen-scroll detail-scroll">
        <img className="header-image" src={pruningHeader} alt="Budama" />

        <section className="card tip-card">
          <h3>💡 Kritik İpuçları</h3>
          <ul>
            <li>Dalı gölgede, yaprağı güneşte bırakın.</li>
            <li>Makasları her ağaç değişiminde dezenfekte edin.</li>
            <li>Kalın dal kesimlerine mutlaka aşı macunu sürün.</li>
            <li>Budama yaptıktan sonra bakırlı ilaçlama yapın.</li>
          </ul>
        </section>

        <h2 className="section-title">Budama Türleri</h2>
        <section className="technique-list">
          {pruningTechniques.map((item) => (
            <article key={item.title} className="technique-card">
              <img src={item.image} alt="" />
              <div className="tile-overlay" />
              <div className="technique-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.detail}</small>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )

  const renderGrafting = () => (
    <div className="detail-screen">
      <header className="topbar">
        <button className="icon-button" onClick={() => setDetailScreen('dashboard')}>←</button>
        <div className="topbar-title">Aşılama Rehberi</div>
      </header>
      <div className="screen-scroll detail-scroll">
        <img className="header-image" src={graftingHeader} alt="Aşılama" />

        <h2 className="section-title">Hangi aydasınız?</h2>
        <div className="month-strip">
          {months.map((month) => (
            <button
              key={month}
              className={`month-chip ${selectedMonth === month ? 'active' : ''}`}
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </button>
          ))}
        </div>

        <section className="card recommendation-card">
          <h3>Aşı Tavsiyesi</h3>
          <p>{graftingRecommendation}</p>
        </section>

        <h2 className="section-title">Aşılama Teknikleri</h2>
        <section className="technique-list">
          {graftingTechniques.map((item) => (
            <article key={item.title} className="technique-card">
              <img src={item.image} alt="" />
              <div className="tile-overlay" />
              <div className="technique-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.detail}</small>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="detail-screen">
      <header className="topbar">
        <button className="icon-button" onClick={() => setDetailScreen('dashboard')}>←</button>
        <div className="topbar-title">Akıllı Tarım Takvimi</div>
      </header>
      <div className="screen-scroll detail-scroll">
        <section className="card region-card">
          <h3>Bölge: bilinmiyor</h3>
          <p>Takvim: standart zaman</p>
        </section>

        <h2 className="section-title compact">Günlük Öneriler</h2>
        <section className="stack-list">
          {suggestions.map((item) => (
            <article key={item} className="card suggestion-card">{item}</article>
          ))}
        </section>

        <div className="row-title">
          <h2 className="section-title compact">Takvim Görevleri</h2>
          <div className="inline-actions">
            <button className="text-pill">Haftalık Plan</button>
            <button className="text-pill">Şablondan Ekle</button>
          </div>
        </div>

        <section className="stack-list">
          {todayTasks.map((task) => (
            <article key={task} className="card task-item-card">{task}</article>
          ))}
        </section>

        <h2 className="section-title compact">Aylık Plan</h2>
        <section className="calendar-stack">
          {monthlyPlan.map(([month, text]) => (
            <article key={month} className="card calendar-entry">
              <strong>{month}</strong>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="chat-screen">
      <header className="topbar topbar-chat">
        <div>
          <div className="topbar-title">Zeytin Uzmanı AI</div>
          <div className="topbar-subtitle">Ollama ile güçlendirilmiştir</div>
        </div>
      </header>

      <div className="chat-scroll">
        {chatMessages.map((message, index) => (
          <div key={index} className={`bubble ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="calendar-proposal card">
        <strong>Takvime ekleme önerisi</strong>
        <div className="proposal-actions">
          <button className="text-button">İptal</button>
          <button className="filled-button">Takvime Ekle</button>
        </div>
      </div>

      <div className="chat-input-card card">
        <div className="chat-input-row">
          <button className="circle-action">📷</button>
          <div className="chat-placeholder">Soru sorun…</div>
          <button className="circle-action send">➤</button>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="screen-scroll settings-scroll">
      <section className="card card-soft settings-hero">
        <h1 className="screen-title">Ayarlar</h1>
        <p>Hızlı ve rahat kullanım için temel ayarları buradan yönetebilirsin.</p>
      </section>

      <section className="card settings-card-block">
        <h3>Dil Seçimi</h3>
        <button className="wide-tonal">Dil seç</button>
      </section>

      <section className="card settings-card-block">
        <h3>Ağaç Seçimi</h3>
        <p>Seçili ağaç: {treeType}</p>
        <button className="outlined-inline" onClick={() => setTreeType(treeType === 'Zeytin Ağacı' ? 'İncir Ağacı' : 'Zeytin Ağacı')}>
          Ağacı Değiştir
        </button>
      </section>

      <section className="card settings-card-block">
        <h3>Tema Seçimi</h3>
        <label className="radio-row"><input type="radio" checked={themeMode === 'light'} onChange={() => setThemeMode('light')} /> Açık Tema</label>
        <label className="radio-row"><input type="radio" checked={themeMode === 'dark'} onChange={() => setThemeMode('dark')} /> Koyu Tema</label>
        <label className="radio-row"><input type="radio" checked={themeMode === 'system'} onChange={() => setThemeMode('system')} /> Sistem Varsayılanı</label>
      </section>

      <section className="card settings-card-block">
        <h3>Ollama Bağlantısı</h3>
        <p>Yapay zeka sunucusuna erişimi kontrol eder.</p>
        <button className="outlined-inline">Bağlantıyı Test Et</button>
      </section>

      <section className="card settings-card-block">
        <h3>Günlük Öneri</h3>
        <p>Yağış ve ağaç türüne göre günlük sulama/tarım önerisini hemen üretir.</p>
        <button className="text-button align-left">Şimdi Öneri Üret</button>
        <div className="divider" />
        <h4>Haftalık Özet</h4>
        <p>Bu haftanın takvim görevlerini özetleyen bildirimi hemen tetikler.</p>
        <button className="text-button align-left">Haftalık Özeti Test Et</button>
        <button className="outlined-inline danger-outline">Öneri DB Sıfırla (Debug)</button>
      </section>

      <section className="card settings-card-block">
        <h3>Videolar</h3>
        <p>Eğitim videolarını kontrol eder ve eksik olanları indirir.</p>
        <div className="input-mock">Manifest URL</div>
        <label className="switch-row"><input type="checkbox" /> Sadece Wi‑Fi üzerinden indir</label>
        <div className="three-actions">
          <button className="text-button">Test</button>
          <button className="text-button">Video Kütüphanesi</button>
          <button className="text-button">Önbelleği sıfırla</button>
        </div>
        <button className="wide-filled">Videoları Güncelle</button>
        <p className="status-line">Durum: Hazır</p>
      </section>

      <section className="card settings-card-block">
        <h3>Uygulama Güncelleme</h3>
        <p>GitHub release sayfasından telefona uygun APK sürümünü kontrol eder.</p>
        <p className="status-line">Mevcut sürüm: v0.5.17</p>
        <div className="dual-actions">
          <button className="wide-tonal">Güncelleme Kontrol Et</button>
          <button className="outlined-inline wide-split">GitHub ile Giriş Yap</button>
        </div>
        <p className="status-line">Durum: Hazır</p>
      </section>

      <section className="card settings-card-block">
        <h3>Deneysel Ayarlar</h3>
        <div className="slider-block"><span>Budama Güven Eşiği (%)</span><div className="slider-mock" /></div>
        <div className="slider-block"><span>Budama Çakışma (IoU) Eşiği (%)</span><div className="slider-mock" /></div>
        <div className="slider-block"><span>Hastalık Güven Eşiği (%)</span><div className="slider-mock" /></div>
        <div className="slider-block"><span>Hastalık Çakışma (IoU) Eşiği (%)</span><div className="slider-mock" /></div>
        <label className="switch-row"><input type="checkbox" /> GPU Hızlandırma Kullan (Deneysel)</label>
        <div className="footer-actions">
          <button className="text-button">Sıfırla</button>
          <button className="filled-button">Kaydet</button>
        </div>
      </section>
    </div>
  )

  const renderRealtime = () => (
    <div className="detail-screen">
      <header className="topbar">
        <button className="icon-button" onClick={() => setDetailScreen('dashboard')}>←</button>
        <div className="topbar-title">Gerçek Zamanlı</div>
      </header>
      <div className="screen-scroll detail-scroll">
        <section className="realtime-placeholder card">
          <div className="camera-box">
            <div className="camera-inner">Kamera önizlemesi</div>
          </div>
          <div className="warning-banner">Web sürümünde kamera/realtime alanı uyarılı placeholder olarak bırakıldı.</div>
          <div className="realtime-stats">
            <span>Analiz ediliyor…</span>
            <span>inf: -- ms | skip: 1/1</span>
          </div>
          <div className="realtime-actions">
            <button className="wide-filled disabled-look">Kamerayı Başlat</button>
            <button className="outlined-inline">Öneriyi Al</button>
            <button className="outlined-inline">Fotoğrafı AI sohbete gönder</button>
          </div>
        </section>
      </div>
    </div>
  )

  return (
    <div className="page-shell">
      <div className="phone-frame">
        <div className="phone-status-bar">
          <span>9:41</span>
          <span>ATAYS</span>
          <span>100%</span>
        </div>

        <div className="app-surface">
          {rootTab === 'dashboard' && detailScreen === 'dashboard' && renderDashboard()}
          {rootTab === 'dashboard' && detailScreen === 'pruning' && renderPruning()}
          {rootTab === 'dashboard' && detailScreen === 'grafting' && renderGrafting()}
          {rootTab === 'dashboard' && detailScreen === 'calendar' && renderCalendar()}
          {rootTab === 'dashboard' && detailScreen === 'realtime' && renderRealtime()}
          {rootTab === 'chat' && renderChat()}
          {rootTab === 'settings' && renderSettings()}
        </div>

        <nav className="bottom-nav">
          <button className={rootTab === 'dashboard' ? 'active' : ''} onClick={() => { setRootTab('dashboard'); setDetailScreen('dashboard') }}>
            <span>🗓</span>
            <strong>Ana Sayfa</strong>
          </button>
          <button className={rootTab === 'chat' ? 'active' : ''} onClick={() => setRootTab('chat')}>
            <span>💬</span>
            <strong>Sohbet</strong>
          </button>
          <button className={rootTab === 'settings' ? 'active' : ''} onClick={() => setRootTab('settings')}>
            <span>⚙</span>
            <strong>Ayarlar</strong>
          </button>
        </nav>
      </div>
    </div>
  )
}

export default App
