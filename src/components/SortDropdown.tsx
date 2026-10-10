// components/SortDropdown.tsx
"use client";

import { SortOption } from "@/lib/sort";

interface Props {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
        সাজান:
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}