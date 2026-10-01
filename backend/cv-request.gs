// ============================================================
//  BACKEND PERMINTAAN CV - Google Apps Script
//  Cara pasang: lihat bagian "Permintaan CV" di README.md.
//
//  Alur:
//  1. Pengunjung isi form di website  -> doPost() menyimpan ke Sheet
//     dan mengirim email ke OWNER_EMAIL berisi tombol Konfirmasi / Tolak.
//  2. Tombol di email membuka halaman konfirmasi (doGet).
//  3. Setelah diklik: Konfirmasi -> CV dikirim sebagai lampiran ke pengunjung.
//                     Tolak      -> pengunjung diberi tahu dengan sopan.
// ============================================================

const OWNER_EMAIL = "yahyarafli.hidayah04@gmail.com";
const CV_FILE_ID = "1ia2CZQ9oNMJrnRKubXGwI5vSQAhpF_eY"; // dari link Drive: /file/d/<ID>/view
const SHEET_NAME = "Requests";
const MAX_PER_HOUR = 20; // batas permintaan per jam (anti-spam)

const COLS = ["Waktu", "ID", "Token", "Nama", "Email", "Perusahaan", "Keperluan", "Status", "Diputuskan"];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc_(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function clean_(s, max) {
  return String(s || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

// ---------- 1. Pengunjung mengirim permintaan ----------
function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_request" });
  }

  // honeypot: field tersembunyi yang hanya diisi bot
  if (data.website) return json_({ ok: true });

  const name = clean_(data.name, 100);
  const email = clean_(data.email, 150).toLowerCase();
  const company = clean_(data.company, 150);
  const purpose = clean_(data.purpose, 500);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json_({ ok: false, error: "invalid" });
  }

  const cache = CacheService.getScriptCache();
  const count = Number(cache.get("count") || 0);
  if (count >= MAX_PER_HOUR) return json_({ ok: false, error: "rate_limited" });
  cache.put("count", String(count + 1), 3600);

  const id = Utilities.getUuid().slice(0, 8);
  const token = Utilities.getUuid().replace(/-/g, "");
  sheet_().appendRow([new Date(), id, token, name, email, company, purpose, "pending", ""]);

  const base = ScriptApp.getService().getUrl();
  const link = (action) => `${base}?action=${action}&id=${id}&t=${token}`;
  const btn = (href, label, bg) =>
    `<a href="${href}" style="display:inline-block;padding:12px 22px;margin-right:10px;border-radius:8px;background:${bg};color:#fff;text-decoration:none;font-weight:600">${label}</a>`;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: `Permintaan CV dari ${name}`,
    replyTo: email,
    htmlBody: `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#222;line-height:1.5">
        <p>Ada pengunjung website yang ingin mengunduh CV kamu:</p>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Nama</b></td><td>${esc_(name)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc_(email)}</td></tr>
          <tr><td><b>Perusahaan / Institusi</b></td><td>${esc_(company) || "-"}</td></tr>
          <tr><td><b>Keperluan</b></td><td>${esc_(purpose) || "-"}</td></tr>
        </table>
        <p style="margin-top:24px">
          ${btn(link("approve"), "Konfirmasi", "#1a7f37")}
          ${btn(link("reject"), "Tolak", "#c62828")}
        </p>
        <p style="color:#888;font-size:12px">ID permintaan: ${id}</p>
      </div>`,
  });

  return json_({ ok: true });
}

// ---------- 2. Halaman dari tombol di email ----------
function findRow_(id, token) {
  const sh = sheet_();
  const values = sh.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === id && values[i][2] === token) {
      return { sh, row: i + 1, name: values[i][3], email: values[i][4], status: values[i][7] };
    }
  }
  return null;
}

function page_(title, body) {
  return HtmlService.createHtmlOutput(
    `<div style="font-family:Arial,sans-serif;max-width:480px;margin:60px auto;padding:0 16px;color:#222">
       <h2>${title}</h2>${body}</div>`
  )
    .setTitle("Permintaan CV")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function doGet(e) {
  const p = e.parameter || {};
  if (!p.action || !p.id || !p.t) return page_("OK", "<p>Backend permintaan CV aktif.</p>");

  const r = findRow_(p.id, p.t);
  if (!r) return page_("Tidak ditemukan", "<p>Link tidak valid.</p>");
  if (r.status !== "pending") return page_("Sudah diproses", `<p>Permintaan ini sudah berstatus <b>${esc_(r.status)}</b>.</p>`);

  // Konfirmasi satu klik lagi di halaman ini, supaya pemindai link di email
  // (yang otomatis "membuka" link) tidak ikut menyetujui / menolak.
  const approve = p.action === "approve";
  const label = approve ? "Ya, kirim CV" : "Ya, tolak";
  const color = approve ? "#1a7f37" : "#c62828";
  return page_(
    approve ? "Kirim CV?" : "Tolak permintaan?",
    `<p><b>${esc_(r.name)}</b> &lt;${esc_(r.email)}&gt;</p>
     <button id="b" style="padding:12px 22px;border:0;border-radius:8px;background:${color};color:#fff;font-size:15px;font-weight:600;cursor:pointer">${label}</button>
     <p id="m"></p>
     <script>
       document.getElementById("b").onclick = function () {
         this.disabled = true;
         document.getElementById("m").textContent = "Memproses...";
         google.script.run
           .withSuccessHandler(function (msg) { document.getElementById("m").textContent = msg; })
           .withFailureHandler(function (err) { document.getElementById("m").textContent = "Gagal: " + err.message; })
           .decide(${JSON.stringify(p.id)}, ${JSON.stringify(p.t)}, ${JSON.stringify(p.action)});
       };
     </script>`
  );
}

// ---------- 3. Keputusan ----------
function decide(id, token, action) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const r = findRow_(id, token);
    if (!r) return "Link tidak valid.";
    if (r.status !== "pending") return "Permintaan ini sudah diproses (" + r.status + ").";

    if (action === "approve") {
      MailApp.sendEmail({
        to: r.email,
        subject: "CV Yahya Rafli Hidayah",
        replyTo: OWNER_EMAIL,
        htmlBody: `<p>Hi ${esc_(r.name)},</p>
          <p>Thank you for your interest. Please find my CV attached.</p>
          <p>Best regards,<br>Yahya Rafli Hidayah</p>`,
        attachments: [DriveApp.getFileById(CV_FILE_ID).getBlob()],
      });
      r.sh.getRange(r.row, 8, 1, 2).setValues([["approved", new Date()]]);
      return "CV sudah dikirim ke " + r.email + ".";
    }

    if (action === "reject") {
      MailApp.sendEmail({
        to: r.email,
        subject: "Your CV request",
        replyTo: OWNER_EMAIL,
        htmlBody: `<p>Hi ${esc_(r.name)},</p>
          <p>Thank you for your interest. Unfortunately I can't share my CV for this request.
          Feel free to reach me directly at ${OWNER_EMAIL}.</p>
          <p>Best regards,<br>Yahya Rafli Hidayah</p>`,
      });
      r.sh.getRange(r.row, 8, 1, 2).setValues([["rejected", new Date()]]);
      return "Permintaan ditolak dan pengunjung sudah diberi tahu.";
    }

    return "Aksi tidak dikenal.";
  } finally {
    lock.releaseLock();
  }
}
