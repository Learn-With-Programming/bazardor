// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    setLoading(true);

    // authClient.signUp.email() ব্যবহার করুন
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  const handleSocial = async (provider: "google" | "github") => {
    try {
      // authClient.signIn.social() ব্যবহার করুন
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
      toast.success("সাইন ইন সফল!");
    } catch {
      toast.error("সাইন ইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 my-10">
      <h1 className="text-2xl font-bold text-center mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        নতুন অ্যাকাউন্ট খুলে বাজারদর দেখুন
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার পুরো নাম"
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "রেজিস্টার করুন"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <div className="flex-1 h-px bg-gray-200" />
        <span>অথবা</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocial("google")}
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50"
        >
          <span>G</span> Google
        </button>
        <button
          onClick={() => handleSocial("github")}
          className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50"
        >
          <span>⌘</span> GitHub
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-green-600 font-medium">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}