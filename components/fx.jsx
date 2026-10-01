"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useInView } from "framer-motion";
import { makeClock, isDay } from "../lib/sky";

/* Langit Minecraft bergaya shader pack (WebGL) yang mengikuti jam WIB:
   cahaya matahari & bloom, god rays, awan volumetrik, 3 lapis bukit blok berkabut,
   danau yang memantulkan langit, bintang & kunang-kunang di malam hari. Juga mengatur tema halaman. */
const rgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
const SKY = [ // [jam, warna atas, warna horizon]
  [0, "#03040c", "#0b1230"], [4.5, "#03040c", "#0b1230"], [5.5, "#141238", "#4a2c5a"],
  [6, "#2d3f86", "#ff9356"], [7, "#4a7fd6", "#ffc890"], [8.5, "#3f7fe0", "#cfe4ff"],
  [15.5, "#3f7fe0", "#cfe4ff"], [17, "#4d78cf", "#ffd29a"], [18, "#2c3474", "#ff7a3c"],
  [18.7, "#16183f", "#a8445a"], [19.5, "#04050f", "#101538"], [24, "#03040c", "#0b1230"],
].map(([h, a, b]) => [h, rgb(a), rgb(b)]);
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
function skyAt(h) {
  let i = 0; while (h >= SKY[i + 1][0]) i++;
  const [h0, t0, b0] = SKY[i], [h1, t1, b1] = SKY[i + 1], k = (h - h0) / (h1 - h0);
  return [mix(t0, t1, k), mix(b0, b1, k)];
}
// seberapa "malam" (0–1) dan seberapa dekat ke sunrise/sunset (0–1)
const nightAt = (h) => (h >= 19.5 || h < 4.5 ? 1 : h >= 18.3 && h < 19.5 ? (h - 18.3) / 1.2 : h >= 4.5 && h < 6 ? (6 - h) / 1.5 : 0);
const duskAt = (h) => Math.min(1, Math.max(0, 1 - Math.abs(h - 6) / 1.5) + Math.max(0, 1 - Math.abs(h - 18) / 1.5));

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FRAG = `
precision highp float;
uniform vec2 uRes, uSun, uMoon;
uniform float uTime, uAspect, uNight, uDusk, uSunUp, uMoonUp, uMist, uPar;
uniform vec3 uTop, uBot, uSunCol;

// lapisan bukit: ukuran blok, dasar, seed, amplitudo
const vec4 LF = vec4(.014, .17, 11., 2.2);
const vec4 LM = vec4(.022, .09, 23., 1.4);
const vec4 LN = vec4(.034, -.01, 37., 1.);
const float WL = .078; // permukaan air di lapis depan

float h1(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h2(i), h2(i + vec2(1, 0)), f.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; } return v; }
float fbm3(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; } return v; }

float blocks(float c, vec4 L, float maxB) {
  float n = sin(c * .23 + L.z) * 1.6 + sin(c * .57 + L.z * 2.1) * 1.1 + sin(c * 1.31 + L.z * 3.7) * .6 + (h1(c + L.z * 13.) - .5) * 1.2;
  return floor(clamp(3.4 + n * L.w, 1., maxB));
}
float topAt(float x, vec4 L, float maxB) { return L.y + blocks(floor(x / L.x), L, maxB) * L.x; }
float xF(float x) { return x + uPar * .006 + 3.1; }
float xM(float x) { return x + uPar * .015 + 7.7; }
float xN(float x) { return x + uPar * .03; }

vec3 skyCol(vec2 p) {
  vec3 c = mix(uBot, uTop, pow(smoothstep(.1, 1., p.y), .7));
  float d = length(p - uSun);
  c += uSunCol * (exp(-d * 3.) * .35 * (.4 + uDusk) + exp(-d * 12.) * .35) * uSunUp;
  c += uSunCol * exp(-abs(p.y - .2) * 9.) * .25 * uDusk * exp(-abs(p.x - uSun.x) * .8);
  return c;
}
float cloudD(vec2 p, float t) {
  float band = smoothstep(.5, .66, p.y) * smoothstep(1.05, .85, p.y);
  return smoothstep(.48, .78, fbm(vec2(p.x * 1.4 + t * .012, p.y * 4.2))) * band;
}
float cloudD3(vec2 p, float t) {
  float band = smoothstep(.5, .66, p.y) * smoothstep(1.05, .85, p.y);
  return smoothstep(.48, .78, fbm3(vec2(p.x * 1.4 + t * .012, p.y * 4.2))) * band;
}
vec3 lightCol() {
  vec3 amb = mix(uBot, uTop, .5) * .45 + vec3(.04, .05, .09);
  return amb + uSunCol * uSunUp * .85 + vec3(.45, .55, .85) * .35 * uMoonUp * uNight;
}

// tekstur blok 8x8 ala Minecraft. kind: 0 rumput, 1 tanah, 2 batu, 3 kayu, 4 daun
vec3 blockTex(float kind, vec2 lc, float s, float detail) {
  vec2 tx = floor(lc * 8.);
  float n = mix(.5, h2(tx + s), detail);
  if (kind < .5) {
    float edge = 2. + step(.5, h2(vec2(tx.x, s)));
    return tx.y < edge ? vec3(.37, .6, .24) * (.85 + .3 * n) : vec3(.5, .34, .21) * (.82 + .3 * n);
  }
  if (kind < 1.5) return vec3(.5, .34, .21) * (.82 + .3 * n);
  if (kind < 2.5) return vec3(.47, .47, .48) * (.8 + .35 * n);
  if (kind < 3.5) return vec3(.42, .29, .16) * (abs(tx.x - 1.) < .5 || abs(tx.x - 5.) < .5 ? .75 : .95 + .1 * n);
  return vec3(.24, .47, .16) * (n < .2 ? .55 : .75 + .45 * n);
}

// satu lapis bukit (+ pohon). rgb = warna, a = 1 bila mengenai blok
vec4 layer(vec2 p, float x, vec4 L, float maxB, float detail, float wl) {
  vec3 lc0 = lightCol();
  float c = floor(x / L.x), top = L.y + blocks(c, L, maxB) * L.x;
  if (p.y < top) {
    float depth = (top - p.y) / L.x, bi = floor(depth);
    vec2 lc = vec2(fract(x / L.x), fract(depth));
    vec3 col = blockTex(bi < 1. ? 0. : bi < 3. ? 1. : 2., lc, c * 13. + bi * 7. + L.z, detail);
    float tl = L.y + blocks(c - 1., L, maxB) * L.x, tr = L.y + blocks(c + 1., L, maxB) * L.x;
    float face = (step(tr, p.y) * step(.86, lc.x) - step(tl, p.y) * step(lc.x, .14)) * clamp((uSun.x - p.x) * 3., -1., 1.);
    float ao = 1. - .35 * (step(p.y, tl) * smoothstep(.35, 0., lc.x) + step(p.y, tr) * smoothstep(.65, 1., lc.x));
    col *= lc0 * (1. + .3 * face * uSunUp) * ao * mix(1., .6, smoothstep(0., 3.5, depth));
    col += lc0 * .12 * smoothstep(.12, 0., lc.y) * step(bi, .5);
    return vec4(col, 1.);
  }
  for (int i = -2; i <= 2; i++) { // pohon oak di kolom sekitar
    float cc = c + float(i);
    if (h1(cc * 1.37 + L.z) > .14) continue;
    float g = L.y + blocks(cc, L, maxB) * L.x;
    if (g < wl) continue;
    float by = floor((p.y - g) / L.x), bx = abs(float(i));
    bool leaf = ((by == 2. || by == 3.) && bx <= 2. && !(bx == 2. && h2(vec2(cc, by)) < .4))
             || (by == 4. && bx <= 1.) || (by == 5. && bx <= 1. && (bx == 0. || h2(vec2(cc, by)) > .5));
    bool trunk = bx == 0. && by >= 0. && by <= 3.;
    if (leaf || trunk) {
      vec2 lc = vec2(fract(x / L.x), 1. - fract((p.y - g) / L.x));
      vec3 col = blockTex(leaf ? 4. : 3., lc, cc * 5. + by * 3., detail) * lc0;
      if (leaf) col += uSunCol * .12 * uSunUp; // cahaya tembus daun
      return vec4(col, 1.);
    }
  }
  return vec4(0.);
}

vec3 fogCol(vec2 p) { return skyCol(vec2(p.x, .22)); }

// semua yang ada di belakang lapis depan: langit, benda langit, awan, bukit jauh & tengah
vec3 background(vec2 p, float t) {
  vec3 col = skyCol(p);
  if (uNight > 0.) {
    vec2 g = p * 90.; vec2 id = floor(g); float r = h2(id);
    if (r > .985) {
      vec2 o = .25 + .5 * vec2(h2(id + 3.1), h2(id + 7.3));
      float tw = .6 + .4 * sin(t * (1. + r * 3.) + r * 90.);
      col += vec3(1., .97, .9) * smoothstep(.14, 0., length(fract(g) - o)) * tw * uNight * smoothstep(.2, .45, p.y);
    }
    float mw = fbm3(vec2(p.x * 2. + p.y * 1.3, p.y * 3. - p.x * .8) * 2.) * exp(-pow((p.y - .55 - (p.x - uAspect * .5) * .35) * 4., 2.));
    col += vec3(.35, .3, .55) * mw * .25 * uNight;
  }
  vec2 ds = abs(p - uSun);
  if (max(ds.x, ds.y) < .032) col = mix(col, vec3(1.25, 1.18, .95), clamp(uSunUp * 3., 0., 1.));
  vec2 dm = p - uMoon;
  if (max(abs(dm.x), abs(dm.y)) < .024) {
    vec2 tx = floor(dm / .006);
    col = mix(col, vec3(.86, .88, .96) * (h2(tx + 5.) > .75 ? .7 : .95 + .05 * h2(tx)), clamp(uMoonUp * 3., 0., 1.));
  }
  col += vec3(.6, .7, 1.) * exp(-length(dm) * 9.) * .18 * uNight * uMoonUp;

  vec3 amb = mix(uBot, uTop, .5);
  float ci = smoothstep(.55, .9, fbm3(vec2(p.x * .9 - t * .006, p.y * 16.))) * smoothstep(.6, .8, p.y);
  col = mix(col, mix(amb * 1.1, uSunCol, .45 * uSunUp + .2 * uDusk), ci * .35);
  float d = cloudD(p, t);
  if (d > 0.) {
    vec2 Lp = uSunUp > .01 ? uSun : uMoon;
    float lit = exp(-cloudD3(p + normalize(Lp - p) * .035, t) * 3.2);
    vec3 base = (mix(amb * 1.1, vec3(1.05), .7 * uSunUp) + vec3(.35, .12, .14) * uDusk) * (.78 + .22 * (1. - d)) * (1. - .8 * uNight);
    vec3 cc = base * (.8 + .2 * lit) + (uSunCol * uSunUp + vec3(.5, .6, .9) * .3 * uMoonUp * uNight) * lit * .5;
    cc += uSunCol * pow(max(0., 1. - length(p - uSun) * 1.8), 4.) * (1. - d) * uSunUp * 1.2;
    col = mix(col, cc, d * .92);
  }

  vec4 f = layer(p, xF(p.x), LF, 15., .25, -1.);
  if (f.a > 0.) col = mix(f.rgb, fogCol(p), .72);
  vec4 m = layer(p, xM(p.x), LM, 10., .6, -1.);
  if (m.a > 0.) col = mix(m.rgb, fogCol(p), .36 + .3 * uMist * exp(-(p.y - LM.y) / .07));
  return col;
}

float occlusion(vec2 q, float t) {
  float top = max(topAt(xF(q.x), LF, 15.), max(topAt(xM(q.x), LM, 10.), topAt(xN(q.x), LN, 7.)));
  return step(top, q.y) * (1. - cloudD3(q, t) * .85);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes, p = vec2(uv.x * uAspect, uv.y);
  float t = uTime;
  vec3 col = background(p, t);

  vec4 n = layer(p, xN(p.x), LN, 7., 1., WL);
  if (n.a > 0.) col = mix(n.rgb, fogCol(p), .05 + .4 * uMist * exp(-(p.y - LN.y) / .05));
  else if (p.y < WL) { // danau: pantulan langit + kilau matahari
    vec2 rp = vec2(p.x + sin(p.y * 140. + t * 1.6) * .0025, 2. * WL - p.y);
    vec3 refl = background(rp, t);
    col = mix(vec3(.04, .16, .28) * lightCol(), refl * vec3(.75, .88, .95), .7);
    float glint = pow(max(0., 1. - abs(p.x - uSun.x) * 4.), 6.) * step(.62, noise(vec2(p.x * 90., p.y * 400. + t * 3.)));
    col += uSunCol * glint * .7 * uSunUp + vec3(.8, .9, 1.) * smoothstep(WL - .004, WL, p.y) * .15;
  }

  if (uNight > 0. && p.y < .35) { // kunang-kunang
    vec2 g = p * 14., id = floor(g); float r = h2(id + .3);
    if (r < .3) {
      vec2 o = .25 + .5 * vec2(h2(id + 1.1), h2(id + 2.3)) + .18 * vec2(sin(t * .6 + r * 40.), cos(t * .8 + r * 30.));
      float dd = length(fract(g) - o);
      col += vec3(.75, 1., .35) * exp(-dd * dd * 140.) * (.5 + .5 * sin(t * 2. + r * 60.)) * uNight;
    }
  }

  vec2 Lp = uSunUp > .01 ? uSun : uMoon; // god rays dari matahari (atau bulan, lebih lemah)
  float Ls = uSunUp > .01 ? uSunUp * (.28 + .45 * uDusk) : uMoonUp * uNight * .12;
  if (Ls > 0.) {
    vec2 dir = (Lp - p) / 16., q = p + dir * h2(gl_FragCoord.xy);
    float acc = 0.;
    for (int i = 0; i < 16; i++) { acc += occlusion(q, t); q += dir; }
    col += (uSunUp > .01 ? uSunCol : vec3(.6, .7, 1.)) * acc / 16. * exp(-length(p - Lp) * 1.6) * Ls;
  }
  if (uSunUp > .01) { // lens flare tipis
    float vis = occlusion(uSun, t);
    vec2 ax = vec2(uAspect * .5, .5) - uSun;
    col += uSunCol * vis * uSunUp * .06 * (smoothstep(.05, .03, length(p - uSun - ax * .7)) + smoothstep(.09, .05, length(p - uSun - ax * 1.3)) * .6);
  }

  float lum = dot(col, vec3(.2126, .7152, .0722));
  col = mix(vec3(lum), col, 1.12);
  col = min(col, .8) + .2 * (1. - exp(-max(col - .8, 0.) / .2)); // bahu highlight lembut
  float v = length(uv - .5);
  col *= mix(1., .72, smoothstep(.35, .85, v));
  gl_FragColor = vec4(col + (h2(gl_FragCoord.xy + t) - .5) / 255., 1.);
}`;

