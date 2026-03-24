import './App.css'
import { useMemo, useState } from 'react'

type ScreenKey =
  | 'home'
  | 'classification'
  | 'pruning'
  | 'grafting'
  | 'calendar'
  | 'chat'
  | 'realtime'

const classificationCards = [
  {
    title: 'Meyve rengine göre',
    body: 'Zeytinler olgunlaşma sürecine göre yeşil, mor ve siyah tonlarda görülebilir. Renk, hasat zamanı ve kullanım amacını anlamada önemli bir göstergedir.',
  },
  {
    title: 'Meyve büyüklüğüne göre',
    body: 'Çeşitler küçük, orta ve büyük meyveli olabilir. Büyük meyveli çeşitler genelde sofralık kullanımda öne çıkarken, küçük ve orta meyveli çeşitler yağlık üretimde tercih edilebilir.',
  },
  {
    title: 'Meyve şekline göre',
    body: 'Meyve şekli yuvarlak, oval veya uzun olabilir. Bu özellik, çeşidin tanınmasında ve işleme amacının belirlenmesinde yardımcı olur.',
  },
  {
    title: 'Kullanım amacına göre',
    body: 'Zeytin çeşitleri sofralık, yağlık veya çift amaçlı olarak ayrılır. Sofralık çeşitlerde et oranı ve görünüm, yağlık çeşitlerde ise yağ verimi öne çıkar.',
  },
  {
    title: 'Olgunlaşma zamanına göre',
    body: 'Erken, orta ve geç olgunlaşan çeşitler bulunur. Bu ayrım hasat planlaması, iş gücü yönetimi ve pazarlama açısından önemlidir.',
  },
  {
    title: 'Ağaç gelişimine göre',
    body: 'Bazı çeşitler güçlü, bazıları orta veya zayıf gelişim gösterir. Taç yapısı, dal yoğunluğu ve büyüme hızı bakım uygulamalarını etkiler.',
  },
  {
    title: 'Yaprak özelliklerine göre',
    body: 'Yapraklar dar, geniş, uzun ya da kısa olabilir. Yaprak biçimi ve tonu, çeşit ayırımında kullanılan tamamlayıcı özelliklerdendir.',
  },
  {
    title: 'Çekirdek yapısına göre',
    body: 'Çekirdek küçük, büyük, sivri veya küt yapıda olabilir. Et/çekirdek oranı özellikle sofralık kalite değerlendirmesinde önem taşır.',
  },
  {
    title: 'Yağ oranına göre',
    body: 'Çeşitler düşük, orta ve yüksek yağ içerikli olabilir. Yağlık üretimde verim ve kalite açısından bu özellik belirleyicidir.',
  },
  {
    title: 'İklim uyumuna göre',
    body: 'Bazı çeşitler sıcak ve kurak koşullara, bazıları ise daha ılıman iklimlere daha iyi uyum sağlar. Bölgeye uygun çeşit seçimi verim ve dayanıklılığı artırır.',
  },
]

const monthlyCalendar = [
  ['Ocak', 'Hasat sonrası derin sürüm, toprak hazırlığı ve yeni dikim alanı planlanır.'],
  ['Şubat', 'Gençleştirme budaması yapılabilir, bakırlı uygulamalar değerlendirilir.'],
  ['Mart', 'Budama, gübreleme ve toprak işleme dönemi başlar.'],
  ['Nisan', 'Azotlu gübreleme ve hastalık-zararlı kontrolleri yoğunlaşır.'],
  ['Mayıs', 'Çiçeklenme öncesi sulama ve bahçe temizliği önem kazanır.'],
  ['Haziran', 'Kuraklık durumuna göre sulama yapılır, zeytin güvesi takibi sürer.'],
  ['Temmuz', 'Sulama ve toprak yönetimi devam eder.'],
  ['Ağustos', 'Sulama sürdürülür, hasat öncesi hazırlıklar gözden geçirilir.'],
  ['Eylül', 'Yeşil sofralık zeytin hasadı başlar.'],
  ['Ekim', 'Yeşil sofralık ve erken hasat yağlık üretim devam eder.'],
  ['Kasım', 'Siyah sofralık ve yağlık hasat süreci hızlanır.'],
  ['Aralık', 'Hasat tamamlanır, sezon sonu genel değerlendirme yapılır.'],
] as const

