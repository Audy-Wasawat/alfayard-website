import { cache } from "react";
import { createServerClient } from "./supabase";

// cache() กัน fetch ซ้ำถ้าหลายคอมโพเนนต์ในหน้าเดียวกันขอข้อมูลเดียวกัน
// (เช่น Header กับ Footer ต่างก็ใช้ site_settings)

export const getSiteSettings = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase.from("site_settings").select("*").single();
  return data;
});

export const getServices = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("order_index");
  return data || [];
});

export const getServiceBySlug = cache(async (slug) => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
});

export const getDifferentiators = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("differentiators")
    .select("*")
    .eq("is_active", true)
    .order("order_index");
  return data || [];
});

export const getPromotions = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_published", true)
    .order("order_index");
  return data || [];
});

export const getPromotionBySlug = cache(async (slug) => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("promotions")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
});

export const getPortfolioTrips = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("portfolio_trips")
    .select("*")
    .eq("is_published", true)
    .order("year", { ascending: false })
    .order("order_index");
  return data || [];
});

export const getPortfolioTripBySlug = cache(async (slug) => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("portfolio_trips")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  return data;
});

export const getPortfolioPhotos = cache(async (tripId) => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("portfolio_photos")
    .select("*")
    .eq("trip_id", tripId)
    .order("order_index");
  return data || [];
});

export const getTeamMembers = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("order_index");
  return data || [];
});

export const getFaqCategories = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("faq_categories")
    .select("*")
    .order("order_index");
  return data || [];
});

export const getFaqs = cache(async () => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("order_index");
  return data || [];
});

// จัดกลุ่มปี พ.ศ. ของทริปผลงาน (year ในตารางเก็บเป็น ค.ศ.)
export function groupTripsByYear(trips) {
  const map = new Map();
  for (const t of trips) {
    const beYear = t.year + 543;
    if (!map.has(beYear)) map.set(beYear, []);
    map.get(beYear).push(t);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export function toThaiYear(ceYear) {
  return ceYear ? ceYear + 543 : null;
}

const THAI_MONTHS = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

export function formatThaiDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return `${d.getDate()} ${THAI_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export function formatPrice(n) {
  if (n === null || n === undefined) return "[ราคา]";
  return Number(n).toLocaleString("th-TH");
}

const TYPE_LABEL = { hajj: "ฮัจญ์", umrah: "อุมเราะห์" };
export function typeLabel(type) {
  return TYPE_LABEL[type] || type;
}

const STATUS_LABEL = {
  open: "เปิดรับสมัคร",
  almost_full: "ใกล้เต็ม",
  closed: "ปิดรับแล้ว",
};
export function statusLabel(status) {
  return STATUS_LABEL[status] || status;
}
export function statusPillClass(status) {
  if (status === "almost_full") return "pill warn";
  if (status === "closed") return "pill off";
  return "pill";
}
