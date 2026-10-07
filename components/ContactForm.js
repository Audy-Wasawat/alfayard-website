"use client";

import { useActionState, useState } from "react";
import { submitContactMessage } from "@/app/contact/actions";
import { IconCheck, IconInfo } from "./icons";

const initialState = { status: "idle", message: "" };
const EMPTY = { name: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);
  // controlled inputs: ถ้าส่งไม่สำเร็จ ข้อความที่พิมพ์ไว้ไม่หาย
  const [v, setV] = useState(EMPTY);
  const on = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  // ส่งสำเร็จ → ล้างฟอร์ม
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.status === "ok") setV(EMPTY);
  }

  return (
    <form action={formAction} className="card col" style={{ padding: 32, gap: 18 }}>
      <div className="col" style={{ gap: 6 }}>
        <h2 className="f23">ฝากข้อความไว้ เดี๋ยวเราติดต่อกลับ</h2>
        <p className="mute sm">ถ้าไม่สะดวกใช้ LINE กรอกฟอร์มนี้ไว้ได้ เราจะติดต่อกลับตามเบอร์ที่ให้ไว้</p>
      </div>

      <div className="g2" style={{ gap: 16 }}>
        <div className="field">
          <label htmlFor="name">ชื่อ–สกุล</label>
          <input className="inp" id="name" name="name" type="text" autoComplete="name"
                 required maxLength={100} value={v.name} onChange={on("name")} />
        </div>
        <div className="field">
          <label htmlFor="phone">เบอร์โทร</label>
          <input className="inp" id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
                 required maxLength={20} pattern="[0-9+\-\s]{9,20}" title="กรอกเบอร์โทร 9–10 หลัก"
                 placeholder="08x-xxx-xxxx" value={v.phone} onChange={on("phone")} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject">เรื่องที่ต้องการสอบถาม <span className="opt">(ไม่บังคับ)</span></label>
        <input className="inp" id="subject" name="subject" type="text" maxLength={150}
               placeholder="เช่น อุมเราะห์รอบปิดเทอม, ยื่นวีซ่า" value={v.subject} onChange={on("subject")} />
      </div>

      <div className="field">
        <label htmlFor="message">ข้อความ</label>
        <textarea className="inp ta" id="message" name="message" required maxLength={2000}
                  value={v.message} onChange={on("message")} />
      </div>

      {/* กันบอทสแปม: ช่องนี้มองไม่เห็นสำหรับคน ถ้ามีค่าแปลว่าบอทกรอก */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">เว็บไซต์</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {state.status === "ok" && (
          <div className="formnote ok"><IconCheck w={16} /> {state.message}</div>
        )}
        {state.status === "error" && (
          <div className="formnote err"><IconInfo w={18} /> {state.message}</div>
        )}
      </div>

      <button type="submit" className="btn" style={{ alignSelf: "flex-start" }} disabled={pending}>
        {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </button>
    </form>
  );
}
