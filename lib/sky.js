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
