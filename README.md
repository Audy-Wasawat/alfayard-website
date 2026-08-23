# เว็บไซต์ อัล ฟายาร์ด 1441

เว็บไซต์บริษัทนำเที่ยวฮัจญ์/อุมเราะห์ สร้างด้วย Next.js (App Router) + Supabase

## เริ่มพัฒนา (ในเครื่องตัวเอง)

```bash
npm install
cp .env.local.example .env.local   # แล้วใส่ค่า Supabase URL/anon key จริง
npm run dev
```

เปิด http://localhost:3000

## โครงสร้างสำคัญ

- `app/` — หน้าเว็บทั้งหมด (Next.js App Router)
- `components/` — ส่วนที่ใช้ซ้ำ (Header, Footer, การ์ดต่าง ๆ)
- `lib/data.js` — ฟังก์ชันดึงข้อมูลจาก Supabase ทั้งหมด
- `lib/images.js` — แปลง Google Drive file id เป็น URL รูปที่แสดงผลได้
- `lib/supabase.js` — ตัวเชื่อมต่อ Supabase (ฝั่งเซิร์ฟเวอร์เท่านั้น)

## ข้อมูลเว็บ

เนื้อหาทั้งหมด (บริการ, โปรโมชั่น, ผลงาน, ทีมงาน, FAQ, ข้อมูลบริษัท) ดึงจาก Supabase
โดยตรง แก้ไขได้ผ่าน Supabase Studio → Table Editor ไม่ต้องแก้โค้ดหรือ deploy ใหม่
(เว็บอัปเดตข้อมูลเองภายใน 60 วินาทีตามการตั้งค่า `revalidate`)

ข้อความที่อยู่ในวงเล็บเหลี่ยม เช่น `[เดือน ๒๕๖๘]` หรือ `[ตำแหน่ง]` คือเนื้อหา placeholder
ที่ยังไม่ได้ใส่ข้อมูลจริง — แก้ไขได้ที่ตาราง `promotions`, `portfolio_trips`,
`team_members`, `site_settings` ใน Supabase Studio

รูปทั้งหมดมาจาก Google Drive ผ่านสคริปต์ sync แยกต่างหาก (ดูโฟลเดอร์ `drive-sync/`
ในเครื่องที่ตั้งค่าไว้แล้ว) — เว็บนี้ไม่ต้องอัปโหลดรูปเอง

## Deploy

1. Push โค้ดนี้ขึ้น GitHub repo ของตัวเอง
2. เข้า https://vercel.com → New Project → Import จาก GitHub repo นี้
3. ตั้งค่า Environment Variables ใน Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   (ดูค่าจริงในไฟล์ `.env.local` ที่ใช้ตอนพัฒนา — **อย่า commit ไฟล์นี้ขึ้น GitHub**)
4. Deploy — เสร็จแล้วจะได้ URL ทดสอบจาก Vercel ก่อนค่อยผูกโดเมนจริงทีหลัง
