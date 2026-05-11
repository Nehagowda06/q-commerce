"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CreditCard, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

interface Card {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  primary: boolean;
}

const initial: Card[] = [
  { id: 1, type: "Visa", last4: "4242", expiry: "08/27", primary: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "12/25", primary: false },
];

export default function PaymentsPage() {
  const [cards, setCards] = useState<Card[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAdd = () => {
    if (cardNum.length < 4) return;
    const last4 = cardNum.slice(-4);
    const type = cardNum.startsWith("4") ? "Visa" : "Mastercard";
    setCards((prev) => [...prev, { id: Date.now(), type, last4, expiry, primary: prev.length === 0 }]);
    setShowForm(false);
    setCardNum(""); setExpiry(""); setCvv("");
  };

  const handleDelete = (id: number) => setCards((prev) => prev.filter((c) => c.id !== id));
  const setDefault = (id: number) => setCards((prev) => prev.map((c) => ({ ...c, primary: c.id === id })));

  return (
    <PageWrapper>
      <div className="p-3 pb-28">
        <div className="flex items-center gap-3 mb-5">
          <Link href="/profile">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-text">
              <ArrowLeft size={18} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-base font-black text-brand-text">Payments & Refunds</h1>
        </div>

        <div className="space-y-3 mb-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <CreditCard size={20} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-brand-text">{card.type} •••• {card.last4}</p>
                <p className="text-[10px] text-brand-text-muted mt-0.5">Expires {card.expiry}</p>
                {!card.primary && (
                  <button onClick={() => setDefault(card.id)} className="text-[9px] font-bold text-brand-primary mt-0.5">
                    Set as primary
                  </button>
                )}
              </div>
              {card.primary
                ? <span className="text-[9px] font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">Primary</span>
                : <button onClick={() => handleDelete(card.id)} className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-400 flex-shrink-0">
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
              }
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full h-11 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-xs font-bold text-brand-text-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add New Card
        </button>

        <div className="mt-5">
          <h2 className="text-xs font-black text-brand-text mb-3">Recent Refunds</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 text-center">
            <p className="text-[11px] text-brand-text-muted font-semibold">No refunds yet</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setShowForm(false)} />
            <motion.div key="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-6">
              <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-brand-text">Add New Card</h3>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Card Number</label>
                    <input value={cardNum} onChange={(e) => setCardNum(e.target.value.replace(/\D/g, "").slice(0, 16))}
                      placeholder="1234 5678 9012 3456" maxLength={16}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">Expiry</label>
                      <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY"
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">CVV</label>
                      <input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" maxLength={3}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                  </div>
                </div>
                <button onClick={handleAdd} className="mt-4 w-full h-11 rounded-xl bg-brand-primary text-white text-xs font-black">
                  Add Card
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

