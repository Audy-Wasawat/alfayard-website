import PageHead from "@/components/PageHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Band from "@/components/Band";
import TripCard from "@/components/TripCard";
import { getPortfolioTrips, groupTripsByYear } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "ผลงานที่ผ่านมา | อัล ฟายาร์ด 1441",
};

export default async function PortfolioPage() {
  const trips = await getPortfolioTrips();
  const groups = groupTripsByYear(trips);

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "ผลงานที่ผ่านมา" },
        ]}
        title="ผลงานที่ผ่านมา"
        lead="ภาพบรรยากาศจริงจากทริปที่เราพาเดินทางไปแล้ว จัดเรียงตามปี"
      />

      <section className="sec">
        <div className="wrapx col" style={{ gap: 48 }}>
          {groups.length > 0 ? (
            groups.map(([year, yearTrips]) => (
              <div className="col" style={{ gap: 22 }} key={year}>
                <div className="row" style={{ gap: 18 }}>
                  <h2 className="f28" style={{ whiteSpace: "nowrap" }}>
                    ปี {year}
                  </h2>
                  <div style={{ height: 1, background: "var(--line)", flexGrow: 1 }} />
                  <span className="mute sm" style={{ whiteSpace: "nowrap" }}>
                    {yearTrips.length} ทริป
                  </span>
                </div>
                <div className="g3">
                  {yearTrips.map((t) => (
                    <TripCard trip={t} key={t.id} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="mute">ยังไม่มีผลงานที่เผยแพร่ในตอนนี้</p>
          )}
        </div>
      </section>

      <Band
        title="อยากร่วมเดินทางกับเราครั้งหน้า?"
        lead="ดูรอบที่กำลังเปิดรับสมัครได้เลย"
        btnLabel="ดูโปรโมชั่นปัจจุบัน"
        btnHref="/promotions"
      />
      <SiteFooter />
    </>
  );
}
