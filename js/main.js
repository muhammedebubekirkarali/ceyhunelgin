// ============================================================
// Ceyhun Elgin — site interactions + i18n (TR/EN)
// ============================================================

const root = document.documentElement;

// ---------- i18n dictionary ----------
const I18N = {
  en: {
    'meta.title': 'Ceyhun Elgin — Professor of Economics, Boğaziçi University',
    'a11y.skip': 'Skip to main content',
    'a11y.themeDark': 'Switch to dark theme',
    'a11y.themeLight': 'Switch to light theme',
    'a11y.menu': 'Toggle menu',
    'a11y.toTop': 'Back to top',
    'a11y.mainnav': 'Main navigation', 'a11y.tags': 'Research interests',
    'a11y.stats': 'Overview', 'a11y.footnav': 'Footer',
    'nav.about': 'About', 'nav.books': 'Books', 'nav.projects': 'Projects',
    'nav.publications': 'Publications', 'nav.teaching': 'Teaching', 'nav.contact': 'Contact',
    'hero.kicker': 'Professor of Economics · Boğaziçi University',
    'hero.bio': 'Ph.D. in Economics, University of Minnesota, 2010. My research focuses on macroeconomics, growth and development, the informal (shadow) economy, public economics and political economics.',
    'hero.tag1': 'Macroeconomics', 'hero.tag2': 'Growth & Development',
    'hero.tag3': 'Informal (Shadow) Economy', 'hero.tag4': 'Public Economics', 'hero.tag5': 'Political Economics',
    'hero.cv': 'Download CV',
    'facts.affiliation': 'Affiliation', 'facts.affiliation.v': 'Boğaziçi University, Department of Economics',
    'facts.doctorate': 'Doctorate', 'facts.doctorate.v': 'University of Minnesota, 2010',
    'facts.office': 'Office', 'facts.phone': 'Phone',
    'stats.pubs': 'Publications', 'stats.books': 'Books', 'stats.unis': 'Universities', 'stats.links': 'DOI / Source Links',
    'books.title': 'Books',
    'projects.title': 'Projects & Media',
    'pubs.title': 'Publications',
    'pubs.intro': '{n} journal articles, book chapters and books — grouped by year. Click a year to expand.',
    'pubs.search': 'Filter publications… (e.g. informality, COVID, growth)',
    'pubs.expandAll': 'Expand all', 'pubs.collapseAll': 'Collapse all',
    'pubs.found': '{n} matching publications', 'pubs.none': 'No publications found',
    'teach.title': 'Teaching',
    'contact.title': 'Contact', 'contact.mail': 'E-mail', 'contact.phone': 'Phone',
    'contact.addr': 'Address',
    'contact.addr.v': 'Boğaziçi University, Department of Economics<br>Bebek, 34342 Beşiktaş / İstanbul, Türkiye',
    'contact.links': 'Links',
    'footer.tag': 'Professor of Economics, Boğaziçi University',
    'footer.line': '© 2026 Ceyhun Elgin · All rights reserved.',
    'pubsrc.source': 'Source / DOI'
  },
  tr: {
    'meta.title': 'Ceyhun Elgin — İktisat Profesörü, Boğaziçi Üniversitesi',
    'a11y.skip': 'İçeriğe atla',
    'a11y.themeDark': 'Koyu temaya geç',
    'a11y.themeLight': 'Açık temaya geç',
    'a11y.menu': 'Menüyü aç/kapat',
    'a11y.toTop': 'Yukarı dön',
    'a11y.mainnav': 'Ana gezinme', 'a11y.tags': 'Araştırma alanları',
    'a11y.stats': 'Genel bakış', 'a11y.footnav': 'Alt bilgi',
    'nav.about': 'Hakkında', 'nav.books': 'Kitaplar', 'nav.projects': 'Projeler',
    'nav.publications': 'Yayınlar', 'nav.teaching': 'Dersler', 'nav.contact': 'İletişim',
    'hero.kicker': 'İktisat Profesörü · Boğaziçi Üniversitesi',
    'hero.bio': 'Doktora: Minnesota Üniversitesi, 2010. Araştırmalarım makroekonomi, büyüme ve kalkınma, kayıt dışı ekonomi, kamu iktisadı ve politik iktisat alanlarına odaklanıyor.',
    'hero.tag1': 'Makroekonomi', 'hero.tag2': 'Büyüme ve Kalkınma',
    'hero.tag3': 'Kayıt Dışı Ekonomi', 'hero.tag4': 'Kamu İktisadı', 'hero.tag5': 'Politik İktisat',
    'hero.cv': 'CV İndir',
    'facts.affiliation': 'Kurum', 'facts.affiliation.v': 'Boğaziçi Üniversitesi, İktisat Bölümü',
    'facts.doctorate': 'Doktora', 'facts.doctorate.v': 'Minnesota Üniversitesi, 2010',
    'facts.office': 'Ofis', 'facts.phone': 'Telefon',
    'stats.pubs': 'Yayın', 'stats.books': 'Kitap', 'stats.unis': 'Üniversite', 'stats.links': 'DOI / Kaynak Bağlantısı',
    'books.title': 'Kitaplar',
    'projects.title': 'Projeler ve Medya',
    'pubs.title': 'Yayınlar',
    'pubs.intro': '{n} makale, kitap bölümü ve kitap — yıllara göre gruplandırıldı. Açmak için bir yıla tıklayın.',
    'pubs.search': 'Yayınlarda ara… (örn. kayıt dışı, COVID, büyüme)',
    'pubs.expandAll': 'Tümünü aç', 'pubs.collapseAll': 'Tümünü kapat',
    'pubs.found': '{n} yayın bulundu', 'pubs.none': 'Yayın bulunamadı',
    'teach.title': 'Dersler',
    'contact.title': 'İletişim', 'contact.mail': 'E-posta', 'contact.phone': 'Telefon',
    'contact.addr': 'Adres',
    'contact.addr.v': 'Boğaziçi Üniversitesi, İktisat Bölümü<br>Bebek, 34342 Beşiktaş / İstanbul, Türkiye',
    'contact.links': 'Bağlantılar',
    'footer.tag': 'İktisat Profesörü, Boğaziçi Üniversitesi',
    'footer.line': '© 2026 Ceyhun Elgin · Tüm hakları saklıdır.',
    'pubsrc.source': 'Kaynak / DOI'
  }
};

