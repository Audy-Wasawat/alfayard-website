import { Trirong, Sarabun } from "next/font/google";
import "./globals.css";

const trirong = Trirong({
  variable: "--font-trirong",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://alfayard-website.vercel.app"; // เปลี่ยนเป็นโดเมนจริงเมื่อจดโดเมนแล้ว
const DESCRIPTION =
  "บริษัท อัล ฟายาร์ด 1441 จำกัด ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์ โดยทีมงานที่เดินทางไปกับคุณตลอดทริป";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "อัล ฟายาร์ด 1441 | บริษัทนำเที่ยวฮัจญ์และอุมเราะห์",
  description: DESCRIPTION,
  // ข้อมูลที่แสดงตอนแชร์ลิงก์ใน LINE / Facebook
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "อัล ฟายาร์ด 1441",
    title: "อัล ฟายาร์ด 1441 | บริษัทนำเที่ยวฮัจญ์และอุมเราะห์",
    description: DESCRIPTION,
    images: [{ url: "/hero.png", alt: "อัล ฟายาร์ด 1441 — ฮัจญ์และอุมเราะห์" }],
  },
};

export const viewport = {
  themeColor: "#0C3F4D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${trirong.variable} ${sarabun.variable}`}>
      <body>{children}</body>
    </html>
  );
}
