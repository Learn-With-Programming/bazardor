"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toBnNumber } from "@/lib/bengali";
import Image from "next/image";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && session?.user && !name) {
      setName(session.user.name || "");
      setImagePreview(session.user.image || "");
      setInitialized(true);
    }
  }, [session, initialized, name]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      toast.error("ছবির আকার ৫০০ কিলোবাইটের কম হতে হবে");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবি আপলোড করুন");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImagePreview(result);
        setImageChanged(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageChanged(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম দিন");
      return;
    }
    setLoading(true);
    try {
      const payload: { name: string; image?: string } = { name: name.trim() };

      if (imageChanged) {
        payload.image = imagePreview;
      }

      await updateUser(payload);
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 my-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-gray-500 mb-6">
        আপনার নাম ও প্রোফাইল ছবি পরিবর্তন করুন
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ===== Avatar Upload ===== */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center border-2 border-green-200">
            {imagePreview ? (
              <Image
                width={50}
                height={50}
                src={imagePreview}
                alt="প্রোফাইল ছবির প্রিভিউ"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold txt-green-700">
                {name?.charAt(0) || "র"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              ছবি আপলোড করুন
            </button>

            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-sm font-medium text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition"
              >
                ✕ মুছুন
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="text-xs text-gray-400 text-center">
            PNG, JPG বা WebP — সর্বোচ্চ ৫০০ কেবি
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম"
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
        </button>
      </form>

      {imagePreview && imageChanged && (
        <p className="text-[11px] text-gray-400 text-center mt-4">
          নতুন ছবির সাইজ: {toBnNumber(Math.round(imagePreview.length / 1024))}{" "}
          কেবি
        </p>
      )}
    </div>
  );
}
