"use server";

import { createServerClient } from "@/lib/supabase";

export async function submitContactMessage(prevState, formData) {
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
