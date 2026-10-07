"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconBurger, IconClose, IconChevronR, IconLine, IconPhone } from "./icons";

const NAV = [
  ["หน้าแรก", "/"],
  ["เกี่ยวกับเรา", "/about"],
  ["บริการ", "/services"],
  ["โปรโมชั่น", "/promotions"],
  ["ผลงานที่ผ่านมา", "/portfolio"],
  ["คำถามที่พบบ่อย", "/faq"],
];

export default function Nav({ lineHref, phoneHref }) {
  const pathname = usePathname();
  // เก็บ path ที่เปิดเมนูไว้ — เปลี่ยนหน้าแล้วเมนูปิดเอง
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === pathname;
  const setOpen = (v) =>
    setOpenAt((cur) => {
      const next = typeof v === "function" ? v(cur === pathname) : v;
      return next ? pathname : null;
    });

  const isOn = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // กด Esc ปิดเมนู + ล็อกการเลื่อนหน้าขณะเมนูเปิด
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    // แตะนอกแถบเมนู (นอก header) = ปิดเมนู
    const onDown = (e) => {
      if (!e.target.closest(".head")) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      document.body.style.overflow = prev;
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <nav className="mainnav" aria-label="เมนูหลัก">
        {NAV.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={isOn(href) ? "on" : ""}
            aria-current={isOn(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="head-cta">
        <Link href="/contact" className="btn solid sm">
          ติดต่อเรา
        </Link>
        <button
          type="button"
          className="burger"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          aria-controls="mobilenav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconBurger />}
        </button>
      </div>
      <div id="mobilenav" className={`mobilenav${open ? " open" : ""}`} aria-hidden={!open}>
        {[...NAV, ["ติดต่อเรา", "/contact"]].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={`lnk${isOn(href) ? " on" : ""}`}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {label}
            {!isOn(href) && <IconChevronR />}
          </Link>
        ))}
        <div className="mn-cta">
          <a href={lineHref} className="btn line sm" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            <IconLine w={18} /> LINE
          </a>
          {phoneHref && (
            <a href={phoneHref} className="btn out sm" tabIndex={open ? 0 : -1}>
              <IconPhone w={16} /> โทร
            </a>
          )}
        </div>
      </div>
    </>
  );
}
