"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Home, MapPin, Plus, Search, Briefcase, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/searchStore";

const placeholders = [
  'Search "milk"',
  'Search "biryani"',
  'Search "atta"',
  'Search "pizza"',
  'Search "fresh fruits"',
  'Search "detergent"',
];

const routesWithSearch = new Set(["/", "/categories"]);

const savedAddresses = [
  { id: "home", label: "Home", detail: "12, MG Road, Mandya", icon: Home },
  { id: "work", label: "Work", detail: "45, Industrial Area, Mandya", icon: Briefcase },
];

export default function Navbar() {
  const pathname = usePathname();
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const { query, setQuery, reset } = useSearchStore();
  const showSearch = routesWithSearch.has(pathname);

  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [activeAddressId, setActiveAddressId] = useState("home");
  const [customInput, setCustomInput] = useState("");
  const [addingNew, setAddingNew] = useState(false);

  const activeAddress = savedAddresses.find((a) => a.id === activeAddressId) ?? savedAddresses[0];

  useEffect(() => {
    if (!routesWithSearch.has(pathname)) reset();
  }, [pathname, reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-soft">
        <div className="px-3.5 py-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/savega logo.svg" alt="Savega" className="w-8 h-8 object-contain flex-shrink-0" />
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setShowAddressPicker(true)}
                  className="flex items-center gap-1 mt-1 min-w-0 group"
                  aria-label="Change delivery address"
                >
                  <MapPin size={12} className="text-brand-primary flex-shrink-0" strokeWidth={3} />
                  <span className="text-[12px] font-bold text-brand-text leading-none truncate max-w-[160px]">
                    {activeAddress.label} - Mandya
                  </span>
                  <motion.span
                    animate={{ rotate: showAddressPicker ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={13} className="text-brand-primary" strokeWidth={3} />
                  </motion.span>
                </button>
              </div>
            </div>

            <Link href="/profile">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
                aria-label="Profile"
              >
                <User size={18} />
              </motion.div>
            </Link>
          </div>

          {showSearch && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors z-10">
                <Search size={16} strokeWidth={2.5} />
              </div>

              <div className="relative w-full h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center shadow-inner overflow-hidden focus-within:border-brand-primary transition-colors">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-full pl-9 pr-16 bg-transparent text-[12px] font-medium focus:outline-none z-10 text-brand-text"
                  aria-label="Search Savega"
                  placeholder=""
                />

                {!query && (
                  <div className="absolute left-9 inset-y-0 flex items-center pointer-events-none z-0">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIdx}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-gray-400 text-[12px] font-medium"
                      >
                        {placeholders[placeholderIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="absolute right-3 inset-y-0 flex items-center z-10 gap-1">
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
                    aria-label="Clear search"
                  >
                    <X size={11} strokeWidth={3} />
                  </button>
                ) : (
                  <>
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <span className="text-[11px] font-bold text-brand-primary">Search</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Address picker modal */}
      <AnimatePresence>
        {showAddressPicker && (
          <>
            <motion.div
              key="addr-bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]"
              onClick={() => { setShowAddressPicker(false); setAddingNew(false); }}
            />
            <motion.div
              key="addr-modal"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-5"
            >
              <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 pointer-events-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-brand-text">Deliver to</h3>
                  <button
                    onClick={() => { setShowAddressPicker(false); setAddingNew(false); }}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Saved addresses */}
                <div className="space-y-2 mb-3">
                  {savedAddresses.map((addr) => {
                    const Icon = addr.icon;
                    const isActive = activeAddressId === addr.id;
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => { setActiveAddressId(addr.id); setShowAddressPicker(false); setAddingNew(false); }}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-colors text-left ${
                          isActive
                            ? "bg-brand-primary/10 border-brand-primary"
                            : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-brand-primary text-white" : "bg-white text-gray-500 border border-gray-100"
                        }`}>
                          <Icon size={16} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-brand-text">{addr.label}</p>
                          <p className="text-[10px] text-brand-text-muted truncate">{addr.detail}</p>
                        </div>
                        {isActive && (
                          <Check size={15} strokeWidth={3} className="text-brand-primary flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Add new address */}
                {addingNew ? (
                  <div className="space-y-2">
                    <input
                      autoFocus
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter your address..."
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setAddingNew(false); setCustomInput(""); }}
                        className="flex-1 h-9 rounded-xl border border-gray-200 text-xs font-black text-brand-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { setAddingNew(false); setCustomInput(""); setShowAddressPicker(false); }}
                        className="flex-1 h-9 rounded-xl bg-brand-primary text-white text-xs font-black"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingNew(true)}
                    className="w-full h-10 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-xs font-bold text-brand-text-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    Add new address
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
