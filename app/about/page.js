import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import ImageBox from "@/components/ImageBox";
import { Star, IconShield, IconUsers, IconMosque, IconCheck, IconDoc } from "@/components/icons";

const FEAT_ICON = [IconUsers, IconMosque, IconCheck, IconDoc];
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
            <span className="eyebrow"><Star size={11} /> เราคือใคร</span>
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
              {settings?.license_number && (
                <span className="pill" style={{ padding: "8px 14px", fontSize: 13.5 }}>
                  <IconShield w={15} /> ใบอนุญาตนำเที่ยวเลขที่ {settings.license_number}
                </span>
              )}
              {settings?.hajj_license_number && (
                <span className="pill gold" style={{ padding: "8px 14px", fontSize: 13.5 }}>
                  <Star size={12} /> ใบอนุญาตฮัจญ์เลขที่ {settings.hajj_license_number}
                </span>
              )}
            </div>
          </div>
          <ImageBox className="ih-lg" src="/about-team.jpg" label="ทีมงานและคณะผู้เดินทาง อัล ฟายาร์ด 1441" eager style={{ boxShadow: "var(--sh-2)" }} />
        </div>
      </section>

      <section className="sec alt">
        <div className="wrapx">
          <div className="shead center" style={{ maxWidth: "48em" }}>
            <span className="eyebrow"><Star size={11} /> ความเป็นมา</span>
            <h2 className="f32">
              {settings?.founding_year
                ? `เริ่มต้นตั้งแต่ปี พ.ศ. ${settings.founding_year + 543}`
                : "ความเป็นมาของเรา"}
            </h2>
            {settings?.history_text && (
              <p className="mute" style={{ fontSize: 17 }}>{settings.history_text}</p>
            )}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrapx">
          <div className="shead center" style={{ marginBottom: 24 }}>
            <span className="eyebrow"><Star size={11} /> ทีมงาน</span>
            <h2>ทีมงานและผู้นำกลุ่ม</h2>
            <p>คณะทีมงานและผู้นำกลุ่มในสังกัด อัล ฟายาร์ด 1441 ที่ร่วมดูแลผู้เดินทางในแต่ละทริป</p>
          </div>
          <div className="g4">
            {team.map((m) => (
              <div className="card person" key={m.id}>
                <ImageBox
                  className="avatar"
                  driveId={m.photo_drive_id}
                  width={300}
                  label={m.name}
                />
                <h3>{m.name}</h3>
                {m.position && <span className="mute sm">{m.position}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
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
        alt
        title="มีคำถามเพิ่มเติม? ยินดีให้คำปรึกษา"
        lead="ทักมาถามได้ทุกเรื่อง ไม่ว่าจะเพิ่งเริ่มหาข้อมูลหรือตัดสินใจแล้ว"
        btnLabel="ติดต่อเรา"
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
