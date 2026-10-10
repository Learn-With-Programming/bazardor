// components/EmptyState.tsx
import Link from "next/link";

interface Props {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "কোনো পণ্য পাওয়া যায়নি",
  message = "এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই।",
}: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-10 sm:p-16 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-3 rounded-lg transition"
      >
        <span>←</span> হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}