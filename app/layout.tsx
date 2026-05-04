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
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <div className="app-container shadow-2xl overflow-x-hidden pb-24">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <CartBar />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
