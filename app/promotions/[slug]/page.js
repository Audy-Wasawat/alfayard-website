import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import PromoCard from "@/components/PromoCard";
import { CrumbBar } from "@/components/PageHead";
import {
  Star,
  IconCheck,
  IconCross,
  IconCalendar,
  IconClock,
  IconPlane,
  IconHotel,
  IconUsers,
  IconLine,
  IconPhone,
  IconInfo,
} from "@/components/icons";
import {
  getPromotionBySlug,
  getPromotions,
  getSiteSettings,
  formatPrice,
  formatThaiDateRange,
  statusLabel,
  statusPillClass,
  typeLabel,
  clean,
} from "@/lib/data";
import { lineUrl, telHref } from "@/lib/site";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const promo = await getPromotionBySlug(slug);
  if (!promo) return {};
  return {
    title: `${promo.name} | อัล ฟายาร์ด 1441`,
    openGraph: { title: `${promo.name} | อัล ฟายาร์ด 1441` },
  };
}

function hotel(name, stars) {
  const n = clean(name);
  if (!n) return null;
  return stars ? `${n} · ${stars} ดาว` : n;
}

export default async function PromotionDetailPage({ params }) {
  const { slug } = await params;
  const [promo, settings, allPromos] = await Promise.all([
    getPromotionBySlug(slug),
    getSiteSettings(),
    getPromotions(),
  ]);
  if (!promo) notFound();

  const inclusions = Array.isArray(promo.inclusions) ? promo.inclusions : [];
  const exclusions = Array.isArray(promo.exclusions) ? promo.exclusions : [];
  const itinerary = Array.isArray(promo.itinerary) ? promo.itinerary : [];
  const others = allPromos.filter((p) => p.id !== promo.id).slice(0, 3);
  const price = formatPrice(promo.price);
  const closed = promo.status === "closed";

  // แสดงเฉพาะแถวที่มีข้อมูล
  const rows = [
    [IconCalendar, "วันเดินทาง", formatThaiDateRange(promo.departure_date, promo.return_date)],
    [IconClock, "ระยะเวลา", promo.duration_days ? `${promo.duration_days} วัน` : null],
    [IconPlane, "สายการบิน", clean(promo.airline) || null],
    [IconHotel, "ที่พัก มักกะฮ์", hotel(promo.hotel_makkah_name, promo.hotel_makkah_stars)],
    [IconHotel, "ที่พัก มะดีนะฮ์", hotel(promo.hotel_madinah_name, promo.hotel_madinah_stars)],
    [IconUsers, "จำนวนที่รับ", promo.capacity ? `${promo.capacity} ท่าน` : null],
  ].filter(([, , v]) => v);

  return (
    <>
      <SiteHeader />
      <CrumbBar
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "โปรโมชั่น", href: "/promotions" },
          { label: promo.name },
        ]}
      />

      <section className="sec tight">
        <div className="wrapx side promo-detail">
          <div className="main col" style={{ gap: 14 }}>
            <ImageBox
              className="ih-poster"
              driveId={promo.poster_image_drive_id}
              width={1000}
              label={`โปสเตอร์ ${promo.name}`}
              eager
            />
          </div>

          <aside className="aside card promo-aside">
            <div className="col" style={{ gap: 18 }}>
              <div className="row wrap" style={{ gap: 8 }}>
                <span className="pill gold">{typeLabel(promo.type)}</span>
                <span className={statusPillClass(promo.status)}>{statusLabel(promo.status)}</span>
              </div>
              <h1 className="f32">{promo.name}</h1>

              {rows.length > 0 && (
                <div className="col">
                  {rows.map(([Ic, k, v]) => (
                    <div className="mrow" key={k}>
                      <span className="k"><Ic w={16} /> {k}</span>
                      <span className="v">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="col"
                style={{ gap: 2, padding: "18px 20px", borderRadius: 14, background: "var(--paper2)" }}
              >
                <span className="mute sm">ราคา</span>
                {price ? (
                  <span className="price fprice">
                    ฿{price} <small>{clean(promo.price_note) || "/ ท่าน"}</small>
                  </span>
                ) : (
                  <span className="price f26">สอบถามราคา</span>
                )}
              </div>

              {closed && (
                <div className="formnote err">
                  <IconInfo w={18} /> รอบนี้ปิดรับสมัครแล้ว ทักมาสอบถามรอบถัดไปได้เลย
                </div>
              )}

              <div className="col" style={{ gap: 10 }}>
                <a href={lineUrl()} className="btn line w" target="_blank" rel="noopener noreferrer">
                  <IconLine w={22} /> {closed ? "สอบถามรอบถัดไปทาง LINE" : "สอบถาม / จองทาง LINE"}
                </a>
                {settings?.phone && (
                  <a href={telHref(settings.phone)} className="btn out w">
                    <IconPhone w={17} /> โทร {settings.phone}
                  </a>
                )}
              </div>

              {(inclusions.length > 0 || exclusions.length > 0) && (
                <details className="acc">
                  <summary>รายละเอียดเพิ่มเติม (สิ่งที่รวมในแพ็กเกจ)</summary>
                  <div className="acc-body col" style={{ gap: 18 }}>
                    {inclusions.length > 0 && (
                      <ul className="col" style={{ gap: 10 }}>
                        {inclusions.map((x) => (
                          <li className="ck" key={x}>
                            <span className="m"><IconCheck w={12} /></span>
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exclusions.length > 0 && (
                      <div className="col" style={{ gap: 10 }}>
                        <span className="mute sm" style={{ fontWeight: 600 }}>ไม่รวม</span>
                        <ul className="col" style={{ gap: 10 }}>
                          {exclusions.map((x) => (
                            <li className="ck" key={x}>
                              <span className="m x"><IconCross w={10} /></span>
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
                ไม่มีระบบรับชำระเงินออนไลน์ — กรุณาติดต่อโดยตรงเพื่อสอบถามและดำเนินการจอง
              </p>
            </div>
          </aside>
        </div>
      </section>

      {itinerary.length > 0 && (
        <section className="sec alt">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 24 }}>
              <span className="eyebrow"><Star size={11} /> กำหนดการ</span>
              <h2>กำหนดการเดินทาง</h2>
            </div>
            <div className="days">
              {itinerary.map((day, i) => (
                <div className="day" key={i}>
                  <div className="n">{i + 1}</div>
                  <div className="col" style={{ gap: 4, minWidth: 0, paddingTop: 4 }}>
                    <h4>
                      วันที่ {i + 1}
                      {day.title ? ` — ${day.title}` : ""}
                    </h4>
                    {day.description && <p>{day.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {promo.terms_text && (
        <section className="sec">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 16 }}>
              <span className="eyebrow"><Star size={11} /> เงื่อนไข</span>
              <h2>เงื่อนไขการจองและการชำระเงิน</h2>
            </div>
            <p className="mute" style={{ maxWidth: "52em", whiteSpace: "pre-line" }}>
              {promo.terms_text}
            </p>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="sec alt">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 24 }}>
              <span className="eyebrow"><Star size={11} /> โปรโมชั่นอื่น</span>
              <h2>โปรโมชั่นอื่นที่น่าสนใจ</h2>
            </div>
            <div className="g3">
              {others.map((p) => (
                <PromoCard promo={p} key={p.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Band
        alt={others.length > 0}
        title="สนใจทริปนี้? ทักมาสอบถามได้เลย"
        lead="ที่นั่งมีจำกัด ถามก่อนได้ไม่ต้องเกรงใจ"
        line
        btnLabel="แชทกับเราทาง LINE"
      />
      <SiteFooter />
    </>
  );
}
