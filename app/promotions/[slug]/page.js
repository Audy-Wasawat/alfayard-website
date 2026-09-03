import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import PromoCard from "@/components/PromoCard";
import { Crumb } from "@/components/PageHead";
import { IconCheck, IconCross } from "@/components/icons";
import {
  getPromotionBySlug,
  getPromotions,
  getSiteSettings,
  formatPrice,
  formatThaiDate,
  statusLabel,
  statusPillClass,
  typeLabel,
} from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const promo = await getPromotionBySlug(slug);
  if (!promo) return {};
  return { title: `${promo.name} | อัล ฟายาร์ด 1441` };
}

export default async function PromotionDetailPage({ params }) {
  const { slug } = await params;
  const [promo, settings] = await Promise.all([
    getPromotionBySlug(slug),
    getSiteSettings(),
  ]);
  if (!promo) notFound();

  const gallery = Array.isArray(promo.gallery) ? promo.gallery : [];
  const inclusions = Array.isArray(promo.inclusions) ? promo.inclusions : [];
  const exclusions = Array.isArray(promo.exclusions) ? promo.exclusions : [];
  const itinerary = Array.isArray(promo.itinerary) ? promo.itinerary : [];

  const allPromos = await getPromotions();
  const others = allPromos.filter((p) => p.id !== promo.id).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <div
        className="wrapx"
        style={{ paddingTop: 18, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}
      >
        <Crumb
          parts={[
            { label: "หน้าแรก", href: "/" },
            { label: "โปรโมชั่น", href: "/promotions" },
            { label: promo.name },
          ]}
        />
      </div>

      <section className="sec tight">
        <div className="wrapx side promo-detail">
          <div className="main col" style={{ gap: 14 }}>
            <ImageBox
              className="ih-poster"
              driveId={promo.poster_image_drive_id}
              width={1000}
              label="โปสเตอร์ทริป (ภาพหลัก)"
              eager
            />
            {gallery.length > 0 && (
              <div className="row wrap" style={{ gap: 12 }}>
                {gallery.slice(0, 4).map((g, i) => (
                  <ImageBox
                    key={g.drive_id || i}
                    driveId={g.drive_id}
                    width={220}
                    label={g.alt || "รูป"}
                    style={{ width: 104, height: 78, flexShrink: 0 }}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="aside card" style={{ padding: 26, background: "var(--paper2)" }}>
            <div className="col" style={{ gap: 16 }}>
              <div className="row wrap" style={{ gap: 8 }}>
                <span className="pill">{typeLabel(promo.type)}</span>
                <span className={statusPillClass(promo.status)}>
                  {statusLabel(promo.status)}
                </span>
              </div>
              <h1 className="f26">{promo.name}</h1>
              <div className="col">
                <div className="mrow">
                  <span className="k">วันเดินทาง</span>
                  <span className="v">
                    {promo.departure_date
                      ? `${formatThaiDate(promo.departure_date)}${
                          promo.return_date ? ` – ${formatThaiDate(promo.return_date)}` : ""
                        }`
                      : "[วันที่] – [วันที่]"}
                  </span>
                </div>
                <div className="mrow">
                  <span className="k">ระยะเวลา</span>
                  <span className="v">
                    {promo.duration_days ? `${promo.duration_days} วัน` : "[00] วัน"}
                  </span>
                </div>
                <div className="mrow">
                  <span className="k">สายการบิน</span>
                  <span className="v">{promo.airline || "[สายการบิน]"}</span>
                </div>
                <div className="mrow">
                  <span className="k">ที่พัก</span>
                  <span className="v">
                    {promo.hotel_name || "[ชื่อโรงแรม]"} · ระดับ{" "}
                    {promo.hotel_stars || "[0]"} ดาว
                  </span>
                </div>
                <div className="mrow">
                  <span className="k">จำนวนที่รับ</span>
                  <span className="v">
                    {promo.capacity ? `${promo.capacity} ท่าน` : "[00] ท่าน"}
                  </span>
                </div>
              </div>
              <div
                className="col"
                style={{ gap: 4, paddingTop: 12, borderTop: "1px solid var(--line)" }}
              >
                <span className="mute sm">ราคาเริ่มต้น</span>
                <span className="price fprice">฿ {formatPrice(promo.price)}</span>
                <span className="mute sm">{promo.price_note}</span>
              </div>
              <div className="col" style={{ gap: 10 }}>
                <a
                  href={settings?.line_id ? `https://line.me/ti/p/~${settings.line_id}` : "/contact"}
                  className="btn w"
                >
                  สอบถาม / จองทาง LINE
                </a>
                <a href={`tel:${settings?.phone || ""}`} className="btn out w">
                  โทร {settings?.phone || "[0X-XXX-XXXX]"}
                </a>
              </div>
              {(inclusions.length > 0 || exclusions.length > 0) && (
                <details className="acc">
                  <summary>รายละเอียดเพิ่มเติม</summary>
                  <div className="acc-body col" style={{ gap: 18 }}>
                    {inclusions.length > 0 && (
                      <div className="col" style={{ gap: 10 }}>
                        <span className="mute sm">สิ่งที่ได้รับ</span>
                        <ul className="col" style={{ gap: 9 }}>
                          {inclusions.map((x) => (
                            <li className="ck" key={x}>
                              <span className="m">
                                <IconCheck />
                              </span>
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {exclusions.length > 0 && (
                      <div className="col" style={{ gap: 10 }}>
                        <span className="mute sm">สิ่งที่ไม่รวม</span>
                        <ul className="col" style={{ gap: 9 }}>
                          {exclusions.map((x) => (
                            <li className="ck" key={x}>
                              <span className="m">
                                <IconCross />
                              </span>
                              <span>{x}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              )}
              <p className="mute" style={{ fontSize: 13, textAlign: "center" }}>
                เว็บไซต์ไม่มีระบบชำระเงิน — ทุกอย่างคุยและชำระผ่านแชทเหมือนเดิม
              </p>
            </div>
          </aside>
        </div>
      </section>

      {itinerary.length > 0 && (
        <section className="sec">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 20 }}>
              <span className="eyebrow">กำหนดการ</span>
              <h2>กำหนดการเดินทาง</h2>
            </div>
            <div className="col">
              {itinerary.map((day, i) => (
                <div className="day" key={i}>
                  <div className="n">{i + 1}</div>
                  <div className="col" style={{ gap: 5, minWidth: 0 }}>
                    <h4>
                      วันที่ {i + 1} — {day.title}
                    </h4>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {promo.terms_text && (
        <section className="sec alt">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 16 }}>
              <span className="eyebrow">เงื่อนไข</span>
              <h2>เงื่อนไขการจองและการชำระเงิน</h2>
            </div>
            <p className="mute" style={{ maxWidth: "52em" }}>
              {promo.terms_text}
            </p>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="sec">
          <div className="wrapx">
            <h2 className="f26" style={{ marginBottom: 26 }}>
              โปรโมชั่นอื่นที่น่าสนใจ
            </h2>
            <div className="g3">
              {others.map((p) => (
                <PromoCard promo={p} key={p.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Band
        title="สนใจทริปนี้? ทักมาสอบถามได้เลย"
        lead="ที่นั่งมีจำกัด ถามก่อนได้ไม่ต้องเกรงใจ"
        btnLabel={`แอดไลน์ @${settings?.line_id || "[line-id]"}`}
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
