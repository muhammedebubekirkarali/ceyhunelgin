# Ceyhun Elgin — Akademik Kişisel Web Sitesi

Tek sayfalık, dış bağımlılığı olmayan (framework kullanmayan) statik web sitesi.
Tüm içerik (yayınlar, kitaplar, dersler, projeler, iletişim) JSON dosyalarından
otomatik yüklenir. GitHub Pages'de ücretsiz yayında kalır. **Kod bilmeden,
tarayıcıdaki yönetim panelinden** tüm bölümler güncellenebilir.

## Özellikler

- Türkçe / İngilizce dil desteği (tek tıkla geçiş, tarayıcı ve URL ile otomatik)
- Açık / koyu tema (sistem tercihini takip eder, `localStorage`'da hatırlanır)
- Mobil uyumlu (responsive)
- Yayınlar arasında canlı arama / filtreleme
- Erişilebilir (skip-link, ARIA etiketleri, `prefers-reduced-motion`)
- Yazdırma desteği
- **Web tabanlı yönetim paneli** (`/admin/`) — kod görmeden, form doldurarak:
  - Yeni kayıt ekleme
  - **Dropdown'dan seçince mevcut değerler otomatik dolar, görerek düzeltir**
  - Silme

## Dosya Yapısı

```
.
├── index.html          # Sayfa iskeleti (içerikler boş konteyner olarak durur)
├── publications.json   # 126 yayın
├── books.json          # 5 kitap
├── projects.json       # 3 proje / medya
├── teaching.json       # 4 üniversitede verilen dersler
├── contact.json        # İletişim bilgileri (mail, telefon, linkler)
├── css/style.css       # Tüm görsel stil
├── js/main.js          # Dil, tema, arama + tüm bölümleri render + i18n sözlüğü
├── assets/
│   ├── favicon.svg
│   └── photo.jpg       # Hero bölümündeki portre fotoğrafı
├── admin/
│   ├── index.html     # Yönetim paneli (giriş + formlar) — /admin/ adresinde açılır
│   └── admin.js       # GitHub Contents API client (vanilla JS, bağımlılık yok)
└── .nojekyll           # GitHub Pages'in admin/ klasörünü olduğu gibi sunması için
```

> Not: `.github/` (Issue Forms + Actions) kaldırıldı; yönetim artık tarayıcı
> paneli üzerinden GitHub Contents API'ye doğrudan gidiyor. Backend yok; panel
> statik dosya, token yalnızca hocanın tarayıcısında `localStorage`'da durur.

---

## İçerik Güncelleme (kod bilmeden)

### 1. Paneli aç

- Site adresi kökünde `/admin/` açın: örn `https://ceyhunelgin.com/admin/`
  (veya geliştirme ortamında `http://localhost:8000/admin/`).
- Bu sayfa Google'da dizinlenmez (`noindex`).

### 2. Giriş (yalnız bir kez)

Panele girmek için:

1. **GitHub deposu**: `kullanıcı/repo` biçiminde (örn `ceyhunelgin/ceyhunelgin`).
2. **Dal**: genelde `main`.
3. **Personal Access Token**: GitHub → Settings → Developer settings →
   Personal access tokens (classic) → **Generate new token (classic)** →
   açıklama `ceyhunelgin-panel`, süre örn. 90 gün, **`repo`** yetkisi → Generate.
   Token'ı kopyalayın (`ghp_...`).
4. Panele yapıştırın → **Giriş**.
5. Token tarayıcınızın `localStorage`'ında saklanır; hiçbir sunucudan geçmez.
   Sayfa yeniden açınca otomatik giriş yapar. Çıkış yapıldığında silinir.

> Güvenlik: token `repo` yetkisine sahiptir; kimseyle paylaşılmamalı. Panel
> yalnızca sizin tarafınızdan bilinen URL'de durur. Token'ı kopyaladıktan sonra
> GitHub sekmesini kapatabilirsiniz.

### 3. Bölümler (sekmeler)

Panelde 5 sekme var: **Yayınlar · Kitaplar · Projeler · Dersler · İletişim**.

#### Ekleme
- Sekmenin üst kısmında **"Yeni kayıt ekle"** formu.
- Alanları doldurun → **Ekle** → site otomatik güncellenir (~1 dakika).

#### Düzeltme (dropdown → alanlar dolar)
- Sekmenin altında **"Düzenlenecek kaydı seçin"** açılır menüsü.
- Bir kayıt seçtiğiniz anda form **mevcut tüm değerleriyle dolar** (yıl, başlık,
  yazarlar, dergi, DOI vb. — veya türün alanları).
- Doğrudan gördüğünüz değerleri değiştirin → **Kaydet**.
- Site otomatik güncellenir.

#### Silme
- Aynı düzeltme formunun altındaki **Sil** butonu (onaylı).

#### İletişim
- Tek form: e-posta (| ayraç), telefon, dış linkler (her satıra `URL | Etiket`).
- **Kaydet** → contact.json güncellenir, site yenilenir.

### Fotoğrafı değiştirme

`assets/photo.jpg` dosyasını GitHub web arayüzünden aynı isimle değiştirin.
Önerilen: kareye yakın, ~512×512 px ve üzeri.

---

## Yayına Alma

Site statiktir; herhangi bir statik hostta çalışır. GitHub Pages önerilir
(ücretsiz). Kurulum adımları için `DOMAIN-KURULUM.md` dosyasına bakın.

## Alan Adını (URL) Değiştirme

Site başka bir alan adına taşınırsa, `index.html` `<head>` bölümündeki şu satırlar
güncellenmelidir:

```html
<meta property="og:url" content="https://ceyhunelgin.com/">
<meta property="og:image" content="https://ceyhunelgin.com/assets/photo.jpg">
```

ve JSON-LD bloğunda:

```json
"url": "https://ceyhunelgin.com/"
```

Bu üç yer dışında tüm yollar görecelidir (`assets/...`, `css/...`, `js/...`,
`admin/...`), yani kök alan adına taşınırken ek bir değişiklik gerektirmez.

## Alternatif: JSON'u elle güncellemek

Form yerine doğrudan JSON dosyaları GitHub web editöründe düzenlenebilir.
Her dosyanın yapısı:

**publications.json** — `{ "year": 2026, "title": "...", "authors": "...", "venue": "...", "doi": "https://..." }`
(`authors`, `venue`, `doi` yoksa `null`; yıllar büyükten küçüğe otomatik sıralanır.)

**books.json / projects.json** — `{ "label": "...", "title": "...", "note": "...", "link": "...", "link_label": "..." }`

**teaching.json** — `{ "university": "...", "courses": [ { "name": "...", "level": "B.A." } ] }`

**contact.json** — `{ "mails": [...], "phone": "...", "phone_display": "...", "links": [{"url":"...","label":"..."}] }`

Commit atılır atılmaz site otomatik güncellenir (GitHub Pages).

## Lisans

İçerik (yayın listeleri, biyografi vb.) Ceyhun Elgin'e aittir. Tasarım/kod
Muhammed Ebubekir Karalı tarafından, açık kaynak olarak hazırlanmıştır.
