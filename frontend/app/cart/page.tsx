"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Clock, Minus, Package, Plus, ShoppingBag, Tag, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { allProducts } from "@/data/mockData";

// Flat product lookup for image colors
const productMap = Object.fromEntries(
  Object.values(allProducts).flat().map((p) => [p.id, p])
);

const COUPONS: Record<string, { label: string; discount: number; min: number }> = {
  SAVE10: { label: "10% off on orders above Rs.100", discount: 0.1, min: 100 },
  FIRST50: { label: "Flat Rs.50 off on first order", discount: 50, min: 0 },
  SAVEGA20: { label: "20% off up to Rs.80", discount: 0.2, min: 200 },
};

export default function CartPage() {
  const { items, updateQuantity, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const router = useRouter();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const savings = items.reduce((sum, item) => {
    const p = productMap[item.id];
    if (p && "originalPrice" in p && p.originalPrice) {
      return sum + (p.originalPrice - p.price) * item.quantity;
    }
    return sum;
  }, 0);

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const c = COUPONS[appliedCoupon];
    if (subtotal >= c.min) {
      couponDiscount = c.discount < 1 ? Math.min(subtotal * c.discount, 80) : c.discount;
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!COUPONS[code]) { setCouponError("Invalid coupon code"); return; }
    if (subtotal < COUPONS[code].min) { setCouponError(`Min order Rs.${COUPONS[code].min} required`); return; }
    setAppliedCoupon(code);
    setCouponError("");
    setCouponInput("");
  };

  const handleCheckout = () => {
    const order = placeOrder(
      items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      grandTotal
    );
    clearCart();
    router.push(`/order-success?orderId=${order.id}`);
  };

  if (totalItems === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-8 py-8 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6">
            <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center">
              <ShoppingBag size={48} className="text-brand-primary/20" strokeWidth={1} />
            </div>
          </motion.div>
          <h2 className="text-xl font-black text-brand-text mb-2">Your cart is empty</h2>
          <p className="text-xs text-brand-text-muted mb-6 max-w-[260px] mx-auto">
            Add items from the store to get started.
          </p>
          <Link href="/"
            className="w-full max-w-[240px] h-12 rounded-xl bg-brand-primary text-white text-sm font-black flex items-center justify-center">
            Start Shopping
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-brand-text">
            <ArrowLeft size={16} strokeWidth={2.5} />
          </div>
        </Link>
        <div>
          <h1 className="text-[15px] font-black text-brand-text leading-tight">My Cart</h1>
          <p className="text-[10px] text-brand-text-muted">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="pb-44">
        {/* Delivery promise banner */}
        <div className="mx-3 mt-3 bg-brand-primary/5 border border-brand-primary/20 rounded-xl px-3 py-2 flex items-center gap-2">
          <Zap size={14} className="text-brand-primary flex-shrink-0" strokeWidth={2.5} />
          <p className="text-[11px] font-black text-brand-primary">Delivery in 10 minutes</p>
          <Clock size={12} className="text-brand-primary ml-auto flex-shrink-0" strokeWidth={2.5} />
        </div>

        {/* Items */}
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => {
              const p = productMap[item.id];
              const imageColor = p && "imageColor" in p ? (p as { imageColor: string }).imageColor : "from-gray-100 to-gray-50";
              const originalPrice = p && "originalPrice" in p ? (p as { originalPrice?: number }).originalPrice : undefined;
              const weight = p && "weight" in p ? (p as { weight?: string }).weight : undefined;
              const lineTotal = item.price * item.quantity;
              const lineSaving = originalPrice ? (originalPrice - item.price) * item.quantity : 0;

              return (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className={idx !== 0 ? "border-t border-gray-50" : ""}
                >
                  <div className="flex items-center gap-3 px-3 py-3">
                    {/* Product image */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${imageColor} flex items-center justify-center flex-shrink-0`}>
                      <Package size={22} className="text-brand-primary/60" strokeWidth={1.5} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-black text-brand-text leading-tight truncate">{item.name}</p>
                      {weight && <p className="text-[10px] text-brand-text-muted mt-0.5">{weight}</p>}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] font-black text-brand-text">Rs.{item.price}</span>
                        {originalPrice && (
                          <span className="text-[10px] text-brand-text-muted line-through">Rs.{originalPrice}</span>
                        )}
                        {lineSaving > 0 && (
                          <span className="text-[9px] font-black text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-md">
                            Save Rs.{lineSaving}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Qty + total */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <div className="flex items-center bg-brand-primary text-white rounded-lg overflow-hidden h-7">
                        <motion.button whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white/10"
                          aria-label={`Remove ${item.name}`}>
                          <Minus size={12} strokeWidth={3} />
                        </motion.button>
                        <span className="text-[11px] font-black w-5 text-center">{item.quantity}</span>
                        <motion.button whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white/10"
                          aria-label={`Add ${item.name}`}>
                          <Plus size={12} strokeWidth={3} />
                        </motion.button>
                      </div>
                      <span className="text-[11px] font-black text-brand-text">Rs.{lineTotal}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Savings callout */}
        {savings > 0 && (
          <div className="mx-3 mt-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-3 py-2 flex items-center gap-2">
            <Tag size={13} className="text-brand-accent flex-shrink-0" strokeWidth={2.5} />
            <p className="text-[11px] font-black text-brand-accent">You're saving Rs.{savings} on this order 🎉</p>
          </div>
        )}

        {/* Coupon */}
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-100 shadow-soft p-3">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={13} className="text-brand-primary" strokeWidth={2.5} />
            <p className="text-[11px] font-black text-brand-text">Apply Coupon</p>
          </div>
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-brand-accent/10 border border-brand-accent/30 rounded-xl px-3 py-2">
              <div>
                <p className="text-[11px] font-black text-brand-accent">{appliedCoupon} applied</p>
                <p className="text-[10px] text-brand-text-muted">{COUPONS[appliedCoupon].label}</p>
              </div>
              <button onClick={() => setAppliedCoupon(null)}
                className="text-[10px] font-black text-red-500 ml-2">Remove</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input value={couponInput} onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                placeholder="Enter coupon code"
                className="flex-1 h-9 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[11px] font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors uppercase" />
              <button onClick={handleApplyCoupon}
                className="h-9 px-4 rounded-xl bg-brand-primary text-white text-[11px] font-black flex-shrink-0">
                Apply
              </button>
            </div>
          )}
          {couponError && <p className="text-[10px] text-red-500 font-bold mt-1.5">{couponError}</p>}
          {!appliedCoupon && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {Object.keys(COUPONS).map((code) => (
                <button key={code} onClick={() => { setCouponInput(code); setCouponError(""); }}
                  className="text-[9px] font-black text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-lg border border-brand-primary/20">
                  {code}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Delivery info */}
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0">
            <Truck size={16} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black text-brand-text">Free delivery</p>
            <p className="text-[10px] text-brand-text-muted">No delivery charges on this order</p>
          </div>
          <span className="text-[10px] font-black text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">FREE</span>
        </div>

        {/* Bill details */}
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-100 shadow-soft p-3">
          <p className="text-[11px] font-black text-brand-text mb-3">Bill Details</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-brand-text-muted">Item Total</span>
              <span className="text-[11px] font-bold text-brand-text">Rs.{subtotal}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-brand-text-muted">Product Savings</span>
                <span className="text-[11px] font-bold text-brand-accent">− Rs.{savings}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-brand-text-muted">Delivery Fee</span>
              <span className="text-[11px] font-bold text-brand-accent">FREE</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-brand-text-muted">Coupon ({appliedCoupon})</span>
                <span className="text-[11px] font-bold text-brand-accent">− Rs.{Math.round(couponDiscount)}</span>
              </div>
            )}
            <div className="pt-2 mt-1 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[13px] font-black text-brand-text">Grand Total</span>
              <span className="text-[14px] font-black text-brand-primary">Rs.{Math.round(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="mx-3 mt-3 bg-white rounded-2xl border border-gray-100 shadow-soft p-3">
          <p className="text-[11px] font-black text-brand-text mb-2.5">Payment Method</p>
          <div className="grid grid-cols-2 gap-2">
            {(["online", "cod"] as const).map((method) => (
              <button key={method} onClick={() => setPaymentMethod(method)}
                className={`h-10 rounded-xl border text-[11px] font-black transition-colors ${
                  paymentMethod === method
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-gray-50 text-brand-text border-gray-100"
                }`}>
                {method === "online" ? "💳 Pay Online" : "💵 Cash on Delivery"}
              </button>
            ))}
          </div>
        </div>

        {/* Cancellation policy */}
        <p className="mx-3 mt-3 text-[10px] text-brand-text-muted text-center leading-relaxed">
          Orders can be cancelled within 2 minutes of placing. After that, cancellation is not guaranteed.
        </p>
      </div>

      {/* Sticky checkout bar — sits above bottom nav */}
      <div className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-[55] flex justify-center pointer-events-none px-3">
        <div className="w-full max-w-[420px] pointer-events-auto">
          {/* Savings strip */}
          {(savings > 0 || couponDiscount > 0) && (
            <div className="bg-brand-accent text-white rounded-t-xl px-4 py-1.5 flex items-center justify-center gap-1.5">
              <Tag size={11} strokeWidth={2.5} />
              <p className="text-[10px] font-black">
                Total savings: Rs.{Math.round(savings + couponDiscount)} on this order 🎉
              </p>
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            className={`w-full bg-brand-primary text-white flex items-center justify-between px-5 py-4 shadow-[0_-4px_20px_rgba(95,37,159,0.25)] ${(savings > 0 || couponDiscount > 0) ? "rounded-b-2xl" : "rounded-2xl"}`}
          >
            {/* Left: total */}
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                {totalItems} item{totalItems !== 1 ? "s" : ""} · Total
              </span>
              <span className="text-[17px] font-black mt-1">Rs.{Math.round(grandTotal)}</span>
            </div>

            {/* Center: CTA */}
            <span className="text-[14px] font-black uppercase tracking-wide">
              {paymentMethod === "cod" ? "Place Order" : "Proceed to Pay"}
            </span>

            {/* Right: arrow */}
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight size={16} strokeWidth={3} />
            </div>
          </motion.button>
        </div>
      </div>
    </PageWrapper>
  );
}