let LANG = 'en';
const t = (key) => (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;

// ---------- Theme icons ----------
const ICON_SUN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.3 4.3l1.7 1.7M18 18l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.3 19.7L6 18M18 6l1.7-1.7"/></svg>';
const ICON_MOON = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5z"/></svg>';

const themeBtn = document.getElementById('themeToggle');

function setTheme(theme, skipSave) {
  root.dataset.theme = theme;
  themeBtn.innerHTML = theme === 'dark' ? ICON_SUN : ICON_MOON;
  themeBtn.setAttribute('aria-label', t(theme === 'dark' ? 'a11y.themeLight' : 'a11y.themeDark'));
  if (!skipSave) { try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ } }
}

themeBtn.addEventListener('click', () =>
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')
);

// ---------- Publications: JSON veri + render + filter/expand ----------
const pubsList = document.getElementById('pubsList');
const searchInput = document.getElementById('pubSearch');
const status = document.getElementById('pubStatus');
let yearBlocks = [];   // renderPubs sonrasi dolar
let allPubs = [];      // publications.json icerigi

// JSON'dan tek bir yayini HTML <li> stringine cevir (XSS'e karsi escape)
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function pubToLi(pub) {
  let title = escapeHtml(pub.title);
  if (pub.authors) title += ' (with ' + escapeHtml(pub.authors) + ')';
  const venue = pub.venue ? ' <em>' + escapeHtml(pub.venue) + '</em>' : '';
  const doi = pub.doi
    ? ' <a class="pub-src" href="' + escapeHtml(pub.doi) + '" target="_blank" rel="noopener" title="' + t('pubsrc.source') + '">&#8599;</a>'
    : '';
  return '<li>' + title + '.' + venue + doi + '</li>';
}

