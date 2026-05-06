"use client";

<<<<<<< HEAD
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Minus, Package, Plus, ShoppingBag } from "lucide-react";
=======
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, updateQuantity } = useCartStore();
  const router = useRouter();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems === 0) {
    return (
      <PageWrapper>
<<<<<<< HEAD
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
            <div className="w-32 h-32 bg-brand-primary/5 rounded-full flex items-center justify-center">
              <ShoppingBag size={64} className="text-brand-primary/20" strokeWidth={1} />
            </div>
          </motion.div>
          <h2 className="text-2xl font-black text-brand-text mb-3">Your cart is empty</h2>
          <p className="text-sm text-brand-text-muted mb-10 max-w-[260px] mx-auto">
            Looks like you have not added anything to your cart yet.
=======
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
          <div className="relative mb-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-primary/5">
              <ShoppingBag size={64} className="text-brand-primary/20" strokeWidth={1} />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-black text-brand-text">Your cart is empty</h2>
          <p className="mx-auto mb-10 max-w-[260px] text-sm text-brand-text-muted">
            Looks like you haven&apos;t added anything to your cart yet.
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          </p>
          <Link href="/" className="w-full max-w-[240px]">
            <Button fullWidth size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
<<<<<<< HEAD
      <div className="pb-40 px-4">
=======
      <div className="px-4 pb-32">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
        <div className="flex items-center gap-3 py-6">
          <Link href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-text shadow-soft">
              <ArrowLeft size={20} strokeWidth={3} />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-brand-text">My Cart ({totalItems})</h1>
        </div>

        <div className="space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-soft"
              >
<<<<<<< HEAD
                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-50 text-brand-primary">
                  <Package size={30} strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-brand-text leading-tight">{item.name}</h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-medium">Rs.{item.price} per unit</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-brand-text">Rs.{item.price * item.quantity}</span>
                    <div className="flex items-center bg-brand-primary text-white rounded-full p-1 shadow-soft">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Minus size={14} strokeWidth={3} />
                      </motion.button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus size={14} strokeWidth={3} />
                      </motion.button>
=======
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-gray-50 bg-gray-50 text-3xl">
                  📦
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-bold leading-tight text-brand-text">{item.name}</h3>
                  <p className="mt-1 text-xs font-medium text-brand-text-muted">₹{item.price} per unit</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-black text-brand-text">
                      ₹{item.price * item.quantity}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>

                      <div className="flex items-center rounded-full bg-brand-primary p-1 text-white shadow-soft">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </motion.button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </motion.button>
                      </div>
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

<<<<<<< HEAD
        <div className="mt-8 bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200">
          <h2 className="text-sm font-black text-brand-text uppercase tracking-widest mb-4">Bill Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-text-muted font-medium">Item Total</span>
              <span className="text-brand-text font-bold">Rs.{totalPrice}</span>
=======
        <div className="mt-8 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-brand-text">
            Bill Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-brand-text-muted">Item Total</span>
              <span className="font-bold text-brand-text">₹{totalPrice}</span>
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-brand-text-muted">Delivery Fee</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-500">
                Free
              </span>
            </div>
<<<<<<< HEAD
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="text-base font-black text-brand-text uppercase tracking-tighter">Grand Total</span>
              <span className="text-lg font-black text-brand-primary">Rs.{totalPrice}</span>
=======
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="text-base font-black uppercase tracking-tighter text-brand-text">
                Grand Total
              </span>
              <span className="text-lg font-black text-brand-primary">₹{totalPrice}</span>
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-center z-50">
=======
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center border-t border-gray-100 bg-white/80 p-4 backdrop-blur-xl">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          <div className="w-full max-w-[420px]">
            <Button
              fullWidth
              size="lg"
<<<<<<< HEAD
              className="h-14 shadow-medium flex items-center justify-between px-6"
              onClick={() => router.push("/order-success")}
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Total to pay</span>
                <span className="text-lg font-black mt-1">Rs.{totalPrice}</span>
              </div>
              <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                Checkout
=======
              className="flex h-14 items-center justify-between px-6 shadow-medium"
              onClick={() => router.push("/order-success")}
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                  Total to pay
                </span>
                <span className="mt-1 text-lg font-black">₹{totalPrice}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                Proceed to Checkout
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
