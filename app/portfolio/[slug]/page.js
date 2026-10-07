import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import GalleryGrid from "@/components/GalleryGrid";
import TripCard from "@/components/TripCard";
import { CrumbBar } from "@/components/PageHead";
import { Star, IconCalendar, IconPin, IconUsers, IconImage } from "@/components/icons";
import {
  getPortfolioTripBySlug,
  getPortfolioPhotos,
  getPortfolioTrips,
  formatThaiDateRange,
  toThaiYear,
  typeLabel,
  clean,
} from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = await getPortfolioTripBySlug(slug);
  if (!trip) return {};
  return {
    title: `${trip.name} | อัล ฟายาร์ด 1441`,
    openGraph: { title: `${trip.name} | อัล ฟายาร์ด 1441` },
  };
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

  // แสดงเฉพาะข้อมูลที่กรอกแล้ว
  const facts = [
    [IconCalendar, "วันที่เดินทาง", formatThaiDateRange(trip.trip_date_start, trip.trip_date_end)],
    [IconPin, "สถานที่", clean(trip.location) || "มักกะฮ์ · มะดีนะฮ์"],
    [IconUsers, "จำนวนผู้เดินทาง", trip.traveler_count ? `${trip.traveler_count} ท่าน` : null],
    [IconImage, "จำนวนรูป", photos.length > 0 ? `${photos.length} รูป` : null],
  ].filter(([, , v]) => v);

  return (
    <>
      <SiteHeader />
      <CrumbBar
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "ผลงานที่ผ่านมา", href: "/portfolio" },
          { label: trip.name },
        ]}
      />

      <section className="sec tight">
        <div className="wrapx col" style={{ gap: 22 }}>
          <div className="row wrap" style={{ gap: 8 }}>
            <span className="pill gold">{typeLabel(trip.type)}</span>
            <span className="pill">ปี {toThaiYear(trip.year)}</span>
          </div>
          <h1 className="f40">{trip.name}</h1>
          {facts.length > 0 && (
            <div className="row wrap" style={{ gap: "16px 40px" }}>
              {facts.map(([Ic, k, v]) => (
                <div className="row" style={{ gap: 12 }} key={k}>
                  <span className="icon-badge sm"><Ic w={18} /></span>
                  <div className="col" style={{ gap: 0 }}>
                    <span className="mute sm">{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {clean(trip.description) && (
            <p className="mute" style={{ maxWidth: "52em", fontSize: 17 }}>
              {trip.description}
            </p>
          )}
          {(trip.cover_image_drive_id || cover?.drive_file_id) && (
            <ImageBox
              className="ih-cover"
              driveId={trip.cover_image_drive_id || cover?.drive_file_id}
              width={1600}
              label={`ภาพปก ${trip.name}`}
              eager
              style={{ marginTop: 8 }}
            />
          )}
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="sec-top">
            <div className="shead">
              <span className="eyebrow"><Star size={11} /> แกลเลอรี</span>
              <h2>ภาพบรรยากาศ</h2>
              {photos.length > 0 && <p>แตะที่รูปเพื่อดูขนาดใหญ่และเลื่อนดูรูปถัดไป</p>}
            </div>
          </div>
          {photos.length > 0 ? (
            <GalleryGrid photos={photos} tripName={trip.name} />
          ) : (
            <p className="mute">ยังไม่มีรูปในทริปนี้ จะทยอยเพิ่มเร็ว ๆ นี้</p>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="sec">
          <div className="wrapx">
            <div className="shead" style={{ marginBottom: 24 }}>
              <span className="eyebrow"><Star size={11} /> ผลงานอื่น</span>
              <h2>ทริปอื่นที่ผ่านมา</h2>
            </div>
            <div className="g3">
              {others.map((t) => (
                <TripCard trip={t} key={t.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Band
        alt={others.length === 0}
        title="อยากร่วมเดินทางกับเราครั้งหน้า?"
        lead="ดูรอบที่กำลังเปิดรับสมัครได้เลย"
        btnLabel="ดูโปรโมชั่นปัจจุบัน"
        btnHref="/promotions"
      />
      <SiteFooter />
    </>
  );
}
