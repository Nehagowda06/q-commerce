"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // In a real app, clear cart here or on success page mount
    router.push("/order-success");
  };

  if (totalItems === 0) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 bg-brand-primary/5 rounded-full flex items-center justify-center">
              <ShoppingBag size={64} className="text-brand-primary/20" strokeWidth={1} />
            </div>
          </motion.div>
          <h2 className="text-2xl font-black text-brand-text mb-3">Your cart is empty</h2>
          <p className="text-sm text-brand-text-muted mb-10 max-w-[260px] mx-auto">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/" className="w-full max-w-[240px]">
            <Button fullWidth size="lg">Start Shopping</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="pb-32 px-4">
        <div className="flex items-center gap-3 py-6">
          <Link href="/">
            <div className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-brand-text">
              <ArrowLeft size={20} strokeWidth={3} />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-brand-text">My Cart ({totalItems})</h1>
        </div>

        {/* Item List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl p-4 shadow-soft border border-gray-100 flex items-center gap-4"
              >
                {/* Image Placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl shrink-0 border border-gray-50">
                  📦
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-brand-text leading-tight">{item.name}</h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-medium">₹{item.price} per unit</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-black text-brand-text">₹{item.price * item.quantity}</span>
                    
                    {/* Controls */}
                    <div className="flex items-center bg-brand-primary text-white rounded-full p-1 shadow-soft">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </motion.button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200">
          <h2 className="text-sm font-black text-brand-text uppercase tracking-widest mb-4">Bill Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted font-medium">Item Total</span>
              <span className="text-brand-text font-bold">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted font-medium">Delivery Fee</span>
              <span className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full">Free</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="text-base font-black text-brand-text uppercase tracking-tighter">Grand Total</span>
              <span className="text-lg font-black text-brand-primary">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Checkout */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex justify-center z-50">
          <div className="app-container w-full">
            <Button 
              fullWidth 
              size="lg" 
              className="h-14 shadow-medium flex items-center justify-between px-6"
              onClick={handleCheckout}
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Total to pay</span>
                <span className="text-lg font-black mt-1">₹{totalPrice}</span>
              </div>
              <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                Proceed to Checkout
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
