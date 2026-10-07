"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import ImageBox from "@/components/ImageBox";
import { IconClose, IconChevronL, IconChevronR, IconDownload } from "@/components/icons";
import { driveImageUrl, GRID_WIDTH, LIGHTBOX_WIDTH } from "@/lib/images";

// alt_text ที่ sync มาจาก Drive มักเป็นชื่อไฟล์ (IMG_7279) ซึ่งไม่มีความหมาย → ใช้ชื่อทริปแทน
function altOf(p, i, tripName) {
  const a = (p.alt_text || "").trim();
  if (!a || /^(IMG|DSC|PXL|DCIM|Photo)[_\-\s]?\d+/i.test(a) || /\.(jpe?g|png|heic|webp)$/i.test(a)) {
    return `${tripName || "ภาพบรรยากาศ"} — รูปที่ ${i + 1}`;
  }
  return a;
}

export default function GalleryGrid({ photos, tripName }) {
  const [open, setOpen] = useState(null); // index ที่เปิดอยู่
  const touchX = useRef(null);
  const closeBtn = useRef(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i > 0 ? i - 1 : photos.length - 1)),
    [photos.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i < photos.length - 1 ? i + 1 : 0)),
    [photos.length]
  );

  const isOpen = open !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  // โหลดรูปถัดไป/ก่อนหน้าไว้ล่วงหน้า ให้กดเลื่อนแล้วขึ้นทันที
  useEffect(() => {
    if (!isOpen || photos.length < 2) return;
    for (const j of [open + 1, open - 1]) {
      const p = photos[(j + photos.length) % photos.length];
      const im = new Image();
      im.src = driveImageUrl(p.drive_file_id, LIGHTBOX_WIDTH);
    }
  }, [isOpen, open, photos]);

  const cur = isOpen ? photos[open] : null;

  return (
    <>
      <div className="gal">
        {photos.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="gal-item"
            onClick={() => setOpen(i)}
            aria-label={`เปิดดูรูปขนาดใหญ่: ${altOf(p, i, tripName)}`}
          >
            <ImageBox
              className="ih-gal"
              driveId={p.drive_file_id}
              width={GRID_WIDTH}
              label={altOf(p, i, tripName)}
            />
          </button>
        ))}
      </div>

      {cur && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="ดูรูปขนาดใหญ่"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
          }}
        >
          <div className="lb-bar" onClick={(e) => e.stopPropagation()}>
            <span>
              {open + 1} / {photos.length}
            </span>
            <span className="row" style={{ gap: 8 }}>
              <a
                className="lb-btn"
                href={driveImageUrl(cur.drive_file_id, 2000)}
                download={`alfayard-${open + 1}.jpg`}
              >
                <IconDownload /> ดาวน์โหลด
              </a>
              <button ref={closeBtn} type="button" className="lb-btn" onClick={close} aria-label="ปิด">
                <IconClose />
              </button>
            </span>
          </div>

          {photos.length > 1 && (
            <button
              type="button"
              className="lb-btn lb-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="รูปก่อนหน้า"
            >
              <IconChevronL w={24} />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={cur.id}
            src={driveImageUrl(cur.drive_file_id, LIGHTBOX_WIDTH)}
            alt={altOf(cur, open, tripName)}
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <button
              type="button"
              className="lb-btn lb-nav next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="รูปถัดไป"
            >
              <IconChevronR w={24} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
