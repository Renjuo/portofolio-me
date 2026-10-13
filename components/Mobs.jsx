"use client";
import { useEffect, useRef, useState } from "react";

/* Makhluk Minecraft yang berjalan di latar: 3–4 ekor dipilih acak, masing-masing
   menyeberang dari ujung ke ujung lalu diganti makhluk acak lain. Saat di-hover
   makhluknya berhenti, menghadap ke depan, dan bersuara (suara disintesis lewat WebAudio). */
const K = ["#151515", "#1d1d1f", "#101012", "#19191b"];
const G = ["#5fbf4a", "#4ea83c", "#6fd35a", "#3f8f31", "#7ee36a"];
// side = tampak samping menghadap kanan, legs = 2 frame kaki, front = tampak depan
const KINDS = {
  cow: {
    speed: 34,
    pal: { b: "#4a3426", w: "#e9e6df", h: "#b9b4a8", m: "#d8cfc4", k: "#141414" },
    side: [".........h...h", ".........bbbbb", "bbbwwbbbbbbkbb", "bwwwwbbwwbbbmm", "bbwwbbbwwbbbmm", "bbbbbwwbbb....", "bbbbbbbbbb...."],
    legs: [["bb......bb....", "bb......bb....", "kk......kk...."], [".bb....bb.....", ".bb....bb.....", ".kk....kk....."]],
    front: ["h........h", ".bbbwwbbb.", ".bkbwwbkb.", ".bbbwwbbb.", ".bmmmmmmb.", ".bmkmmkmb.", "..bbbbbb..", "..bwwbbb..", "..bb..bb..", "..kk..kk.."],
  },
  pig: {
    speed: 38,
    pal: { p: "#f0a5a2", s: "#d87f7c", k: "#141414", w: "#ffffff" },
    side: ["........pppp", "pppppppppkpp", "ppppppppppss", "ppppppppppss", "ppppppppp..."],
    legs: [["pp.....pp...", "pp.....pp..."], [".pp...pp....", ".pp...pp...."]],
    front: ["pppppppp", "pppppppp", "kwppppwk", "ppsssspp", "ppksskpp", "pppppppp", ".pp..pp.", ".pp..pp."],
  },
  sheep: {
    speed: 32,
    pal: { w: "#ececec", g: "#cfcfcf", f: "#d9b89a", k: "#141414", p: "#e6a0a0" },
    side: [".........www", "wwwwwwwwwwff", "wgwwwwgwwfkf", "wwwgwwwwwfff", "wwwwwwgww...", "gwwwwwwwg..."],
    legs: [["ff.....ff...", "ff.....ff..."], [".ff...ff....", ".ff...ff...."]],
    front: ["wwwwwwww", "wwwwwwww", "wffffffw", "wkwffwkw", "wffffffw", "wwfppfww", "wwwwwwww", ".ff..ff.", ".ff..ff."],
  },
  chicken: {
    speed: 44,
    pal: { w: "#f1f1f1", y: "#e8b030", r: "#c0392b", k: "#141414" },
    side: [".....ww.", ".....wky", ".....wwy", "wwwwwwr.", "wwwwww..", ".wwwww.."],
    legs: [["..y.y...", ".yy.yy.."], ["...y....", "..yy...."]],
    front: [".wwww.", ".kwwk.", ".wyyw.", ".wrrw.", "wwwwww", "wwwwww", ".y..y.", "yy..yy"],
  },
  creeper: {
    speed: 30,
    pal: { g: G, k: "#151515" },
    side: ["gggggggg", "gggggggg", "ggggggkk", "ggggggkk", "gggggggk", "gggggggk", "gggggggk", "gggggggg", "..gggg..", "..gggg..", "..gggg..", "..gggg..", "..gggg.."],
    legs: [["ggg..ggg", "kg....kg"], [".gggggg.", "..kgkg.."]],
    front: ["gggggggg", "gggggggg", "gkkggkkg", "gkkggkkg", "gggkkggg", "ggkkkkgg", "ggkkkkgg", "ggkggkgg", "..gggg..", "..gggg..", "..gggg..", "..gggg..", "..gggg..", ".gggggg.", ".kgkkgk."],
  },
  enderman: {
    speed: 52,
    pal: { k: K, p: "#cc5cf0", v: "#f3c6ff" },
    side: ["kkkkkkkk", "kkkkkkkk", "kkkkkkkk", "kkkkkpvp", "kkkkkkkk", "kkkkkkkk", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk..."],
    legs: [["...kk...", "...kk...", "..k..k..", "..k..k..", ".k....k.", ".k....k."], ["...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk..."]],
    front: ["kkkkkkkk", "kkkkkkkk", "kkkkkkkk", "pvpkkpvp", "kkkkkkkk", "kkkkkkkk", "kkkkkkkk", "k.kkkk.k", "k.kkkk.k", "k.kkkk.k", "k.kkkk.k", "k.k..k.k", "k.k..k.k", "k.k..k.k", "k.k..k.k", "k.k..k.k", "..k..k..", "..k..k..", "..k..k..", "..k..k..", "..k..k..", "..k..k.."],
  },
  villager: {
    speed: 36,
    pal: { s: "#bd8b72", n: "#a8705a", k: "#3a2a1e", w: "#ffffff", e: "#3a8a3a", m: "#8a5a48", r: "#5a3d2b", d: "#3f2a1d", f: "#4a4a4a" },
    side: ["ssssssss.", "ssssssss.", "sssssskk.", "sssssswe.", "ssssssssn", "ssssssmsn", "ssssssssn", "ssssssss.", "..rrrr...", "..rrrddd.", "..rrrddd.", "..rrrr...", "..rrrr...", "..rrrr..."],
    legs: [["..rr.rr..", "..ff.ff.."], ["...rrr...", "...fff..."]],
    front: ["ssssssss", "ssssssss", "skkkkkks", "sewssews", "sssnnsss", "ssmnnmss", "sssnnsss", "ssssssss", "rrrrrrrr", "rrddddrr", "rrddddrr", ".rrrrrr.", ".rrrrrr.", ".rrrrrr.", ".rrrrrr.", ".ff..ff."],
  },
};
const NAMES = Object.keys(KINDS);

/* ---- Suara: browser baru mengizinkan audio setelah ada klik/tombol di halaman ---- */
let ac = null, out = null;
function unlock() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  if (!ac) { ac = new AC(); out = ac.createGain(); out.gain.value = 0.5; out.connect(ac.destination); }
  if (ac.state === "suspended") ac.resume();
}
// satu nada: f = titik-titik frekuensi yang dilalui, bp = filter bandpass (warna suara), vib = [Hz, kedalaman]
function voice({ type = "sawtooth", f, dur, vol = 0.3, at = 0, bp = 800, q = 1, vib }) {
  const t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain(), fl = ac.createBiquadFilter();
  o.type = type; o.frequency.setValueAtTime(f[0], t);
  f.slice(1).forEach((v, i) => o.frequency.linearRampToValueAtTime(v, t + (dur * (i + 1)) / (f.length - 1)));
  if (vib) {
    const l = ac.createOscillator(), lg = ac.createGain();
    l.frequency.value = vib[0]; lg.gain.value = vib[1];
    l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur);
  }
  fl.type = "bandpass"; fl.frequency.value = bp; fl.Q.value = q;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.05, dur / 3));
  g.gain.setValueAtTime(vol, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(fl); fl.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.02);
}
// desis: noise putih lewat highpass, mengeras menjelang akhir bila rise
function hiss({ dur, vol = 0.2, hp = 3000, at = 0, rise = false }) {
  const t = ac.currentTime + at, len = Math.ceil(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = buf; fl.type = "highpass"; fl.frequency.value = hp;
  g.gain.setValueAtTime(rise ? vol * 0.25 : vol, t);
  if (rise) g.gain.linearRampToValueAtTime(vol, t + dur * 0.85);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl); fl.connect(g); g.connect(out); s.start(t);
}
const SOUNDS = {
  cow: () => voice({ f: [150, 118, 100, 92], dur: 1.1, vol: 0.5, bp: 520, q: 1.2 }), // moo
  pig: () => [0, 0.2].forEach((at) => { voice({ f: [190, 120], dur: 0.14, vol: 0.5, at, bp: 900, q: 2 }); hiss({ dur: 0.12, vol: 0.05, hp: 1500, at }); }), // oink oink
  sheep: () => voice({ f: [430, 400, 360], dur: 0.75, vol: 0.4, bp: 1300, q: 1.5, vib: [10, 28] }), // baa
  chicken: () => [0, 0.13, 0.3].forEach((at) => voice({ type: "square", f: [950, 520], dur: 0.08, vol: 0.2, at, bp: 1800, q: 2 })), // cluck
  creeper: () => hiss({ dur: 1.3, vol: 0.22, hp: 3500, rise: true }), // sumbu ssss
  enderman: () => { voice({ type: "sine", f: [420, 150, 70], dur: 0.8, vol: 0.5, bp: 300, q: 0.5 }); voice({ f: [82, 60], dur: 1, vol: 0.4, bp: 260, q: 1, vib: [6, 8] }); hiss({ dur: 0.9, vol: 0.03, hp: 900 }); }, // vwoop
  villager: () => voice({ f: [175, 140, 195], dur: 0.5, vol: 0.5, bp: 720, q: 4 }), // hrmm
};
const say = (kind) => { if (ac?.state === "running") SOUNDS[kind](); };

