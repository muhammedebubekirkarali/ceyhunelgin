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
    ├── ISSUE_TEMPLATE/
    │   ├── new-publication.yml    # "Yeni Yayın Ekle"
    │   ├── icerik-ekle.yml         # "İçerik Ekle" (kitap/proje/ders/iletişim)
    │   └── icerik-sil.yml          # "İçerik Sil" (kitap/proje/ders)
    └── workflows/
        ├── add-publication.yml     # Issue → publications.json
        ├── delete-publication.yml  # Issue → publications.json sil
        ├── icerik-ekle.yml         # Issue → ilgili JSON (kitap/proje/ders/iletişim)
        └── icerik-sil.yml          # Issue → ilgili JSON silme
```

---

## İçerik Güncelleme (kod bilmeden)

**Hiçbir dosyayı elle değiştirmenize gerek yok.** Tüm güncellemeler GitHub Issues
üzerindeki form aracılığıyla yapılır; site otomatik güncellenir.

### Yayın eklemek (en sık)

1. Repo'nun GitHub sayfasında **Issues** → **New issue**.
2. **"Yeni Yayin Ekle"** formunu seçin.
3. Alanları doldurun: Yıl (zorunlu), Başlık (zorunlu), Yazarlar, Dergi/yayın bilgisi, DOI.
4. **Submit** → Action `publications.json`'a ekler, siteyi günceller, issue'ya yanıt bırakır ve kapatır.
5. Hatalı formda Action hatayı yorum olarak yazar.

### Yayın silmek

1. **"Yayin Sil / Duzelt"** formu → yayının **tam başlığını** yazın.
2. Action başlığa göre bulup JSON'dan çıkarır. Çok esnek (büyük/küçük harf, baş/son boşluk duyarsız).

### Kitap / Proje / Ders eklemek

1. **"Icerik Ekle"** formu → "İçerik türü" açılır menüsünden `kitap`, `proje`, `ders` veya `iletisim` seçin.
2. Sadece seçtiğiniz türle ilgili alanları doldurun (diğerleri boş kalabilir).
   - **Kitap/Proje**: Başlık, Etiket, Not, Bağlantı, Bağlantı metni.
   - **Ders**: Üniversite, Ders adı, Düzey (B.A./M.A./Ph.D.). Üniversite yeni ise yeni kart oluşturur; varsa o üniversiteye ekler.
   - **İletişim**: Tüm iletişim bölümünü girdiklerinizle **değiştirir** (ek değil). Mail'leri `|` ile ayırın; dış linkleri her satıra bir tane `URL|Etiket` biçiminde yazın.
3. **Submit** → ilgili JSON güncellenir, site yenilenir.

### Kitap / Proje / Ders silmek

1. **"Icerik Sil / Duzelt"** formu → tür seçin → kaldırılacak öğenin tam adını yazın.
   - Ders silerken üniversite adını da yazın (hangi üniversiteden silineceğini belirler).
2. Action eşleşen öğeyi bulup JSON'dan çıkarır. Bir üniversitenin son dersi silinirse üniversite kartı da otomatik kalkar.

### Fotoğrafı değiştirme

`assets/photo.jpg` dosyasını aynı isimle değiştirin (GitHub web arayüzünden veya push ile). Önerilen: kareye yakın, ~512×512 px ve üzeri.

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
