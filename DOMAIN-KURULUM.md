# Alan Adı ve Yayına Alma Kurulumu

Bu dosya, siteyi GitHub Pages üzerinden yayına alıp `ceyhunelgin.com` alan adına
bağlamayı adım adım anlatır. Hiçbir terminal bilgisi gerektirmez; tüm adımlar
GitHub ve alan adı sağlayıcısının web arayüzünden yapılır.

Muhammed (tasarımı hazırlayan) bu adımları baştan sona yazılı olarak teslim eder;
Ceyhun Hoca yalnızca kendi hesap/alan adı bilgileriyle uygular. Kullanıcı adı
ya da şifre paylaşımı gerekmez.

---

## Bölüm 1 — Yeni GitHub Deposu (repo) Açma

Bu adımı **Ceyhun Hoca** yapar.

1. GitHub'a giriş yap: https://github.com/login
2. Sağ üstte **+** → **New repository** tıkla.
3. Ayarlar:
   - **Repository name:** `ceyhunelgin` (önerilir; site `kullaniciadi.github.io/ceyhunelgin`
     adresinde görünür)
   - **Description:** (opsiyonel) `Akademik kişisel web sitesi`
   - **Visibility:** **Public** (GitHub Pages ücretsiz sürümde public repoda çalışır)
   - **Initialize this repository with:** hiçbir kutuyu işaretleme (boş repo açılacak).
4. **Create repository** tıkla. Boş repo ekranı gelir.

---

## Bölüm 2 — Dosyaları Yeni Repoya Yükleme

Yükleme iki yolla yapılabilir. Hoca için en kolayı **web arayüzüyle sürükle-bırak**tır.

### Yol A — Web arayüzü (önerilen, kod gerekmez)

1. Repo boş durumda: `…or create a new file (README)` gibi bir yazı görürsün.
   "**uploading an existing file**" bağlantısına tıkla.
2. Bu projedeki tüm dosya/klasörleri (kendi bilgisayarına indirdikten sonra)
   sürükle-bırak ile yükle:
   - `index.html`
   - `css/` klasörü (içinde `style.css`)
   - `js/` klasörü (içinde `main.js`)
   - `assets/` klasörü (`favicon.svg` ve `photo.jpg`)
   - `README.md`
   - `DOMAIN-KURULUM.md` (bu dosya)
3. Altta **Commit changes** bölümü çıkar. Başlık: `Site kuruldu` (örnek).
   **Commit changes** tıkla.

### Yol B — Terminal (git komutuyla)

Eğer hoca terminal kullanıyorsa, Muhammed'in verdiği hazır koddan:

```bash
git clone https://github.com/KULLANICI/ceyhunelgin.git
# dosyaları içine kopyala
cd ceyhunelgin
git add .
git commit -m "Site kuruldu"
git push
```

---

## Bölüm 3 — GitHub Pages'i Açma

1. Repo sayfasında **Settings** (üst sekme) → sol menüden **Pages**.
2. **Build and deployment** bölümü:
   - **Source:** **Deploy from a branch**
   - **Branch:** `main` / **(root)** seç → **Save**.
3. 1–2 dakika sonra sayfa yenilenir; üstte yeşil kutu içinde
   `Your site is live at https://KULLANICI.github.io/ceyhunelgin/` yazar.
   Bu adresi tarayıcıda açıp siteyi doğrula.

Bu noktada site yayında. Sıradaki adımlar yalnızca `ceyhunelgin.com` alan adına
bağlamak isteniyorsa gerekli.

---

## Bölüm 4 — `ceyhunelgin.com` Alan Adını GitHub'a Bağlama

Bu adım, hocanın alan adı satın aldığı firmanın (GoDaddy, İsimtescil, NICS, vb.)
**DNS / alan adı yönetimi** panelinden yapılır. GitHub tarafında da bir ayar var.

### 4.1 — GitHub tarafında (repo)

1. Repo → **Settings** → **Pages** → **Custom domain** kutusu.
2. `ceyhunelgin.com` yaz → **Save**.
3. **Enforce HTTPS** kutusu birkaç dakika sonra aktifleşince işaretle (ücretsiz SSL).

### 4.2 — Alan adı firması tarafında (DNS)

Alan adı panelinde **DNS Records** (DNS kayıtları) bölümüne şu iki kayıt eklenir.
Mevcut `A` veya `www CNAME` kayıtları varsa önce silinir.

**Kök alan (ceyhunelgin.com) için A kaydı:**

| Tip | Ad/Host | Değer | TTL |
|-----|--------|-------|-----|
| A   | `@`    | `185.199.108.153`  | 600 / varsayılan |
| A   | `@`    | `185.199.109.153`  | 600 |
| A   | `@`    | `185.199.110.153`  | 600 |
| A   | `@`    | `185.199.111.153`  | 600 |

(Tek alan adına 4 ayrı A kaydı eklenir; hepsi yukarıdaki IP'ler.)

**`www` alt alanı için CNAME kaydı:**

| Tip   | Ad/Host | Değer | TTL |
|-------|---------|-------|-----|
| CNAME | `www`   | `KULLANICI.github.io` | 600 |

`KULLANICI` → Hocanın GitHub kullanıcı adı.

### 4.3 — Doğrulama

- DNS yayılıp GitHub doğruladıktan sonra (en çok birkaç saat) site
  `https://ceyhunelgin.com` adresinden açılır.
- Settings → Pages'te **Custom domain** altında "DNS check successful" görünmeli.
- `https://www.ceyhunelgin.com` da köke yönlendirilir (otomatik).

---

## Bölüm 5 — og:url / og:image Güncelleme (opsiyonel ama önerilir)

Alan adı bağlandıktan sonra, paylaşımda doğru önizleme görünmesi için
`index.html` `<head>` içindeki mutlak bağlantılar güncel olmalıdır:

```html
<meta property="og:url" content="https://ceyhunelgin.com/">
<meta property="og:image" content="https://ceyhunelgin.com/assets/photo.jpg">
```

ve JSON-LD:

```json
"url": "https://ceyhunelgin.com/"
```

Bu dosya teslim edildiğinde bu değerler zaten `https://ceyhunelgin.com/` olarak
yazılıdır. Farklı bir alan adı kullanılırsa yalnızca bu üç satır değiştirilir.

---

## Soru-Cevap

**— GitHub kullanıcı adım ne olacak, repo adımı etkiler mi?**
Evet. Repo adı `ceyhunelgin` olduğu sürece `www` CNAME hedefi
`KULLANICI.github.io` olur (repo adı değil kullanıcı adı yazılır).

**— Ücret var mı?**
Hayır. GitHub Pages ücretsizdir (public repo). HTTPS sertifikası da ücretsiz.

**— Güncellemeleri nasıl yapacağım?**
`README.md` içinde "İçerik Güncelleme" bölümüne bakın. En sık yapılan
güncellemeler (yayın/kitap/ders ekleme) örneklerle anlatıldı.

**— URL alan adına taşınınca eski github.io linki çalışır mı?**
Evet, ikisi de çalışır; GitHub Pages kök alan adına yönlendirme yapmaz ama
her iki adres de geçerli kalır. İsterseniz eski adresi yönlendirtebiliriz.
