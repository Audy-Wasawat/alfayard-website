import Link from "next/link";
import { Star } from "./icons";

export default function Band({ title, lead, btnLabel, btnHref = "/contact" }) {
  return (
    <section className="band">
      <div className="motif">
        <Star size={300} color="#ffffff" />
      </div>
      <div className="wrapx">
        <div className="col" style={{ gap: 10 }}>
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
        <Link href={btnHref} className="btn">
          {btnLabel}
        </Link>
      </div>
    </section>
  );
}
