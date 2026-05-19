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
        {/* Desktop shell — only visible on md+ screens */}
        <div className="desktop-shell">
          <div className="desktop-bg" />
          <div className="desktop-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/savega full.svg" alt="Savega" className="h-8 object-contain opacity-90" />
            <p className="desktop-tagline">Groceries &amp; food in 10 minutes</p>
          </div>
          <div className="desktop-phone-frame">
            <div className="desktop-phone-notch">
              <span className="desktop-phone-time">9:41</span>
              <div className="desktop-phone-icons">
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><rect x="0" y="3" width="3" height="8" rx="1" fill="white" fillOpacity="0.9"/><rect x="4" y="2" width="3" height="9" rx="1" fill="white" fillOpacity="0.9"/><rect x="8" y="0" width="3" height="11" rx="1" fill="white" fillOpacity="0.9"/><rect x="12" y="1" width="3" height="10" rx="1" fill="white" fillOpacity="0.4"/></svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 4C13.6 1.9 11 0.5 8 0.5C5 0.5 2.4 1.9 0.5 4L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5Z" fill="white" fillOpacity="0.9"/><path d="M8 5.5C9.7 5.5 11.2 6.2 12.3 7.3L13.6 6C12.1 4.5 10.2 3.5 8 3.5C5.8 3.5 3.9 4.5 2.4 6L3.7 7.3C4.8 6.2 6.3 5.5 8 5.5Z" fill="white" fillOpacity="0.9"/><circle cx="8" cy="10" r="1.5" fill="white" fillOpacity="0.9"/></svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.5"/><rect x="2" y="2" width="16" height="8" rx="2" fill="white" fillOpacity="0.9"/><path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="white" fillOpacity="0.5"/></svg>
              </div>
            </div>
            <div className="app-container shadow-2xl overflow-x-hidden">
              <Navbar />
              <main className="pb-28">{children}</main>
              <CartBar />
              <BottomNav />
            </div>
            <div className="desktop-phone-home-bar" />
          </div>
        </div>

        {/* Mobile — unchanged, direct container */}
        <div className="mobile-shell">
          <div className="app-container shadow-2xl overflow-x-hidden">
            <Navbar />
            <main className="pb-28">{children}</main>
            <CartBar />
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
