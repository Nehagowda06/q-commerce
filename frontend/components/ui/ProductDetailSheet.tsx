"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Check, Minus, Package, Plus, Share2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useListStore } from "@/store/listStore";

export interface ProductDetail {
  id: string;
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

interface Props {
  product: ProductDetail;
  onClose: () => void;
}

export default function ProductDetailSheet({ product, onClose }: Props) {
  const { items, addItem, updateQuantity } = useCartStore();
  const { lists, addItem: addToList, deleteItem } = useListStore();

  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const [tab, setTab] = useState<"info" | "nutrition">("info");
  const [showListPicker, setShowListPicker] = useState(false);
  const [addedToListId, setAddedToListId] = useState<number | null>(null);
  const [shared, setShared] = useState(false);
  const [saveFlash, setSaveFlash] = useState<"saved" | "unsaved" | null>(null);
  const [toastPos, setToastPos] = useState<{ x: number; y: number } | null>(null);
  const bookmarkRef = useRef<HTMLButtonElement>(null);

  const isSaved = lists.some((list) =>
    list.items.some((item) => item.productId === product.id)
  );

  const captureToastPos = () => {
    if (bookmarkRef.current) {
      const r = bookmarkRef.current.getBoundingClientRect();
      setToastPos({ x: r.left + r.width / 2, y: r.top });
    }
  };

  const handleBookmarkClick = () => {
    if (isSaved) {
      lists.forEach((list) => {
        list.items.forEach((item) => {
          if (item.productId === product.id) deleteItem(list.id, item.id);
        });
      });
      captureToastPos();
      setSaveFlash("unsaved");
      setTimeout(() => { setSaveFlash(null); setToastPos(null); }, 1400);
    } else {
      setShowListPicker(true);
    }
  };

  const handleAddToList = (listId: number) => {
    addToList(listId, {
      text: `${product.name}${product.weight ? ` (${product.weight})` : ""}`,
      checked: false,
      productId: product.id,
      price: product.price,
    });
    setAddedToListId(listId);
    setTimeout(() => {
      setAddedToListId(null);
      setShowListPicker(false);
      setTimeout(() => {
        captureToastPos();
        setSaveFlash("saved");
        setTimeout(() => { setSaveFlash(null); setToastPos(null); }, 1400);
      }, 320);
    }, 600);
  };

  const handleShare = async () => {
    const text = `${product.name}${product.weight ? ` (${product.weight})` : ""} — Rs.${product.price} on Savega`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text });
      } catch {
        // user cancelled — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // clipboard not available
      }
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="sheet-bd"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[59]"
        onClick={onClose}
      />

      {/* Sheet — slides up from bottom */}
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        className="fixed bottom-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
      >
        <div className="w-full max-w-[420px] bg-white rounded-t-3xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden">

          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 no-scrollbar">

            {/* Product image */}
            <div className={`relative mx-4 mt-2 rounded-2xl overflow-hidden bg-gradient-to-br ${product.image.includes("from-") ? product.image : "from-gray-100 to-gray-200"} aspect-[4/3] flex items-center justify-center`}>
              {!product.image.includes("from-") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-white/70 flex items-center justify-center text-brand-primary shadow-soft">
                  <Package size={48} strokeWidth={1.5} />
                </div>
              )}

              {/* Close */}
              <button onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft">
                <X size={16} strokeWidth={2.5} />
              </button>

              {/* Tag */}
              {product.tag && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase shadow-sm">
                  {product.tag}
                </div>
              )}

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-brand-accent text-white text-[9px] font-black shadow-sm">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Name, brand, weight */}
            <div className="px-4 pt-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {product.brand && (
                    <p className="text-[9px] font-black text-brand-primary uppercase tracking-wider mb-0.5">{product.brand}</p>
                  )}
                  <h2 className="text-[15px] font-black text-brand-text leading-tight">{product.name}</h2>
                  {product.weight && (
                    <p className="text-[11px] text-brand-text-muted mt-0.5 font-semibold">{product.weight}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-0.5">
                  <button onClick={handleShare}
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    {shared ? <Check size={14} strokeWidth={3} className="text-brand-accent" /> : <Share2 size={14} strokeWidth={2.5} />}
                  </button>
                  {/* Animated bookmark button */}
                  <div className="relative">
                    <AnimatePresence>
                      {saveFlash === "saved" && (
                        <motion.span key="pulse-sheet"
                          className="absolute inset-0 rounded-xl bg-brand-primary pointer-events-none"
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{ opacity: 0, scale: 2 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                    <motion.button
                      ref={bookmarkRef}
                      onClick={handleBookmarkClick}
                      whileTap={{ scale: 0.82 }}
                      className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isSaved ? "bg-brand-primary text-white" : "bg-brand-primary/10 text-brand-primary"
                      }`}
                      aria-label={isSaved ? "Remove from list" : "Save to list"}
                    >
                      <AnimatePresence mode="wait">
                        {isSaved ? (
                          <motion.span key="saved-sheet"
                            initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 600, damping: 14 }}>
                            <BookmarkCheck size={14} strokeWidth={2.5} />
                          </motion.span>
                        ) : (
                          <motion.span key="unsaved-sheet"
                            initial={{ scale: 0, rotate: 15 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 600, damping: 14 }}>
                            <Bookmark size={14} strokeWidth={2.5} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Price row */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[18px] font-black text-brand-text">Rs.{product.price}</span>
                {product.originalPrice && (
                  <span className="text-[12px] text-brand-text-muted line-through">Rs.{product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="text-[10px] font-black text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-md">
                    Save Rs.{product.originalPrice! - product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 mt-4">
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {(["info", "nutrition"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 h-7 rounded-lg text-[10px] font-black uppercase transition-colors ${tab === t ? "bg-white text-brand-primary shadow-soft" : "text-gray-500"}`}>
                    {t === "info" ? "Product Info" : "Nutrition"}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pt-3 pb-4">
              {tab === "info" ? (
                <div className="space-y-3">
                  {product.description && (
                    <p className="text-[12px] text-brand-text-muted leading-relaxed">{product.description}</p>
                  )}
                  {product.details && product.details.length > 0 && (
                    <div className="bg-gray-50 rounded-2xl p-3 space-y-2">
                      {product.details.map((d, i) => {
                        const [label, value] = d.split(": ");
                        return (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-brand-text-muted">{label}</span>
                            <span className="text-[10px] font-black text-brand-text text-right">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-3">
                  <p className="text-[9px] font-black text-brand-text-muted uppercase tracking-wider mb-2">Per 100g serving</p>
                  {product.nutrition ? (
                    <div className="grid grid-cols-2 gap-2">
                      {product.nutrition.map((n) => (
                        <div key={n.label} className="bg-white rounded-xl p-2.5 text-center">
                          <p className="text-[13px] font-black text-brand-text">{n.value}</p>
                          <p className="text-[9px] text-brand-text-muted mt-0.5">{n.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-brand-text-muted text-center py-2">Nutrition info not available</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sticky bottom — Add to cart */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-brand-text-muted font-semibold">Total</p>
              <p className="text-[15px] font-black text-brand-text">
                Rs.{quantity > 0 ? product.price * quantity : product.price}
                {quantity > 1 && <span className="text-[10px] text-brand-text-muted font-semibold ml-1">({quantity} pcs)</span>}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
                  className="h-11 px-8 rounded-xl bg-brand-primary text-white text-xs font-black shadow-soft"
                >
                  Add to Cart
                </motion.button>
              ) : (
                <motion.div
                  key="qty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3 bg-brand-primary text-white rounded-xl px-3 h-11 shadow-soft"
                >
                  <motion.button whileTap={{ scale: 0.8 }}
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10">
                    <Minus size={14} strokeWidth={3} />
                  </motion.button>
                  <motion.span key={quantity}
                    initial={{ scale: 0.7 }} animate={{ scale: 1 }}
                    className="text-sm font-black w-5 text-center">
                    {quantity}
                  </motion.span>
                  <motion.button whileTap={{ scale: 0.8 }}
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10">
                    <Plus size={14} strokeWidth={3} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* List picker */}
      <AnimatePresence>
        {showListPicker && (
          <>
            <motion.div key="lbd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[69]" onClick={() => setShowListPicker(false)} />
            <motion.div key="lmodal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none px-6">
              <div className="w-full max-w-[300px] bg-white rounded-3xl p-4 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-black text-brand-text">Add to List</h3>
                    <p className="text-[10px] text-brand-text-muted truncate max-w-[180px]">{product.name}</p>
                  </div>
                  <button onClick={() => setShowListPicker(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
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
      {/* Fixed toast */}
      <AnimatePresence>
        {saveFlash !== null && toastPos !== null && (
          <motion.div
            key="sheet-toast"
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 520, damping: 26 }}
            className={`fixed z-[999] -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-black shadow-xl pointer-events-none ${
              saveFlash === "saved" ? "bg-brand-primary text-white" : "bg-gray-700 text-white"
            }`}
            style={{ left: toastPos.x, top: toastPos.y - 36 }}
          >
            {saveFlash === "saved" ? "✓ Saved!" : "✕ Removed"}
            <span className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent ${
              saveFlash === "saved" ? "border-t-brand-primary" : "border-t-gray-700"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
