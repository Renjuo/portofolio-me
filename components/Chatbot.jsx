"use client";
import { useState, useRef, useEffect } from "react";
import { answer, getUi } from "../lib/chatbot";
import { LANGS } from "../data/translations";

// warna mengikuti tema siang/malam (variabel CSS di globals.css)
const C = {
  bg: "var(--bg)",
  panel: "var(--card)",
  line: "var(--line)",
  text: "var(--fg)",
  muted: "var(--mut)",
  accent: "var(--acc)",
};

// wajah creeper 8x8: 1 = hitam, sisanya tekstur hijau berbintik
const FACE = ["00000000", "00000000", "01100110", "01100110", "00011000", "00111100", "00111100", "00100100"];
const GREENS = ["#5fbf4a", "#4ea83c", "#6fd35a", "#3f8f31", "#7ee36a"];
const Creeper = () => (
  <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
    {FACE.flatMap((row, y) =>
      [...row].map((v, x) => (
        <rect key={`${x}${y}`} x={x} y={y} width="1" height="1" fill={v === "1" ? "#151515" : GREENS[(x * 7 + y * 13 + x * y) % GREENS.length]} />
      ))
    )}
  </svg>
);
const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState("id");
  const ui = getUi(lang);
  const [msgs, setMsgs] = useState([{ from: "bot", text: getUi("id").sapaan }]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  function send(text) {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const r = answer(q, lang);
      setLang(r.lang); // ikut bahasa yang dipakai pengunjung
      setMsgs((m) => [...m, { from: "bot", text: r.text }]);
      setTyping(false);
    }, 450);
  }

  function switchLang(code) {
    if (code === lang) return;
    setLang(code);
    const sapaan = getUi(code).sapaan;
    // belum ada percakapan: ganti sapaan; kalau sudah ada, tambahkan sapaan baru
    setMsgs((m) => (m.length === 1 ? [{ from: "bot", text: sapaan }] : [...m, { from: "bot", text: sapaan }]));
  }

  const bubble = (from) => ({
    alignSelf: from === "user" ? "flex-end" : "flex-start",
    maxWidth: "85%",
    padding: "9px 12px",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    background: from === "user" ? C.accent : C.panel,
    color: from === "user" ? C.bg : C.text,
    border: from === "user" ? "none" : `1px solid ${C.line}`,
  });

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 9999, fontFamily: mono }}>
      {open && (
        <div
          style={{
            width: "min(360px, calc(100vw - 40px))",
            height: "min(520px, calc(100vh - 110px))",
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            background: C.bg,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,.35)",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${C.line}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: C.text,
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            <span>
              <span style={{ color: C.accent }}>●</span> {ui.namaBot}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto", marginRight: 8 }}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLang(l.code)}
                  aria-pressed={lang === l.code}
                  style={{
                    background: "none",
                    border: 0,
                    padding: "2px 5px",
                    cursor: "pointer",
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: lang === l.code ? C.accent : C.muted,
                  }}
                >
                  {l.label}
                </button>
              ))}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              style={{ background: "none", border: 0, color: C.muted, cursor: "pointer", fontSize: 18 }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={bubble(m.from)}>{m.text}</div>
            ))}
            {typing && <div style={{ ...bubble("bot"), color: C.muted }}>...</div>}
            {msgs.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ui.saran.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      background: "none",
                      border: `1px solid ${C.line}`,
                      color: C.muted,
                      borderRadius: 999,
                      padding: "5px 10px",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: mono,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ display: "flex", borderTop: `1px solid ${C.line}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={ui.placeholder}
              style={{
                flex: 1,
                background: "transparent",
                border: 0,
                outline: "none",
                color: C.text,
                padding: "14px 16px",
                fontSize: 14,
                fontFamily: mono,
              }}
            />
            <button
              onClick={() => send()}
              style={{
                background: "none",
                border: 0,
                color: C.accent,
                padding: "0 16px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: mono,
              }}
            >
              {ui.kirim}
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="creeper" onClick={() => setOpen((o) => !o)} aria-label={open ? "Tutup chat" : "Buka chat"} aria-expanded={open}>
          <Creeper />
        </button>
      </div>
    </div>
  );
}
