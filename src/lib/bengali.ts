// lib/bengali.ts

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// ---------- বাংলা সংখ্যা ----------
export function toBnNumber(num: number | string): string {
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

// ---------- বাংলা তারিখ ----------
export function getBanglaDate(): string {
  const months = [
    "বৈশাখ",
    "জ্যৈষ্ঠ",
    "আষাঢ়",
    "শ্রাবণ",
    "ভাদ্র",
    "আশ্বিন",
    "কার্তিক",
    "অগ্রহায়ণ",
    "পৌষ",
    "মাঘ",
    "ফাল্গুন",
    "চৈত্র",
  ];
  const now = new Date();
  const enMonth = now.getMonth(); // 0-11
  // ইংরেজি → বঙ্গাব্দ আনুমানিক ম্যাপিং
  const bnMonthIndex = (enMonth + 9) % 12;
  const bnDay = toBnNumber(now.getDate());
  const bnYear = toBnNumber(now.getFullYear() - 593);
  return `${bnDay} ${months[bnMonthIndex]}, ${bnYear}`;
}

// ---------- বাংলা ইউনিট ----------
export function toBnUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "ltr":
    case "liter":
    case "litre":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "pcs":
    case "piece":
      return "প্রতি পিস";
    case "gm":
    case "gram":
      return "প্রতি গ্রাম";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি কেজি";
  }
}