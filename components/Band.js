import Link from "next/link";
import { Star, IconLine, IconArrow } from "./icons";
import { lineUrl } from "@/lib/site";

// แถบ CTA ท้ายทุกหน้า
// - line=true → ปุ่มเปิด LINE โดยตรง
// - btnHref → ปุ่มลิงก์ภายในเว็บ
// - alt=true → พื้นหลังส่วนนอกเป็นสีเทาอ่อน (ใช้เมื่อ section ก่อนหน้าเป็น .alt)
export default function Band({ title, lead, btnLabel, btnHref, line = false, alt = false }) {
  return (
    <section className={`band-wrap${alt ? " alt" : ""}`}>
      <div className="wrapx">
        <div className="band">
          <div className="motif">
            <Star size={340} color="#ffffff" />
          </div>
          <div className="inner">
            <div className="col" style={{ gap: 8, maxWidth: 640 }}>
              <h2>{title}</h2>
              {lead && <p>{lead}</p>}
            </div>
            <div className="acts">
              {line ? (
                <a href={lineUrl()} className="btn line" target="_blank" rel="noopener noreferrer">
                  <IconLine w={22} /> {btnLabel || "แชทกับเราทาง LINE"}
                </a>
              ) : (
                <Link href={btnHref || "/contact"} className="btn">
                  {btnLabel} <IconArrow />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
