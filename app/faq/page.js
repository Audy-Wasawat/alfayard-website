import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconMinus, IconPlus } from "@/components/icons";
import { getFaqCategories, getFaqs } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "คำถามที่พบบ่อย | อัล ฟายาร์ด 1441",
};

export default async function FaqPage() {
  const [categories, faqs] = await Promise.all([getFaqCategories(), getFaqs()]);

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "คำถามที่พบบ่อย" },
        ]}
        title="คำถามที่พบบ่อย"
        lead="รวมคำถามที่ลูกค้าถามเข้ามาบ่อยที่สุด ถ้าไม่เจอคำตอบที่ต้องการ ทักไลน์มาถามได้เลย"
      />

      <section className="sec">
        <div className="wrapx side">
          <aside className="aside sm col" style={{ gap: 14 }}>
            <h3 className="f17">หมวดคำถาม</h3>
            <div className="col wrap" style={{ gap: 10 }}>
              {categories.map((c, i) => (
                <span key={c.id} className={i === 0 ? "chip on" : "chip"}>
                  {c.name}
                </span>
              ))}
            </div>
          </aside>

          <div className="main acc">
            {faqs.map((f, i) => (
              <details key={f.id} className="qa" open={i === 0}>
                <summary className="q">
                  <h3>{f.question}</h3>
                  <span className="ic-plus"><IconPlus /></span>
                  <span className="ic-minus"><IconMinus /></span>
                </summary>
                <div className="a">{f.answer}</div>
              </details>
            ))}

            <div
              className="card row between stackm"
              style={{ gap: 22, padding: 26, background: "var(--paper2)", marginTop: 18 }}
            >
              <div className="col" style={{ gap: 6 }}>
                <h3 className="f20">ไม่พบคำตอบที่ต้องการ?</h3>
                <p className="mute sm">ทักไลน์มาถามได้เลย ตอบกลับภายในเวลาทำการ</p>
              </div>
              <a href="/contact" className="btn">
                ถามเราทาง LINE
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
