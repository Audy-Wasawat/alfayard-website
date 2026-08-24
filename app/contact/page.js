import Image from "next/image";
import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageBox from "@/components/ImageBox";
import ContactForm from "@/components/ContactForm";
import { Star } from "@/components/icons";
import { getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "ติดต่อเรา | อัล ฟายาร์ด 1441",
};

export default async function ContactPage() {
  const s = await getSiteSettings();
  const lineHref = "https://line.me/ti/p/HXIgSFkPrC";

  const rows = [
    ["โทรศัพท์", s?.phone || "[0X-XXX-XXXX]"],
    ["อีเมลบริษัท", s?.email || "[อีเมล]"],
    ["Facebook", s?.facebook_url || "[ชื่อเพจ]"],
    ["ที่อยู่สำนักงาน", s?.address || "[ที่อยู่บริษัทแบบเต็ม]"],
    ["เวลาทำการ", s?.business_hours || "[วัน] เวลา [เวลา]"],
  ];

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "ติดต่อเรา" },
        ]}
        title="ติดต่อเรา"
        lead="ช่องทางที่เร็วที่สุดคือ LINE เพราะเราตอบและส่งเอกสารกันทางนั้นอยู่แล้ว"
      />

      <section className="sec">
        <div className="wrapx side">
          <aside className="aside col" style={{ gap: 20 }}>
            <div
              className="card col"
              style={{ padding: 30, background: "var(--paper2)", alignItems: "center", gap: 16 }}
            >
              <h2 className="f23">คุยกับเราทาง LINE</h2>
              <div style={{ background: "#fff", padding: 8, borderRadius: 10 }}>
                <Image
                  src="/line-qr.png"
                  alt="LINE QR Code อัล ฟายาร์ด 1441"
                  width={172}
                  height={172}
                />
              </div>
              <span className="f20" style={{ fontFamily: "var(--font-trirong)" }}>
                @{s?.line_id || "[line-id]"}
              </span>
              <a href={lineHref} className="btn w" target="_blank" rel="noreferrer">
                เปิด LINE
              </a>
              <span className="mute sm" style={{ textAlign: "center" }}>
                โดยปกติจะตอบกลับภายในไม่นาน ทักมาได้เลย
              </span>
            </div>

            <div className="card col" style={{ padding: 24, gap: 16 }}>
              {rows.map(([k, v]) => (
                <div className="row top" style={{ gap: 14 }} key={k}>
                  <span style={{ flexShrink: 0, marginTop: 5 }}>
                    <Star size={16} color="#C0904F" />
                  </span>
                  <div className="col" style={{ gap: 2, minWidth: 0 }}>
                    <span className="mute sm">{k}</span>
                    <span>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="main col" style={{ gap: 22 }}>
            <ContactForm />

            <div className="col" style={{ gap: 12 }}>
              <h3 className="f20">แผนที่สำนักงาน</h3>
              <ImageBox className="ih-map" label="แผนที่ (Google Maps)" />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
