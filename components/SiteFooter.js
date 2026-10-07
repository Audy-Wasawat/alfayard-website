import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data";
import { lineUrl, telHref, mailHref } from "@/lib/site";
import { IconPhone, IconMail, IconPin, IconClock, IconLine, IconFacebook } from "./icons";

export default async function SiteFooter() {
  const s = await getSiteSettings();
  const thaiYear = new Date().getFullYear() + 543;

  return (
    <footer>
      <div className="wrapx">
        <div className="fmain">
          <div className="col" style={{ gap: 18 }}>
            <Link href="/" className="brand">
              <Image src="/logo-full.png" alt="" width={56} height={56} />
              <div>
                <b style={{ color: "#fff" }}>อัล ฟายาร์ด 1441</b>
                <span style={{ color: "rgba(255,255,255,.5)" }}>AL FAYARD 1441 CO., LTD.</span>
              </div>
            </Link>
            <p style={{ maxWidth: "26em" }}>
              บริษัทนำเที่ยวที่ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์
              ดูแลโดยทีมงานที่เดินทางไปกับคุณตลอดทริป
            </p>
            <div className="social">
              <a href={lineUrl()} target="_blank" rel="noopener noreferrer" aria-label="LINE">
                <IconLine w={20} />
              </a>
              {s?.facebook_url && (
                <a href={s.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <IconFacebook w={20} />
                </a>
              )}
              {s?.phone && (
                <a href={telHref(s.phone)} aria-label={`โทร ${s.phone}`}>
                  <IconPhone w={17} />
                </a>
              )}
            </div>
          </div>

          <div className="col" style={{ gap: 14 }}>
            <h4>เมนู</h4>
            <ul className="col" style={{ gap: 10 }}>
              <li><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li><Link href="/services">บริการ</Link></li>
              <li><Link href="/promotions">โปรโมชั่น</Link></li>
              <li><Link href="/portfolio">ผลงานที่ผ่านมา</Link></li>
            </ul>
          </div>

          <div className="col" style={{ gap: 14 }}>
            <h4>ช่วยเหลือ</h4>
            <ul className="col" style={{ gap: 10 }}>
              <li><Link href="/faq">คำถามที่พบบ่อย</Link></li>
              <li><Link href="/contact">ติดต่อเรา</Link></li>
            </ul>
          </div>

          <div className="col" style={{ gap: 14 }}>
            <h4>ติดต่อ</h4>
            <ul className="col fcontact" style={{ gap: 10 }}>
              {s?.phone && (
                <li><IconPhone w={15} /><a href={telHref(s.phone)}>{s.phone}</a></li>
              )}
              <li>
                <IconLine w={16} />
                <a href={lineUrl()} target="_blank" rel="noopener noreferrer">
                  LINE ID: {s?.line_id || "—"}
                </a>
              </li>
              {s?.email && (
                <li><IconMail w={15} /><a href={mailHref(s.email)}>{s.email}</a></li>
              )}
              {s?.business_hours && (
                <li><IconClock w={15} /><span>{s.business_hours}</span></li>
              )}
              {s?.address && (
                <li><IconPin w={15} /><span>{s.address}</span></li>
              )}
            </ul>
          </div>
        </div>

        <div className="fbot">
          <span>© {thaiYear} บริษัท อัล ฟายาร์ด 1441 จำกัด</span>
          <span>
            ใบอนุญาตนำเที่ยวเลขที่ {s?.license_number || "—"}
            {s?.hajj_license_number ? ` · ใบอนุญาตฮัจญ์เลขที่ ${s.hajj_license_number}` : ""}
          </span>
        </div>
      </div>
    </footer>
  );
}
