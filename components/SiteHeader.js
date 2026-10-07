import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data";
import { lineUrl, telHref } from "@/lib/site";
import { IconPhone, IconLine, IconShield } from "./icons";
import Nav from "./Nav";
import LineFab from "./LineFab";

export default async function SiteHeader() {
  const s = await getSiteSettings();
  const phone = s?.phone;

  return (
    <>
      <a href="#main" className="skip">ข้ามไปยังเนื้อหา</a>
      <div className="topbar">
        <div className="wrapx">
          <span className="tb-l">
            <IconShield w={14} />
            ใบอนุญาตนำเที่ยวเลขที่ {s?.license_number || "—"}
            {s?.hajj_license_number ? ` · ใบอนุญาตฮัจญ์เลขที่ ${s.hajj_license_number}` : ""}
          </span>
          <span className="tb-r">
            {phone && (
              <a href={telHref(phone)}>
                <IconPhone w={14} /> {phone}
              </a>
            )}
            <a href={lineUrl()} target="_blank" rel="noopener noreferrer">
              <IconLine w={15} /> LINE{s?.line_id ? ` ${s.line_id}` : ""}
            </a>
          </span>
        </div>
      </div>
      <header className="head">
        <div className="wrapx">
          <Link href="/" className="brand" aria-label="อัล ฟายาร์ด 1441 — หน้าแรก">
            <Image
              src="/logo-full.png"
              alt=""
              width={52}
              height={52}
              priority
            />
            <div>
              <b>อัล ฟายาร์ด 1441</b>
              <span>AL FAYARD 1441 CO., LTD.</span>
            </div>
          </Link>
          <Nav lineHref={lineUrl()} phoneHref={telHref(phone)} />
        </div>
      </header>
      <LineFab href={lineUrl()} />
    </>
  );
}
