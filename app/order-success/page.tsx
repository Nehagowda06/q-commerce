"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Truck } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";

const confettiPieces = Array.from({ length: 20 }, (_, index) => ({
  id: index,
<<<<<<< HEAD
  x: `${(index * 37) % 100}%`,
  y: `${(index * 61) % 100}%`,
  duration: 2 + (index % 4) * 0.35,
  delay: (index % 6) * 0.45,
=======
  x: `${(index * 17) % 100}%`,
  y: `${(index * 23) % 100}%`,
  duration: 2.2 + (index % 4) * 0.35,
  delay: (index % 5) * 0.25,
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
  color: ["bg-brand-primary", "bg-brand-accent", "bg-yellow-400", "bg-blue-400"][index % 4],
}));

function Confetti() {
  return (
<<<<<<< HEAD
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ x: "50%", y: "50%", scale: 0, rotate: 0 }}
          animate={{ x: piece.x, y: piece.y, scale: [0, 1, 0.5], rotate: 360 }}
=======
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={false}
          animate={{
            x: piece.x,
            y: piece.y,
            scale: [0.7, 1, 0.8],
            rotate: 360,
          }}
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          transition={{
            duration: piece.duration,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: piece.delay,
          }}
<<<<<<< HEAD
          className={`absolute w-3 h-3 rounded-sm ${piece.color}`}
=======
          className={`absolute left-1/2 top-1/2 h-3 w-3 rounded-sm ${piece.color}`}
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
        />
      ))}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <PageWrapper>
      <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Confetti />

<<<<<<< HEAD
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-accent/30 mb-8 z-10"
        >
=======
        <div className="z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-accent text-white shadow-lg shadow-brand-accent/30">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          <Check size={48} strokeWidth={4} />
        </div>

<<<<<<< HEAD
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="z-10">
          <h1 className="text-3xl font-black text-brand-text mb-2">Order Placed!</h1>
          <p className="text-sm text-brand-text-muted mb-8 font-medium">
            Order ID: <span className="text-brand-text">#SV-82941</span>
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-soft mb-10 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
=======
        <div className="z-10">
          <h1 className="mb-2 text-3xl font-black text-brand-text">Order Placed! 🎉</h1>
          <p className="mb-8 text-sm font-medium text-brand-text-muted">
            Order ID: <span className="text-brand-text">#QC-82941</span>
          </p>

          <div className="mb-10 flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 text-left shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
              <Truck size={24} strokeWidth={2.5} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                Estimated Delivery
              </p>
              <p className="mt-1 text-lg font-black leading-none text-brand-text">
                Arriving in <span className="text-brand-accent">12 mins</span>
              </p>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="w-full max-w-[280px] z-10">
=======
        <div className="z-10 w-full max-w-[280px]">
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          <Link href="/">
            <Button fullWidth size="lg" className="group shadow-medium">
              Continue Shopping
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

<<<<<<< HEAD
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-8">
            Thank you for choosing Savega
=======
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Thank you for choosing Q-Commerce
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
