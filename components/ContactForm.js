"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/app/contact/actions";

const initialState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialState
  );

  return (
    <form action={formAction} className="card col" style={{ padding: 30, gap: 18 }}>
      <div className="col" style={{ gap: 6 }}>
        <h2 className="f23">ฝากข้อความไว้ เดี๋ยวเราติดต่อกลับ</h2>
        <p className="mute sm">
          ถ้าไม่สะดวกใช้ LINE กรอกฟอร์มนี้ไว้ได้ เราจะติดต่อกลับตามเบอร์ที่ให้ไว้
        </p>
      </div>

      <div className="g2" style={{ gap: 16 }}>
        <div className="field">
          <label htmlFor="name">ชื่อ–สกุล</label>
          <input className="inp" id="name" name="name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="phone">เบอร์โทร</label>
          <input className="inp" id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="subject">เรื่องที่ต้องการสอบถาม</label>
        <input className="inp" id="subject" name="subject" type="text" />
      </div>

      <div className="field">
        <label htmlFor="message">ข้อความ</label>
        <textarea className="inp ta" id="message" name="message" required />
      </div>

      {state.status === "ok" && <div className="formnote ok">{state.message}</div>}
      {state.status === "error" && <div className="formnote err">{state.message}</div>}

      <button
        type="submit"
        className="btn"
        style={{ alignSelf: "flex-start" }}
        disabled={pending}
      >
        {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </button>
    </form>
  );
}
