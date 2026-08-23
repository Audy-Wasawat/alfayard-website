import Link from "next/link";

export function Crumb({ parts }) {
  return (
    <div className="crumb">
      {parts.map((p, i) =>
        i === parts.length - 1 ? (
          <span key={p.label}>{p.label}</span>
        ) : (
          <span key={p.label}>
            <Link href={p.href}>{p.label}</Link> /{" "}
          </span>
        )
      )}
    </div>
  );
}

export default function PageHead({ parts, title, lead }) {
  return (
    <section className="phead">
      <div className="wrapx">
        <Crumb parts={parts} />
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </div>
    </section>
  );
}
