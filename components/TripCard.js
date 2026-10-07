import Link from "next/link";
import ImageBox from "./ImageBox";
import { IconCalendar, IconImage } from "./icons";
import { typeLabel, formatThaiDate, toThaiYear } from "@/lib/data";

// ถ้ายังไม่มีวันที่เดินทาง แสดงแค่ปี
export default function TripCard({ trip, photoCount }) {
  const when = trip.trip_date_start
    ? formatThaiDate(trip.trip_date_start)
    : `ปี ${toThaiYear(trip.year)}`;
  return (
    <Link href={`/portfolio/${trip.slug}`} className="tcard">
      <ImageBox driveId={trip.cover_image_drive_id} width={700} label={trip.name} />
      <div className="body">
        <span className="pill">{typeLabel(trip.type)}</span>
        <h3>{trip.name}</h3>
        <div className="meta">
          <span className="row" style={{ gap: 6 }}>
            <IconCalendar w={15} /> {when}
          </span>
          {photoCount ? (
            <span className="row" style={{ gap: 6 }}>
              <IconImage w={15} /> {photoCount} รูป
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
