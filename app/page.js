import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import PromoCard from "@/components/PromoCard";
import TripCard from "@/components/TripCard";
import { Star } from "@/components/icons";
import {
  getServices,
  getDifferentiators,
  getPromotions,
  getPortfolioTrips,
  getSiteSettings,
} from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [services, diffs, promos, trips, settings] = await Promise.all([
    getServices(),
    getDifferentiators(),
    getPromotions(),
    getPortfolioTrips(),
    getSiteSettings(),
  ]);

  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="wrapx">
          <div className="txt">
            <div className="rule" />
            <h1>
              เดินทางสู่มักกะฮ์และมะดีนะฮ์
              <br />
              ด้วยการดูแลที่ไว้ใจได้
            </h1>
            <p>
              ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์ โดยทีมงานที่เดินทางไปกับคุณตลอดทริป
              ตั้งแต่เตรียมเอกสารจนกลับถึงบ้าน
            </p>
            <div className="row wrap" style={{ gap: 14, paddingTop: 6 }}>
              <Link href="/promotions" className="btn">
                ดูโปรโมชั่นปีนี้
              </Link>
              <a
                href={settings?.line_id ? `https://line.me/ti/p/~${settings.line_id}` : "/contact"}
                className="btn ghost"
              >
                สอบถามทาง LINE
              </a>
            </div>
            <div className="row wrap" style={{ gap: 24, paddingTop: 8 }}>
              <span className="hchip">
                <Star size={11} color="#C0904F" /> ใบอนุญาตนำเที่ยวเลขที่{" "}
                {settings?.license_number || "[เลขที่]"}
              </span>
              <span className="hchip">
                <Star size={11} color="#C0904F" /> ทีมงานเดินทางไปด้วยทุกทริป
              </span>
            </div>
          </div>
          <div className="img hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero.png" alt="ผู้แสวงบุญ ณ มักกะฮ์และมะดีนะฮ์" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="split rev">
            <ImageBox className="ih-md" label="ภาพทีมงาน / บริษัท" />
            <div className="col" style={{ gap: 18 }}>
              <span className="eyebrow">เกี่ยวกับเรา</span>
              <h2 className="f32">บริษัทเล็ก ๆ ที่ตั้งใจดูแลทุกคนให้ถึงที่หมาย</h2>
              <p className="mute">
                อัล ฟายาร์ด 1441 เริ่มจากความตั้งใจที่จะพาคนในชุมชนไปทำฮัจญ์และอุมเราะห์
                โดยไม่ต้องกังวลเรื่องเอกสาร ภาษา หรือการเดินทาง เราจึงรับดูแลตั้งแต่ต้นจนจบ
                และเดินทางไปกับกลุ่มด้วยตัวเองทุกครั้ง
              </p>
              <Link href="/about" className="btn out" style={{ alignSelf: "flex-start" }}>
                อ่านเรื่องราวของเรา
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="shead" style={{ alignItems: "center", textAlign: "center", marginBottom: 38 }}>
            <span className="eyebrow">บริการ</span>
            <h2>บริการของเรา</h2>
            <p>สามบริการหลักที่เราดูแลให้ตั้งแต่ต้นจนจบ</p>
          </div>
          <div className="g3">
            {services.map((s) => (
              <article className="card icard" key={s.id}>
                <Star size={26} color="#C0904F" />
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
                <Link href={`/services#${s.slug}`} className="more">
                  ดูรายละเอียด →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="row between stackm" style={{ alignItems: "flex-end", gap: 24, marginBottom: 34 }}>
            <div className="shead">
              <span className="eyebrow">โปรโมชั่น</span>
              <h2>โปรโมชั่นที่เปิดรับสมัคร</h2>
              <p>ทริปที่กำลังรับสมัครอยู่ตอนนี้</p>
            </div>
            <Link href="/promotions" className="btn out">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="g3">
            {promos.slice(0, 3).map((p) => (
              <PromoCard promo={p} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="row between stackm" style={{ alignItems: "flex-end", gap: 24, marginBottom: 34 }}>
            <div className="shead">
              <span className="eyebrow">ผลงานที่ผ่านมา</span>
              <h2>ทริปที่พาเดินทางไปแล้ว</h2>
              <p>ภาพบรรยากาศจริงจากทริปที่ผ่านมา</p>
            </div>
            <Link href="/portfolio" className="btn out">
              ดูผลงานทั้งหมด
            </Link>
          </div>
          <div className="g3">
            {trips.slice(0, 6).map((t) => (
              <TripCard trip={t} key={t.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="shead" style={{ alignItems: "center", textAlign: "center", marginBottom: 38 }}>
            <span className="eyebrow">จุดเด่น</span>
            <h2>ทำไมต้องเดินทางกับเรา</h2>
          </div>
          <div className="g2">
            {diffs.map((d) => (
              <div className="row top" style={{ gap: 16 }} key={d.id}>
                <span style={{ flexShrink: 0, marginTop: 4 }}>
                  <Star size={24} color="#C0904F" />
                </span>
                <div className="col" style={{ gap: 6, minWidth: 0 }}>
                  <h3 className="f20">{d.title}</h3>
                  <p className="mute" style={{ fontSize: 15 }}>
                    {d.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band
        title="สนใจเดินทางกับเรา? ทักมาสอบถามได้เลย"
        lead="ปรึกษาก่อนตัดสินใจ ไม่มีค่าใช้จ่าย"
        btnLabel={`แอดไลน์ @${settings?.line_id || "[line-id]"}`}
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
