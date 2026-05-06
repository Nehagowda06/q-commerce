"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartBar() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="w-full max-w-[420px] pointer-events-none flex justify-center">
        <AnimatePresence>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full bg-white border border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-2xl p-3 flex items-center justify-between pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-brand-text-muted uppercase tracking-wider leading-none">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </span>
                <span className="text-sm font-black text-brand-text mt-1 leading-none">Rs.{totalPrice}</span>
              </div>
            </div>

            <Link href="/cart">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-white h-11 px-6 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-soft"
              >
                View Cart
                <ChevronRight size={16} strokeWidth={3} />
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
