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

  // ทริปปีปัจจุบันเป็นต้นไป → แยกตามปีตามเดิม
  // ทริปก่อนปีปัจจุบัน → รวมเป็นกลุ่มเดียว
  const THIS_YEAR = new Date().getFullYear(); // ค.ศ.
  const recentTrips = trips.filter((t) => t.year >= THIS_YEAR);
  const pastTrips   = trips.filter((t) => t.year <  THIS_YEAR);
  const recentGroups = groupTripsByYear(recentTrips); // [[beYear, trips], ...]

  return (
    <>
      <SiteHeader />
      <PageHead
        parts={[
          { label: "หน้าแรก", href: "/" },
          { label: "ผลงานที่ผ่านมา" },
        ]}
        title="ผลงานที่ผ่านมา"
        lead="ภาพบรรยากาศจริงจากทริปที่เราพาเดินทางไปแล้ว"
      />

      <section className="sec">
        <div className="wrapx col" style={{ gap: 36 }}>
          {trips.length === 0 && (
            <p className="mute">ยังไม่มีผลงานที่เผยแพร่ในตอนนี้</p>
          )}

          {/* ทริปปีนี้เป็นต้นไป — แยกตามปี */}
          {recentGroups.map(([year, yearTrips]) => (
            <div className="col" style={{ gap: 22 }} key={year}>
              <div className="row" style={{ gap: 18 }}>
                <h2 className="f28" style={{ whiteSpace: "nowrap" }}>
                  ปี {year}
                </h2>
                <div style={{ height: 1, background: "var(--line)", flexGrow: 1, minWidth: 20 }} />
                <span className="pill" style={{ whiteSpace: "nowrap" }}>
                  {yearTrips.length} ทริป
                </span>
              </div>
              <div className="g3">
                {yearTrips.map((t) => (
                  <TripCard trip={t} key={t.id} />
                ))}
              </div>
            </div>
          ))}

          {/* ทริปก่อนปีนี้ — รวมเป็นกลุ่มเดียว */}
          {pastTrips.length > 0 && (
            <div className="col" style={{ gap: 22 }}>
              <div className="row" style={{ gap: 18 }}>
                <h2 className="f28" style={{ whiteSpace: "nowrap" }}>
                  ทริปก่อนหน้า
                </h2>
                <div style={{ height: 1, background: "var(--line)", flexGrow: 1, minWidth: 20 }} />
                <span className="pill" style={{ whiteSpace: "nowrap" }}>
                  {pastTrips.length} ทริป
                </span>
              </div>
              <div className="g3">
                {pastTrips.map((t) => (
                  <TripCard trip={t} key={t.id} />
                ))}
              </div>
            </div>
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
