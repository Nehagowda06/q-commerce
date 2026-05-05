import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import CartBar from "@/components/layout/CartBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q-Commerce | Quick Grocery Delivery",
  description: "Experience the fastest grocery delivery in your city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 m-0 min-h-dvh`}>
        <div
          className="app-container overflow-x-hidden shadow-2xl"
          style={{ paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CartBar />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
