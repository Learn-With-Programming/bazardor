"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/bengali";

export default function Hero() {
  const [bnDate, setBnDate] = useState("");

  useEffect(() => {
    setBnDate(getBanglaDate());
  }, []);

  return (
    <section className="bg-linear-to-br from-green-50 via-white to-green-50/40 rounded-2xl border border-green-100 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 mb-8 md:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-[10px] sm:text-xs md:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse"></span>
            <span>বাজারদর, {bnDate || "আজ"}</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-3 sm:mb-4">
            আজকের বাজারদর দাম <span className="text-green-600">এক নজরে</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম — প্রয়োজনীয় নিত্যপণ্যের
            সর্বশেষ বাজারদর এক জায়গায়। প্রতিদিন আপডেটেড, সঠিক ও নির্ভরযোগ্য।
          </p>

          <Link
            href="#সব-পণ্য"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition shadow-sm hover:shadow-md"
          >
            <span>সব পণ্য</span>
            <span className="text-base sm:text-lg">→</span>
          </Link>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="absolute inset-0 bg-green-200/30 blur-3xl rounded-full"></div>
            <Image
              src="/bazar-hero.png"
              alt="সবজির ঝুড়ি"
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
              className="object-contain drop-shadow-xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
