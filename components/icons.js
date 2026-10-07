// ไอคอน SVG ทั้งเว็บ + ดาว 8 แฉกจากโลโก้ (สีตาม currentColor ยกเว้น Star ที่ส่งสีได้)

export function Star({ size = 24, color = "#C0904F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="21" y="21" width="58" height="58" fill={color} />
      <rect x="21" y="21" width="58" height="58" fill={color} transform="rotate(45 50 50)" />
    </svg>
  );
}

function Sv({ children, w = 22, sw = 2 }) {
  return (
    <svg
      width={w}
      height={w}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconBurger = ({ w = 22 }) => (
  <Sv w={w}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Sv>
);
export const IconClose = ({ w = 22 }) => (
  <Sv w={w}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Sv>
);
export const IconChevron = ({ w = 14 }) => <Sv w={w}><polyline points="6 9 12 15 18 9" /></Sv>;
export const IconChevronR = ({ w = 16 }) => <Sv w={w}><polyline points="9 6 15 12 9 18" /></Sv>;
export const IconChevronL = ({ w = 16 }) => <Sv w={w}><polyline points="15 6 9 12 15 18" /></Sv>;
export const IconArrow = ({ w = 16 }) => (
  <Sv w={w}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></Sv>
);
export const IconCheck = ({ w = 14 }) => <Sv w={w} sw={2.6}><polyline points="5 12 10 17 19 7" /></Sv>;
export const IconCross = ({ w = 12 }) => (
  <Sv w={w} sw={2.6}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Sv>
);
export const IconPhone = ({ w = 18 }) => (
  <Sv w={w}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Sv>
);
export const IconMail = ({ w = 18 }) => (
  <Sv w={w}><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></Sv>
);
export const IconPin = ({ w = 18 }) => (
  <Sv w={w}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></Sv>
);
export const IconClock = ({ w = 18 }) => (
  <Sv w={w}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></Sv>
);
export const IconCalendar = ({ w = 16 }) => (
  <Sv w={w}><rect x="3" y="5" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></Sv>
);
export const IconPlane = ({ w = 16 }) => (
  <Sv w={w}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></Sv>
);
export const IconHotel = ({ w = 16 }) => (
  <Sv w={w}><path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M15 9h4a2 2 0 0 1 2 2v10" /><line x1="2" y1="21" x2="22" y2="21" /><line x1="7" y1="7" x2="11" y2="7" /><line x1="7" y1="11" x2="11" y2="11" /><line x1="7" y1="15" x2="11" y2="15" /></Sv>
);
export const IconUsers = ({ w = 16 }) => (
  <Sv w={w}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></Sv>
);
export const IconImage = ({ w = 16 }) => (
  <Sv w={w}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Sv>
);
export const IconShield = ({ w = 16 }) => (
  <Sv w={w}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></Sv>
);
export const IconDoc = ({ w = 22 }) => (
  <Sv w={w}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></Sv>
);
export const IconKaaba = ({ w = 22 }) => (
  <Sv w={w}><path d="M4 8l8-4 8 4v10l-8 4-8-4z" /><path d="M4 8l8 4 8-4" /><line x1="12" y1="12" x2="12" y2="22" /><path d="M4 11.5l8 4 8-4" /></Sv>
);
export const IconMosque = ({ w = 22 }) => (
  <Sv w={w}><path d="M6 21v-7a6 6 0 0 1 12 0v7" /><path d="M12 4c-1 1.2-1.6 2.3-1.6 3.2A1.6 1.6 0 0 0 12 8.8a1.6 1.6 0 0 0 1.6-1.6C13.6 6.3 13 5.2 12 4z" /><line x1="2" y1="21" x2="22" y2="21" /><line x1="3" y1="21" x2="3" y2="11" /><line x1="21" y1="21" x2="21" y2="11" /><path d="M10 21v-3a2 2 0 0 1 4 0v3" /></Sv>
);
export const IconDownload = ({ w = 16 }) => (
  <Sv w={w}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Sv>
);
export const IconInfo = ({ w = 18 }) => (
  <Sv w={w}><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="8" x2="12" y2="8" /></Sv>
);

// โลโก้ LINE (ทรงฟองคำพูด) — เติมสีด้วย currentColor
export function IconLine({ w = 20 }) {
  return (
    <svg width={w} height={w} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2.5C6.2 2.5 1.5 6.3 1.5 11c0 4.2 3.7 7.7 8.8 8.4.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6 1.1-.5 6-3.5 8.2-6.1 1.5-1.7 2.3-3.4 2.3-5.3 0-4.7-4.7-8.5-10.5-8.5zM8.3 13.6H6.2c-.3 0-.5-.2-.5-.5V8.9c0-.3.2-.5.5-.5s.5.2.5.5v3.7h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm2.2-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.9c0-.3.2-.5.5-.5s.5.2.5.5v4.2zm5 0c0 .2-.1.4-.3.5h-.2c-.2 0-.3-.1-.4-.2l-2.1-2.9v2.6c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.9c0-.2.1-.4.3-.5h.2c.2 0 .3.1.4.2l2.1 2.9V8.9c0-.3.2-.5.5-.5s.5.2.5.5v4.2zm3.4-2.6c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.9c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1h1.6z" />
    </svg>
  );
}

export function IconFacebook({ w = 18 }) {
  return (
    <svg width={w} height={w} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  );
}
