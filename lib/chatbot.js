// Mesin chatbot lokal (TF-IDF + cosine similarity). Tanpa API, tanpa server.
// Mendukung 4 bahasa: id, en, zh, fr (terjemahan di data/translations.js).
import { knowledge, config } from "../data/knowledge";
import { translations, uiText } from "../data/translations";

const STOP = new Set(
  ("yang dan di ke dari untuk dengan ini itu apa siapa bagaimana gimana kapan dimana mana " +
    "kah lah dong sih ya saja aja bisa adalah ada apakah tolong mohon dia nya kamu anda " +
    "the is are a an of to in on for and or what who how when where does do did can " +
    "tell me about please his he him " +
    "le la les l d des du de un une est qui que qu quoi quel quelle quels quelles ou " +
      "comment il elle ses son sa sur au aux et en pour avec moi parle parlez")
    .split(" ")
);

// karakter Mandarin yang tidak bermakna untuk pencarian
const ZH_STOP = /[的了吗呢吧啊呀么是他她在有我你请问哪些什怎谁过]/g;
const CJK = /[一-鿿]/;

const GREET = /^(hai|halo|hallo|hello|hi|hey|selamat (pagi|siang|sore|malam)|assalamualaikum|bonjour|salut|bonsoir|good (morning|afternoon|evening))\b|^(你好|您好|嗨|哈喽)/;
const THANKS = /\b(terima kasih|makasih|thanks|thank you|thx|merci)\b|谢谢|多谢/;

const NAMA = new Set(["rafli", "yahya", "hidayah"]);

const TERIMA_KASIH_ID = "Sama-sama! Ada lagi yang mau ditanyakan tentang Rafli?";

export function getUi(lang) {
  if (lang === "id") return { ...config, terimaKasih: TERIMA_KASIH_ID, placeholder: "Tanya tentang Rafli...", kirim: "KIRIM" };
  return uiText[lang];
}

// ---- deteksi bahasa ----
const MARKERS = {
  id: "apa siapa yang di dimana bagaimana gimana sekarang kerja proyek proyeknya ceritakan dong sih berapa kapan halo saja aja mana dari ada bisa tentang pengalaman magang hobi kontak kuliah pernah dia nya",
  en: "what who whos is are the his does do where how tell about projects skills contact hello hi hey thanks thank work works working study studied he which can you your",
  fr: "qui est quel quelle quels quelles ou comment le la les des du de il ses son sa sont parle parlez projets competences contacter bonjour salut merci travaille etudes loisirs fait quoi avec pour une un vient habite",
};
const MARKER_SETS = Object.fromEntries(Object.entries(MARKERS).map(([k, v]) => [k, new Set(v.split(" "))]));

export function detectLang(text, fallback = "id") {
  if (CJK.test(text)) return "zh";
  const score = { id: 0, en: 0, fr: 0 };
  if (/[éèêàâçùûôîëïœ]/i.test(text)) score.fr += 2;
  const words = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z]+/);
  for (const w of words) for (const l in score) if (MARKER_SETS[l].has(w)) score[l]++;
  const max = Math.max(...Object.values(score));
  if (max === 0) return fallback;
  // kalau seri dengan bahasa yang sedang dipakai, tetap pakai bahasa itu
  if (score[fallback] === max) return fallback;
  return Object.keys(score).find((l) => score[l] === max);
}

function stem(w) {
  for (const s of ["nya", "kan", "lah", "kah", "an"]) {
    if (w.endsWith(s) && w.length - s.length >= 4) return w.slice(0, -s.length);
  }
  return w;
}

function tokenize(text) {
  const lower = text.toLowerCase();

  // Mandarin tidak memakai spasi: pecah jadi bigram karakter
  const zh = [];
  for (const run of lower.match(/[一-鿿]+/g) || []) {
    const r = run.replace(ZH_STOP, "");
    if (r.length === 1) zh.push(r);
    for (let i = 0; i < r.length - 1; i++) zh.push(r.slice(i, i + 2));
  }

  const latin = lower
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);

  return [...latin, ...zh];
}

// selisih edit <= 1 (toleransi typo)
function near(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1 || a.length < 5) return false;
  let i = 0, j = 0, d = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++d > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return d + (a.length - i) + (b.length - j) <= 1;
}

// ---- bangun indeks sekali saat modul dimuat ----
const docs = knowledge.map((k) => {
  const tr = Object.values(translations[k.topik] || {});
  const text = [
    k.topik,
    ...k.pertanyaan,
    ...k.kata_kunci,
    ...k.kata_kunci,
    k.jawaban,
    ...tr.flatMap((t) => [...t.pertanyaan, ...t.pertanyaan, t.jawaban]),
  ].join(" ");
  const tf = {};
  tokenize(text).forEach((t) => (tf[t] = (tf[t] || 0) + 1));
  return { entry: k, tf };
});

const vocab = new Set();
docs.forEach((d) => Object.keys(d.tf).forEach((t) => vocab.add(t)));

const idf = {};
vocab.forEach((t) => {
  const df = docs.filter((d) => d.tf[t]).length;
  idf[t] = Math.log(1 + docs.length / df);
});

docs.forEach((d) => {
  let norm = 0;
  for (const t in d.tf) {
    d.tf[t] = (1 + Math.log(d.tf[t])) * idf[t];
    norm += d.tf[t] ** 2;
  }
  d.norm = Math.sqrt(norm) || 1;
});

function resolveToken(t) {
  if (vocab.has(t)) return t;
  for (const v of vocab) if (near(t, v)) return v;
  return null;
}

function jawabanDalam(entry, lang) {
  if (lang === "id") return entry.jawaban;
  return translations[entry.topik]?.[lang]?.jawaban ?? entry.jawaban;
}

// Mengembalikan { text, lang }. `uiLang` = bahasa yang sedang dipilih di UI.
export function answer(input, uiLang = "id") {
  const raw = input.trim().toLowerCase();
  const lang = detectLang(raw, uiLang);
  const ui = getUi(lang);
  const reply = (text) => ({ text, lang });

  if (!raw) return reply(ui.fallback);
  if (THANKS.test(raw)) return reply(ui.terimaKasih);

  const tokens = tokenize(raw).map(resolveToken).filter(Boolean);

  if (tokens.length === 0) {
    return reply(GREET.test(raw) ? ui.sapaan : ui.fallback);
  }

  // "siapa rafli?" / "who is rafli?" / "rafli 是谁" -> hanya nama; kata "rafli" ada di hampir
  // semua jawaban sehingga bobot TF-IDF-nya kecil, jadi langsung arahkan ke perkenalan.
  if (tokens.every((t) => NAMA.has(t))) {
    const intro = knowledge.find((k) => k.topik === "Perkenalan");
    if (intro) return reply(jawabanDalam(intro, lang));
  }

  const q = {};
  tokens.forEach((t) => (q[t] = (q[t] || 0) + 1));
  let qNorm = 0;
  for (const t in q) { q[t] = (1 + Math.log(q[t])) * idf[t]; qNorm += q[t] ** 2; }
  qNorm = Math.sqrt(qNorm) || 1;

  let best = null, bestScore = 0;
  for (const d of docs) {
    let dot = 0;
    for (const t in q) if (d.tf[t]) dot += q[t] * d.tf[t];
    const score = dot / (qNorm * d.norm);
    if (score > bestScore) { bestScore = score; best = d; }
  }

  // ambang batas: di bawah ini dianggap di luar topik
  return reply(best && bestScore >= 0.12 ? jawabanDalam(best.entry, lang) : ui.fallback);
}
