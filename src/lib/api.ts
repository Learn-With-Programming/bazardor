// lib/api.ts
import { Category, Market, Product } from "@/types";
import { toBnUnit } from "@/lib/bengali";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

// ---------- Type Guards ----------
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isArrayOfRecords(value: unknown): value is Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isRecord);
}

function unwrapArray(json: unknown): Record<string, unknown>[] {
  if (isArrayOfRecords(json)) return json;
  if (isRecord(json) && isArrayOfRecords(json.data)) return json.data;
  return [];
}

// ---------- Normalizers ----------
function normalizeMarket(raw: Record<string, unknown>): Market {
  return {
    market: typeof raw.market === "string" ? raw.market : "",
    division: typeof raw.division === "string" ? raw.division : "",
    min: typeof raw.min === "number" ? raw.min : 0,
    max: typeof raw.max === "number" ? raw.max : 0,
  };
}

function normalizeProduct(raw: Record<string, unknown>): Product {
  const changeObj = isRecord(raw.change) ? raw.change : {};
  const pct =
    typeof changeObj.pct === "number"
      ? changeObj.pct
      : typeof raw.change === "number"
      ? (raw.change as number)
      : 0;

  const dir =
    changeObj.dir === "up" || changeObj.dir === "down" || changeObj.dir === "flat"
      ? changeObj.dir
      : pct > 0
      ? "up"
      : pct < 0
      ? "down"
      : "flat";

  const markets = Array.isArray(raw.markets)
    ? (raw.markets as unknown[])
        .filter(isRecord)
        .map((m) => normalizeMarket(m as Record<string, unknown>))
    : [];

  const unitRaw = typeof raw.unit === "string" ? raw.unit : "kg";

  return {
    id: typeof raw.id === "number" ? raw.id : Number(raw.id) || 0,
    slug: typeof raw.slug === "string" ? raw.slug : String(raw.id ?? ""),
    name:
      typeof raw.nameBn === "string"
        ? raw.nameBn
        : typeof raw.name === "string"
        ? raw.name
        : "অজানা",
    emoji:
      typeof raw.image === "string"
        ? raw.image
        : typeof raw.emoji === "string"
        ? raw.emoji
        : "📦",
    unit: toBnUnit(unitRaw),
    price: typeof raw.today === "number" ? raw.today : 0,
    change: pct,
    changeDir: dir,
    category: typeof raw.category === "string" ? raw.category : "",
    categoryName:
      typeof raw.categoryNameBn === "string"
        ? raw.categoryNameBn
        : typeof raw.categoryName === "string"
        ? raw.categoryName
        : "",
    categoryIcon:
      typeof raw.categoryIcon === "string" ? raw.categoryIcon : "📦",
    yesterday: typeof raw.yesterday === "number" ? raw.yesterday : undefined,
    lastWeek: typeof raw.lastWeek === "number" ? raw.lastWeek : undefined,
    lastMonth: typeof raw.lastMonth === "number" ? raw.lastMonth : undefined,
    markets,
  };
}

function normalizeCategory(raw: Record<string, unknown>): Category {
  return {
    id: typeof raw.id === "string" ? raw.id : String(raw.id ?? ""),
    name:
      typeof raw.nameBn === "string"
        ? raw.nameBn
        : typeof raw.name === "string"
        ? raw.name
        : "অজানা",
    slug: typeof raw.slug === "string" ? raw.slug : "",
    icon: typeof raw.icon === "string" ? raw.icon : "📦",
  };
}

// ---------- Public API ----------
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    return unwrapArray(json).map(normalizeCategory);
  } catch {
    return [];
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: unknown = await res.json();
    if (isRecord(json)) {
      const obj = isRecord(json.data) ? json.data : json;
      return normalizeCategory(obj);
    }
    return null;
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    return unwrapArray(json).map(normalizeProduct);
  } catch {
    return [];
  }
}

export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    return unwrapArray(json).map(normalizeProduct);
  } catch {
    return [];
  }
}

// ✅ এই function-টাই নতুন version দিয়ে replace করা হলো
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    // ১. প্রথমে সরাসরি slug দিয়ে try করি
    const res = await fetch(`${BASE_URL}/products/${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const json: unknown = await res.json();
      if (isRecord(json)) {
        const obj = isRecord(json.data) ? json.data : json;
        return normalizeProduct(obj);
      }
    }

    // ২. ব্যর্থ হলে সব products আনি এবং slug মিলিয়ে দেখি
    const allRes = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!allRes.ok) return null;
    const allJson: unknown = await allRes.json();
    const all = unwrapArray(allJson).map(normalizeProduct);

    const found = all.find((p) => p.slug === slug);
    if (found) {
      // ৩. পাওয়া গেলে ID দিয়ে বিস্তারিত (markets সহ) আনি
      const byIdRes = await fetch(`${BASE_URL}/products/${found.id}`, {
        cache: "no-store",
      });
      if (byIdRes.ok) {
        const json: unknown = await byIdRes.json();
        if (isRecord(json)) {
          const obj = isRecord(json.data) ? json.data : json;
          return normalizeProduct(obj);
        }
      }
      return found;
    }

    return null;
  } catch {
    return null;
  }
}