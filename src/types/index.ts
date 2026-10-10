// src/types/index.ts
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  changeDir: "up" | "down" | "flat";
  category: string;
  categoryName: string;
  categoryIcon: string;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  markets?: Market[];
}

export interface Category {
  id: string;   // ← string
  name: string;
  slug: string;
  icon: string;
}