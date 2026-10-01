"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// URL Web App Google Apps Script (backend/cv-request.gs), berakhiran /exec.
// Lihat README.md bagian "Permintaan CV".
export const CV_ENDPOINT = "https://script.google.com/macros/s/AKfycbxTxh26rZfES_cprpUqVlheZDg9CA74D_7nm0RoI8vsjTPpyyJKY2eob4eOZXmyng-o/exec";

const empty = { name: "", email: "", company: "", purpose: "", website: "" };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function CvRequest() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [state, setState] = useState("idle"); // idle | sending | leaving | sent | error

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setState("sending");
    let ok = false;
    try {
      // text/plain supaya browser tidak mengirim preflight CORS ke Apps Script.
      // Tunggu minimal 1,3 dtk supaya animasi truk & paket sempat selesai.
      const [data] = await Promise.all([
        fetch(CV_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(form),
        }).then((res) => res.json()),
        wait(1300),
      ]);
      ok = data.ok;
    } catch {}
    if (!ok) return setState("error");
    setState("leaving"); // truk melaju keluar
    await wait(1300);
    setState("sent");
  }

  function close() {
    setOpen(false);
    if (state === "sent") {
      setForm(empty);
      setState("idle");
    }
  }

  return (
    <>
      <button className="cv-btn" onClick={() => setOpen(true)}>
        Request my CV ↓
      </button>

      {open && createPortal(
        <div className="cv-overlay" onClick={close}>
          <div className="cv-modal" role="dialog" aria-modal="true" aria-labelledby="cv-title" onClick={(e) => e.stopPropagation()}>
            <button className="cv-x mono" onClick={close} aria-label="Close">
              ✕
            </button>

            {state === "sent" ? (
              <>
                <h3 id="cv-title">Request sent.</h3>
                <p className="sm">
                  Thanks, {form.name.split(" ")[0]}. I'll review your request and the CV will be emailed to{" "}
                  <b>{form.email}</b> once approved.
                </p>
              </>
            ) : (
              <form onSubmit={submit}>
                <h3 id="cv-title">Request my CV</h3>
                <p className="sm">Leave your details. I'll review the request and send my CV to your email.</p>

                <label className="mono">
                  Name *
                  <input required maxLength={100} value={form.name} onChange={set("name")} autoComplete="name" />
                </label>
                <label className="mono">
                  Email *
                  <input required type="email" maxLength={150} value={form.email} onChange={set("email")} autoComplete="email" />
                </label>
                <label className="mono">
                  Company / Institution
                  <input maxLength={150} value={form.company} onChange={set("company")} autoComplete="organization" />
                </label>
                <label className="mono">
                  Purpose
                  <textarea rows={3} maxLength={500} value={form.purpose} onChange={set("purpose")} placeholder="e.g. hiring for a QA role" />
                </label>
                {/* honeypot anti-bot: disembunyikan dari manusia */}
                <input className="cv-hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} aria-hidden="true" />

                {state === "error" && (
                  <p className="cv-err">Something went wrong. Please try again, or email me directly.</p>
                )}
                <button className={`cv-send truck-btn mono ${state}`} disabled={state === "sending" || state === "leaving"}>
                  <span className="road" />
                  <span className="truck" aria-hidden="true">
                    <span className="bed" /><span className="cab" /><span className="pkg" />
                  </span>
                  <span className="lbl">Send request →</span>
                  <span className="done">Request sent ✓</span>
                  <span className="cv-hp" role="status">{state === "sending" ? "Sending…" : ""}</span>
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