function compile(gl) {
  const sh = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.bindAttribLocation(pr, 0, "a"); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const u = {};
  for (const k of ["uRes", "uSun", "uMoon", "uTime", "uAspect", "uNight", "uDusk", "uSunUp", "uMoonUp", "uMist", "uPar", "uTop", "uBot", "uSunCol"]) u[k] = gl.getUniformLocation(pr, k);
  return u;
}

export function Sky() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, hour = makeClock();
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    let u = null;
    try { if (gl) u = compile(gl); } catch (e) { console.warn("Sky shader:", e); }
    if (!u) cv.style.display = "none"; // tanpa WebGL: cukup warna langit dari CSS
    let raf, prev = -1e9, theme, aspect = 1, par = 0, target = 0;
    const size = () => {
      const s = innerWidth > 1400 ? 0.6 : 0.8; // render lebih kecil lalu di-upscale, hemat GPU
      cv.width = Math.round(innerWidth * s); cv.height = Math.round(innerHeight * s);
      aspect = innerWidth / innerHeight;
      if (u) gl.viewport(0, 0, cv.width, cv.height);
    };
    const mv = (e) => { target = (e.clientX / innerWidth) * 2 - 1; };
    // posisi di lintasan busur; p: 0 = terbit (kiri), 1 = terbenam (kanan)
    const arc = (p) => (p < -0.08 || p > 1.08 ? [-9, -9] : [aspect * (0.1 + 0.8 * p), 0.2 + Math.sin(Math.PI * clamp(p)) * 0.7 + (p < 0 ? p : p > 1 ? 1 - p : 0) * 1.2]);
    const up = (p) => (p < -0.08 || p > 1.08 ? 0 : clamp(Math.sin(Math.PI * p) * 4 + 0.15));
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - prev < (calm ? 1000 : 33)) return; // ~30 fps
      prev = now;
      const h = hour(), mode = isDay(h) ? "day" : "night";
      if (mode !== theme) { theme = mode; document.documentElement.dataset.theme = mode; }
      if (!u) return;
      if (!calm) par += (target - par) * 0.05;
      const sp = (h - 6) / 12, mp = ((h - 18 + 24) % 24) / 12, night = nightAt(h);
      const [top, bot] = skyAt(h);
      gl.uniform2f(u.uRes, cv.width, cv.height);
      gl.uniform2f(u.uSun, ...arc(sp)); gl.uniform2f(u.uMoon, ...arc(mp));
      gl.uniform1f(u.uTime, calm ? 0 : now / 1000); gl.uniform1f(u.uAspect, aspect);
      gl.uniform1f(u.uNight, night); gl.uniform1f(u.uDusk, duskAt(h));
      gl.uniform1f(u.uSunUp, up(sp)); gl.uniform1f(u.uMoonUp, up(mp));
      gl.uniform1f(u.uMist, 0.35 * Math.max(0, 1 - Math.abs(h - 6.5) / 2) + 0.15 * night);
      gl.uniform1f(u.uPar, par);
      gl.uniform3f(u.uTop, ...top); gl.uniform3f(u.uBot, ...bot);
      gl.uniform3f(u.uSunCol, ...mix([1, 0.5, 0.22], [1, 0.93, 0.82], clamp(Math.sin(Math.PI * sp) * 2.2)));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    size(); raf = requestAnimationFrame(draw);
    addEventListener("resize", size); addEventListener("pointermove", mv);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", mv); };
  }, []);
  return <canvas ref={ref} className="field sky" aria-hidden="true" />;
}

