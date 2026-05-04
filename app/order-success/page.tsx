"use client";

import { motion } from "framer-motion";
import { Check, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: "50%", 
            y: "50%", 
            scale: 0,
            rotate: 0 
          }}
          animate={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`, 
            scale: [0, 1, 0.5],
            rotate: 360 
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
          className={`absolute w-3 h-3 rounded-sm ${
            ["bg-brand-primary", "bg-brand-accent", "bg-yellow-400", "bg-blue-400"][i % 4]
          }`}
        />
      ))}
    </div>
  );
};

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PageWrapper>
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
        <Confetti />

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-accent/30 mb-8 z-10"
        >
          <Check size={48} strokeWidth={4} />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="z-10"
        >
          <h1 className="text-3xl font-black text-brand-text mb-2">
            Order Placed! 🎉
          </h1>
          <p className="text-sm text-brand-text-muted mb-8 font-medium">
            Order ID: <span className="text-brand-text">#QC-82941</span>
          </p>

          {/* Delivery Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-soft mb-10 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
              <Truck size={24} strokeWidth={2.5} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest leading-none">
                Estimated Delivery
              </p>
              <p className="text-lg font-black text-brand-text mt-1 leading-none">
                Arriving in <span className="text-brand-accent">12 mins</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-[280px] z-10"
        >
          <Link href="/">
            <Button fullWidth size="lg" className="shadow-medium group">
              Continue Shopping
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-8">
            Thank you for choosing Q-Commerce
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