const pruningCards = [
  ['Şekil Budaması', 'Genç zeytin fidanlarına uygulanır. Ağacın ana iskeletini oluşturur.'],
  ['Ürün Budaması', 'Verimi artırmak ve güneşlenmeyi düzenlemek için yapılır.'],
  ['Gençleştirme Budaması', 'Yaşlı ve verimden düşmüş ağaçlarda yenilenme amacı taşır.'],
  ['Aralama Budaması', 'Dalların birbirine girmesini önler, hava sirkülasyonunu artırır.'],
] as const

const graftingCards = [
  ['Göz Aşısı', 'Su yürümesinin olduğu dönemde uygulanan verimli yöntemlerden biridir.'],
  ['Kalem Aşısı', 'Delice zeytinleri verimli çeşitlere çevirmede sık kullanılır.'],
  ['Kabuk Altı Aşısı', 'Kalın dallarda ve bahar döneminde tercih edilen tekniklerden biridir.'],
] as const

function App() {
  const [treeType, setTreeType] = useState<'olive' | 'fig'>('olive')
  const [screen, setScreen] = useState<ScreenKey>('home')

  const modules = useMemo<Array<{ key: ScreenKey; title: string; subtitle: string }>>(() => {
    const base: Array<{ key: ScreenKey; title: string; subtitle: string }> = [
      { key: 'pruning' as const, title: 'Budama Kütüphanesi', subtitle: 'Bilgi ve ipuçları' },
      { key: 'grafting' as const, title: 'Aşılama Rehberi', subtitle: 'Teknikler ve takvim' },
      { key: 'calendar' as const, title: 'Tarım Takvimi', subtitle: '12 aylık bakım planı' },
      { key: 'chat' as const, title: 'AI Sohbet', subtitle: 'Soru sor, öneri al' },
      { key: 'realtime' as const, title: 'Gerçek Zamanlı Tespit', subtitle: 'Webde sınırlı demo' },
    ]

    if (treeType === 'olive') {
      base.splice(3, 0, {
        key: 'classification' as const,
        title: 'Zeytin Sınıflandırması',
        subtitle: 'Çeşitleri tek tek incele',
      })
    }

    return base
  }, [treeType])

  const backHome = () => setScreen('home')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-badge">ATAYS WEB</div>
          <h1>ATAYS</h1>
          <p className="muted">Mobil uygulamayı referans alan web sürümü</p>
        </div>

        <div className="tree-switcher">
          <button
            className={treeType === 'olive' ? 'active' : ''}
            onClick={() => {
              setTreeType('olive')
              if (screen === 'classification' && treeType === 'fig') setScreen('home')
            }}
          >
            Zeytin
          </button>
          <button
            className={treeType === 'fig' ? 'active' : ''}
            onClick={() => {
              setTreeType('fig')
              if (screen === 'classification') setScreen('home')
            }}
          >
            İncir
          </button>
        </div>

        <nav className="nav-list">
          <button className={screen === 'home' ? 'active' : ''} onClick={backHome}>Ana Sayfa</button>
          {modules.map((item) => (
            <button
              key={item.key}
              className={screen === item.key ? 'active' : ''}
              onClick={() => setScreen(item.key)}
            >
              {item.title}
            </button>
          ))}
        </nav>

        <div className="side-note">
          <strong>Not</strong>
          <p>Bu web sürümü, rapor ve sunum için hazırlanmış demo arayüzdür.</p>
        </div>
      </aside>

      <main className="content">
        {screen === 'home' && (
          <>
            <section className="hero-card">
              <div>
                <span className="section-pill">Yapay Zekâ Destekli Tarım Paneli</span>
                <h2>{treeType === 'olive' ? 'Zeytin Öncüleri' : 'İncir Yönetim Paneli'}</h2>
                <p>
                  Budama, aşılama, takvim, sınıflandırma ve AI destekli yönlendirme modüllerini
                  tek bir arayüzde toplayan web sürümü.
                </p>
              </div>
              <div className="phone-mock">
                <div className="phone-screen">
                  <div className="phone-header">ATAYS Mobil Arayüzü</div>
                  <div className="phone-grid">
                    {modules.slice(0, 4).map((item) => (
                      <div key={item.key} className="mini-card">
                        <strong>{item.title}</strong>
                        <span>{item.subtitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="module-grid">
              {modules.map((item) => (
                <button key={item.key} className="module-card" onClick={() => setScreen(item.key)}>
                  <span>{item.title}</span>
                  <small>{item.subtitle}</small>
                </button>
              ))}
            </section>
          </>
        )}

        {screen === 'classification' && treeType === 'olive' && (
          <section>
            <div className="section-head">
              <span className="section-pill">Zeytin Çeşitleri</span>
              <h2>Zeytin Sınıflandırması</h2>
              <p>Zeytin çeşitlerini açıklayıcı kartlar halinde inceleyin.</p>
            </div>
            <div className="info-grid">
              {classificationCards.map((card) => (
                <article key={card.title} className="info-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {screen === 'pruning' && (
          <section>
            <div className="section-head">
              <span className="section-pill">Budama</span>
              <h2>Budama Kütüphanesi</h2>
              <p>{treeType === 'olive' ? 'Zeytin' : 'İncir'} için temel budama türleri.</p>
            </div>
            <div className="info-grid compact-grid">
              {pruningCards.map(([title, body]) => (
                <article key={title} className="info-card">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {screen === 'grafting' && (
          <section>
            <div className="section-head">
              <span className="section-pill">Aşılama</span>
              <h2>Aşılama Rehberi</h2>
              <p>{treeType === 'olive' ? 'Zeytin' : 'İncir'} için kullanılan temel aşı teknikleri.</p>
            </div>
            <div className="info-grid compact-grid">
              {graftingCards.map(([title, body]) => (
                <article key={title} className="info-card">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {screen === 'calendar' && (
          <section>
            <div className="section-head">
              <span className="section-pill">12 Aylık Plan</span>
              <h2>Tarım Takvimi</h2>
              <p>Seçilen ağaca göre bakım dönemlerini takip edin.</p>
            </div>
            <div className="calendar-list">
              {monthlyCalendar.map(([month, text]) => (
                <article key={month} className="calendar-card">
                  <strong>{month}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {screen === 'chat' && (
          <section>
            <div className="section-head">
              <span className="section-pill">AI Sohbet</span>
              <h2>Uzman Yardımı</h2>
              <p>Kullanıcı akışını göstermek için hazırlanmış demo konuşma alanı.</p>
            </div>
            <div className="chat-demo">
              <div className="bubble user">Bu ay zeytin ağacım için hangi bakım işlemlerini önerirsin?</div>
              <div className="bubble ai">
                Bu dönemde budama durumu, sulama ihtiyacı ve zararlı takibi birlikte değerlendirilmelidir.
                İstersen tarım takvimi bölümünden aylık bakım önerilerini de inceleyebilirsin.
              </div>
              <div className="chat-input">Soru sorun…</div>
            </div>
          </section>
        )}

        {screen === 'realtime' && (
          <section>
            <div className="section-head">
              <span className="section-pill warning">Mobil Uygulama Özelliği</span>
              <h2>Gerçek Zamanlı Tespit</h2>
              <p>Kamera ile canlı analiz özelliği web sürümünde kapalıdır.</p>
            </div>
            <div className="disabled-panel">
              <h3>Bu özellik yalnızca mobil uygulamada çalışır</h3>
              <p>
                Web sürümünde kamera tabanlı gerçek zamanlı tespit devre dışıdır. Sunum ve rapor için
                bu alan demo amaçlı gösterilmektedir.
              </p>
              <button disabled>Kamerayı Başlat</button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
