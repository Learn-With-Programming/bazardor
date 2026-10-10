"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!isPending && !session && !redirected) {
      setRedirected(true);
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [isPending, session, router, redirected]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const createdDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য দেখুন এবং পরিচালনা করুন
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-5 flex-col sm:flex-row">
          {/* Avatar */}
          <div className="shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-green-100"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 border-2 border-green-200">
                {user.name?.charAt(0) || "র"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-sm text-gray-500 truncate mb-3">
              {user.email}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                ✓ ভেরিফাইড অ্যাকাউন্ট
              </span>
              {user.emailVerified && (
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  ইমেইল যাচাইকৃত
                </span>
              )}
            </div>
          </div>

          {/* Update Button */}
          <Link
            href="/profile/update"
            className="shrink-0 text-sm font-medium border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition whitespace-nowrap"
          >
            ✎ আপডেট তথ্য
          </Link>
        </div>
      </div>

      {/* Account Details */}
      <div className="mt-5 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">
            অ্যাকাউন্টের বিস্তারিত
          </h3>
        </div>

        <div className="divide-y divide-gray-50">
          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">নাম</span>
            <span className="text-sm font-medium text-gray-800 truncate ml-3">
              {user.name || "—"}
            </span>
          </div>

          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">ইমেইল</span>
            <span className="text-sm font-medium text-gray-800 truncate ml-3">
              {user.email || "—"}
            </span>
          </div>

          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">অ্যাকাউন্ট তৈরি</span>
            <span className="text-sm font-medium text-gray-800">
              {createdDate}
            </span>
          </div>

          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">ইউজার আইডি</span>
            <span className="text-xs font-mono text-gray-600 truncate ml-3 max-w-[180px]">
              {user.id || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSignOut}
          className="text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 px-5 py-2.5 rounded-lg transition"
        >
          🚪 সাইন আউট করুন
        </button>
      </div>
    </div>
  );
}