/* Kursor: crosshair ala Minecraft (plus putih, blend "difference" seperti di game).
   Melebar saat mouse bergerak (spread ala FPS), muncul outline blok saat mengarah ke
   elemen interaktif, dan partikel blok pecah saat klik. */
const BLOCKS = ["#6b8e23", "#5e7d1e", "#8b5a2b", "#6b4423", "#7d7d7d", "#a0a0a0"];
export function Cursor() {
  const x = useMotionValue(-80), y = useMotionValue(-80);
  const gap = useSpring(0, { stiffness: 380, damping: 22 });
  const neg = useTransform(gap, (g) => -g);
  const [target, setTarget] = useState(null);
  const [bits, setBits] = useState([]);
  const el = useRef(null), last = useRef({ x: 0, y: 0 }), timer = useRef(null);
  const box = (n) => { const r = n.getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; };
  useEffect(() => {
    const rest = () => (el.current ? 5 : 0);
    const mv = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      const v = Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y);
      last.current = { x: e.clientX, y: e.clientY };
      gap.set(rest() + Math.min(v * 0.6, 14));
      clearTimeout(timer.current); timer.current = setTimeout(() => gap.set(rest()), 90);
      const n = e.target.closest?.("a,button,[data-hover]") || null;
      if (n !== el.current) { el.current = n; setTarget(n ? box(n) : null); }
    };
    const sc = () => el.current && setTarget(box(el.current));
    const down = (e) => {
      const id = Date.now() + Math.random();
      const nb = Array.from({ length: 10 }, (_, i) => ({
        id: id + i, x: e.clientX, y: e.clientY,
        dx: (Math.random() - 0.5) * 120, dy: -30 - Math.random() * 50,
        s: 5 + Math.floor(Math.random() * 3) * 2, r: (Math.random() - 0.5) * 240,
        c: BLOCKS[Math.floor(Math.random() * BLOCKS.length)],
      }));
      setBits((b) => [...b, ...nb]);
      setTimeout(() => setBits((b) => b.filter((p) => !nb.includes(p))), 800);
      gap.set(rest() + 12);
    };
    addEventListener("mousemove", mv); addEventListener("scroll", sc, true); addEventListener("mousedown", down);
    return () => {
      clearTimeout(timer.current);
      removeEventListener("mousemove", mv); removeEventListener("scroll", sc, true); removeEventListener("mousedown", down);
    };
  }, [x, y, gap]);
  return (
    <>
      {target && <div className="sel" style={{ left: target.l, top: target.t, width: target.w, height: target.h }} />}
      {bits.map((p) => (
        <motion.i key={p.id} className="bit" style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: p.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.dx, y: [0, p.dy, p.dy + 90], opacity: [1, 1, 0], rotate: p.r }}
          transition={{ duration: 0.75, ease: "easeOut", times: [0, 0.4, 1] }} />
      ))}
      <motion.div className="xh" style={{ x, y }}>
        <i className="c" />
        <motion.i className="u" style={{ y: neg }} />
        <motion.i className="d" style={{ y: gap }} />
        <motion.i className="l" style={{ x: neg }} />
        <motion.i className="r" style={{ x: gap }} />
      </motion.div>
    </>
  );
}

