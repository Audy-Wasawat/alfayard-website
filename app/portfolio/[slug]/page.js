import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import TripCard from "@/components/TripCard";
import { Crumb } from "@/components/PageHead";
import { GRID_WIDTH } from "@/lib/images";
import {
  getPortfolioTripBySlug,
  getPortfolioPhotos,
  getPortfolioTrips,
  formatThaiDate,
  toThaiYear,
  typeLabel,
} from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = await getPortfolioTripBySlug(slug);
  if (!trip) return {};
  return { title: `${trip.name} | อัล ฟายาร์ด 1441` };
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const trip = await getPortfolioTripBySlug(slug);
  if (!trip) notFound();

  const [photos, allTrips] = await Promise.all([
    getPortfolioPhotos(trip.id),
    getPortfolioTrips(),
  ]);
  const others = allTrips.filter((t) => t.id !== trip.id).slice(0, 3);
  const cover = photos.find((p) => p.is_cover) || null;

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
            { label: "ผลงานที่ผ่านมา", href: "/portfolio" },
            { label: trip.name },
          ]}
        />
      </div>

      <section className="sec tight">
        <div className="wrapx col" style={{ gap: 22 }}>
          <div className="row wrap" style={{ gap: 10 }}>
            <span className="pill">{typeLabel(trip.type)}</span>
            <span className="pill">ปี {toThaiYear(trip.year)}</span>
          </div>
          <h1 className="f40">{trip.name}</h1>
          <div
            className="row wrap"
            style={{
              gap: "20px 48px",
              padding: "20px 0",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div className="col" style={{ gap: 2 }}>
              <span className="mute sm">วันที่เดินทาง</span>
              <span>
                {trip.trip_date_start
                  ? `${formatThaiDate(trip.trip_date_start)}${
                      trip.trip_date_end ? ` – ${formatThaiDate(trip.trip_date_end)}` : ""
                    }`
                  : "[วันที่] – [วันที่]"}
              </span>
            </div>
            <div className="col" style={{ gap: 2 }}>
              <span className="mute sm">สถานที่</span>
              <span>{trip.location || "มักกะฮ์ · มะดีนะฮ์"}</span>
            </div>
            <div className="col" style={{ gap: 2 }}>
              <span className="mute sm">จำนวนผู้เดินทาง</span>
              <span>{trip.traveler_count ? `${trip.traveler_count} ท่าน` : "[00] ท่าน"}</span>
            </div>
            <div className="col" style={{ gap: 2 }}>
              <span className="mute sm">จำนวนรูป</span>
              <span>{photos.length > 0 ? `${photos.length} รูป` : "[00] รูป"}</span>
            </div>
          </div>
          <p className="mute" style={{ maxWidth: "52em" }}>
            {trip.description ||
              `ทริปนี้เดินทางช่วง [ช่วงเวลา] มีผู้ร่วมเดินทาง [00] ท่าน เข้าพักที่ [ชื่อโรงแรม]
              ซึ่งอยู่ในระยะเดินถึงมัสยิด บรรยากาศตลอดทริปเป็นไปด้วยดี ทีมงานเดินทางไปกับกลุ่มตลอดการเดินทาง`}
          </p>
          <ImageBox
            className="ih-cover"
            driveId={trip.cover_image_drive_id || cover?.drive_file_id}
            width={1200}
            label="ภาพปกทริป (ขนาดใหญ่)"
            eager
          />
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div
            className="row between stackm"
            style={{ alignItems: "flex-end", gap: 20, marginBottom: 28 }}
          >
            <div className="shead">
              <span className="eyebrow">แกลเลอรี</span>
              <h2>ภาพบรรยากาศ</h2>
            </div>
            <span className="mute sm">คลิกที่รูปเพื่อดูขนาดเต็ม</span>
          </div>
          {photos.length > 0 ? (
            <>
              <div className="gal">
                {photos.map((p, i) => (
                  <ImageBox
                    key={p.id}
                    className={i === 0 ? "big ih-gal" : "ih-gal"}
                    driveId={p.drive_file_id}
                    width={GRID_WIDTH}
                    label={p.alt_text || "รูป"}
                  />
                ))}
              </div>
              <div className="col" style={{ alignItems: "center", gap: 12, marginTop: 30 }}>
                <span className="mute" style={{ fontSize: 13, textAlign: "center" }}>
                  รูปย่อโหลดแบบ lazy load · รูปเต็มโหลดเมื่อเปิดดูเท่านั้น
                </span>
              </div>
            </>
          ) : (
            <p className="mute">ยังไม่มีรูปในทริปนี้ — จะซิงก์รูปจาก Google Drive เร็ว ๆ นี้</p>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="sec">
          <div className="wrapx">
            <h2 className="f26" style={{ marginBottom: 26 }}>
              ทริปอื่นที่ผ่านมา
            </h2>
            <div className="g3">
              {others.map((t) => (
                <TripCard trip={t} key={t.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Band
        title="อยากร่วมเดินทางกับเราครั้งหน้า?"
        lead="ดูรอบที่กำลังเปิดรับสมัครได้เลย"
        btnLabel="ดูโปรโมชั่นปัจจุบัน"
        btnHref="/promotions"
      />
      <SiteFooter />
    </>
  );
}
