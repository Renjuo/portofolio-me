/* Waktu & tema langit berdasarkan jam WIB.
   Siang (tema terang): 06:00–17:59 — sunrise sampai sore.
   Malam (tema gelap): 18:00–05:59 — sunset sampai malam.
   Pratinjau lewat URL: ?jam=19.5 (jam tetap) atau ?jam=demo (satu hari dalam 60 detik). */

export const isDay = (h) => h >= 6 && h < 18;

export function wibHour(d = new Date()) {
  return ((d.getUTCHours() + 7) % 24) + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600 + d.getUTCMilliseconds() / 3.6e6;
}

export function makeClock() {
  const q = new URLSearchParams(location.search).get("jam");
  if (q === "demo") {
    const t0 = performance.now(), h0 = wibHour();
    return () => (h0 + (performance.now() - t0) / 2500) % 24;
  }
  const n = parseFloat(q);
  if (q && !isNaN(n)) return () => ((n % 24) + 24) % 24;
  return () => wibHour();
}

/* Dijalankan di <head> sebelum render supaya tema tidak berkedip */
export const themeScript = `(function(){try{var q=new URLSearchParams(location.search).get("jam"),d=new Date(),h=(d.getUTCHours()+7)%24+d.getUTCMinutes()/60,n=parseFloat(q);if(q&&q!=="demo"&&!isNaN(n))h=((n%24)+24)%24;document.documentElement.dataset.theme=h>=6&&h<18?"day":"night"}catch(e){}})()`;

/* Lapis bukit terdepan: tinggi tiap kolom blok dihitung di sini lalu dikirim ke shader sebagai
   tekstur, supaya langit dan makhluk yang berjalan di atasnya (<Mobs />) memakai data yang sama. */
export const TERRAIN = { size: 0.034, base: -0.01, water: 0.078, seed: 37, cols: 256, shift: 0.03 };
const fract = (v) => v - Math.floor(v);
export const heights = Uint8Array.from({ length: TERRAIN.cols }, (_, c) => {
  const s = TERRAIN.seed;
  const n = Math.sin(c * 0.23 + s) * 1.6 + Math.sin(c * 0.57 + s * 2.1) * 1.1 + Math.sin(c * 1.31 + s * 3.7) * 0.6
    + (fract(Math.sin((c + s * 13) * 127.1) * 43758.5453) - 0.5) * 1.2;
  return Math.floor(Math.min(7, Math.max(1, 3.4 + n)));
});
// diisi <Sky />: par = parallax saat ini, sx/sy = piksel layar per satuan koordinat shader (0 bila WebGL mati)
export const world = { par: 0, sx: 0, sy: 0 };
