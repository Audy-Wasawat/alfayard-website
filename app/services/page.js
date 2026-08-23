import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import PageHead from "@/components/PageHead";
import ImageBox from "@/components/ImageBox";
import { IconCheck } from "@/components/icons";
import { getServices } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "บริการของเรา | อัล ฟายาร์ด 1441",
};

const STEPS = [
  ["สอบถามและจอง", "ทักไลน์มาถามได้เลย เราจะแจ้งรอบเดินทาง ราคา และสิ่งที่รวมในแพ็กเกจให้ครบก่อนตัดสินใจ"],
  ["เตรียมเอกสาร", "ส่งเอกสารมาทางแชท เราตรวจให้ก่อนยื่นทุกครั้ง ถ้ามีอะไรขาดจะแจ้งให้แก้ทันเวลา"],
  ["อบรมก่อนเดินทาง", "นัดรวมกลุ่มเพื่อทบทวนขั้นตอนศาสนกิจ การใช้ชีวิตที่นั่น และสิ่งที่ต้องเตรียมติดตัว"],
  ["ออกเดินทาง", "เจอกันที่สนามบิน ทีมงานเดินทางไปพร้อมกลุ่มและดูแลจนกลับถึงบ้าน"],
];

function ServiceBlock({ index, service, reversed }) {
  const includes = Array.isArray(service.includes) ? service.includes : [];
  const image = (
    <ImageBox
      className="ih-svc"
      driveId={service.image_drive_id}
      width={700}
      label="ภาพประกอบบริการ"
    />
  );
  return (
    <section className={`sec${index % 2 === 1 ? " alt" : ""}`} id={service.slug}>
      <div className="wrapx">
        <div className={`split top${reversed ? " rev" : ""}`} style={{ marginBottom: 0 }}>
          {reversed ? null : image}
          <div className="col" style={{ gap: 16 }}>
            <span className="eyebrow">บริการที่ {index + 1}</span>
            <h2 className="f32">{service.title}</h2>
            <p className="mute">{service.lead}</p>
            <h3 className="f18" style={{ paddingTop: 6 }}>
              สิ่งที่รวมในบริการ
            </h3>
            <ul className="g2" style={{ gap: "11px 24px" }}>
              {includes.map((x) => (
                <li className="ck" key={x}>
                  <span className="m">
                    <IconCheck />
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <Link
              href={service.slug === "visa" ? "/contact" : "/promotions"}
              className="btn out"
              style={{ alignSelf: "flex-start", marginTop: 6 }}
            >
              {service.cta_label || "สอบถามเพิ่มเติม"}
            </Link>
          </div>
          {reversed ? image : null}
        </div>
      </div>
    </section>
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  const hajj = services.find((s) => s.slug === "hajj");
  const umrah = services.find((s) => s.slug === "umrah");
  const visa = services.find((s) => s.slug === "visa");

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "บริการ" },
        ]}
        title="บริการของเรา"
        lead="เราให้บริการสามอย่าง — ฮัจญ์ อุมเราะห์ และยื่นวีซ่าอุมเราะห์สำหรับผู้ที่เดินทางเอง ทุกบริการดูแลตั้งแต่เตรียมเอกสารจนกลับถึงบ้าน"
      />

      <div
        className="wrapx row wrap"
        style={{
          gap: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottom: "1px solid var(--line)",
        }}
      >
        {services.map((s) => (
          <a key={s.id} href={`#${s.slug}`} className="chip">
            {s.title}
          </a>
        ))}
      </div>

      {hajj && <ServiceBlock index={0} service={hajj} reversed={false} />}

      <section className="sec">
        <div className="wrapx">
          <div className="shead" style={{ marginBottom: 32 }}>
            <span className="eyebrow">ขั้นตอน</span>
            <h2>เดินทางกับเราเป็นอย่างไร</h2>
            <p>สี่ขั้นตอนตั้งแต่ทักมาถามครั้งแรกจนถึงวันออกเดินทาง</p>
          </div>
          <div className="g4">
            {STEPS.map(([t, d], i) => (
              <div className="step" key={t}>
                <div className="n">{i + 1}</div>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {umrah && <ServiceBlock index={1} service={umrah} reversed={true} />}

      {visa && <ServiceBlock index={2} service={visa} reversed={false} />}

      <Band
        title="ยังไม่แน่ใจว่าควรเลือกแบบไหน?"
        lead="ทักมาเล่าให้ฟังได้ เดี๋ยวเราช่วยดูให้ว่าแบบไหนเหมาะกับคุณ"
        btnLabel="ปรึกษาเราทาง LINE"
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
