import Link from "next/link";
import ImageBox from "./ImageBox";
import { IconCalendar, IconClock, IconArrow } from "./icons";
import {
  formatPrice,
  formatThaiDate,
  statusLabel,
  statusPillClass,
  typeLabel,
} from "@/lib/data";

export default function PromoCard({ promo, eager = false }) {
  const price = formatPrice(promo.price);
  const closed = promo.status === "closed";
  return (
    <Link href={`/promotions/${promo.slug}`} className={`card pcard${closed ? " closed" : ""}`}>
      <ImageBox
        className="pimg"
        driveId={promo.poster_image_drive_id}
        width={600}
        label={`โปสเตอร์ ${promo.name}`}
        eager={eager}
      >
        <div className="badges">
          <span className="pill gold">{typeLabel(promo.type)}</span>
          <span className={statusPillClass(promo.status)}>{statusLabel(promo.status)}</span>
        </div>
      </ImageBox>
      <div className="body">
        <h3>{promo.name}</h3>
        <div className="pmeta">
          {promo.departure_date && (
            <span>
              <IconCalendar /> ออกเดินทาง {formatThaiDate(promo.departure_date)}
            </span>
          )}
          {promo.duration_days && (
            <span>
              <IconClock w={16} /> {promo.duration_days} วัน
            </span>
          )}
        </div>
        <div className="pfoot">
          <div>
            <span className="price-label">ราคาเริ่มต้น</span>
            {price ? (
              <span className="price">
                ฿{price} <small>/ ท่าน</small>
              </span>
            ) : (
              <span className="price" style={{ fontSize: 20 }}>สอบถามราคา</span>
            )}
          </div>
          <span className="more">
            รายละเอียด <IconArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
