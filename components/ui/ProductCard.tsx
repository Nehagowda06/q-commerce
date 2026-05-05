"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  id: string;
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
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;
  const normalizedTag = tag === "Bestseller" ? "Best Seller" : tag;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="group relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-2.5 shadow-soft transition-shadow hover:shadow-medium"
    >
      {normalizedTag && (
        <div className="absolute left-4 top-0 z-20 -translate-y-1/2">
          <div
            className={`
              rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-wider shadow-sm
              ${normalizedTag === "Best Seller" ? "bg-amber-400 text-amber-900" : ""}
              ${normalizedTag === "Fresh" ? "bg-emerald-500 text-white" : ""}
              ${normalizedTag === "New" ? "bg-blue-500 text-white" : ""}
            `}
          >
            {normalizedTag}
          </div>
        </div>
      )}

      <div className="relative mb-2.5 aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`
            relative flex h-full w-full items-center justify-center
            bg-gradient-to-br ${image.includes("from-") ? image : "from-gray-100 to-gray-200"}
          `}
        >
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]" />

          {!image.includes("from-") ? (
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              sizes="144px"
              className="object-cover shadow-soft"
            />
          ) : (
            <motion.div
              whileHover={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))" }}
              className="text-4xl"
            >
              📦
            </motion.div>
          )}
        </motion.div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/20" />

        {discount > 0 && (
          <div className="absolute left-1.5 top-1.5 rounded-md bg-brand-accent px-1.5 py-0.5 text-[9px] font-black text-white shadow-sm">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="flex-1 px-0.5">
        <h3 className="min-h-[32px] text-[13px] font-medium leading-tight text-brand-text line-clamp-2">
          {name}
        </h3>
        {weight && (
          <p className="mt-0.5 text-[11px] font-medium text-brand-text-muted">{weight}</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between px-0.5">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-brand-text">₹{price}</span>
            {originalPrice && (
              <span className="text-[10px] text-brand-text-muted line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>

        <div className="relative h-8 w-[72px] flex-shrink-0">
          <AnimatePresence initial={false} mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add-btn"
                layoutId={`btn-${id}`}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                onClick={() => addItem({ id, name, price })}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-brand-primary text-[10px] font-black uppercase tracking-wider text-white shadow-soft"
              >
                Add
              </motion.button>
            ) : (
              <motion.div
                key="qty-selector"
                layoutId={`btn-${id}`}
                className="absolute inset-0 flex items-center justify-between rounded-full bg-brand-primary px-1 text-white shadow-soft"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 600, damping: 15 }}
                  onClick={() => updateQuantity(id, quantity - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10"
                >
                  <Minus size={14} strokeWidth={3} />
                </motion.button>

                <span className="w-4 text-center text-xs font-bold">{quantity}</span>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 600, damping: 15 }}
                  onClick={() => updateQuantity(id, quantity + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10"
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
