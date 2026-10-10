"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/bengali";
import { useSession, signOut } from "@/lib/auth-client";
import { Category } from "@/types";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [bnDate, setBnDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBnDate(getBanglaDate());
    getCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      setShowDropdown(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  const userName = session?.user?.name || "ব্যবহারকারী";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "";
  const userInitial = userName.charAt(0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ===== Upper Row: Logo + Auth ===== */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 rounded-lg flex items-center justify-center text-white text-base sm:text-lg">
            🛒
          </div>
          <div className="leading-tight">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              বাজার দর
            </h1>
            <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">
              {bnDate ? `আজ ${bnDate}` : "লোড হচ্ছে..."}
            </p>
          </div>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {isPending ? (
            <div className="flex items-center gap-1 sm:gap-2 animate-pulse">
              <div className="h-7 w-12 sm:h-8 sm:w-16 bg-gray-200 rounded-lg"></div>
              <div className="h-7 w-16 sm:h-8 sm:w-20 bg-gray-200 rounded-lg"></div>
            </div>
          ) : !session ? (
            <>
              <Link
                href="/signin"
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-green-600 px-2 sm:px-3 py-1.5 sm:py-2 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-xs sm:text-sm font-medium bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
              >
                সাইন আপ
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((s) => !s)}
                className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-1.5 sm:pr-2 py-1 rounded-full hover:bg-gray-100 transition"
                aria-label="প্রোফাইল মেনু"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={32}
                    height={32}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs sm:text-sm">
                    {userInitial}
                  </div>
                )}

                <span className="text-xs sm:text-sm text-gray-700 hidden sm:block max-w-25 truncate">
                  {userName}
                </span>
                <span
                  className={`text-[10px] sm:text-xs text-gray-500 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={userName}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-base shrink-0">
                        {userInitial}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-gray-800 truncate">
                        {userName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {userEmail}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span>👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <Link
                    href="/profile/update"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span>✎</span>
                    <span>তথ্য আপডেট</span>
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <span>🚪</span>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== Middle Row: Category Links ===== */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
          <NavLinks categories={categories} />
        </div>
      </div>

      {/* ===== Bottom Row: Marquee ===== */}
      <Marquee />
    </header>
  );
}
