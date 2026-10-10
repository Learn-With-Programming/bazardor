// lib/sort.ts
import { Product } from "@/types";

export type SortOption = "default" | "price-asc" | "price-desc";

export function sortProducts(products: Product[], option: SortOption): Product[] {
  const arr = [...products];
  switch (option) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    default:
      return arr;
  }
}

export function topRisers(products: Product[], n = 6): Product[] {
  return [...products]
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, n);
}

export function topFallers(products: Product[], n = 6): Product[] {
  return [...products]
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, n);
}