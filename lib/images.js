// Google Drive เป็นที่เก็บรูปเดียวของเว็บนี้ — Supabase เก็บแค่ drive file id (ข้อความ)
// ใช้ endpoint thumbnail ของ Drive ย่อขนาดให้ตามที่ขอ ไม่ต้องมี proxy/cache ของเราเอง
// อ่านหลักการเต็มได้ที่เอกสารโปรเจกต์ claude/drive-sync-design.md
export function driveImageUrl(driveId, width = 800) {
  if (!driveId) return null;
  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`;
}

// กติกาประสิทธิภาพสำหรับแกลเลอรีที่มีรูปเยอะ (ตัดสินใจ 2026-08-23):
// รูปในกริดใช้ธัมบ์เนลเล็ก + lazy-load, รูปเต็มขนาดใหญ่โหลดเฉพาะตอนเปิด lightbox
export const GRID_WIDTH = 400;
export const LIGHTBOX_WIDTH = 1600;
