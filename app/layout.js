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
  weight: ["400", "600"],
  display: "swap",
});

export const metadata = {
  title: "อัล ฟายาร์ด 1441 | บริษัทนำเที่ยวฮัจญ์และอุมเราะห์",
  description:
    "บริษัท อัล ฟายาร์ด 1441 จำกัด ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์ โดยทีมงานที่เดินทางไปกับคุณตลอดทริป",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${trirong.variable} ${sarabun.variable}`}>
      <body>{children}</body>
    </html>
  );
}
