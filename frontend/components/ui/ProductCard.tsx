"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Check, Minus, Package, Plus, X, Zap } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
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
  const { lists, addItem: addToList, deleteItem } = useListStore();
  const cartItem = items.find((item) => item.id === itemId);
  const quantity = cartItem?.quantity || 0;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const [showListPicker, setShowListPicker] = useState(false);
  const [addedToListId, setAddedToListId] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [saveFlash, setSaveFlash] = useState<"saved" | "unsaved" | null>(null);
  const [toastPos, setToastPos] = useState<{ x: number; y: number } | null>(null);
  const bookmarkRef = useRef<HTMLButtonElement>(null);

  // Check if this product is saved in any list
  const isSaved = lists.some((list) =>
    list.items.some((item) => item.productId === itemId)
  );

  const captureToastPos = () => {
    if (bookmarkRef.current) {
      const r = bookmarkRef.current.getBoundingClientRect();
      setToastPos({ x: r.left + r.width / 2, y: r.top });
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      lists.forEach((list) => {
        list.items.forEach((item) => {
          if (item.productId === itemId) {
            deleteItem(list.id, item.id);
          }
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
    addToList(listId, { text: `${name}${weight ? ` (${weight})` : ""}`, checked: false, productId: itemId, price });
    setAddedToListId(listId);
    // Close modal first, then show toast after exit animation finishes
    setTimeout(() => {
      setAddedToListId(null);
      setShowListPicker(false);
      // Small extra delay so the modal is fully gone before toast appears
      setTimeout(() => {
        captureToastPos();
        setSaveFlash("saved");
        setTimeout(() => { setSaveFlash(null); setToastPos(null); }, 1400);
      }, 320);
    }, 600);
  };

  // Particle burst on add to cart
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; tx: number; ty: number; color: string }[]>([]);
  const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear particles on unmount so they don't bleed into other pages
  useEffect(() => {
    return () => {
      if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
      setParticles([]);
    };
  }, []);

  const triggerParticles = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ["#6941c6", "#00b761", "#ff9500", "#f43f5e", "#3b82f6"];
    const newParticles = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 2 * Math.PI;
      const dist = 30 + Math.random() * 20;
      return {
        id: Date.now() + i,
        x: cx,
        y: cy,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        color: colors[i % colors.length],
      };
    });
    setParticles(newParticles);
    if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
    particleTimerRef.current = setTimeout(() => setParticles([]), 650);
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

        {/* Bookmark button */}
        <div className="absolute top-2 left-2 z-20">
          {/* Pulse ring on save */}
          <AnimatePresence>
            {saveFlash === "saved" && (
              <motion.span
                key="pulse"
                className="absolute inset-0 rounded-lg bg-brand-primary pointer-events-none"
                initial={{ opacity: 0.55, scale: 1 }}
                animate={{ opacity: 0, scale: 2.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          <motion.button
            ref={bookmarkRef}
            type="button"
            onClick={handleBookmarkClick}
            whileTap={{ scale: 0.82 }}
            className={`relative w-6 h-6 rounded-lg backdrop-blur-sm flex items-center justify-center shadow-sm border transition-colors ${
              isSaved
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white/90 text-brand-primary border-white/60"
            }`}
            aria-label={isSaved ? "Remove from list" : "Add to list"}
          >
            <AnimatePresence mode="wait">
              {isSaved ? (
                <motion.span
                  key="saved-icon"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 600, damping: 14 }}
                >
                  <BookmarkCheck size={11} strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="unsaved-icon"
                  initial={{ scale: 0, rotate: 15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -15 }}
                  transition={{ type: "spring", stiffness: 600, damping: 14 }}
                >
                  <Bookmark size={11} strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

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

          {/* Discount badge */}
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
                  onClick={(e) => { e.stopPropagation(); triggerParticles(e); addItem({ id: itemId, name, price }); }}
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
                    <h3 className="text-sm font-black text-brand-text">Save to List</h3>
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
                          {added && (
                            <motion.span
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 600, damping: 14 }}
                            >
                              <Check size={14} strokeWidth={3} className="text-brand-primary flex-shrink-0" />
                            </motion.span>
                          )}
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
      {/* Fixed toast — renders above all overflow/clip contexts */}
      <AnimatePresence>
        {saveFlash !== null && toastPos !== null && (
          <motion.div
            key="save-toast"
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
            {/* Arrow pointing down */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent ${
                saveFlash === "saved" ? "border-t-brand-primary" : "border-t-gray-700"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle burst — rendered into document.body via portal */}
      {typeof document !== "undefined" && particles.length > 0 && createPortal(
        <>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="fixed z-[9999] pointer-events-none rounded-full"
              style={{ left: p.x, top: p.y, width: 7, height: 7, backgroundColor: p.color, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: p.tx, y: p.ty, scale: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}
        </>,
        document.body
      )}
    </>
  );
}