const ink = (c, x, y) => (Array.isArray(c) ? c[(x * 7 + y * 13 + x * y) % c.length] : c);
const Px = ({ rows, pal, top = 0 }) => rows.flatMap((row, y) =>
  [...row].map((ch, x) => (ch === "." ? null : <rect key={`${x}-${y}`} x={x} y={y + top} width="1" height="1" fill={ink(pal[ch], x, y + top)} />))
);

function Mob({ m, onExit }) {
  const el = useRef(null);
  const { pal, side, legs, front } = KINDS[m.kind];
  const sw = side[0].length, sh = side.length + legs[0].length, fw = front[0].length, fh = front.length;
  useEffect(() => {
    const n = el.current, w = n.offsetWidth;
    let x = m.at != null ? m.at * (innerWidth - w) : m.dir > 0 ? -w : innerWidth;
    let raf, prev = 0, wait = m.delay * 1000, hov = false;
    const put = () => { n.style.transform = `translate3d(${x}px,0,0)`; };
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - (prev || now), 100); prev = now;
      if (wait > 0) { wait -= dt; return; }
      if (hov) return;
      x += (m.dir * m.speed * dt) / 1000; put();
      if (m.dir > 0 ? x > innerWidth : x < -w) { cancelAnimationFrame(raf); onExit(m.id); }
    };
    // layer ini ada di belakang <main>, jadi hover dideteksi manual dari posisi pointer (hanya di area hero)
    const mv = (e) => {
      const r = n.getBoundingClientRect();
      const on = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
        && !!e.target.closest?.(".hero") && !e.target.closest(".me");
      if (on === hov) return;
      hov = on; n.classList.toggle("look", on);
      if (on) say(m.kind);
    };
    put(); raf = requestAnimationFrame(tick);
    addEventListener("pointermove", mv); addEventListener("pointerdown", mv);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); removeEventListener("pointerdown", mv); };
  }, []);
  const box = (w) => ({ width: `calc(${w} * var(--u))` });
  return (
    <div ref={el} className="mob" style={{ ...box(Math.max(sw, fw)), height: `calc(${Math.max(sh, fh)} * var(--u))` }}>
      <svg className={m.dir < 0 ? "side flip" : "side"} viewBox={`0 0 ${sw} ${sh}`} shapeRendering="crispEdges" style={box(sw)}>
        <Px rows={side} pal={pal} />
        <g className="la"><Px rows={legs[0]} pal={pal} top={side.length} /></g>
        <g className="lb"><Px rows={legs[1]} pal={pal} top={side.length} /></g>
      </svg>
      <svg className="front" viewBox={`0 0 ${fw} ${fh}`} shapeRendering="crispEdges" style={box(fw)}>
        <Px rows={front} pal={pal} />
      </svg>
    </div>
  );
}

let seq = 0;
function spawn(others, first) {
  const free = NAMES.filter((k) => !others.some((o) => o.kind === k));
  const kind = free[Math.floor(Math.random() * free.length)];
  return {
    id: ++seq, kind, dir: Math.random() < 0.5 ? 1 : -1,
    speed: KINDS[kind].speed * (0.8 + Math.random() * 0.4),
    at: first ? Math.random() : null, delay: first ? 0 : 1 + Math.random() * 6,
  };
}

export default function Mobs() {
  const [mobs, setMobs] = useState([]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = [];
    for (let i = 3 + Math.floor(Math.random() * 2); i > 0; i--) list.push(spawn(list, true));
    setMobs(list);
    addEventListener("pointerdown", unlock); addEventListener("keydown", unlock);
    return () => { removeEventListener("pointerdown", unlock); removeEventListener("keydown", unlock); };
  }, []);
  const next = (id) => setMobs((ms) => ms.map((m) => (m.id === id ? spawn(ms.filter((o) => o.id !== id), false) : m)));
  return <div className="field mobs" aria-hidden="true">{mobs.map((m) => <Mob key={m.id} m={m} onExit={next} />)}</div>;
}
