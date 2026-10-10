// src/lib/auth-client.ts
"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export function useSession() {
  return authClient.useSession();
}

export async function signOut() {
  return authClient.signOut();
}

export async function updateUser(data: { name?: string; image?: string }) {
  return authClient.updateUser(data);
}
