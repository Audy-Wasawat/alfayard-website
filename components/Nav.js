"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconBurger } from "./icons";

const NAV = [
  ["หน้าแรก", "/"],
  ["เกี่ยวกับเรา", "/about"],
  ["บริการ", "/services"],
  ["โปรโมชั่น", "/promotions"],
  ["ผลงานที่ผ่านมา", "/portfolio"],
  ["คำถามที่พบบ่อย", "/faq"],
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isOn = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="mainnav">
        {NAV.map(([label, href]) => (
          <Link key={href} href={href} className={isOn(href) ? "on" : ""}>
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/contact" className="btn solid">
        ติดต่อเรา
      </Link>
      <button
        type="button"
        className="burger"
        aria-label="เปิดเมนู"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <IconBurger />
      </button>
      <div className={`mobilenav${open ? " open" : ""}`}>
        {NAV.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={isOn(href) ? "on" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" className="btn" onClick={() => setOpen(false)}>
          ติดต่อเรา
        </Link>
      </div>
    </>
  );
}
