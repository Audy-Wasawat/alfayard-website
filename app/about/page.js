import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import { Star } from "@/components/icons";
import { getSiteSettings, getTeamMembers, getDifferentiators } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "เกี่ยวกับเรา | อัล ฟายาร์ด 1441",
};

export default async function AboutPage() {
  const [settings, team, diffs] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
    getDifferentiators(),
  ]);

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "เกี่ยวกับเรา" },
        ]}
        title="เกี่ยวกับ อัล ฟายาร์ด 1441"
        lead="บริษัทนำเที่ยวที่ตั้งใจพาคนไปทำฮัจญ์และอุมเราะห์ โดยดูแลกันเองตั้งแต่ต้นจนจบ"
      />

      <section className="sec">
        <div className="wrapx split top">
          <div className="col" style={{ gap: 18 }}>
            <span className="eyebrow">เราคือใคร</span>
            <h2 className="f32">เริ่มจากความตั้งใจเล็ก ๆ ที่จะพาคนในชุมชนไปให้ถึง</h2>
            <p className="mute">
              อัล ฟายาร์ด 1441 เกิดขึ้นเพราะเราเห็นว่าหลายคนอยากไปฮัจญ์และอุมเราะห์
              แต่ติดตรงที่ไม่รู้จะเริ่มยังไง เอกสารต้องเตรียมอะไรบ้าง ไปถึงแล้วจะสื่อสารได้ไหม
              เราจึงตั้งใจรับดูแลตรงนี้ให้ทั้งหมด
            </p>
            <p className="mute">
              สิ่งที่เรายึดมาตลอดคือเดินทางไปกับกลุ่มด้วยตัวเองทุกครั้ง
              ไม่ใช่ส่งคนไปแล้วรอรับกลับ เพราะเรื่องที่ต้องช่วยกันแก้มักเกิดขึ้นระหว่างทาง ไม่ใช่ก่อนออกเดินทาง
            </p>
            <div className="row wrap" style={{ gap: 10, paddingTop: 6 }}>
              <span className="chip">
                ใบอนุญาตนำเที่ยวเลขที่ {settings?.license_number || "[เลขที่]"}
              </span>
              <span className="chip">
                ใบอนุญาตฮัจญ์เลขที่ {settings?.hajj_license_number || "[เลขที่]"}
              </span>
              <span className="chip">
                ก่อตั้งปี พ.ศ. {settings?.founding_year ? settings.founding_year + 543 : "[ปี]"}
              </span>
            </div>
          </div>
          <ImageBox className="ih-lg" src="/about-team.jpg" label="ภาพบริษัท / ทีมงาน" eager />
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="shead" style={{ maxWidth: "46em" }}>
            <span className="eyebrow">ความเป็นมา</span>
            <h2 className="f32">
              เริ่มต้นตั้งแต่ปี พ.ศ.{" "}
              {settings?.founding_year ? settings.founding_year + 543 : "[ปี]"}
            </h2>
            <p className="mute">
              {settings?.history_text ||
                "[เล่าที่มาของบริษัทสั้น ๆ 2–3 ประโยค — เริ่มจากอะไร ก่อตั้งและได้ใบอนุญาตนำเที่ยวเมื่อไหร่ และตอนนี้ทำอะไรอยู่]"}
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div
            className="shead"
            style={{ alignItems: "center", textAlign: "center", marginBottom: 36 }}
          >
            <span className="eyebrow">ทีมงาน</span>
            <h2>คนที่จะเดินทางไปกับคุณ</h2>
            <p>ทีมงานชุดนี้คือคนที่ดูแลคุณตั้งแต่วันแรกที่ทักมาจนถึงวันกลับถึงบ้าน</p>
          </div>
          <div className="g4">
            {team.map((m) => (
              <div className="card person" key={m.id}>
                <ImageBox
                  driveId={m.photo_drive_id}
                  width={220}
                  label="รูป"
                  style={{ width: 104, height: 104, borderRadius: "50%" }}
                />
                <h3>{m.name}</h3>
                <span className="mute sm">{m.position}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="shead" style={{ marginBottom: 34 }}>
            <span className="eyebrow">จุดเด่น</span>
            <h2>ทำไมต้องเดินทางกับเรา</h2>
          </div>
          <div className="g2">
            {diffs.map((d) => (
              <div className="card icard" key={d.id}>
                <Star size={24} color="#C0904F" />
                <h3 className="f20">{d.title}</h3>
                <p>{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band
        title="มีคำถามเพิ่มเติม? ยินดีให้คำปรึกษา"
        lead="ทักมาถามได้ทุกเรื่อง ไม่ว่าจะเพิ่งเริ่มหาข้อมูลหรือตัดสินใจแล้ว"
        btnLabel="ติดต่อเรา"
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
