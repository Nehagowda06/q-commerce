import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import CartBar from "@/components/layout/CartBar";

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
      <body className="bg-gray-100 min-h-screen">
        <div className="app-container shadow-2xl overflow-x-hidden">
          <Navbar />
          <main className="pb-24">{children}</main>
          <CartBar />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
