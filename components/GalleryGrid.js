"use client";
import { useState, useEffect, useCallback } from "react";
import ImageBox from "@/components/ImageBox";
import { driveImageUrl, GRID_WIDTH, LIGHTBOX_WIDTH } from "@/lib/images";

export default function GalleryGrid({ photos }) {
  const [open, setOpen] = useState(null); // index ที่เปิดอยู่

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() =>
    setOpen((i) => (i > 0 ? i - 1 : photos.length - 1)), [photos.length]);
  const next = useCallback(() =>
    setOpen((i) => (i < photos.length - 1 ? i + 1 : 0)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <>
      {/* GRID */}
      <div className="gal">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpen(i)}
            style={{
              all: "unset",
              display: "block",
              cursor: "zoom-in",
              borderRadius: "inherit",
            }}
          >
            <ImageBox
              className="ih-gal"
              driveId={p.drive_file_id}
              width={GRID_WIDTH}
              label={p.alt_text || "รูป"}
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ปุ่มดาวน์โหลด */}
          <a
            href={driveImageUrl(photos[open].drive_file_id, 2000)}
            download={`alfayard-${open + 1}.jpg`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 20,
              right: 66,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              textDecoration: "none",
              fontSize: 13,
              padding: "7px 14px",
              borderRadius: 999,
              cursor: "pointer",
            }}
            aria-label="ดาวน์โหลดรูปนี้"
          >
            ↓ ดาวน์โหลด
          </a>

          {/* ปุ่มปิด */}
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 18,
              right: 22,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
              lineHeight: 1,
              opacity: 0.85,
            }}
            aria-label="ปิด"
          >
            ✕
          </button>

          {/* counter */}
          <span
            style={{
              position: "absolute",
              top: 22,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              pointerEvents: "none",
            }}
          >
            {open + 1} / {photos.length}
          </span>

          {/* ลูกศรซ้าย */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 16,
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#fff",
              fontSize: 28,
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="รูปก่อนหน้า"
          >
            ‹
          </button>

          {/* รูปหลัก */}
          <img
            src={driveImageUrl(photos[open].drive_file_id, LIGHTBOX_WIDTH)}
            alt={photos[open].alt_text || "รูป"}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(92vw, 1200px)",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />

          {/* ลูกศรขวา */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 16,
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#fff",
              fontSize: 28,
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="รูปถัดไป"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
