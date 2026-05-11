"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronRight, ClipboardList, CreditCard, HelpCircle, LogOut, MapPin, Pencil, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

const menuItems = [
  { icon: ClipboardList, label: "My Orders", href: "/orders" },
  { icon: CreditCard, label: "Payments & Refunds", href: "/profile/payments" },
  { icon: MapPin, label: "My Addresses", href: "/profile/addresses" },
  { icon: Bell, label: "Notifications", href: "/profile/notifications" },
  { icon: Settings, label: "Settings", href: "/profile/settings" },
  { icon: HelpCircle, label: "Customer Support", href: "/profile/support" },
];

export default function ProfilePage() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <PageWrapper>
      <div className="p-3 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl font-black">
              SV
            </div>
            <div>
              <h1 className="text-base font-black text-brand-text leading-tight">Savega User</h1>
              <p className="text-[11px] text-brand-text-muted">+91 98765 43210</p>
            </div>
          </div>
          <Link href="/profile/edit">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Pencil size={16} strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden mb-3">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                  <item.icon size={17} />
                </div>
                <span className="font-bold text-xs text-brand-text">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </Link>
          ))}
        </div>

        {/* Log Out — separate card */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center justify-between p-3 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <LogOut size={17} />
              </div>
              <span className="font-bold text-xs text-red-500">Log Out</span>
            </div>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 font-bold mt-5 uppercase tracking-widest">
          Savega Version 1.0.42
        </p>
      </div>

      {/* Logout confirmation popup */}
      <AnimatePresence>
        {showLogout && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59] flex items-center justify-center"
              onClick={() => setShowLogout(false)}
            />
            <motion.div
              key="modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-6"
            >
              <div className="w-full max-w-[320px] bg-white rounded-3xl p-6 pointer-events-auto shadow-2xl">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-4">
                  <LogOut size={26} strokeWidth={2} />
                </div>
                <h2 className="text-base font-black text-brand-text text-center mb-1">Log Out?</h2>
                <p className="text-[11px] text-brand-text-muted text-center mb-5">
                  You will be signed out of your Savega account.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLogout(false)}
                    className="flex-1 h-11 rounded-xl border border-gray-200 text-xs font-black text-brand-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogout(false)}
                    className="flex-1 h-11 rounded-xl bg-red-500 text-white text-xs font-black"
                  >
                    Yes, Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
