# Portofolio Futuristik (Next.js + React + Framer Motion)

## Jalankan lokal
    npm install
    npm run dev        # buka http://localhost:3000

## Deploy gratis ke GitHub Pages
1. Buat repo bernama `username.github.io`, push semua isi folder ini ke branch `main`.
2. Di GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Setiap push ke `main` akan otomatis build dan publish. Situs: https://github.com/Renjuo

Jika nama repo bukan `username.github.io`, ubah langkah build di
`.github/workflows/deploy.yml` menjadi:  `NEXT_PUBLIC_BASE_PATH=/nama-repo npm run build`

## Yang perlu diedit
`app/page.jsx`: text, projects (marked EDIT), email, and LinkedIn/GitHub links.

## Foto
Foto ada di `public/rafli.webp` (baju navy). Pilihan warna lain ada di folder `foto-pilihan/`:
salin salah satunya ke `public/rafli.webp` untuk menggantinya.

## Permintaan CV (pengunjung menunggu persetujuan)
Tombol **Request my CV** ada di bagian Contact (link **CV** di menu atas juga menuju ke sana).
Pengunjung mengisi nama + email, lalu kamu menerima email berisi tombol **Konfirmasi** / **Tolak**.
Kalau dikonfirmasi, CV otomatis dikirim sebagai lampiran ke email pengunjung.

> Jangan taruh file CV di folder `public/`: semua isi `public/` bisa diunduh siapa saja tanpa izin.

Pasang sekali (±10 menit):
1. Upload CV (PDF) ke Google Drive. Biarkan **privat**. Buka file, salin ID dari URL:
   `https://drive.google.com/file/d/<ID_INI>/view`.
2. Buat Google Sheet baru (misalnya "CV Requests") > menu **Extensions > Apps Script**.
3. Hapus isi `Code.gs`, tempel seluruh isi `backend/cv-request.gs`, lalu isi `CV_FILE_ID` dengan ID dari langkah 1. Simpan.
4. Klik **Deploy > New deployment** > ikon gerigi > **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Klik Deploy, lalu izinkan akses (Gmail, Drive, Sheets). Kalau muncul "Google hasn't verified this app",
   klik Advanced > Go to ... (unsafe). Ini aman karena script-nya milikmu sendiri.
5. Salin **Web app URL** (berakhiran `/exec`), tempel ke `CV_ENDPOINT` di `components/CvRequest.jsx`.
6. Push ke GitHub.

Semua permintaan tercatat di tab **Requests** pada Sheet tersebut (status pending / approved / rejected).
Kalau kode `.gs` diubah: **Deploy > Manage deployments > Edit > Version: New version**, supaya URL-nya tetap sama.