// Yillara gore grupla ve #pubsList icine render et
function renderPubs(pubs) {
  allPubs = pubs;
  // yil -> [pub] (buyukten kucuge)
  const byYear = new Map();
  pubs.forEach((p) => {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year).push(p);
  });
  const years = [...byYear.keys()].sort((a, b) => b - a);

  let html = '';
  years.forEach((y, i) => {
    const items = byYear.get(y);
    html += '<details class="year"' + (i === 0 ? ' open' : '') + '>';
    html += '<summary><span class="year__label">' + y + '</span>';
    html += '<span class="year__count">' + items.length + '</span></summary>';
    html += '<ol class="pubs">';
    html += items.map(pubToLi).join('');
    html += '</ol></details>';
  });
  pubsList.innerHTML = html;
  pubsList.removeAttribute('aria-live');

  yearBlocks = [...pubsList.querySelectorAll('details.year')];
  yearBlocks.forEach((d) => {
    d.dataset.count = d.querySelector('.year__count').textContent;
    observeReveal(d);
  });

  // pub-src data-kind baslik siniflandirmasi (mevcut ilklendirme mantigi)
  pubsList.querySelectorAll('.pub-src').forEach((a) => {
    a.title = t('pubsrc.source');
  });

  // toplam sayiyi intro/stat guncelle
  updateCounts(pubs.length);
  resetFilter();
}

function updateCounts(total) {
  const introEl = document.querySelector('.section__intro[data-i18n="pubs.intro"]');
  if (introEl) {
    // hem '126' literal hem '{n}' placeholder deste
    introEl.textContent = t('pubs.intro').replace(/\{n\}|\d+/, String(total));
  }
  setStat(0, total);
}

function resetFilter() {
  yearBlocks.forEach((d, i) => {
    d.style.display = '';
    d.querySelector('.year__count').textContent = d.dataset.count;
    d.querySelectorAll('.pubs li').forEach((li) => (li.style.display = ''));
    d.open = i === 0;
  });
  status.textContent = '';
}

function runFilter() {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length === 0) { resetFilter(); return; }
  if (q.length < 2) { resetFilter(); status.textContent = ''; return; }

  let total = 0;
  yearBlocks.forEach((d) => {
    let n = 0;
    d.querySelectorAll('.pubs li').forEach((li) => {
      const hit = li.textContent.toLowerCase().includes(q);
      li.style.display = hit ? '' : 'none';
      if (hit) n++;
    });
    d.open = n > 0;
    d.style.display = n ? '' : 'none';
    d.querySelector('.year__count').textContent = n;
    total += n;
  });
  status.textContent = total ? t('pubs.found').replace('{n}', total) : t('pubs.none');
}

searchInput.addEventListener('input', runFilter);

document.getElementById('expandAll').addEventListener('click', () => {
  searchInput.value = '';
  resetFilter();
  yearBlocks.forEach((d) => (d.open = true));
});

document.getElementById('collapseAll').addEventListener('click', () => {
  searchInput.value = '';
  resetFilter();
  yearBlocks.forEach((d) => (d.open = false));
});

// publications.json'u yukle ve render et
fetch('publications.json')
  .then((r) => {
    if (!r.ok) throw new Error('publications.json yuklenemedi: ' + r.status);
    return r.json();
  })
  .then(renderPubs)
  .catch((err) => {
    pubsList.innerHTML = '<p style="color:var(--muted)">' + escapeHtml(err.message) + '</p>';
  });

// ---------- Books / Projects / Teaching / Contact ----------
const BOOK_ICON = '<span class="card__icon"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19a2 2 0 012-2h13"/></svg></span>';
const YT_ICON = '<span class="card__icon"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z"/></svg></span>';
const INDEX_ICON = '<span class="card__icon"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20h18M6 16v-5m6 5V8m6 8v-9"/></svg></span>';
const AWARD_ICON = '<span class="card__icon"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5"/></svg></span>';

function cardIcon(label) {
  if (!label) return BOOK_ICON;
  // kelime-bazli eslesme (O2: substring false-positive onlenir)
  const re = (s) => new RegExp('\\b' + s + '\\b', 'i');
  if (re('youtube').test(label)) return YT_ICON;
  if (/\b(dataset|index|endeks|veri)\b/i.test(label)) return INDEX_ICON;
  if (/\b(eu|ab|funded|destek)\b/i.test(label)) return AWARD_ICON;
  return BOOK_ICON;
}

let booksData = [], projectsData = [], teachingData = [], contactData = null;

function setStat(index, value) {
  const nums = document.querySelectorAll('.stat__num');
  if (nums[index]) nums[index].textContent = value;
}

