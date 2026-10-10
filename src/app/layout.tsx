import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার-দর",
  description: "আজকের বাজারদর এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body
        className={`${hind.variable} font-sans bg-gray-50 flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