export function Progress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />;
}

/* Jam waktu Indonesia (WIB) */
export function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => {
      const now = new Date();
      const d = now.toLocaleDateString("en-GB", { timeZone: "Asia/Jakarta", weekday: "short", day: "2-digit", month: "short", year: "numeric" });
      const h = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false });
      setT(`${d} — ${h}`);
    };
    f(); const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{t} WIB</span>;
}

/* Teks yang "diacak" lalu tersusun; diulang saat di-hover */
export function Scramble({ text }) {
  const [out, setOut] = useState(text);
  const id = useRef(null);
  const run = () => {
    clearInterval(id.current);
    const chars = "!<>-_/[]{}=+*^?#";
    let f = 0;
    id.current = setInterval(() => {
      setOut(text.split("").map((ch, i) => (ch === " " ? " " : i < f / 2 ? ch : chars[Math.floor(Math.random() * chars.length)])).join(""));
      if (++f > text.length * 2 + 2) { clearInterval(id.current); setOut(text); }
    }, 35);
  };
  useEffect(() => { run(); return () => clearInterval(id.current); }, []);
  return <span onMouseEnter={run} aria-label={text}>{out}</span>;
}

/* Tombol/link yang sedikit tertarik ke arah kursor */
export function Magnetic({ children }) {
  const r = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  const mv = (e) => {
    const b = r.current.getBoundingClientRect();
    x.set((e.clientX - b.left - b.width / 2) * 0.3); y.set((e.clientY - b.top - b.height / 2) * 0.3);
  };
  return (
    <motion.span ref={r} style={{ x: sx, y: sy, display: "inline-block" }} onMouseMove={mv} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.span>
  );
}

