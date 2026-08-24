"use client";

import { useState } from "react";
import { IconMinus, IconPlus } from "./icons";

export default function FaqBrowser({ categories, faqs }) {
  const [active, setActive] = useState("all");

  const shown =
    active === "all" ? faqs : faqs.filter((f) => f.category_id === active);

  return (
    <>
      <aside className="aside sm col" style={{ gap: 14 }}>
        <h3 className="f17">หมวดคำถาม</h3>
        <div className="col wrap" style={{ gap: 10 }}>
          <button
            type="button"
            className={active === "all" ? "chip on" : "chip"}
            onClick={() => setActive("all")}
          >
            ทั้งหมด
          </button>
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              className={active === c.id ? "chip on" : "chip"}
              onClick={() => setActive(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="main acc">
        {shown.length === 0 ? (
          <p className="mute">ยังไม่มีคำถามในหมวดนี้</p>
        ) : (
          shown.map((f, i) => (
            <details key={f.id} className="qa" open={i === 0}>
              <summary className="q">
                <h3>{f.question}</h3>
                <span className="ic-plus">
                  <IconPlus />
                </span>
                <span className="ic-minus">
                  <IconMinus />
                </span>
              </summary>
              <div className="a">{f.answer}</div>
            </details>
          ))
        )}

        <div
          className="card row between stackm"
          style={{ gap: 22, padding: 26, background: "var(--paper2)", marginTop: 18 }}
        >
          <div className="col" style={{ gap: 6 }}>
            <h3 className="f20">ไม่พบคำตอบที่ต้องการ?</h3>
            <p className="mute sm">ทางเราจะตอบกลับโดยเร็ว</p>
          </div>
          <a href="/contact" className="btn">
            ถามเราทาง LINE
          </a>
        </div>
      </div>
    </>
  );
}
