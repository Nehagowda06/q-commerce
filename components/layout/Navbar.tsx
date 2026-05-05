"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";

const placeholders = [
  'Search "milk"',
  'Search "bread"',
  'Search "biryani"',
  'Search "detergent"',
  'Search "alphonso mangoes"',
  'Search "atta"',
  'Search "chips"',
];

export default function Navbar() {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="px-4 py-3">
        {/* Top row: Location & Profile */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <MapPin size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider leading-none mb-0.5">
                Deliver to
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-extrabold text-brand-text leading-none">Home - Bangalore</span>
                <ChevronDown size={14} className="text-brand-primary" strokeWidth={3} />
              </div>
            </div>
          </div>
          
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer"
          >
            <User size={20} />
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-primary transition-colors z-10">
            <Search size={18} strokeWidth={2.5} />
          </div>
          
          <div className="relative w-full h-11 bg-gray-50 border border-gray-100 rounded-2xl flex items-center shadow-inner overflow-hidden">
            <input
              type="text"
              className="w-full h-full pl-10 pr-4 bg-transparent text-sm font-medium focus:outline-none z-10"
            />
            
            {/* Animated Placeholder */}
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
          </div>

          <div className="absolute right-3 inset-y-0 flex items-center z-10">
            <div className="w-px h-5 bg-gray-200 mx-2" />
            <span className="text-xs font-bold text-brand-primary">Search</span>
          </div>
        </div>
      </div>
    </header>
  );
}
