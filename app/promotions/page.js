import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import PromoCard from "@/components/PromoCard";
import { getPromotions } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "โปรโมชั่นและแพ็กเกจ | อัล ฟายาร์ด 1441",
};

export default async function PromotionsPage() {
  const promos = await getPromotions();

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "โปรโมชั่น" },
        ]}
        title="โปรโมชั่นและแพ็กเกจ"
        lead="ทริปที่กำลังเปิดรับสมัคร พร้อมราคาและรายละเอียดแพ็กเกจ สนใจรอบไหนทักมาถามได้เลย"
      />

      <section className="sec">
        <div className="wrapx">
          <p className="mute sm" style={{ marginBottom: 24 }}>
            พบ {promos.length} รายการ
          </p>
          {promos.length > 0 ? (
            <div className="g3">
              {promos.map((p) => (
                <PromoCard promo={p} key={p.id} />
              ))}
            </div>
          ) : (
            <p className="mute">ตอนนี้ยังไม่มีโปรโมชั่นที่เปิดรับสมัคร ติดตามได้เร็ว ๆ นี้</p>
          )}
        </div>
      </section>

      <Band
        title="อยากได้แพ็กเกจแบบกลุ่มส่วนตัว?"
        lead="รวมกลุ่มกันมาเองได้ เราจัดรอบและราคาให้ตามจำนวนคน"
        btnLabel="คุยกับเราทาง LINE"
        btnHref="/contact"
      />
      <SiteFooter />
    </>
  );
}
