// components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="w-12 h-6 rounded-full bg-gray-200"></div>
      </div>
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 w-1/2 bg-gray-100 rounded mb-3"></div>
      <div className="border-t border-dashed border-gray-100 pt-3 flex justify-between items-center">
        <div className="h-3 w-16 bg-gray-100 rounded"></div>
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}