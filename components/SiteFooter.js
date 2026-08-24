import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data";

export default async function SiteFooter() {
  const s = await getSiteSettings();
  const thaiYear = new Date().getFullYear() + 543;

  return (
    <footer>
      <div className="wrapx">
        <div className="fmain">
          <div className="col" style={{ gap: 14 }}>
            <div className="brand">
              <Image
                src="/logo-symbol.png"
                alt="โลโก้ อัล ฟายาร์ด 1441"
                width={44}
                height={44}
                style={{ flexShrink: 0 }}
              />
              <div>
                <b style={{ color: "#fff" }}>อัล ฟายาร์ด 1441</b>
                <span style={{ color: "rgba(255,255,255,.45)" }}>
                  AL FAYARD 1441 CO., LTD.
                </span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,.66)", fontSize: 14.5, maxWidth: "26em" }}>
              บริษัทนำเที่ยวที่ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์
              ดูแลโดยทีมงานที่เดินทางไปกับคุณตลอดทริป
            </p>
          </div>

          <div className="col" style={{ gap: 12 }}>
            <h4>เมนู</h4>
            <ul className="col" style={{ gap: 9 }}>
              <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li><Link href="/services">บริการ</Link></li>
              <li><Link href="/promotions">โปรโมชั่น</Link></li>
              <li><Link href="/portfolio">ผลงานที่ผ่านมา</Link></li>
            </ul>
          </div>

          <div className="col" style={{ gap: 12 }}>
            <h4>ช่วยเหลือ</h4>
            <ul className="col" style={{ gap: 9 }}>
              <li><Link href="/faq">คำถามที่พบบ่อย</Link></li>
              <li><Link href="/contact">ติดต่อเรา</Link></li>
            </ul>
          </div>

          <div className="col" style={{ gap: 12 }}>
            <h4>ติดต่อ</h4>
            <ul className="col" style={{ gap: 9 }}>
              <li>โทร {s?.phone || "[0X-XXX-XXXX]"}</li>
              <li>LINE @{s?.line_id || "[line-id]"}</li>
              <li>{s?.email || "[อีเมลบริษัท]"}</li>
              <li style={{ color: "rgba(255,255,255,.5)", fontSize: 13.5, paddingTop: 4 }}>
                {s?.address || "[ที่อยู่สำนักงาน]"}
              </li>
            </ul>
          </div>
        </div>

        <div className="fbot">
          <span>© {thaiYear} บริษัท อัล ฟายาร์ด 1441 จำกัด</span>
          <span>
            ใบอนุญาตประกอบธุรกิจนำเที่ยวเลขที่{" "}
            {s?.license_number || "[เลขที่ใบอนุญาต]"}
          </span>
        </div>
      </div>
    </footer>
  );
}
