import Link from "next/link";

export function Crumb({ parts }) {
  return (
    <nav className="crumb" aria-label="breadcrumb">
      {parts.map((p, i) =>
        i === parts.length - 1 ? (
          <span key={p.label} aria-current="page">{p.label}</span>
        ) : (
          <span key={p.label} className="row" style={{ gap: 6 }}>
            <Link href={p.href}>{p.label}</Link>
            <span className="sep">/</span>
          </span>
        )
      )}
    </nav>
  );
}

// แถบ breadcrumb บาง ๆ สำหรับหน้ารายละเอียด (โปรโมชั่น/ผลงาน)
export function CrumbBar({ parts }) {
  return (
    <div className="crumbbar" id="main">
      <div className="wrapx">
        <Crumb parts={parts} />
      </div>
    </div>
  );
}

export default function PageHead({ parts, title, lead }) {
  return (
    <section className="phead" id="main">
      <div className="wrapx">
        <Crumb parts={parts} />
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </div>
    </section>
  );
}
