# Ceyhun Elgin — Akademik Kişisel Web Sitesi

Tek sayfalık, dış bağımlılığı olmayan (framework kullanmayan) statik web sitesi.
Yayınlar `publications.json` dosyasından otomatik yüklenir; site GitHub Pages'de
ücretsiz yayında kalır. Kod bilmeden, **form doldurarak** içerik güncellenebilir.

## Özellikler

- Türkçe / İngilizce dil desteği (tek tıkla geçiş, tarayıcı ve URL ile otomatik)
- Açık / koyu tema (sistem tercihini takip eder, `localStorage`'da hatırlanır)
- Mobil uyumlu (responsive)
- Yayınlar arasında canlı arama / filtreleme
- Erişilebilir (skip-link, ARIA etiketleri, `prefers-reduced-motion`)
- Yazdırma desteği
- **Form doldurarak yayın ekleme/silme** — GitHub Actions otomatik günceller

## Dosya Yapısı

```
.
├── index.html          # Sayfa iskeleti (yayınlar hariç diğer tüm bölümler)
├── publications.json   # 126 yayın; site JS ile buradan render eder
├── css/style.css       # Tüm görsel stil
├── js/main.js          # Dil, tema, arama + yayın render + i18n sözlüğü
├── assets/
│   ├── favicon.svg
│   └── photo.jpg       # Hero bölümündeki portre fotoğrafı
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── new-publication.yml    # "Yeni Yayın Ekle" formu
    │   └── delete-publication.yml # "Yayın Sil" formu
    └── workflows/
        ├── add-publication.yml    # Issue → JSON güncelle → commit
        └── delete-publication.yml # Issue → JSON'dan sil → commit
```

---

## İçerik Güncelleme (kod bilmeden)

**Hiçbir dosyayı elle değiştirmenize gerek yok.** Tüm güncellemeler GitHub Issues
üzerindeki form aracılığıyla yapılır; site otomatik güncellenir.

### Yeni yayın eklemek

1. Repo'nun GitHub sayfasında **Issues** sekmesi → **New issue**.
2. Açılan seçeneklerden **"Yeni Yayin Ekle"** formunu seçin.
3. Alanları doldurun:
   - **Yıl** — örn. `2026` (zorunlu)
   - **Başlık** — makale/kitap başlığı (zorunlu)
   - **Yazarlar** — yardımcı yazardız ise `X and Y` yazın (opsiyonel; boş bırakınca tek yazar gösterilir)
   - **Dergi / yayın bilgisi** — dergi, cilt, sayfa (opsiyonel)
   - **DOI / Kaynak Bağlantısı** — yayının yanındaki dış link (opsiyonel)
4. **Submit** → arka planda GitHub Action `publications.json`'a ekler, commit atar,
   site ~1 dakika içinde güncellenir. Forma otomatik yanıt gelir, issue kapanır.
5. Hatalı/eksik formda Action size issue altında neyi düzeltmeniz gerektiğini yazar.

### Yayın silmek / düzeltmek

1. **Issues** → **New issue** → **"Yayin Sil / Duzelt"** formu.
2. Kaldırılacak yayının **tam başlığını** yazın (siteden kopyala-yapıştır en güvenli).
3. **Submit** → Action, başlığa en yakın eşleşmeyi bulur, JSON'dan çıkarır, site güncellenir.
4. Düzeltme için: önce silin, sonra doğru bilgilerle yeni "Ekle" formu gönderin.

### Kitap, proje, ders ve iletişim güncellemesi

Bu bölümler sık değişmediği için elle yapılır (`index.html` içinde ilgili blok).
İlgili bölüm HTML yorumlarıyla işaretlidir:

```html
<!-- ============ BOOKS ============ -->
<!-- ============ PROJECTS ============ -->
<!-- ============ TEACHING ============ -->
<!-- ============ CONTACT ============ -->
```

Kitap = `<article class="card">`, ders = `<article class="teach">` içinde `<li>` olarak
kopyala-yapıştır eklenir; yalnızca metin ve `href` değiştirilir.

> Not: Eğer kitap/proje/ders de sık güncellenecekse, yukarıdaki form mantığı
> `books.json`, `teaching.json` gibi dosyalara da genişletilebilir. Şu an yayınlar
> en sık güncellenen bölüm olduğu için oradadır.

### Fotoğrafı değiştirme

`assets/photo.jpg` dosyasını aynı isimle değiştirin. Önerilen: kareye yakın,
~512×512 px ve üzeri.

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

Bu üç yer dışında tüm yollar görecelidir (`assets/...`, `css/...`, `js/...`),
yani kök alan adına taşınırken ek bir değişiklik gerektirmez.

## Alternatif: JSON'u elle güncellemek

Form yerine doğrudan `publications.json` düzenlenebilir (GitHub web editöründe veya
yerelde). Her kayıt şu yapıda:

```json
{
  "year": 2026,
  "title": "Yayin Basligi",
  "authors": "Yazar2 and Yazar3",
  "venue": "Dergi, 60, 55-80.",
  "doi": "https://doi.org/10.xxx/xxx"
}
```

- `authors`, `venue`, `doi` değerleri yoksa `null` yazılır.
- Yıllar büyükten küçüğe otomatik sıralanır; elden sıralama gerekmez.
- Commit atılınca site otomatik güncellenir (GitHub Pages).

## Lisans

İçerik (yayın listeleri, biyografi vb.) Ceyhun Elgin'e aittir. Tasarım/kod
Muhammed Ebubekir Karalı tarafından, açık kaynak olarak hazırlanmıştır.
