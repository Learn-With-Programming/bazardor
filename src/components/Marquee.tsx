"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { toBnNumber } from "@/lib/bengali";
import { Product } from "@/types";

export default function Marquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0) {
    return (
      <div className="bg-white border-b border-gray-100 py-1.5 sm:py-2 overflow-hidden">
        <div className="text-center text-[10px] sm:text-xs text-gray-400">
          দাম লোড হচ্ছে...
        </div>
      </div>
    );
  }

  const items = [...products, ...products];

  return (
    <div className="bg-white border-b border-gray-100 py-1.5 sm:py-2 overflow-hidden">
      <div className="marquee-track">
        {items.map((p, i) => {
          const isUp = p.changeDir === "up";
          const isFlat = p.changeDir === "flat" || p.change === 0;
          const color = isFlat
            ? "text-gray-500"
            : isUp
            ? "text-red-500"
            : "text-green-600";
          const arrow = isFlat ? "—" : isUp ? "▲" : "▼";

          return (
            <span
              key={i}
              className="flex items-center gap-1 text-[11px] sm:text-xs md:text-sm font-medium text-gray-700 shrink-0"
            >
              <span className="text-sm sm:text-base">{p.emoji}</span>
              <span>{p.name}</span>
              <span className="text-gray-500">
                {toBnNumber(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
              </span>
              <span className={`${color} font-semibold`}>
                {arrow} {toBnNumber(Math.abs(p.change).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}