function renderCard(item, container) {
  let html = '<article class="card">';
  html += cardIcon(item.label || '');
  if (item.label) html += '<p class="card__label">' + escapeHtml(item.label) + '</p>';
  if (item.title) html += '<h3 class="card__title">' + escapeHtml(item.title) + '</h3>';
  if (item.note) html += '<p class="card__note">' + escapeHtml(item.note) + '</p>';
  if (item.link) html += '<a class="card__link" href="' + escapeHtml(item.link) + '" target="_blank" rel="noopener">' + escapeHtml(item.link_label || item.link) + '</a>';
  html += '</article>';
  return html;
}

function renderBooks(items) {
  booksData = items;
  const c = document.getElementById('booksList');
  if (!c) return;
  c.innerHTML = '<div class="cards">' + items.map((it) => renderCard(it, c)).join('') + '</div>';
  c.querySelectorAll('.card').forEach((el) => observeReveal(el));
  setStat(1, items.length);
}

function renderProjects(items) {
  projectsData = items;
  const c = document.getElementById('projectsList');
  if (!c) return;
  c.innerHTML = '<div class="cards">' + items.map((it) => renderCard(it, c)).join('') + '</div>';
  c.querySelectorAll('.card').forEach((el) => observeReveal(el));
}

function renderTeaching(items) {
  teachingData = items;
  const c = document.getElementById('teachingList');
  if (!c) return;
  let html = '<div class="teach-grid">';
  items.forEach((u) => {
    html += '<article class="teach">';
    html += '<h3>' + escapeHtml(u.university || '') + '</h3>';
    html += '<ul>';
    (u.courses || []).forEach((co) => {
      html += '<li>' + escapeHtml(co.name || '') + ' <span class="teach__level">' + escapeHtml(co.level || '') + '</span></li>';
    });
    html += '</ul></article>';
  });
  html += '</div>';
  c.innerHTML = html;
  c.querySelectorAll('.teach').forEach((el) => observeReveal(el));
  setStat(2, items.length);
}

function renderContact(data) {
  contactData = data;
  const c = document.getElementById('contactList');
  if (!c) return;
  const mailIcon = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  const phoneIcon = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>';
  const addrIcon = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const linkIcon = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 007.1 0l2-2a5 5 0 00-7.1-7.1l-1.2 1.2M14 10a5 5 0 00-7.1 0l-2 2a5 5 0 007.1 7.1l1.2-1.2"/></svg>';

  let html = '<div class="contact">';
  // mail
  html += '<div class="contact__item"><h3>' + mailIcon + '<span data-i18n="contact.mail">E-mail</span></h3><p>';
  html += (data.mails || []).map((m) => '<a href="mailto:' + escapeHtml(m) + '">' + escapeHtml(m) + '</a>').join('<br>\n');
  html += '</p></div>';
  // phone
  if (data.phone) {
    html += '<div class="contact__item"><h3>' + phoneIcon + '<span data-i18n="contact.phone">Phone</span></h3><p>'
      + '<a href="tel:' + escapeHtml(data.phone) + '">' + escapeHtml(data.phone_display || data.phone) + '</a></p></div>';
  }
  // address (i18n contact.addr.v) — guvenilir sabit, innerHTML ile (K3: <br> bozulmaz)
  const addr = t('contact.addr.v');
  html += '<div class="contact__item"><h3>' + addrIcon + '<span data-i18n="contact.addr">Address</span></h3><p data-i18n="contact.addr.v">'
    + addr + '</p></div>';
  // links
  html += '<div class="contact__item"><h3>' + linkIcon + '<span data-i18n="contact.links">Links</span></h3><p>';
  const linksHtml = (data.links || []).map((l) => '<a href="' + escapeHtml(l.url) + '" target="_blank" rel="noopener">' + escapeHtml(l.label) + '</a>').join('<br>\n');
  html += linksHtml + '</p></div>';
  html += '</div>';
  c.innerHTML = html;
  // DOI/link sayisini guncelle: pubs DOI + books link + projects link + contact links
  const pubDois = allPubs.filter((p) => p.doi).length;
  const bookLinks = booksData.filter((b) => b.link).length;
  const projLinks = projectsData.filter((p) => p.link).length;
  setStat(3, pubDois + bookLinks + projLinks + (data.links || []).length + '+');
  c.querySelectorAll('.contact__item').forEach((el) => observeReveal(el));
}

