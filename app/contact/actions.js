"use server";

import { createServerClient } from "@/lib/supabase";

// ความยาวสูงสุดของแต่ละช่อง (กันข้อความยาวผิดปกติ/สแปมยัดข้อมูลเข้าฐานข้อมูล)
const LIMITS = { name: 100, phone: 20, subject: 150, message: 2000 };

export async function submitContactMessage(prevState, formData) {
  // honeypot: ช่องที่ซ่อนจากคน — ถ้ามีค่าแปลว่าเป็นบอท ตอบเหมือนสำเร็จแต่ไม่บันทึก
  if (formData.get("website")?.toString().trim()) {
    return {
      status: "ok",
      message: "ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับตามเบอร์ที่ให้ไว้เร็ว ๆ นี้",
    };
  }

  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !phone || !message) {
    return {
      status: "error",
      message: "กรุณากรอกชื่อ–สกุล เบอร์โทร และข้อความให้ครบก่อนส่ง",
    };
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) {
    return { status: "error", message: "เบอร์โทรดูไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" };
  }

  if (
    name.length > LIMITS.name ||
    phone.length > LIMITS.phone ||
    (subject && subject.length > LIMITS.subject) ||
    message.length > LIMITS.message
  ) {
    return { status: "error", message: "ข้อความยาวเกินไป กรุณาย่อให้สั้นลง" };
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    phone,
    subject: subject || null,
    message,
  });

  if (error) {
    return {
      status: "error",
      message: "ส่งข้อความไม่สำเร็จ ลองใหม่อีกครั้ง หรือทักทาง LINE แทนได้เลย",
    };
  }

  return {
    status: "ok",
    message: "ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับตามเบอร์ที่ให้ไว้เร็ว ๆ นี้",
  };
}
