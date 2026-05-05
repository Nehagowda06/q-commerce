"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Truck } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";

const confettiPieces = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  x: `${(index * 17) % 100}%`,
  y: `${(index * 23) % 100}%`,
  duration: 2.2 + (index % 4) * 0.35,
  delay: (index % 5) * 0.25,
  color: ["bg-brand-primary", "bg-brand-accent", "bg-yellow-400", "bg-blue-400"][index % 4],
}));

function Confetti() {
  return (
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
          transition={{
            duration: piece.duration,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: piece.delay,
          }}
          className={`absolute left-1/2 top-1/2 h-3 w-3 rounded-sm ${piece.color}`}
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

        <div className="z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-accent text-white shadow-lg shadow-brand-accent/30">
          <Check size={48} strokeWidth={4} />
        </div>

        <div className="z-10">
          <h1 className="mb-2 text-3xl font-black text-brand-text">Order Placed! 🎉</h1>
          <p className="mb-8 text-sm font-medium text-brand-text-muted">
            Order ID: <span className="text-brand-text">#QC-82941</span>
          </p>

          <div className="mb-10 flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 text-left shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
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

        <div className="z-10 w-full max-w-[280px]">
          <Link href="/">
            <Button fullWidth size="lg" className="group shadow-medium">
              Continue Shopping
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Thank you for choosing Q-Commerce
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
