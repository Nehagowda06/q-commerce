"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Package, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  tag?: string;
}

export default function ProductCard({
  name,
  image,
  price,
  originalPrice,
  weight,
  tag,
}: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === name);
  const quantity = cartItem?.quantity || 0;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-2xl p-2.5 shadow-soft border border-gray-100 flex flex-col h-full transition-shadow hover:shadow-medium relative"
    >
      {tag && (
        <div className="absolute top-0 left-4 z-20 -translate-y-1/2">
          <div className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider shadow-sm bg-emerald-500 text-white">
            {tag}
          </div>
        </div>
      )}

      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-gray-100 shadow-inner">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
            image.includes("from-") ? image : "from-gray-100 to-gray-200"
          }`}
        >
          {!image.includes("from-") ? (
            <img src={image} alt={name} className="w-full h-full object-cover shadow-soft" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-white/75 border border-white/80 shadow-soft flex items-center justify-center text-brand-primary">
              <Package size={28} strokeWidth={1.8} />
            </div>
          )}
        </motion.div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25" />

        {discount > 0 && (
          <div className="absolute top-1.5 left-1.5 bg-brand-accent text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="flex-1 px-0.5">
        <h3 className="text-[13px] font-medium text-brand-text leading-tight line-clamp-2 min-h-[32px]">
          {name}
        </h3>
        {weight && <p className="text-[11px] text-brand-text-muted mt-0.5 font-medium">{weight}</p>}
      </div>

      <div className="mt-3 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-brand-text">Rs.{price}</span>
          {originalPrice && (
            <span className="text-[10px] text-brand-text-muted line-through">Rs.{originalPrice}</span>
          )}
        </div>

        <div className="relative h-8 w-[72px] flex-shrink-0">
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add-btn"
                layoutId={`btn-${name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                onClick={() => addItem({ id: name, name, price })}
                className="absolute inset-0 bg-brand-primary text-white text-[10px] font-black rounded-full shadow-soft flex items-center justify-center uppercase tracking-wider"
              >
                Add
              </motion.button>
            ) : (
              <motion.div
                key="qty-selector"
                layoutId={`btn-${name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-primary text-white rounded-full flex items-center justify-between px-1 shadow-soft"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateQuantity(name, quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={`Remove ${name}`}
                >
                  <Minus size={14} strokeWidth={3} />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 600, damping: 12 }}
                  className="text-xs font-bold w-4 text-center"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateQuantity(name, quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={`Add ${name}`}
                >
                  <Plus size={14} strokeWidth={3} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
