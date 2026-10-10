"use client";

import Link from "next/link";
import { toBnNumber } from "@/lib/bengali";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { name, slug, emoji, unit, price, change, changeDir } = product;

  const isUp = changeDir === "up";
  const isFlat = changeDir === "flat" || change === 0;
  const arrow = isFlat ? "—" : isUp ? "▲" : "▼";
  const badgeColor = isFlat
    ? "bg-gray-100 text-gray-500"
    : isUp
    ? "bg-red-50 text-red-500"
    : "bg-green-50 text-green-600";

  return (
    <Link
      href={`/product/${slug}`}
      className="group block bg-white border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-2.5 sm:mb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-105 transition-transform">
          {emoji}
        </div>
        <span
          className={`text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ${badgeColor}`}
        >
          {arrow} {toBnNumber(Math.abs(change).toFixed(1))}%
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-0.5 sm:mb-1 line-clamp-1">
        {name}
      </h3>

      <p className="text-[11px] sm:text-xs text-gray-500 mb-2.5 sm:mb-3">
        {unit}
      </p>

      <div className="flex items-center justify-between border-t border-dashed border-gray-100 pt-2.5 sm:pt-3">
        <span className="text-[10px] sm:text-[11px] text-gray-400">
          আজকের দাম
        </span>
        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
          {toBnNumber(price)}{" "}
          <span className="text-[10px] sm:text-xs font-medium text-gray-500">
            টাকা
          </span>
        </span>
      </div>
    </Link>
  );
}