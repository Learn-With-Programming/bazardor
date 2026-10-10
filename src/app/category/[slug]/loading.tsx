// app/category/[slug]/loading.tsx
import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-48 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Sort skeleton */}
      <div className="flex justify-end mb-4">
        <div className="h-9 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}