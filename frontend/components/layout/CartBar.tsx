"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartBar() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const hasMultiple = items.length > 1;
  const [expanded, setExpanded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
  }, []);

  if (totalItems === 0) return null;

  const firstItemName = items[0]?.name ?? "";

  const handleClearTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmClear) {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      setConfirmClear(false);
      setExpanded(false);
      clearCart();
    } else {
      setConfirmClear(true);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setConfirmClear(false), 2500);
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="w-full max-w-[420px] pointer-events-none flex justify-center">
        <AnimatePresence>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full bg-white border border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-2xl pointer-events-auto overflow-hidden"
          >
            {/* Expandable item list (only when multiple items) */}
            <AnimatePresence initial={false}>
              {hasMultiple && expanded && (
                <motion.div
                  key="item-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-100"
                >
                  <ul className="max-h-48 overflow-y-auto px-3 py-2 divide-y divide-gray-50">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-2 py-2"
                      >
                        <span className="text-xs font-bold text-brand-text truncate min-w-0 flex-1">
                          {item.name}
                        </span>

                        <div className="flex items-center gap-1 bg-brand-primary/10 rounded-lg px-1 py-0.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center rounded-md text-brand-primary active:bg-brand-primary/20"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus size={12} strokeWidth={3} />
                          </button>
                          <span className="text-[11px] font-black text-brand-primary w-4 text-center leading-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center rounded-md text-brand-primary active:bg-brand-primary/20"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus size={12} strokeWidth={3} />
                          </button>
                        </div>

                        <span className="text-xs font-black text-brand-text flex-shrink-0 w-16 text-right">
                          Rs.{item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => hasMultiple && setExpanded((v) => !v)}
                className="flex items-center gap-3 min-w-0 flex-1 text-left"
                aria-expanded={hasMultiple ? expanded : undefined}
                aria-label={hasMultiple ? "Toggle cart items" : undefined}
              >
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary flex-shrink-0">
                  <ShoppingBag size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-xs font-black text-brand-text leading-none truncate">
                      {hasMultiple
                        ? `${firstItemName} +${items.length - 1} more`
                        : firstItemName}
                    </span>
                    {hasMultiple && (
                      <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-brand-primary flex-shrink-0"
                      >
                        <ChevronDown size={14} strokeWidth={3} />
                      </motion.span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-brand-text-muted mt-1 leading-none">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"} · Rs.{totalPrice}
                  </span>
                </div>
              </button>

              <motion.button
                type="button"
                onClick={handleClearTap}
                whileTap={{ scale: 0.9 }}
                animate={{ width: confirmClear ? 72 : 36 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`h-9 rounded-xl flex items-center justify-center gap-1 flex-shrink-0 border text-[10px] font-black uppercase tracking-wider ${
                  confirmClear
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-red-50 text-red-500 border-red-100"
                }`}
                aria-label={confirmClear ? "Confirm clear cart" : "Clear cart"}
              >
                {confirmClear ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Sure</span>
                  </>
                ) : (
                  <Trash2 size={16} strokeWidth={2.5} />
                )}
              </motion.button>

              <Link href="/cart" className="flex-shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-primary text-white h-11 px-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-soft"
                >
                  View Cart
                  <ChevronRight size={16} strokeWidth={3} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
