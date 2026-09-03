import { driveImageUrl } from "@/lib/images";

// กล่องรูปเดียวใช้ทั้งเว็บ: ถ้ามี driveId แสดงรูปจริงจาก Google Drive thumbnail endpoint
// ถ้าไม่มี (ยังไม่ได้ sync รูป) แสดงกล่องสีพื้นเป็น placeholder เหมือนตอนออกแบบ
export default function ImageBox({
  driveId,
  src: localSrc,
  width = 800,
  className = "",
  label = "รูป",
  eager = false,
  style,
}) {
  const src = localSrc || driveImageUrl(driveId, width);
  return (
    <div className={`img ${className}`} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} loading={eager ? "eager" : "lazy"} />
      ) : (
        label
      )}
    </div>
  );
}
