"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Package, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  id?: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  tag?: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  weight,
  tag,
}: ProductCardProps) {
  const itemId = id || name;
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((item) => item.id === itemId);
  const quantity = cartItem?.quantity || 0;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl p-2 shadow-soft border border-gray-100 flex flex-col h-full transition-shadow hover:shadow-medium relative overflow-visible"
    >
      {tag && (
        <div className="absolute top-1.5 right-1.5 z-20">
          <div className="px-1.5 py-0.5 rounded text-[7px] font-bold uppercase shadow-sm bg-emerald-500 text-white">
            {tag}
          </div>
        </div>
      )}

      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100 shadow-inner">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
            image.includes("from-") ? image : "from-gray-100 to-gray-200"
          }`}
        >
          {!image.includes("from-") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="w-full h-full object-cover shadow-soft" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/75 border border-white/80 shadow-soft flex items-center justify-center text-brand-primary">
              <Package size={24} strokeWidth={1.8} />
            </div>
          )}
        </motion.div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25" />

        {discount > 0 && (
          <div className="absolute bottom-1.5 left-1.5 bg-brand-accent text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="flex-1 px-0.5">
        <h3 className="text-[11.5px] font-bold text-brand-text leading-tight line-clamp-2 min-h-[28px]">
          {name}
        </h3>
        {weight && <p className="text-[9px] text-brand-text-muted mt-0.5 font-semibold">{weight}</p>}
      </div>

      <div className="mt-2.5 px-0.5">
        <div className="flex min-w-0 items-baseline gap-1.5">
          <span className="text-[12px] font-extrabold text-brand-text">Rs.{price}</span>
          {originalPrice && (
            <span className="text-[9px] text-brand-text-muted line-through">Rs.{originalPrice}</span>
          )}
        </div>

        <div className="relative mt-1.5 h-7 w-full">
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add-btn"
                layoutId={`btn-${itemId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                onClick={() => addItem({ id: itemId, name, price })}
                className="absolute inset-0 bg-brand-primary text-white text-[10px] font-bold rounded-lg shadow-soft flex items-center justify-center"
              >
                Add
              </motion.button>
            ) : (
              <motion.div
                key="qty-selector"
                layoutId={`btn-${itemId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-primary text-white rounded-lg flex items-center justify-between px-1 shadow-soft"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateQuantity(itemId, quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10"
                  aria-label={`Remove ${name}`}
                >
                  <Minus size={12} strokeWidth={3} />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 600, damping: 12 }}
                  className="text-[11px] font-bold w-4 text-center"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => updateQuantity(itemId, quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10"
                  aria-label={`Add ${name}`}
                >
                  <Plus size={12} strokeWidth={3} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
