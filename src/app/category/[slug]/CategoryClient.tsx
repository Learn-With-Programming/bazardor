// app/category/[slug]/CategoryClient.tsx
"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import SortDropdown from "@/components/SortDropdown";
import { SortOption, sortProducts } from "@/lib/sort";
import { Product } from "@/types";

interface Props {
  products: Product[];
}

export default function CategoryClient({ products }: Props) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(
    () => sortProducts(products, sort),
    [products, sort]
  );

  return (
    <>
      {/* Sort control row */}
      <div className="flex items-center justify-end mb-4">
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <ProductGrid products={sorted} />
    </>
  );
}