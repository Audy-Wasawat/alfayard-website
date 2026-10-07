// ลิงก์ติดต่อที่ใช้ทั้งเว็บ
// LINE: ลิงก์เดียวกับ QR code ใน public/line-qr.png
export const LINE_URL = "https://line.me/ti/p/HXIgSFkPrC";

export function lineUrl() {
  return LINE_URL;
}

// "087-894-7395" → "tel:0878947395"
export function telHref(phone) {
  if (!phone) return null;
  return `tel:${String(phone).replace(/[^\d+]/g, "")}`;
}

export function mailHref(email) {
  return email ? `mailto:${email}` : null;
}

export const SITE_NAME = "อัล ฟายาร์ด 1441";
