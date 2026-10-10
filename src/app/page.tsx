import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";
import SkeletonCard from "@/components/SkeletonCard";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/sort";
import { Suspense } from "react";

async function RisersSection() {
  const products = await getProducts();
  const risers = topRisers(products, 6);
  return <ProductGrid products={risers} columns={3} />;
}

async function FallersSection() {
  const products = await getProducts();
  const fallers = topFallers(products, 6);
  return <ProductGrid products={fallers} columns={3} />;
}

async function AllProductsSection() {
  const products = await getProducts();
  return <ProductGrid products={products} columns={4} />;
}

function GridSkeleton({
  count = 6,
  columns = 3,
}: {
  count?: number;
  columns?: 3 | 4;
}) {
  const cols =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid ${cols} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Section A — আজ দাম বেড়েছে ▲ (3 cols) */}
      <section className="mb-10">
        <SectionHeader
          icon="▲"
          iconColor="text-red-500"
          title="আজ দাম বেড়েছে"
        />
        <Suspense fallback={<GridSkeleton count={6} columns={3} />}>
          <RisersSection />
        </Suspense>
      </section>

      {/* Section B — আজ দাম কমেছে ▼ (3 cols) */}
      <section className="mb-10">
        <SectionHeader
          icon="▼"
          iconColor="text-green-600"
          title="আজ দাম কমেছে"
        />
        <Suspense fallback={<GridSkeleton count={6} columns={3} />}>
          <FallersSection />
        </Suspense>
      </section>

      {/* Section C — সব পণ্য (4 cols) */}
      <section id="সব-পণ্য" className="mb-10 scroll-mt-40">
        <SectionHeader
          icon="🛒"
          iconColor="text-green-600"
          title="সব পণ্য"
          subtitle="বাজারের সকল নিত্যপণ্যের আজকের দাম"
        />
        <Suspense fallback={<GridSkeleton count={8} columns={4} />}>
          <AllProductsSection />
        </Suspense>
      </section>
    </>
  );
}