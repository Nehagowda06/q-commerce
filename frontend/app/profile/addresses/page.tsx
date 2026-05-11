"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

interface Address {
  id: number;
  label: string;
  line1: string;
  line2: string;
  primary: boolean;
}

const initial: Address[] = [
  { id: 1, label: "Home", line1: "12, MG Road", line2: "Mandya, Karnataka 571401", primary: true },
  { id: 2, label: "Work", line1: "45, Industrial Area", line2: "Mandya, Karnataka 571402", primary: false },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Address | null>(null);
  const [label, setLabel] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const openAdd = () => {
    setEditTarget(null);
    setLabel(""); setLine1(""); setLine2("");
    setShowForm(true);
  };

  const openEdit = (addr: Address) => {
    setEditTarget(addr);
    setLabel(addr.label); setLine1(addr.line1); setLine2(addr.line2);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!label.trim() || !line1.trim()) return;
    if (editTarget) {
      setAddresses((prev) => prev.map((a) => a.id === editTarget.id ? { ...a, label, line1, line2 } : a));
    } else {
      setAddresses((prev) => [...prev, { id: Date.now(), label, line1, line2, primary: prev.length === 0 }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, primary: a.id === id })));
  };

  return (
    <PageWrapper>
      <div className="p-3 pb-28">
        <div className="flex items-center gap-3 mb-5">
          <Link href="/profile">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-text">
              <ArrowLeft size={18} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-base font-black text-brand-text">My Addresses</h1>
        </div>

        <div className="space-y-3 mb-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0 mt-0.5">
                <MapPin size={18} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-black text-brand-text">{addr.label}</p>
                  {addr.primary
                    ? <span className="text-[9px] font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">Default</span>
                    : <button onClick={() => setDefault(addr.id)} className="text-[9px] font-bold text-brand-text-muted underline">Set default</button>
                  }
                </div>
                <p className="text-[11px] text-brand-text-muted">{addr.line1}</p>
                <p className="text-[11px] text-brand-text-muted">{addr.line2}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(addr)} className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                  <Pencil size={14} strokeWidth={2.5} />
                </button>
                <button onClick={() => handleDelete(addr.id)} className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={openAdd}
          className="w-full h-11 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-xs font-bold text-brand-text-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add New Address
        </button>
      </div>

      {/* Add / Edit modal */}
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
                  <h3 className="text-sm font-black text-brand-text">{editTarget ? "Edit Address" : "New Address"}</h3>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Label (e.g. Home)", value: label, setter: setLabel },
                    { label: "Address Line 1", value: line1, setter: setLine1 },
                    { label: "Address Line 2", value: line2, setter: setLine2 },
                  ].map(({ label: lbl, value, setter }) => (
                    <div key={lbl}>
                      <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">{lbl}</label>
                      <input value={value} onChange={(e) => setter(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                  ))}
                </div>
                <button onClick={handleSave} className="mt-4 w-full h-11 rounded-xl bg-brand-primary text-white text-xs font-black">
                  {editTarget ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

