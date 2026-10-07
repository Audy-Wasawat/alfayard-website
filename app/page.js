import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import PromoCard from "@/components/PromoCard";
import TripCard from "@/components/TripCard";
import {
  Star,
  IconArrow,
  IconLine,
  IconShield,
  IconKaaba,
  IconMosque,
  IconDoc,
  IconUsers,
  IconCheck,
} from "@/components/icons";
import {
  getServices,
  getDifferentiators,
  getPromotions,
  getPortfolioTrips,
  getSiteSettings,
} from "@/lib/data";
import { lineUrl } from "@/lib/site";

export const revalidate = 60;

const SERVICE_ICON = { hajj: IconKaaba, umrah: IconMosque, visa: IconDoc };
const FEAT_ICON = [IconUsers, IconMosque, IconCheck, IconDoc];

// โปรโมชั่นที่เปิดรับอยู่ขึ้นก่อน ที่ปิดรับแล้วไว้ท้าย
const statusRank = { open: 0, almost_full: 1, closed: 2 };
const byStatus = (a, b) => (statusRank[a.status] ?? 1) - (statusRank[b.status] ?? 1);

export default async function Home() {
  const [services, diffs, promos, trips, settings] = await Promise.all([
    getServices(),
    getDifferentiators(),
    getPromotions(),
    getPortfolioTrips(),
    getSiteSettings(),
  ]);
  const shownPromos = [...promos].sort(byStatus).slice(0, 3);
  const anyOpen = promos.some((p) => p.status !== "closed");

  return (
    <>
      <SiteHeader />

      <section className="hero" id="main">
        <div className="wrapx">
          <div className="txt">
            <span className="eyebrow" style={{ color: "#E7C38E" }}>
              <Star size={12} color="#E7C38E" /> ฮัจญ์ · อุมเราะห์ · วีซ่าอุมเราะห์
            </span>
            <h1>
              เดินทางสู่มักกะฮ์และมะดีนะฮ์
              <br />
              ด้วยการดูแลที่<em>ไว้ใจได้</em>
            </h1>
            <p className="lead">
              ให้บริการฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์ โดยทีมงานที่เดินทางไปกับคุณตลอดทริป
              ตั้งแต่เตรียมเอกสารจนกลับถึงบ้าน
            </p>
            <div className="row wrap" style={{ gap: 12, paddingTop: 4 }}>
              <Link href="/promotions" className="btn">
                ดูโปรโมชั่นปีนี้ <IconArrow />
              </Link>
              <a href={lineUrl()} className="btn ghost" target="_blank" rel="noopener noreferrer">
                <IconLine w={20} /> สอบถามทาง LINE
              </a>
            </div>
            <div className="hero-badges">
              {settings?.license_number && (
                <span className="hbadge">
                  <span className="ic"><IconShield w={15} /></span>
                  <span>
                    <small>ใบอนุญาตนำเที่ยว</small>
                    <b>เลขที่ {settings.license_number}</b>
                  </span>
                </span>
              )}
              {settings?.hajj_license_number && (
                <span className="hbadge">
                  <span className="ic"><Star size={13} color="#E7C38E" /></span>
                  <span>
                    <small>ใบอนุญาตฮัจญ์</small>
                    <b>เลขที่ {settings.hajj_license_number}</b>
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero.png" alt="ภาพบรรยากาศ มักกะฮ์และมะดีนะฮ์" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="split rev">
            <ImageBox className="ih-md" src="/about-team.jpg" label="ทีมงานและคณะผู้เดินทาง อัล ฟายาร์ด 1441" />
            <div className="col" style={{ gap: 18 }}>
              <span className="eyebrow"><Star size={11} /> เกี่ยวกับเรา</span>
              <h2 className="f32">บริษัทเล็ก ๆ ที่ตั้งใจดูแลทุกคนให้ถึงที่หมาย</h2>
              <p className="mute">
                อัล ฟายาร์ด 1441 เริ่มจากความตั้งใจที่จะพาคนในชุมชนไปทำฮัจญ์และอุมเราะห์
                โดยไม่ต้องกังวลเรื่องเอกสาร ภาษา หรือการเดินทาง เราจึงรับดูแลตั้งแต่ต้นจนจบ
                และเดินทางไปกับกลุ่มด้วยตัวเองทุกครั้ง
              </p>
              <Link href="/about" className="btn out" style={{ alignSelf: "flex-start" }}>
                อ่านเรื่องราวของเรา <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="shead center" style={{ marginBottom: 24 }}>
            <span className="eyebrow"><Star size={11} /> บริการ</span>
            <h2>บริการของเรา</h2>
            <p>สามบริการหลักที่เราดูแลให้ตั้งแต่ต้นจนจบ</p>
          </div>
          <div className="g3">
            {services.map((s) => {
              const Ic = SERVICE_ICON[s.slug] || IconKaaba;
              return (
                <Link href={`/services#${s.slug}`} className="card icard" key={s.id}>
                  <span className="icon-badge"><Ic w={26} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <span className="more" style={{ marginTop: "auto", paddingTop: 6 }}>
                    ดูรายละเอียด <IconArrow />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="sec-top">
            <div className="shead">
              <span className="eyebrow"><Star size={11} /> โปรโมชั่น</span>
              <h2>{anyOpen ? "โปรโมชั่นที่เปิดรับสมัคร" : "โปรโมชั่นล่าสุด"}</h2>
              <p>
                {anyOpen
                  ? "ทริปที่กำลังรับสมัครอยู่ตอนนี้ ที่นั่งมีจำกัด"
                  : "รอบล่าสุดเต็มแล้ว ทักมาสอบถามรอบถัดไปได้เลย"}
              </p>
            </div>
            <Link href="/promotions" className="btn out inline-m">
              ดูทั้งหมด <IconArrow />
            </Link>
          </div>
          {shownPromos.length > 0 ? (
            <div className="g3">
              {shownPromos.map((p, i) => (
                <PromoCard promo={p} key={p.id} eager={i === 0} />
              ))}
            </div>
          ) : (
            <p className="mute">ตอนนี้ยังไม่มีโปรโมชั่นที่เปิดรับสมัคร ทักมาสอบถามรอบถัดไปได้เลย</p>
          )}
        </div>
      </section>

      {trips.length > 0 && (
        <section className="sec alt">
          <div className="wrapx">
            <div className="sec-top">
              <div className="shead">
                <span className="eyebrow"><Star size={11} /> ผลงานที่ผ่านมา</span>
                <h2>ทริปที่พาเดินทางไปแล้ว</h2>
                <p>ภาพบรรยากาศจริงจากทริปที่ผ่านมา</p>
              </div>
              <Link href="/portfolio" className="btn out inline-m">
                ดูผลงานทั้งหมด <IconArrow />
              </Link>
            </div>
            <div className="g3">
              {trips.slice(0, 6).map((t) => (
                <TripCard trip={t} key={t.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrapx">
          <div className="shead center" style={{ marginBottom: 24 }}>
            <span className="eyebrow"><Star size={11} /> จุดเด่น</span>
            <h2>ทำไมต้องเดินทางกับเรา</h2>
          </div>
          <div className="g2">
            {diffs.map((d, i) => {
              const Ic = FEAT_ICON[i % FEAT_ICON.length];
              return (
                <div className="feat card hov" key={d.id}>
                  <span className="icon-badge gold"><Ic /></span>
                  <div className="col" style={{ minWidth: 0 }}>
                    <h3>{d.title}</h3>
                    <p>{d.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Band
        title="สนใจเดินทางกับเรา? ทักมาสอบถามได้เลย"
        lead="ปรึกษาก่อนตัดสินใจ ไม่มีค่าใช้จ่าย"
        line
        btnLabel="แชทกับเราทาง LINE"
      />
      <SiteFooter />
    </>
  );
}
