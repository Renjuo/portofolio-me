"use client";
import { useEffect, useRef, useState } from "react";
import { TERRAIN, heights, world } from "../lib/sky";

/* Makhluk Minecraft yang berjalan di atas bukit lapis depan langit (<Sky />): 3–4 ekor dipilih
   acak, menyeberang dari ujung ke ujung sambil naik-turun blok dan berenang di danau, lalu diganti
   makhluk acak lain. Saat di-hover makhluknya berhenti, menghadap ke depan, dan bersuara
   (suara disintesis lewat WebAudio). Digambar per piksel tekstur: 16 piksel = 1 blok. */
const hash = (x, y, s) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
function painter(g, seed) {
  const put = (x, y, c, k) => { g.fillStyle = `rgb(${c.map((v) => Math.min(255, Math.round(v * k))).join(",")})`; g.fillRect(x, y, 1, 1); };
  // warna dasar (atau daftar warna) + bintik acak ala tekstur Minecraft; dim menggelapkan sisi jauh
  const tex = (x, y, i, j, c, v, dim, s) => put(x, y, Array.isArray(c[0]) ? c[Math.floor(hash(i + 9, j + 3, s) * c.length)] : c, dim * (1 - v + 2 * v * hash(i, j, s)));
  return {
    box(x, y, w, h, c, v = 0.09, dim = 1) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) tex(x + i, y + j, i, j, c, v, dim, seed + w * 3 + h * 5);
    },
    // batang miring (kaki/lengan enderman): bergeser dx piksel dari atas ke bawah
    slant(x, y, w, h, dx, c, v = 0.09, dim = 1) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) tex(x + i + Math.round((dx * j) / (h - 1)), y + j, i, j, c, v, dim, seed + w * 3 + h * 5);
    },
    dot(x, y, c, w = 1, h = 1) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(x + i, y + j, c, 1); },
  };
}
const BLK = [20, 20, 20], WHT = [255, 255, 255];
const GREEN = [[95, 191, 74], [78, 168, 60], [111, 211, 90], [63, 143, 49], [126, 227, 106], [150, 205, 140]];
const FACE = ["01100110", "01100110", "00011000", "00111100", "00111100", "00100100"]; // wajah creeper, baris 2–7
// side/front = [lebar, tinggi, gambar(p, f)]; side menghadap kanan, f = frame langkah (0/1)
// speed = px/detik pada layar setinggi 800px, sink = bagian badan yang tenggelam saat berenang
const KINDS = {
  cow: {
    speed: 30, sink: 0.5,
    side: [26, 24, (p, f) => {
      const s = f ? 1 : -1, br = [70, 50, 36], wh = [232, 228, 220];
      const leg = (x, d) => { p.box(x, 12, 4, 10, br, 0.09, d); p.box(x, 22, 4, 2, [48, 42, 40], 0.09, d); };
      leg(1 - s, 0.65); leg(15 + s, 0.65); leg(1 + s, 1); leg(15 - s, 1);
      p.box(1, 2, 18, 10, br);
      p.box(4, 2, 5, 4, wh); p.box(11, 5, 5, 6, wh); p.box(1, 7, 2, 3, wh); p.box(7, 9, 3, 3, wh);
      p.box(6, 12, 4, 1, [226, 160, 160]);
      p.box(19, 1, 6, 8, br); p.box(19, 1, 3, 2, wh); p.box(23, 5, 2, 4, [214, 204, 194]);
      p.dot(20, 0, [190, 186, 176], 1, 2); p.dot(22, 3, WHT); p.dot(23, 3, BLK); p.dot(24, 7, [60, 45, 40]);
    }],
    front: [12, 24, (p) => {
      const br = [70, 50, 36], wh = [232, 228, 220];
      p.box(0, 12, 4, 10, br); p.box(8, 12, 4, 10, br); p.box(0, 22, 4, 2, [48, 42, 40]); p.box(8, 22, 4, 2, [48, 42, 40]);
      p.box(0, 2, 12, 10, br, 0.09, 0.85); p.box(0, 6, 2, 4, wh, 0.09, 0.85); p.box(10, 4, 2, 5, wh, 0.09, 0.85);
      p.box(2, 1, 8, 8, br); p.box(5, 1, 2, 4, wh);
      p.dot(1, 0, [190, 186, 176], 1, 3); p.dot(10, 0, [190, 186, 176], 1, 3);
      p.dot(2, 3, WHT); p.dot(3, 3, BLK); p.dot(8, 3, BLK); p.dot(9, 3, WHT);
      p.box(3, 5, 6, 4, [214, 204, 194]); p.dot(4, 6, BLK); p.dot(7, 6, BLK); p.dot(4, 8, [150, 110, 105], 4, 1);
    }],
  },
  pig: {
    speed: 34, sink: 0.5,
    side: [25, 15, (p, f) => {
      const s = f ? 1 : -1, pk = [240, 165, 162];
      const leg = (x, d) => { p.box(x, 9, 4, 5, pk, 0.07, d); p.box(x, 14, 4, 1, [196, 128, 124], 0.07, d); };
      leg(1 - s, 0.7); leg(12 + s, 0.7); leg(1 + s, 1); leg(12 - s, 1);
      p.box(1, 1, 16, 8, pk, 0.07);
      p.box(15, 0, 8, 8, pk, 0.07); p.box(23, 4, 1, 3, [216, 127, 124]);
      p.dot(21, 2, WHT); p.dot(22, 2, BLK); p.dot(0, 3, pk);
    }],
    front: [10, 15, (p) => {
      const pk = [240, 165, 162];
      p.box(0, 9, 4, 5, pk, 0.07); p.box(6, 9, 4, 5, pk, 0.07); p.box(0, 14, 4, 1, [196, 128, 124]); p.box(6, 14, 4, 1, [196, 128, 124]);
      p.box(0, 1, 10, 8, pk, 0.07, 0.88); p.box(1, 0, 8, 8, pk, 0.07);
      p.dot(1, 2, BLK); p.dot(2, 2, WHT); p.dot(7, 2, WHT); p.dot(8, 2, BLK);
      p.box(3, 4, 4, 3, [216, 127, 124], 0.05); p.dot(3, 5, [120, 60, 60]); p.dot(6, 5, [120, 60, 60]);
    }],
  },
  sheep: {
    speed: 28, sink: 0.5,
    side: [26, 21, (p, f) => {
      const s = f ? 1 : -1, wo = [236, 236, 236], sk = [208, 172, 142];
      const leg = (x, d) => { p.box(x, 12, 4, 3, wo, 0.1, d); p.box(x, 15, 4, 5, sk, 0.07, d); p.box(x, 20, 4, 1, [70, 58, 50], 0.07, d); };
      leg(2 - s, 0.7); leg(13 + s, 0.7); leg(2 + s, 1); leg(13 - s, 1);
      p.box(1, 2, 18, 10, wo, 0.1);
      p.box(17, 0, 6, 8, wo, 0.1); p.box(23, 1, 2, 7, sk, 0.07);
      p.dot(23, 3, WHT); p.dot(24, 3, BLK); p.dot(24, 6, [226, 150, 150]);
    }],
    front: [12, 21, (p) => {
      const wo = [236, 236, 236], sk = [208, 172, 142];
      for (const x of [1, 7]) { p.box(x, 12, 4, 3, wo, 0.1); p.box(x, 15, 4, 5, sk, 0.07); p.box(x, 20, 4, 1, [70, 58, 50]); }
      p.box(0, 2, 12, 10, wo, 0.1, 0.9); p.box(2, 0, 8, 8, wo, 0.1); p.box(3, 2, 6, 6, sk, 0.07);
      p.dot(3, 4, BLK); p.dot(4, 4, WHT); p.dot(7, 4, WHT); p.dot(8, 4, BLK); p.dot(5, 6, [226, 150, 150], 2, 1);
    }],
  },
  chicken: {
    speed: 40, sink: 0.3,
    side: [12, 12, (p, f) => {
      const wh = [244, 244, 244], ye = [232, 176, 48];
      const leg = (x, up) => { p.dot(x, 9, ye, 1, up ? 1 : 2); p.dot(x, up ? 10 : 11, ye, 2, 1); };
      leg(3, f); leg(5, !f);
      p.box(0, 3, 8, 6, wh, 0.05); p.box(1, 4, 6, 4, wh, 0.05, 0.9); p.dot(0, 2, wh);
      p.box(6, 0, 3, 6, wh, 0.05); p.dot(7, 1, BLK);
      p.dot(9, 2, ye, 2, 2); p.dot(9, 4, [200, 40, 36], 1, 2);
    }],
    front: [8, 12, (p) => {
      const wh = [244, 244, 244], ye = [232, 176, 48];
      p.dot(2, 9, ye, 1, 3); p.dot(5, 9, ye, 1, 3); p.dot(1, 11, ye); p.dot(6, 11, ye);
      p.box(1, 3, 6, 6, wh, 0.05); p.box(0, 4, 1, 4, wh, 0.05, 0.88); p.box(7, 4, 1, 4, wh, 0.05, 0.88);
      p.box(2, 0, 4, 6, wh, 0.05); p.dot(2, 1, BLK); p.dot(5, 1, BLK);
      p.dot(3, 2, ye, 2, 2); p.dot(3, 4, [200, 40, 36], 2, 2);
    }],
  },
  creeper: {
    speed: 26, sink: 0.45,
    side: [10, 26, (p, f) => {
      const s = f ? 1 : -1;
      const leg = (x, d) => { p.box(x, 20, 4, 6, GREEN, 0.06, d); p.dot(x + 1, 25, BLK); p.dot(x + 3, 25, BLK); };
      leg(1 - s, 0.65); leg(5 + s, 0.65); leg(1 + s, 1); leg(5 - s, 1);
      p.box(3, 8, 4, 12, GREEN, 0.06); p.box(1, 0, 8, 8, GREEN, 0.06);
    }],
    front: [8, 26, (p) => {
      p.box(0, 20, 4, 6, GREEN, 0.06); p.box(4, 20, 4, 6, GREEN, 0.06, 0.92);
      for (const x of [0, 2, 5, 7]) p.dot(x, 25, BLK);
      p.box(0, 8, 8, 12, GREEN, 0.06, 0.9); p.box(0, 0, 8, 8, GREEN, 0.06);
      FACE.forEach((row, y) => [...row].forEach((v, x) => v === "1" && p.dot(x, y + 2, BLK)));
    }],
  },
  enderman: {
    speed: 46, sink: 0.5,
    side: [14, 46, (p, f) => {
      const s = f ? 1 : -1, k = [24, 24, 27];
      p.slant(6, 20, 2, 26, -3 * s, k, 0.2, 0.7); p.slant(6, 8, 2, 30, 2 * s, k, 0.2, 0.7);
      p.box(5, 8, 4, 12, k, 0.2); p.slant(6, 20, 2, 26, 3 * s, k, 0.2);
      p.slant(6, 8, 2, 30, -2 * s, k, 0.2, 1.5);
      p.box(3, 0, 8, 8, k, 0.2); p.dot(10, 4, [224, 121, 250]);
    }],
    front: [12, 46, (p) => {
      const k = [24, 24, 27];
      p.box(3, 20, 2, 26, k, 0.2); p.box(7, 20, 2, 26, k, 0.2);
      p.box(0, 8, 2, 30, k, 0.2, 1.3); p.box(10, 8, 2, 30, k, 0.2, 1.3);
      p.box(2, 8, 8, 12, k, 0.2); p.box(2, 0, 8, 8, k, 0.2);
      for (const x of [2, 7]) { p.dot(x, 4, [224, 121, 250], 3, 1); p.dot(x + 1, 4, [204, 0, 250]); }
    }],
  },
  villager: {
    speed: 32, sink: 0.45,
    side: [12, 32, (p, f) => {
      const s = f ? 1 : -1, sk = [189, 139, 114], ro = [92, 62, 44], sh = [84, 72, 62];
      p.box(3 - s, 28, 4, 4, sh, 0.08, 0.7); p.box(3 + s, 28, 4, 4, sh, 0.08);
      p.box(2, 10, 6, 12, ro); p.box(2, 22, 6, 6, ro, 0.09, 0.88);
      p.box(5, 12, 6, 4, ro, 0.09, 0.78); p.dot(10, 13, sk, 1, 2);
      p.box(1, 0, 8, 10, sk, 0.06); p.box(9, 5, 2, 4, [168, 112, 90], 0.06);
      p.dot(7, 3, [58, 42, 30], 2, 1); p.dot(7, 4, WHT); p.dot(8, 4, [58, 138, 58]); p.dot(7, 8, [128, 84, 70], 2, 1);
    }],
    front: [8, 32, (p) => {
      const sk = [189, 139, 114], ro = [92, 62, 44], sh = [84, 72, 62];
      p.box(0, 28, 4, 4, sh, 0.08); p.box(4, 28, 4, 4, sh, 0.08, 0.9);
      p.box(0, 10, 8, 12, ro); p.box(0, 22, 8, 6, ro, 0.09, 0.88); p.box(3, 10, 2, 18, ro, 0.09, 0.7);
      p.box(0, 13, 8, 4, ro, 0.09, 0.78); p.dot(3, 14, sk, 2, 2);
      p.box(0, 0, 8, 10, sk, 0.06);
      p.dot(1, 3, [58, 42, 30], 6, 1); p.dot(1, 4, WHT); p.dot(2, 4, [58, 138, 58]); p.dot(5, 4, [58, 138, 58]); p.dot(6, 4, WHT);
      p.dot(2, 8, [128, 84, 70], 4, 1); p.box(3, 5, 2, 4, [168, 112, 90], 0.06);
    }],
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

function Mob({ m, onExit }) {
  const el = useRef(null), cv = useRef(null);
  useEffect(() => {
    const n = el.current, c = cv.current, g = c.getContext("2d"), kind = KINDS[m.kind], T = TERRAIN;
    const vh = world.sy || innerHeight;
    const u = Math.max(2, Math.round(((vh * T.size) / 16) * 1.8)); // sedikit lebih besar dari skala blok agar terlihat
    const mw = Math.max(kind.side[0], kind.front[0]) * u, speed = (m.speed * vh) / 800;
    n.style.width = `${mw}px`; n.style.height = `${Math.max(kind.side[1], kind.front[1]) * u}px`;
    let hov = false, frame = 0, step = 0, raf, prev = 0, wait = m.delay * 1000, y = null, vy = 0;
    let wx = (m.at != null ? m.at * (innerWidth - mw) : m.dir > 0 ? -mw : innerWidth) + world.par * T.shift * world.sx;
    const paint = () => {
      const [w, h, draw] = hov ? kind.front : kind.side;
      c.width = w; c.height = h; c.style.width = `${w * u}px`;
      if (!hov && m.dir < 0) g.setTransform(-1, 0, 0, 1, w, 0);
      draw(painter(g, m.id), frame);
    };
    // puncak kolom tertinggi di bawah badan (satuan shader); di bawah permukaan air berarti danau
    const ground = () => {
      const bw = T.size * world.sx; let top = 0;
      for (let i = Math.floor((wx + mw * 0.25) / bw); i <= Math.floor((wx + mw * 0.75) / bw); i++) top = Math.max(top, heights[((i % T.cols) + T.cols) % T.cols]);
      return T.base + top * T.size;
    };
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - (prev || now), 100) / 1000; prev = now;
      if (wait > 0) { wait -= dt * 1000; return; }
      let goal = 0, water = 0, pace = 1;
      if (world.sy) {
        const top = ground(), swim = top < T.water;
        water = T.water * world.sy; pace = swim ? 0.6 : 1;
        goal = swim ? water - kind.sink * kind.side[1] * u + Math.sin(now / 400) * 1.5 : top * world.sy;
      }
      if (!hov) {
        wx += m.dir * speed * pace * dt;
        if ((step += dt) > 0.22) { step = 0; frame ^= 1; paint(); }
      }
      if (y == null) y = goal;
      else if (goal > y) { y += (goal - y) * Math.min(1, dt * 14); vy = 0; } // lompat naik blok
      else { vy -= 1400 * dt; y += vy * dt; if (y <= goal) { y = goal; vy = 0; } } // jatuh
      const x = wx - world.par * T.shift * world.sx, under = water - y;
      n.style.transform = `translate3d(${x}px,${-y}px,0)`;
      c.style.clipPath = under > 0.5 ? `inset(0 0 ${under}px 0)` : "";
      if (!hov && (m.dir > 0 ? x > innerWidth : x < -mw)) { cancelAnimationFrame(raf); onExit(m.id); }
    };
    // layer ini ada di belakang <main>, jadi hover dideteksi manual dari posisi pointer (hanya di area hero)
    const mv = (e) => {
      const r = c.getBoundingClientRect();
      const on = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
        && !!e.target.closest?.(".hero") && !e.target.closest(".me");
      if (on === hov) return;
      hov = on; paint();
      if (on) say(m.kind);
    };
    paint(); n.style.transform = "translate3d(-999px,0,0)"; raf = requestAnimationFrame(tick);
    addEventListener("pointermove", mv); addEventListener("pointerdown", mv);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", mv); removeEventListener("pointerdown", mv); };
  }, []);
  return <div ref={el} className="mob"><canvas ref={cv} /></div>;
}

let seq = 0;
function spawn(others, first) {
  const free = NAMES.filter((k) => !others.some((o) => o.kind === k));
  const kind = free[Math.floor(Math.random() * free.length)];
  return {
    id: ++seq, kind, dir: Math.random() < 0.5 ? 1 : -1,
    speed: KINDS[kind].speed * (0.85 + Math.random() * 0.3),
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
