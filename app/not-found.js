import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = { title: "ไม่พบหน้านี้ | อัล ฟายาร์ด 1441" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <section className="sec nf" id="main">
        <div className="wrapx col center" style={{ gap: 16 }}>
          <span className="code">404</span>
          <h1 className="f32">ไม่พบหน้าที่คุณกำลังหา</h1>
          <p className="mute">หน้านี้อาจถูกย้ายหรือลบไปแล้ว ลองกลับไปที่หน้าแรกหรือดูโปรโมชั่นปัจจุบัน</p>
          <div className="row wrap" style={{ gap: 12, justifyContent: "center", paddingTop: 8 }}>
            <Link href="/" className="btn solid">กลับหน้าแรก</Link>
            <Link href="/promotions" className="btn out">ดูโปรโมชั่น</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
