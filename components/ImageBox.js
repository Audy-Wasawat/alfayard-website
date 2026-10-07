import { driveImageUrl } from "@/lib/images";

// กล่องรูปเดียวใช้ทั้งเว็บ: ถ้ามี driveId แสดงรูปจริง (ผ่าน /api/img) ถ้าไม่มีแสดงกล่องสีพื้นแทน
// children = ของที่วางซ้อนบนรูป (เช่น ป้ายสถานะบนโปสเตอร์)
export default function ImageBox({
  driveId,
  src: localSrc,
  width = 800,
  className = "",
  label = "รูป",
  eager = false,
  style,
  children,
}) {
  const src = localSrc || driveImageUrl(driveId, width);
  return (
    <div className={`img ${className}`} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : undefined}
        />
      ) : (
        <span>{label}</span>
      )}
      {children}
    </div>
  );
}
