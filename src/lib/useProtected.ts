// lib/useProtected.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export function useProtected(redirectTo = "/signin") {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!isPending && !session && !redirected) {
      setRedirected(true);
      toast.error("এই পেজ দেখতে সাইন ইন করুন");
      router.push(redirectTo);
    }
  }, [isPending, session, router, redirectTo, redirected]);

  return { session, isPending, isAuthenticated: !!session };
}

export { useSession };
