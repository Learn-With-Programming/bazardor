"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";

interface NavLinksProps {
  categories: Category[];
}

export default function NavLinks({ categories }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2">
      {categories.map((cat) => {
        const href = `/category/${cat.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={cat.slug}
            href={href}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm whitespace-nowrap transition shrink-0 ${
              isActive
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="text-xs sm:text-sm">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}