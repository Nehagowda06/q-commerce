"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, Minus, Package, Plus, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useListStore } from "@/store/listStore";
import ProductDetailSheet from "@/components/ui/ProductDetailSheet";

interface ProductCardProps {
  id?: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  tag?: string;
  brand?: string;
  category?: string;
  description?: string;
  details?: string[];
  nutrition?: { label: string; value: string }[];
}

const TAG_STYLES: Record<string, string> = {
  Fresh:        "badge-fresh text-white",
  "Best Seller":"badge-best text-white",
  New:          "badge-new text-white",
};

export default function ProductCard({
  id, name, image, price, originalPrice, weight, tag,
  brand, category, description, details, nutrition,
}: ProductCardProps) {
  const itemId = id || name;
  const { items, addItem, updateQuantity } = useCartStore();
  const { lists, addItem: addToList } = useListStore();
  const cartItem = items.find((item) => item.id === itemId);
  const quantity = cartItem?.quantity || 0;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const [showListPicker, setShowListPicker] = useState(false);
  const [addedToListId, setAddedToListId] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleAddToList = (listId: number) => {
    addToList(listId, { text: `${name}${weight ? ` (${weight})` : ""}`, checked: false, productId: itemId, price });
    setAddedToListId(listId);
    setTimeout(() => { setAddedToListId(null); setShowListPicker(false); }, 1200);
  };

  const product = { id: itemId, name, image, price, originalPrice, weight, tag, brand, category, description, details, nutrition };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowDetail(true)}
        className="group bg-white rounded-2xl flex flex-col h-full relative overflow-visible cursor-pointer"
        style={{ boxShadow: "0 2px 12px rgba(6,31,65,0.08)" }}
      >
        {/* Tag badge */}
        {tag && (
          <motion.div
            initial={{ scale: 0, y: -4 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className={`absolute top-2 right-2 z-20 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase ${TAG_STYLES[tag] ?? "badge-fresh text-white"}`}
          >
            {tag}
          </motion.div>
        )}

        {/* Bookmark */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setShowListPicker(true); }}
          className="absolute top-2 left-2 z-20 w-6 h-6 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-primary shadow-sm border border-white/60"
          aria-label="Add to list"
        >
          <Bookmark size={11} strokeWidth={2.5} />
        </button>

        {/* Image area */}
        <div className={`relative w-full aspect-square rounded-t-2xl overflow-hidden bg-gradient-to-br ${
          image.includes("from-") ? image : "from-gray-100 to-gray-200"
        }`}>
          {!image.includes("from-") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-brand-primary/60">
                <Package size={24} strokeWidth={1.5} />
              </div>
            </div>
          )}

          {/* Discount badge — bold pill with lightning icon + pop animation */}
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.1 }}
              className="absolute bottom-2 left-2 badge-sale text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm"
            >
              <Zap size={8} fill="white" strokeWidth={0} />
              {discount}% OFF
            </motion.div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 px-2.5 pt-2 pb-1">
          <p className="text-[11.5px] font-black text-brand-text leading-tight line-clamp-2 min-h-[28px]">{name}</p>
          {weight && <p className="text-[9px] text-brand-text-muted mt-0.5 font-semibold">{weight}</p>}
        </div>

        {/* Price + Add */}
        <div className="px-2.5 pb-2.5">
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-[13px] font-black text-brand-text">Rs.{price}</span>
            {originalPrice && (
              <span className="text-[9px] text-brand-text-muted line-through">Rs.{originalPrice}</span>
            )}
          </div>

          <div className="relative h-7 w-full" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => { e.stopPropagation(); addItem({ id: itemId, name, price }); }}
                  className="absolute inset-0 savega-gradient text-white text-[10px] font-black rounded-lg shadow-sm flex items-center justify-center gap-1"
                >
                  <Plus size={11} strokeWidth={3} />
                  Add
                </motion.button>
              ) : (
                <motion.div
                  key="qty-selector"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 savega-gradient text-white rounded-lg flex items-center justify-between px-1 shadow-sm"
                >
                  <motion.button whileTap={{ scale: 0.8 }}
                    onClick={(e) => { e.stopPropagation(); updateQuantity(itemId, quantity - 1); }}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/20"
                    aria-label={`Remove ${name}`}>
                    <Minus size={12} strokeWidth={3} />
                  </motion.button>
                  <motion.span key={quantity}
                    initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 12 }}
                    className="text-[11px] font-black w-4 text-center">
                    {quantity}
                  </motion.span>
                  <motion.button whileTap={{ scale: 0.8 }}
                    onClick={(e) => { e.stopPropagation(); updateQuantity(itemId, quantity + 1); }}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/20"
                    aria-label={`Add ${name}`}>
                    <Plus size={12} strokeWidth={3} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Detail sheet */}
      <AnimatePresence>
        {showDetail && <ProductDetailSheet product={product} onClose={() => setShowDetail(false)} />}
      </AnimatePresence>

      {/* List picker */}
      <AnimatePresence>
        {showListPicker && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setShowListPicker(false)} />
            <motion.div key="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-6">
              <div className="w-full max-w-[300px] bg-white rounded-3xl p-4 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-black text-brand-text">Add to List</h3>
                    <p className="text-[10px] text-brand-text-muted truncate max-w-[180px]">{name}</p>
                  </div>
                  <button onClick={() => setShowListPicker(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>
                {lists.length === 0 ? (
                  <p className="text-[11px] text-brand-text-muted text-center py-4">No lists yet. Create one in the Lists tab.</p>
                ) : (
                  <div className="space-y-2">
                    {lists.map((list) => {
                      const added = addedToListId === list.id;
                      return (
                        <button key={list.id} onClick={() => handleAddToList(list.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${added ? "bg-brand-primary/10 border-brand-primary" : "bg-gray-50 border-gray-100"}`}>
                          <span className="text-lg">{list.emoji}</span>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-xs font-black text-brand-text truncate">{list.name}</p>
                            <p className="text-[9px] text-brand-text-muted">{list.items.length} items</p>
                          </div>
                          {added && <Check size={14} strokeWidth={3} className="text-brand-primary flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
