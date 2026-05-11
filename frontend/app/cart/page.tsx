"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, Bike, ChevronRight, Clock, Heart,
  Minus, Package, Plus, ShieldCheck, Tag, Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { allProducts } from "@/data/mockData";

const productMap = Object.fromEntries(
  Object.values(allProducts).flat().map((p) => [p.id, p])
);

const COUPONS: Record<string, { label: string; discount: number; min: number; type: "pct" | "flat" }> = {
  SAVE10:   { label: "10% off (max Rs.80)",        discount: 0.10, min: 100, type: "pct"  },
  FIRST50:  { label: "Flat Rs.50 off",             discount: 50,  min: 0,   type: "flat" },
  SAVEGA20: { label: "20% off (max Rs.100)",        discount: 0.20, min: 200, type: "pct"  },
};

const TIPS = [0, 10, 20, 30, 50];

export default function CartPage() {
  const { items, updateQuantity, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const router = useRouter();

  const [couponInput, setCouponInput]     = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError]     = useState("");
  const [tip, setTip]                     = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  const subtotal    = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems  = items.reduce((s, i) => s + i.quantity, 0);
  const savings     = items.reduce((s, i) => {
    const p = productMap[i.id];
    const op = p && "originalPrice" in p ? (p as { originalPrice?: number }).originalPrice : undefined;
    return op ? s + (op - i.price) * i.quantity : s;
  }, 0);

  const DELIVERY_FEE   = 0;
  const HANDLING_FEE   = subtotal > 0 ? 5 : 0;
  const PLATFORM_FEE   = subtotal > 0 ? 3 : 0;

  let couponDiscount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const c = COUPONS[appliedCoupon];
    if (subtotal >= c.min) {
      couponDiscount = c.type === "pct"
        ? Math.min(subtotal * c.discount, c.discount === 0.10 ? 80 : 100)
        : c.discount;
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount + DELIVERY_FEE + HANDLING_FEE + PLATFORM_FEE + tip);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!COUPONS[code])              { setCouponError("Invalid coupon code"); return; }
    if (subtotal < COUPONS[code].min){ setCouponError(`Min order Rs.${COUPONS[code].min} required`); return; }
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

  /* ── Empty state ── */
  if (totalItems === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-8 py-8 text-center">
          <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center mb-6">
            <Package size={48} className="text-brand-primary/20" strokeWidth={1} />
          </div>
          <h2 className="text-xl font-black text-brand-text mb-2">Your cart is empty</h2>
          <p className="text-xs text-brand-text-muted mb-6">Add items to get started</p>
          <Link href="/" className="h-12 px-8 rounded-xl bg-brand-primary text-white text-sm font-black flex items-center justify-center">
            Shop Now
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* ── Header ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={16} strokeWidth={2.5} className="text-brand-text" />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="text-[15px] font-black text-brand-text">My Cart</h1>
          <p className="text-[10px] text-brand-text-muted">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="pb-48 bg-gray-50">

        {/* ── Delivery promise ── */}
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-brand-orange" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-black text-brand-text">Delivery in 10 minutes</p>
            <p className="text-[10px] text-brand-text-muted">Savega Express · Home - Mandya</p>
          </div>
          <Clock size={14} className="text-brand-text-muted" strokeWidth={2} />
        </div>

        {/* ── Items ── */}
        <div className="bg-white mt-2">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => {
              const p          = productMap[item.id];
              const imgColor   = p && "imageColor" in p ? (p as { imageColor: string }).imageColor : "from-gray-100 to-gray-50";
              const origPrice  = p && "originalPrice" in p ? (p as { originalPrice?: number }).originalPrice : undefined;
              const weight     = p && "weight" in p ? (p as { weight?: string }).weight : undefined;
              const lineTotal  = item.price * item.quantity;
              const pctOff     = origPrice ? Math.round(((origPrice - item.price) / origPrice) * 100) : 0;

              return (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
                  className={`flex items-center gap-3 px-4 py-3 ${idx !== 0 ? "border-t border-gray-50" : ""}`}
                >
                  {/* Image */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${imgColor} flex items-center justify-center flex-shrink-0 relative`}>
                    <Package size={24} className="text-brand-primary/50" strokeWidth={1.5} />
                    {pctOff > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white text-[8px] font-black px-1 py-0.5 rounded-md leading-none">
                        {pctOff}%
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-brand-text leading-tight truncate">{item.name}</p>
                    {weight && <p className="text-[10px] text-brand-text-muted mt-0.5">{weight}</p>}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[13px] font-black text-brand-text">Rs.{item.price}</span>
                      {origPrice && (
                        <span className="text-[10px] text-brand-text-muted line-through">Rs.{origPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Stepper + line total */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center border border-brand-primary rounded-lg overflow-hidden h-8">
                      <motion.button whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-brand-primary hover:bg-brand-primary/5"
                        aria-label={`Remove ${item.name}`}>
                        <Minus size={13} strokeWidth={2.5} />
                      </motion.button>
                      <span className="text-[12px] font-black text-brand-primary w-6 text-center">{item.quantity}</span>
                      <motion.button whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-brand-primary text-white hover:bg-brand-primary/90"
                        aria-label={`Add ${item.name}`}>
                        <Plus size={13} strokeWidth={2.5} />
                      </motion.button>
                    </div>
                    <span className="text-[11px] font-black text-brand-text">Rs.{lineTotal}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Savings strip */}
          {savings > 0 && (
            <div className="mx-4 mb-3 bg-brand-accent/10 rounded-xl px-3 py-2 flex items-center gap-2">
              <Tag size={12} className="text-brand-accent flex-shrink-0" strokeWidth={2.5} />
              <p className="text-[11px] font-black text-brand-accent">
                You&apos;re saving Rs.{savings} on this order 🎉
              </p>
            </div>
          )}
        </div>

        {/* ── Coupon ── */}
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <Tag size={14} className="text-brand-primary" strokeWidth={2.5} />
            <p className="text-[12px] font-black text-brand-text">Coupons & Offers</p>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-brand-accent/10 border border-brand-accent/30 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-[11px] font-black text-brand-accent">✓ {appliedCoupon} applied</p>
                <p className="text-[10px] text-brand-text-muted mt-0.5">{COUPONS[appliedCoupon].label}</p>
              </div>
              <button onClick={() => setAppliedCoupon(null)}
                className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-[11px] font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors uppercase tracking-wider" />
                <button onClick={handleApplyCoupon}
                  className="h-10 px-4 rounded-xl bg-brand-primary text-white text-[11px] font-black flex-shrink-0">
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1">{couponError}</p>}
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {Object.entries(COUPONS).map(([code, c]) => (
                  <button key={code} onClick={() => { setCouponInput(code); setCouponError(""); }}
                    className="flex items-center gap-1.5 text-[10px] font-black text-brand-primary bg-brand-primary/8 border border-brand-primary/25 px-2.5 py-1.5 rounded-lg">
                    <Tag size={9} strokeWidth={2.5} />
                    {code}
                    <span className="text-brand-text-muted font-semibold">· {c.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Tip for delivery partner ── */}
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={14} className="text-red-400" strokeWidth={2.5} />
            <p className="text-[12px] font-black text-brand-text">Tip your delivery partner</p>
          </div>
          <p className="text-[10px] text-brand-text-muted mb-2.5">100% of the tip goes directly to them</p>
          <div className="flex gap-2">
            {TIPS.map((t) => (
              <button key={t} onClick={() => setTip(t)}
                className={`flex-1 h-8 rounded-xl text-[11px] font-black border transition-colors ${
                  tip === t
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-gray-50 text-brand-text border-gray-100"
                }`}>
                {t === 0 ? "None" : `₹${t}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bill details ── */}
        <div className="bg-white mt-2 px-4 py-3">
          <p className="text-[12px] font-black text-brand-text mb-3">Bill Details</p>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[12px] text-brand-text-muted">Item Total</span>
              <span className="text-[12px] font-bold text-brand-text">Rs.{subtotal}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between">
                <span className="text-[12px] text-brand-text-muted">Product Savings</span>
                <span className="text-[12px] font-bold text-brand-accent">− Rs.{savings}</span>
              </div>
            )}
            {couponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-[12px] text-brand-text-muted">Coupon ({appliedCoupon})</span>
                <span className="text-[12px] font-bold text-brand-accent">− Rs.{Math.round(couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-brand-text-muted">Delivery Fee</span>
              </div>
              <span className="text-[12px] font-bold text-brand-accent">FREE</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-brand-text-muted">Handling Fee</span>
              </div>
              <span className="text-[12px] font-bold text-brand-text">Rs.{HANDLING_FEE}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-brand-text-muted">Platform Fee</span>
              <span className="text-[12px] font-bold text-brand-text">Rs.{PLATFORM_FEE}</span>
            </div>
            {tip > 0 && (
              <div className="flex justify-between">
                <span className="text-[12px] text-brand-text-muted">Delivery Partner Tip</span>
                <span className="text-[12px] font-bold text-brand-text">Rs.{tip}</span>
              </div>
            )}
            <div className="pt-2.5 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[13px] font-black text-brand-text">Grand Total</span>
              <span className="text-[14px] font-black text-brand-text">Rs.{Math.round(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* ── Payment method ── */}
        <div className="bg-white mt-2 px-4 py-3">
          <p className="text-[12px] font-black text-brand-text mb-2.5">Payment Method</p>
          <div className="space-y-2">
            {(["online", "cod"] as const).map((method) => (
              <button key={method} onClick={() => setPaymentMethod(method)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
                  paymentMethod === method
                    ? "border-brand-primary bg-brand-primary/5"
                    : "border-gray-100 bg-gray-50"
                }`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === method ? "border-brand-primary" : "border-gray-300"
                }`}>
                  {paymentMethod === method && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                </div>
                <span className="text-[12px] font-black text-brand-text">
                  {method === "online" ? "Pay Online (UPI / Card / Wallet)" : "Cash on Delivery"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Safety & trust ── */}
        <div className="bg-white mt-2 px-4 py-3 flex items-center gap-3">
          <ShieldCheck size={16} className="text-brand-accent flex-shrink-0" strokeWidth={2} />
          <p className="text-[10px] text-brand-text-muted leading-relaxed">
            Safe & secure payments. 100% authentic products. Easy returns & refunds.
          </p>
        </div>

        {/* ── Cancellation policy ── */}
        <p className="px-4 py-3 text-[10px] text-brand-text-muted text-center leading-relaxed">
          Orders can be cancelled within 2 minutes of placing. After that, cancellation is not guaranteed.
        </p>
      </div>

      {/* ── Sticky checkout bar — above bottom nav ── */}
      <div className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-[55] flex justify-center pointer-events-none">
        <div className="w-full max-w-[420px] pointer-events-auto">

          {/* Savings strip */}
          {(savings > 0 || couponDiscount > 0) && (
            <div className="bg-brand-accent flex items-center justify-center gap-1.5 py-1.5 px-4">
              <Tag size={10} className="text-white" strokeWidth={2.5} />
              <p className="text-[10px] font-black text-white">
                Total savings Rs.{Math.round(savings + couponDiscount)} on this order
              </p>
            </div>
          )}

          {/* Main button */}
          <motion.button whileTap={{ scale: 0.99 }} onClick={handleCheckout}
            className="w-full savega-gradient flex items-center px-4 py-3.5 shadow-[0_-6px_24px_rgba(95,37,159,0.3)]">

            {/* Left: total */}
            <div className="flex flex-col items-start leading-none mr-auto">
              <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">
                {totalItems} item{totalItems !== 1 ? "s" : ""} · Total
              </span>
              <span className="text-[16px] font-black text-white mt-0.5">Rs.{Math.round(grandTotal)}</span>
            </div>

            {/* Center: CTA */}
            <div className="flex items-center gap-2">
              <Bike size={16} className="text-white/80" strokeWidth={2} />
              <span className="text-[13px] font-black text-white uppercase tracking-wide">
                {paymentMethod === "cod" ? "Place Order" : "Proceed to Pay"}
              </span>
              <ChevronRight size={16} strokeWidth={3} className="text-white" />
            </div>
          </motion.button>
        </div>
      </div>
    </PageWrapper>
  );
}
