import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import CartBar from "@/components/layout/CartBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savega | Groceries and Food in Minutes",
  description: "Order quick groceries and food delivery with Savega.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <div className="app-container shadow-2xl overflow-x-hidden">
          <Navbar />
          <main className="min-h-screen pb-36">
=======
      <body className={`${inter.className} bg-gray-100 m-0 min-h-dvh`}>
        <div
          className="app-container overflow-x-hidden shadow-2xl"
          style={{ paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
        >
          <Navbar />
          <main className="flex-1">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
            {children}
          </main>
          <CartBar />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
