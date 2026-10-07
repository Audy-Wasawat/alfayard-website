import { IconLine } from "./icons";

// ปุ่ม LINE ลอยมุมขวาล่างทุกหน้า — ช่องทางหลักของธุรกิจ กดได้ทันทีไม่ต้องเลื่อนหา
export default function LineFab({ href }) {
  return (
    <a
      href={href}
      className="fab-line"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="แชทกับเราทาง LINE"
    >
      <IconLine w={26} />
      <span className="t">แชท LINE</span>
    </a>
  );
}
