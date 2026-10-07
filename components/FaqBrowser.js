"use client";

import { useState } from "react";
import Link from "next/link";
import { IconLine } from "./icons";

export default function FaqBrowser({ categories, faqs, lineHref }) {
  const [active, setActive] = useState("all");

  // ซ่อนหมวดที่ยังไม่มีคำถาม
  const usedCats = categories.filter((c) => faqs.some((f) => f.category_id === c.id));
  const shown = active === "all" ? faqs : faqs.filter((f) => f.category_id === active);

  return (
    <>
      <aside className="aside sm col" style={{ gap: 14 }}>
        <h2 className="f17" style={{ fontFamily: "var(--font-sarabun)", fontWeight: 600 }}>
          หมวดคำถาม
        </h2>
        <div className="chips scroll" role="tablist" aria-label="หมวดคำถาม">
          {[{ id: "all", name: `ทั้งหมด (${faqs.length})` }, ...usedCats].map((c) => (
            <button
              type="button"
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              className={active === c.id ? "chip on" : "chip"}
              onClick={() => setActive(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="main faq-list">
        {shown.length === 0 ? (
          <p className="mute">ยังไม่มีคำถามในหมวดนี้</p>
        ) : (
          shown.map((f, i) => (
            // key รวม active เพื่อให้ข้อแรกกางใหม่ทุกครั้งที่เปลี่ยนหมวด
            <details key={`${active}-${f.id}`} className="qa" open={i === 0}>
              <summary className="q">
                <h3>{f.question}</h3>
              </summary>
              <div className="a">{f.answer}</div>
            </details>
          ))
        )}

        <div
          className="card row between stackm"
          style={{ gap: 20, padding: 28, background: "var(--teal-l)", border: 0, marginTop: 16, boxShadow: "none" }}
        >
          <div className="col" style={{ gap: 4 }}>
            <h3 className="f20">ไม่พบคำตอบที่ต้องการ?</h3>
            <p className="mute sm">ทักมาถามทาง LINE ได้เลย ทีมงานจะตอบกลับโดยเร็ว</p>
          </div>
          <div className="row wrap" style={{ gap: 10 }}>
            <a href={lineHref} className="btn line" target="_blank" rel="noopener noreferrer">
              <IconLine w={20} /> ถามเราทาง LINE
            </a>
            <Link href="/contact" className="btn out">
              ช่องทางอื่น
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
