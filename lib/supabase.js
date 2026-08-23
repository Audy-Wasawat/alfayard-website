import { createClient } from "@supabase/supabase-js";

// ใช้ฝั่ง Server Component / Server Action เท่านั้น (ไม่มี NEXT_PUBLIC_ prefix)
// คีย์ที่ใช้คือ publishable/anon key — อ่านข้อมูลสาธารณะได้อย่างเดียวตาม RLS
// ไม่ใช่ความลับ แต่ยังคงเก็บไว้ฝั่งเซิร์ฟเวอร์เพื่อความเรียบร้อย
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "ไม่พบ SUPABASE_URL หรือ SUPABASE_ANON_KEY — ตรวจไฟล์ .env.local"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      // ผูกกับ Next.js Data Cache: cache ผลลัพธ์ไว้ 60 วินาที (ISR-style)
      // เพื่อให้แก้ข้อมูลใน Supabase แล้วเว็บอัปเดตเองโดยไม่ต้อง redeploy
      fetch: (url, options = {}) =>
        fetch(url, { ...options, next: { revalidate: 60 } }),
    },
  });
}
