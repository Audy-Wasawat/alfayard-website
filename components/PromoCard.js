import Link from "next/link";
import ImageBox from "./ImageBox";
import { formatPrice, statusLabel, statusPillClass, typeLabel } from "@/lib/data";

export default function PromoCard({ promo }) {
  return (
    <article className="card pcard">
      <ImageBox
        driveId={promo.poster_image_drive_id}
        width={500}
        label="โปสเตอร์ทริป"
      />
      <div className="body">
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="pill">{typeLabel(promo.type)}</span>
          <span className={statusPillClass(promo.status)}>
            {statusLabel(promo.status)}
          </span>
        </div>
        <h3>{promo.name}</h3>
        <p className="mute sm">
          {promo.duration_days ? `${promo.duration_days} วัน` : "[จำนวนวัน]"}
          {" · "}
          {promo.departure_date
            ? `ออกเดินทาง ${promo.departure_date}`
            : "ออกเดินทาง [วันที่]"}
        </p>
        <div className="price">
          ฿ {formatPrice(promo.price)} <small>/ ท่าน</small>
        </div>
        <Link
          href={`/promotions/${promo.slug}`}
          className="btn solid w"
          style={{ marginTop: 4 }}
        >
          ดูรายละเอียด
        </Link>
      </div>
    </article>
  );
}
