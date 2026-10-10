"use client";

import { useProtected } from "@/lib/useProtected";
import { toBnNumber } from "@/lib/bengali";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { isPending, isAuthenticated } = useProtected();

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  const markets = product.markets ?? [];
  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.price;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.price;
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length
      )
    : product.price;

  const isUp = product.changeDir === "up";
  const isFlat = product.changeDir === "flat" || product.change === 0;
  const arrow = isFlat ? "—" : isUp ? "▲" : "▼";
  const badgeColor = isFlat
    ? "bg-gray-100 text-gray-600"
    : isUp
    ? "bg-red-50 text-red-500"
    : "bg-green-50 text-green-600";

  return (
    <div className="space-y-6">
      {/* Summary Top */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-4xl shrink-0">
            {product.emoji}
          </div>
          <div className="flex-1 min-w-50">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              {product.categoryName} — বাজারের সর্বশেষ দাম
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                {product.categoryIcon} {product.categoryName}
              </span>
              <span className="text-xs text-gray-500">{product.unit}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}
              >
                {arrow} {toBnNumber(Math.abs(product.change).toFixed(1))}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-gray-400 mb-1">আজকের দাম</div>
            <div className="text-2xl font-bold text-gray-900">
              {toBnNumber(product.price)}{" "}
              <span className="text-sm font-medium text-gray-500">টাকা</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">সর্বনিম্ন দাম</div>
          <div className="text-xl font-bold text-green-600">
            {toBnNumber(minPrice)} টাকা
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">সর্বোচ্চ দাম</div>
          <div className="text-xl font-bold text-red-500">
            {toBnNumber(maxPrice)} টাকা
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">গড় দাম</div>
          <div className="text-xl font-bold text-gray-800">
            {toBnNumber(avgPrice)} টাকা
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক টেবিল */}
      {markets.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">বাজার</th>
                  <th className="text-left px-5 py-3 font-medium">বিভাগ</th>
                  <th className="text-right px-5 py-3 font-medium">সর্বনিম্ন</th>
                  <th className="text-right px-5 py-3 font-medium">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 text-gray-700">{m.market}</td>
                    <td className="px-5 py-3 text-gray-500">{m.division}</td>
                    <td className="px-5 py-3 text-right text-green-600">
                      {toBnNumber(m.min)} টাকা
                    </td>
                    <td className="px-5 py-3 text-right text-red-500">
                      {toBnNumber(m.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}