/* Baris teks yang naik dari balik "topeng" */
export const Line = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  return (
    <span ref={ref} className="mask">
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%" }}
        animate={{ y: seen ? 0 : "110%" }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const Fade = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1], delay }}>
    {children}
  </motion.div>
);

/* Foto + lingkaran oranye dengan efek parallax mengikuti mouse */
export function Portrait({ src }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 }), py = useSpring(my, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const f = (e) => { mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5); };
    addEventListener("mousemove", f);
    return () => removeEventListener("mousemove", f);
  }, [mx, my]);
  const dx = useTransform(px, (v) => v * -50), dy = useTransform(py, (v) => v * -30);
  const fx = useTransform(px, (v) => v * 14), fy = useTransform(py, (v) => v * 8);
  const ease = [0.2, 0.7, 0.1, 1];
  return (
    <div className="portrait">
      <motion.div className="disc-wrap" style={{ x: dx, y: dy }}>
        <motion.div className="disc" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, ease }} />
      </motion.div>
      <motion.div className="me-wrap" initial={{ y: "10%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25, ease }}>
        <motion.img className="me" src={src} alt="Portrait of Rafli" style={{ x: fx, y: fy, scale: 1.04, originX: 1, originY: 1 }} />
      </motion.div>
    </div>
  );
}
