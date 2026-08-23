// พอร์ตมาจาก style.mjs (canvas ต้นฉบับ) — SVG ไอคอนชุดเดิม + ดาว 8 แฉกจากโลโก้

export function Star({ size = 24, color = "#C0904F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="21" y="21" width="58" height="58" fill={color} />
      <rect
        x="21"
        y="21"
        width="58"
        height="58"
        fill={color}
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}

function Sv({ children, w = 22 }) {
  return (
    <svg
      width={w}
      height={w}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconBurger() {
  return (
    <span style={{ color: "var(--teal)", display: "flex" }}>
      <Sv w={22}>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </Sv>
    </span>
  );
}

export function IconChevron() {
  return (
    <span style={{ color: "var(--mute)", display: "flex" }}>
      <Sv w={14}>
        <polyline points="6 9 12 15 18 9" />
      </Sv>
    </span>
  );
}

export function IconPlus() {
  return (
    <span style={{ color: "var(--teal)", display: "flex", flexShrink: 0 }}>
      <Sv w={18}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </Sv>
    </span>
  );
}

export function IconMinus() {
  return (
    <span style={{ color: "var(--teal)", display: "flex", flexShrink: 0 }}>
      <Sv w={18}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </Sv>
    </span>
  );
}

export function IconCheck() {
  return (
    <span style={{ color: "var(--teal)", display: "flex" }}>
      <Sv w={17}>
        <polyline points="4 12 10 18 20 6" />
      </Sv>
    </span>
  );
}

export function IconCross() {
  return (
    <span style={{ color: "#A8B3B6", display: "flex" }}>
      <Sv w={17}>
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </Sv>
    </span>
  );
}
