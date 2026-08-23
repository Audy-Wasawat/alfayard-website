import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { Star } from "./icons";
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
            <div className="mark">
              <Star size={24} color="#C0904F" />
            </div>
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
