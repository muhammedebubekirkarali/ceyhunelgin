# Ceyhun Elgin — Akademik Kişisel Web Sitesi

Tek sayfalık, dış bağımlılığı olmayan (framework kullanmayan) statik web sitesi.
Tüm içerik (yayınlar, kitaplar, dersler, projeler, iletişim) JSON dosyalarından
otomatik yüklenir. GitHub Pages'de ücretsiz yayında kalır. **Kod bilmeden,
GitHub Issues formu doldurarak** tüm bölümler güncellenebilir.

## Özellikler

- Türkçe / İngilizce dil desteği (tek tıkla geçiş, tarayıcı ve URL ile otomatik)
- Açık / koyu tema (sistem tercihini takip eder, `localStorage`'da hatırlanır)
- Mobil uyumlu (responsive)
- Yayınlar arasında canlı arama / filtreleme
- Erişilebilir (skip-link, ARIA etiketleri, `prefers-reduced-motion`)
- Yazdırma desteği
- **Form doldurarak tüm içerik güncelleme** — GitHub Actions otomatik işler
- **Düzeltme formunda dropdown + bot mevcut değerleri gösterir** — hoca yazmadan seçer, görerek düzeltir

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
└── .github/
    ├── ISSUE_TEMPLATE/                 # 13 form (her tür + ekle/düzelt/sil)
    │   ├── new-publication.yml         # "Yeni Yayın Ekle"
    │   ├── delete-publication.yml      # "Yayın Sil" (dropdown)
    │   ├── edit-publication.yml        # "Yayın Düzelt" (dropdown → bot göster)
    │   ├── kitap-ekle.yml / kitap-sil.yml / kitap-duzelt.yml
    │   ├── proje-ekle.yml / proje-sil.yml / proje-duzelt.yml
    │   ├── ders-ekle.yml / ders-sil.yml / ders-duzelt.yml
    │   └── iletisim-guncelle.yml
    └── workflows/
        ├── add-publication.yml         # Issue → publications.json ekle
        ├── delete-publication.yml      # Issue → publications.json sil
        ├── add-content.yml             # Issue → kitap/proje/ders ekle
        ├── delete-content.yml          # Issue → kitap/proje/ders sil
        ├── show-current.yml            # Issue açılınca mevcut değerleri göster
        ├── apply-edit.yml              # Yorum → düzeltme uygula
        └── regen-forms.yml             # JSON değişince dropdown'ları yenile
```

---

## İçerik Güncelleme (kod bilmeden)

**Hiçbir dosyayı elle değiştirmenize gerek yok.** Tüm güncellemeler GitHub Issues
üzerindeki form aracılığıyla yapılır; site otomatik güncellenir.

### Formlar

| Tür | Ekle | Düzelt | Sil |
|---|---|---|---|
| Yayın | **Yeni Yayın Ekle** | **Yayın Duzelt** | **Yayın Sil** |
| Kitap | **Kitap Ekle** | **Kitap Duzelt** | **Kitap Sil** |
| Proje | **Proje Ekle** | **Proje Duzelt** | **Proje Sil** |
| Ders | **Ders Ekle** | **Ders Duzelt** | **Ders Sil** |
| İletişim | — | **İletişim Güncelle** | — |

> İletişim tek nesne olduğu için "Ekle/Sil" yerine tek "Güncelle" formu var.

### Yayın eklemek (en sık)

1. **Issues** → **New issue** → **"Yeni Yayın Ekle"**.
2. Alanları doldurun: Yıl (zorunlu), Başlık (zorunlu), Yazarlar, Dergi/yayın bilgisi, DOI.
3. **Submit** → Action `publications.json`'a ekler, siteyi günceller, issue'ya yanıt bırakır ve kapatır.
4. Hatalı formda Action hatayı yorum olarak yazar.

### Yayın / kitap / proje / ders silmek

1. İlgili **"Sil"** formu → **dropdown'dan** silinecek öğeyi seçin.
2. **Submit** → Action JSON'dan çıkarır, site yenilenir.
   - Ders silerken: son ders silinen üniversitenin kartı otomatik kalkar.

### Kitap / proje / ders eklemek

1. İlgili **"Ekle"** formu → alanları doldurun.
   - **Ders**: Üniversite, Ders adı, Düzey (B.A./M.A./Ph.D.). Üniversite yeni ise yeni kart oluşturur; varsa o üniversiteye ekler.
2. **Submit** → ilgili JSON güncellenir, site yenilenir.

### Yayın / kitap / proje / ders DÜZELTMEK (bot gösterir → hoca düzeltir)

Bu, en güçlü akıştır. Hoca yazmadan seçer, mevcut değerleri görür, gördüğünü düzeltir:

1. **"Yayın Duzelt"** (veya kitap/proje/ders karşılığı) formu → **dropdown'dan** düzeltilecek öğeyi seçin → **Submit**.
2. **Bot, 1 dakika içinde bir yorum yazar:** seçili öğenin **mevcut tüm değerlerini** gösterir (örn. `yıl: 2020`, `başlık: Shadow Economies...`, `yazarlar: ...`, `dergi: ...`, `doi: ...`).
3. Hoca, o yoruma **cevap olarak** yalnızca değiştirmek istediği alanları yazar:
   ```
   yazarlar: Adem Y. Elveren and Eric Budd
   dergi: Journal of International Development, 60, 55-80.
   ```
   Boş bırakılan alanlar **korunur**. Format: `alan: yeni değer` (her satırda bir alan).
4. Bot, yorumu algılar, JSON'u günceller, siteyi yeniler, issue'yu kapatır.
5. Yorum boşsa bot "alan: yeni değer yazın" hatırlatması yapar; issue açık kalır, tekrar yazabilirsiniz.

**Alan adları** (her tür için):
- Yayın: `yıl`, `başlık`, `yazarlar`, `dergi`, `doi`
- Kitap/Proje: `başlık`, `etiket`, `not`, `bağlantı`, `bağlantı_metni`
- Ders: `üniversite`, `ders_adı`, `düzey` (B.A./M.A./Ph.D.)
- İletişim: `eposta` (`|` ile ayrı), `telefon`, `dis_linkler` (her satıra `URL | Etiket`)

### İletişim güncellemek

1. **"İletişim Güncelle"** → **Submit** (formda alan yok; hemen gönderin).
2. Bot, mevcut iletişimi yorumla gösterir.
3. Yoruma cevap olarak değiştirmek istediğiniz alanları yazın.
   - `dis_linkler: sil` yazarsanız tüm dış linkler boşalır.

### Fotoğrafı değiştirme

`assets/photo.jpg` dosyasını aynı isimle değiştirin (GitHub web arayüzünden veya push ile). Önerilen: kareye yakın, ~512×512 px ve üzeri.

### Dropdown'lar otomatik güncellenir

Her JSON değiştiğinde `regen-forms.yml` workflow'u tüm sil/düzelt formlarındaki dropdown listelerini yeniden üretir. Yeni yayın/kitap/ders eklediğinizde veya sildiğinizde, ilgili formlar bir sonraki açılışta güncel listeyi gösterir.

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

Form yerine doğrudan JSON dosyaları GitHub web editöründe düzenlenebilir.
Her dosyanın yapısı:

**publications.json**
```json
{ "year": 2026, "title": "...", "authors": "Y2 and Y3", "venue": "Dergi, 60, 55-80.", "doi": "https://..." }
```
- `authors`, `venue`, `doi` yoksa `null`.
- Yıllar büyükten küçüğe otomatik sıralanır.

**books.json / projects.json**
```json
{ "label": "English · Amazon", "title": "...", "note": "...", "link": "https://...", "link_label": "View on Amazon →" }
```

**teaching.json**
```json
{ "university": "Boğaziçi University", "courses": [ { "name": "...", "level": "B.A." } ] }
```

**contact.json**
```json
{ "mails": ["a@b.com"], "phone": "+90...", "phone_display": "+90 ...", "links": [ {"url":"https://...","label":"..."} ] }
```

Commit atılır atılmaz site otomatik güncellenir (GitHub Pages).

## Lisans

İçerik (yayın listeleri, biyografi vb.) Ceyhun Elgin'e aittir. Tasarım/kod
Muhammed Ebubekir Karalı tarafından, açık kaynak olarak hazırlanmıştır.
