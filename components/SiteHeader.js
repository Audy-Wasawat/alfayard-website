import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data";
import Nav from "./Nav";

export default async function SiteHeader() {
  const s = await getSiteSettings();

  return (
    <>
      <div className="topbar">
        <div className="wrapx">
          <span>
            ใบอนุญาตประกอบธุรกิจนำเที่ยวเลขที่{" "}
            {s?.license_number || "[เลขที่ใบอนุญาต]"}
          </span>
          <span>
            โทร {s?.phone || "[0X-XXX-XXXX]"} · LINE @
            {s?.line_id || "[line-id]"}
          </span>
        </div>
      </div>
      <header className="head">
        <div className="wrapx">
          <Link href="/" className="brand">
            <Image
              src="/logo-symbol.png"
              alt="โลโก้ อัล ฟายาร์ด 1441"
              width={46}
              height={46}
              priority
              style={{ flexShrink: 0 }}
            />
            <div>
              <b>อัล ฟายาร์ด 1441</b>
              <span>AL FAYARD 1441 CO., LTD.</span>
            </div>
          </Link>
          <Nav />
        </div>
      </header>
    </>
  );
}
