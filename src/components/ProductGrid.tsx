import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: Props) {
  const cols =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid ${cols} gap-3 sm:gap-4`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}