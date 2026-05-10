"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, Minus, Package, Plus, X } from "lucide-react";
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

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  weight,
  tag,
  brand,
  category,
  description,
  details,
  nutrition,
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
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDetail(true)}
        className="group bg-white rounded-xl p-2 shadow-soft border border-gray-100 flex flex-col h-full transition-shadow hover:shadow-medium relative overflow-visible cursor-pointer"
      >
        {tag && (
          <div className="absolute top-1.5 right-1.5 z-20">
            <div className="px-1.5 py-0.5 rounded text-[7px] font-bold uppercase shadow-sm bg-emerald-500 text-white">
              {tag}
            </div>
          </div>
        )}

        {/* Bookmark button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setShowListPicker(true); }}
          className="absolute top-1.5 left-1.5 z-20 w-6 h-6 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-primary shadow-soft border border-white/60"
          aria-label="Add to list"
        >
          <Bookmark size={12} strokeWidth={2.5} />
        </button>

        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100 shadow-inner">
          <div
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
          </div>

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

          {/* Stop propagation so tapping Add/+/- doesn't open the detail sheet */}
          <div className="relative mt-1.5 h-7 w-full" onClick={(e) => e.stopPropagation()}>
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
                  onClick={(e) => { e.stopPropagation(); addItem({ id: itemId, name, price }); }}
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
                    onClick={(e) => { e.stopPropagation(); updateQuantity(itemId, quantity - 1); }}
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
                    onClick={(e) => { e.stopPropagation(); updateQuantity(itemId, quantity + 1); }}
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

      {/* Product detail sheet */}
      <AnimatePresence>
        {showDetail && (
          <ProductDetailSheet product={product} onClose={() => setShowDetail(false)} />
        )}
      </AnimatePresence>

      {/* List picker modal */}
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
                  <p className="text-[11px] text-brand-text-muted text-center py-4">
                    No lists yet. Create one in the Lists tab.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {lists.map((list) => {
                      const added = addedToListId === list.id;
                      return (
                        <button key={list.id} onClick={() => handleAddToList(list.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                            added ? "bg-brand-primary/10 border-brand-primary" : "bg-gray-50 border-gray-100 hover:border-brand-primary/40"
                          }`}>
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
