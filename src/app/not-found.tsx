// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-7xl mb-4">🛒❓</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">৪০৪</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg transition"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}