// 4 dosyayi fetch ile yukle
function fetchJson(name) {
  return fetch(name + '.json').then((r) => {
    if (!r.ok) throw new Error(name + '.json: ' + r.status);
    return r.json();
  });
}

Promise.all([
  fetchJson('books').then(renderBooks).catch((e) => { document.getElementById('booksList').innerHTML = '<p style="color:var(--muted)">' + escapeHtml(e.message) + '</p>'; }),
  fetchJson('projects').then(renderProjects).catch((e) => { document.getElementById('projectsList').innerHTML = '<p style="color:var(--muted)">' + escapeHtml(e.message) + '</p>'; }),
  fetchJson('teaching').then(renderTeaching).catch((e) => { document.getElementById('teachingList').innerHTML = '<p style="color:var(--muted)">' + escapeHtml(e.message) + '</p>'; }),
  fetchJson('contact').then(renderContact).catch((e) => { document.getElementById('contactList').innerHTML = '<p style="color:var(--muted)">' + escapeHtml(e.message) + '</p>'; }),
]);

// ---------- Language ----------
function applyLang(lang) {
  LANG = I18N[lang] ? lang : 'en';
  root.lang = LANG;
  document.title = t('meta.title');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const idx = pair.indexOf(':');
      if (idx > 0) el.setAttribute(pair.slice(0, idx).trim(), t(pair.slice(idx + 1).trim()));
    });
  });

  // pub-src link başlıkları (render edilmis pub-src'ler dahil)
  document.querySelectorAll('.pub-src').forEach((a) => {
    a.title = t('pubsrc.source');
  });

  // dil degisince intro/stat sayisini guncellenmis metne gore tazele
  if (allPubs.length) updateCounts(allPubs.length);

  // tema butonu etiketini güncel dile göre tazele
  setTheme(root.dataset.theme || 'light', true);

  // dil butonları aktiflik durumu
  document.querySelectorAll('.lang-switch button').forEach((b) =>
    b.classList.toggle('active', b.dataset.lang === LANG)
  );

  // aktif filtre varsa durum metnini yeni dilde yeniden üret
  if (searchInput.value.trim().length >= 2) runFilter();

  try { localStorage.setItem('lang', LANG); } catch (e) { /* private mode */ }
}

document.querySelectorAll('.lang-switch button').forEach((b) =>
  b.addEventListener('click', () => applyLang(b.dataset.lang))
);

// ---------- Mobile navigation ----------
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// ---------- Scroll-spy ----------
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
        );
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

// ---------- Print ----------
let printState = null;
window.addEventListener('beforeprint', () => {
  printState = yearBlocks.map((d) => d.open);
  yearBlocks.forEach((d) => (d.open = true));
  revealEls.forEach((el) => el.classList.add('visible'));
});
window.addEventListener('afterprint', () => {
  if (printState) yearBlocks.forEach((d, i) => (d.open = printState[i]));
});

// ---------- Back to top ----------
const toTop = document.getElementById('toTop');
window.addEventListener(
  'scroll',
  () => toTop.classList.toggle('show', window.scrollY > 600),
  { passive: true }
);
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Scroll reveal ----------
// .year'ler ve render edilen .card/.teach/.contact__item async gelir; bu yuzden
// revealEls burada yalnizca statik DOM elemanlarini yakalar; render foksiyonlari
// kendi elemanlarini dinamik olarak observe eder (observeReveal).
const revealEls = document.querySelectorAll(
  '.section__title, .section__intro, .stat, .pub-toolbar'
);
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
);
function observeReveal(scope) {
  if (!scope) return;
  scope.classList.add('reveal');
  revealObs.observe(scope);
}
revealEls.forEach((el) => observeReveal(el));

// ---------- Init ----------
const urlParams = new URLSearchParams(location.search);
const stored = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };

setTheme(urlParams.get('theme') || stored('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), true);

const initialLang = urlParams.get('lang') || stored('lang') ||
  ((navigator.language || 'en').toLowerCase().startsWith('tr') ? 'tr' : 'en');
applyLang(initialLang);
