import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FaqBrowser from "@/components/FaqBrowser";
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
          <FaqBrowser categories={categories} faqs={faqs} />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
