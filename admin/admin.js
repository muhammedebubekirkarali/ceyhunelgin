// admin.js — Ceyhun Elgin paneli (vanilla, bağımlılık yok)
// GitHub Contents API üzerinden JSON dosyalarını okur/yazar/siler.
// Token localStorage'da saklanır, hiçbir sunucu üzerinden geçmez.

const API = 'https://api.github.com';

// Ozel alan adinda (ceyhunelgin.com) panel hangi depoya yazacagini URL'den
// tespit edemez; bu sabit kullanilir. Hocanin deposu: ceyhunelgin/ceyhunelgin
// (kullanici adi: ceyhunelgin, repo adi: ceyhunelgin — devirde ek duzenleme
// gerekmiyor). Repo adi farkli secilirse YALNIZCA BU SATIR GUNCELLENIR
// (bkz. DOMAIN-KURULUM.md Bolum 6) ya da panel /admin/?repo=kullanici/repo
// ile acilir.
const FALLBACK_REPO = 'ceyhunelgin/ceyhunelgin';

const FILES = {
  pubs: 'publications.json',
  books: 'books.json',
  projects: 'projects.json',
  teaching: 'teaching.json',
  contact: 'contact.json',
};

let state = { token:'', repo:'', branch:'', user:null, cache:{} }; // cache: {filename: {data, sha}}

// ---------- Yardımcılar ----------
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

let toastTimer;
function toast(msg, kind='ok') {
  const t = $('toast'); t.textContent = msg; t.className = 'toast show '+kind;
  clearTimeout(toastTimer); toastTimer = setTimeout(()=> t.className='toast', 3000);
}

function persist() {
  try { localStorage.setItem('ceyhunelgin-admin', JSON.stringify({token:state.token})); } catch(e){}
}
function restore() {
  try { const v = JSON.parse(localStorage.getItem('ceyhunelgin-admin')||'{}'); return v; } catch(e){ return {}; }
}

