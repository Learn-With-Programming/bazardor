import EmptyState from "@/components/EmptyState";
import { getCategory, getProductsByCategory } from "@/lib/api";
import CategoryClient from "./CategoryClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params; // ✅ await আবশ্যক

  const category = await getCategory(slug);

  if (!category) {
    return (
      <EmptyState
        title="ক্যাটাগরি পাওয়া যায়নি"
        message={`"${slug}" নামে কোনো ক্যাটাগরি নেই।`}
      />
    );
  }

  const products = await getProductsByCategory(slug);

  return (
    <div>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
          {category.icon || "📦"}
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
            {category.name}
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">
            {category.name} ক্যাটাগরির সর্বমোট {products.length} টি পণ্য
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="কোনো পণ্য পাওয়া যায়নি"
          message={`${category.name} ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য নেই।`}
        />
      ) : (
        <CategoryClient products={products} />
      )}
    </div>
  );
}
