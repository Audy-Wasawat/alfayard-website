// พร็อกซีรูปจาก Google Drive ผ่านโดเมนเว็บเราเอง + cache บน CDN ของ Vercel
// เบราว์เซอร์โหลดรูปจากเว็บเรา ไม่ยิงตรงไป Google Drive จึงไม่โดน Drive throttle
// รูปต้นฉบับยังอยู่บน Google Drive เหมือนเดิม (route นี้แค่ดึงมาแล้ว cache ต่อ)
//
// ใช้งาน: /api/img?id=<drive_file_id>&w=<ความกว้าง>

export const runtime = "nodejs";
// กันไม่ให้ Next พยายาม prerender ตอน build — เป็น dynamic route ที่ดึงรูปตอน request
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const wRaw = parseInt(searchParams.get("w") || "800", 10);
  const width = Math.min(Math.max(Number.isFinite(wRaw) ? wRaw : 800, 32), 2000);

  // รับเฉพาะ Drive file id ที่เป็นตัวอักษร/ตัวเลข/-/_ เท่านั้น (กัน SSRF)
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return new Response("bad request", { status: 400 });
  }

  const driveUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

  try {
    const upstream = await fetch(driveUrl, { redirect: "follow" });
    const contentType = upstream.headers.get("content-type") || "";

    // ถ้า Drive คืน HTML (หน้าขอสิทธิ์/error) หรือสถานะไม่โอเค = ถือว่าโหลดรูปไม่ได้
    if (!upstream.ok || contentType.includes("text/html")) {
      return new Response("upstream error", { status: 502 });
    }

    const buf = await upstream.arrayBuffer();

    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType || "image/jpeg",
        // เบราว์เซอร์ cache 1 วัน, CDN ของ Vercel cache 1 ปี (ดึงจาก Drive แค่ครั้งเดียวต่อรูป)
        "Cache-Control":
          "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("fetch failed", { status: 502 });
  }
}