// UTF-8 guvenli base64 kodlayici/cozucu (Turkce karakterler bozulmaz)
function b64decode(b64) {
  const bin = atob(b64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
function b64encode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  const CHUNK = 0x8000; // apply arguman sinirina takilmamak icin parcala
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

async function gh(path, opts={}) {
  const url = `${API}/repos/${state.repo}/contents/${path}?ref=${state.branch}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${state.token}`, Accept:'application/vnd.github+json' }, ...opts });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub API ${r.status}: ${await r.text()}`);
  return r.json();
}

async function loadFile(filename) {
  if (state.cache[filename]) return state.cache[filename];
  const meta = await gh(filename);
  if (!meta) { state.cache[filename] = { data: null, sha: null }; return state.cache[filename]; }
  const data = JSON.parse(b64decode(meta.content));
  state.cache[filename] = { data, sha: meta.sha };
  return state.cache[filename];
}

async function saveFile(filename, data) {
  const cur = state.cache[filename];
  const body = {
    message: `Panel: ${filename} guncellendi`,
    content: b64encode(JSON.stringify(data, null, 2) + '\n'),
    branch: state.branch,
    sha: cur ? cur.sha : undefined,
  };
  const r = await fetch(`${API}/repos/${state.repo}/contents/${filename}`, {
    method: 'PUT', headers: { Authorization: `Bearer ${state.token}`, Accept:'application/vnd.github+json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const detail = await r.text();
    if (r.status === 409) { state.cache[filename] = null; throw new Error('Dosya başkası tarafından değiştirilmiş. Sayfayı yenileyip tekrar deneyin.'); }
    if (r.status === 401 || r.status === 403) { state.cache[filename] = null; throw new Error('Token geçersiz veya süresi dolmuş. Çıkış yapıp yeniden giriş yapın.'); }
    if (r.status === 404) { state.cache[filename] = null; throw new Error(`Dosya bulunamadı (${filename}). Depo/dal doğru mu?`); }
    throw new Error(`Commit başarısız: ${r.status} ${detail.slice(0,200)}`);
  }
  const res = await r.json();
  state.cache[filename] = { data, sha: res.content.sha };
  return res;
}

// ---------- Giris ----------
// Repo+dal otomatik tespit edilir; hocanin ellemesine gerek yok.
// Oncelik: 1) ?repo= parametresi  2) *.github.io deseni  3) FALLBACK_REPO
function detectRepo() {
  // 1) acik secim: /admin/?repo=kullanici/repo (tarayicida hatirlanir)
  try {
    const q = new URLSearchParams(location.search).get('repo');
    if (q && /^[\w.-]+\/[\w.-]+$/.test(q)) { localStorage.setItem('ceyhunelgin-repo', q); return q; }
    const s = localStorage.getItem('ceyhunelgin-repo');
    if (s && /^[\w.-]+\/[\w.-]+$/.test(s)) return s;
  } catch (e) { /* private mode */ }
  // 2) https://KULLANICI.github.io/REPO/admin/ -> KULLANICI/REPO
  const m = location.host.match(/^([a-z0-9-]+)\.github\.io$/i);
  if (m) {
    // pathname: /REPO/admin/ veya /REPO/ veya /admin/ (kullanicinin kullanici.github.io reposu)
    const m2 = location.pathname.replace(/\/admin\/?$/,'').replace(/\/$/,'').match(/^\/([^/]+)/);
    if (m2 && m2[1] !== 'admin') return m[1] + '/' + m2[1];
    // kullanici.github.io reposunun kendisi (kullanici/kullanici.github.io)
    return m[1] + '/' + m[1] + '.github.io';
  }
  // 3) ozel alan adi: sabit konfigurasyon (dosyanin basindaki FALLBACK_REPO)
  return FALLBACK_REPO;
}
const AUTO_BRANCH = 'main';

$('btn-login').addEventListener('click', async () => {
  const token = $('i-token').value.trim();
  if (!token) { showErr('Token gerekli.'); return; }
  const repo = detectRepo();
  state = { token, repo, branch: AUTO_BRANCH, user:null, cache:{} };
  try {
    const u = await fetch(`${API}/user`, { headers: { Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json' }});
    if (!u.ok) throw new Error('Token geçersiz.');
    state.user = await u.json();
    // erisim kontrolu: repo'yu okuyabiliyor mu?
    try {
      const rr = await fetch(`${API}/repos/${repo}`, { headers: { Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json' }});
      if (!rr.ok) throw new Error(`Bu token "${repo}" deposuna erişemiyor. Fine-grained token'da doğru depo seçimi + 'Contents: Read and write' yetkisi (classic token'da 'repo' yetkisi) gerekli.`);
    } catch(e) { throw e; }
    persist();
    $('login-err').classList.add('hidden');
    enterPanel();
  } catch (e) {
    // token gecersizse/kapasitesi yoksa saklanan token'i temizle (otomatik giris dongusunu kir)
    if (e.message.includes('geçersiz') || e.message.includes('erişemiyor')) {
      localStorage.removeItem('ceyhunelgin-admin');
    }
    showErr(e.message);
  }
});
function showErr(m) { const el = $('login-err'); el.textContent = m; el.classList.remove('hidden'); }

$('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('ceyhunelgin-admin');
  location.reload();
});

async function enterPanel() {
  $('login').classList.add('hidden');
  $('panel').classList.remove('hidden');
  $('p-repo').textContent = state.repo;
  $('p-branch').textContent = state.branch;
  $('p-name').textContent = state.user ? state.user.login : '';
  // tab butonlari
  document.querySelectorAll('#tabs button').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
  switchTab('pubs');
}

function switchTab(tab) {
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab===tab));
  document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
  $(`tab-${tab}`).classList.remove('hidden');
  renderTab(tab);
}

// ---------- Tab: Yayinlar ----------
async function renderTab(tab) {
  const container = $(`tab-${tab}`);
  try {
    const f = FILES[tab];
    const c = await loadFile(f);
    const data = c.data || [];
    if (tab === 'contact') return renderContact(c.data || {});
    renderListTab(tab, data);
  } catch (e) {
    container.innerHTML = `<div class="card"><p style="color:var(--err)">Yüklenemedi: ${esc(e.message)}</p></div>`;
  }
}

function renderListTab(tab, data) {
  const container = $(`tab-${tab}`);
  const isPubs = tab === 'pubs';
  const isTeaching = tab === 'teaching';
  let html = `<div class="card"><h2>Yeni kayit ekle</h2>${addForm(tab)}</div>`;
  html += `<div class="card"><h2>Mevcut kayitlari duzelt / sil<span class="pill">${data.length} kayit</span></h2>`;
  html += `<label>Düzenlenecek kaydi secin</label><select id="sel-${tab}" onchange="fillEdit('${tab}')"><option value="">— secin —</option>`;
  if (isPubs) {
    data.forEach((p,i) => html += `<option value="${i}">[${p.year}] ${esc(p.title)}</option>`);
  } else if (isTeaching) {
    data.forEach((u,ui) => u.courses.forEach((co,i) => html += `<option value="${ui}.${i}">${esc(u.university)} — ${esc(co.name)} (${esc(co.level)})</option>`));
  } else {
    data.forEach((d,i) => html += `<option value="${i}">${esc(d.title)}</option>`);
  }
  html += `</select>`;
  html += `<div id="edit-${tab}" class="hidden" style="margin-top:14px"></div>`;
  html += `</div>`;
  container.innerHTML = html;
}

// ---- Ekleme formlari ----
function addForm(tab) {
  if (tab === 'pubs') return `
    <div class="row">
      <div><label>Yıl</label><input id="add-pubs-year" placeholder="2026"></div>
      <div style="flex:2"><label>Başlık</label><input id="add-pubs-title" placeholder="Makale başlığı"></div>
    </div>
    <label>Yazarlar (opsiyonel)</label><input id="add-pubs-authors" placeholder="Adem Y. Elveren and Eric Budd">
    <label>Dergi / yayin bilgisi (opsiyonel)</label><input id="add-pubs-venue" placeholder="Journal of ..., 60, 55-80.">
    <label>DOI / Kaynak Baglantisi (opsiyonel)</label><input id="add-pubs-doi" placeholder="https://doi.org/...">
    <div class="save-bar"><button onclick="addRec('pubs')">Ekle</button></div>`;
  if (tab === 'books' || tab === 'projects') {
    const isBook = tab==='books';
    return `
      <label>Başlık</label><input id="add-${tab}-title" placeholder="${isBook?'Kitap başlığı':'Proje başlığı'}">
      <label>Etiket (opsiyonel)</label><input id="add-${tab}-label" placeholder="${isBook?'Monograph · Routledge, 2021':'EU Funded'}">
      <label>Not (opsiyonel)</label><input id="add-${tab}-note" placeholder="Editor — New York: Routledge">
      <label>Baglanti (opsiyonel)</label><input id="add-${tab}-link" placeholder="https://...">
      <label>Baglanti metni (opsiyonel)</label><input id="add-${tab}-linklabel" placeholder="View on Amazon →">
      <div class="save-bar"><button onclick="addRec('${tab}')">Ekle</button></div>`;
  }
  if (tab === 'teaching') return `
    <label>Üniversite</label><input id="add-teaching-uni" placeholder="Boğaziçi University">
    <label>Ders adı</label><input id="add-teaching-name" placeholder="Intermediate Macroeconomics">
    <label>Düzey</label><select id="add-teaching-level"><option>B.A.</option><option>M.A.</option><option>Ph.D.</option></select>
    <div class="save-bar"><button onclick="addRec('teaching')">Ekle</button><span class="muted">Mevcut üniversite varsa oraya eklenir, yoksa yeni kart oluşturulur.</span></div>`;
  return '';
}

// ---- Ekle ----
async function addRec(tab) {
  try {
    const f = FILES[tab]; const c = await loadFile(f); const data = c.data || [];
    if (tab === 'pubs') {
      const year = parseInt($(`add-pubs-year`).value);
      const title = $(`add-pubs-title`).value.trim();
      if (!year || !title) throw new Error('Yıl ve başlık gerekli.');
      data.push({ year, title, authors: val(`add-pubs-authors`), venue: val(`add-pubs-venue`), doi: val(`add-pubs-doi`) });
      data.sort((a,b)=>b.year-a.year);
    } else if (tab === 'books' || tab === 'projects') {
      const title = $(`add-${tab}-title`).value.trim();
      if (!title) throw new Error('Başlık gerekli.');
      data.push({ title, label: val(`add-${tab}-label`), note: val(`add-${tab}-note`), link: val(`add-${tab}-link`), link_label: val(`add-${tab}-linklabel`) });
    } else if (tab === 'teaching') {
      const uni = $(`add-teaching-uni`).value.trim();
      const name = $(`add-teaching-name`).value.trim();
      const level = $(`add-teaching-level`).value;
      if (!uni || !name) throw new Error('Üniversite ve ders adı gerekli.');
      let u = data.find(d => d.university.toLowerCase() === uni.toLowerCase());
      if (!u) { u = { university: uni, courses: [] }; data.push(u); }
      u.courses.push({ name, level });
    }
    await saveFile(f, data);
    toast('Eklendi.');
    renderTab(tab);
  } catch (e) { toast('Hata: ' + e.message, 'err'); }
}
function val(id){ const v = $(id).value.trim(); return v || null; }

// ---- Duzelt formunu doldur (dropdown secilince) ----
window.fillEdit = function(tab) {
  const sel = $(`sel-${tab}`);
  const editBox = $(`edit-${tab}`);
  if (!sel.value) { editBox.classList.add('hidden'); return; }
  const f = FILES[tab]; const data = state.cache[f].data || [];
  editBox.classList.remove('hidden');
  if (tab === 'pubs') {
    const p = data[parseInt(sel.value)];
    editBox.innerHTML = pubsEditForm(p);
  } else if (tab === 'books' || tab === 'projects') {
    const d = data[parseInt(sel.value)];
    editBox.innerHTML = cardEditForm(tab, d);
  } else if (tab === 'teaching') {
    const [ui, ci] = sel.value.split('.').map(Number);
    const u = data[ui]; const co = u.courses[ci];
    editBox.innerHTML = teachingEditForm(u, co, ui, ci);
  }
};

function pubsEditForm(p) {
  return `
    <div class="row"><div><label>Yıl</label><input id="ed-year" value="${esc(p.year)}"></div>
    <div style="flex:2"><label>Başlık</label><input id="ed-title" value="${esc(p.title)}"></div></div>
    <label>Yazarlar</label><input id="ed-authors" value="${esc(p.authors||'')}">
    <label>Dergi / yayin bilgisi</label><input id="ed-venue" value="${esc(p.venue||'')}">
    <label>DOI / Kaynak Baglantisi</label><input id="ed-doi" value="${esc(p.doi||'')}">
    <div class="save-bar"><button onclick="savePubs()">Kaydet</button><button class="danger" onclick="delPubs()">Sil</button></div>`;
}
function cardEditForm(tab, d) {
  return `
    <label>Başlık</label><input id="ed-title" value="${esc(d.title)}">
    <label>Etiket</label><input id="ed-label" value="${esc(d.label||'')}">
    <label>Not</label><input id="ed-note" value="${esc(d.note||'')}">
    <label>Baglanti</label><input id="ed-link" value="${esc(d.link||'')}">
    <label>Baglanti metni</label><input id="ed-linklabel" value="${esc(d.link_label||'')}">
    <div class="save-bar"><button onclick="saveCard('${tab}')">Kaydet</button><button class="danger" onclick="delCard('${tab}')">Sil</button></div>`;
}
function teachingEditForm(u, co, ui, ci) {
  return `
    <label>Üniversite</label><input id="ed-uni" value="${esc(u.university)}">
    <label>Ders adı</label><input id="ed-name" value="${esc(co.name)}">
    <label>Düzey</label><select id="ed-level"><option ${co.level==='B.A.'?'selected':''}>B.A.</option><option ${co.level==='M.A.'?'selected':''}>M.A.</option><option ${co.level==='Ph.D.'?'selected':''}>Ph.D.</option></select>
    <div class="save-bar"><button onclick="saveTeaching(${ui},${ci})">Kaydet</button><button class="danger" onclick="delTeaching(${ui},${ci})">Sil</button></div>`;
}

window.savePubs = async function() {
  try {
    const f = FILES.pubs; const c = await loadFile(f); const data = c.data; const sel = $('sel-pubs');
    const i = parseInt(sel.value);
    const year = parseInt($('ed-year').value, 10);
    const title = $('ed-title').value.trim();
    if (!year || !title) throw new Error('Yıl ve başlık gerekli.');
    data[i] = { year, title, authors: edval('ed-authors'), venue: edval('ed-venue'), doi: edval('ed-doi') };
    data.sort((a,b)=>b.year-a.year);
    await saveFile(f, data);
    toast('Kaydedildi.'); renderTab('pubs');
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
window.delPubs = async function() {
  if (!confirm('Bu yayını silmek istediğinize emin misiniz?')) return;
  try {
    const f = FILES.pubs; const c = await loadFile(f); const data = c.data; const i = parseInt($('sel-pubs').value);
    data.splice(i,1);
    await saveFile(f, data);
    toast('Silindi.'); renderTab('pubs');
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
window.saveCard = async function(tab) {
  try {
    const f = FILES[tab]; const c = await loadFile(f); const data = c.data; const i = parseInt($(`sel-${tab}`).value);
    const title = $('ed-title').value.trim();
    if (!title) throw new Error('Başlık gerekli.');
    data[i] = { title, label: edval('ed-label'), note: edval('ed-note'), link: edval('ed-link'), link_label: edval('ed-linklabel') };
    await saveFile(f, data);
    toast('Kaydedildi.'); renderTab(tab);
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
window.delCard = async function(tab) {
  if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
  try {
    const f = FILES[tab]; const c = await loadFile(f); const data = c.data; const i = parseInt($(`sel-${tab}`).value);
    data.splice(i,1);
    await saveFile(f, data);
    toast('Silindi.'); renderTab(tab);
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
window.saveTeaching = async function(ui, ci) {
  try {
    const f = FILES.teaching; const c = await loadFile(f); const data = c.data;
    const uni = $('ed-uni').value.trim();
    const name = $('ed-name').value.trim();
    const level = $('ed-level').value;
    if (!uni || !name) throw new Error('Üniversite ve ders adı gerekli.');
    // eski ders cikar
    const oldU = data[ui]; const oldC = oldU.courses[ci];
    oldU.courses.splice(ci, 1);
    // universite degisti mi?
    let target = data.find(d => d.university.toLowerCase() === uni.toLowerCase());
    if (!target || target === oldU) { // ayni uni geri ekle ya da yeni olustur
      if (!target) { target = { university: uni, courses: [] }; data.push(target); }
      else { target = oldU; }
    }
    target.courses.push({ name, level });
    // eski universitede ders kalmadiysa kaldir
    if (oldU !== target && !oldU.courses.length) { const idx = data.indexOf(oldU); if (idx>=0) data.splice(idx,1); }
    await saveFile(f, data);
    toast('Kaydedildi.'); renderTab('teaching');
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
window.delTeaching = async function(ui, ci) {
  if (!confirm('Bu dersi silmek istediğinize emin misiniz?')) return;
  try {
    const f = FILES.teaching; const c = await loadFile(f); const data = c.data;
    const u = data[ui]; u.courses.splice(ci, 1);
    if (!u.courses.length) { data.splice(ui, 1); }
    await saveFile(f, data);
    toast('Silindi.'); renderTab('teaching');
  } catch(e){ toast('Hata: '+e.message,'err'); }
};
function edval(id){ const v = $(id).value.trim(); return v || null; }

// ---- Iletisim ----
function renderContact(d) {
  d = d || { mails: [], phone: null, phone_display: null, links: [] };
  const mails = (d.mails || []).join(' | ');
  const links = (d.links || []).map(l => `${l.url} | ${l.label}`).join('\n');
  const html = `
    <div class="card">
      <h2>İletişim bilgileri</h2>
      <label>E-posta(lar) — | ile ayırın</label>
      <input id="ct-mail" value="${esc(mails)}" placeholder="a@b.com | c@d.com">
      <label>Telefon (görünür)</label>
      <input id="ct-phone" value="${esc(d.phone_display||d.phone||'')}" placeholder="+90 212 359 76 53">
      <label>Dış linkler — her satıra "URL | Etiket"</label>
      <textarea id="ct-links" placeholder="https://orcid.org/0000-.. | ORCID: 0000..&#10;https://youtube.com/.. | YouTube">${esc(links)}</textarea>
      <div class="save-bar"><button onclick="saveContact()">Kaydet</button></div>
    </div>`;
  $('tab-contact').innerHTML = html;
}
window.saveContact = async function() {
  try {
    const f = FILES.contact; const c = await loadFile(f); let data = c.data || {};
    const mails = $('ct-mail').value.split('|').map(s=>s.trim()).filter(Boolean);
    const phoneDisp = $('ct-phone').value.trim();
    const phone = phoneDisp ? phoneDisp.replace(/[^\d+]/g,'') : null;
    const links = $('ct-links').value.split('\n').map(s=>s.trim()).filter(Boolean).map(line=>{
      const [url, label] = line.split('|').map(s=>s.trim());
      return { url, label: label || url };
    });
    data = { mails, phone, phone_display: phoneDisp||null, links };
    await saveFile(f, data);
    toast('Kaydedildi.'); renderTab('contact');
  } catch(e){ toast('Hata: '+e.message,'err'); }
};

// ---- Global erisim (satir ici onclick'ler icin) ----
window.addRec = addRec;

// Otomatik giris (kayıtlıysa)
(function init(){
  const s = restore();
  if (s.token) {
    $('i-token').value = s.token;
    $('btn-login').click();
  }
})();
