// Google Drive เป็นที่เก็บรูปของเว็บนี้ — Supabase เก็บแค่ drive file id (ข้อความ)
// แต่ไม่ให้เบราว์เซอร์ดึงจาก Drive ตรง ๆ (โดน Drive throttle รูปหลุดบ่อย) — วิ่งผ่าน
// route ของเราเอง /api/img ที่ดึงจาก Drive มา cache บน CDN ของ Vercel แล้วเสิร์ฟต่อ
// อ่านหลักการเต็มได้ที่เอกสารโปรเจกต์ claude/drive-sync-design.md
export function driveImageUrl(driveId, width = 800) {
  if (!driveId) return null;
  return `/api/img?id=${encodeURIComponent(driveId)}&w=${width}`;
}

// กติกาประสิทธิภาพสำหรับแกลเลอรีที่มีรูปเยอะ (ตัดสินใจ 2026-08-23):
// รูปในกริดใช้ธัมบ์เนลเล็ก + lazy-load, รูปเต็มขนาดใหญ่โหลดเฉพาะตอนเปิด lightbox
export const GRID_WIDTH = 400;
export const LIGHTBOX_WIDTH = 1600;
