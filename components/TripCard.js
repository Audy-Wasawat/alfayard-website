import Link from "next/link";
import ImageBox from "./ImageBox";
import { typeLabel } from "@/lib/data";

export default function TripCard({ trip, photoCount }) {
  return (
    <Link href={`/portfolio/${trip.slug}`} className="card tcard">
      <ImageBox
        driveId={trip.cover_image_drive_id}
        width={450}
        label="ภาพปกทริป"
      />
      <div className="body">
        <span className="pill" style={{ alignSelf: "flex-start" }}>
          {typeLabel(trip.type)}
        </span>
        <h3>{trip.name}</h3>
        <p className="mute sm">
          {trip.trip_date_start ? trip.trip_date_start : `[เดือน ${trip.year + 543}]`}
          {photoCount !== undefined ? ` · ${photoCount} รูป` : ""}
        </p>
      </div>
    </Link>
  );
}
