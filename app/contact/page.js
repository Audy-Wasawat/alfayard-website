import Image from "next/image";
import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { IconPhone, IconMail, IconPin, IconClock, IconLine, IconFacebook } from "@/components/icons";
import { getSiteSettings } from "@/lib/data";
import { lineUrl, telHref, mailHref } from "@/lib/site";

export const revalidate = 60;

export const metadata = {
  title: "ติดต่อเรา | อัล ฟายาร์ด 1441",
};

const MAP_Q = "8.407917265656435,98.64228967775978";

export default async function ContactPage() {
  const s = await getSiteSettings();

  const rows = [
    s?.phone && [IconPhone, "โทรศัพท์", s.phone, telHref(s.phone)],
    s?.email && [IconMail, "อีเมลบริษัท", s.email, mailHref(s.email)],
    s?.facebook_url && [IconFacebook, "Facebook", "เพจ อัล ฟายาร์ด 1441", s.facebook_url, true],
    s?.address && [IconPin, "ที่อยู่สำนักงาน", s.address, `https://www.google.com/maps/search/?api=1&query=${MAP_Q}`, true],
    [IconClock, "เวลาทำการ", s?.business_hours || "ทุกวัน 07:00–21:00 น."],
  ].filter(Boolean);

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
              style={{ padding: 30, alignItems: "center", gap: 14, textAlign: "center" }}
            >
              <span className="icon-badge" style={{ background: "#E6F9EE", color: "var(--line-green)" }}>
                <IconLine w={30} />
              </span>
              <h2 className="f23">คุยกับเราทาง LINE</h2>
              <div style={{ background: "#fff", padding: 10, borderRadius: 16, border: "1px solid var(--line)" }}>
                <Image src="/line-qr.png" alt="QR Code สำหรับเพิ่มเพื่อน LINE อัล ฟายาร์ด 1441" width={168} height={168} />
              </div>
              <span className="mute sm">
                สแกน QR หรือกดปุ่มด้านล่าง{s?.line_id ? ` · LINE ID: ${s.line_id}` : ""}
              </span>
              <a href={lineUrl()} className="btn line w" target="_blank" rel="noopener noreferrer">
                <IconLine w={22} /> เปิด LINE
              </a>
              <span className="mute sm">ทางเราจะตอบกลับโดยเร็ว</span>
            </div>

            <div className="card col" style={{ padding: 26 }}>
              {rows.map(([Ic, k, v, href, ext]) => (
                <div className="info" key={k}>
                  <span className="icon-badge sm"><Ic w={18} /></span>
                  <div className="col" style={{ minWidth: 0 }}>
                    <span className="k">{k}</span>
                    {href ? (
                      <a
                        className="v"
                        href={href}
                        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {v}
                      </a>
                    ) : (
                      <span className="v">{v}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="main col" style={{ gap: 28 }}>
            <ContactForm />

            <div className="col" style={{ gap: 12 }}>
              <div className="row between wrap" style={{ gap: 10 }}>
                <h3 className="f20">แผนที่สำนักงาน</h3>
                <a
                  className="more"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  นำทางด้วย Google Maps
                </a>
              </div>
              <div className="ih-map" style={{ overflow: "hidden", borderRadius: "var(--r)", border: "1px solid var(--line)" }}>
                <iframe
                  title="แผนที่สำนักงาน อัล ฟายาร์ด 1441"
                  src={`https://maps.google.com/maps?q=${MAP_Q}&z=17&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
