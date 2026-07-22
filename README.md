# Ceyhun Elgin — Akademik Kişisel Web Sitesi

Tek sayfalık, dış bağımlılığı olmayan (framework kullanmayan) statik web sitesi.
Sadece `index.html`, `css/style.css`, `js/main.js` ve `assets/` klasöründen oluşur.

## Özellikler

- Türkçe / İngilizce dil desteği (tek tıkla geçiş, tarayıcı ve URL üzerinden otomatik)
- Açık / koyu tema (sistem tercihini takip eder, `localStorage`'da hatırlanır)
- Mobil uyumlu (responsive)
- Yayınlar arasında canlı arama / filtreleme
- Erişilebilir (skip-link, ARIA etiketleri, `prefers-reduced-motion`)
- Yazdırma desteği

## Dosya Yapısı

```
.
├── index.html          # Sayfanın tüm içeriği (yayınlar, kitaplar, dersler...)
├── css/style.css       # Tüm görsel stil
├── js/main.js          # Dil, tema, arama, menü etkileşimleri + i18n sözlüğü
└── assets/
    ├── favicon.svg
    └── photo.jpg       # Hero bölümündeki portre fotoğrafı
```

## İçerik Güncelleme

Her şey tek bir HTML dosyasında. İçeriği güncellemek için `index.html` açılır ve ilgili
bölüm bulunur. Aşağıda en sık yapılacak güncellemeler örneklenmiştir.

### 1) Yeni yayın eklemek

Yayınlar, "PUBLICATIONS" bölümünde yıllara göre `<details class="year">` blokları
içinde listelenir. Bir yayını eklemek için, ait olduğu yılın bloğundaki `<ol class="pubs">`
içine yeni bir `<li>` satırı eklenir.

Biçim:

```html
<li>Başlık (with Yazar). <em>Dergi, cilt(sayı), sayfalar.</em>
  <a class="pub-src" href="DOI-VEYA-KAYNAK-LINKI" target="_blank" rel="noopener" title="Kaynak / DOI">↗</a>
</li>
```

Kurallar:
- Yayın metni `<em>...</em>` arasına dergi/ciltbilgisi konur (gri italik görünür).
- DOI/kaynak linki varsa `<a class="pub-src">` ile eklenir; yoksa `<a>` satırı hiç eklenmez.
- Yeni yıl ekleniyorsa, mevcut bir `<details class="year">` bloğu kopyalanıp
  `year__label` (yıl) ve `year__count` (o yılın yayın sayısı) güncellenir.
  Yeni yılın açılır gelmesini istemiyorsanız `<details class="year">` (open olmadan),
  açık gelmesini istiyorsanız `<details class="year" open>` yazın.

Önemli: Her yılın `<summary>` içindeki `<span class="year__count">` rakamı,
o yılın `<li>` sayısıyla **birebir aynı** olmalı. Aksi halde arama/filtre sayacı hatalı görünür.
Varsayılan açık yıl 2026'dır (`<details class="year" open>`).

### 2) Yayın sayacı ve "intro" metni

Üstteki "126 journal articles..." metni ve stats bandındaki "126" rakamı elle yazılır.
Yayın ekledikçe şurada iki yer güncellenmelidir:

- `index.html` satır civarı 105: `<span class="stat__num">126</span>`
- `index.html` satır civarı 183:
  `<p class="section__intro" data-i18n="pubs.intro">126 journal articles...</p>`

Çeviri metinleri de `js/main.js` içindeki `pubs.intro` anahtarında EN ve TR olarak tutulur;
sayı orada da elle güncellenir.

### 3) Kitap / proje / ders / iletişim güncelleme

Her bölüm `index.html` içinde HTML yorumuyla işaretlenmiştir:

```html
<!-- ============ BOOKS ============ -->
<!-- ============ PROJECTS ============ -->
<!-- ============ PUBLICATIONS ============ -->
<!-- ============ TEACHING ============ -->
<!-- ============ CONTACT ============ -->
```

Kitap = `<article class="card">`, ders = `<article class="teach">` içinde `<li>` olarak
kopyala-yapıştır mantığıyla eklenir. Yalnızca metin ve `href` değiştirilir.

### 4) Çevirileri (İngilizce/Türkçe) güncelleme

Sayfadaki görünen metinlerin çevirileri `js/main.js` içindeki `I18N` sözlüğünde
`en:` ve `tr:` blokları halinde tutulur. Bir metni değiştirmek veya yeni bir
çevirilebilir metin eklemek için:

- HTML'de ilgili öğeye `data-i18n="anahtar"` eklenir,
- `js/main.js` içinde her iki dilde (`en:` ve `tr:`) o `anahtar` tanımlanır.

Örnek:

```html
<h3 data-i18n="books.b6title">Yeni Kitap</h3>
```

```js
// js/main.js içinde en: blok
'books.b6title': 'New Book',
// tr: blok
'books.b6title': 'Yeni Kitap',
```

Yayın başlıkları (kendi içinde zaten çok dilli olduğu için) `data-i18n`'e bağlı değil;
doğrudan HTML içine yazılır.

### 5) Fotoğrafı değiştirme

`assets/photo.jpg` dosyasını aynı isimle değiştirmek yeterlidir. Önerilen:
kareye yakın, ~512×512 px ve üzeri. HTML'de `width="128" height="128"` gösterim
boyutudur, dosya boyutu değildir.

### 6) Alan adını (URL) değiştirme

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

Bu üç yer dışında tüm yollar görecelidir (`assets/...`, `css/...`, `js/...`),
yani kök alan adına taşınırken ek bir değişiklik gerektirmez.

## Yayına Alma

Site statiktir; herhangi bir statik hostta çalışır. GitHub Pages önerilir
(ücretsiz). Kurulum adımları için `DOMAIN-KURULUM.md` dosyasına bakın.

## Lisans

İçerik (yayın listeleri, biyografi vb.) Ceyhun Elgin'e aittir. Tasarım/kod
Muhammed Ebubekir Karalı tarafından, açık kaynak olarak hazırlanmıştır.
