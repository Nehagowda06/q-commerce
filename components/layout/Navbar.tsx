"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const placeholders = [
  'Search "milk"',
  'Search "biryani"',
  'Search "atta"',
  'Search "pizza"',
  'Search "fresh fruits"',
  'Search "detergent"',
];

const routesWithSearch = new Set(["/", "/categories"]);

export default function Navbar() {
  const pathname = usePathname();
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [query, setQuery] = useState("");
  const showSearch = routesWithSearch.has(pathname);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black text-lg">
              S
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none">
                  savega
                </span>
                <span className="text-[10px] font-bold text-brand-text-muted leading-none">in 10 mins</span>
              </div>
              <div className="flex items-center gap-1 mt-1 min-w-0">
                <MapPin size={13} className="text-brand-primary flex-shrink-0" strokeWidth={3} />
                <span className="text-sm font-extrabold text-brand-text leading-none truncate">Home - Bangalore</span>
                <ChevronDown size={14} className="text-brand-primary flex-shrink-0" strokeWidth={3} />
              </div>
            </div>
          </div>

          <Link href="/profile">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
              aria-label="Profile"
            >
              <User size={20} />
            </motion.div>
          </Link>
        </div>

        {showSearch && (
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors z-10">
              <Search size={18} strokeWidth={2.5} />
            </div>

            <div className="relative w-full h-11 bg-gray-50 border border-gray-100 rounded-2xl flex items-center shadow-inner overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full h-full pl-10 pr-20 bg-transparent text-sm font-medium focus:outline-none z-10 text-brand-text"
                aria-label="Search Savega"
              />

              {!query && (
                <div className="absolute left-10 inset-y-0 flex items-center pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIdx}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-gray-400 text-sm font-medium"
                    >
                      {placeholders[placeholderIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="absolute right-3 inset-y-0 flex items-center z-10 pointer-events-none">
              <div className="w-px h-5 bg-gray-200 mx-2" />
              <span className="text-xs font-bold text-brand-primary">Search</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
