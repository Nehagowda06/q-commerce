"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

const faqs = [
  { q: "How do I track my order?", a: "Go to Orders in your profile and tap on the active order to see live tracking." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 minutes of placing. After that, contact support." },
  { q: "What is the delivery time?", a: "We deliver in 10 minutes within our serviceable areas in Mandya." },
  { q: "How do I get a refund?", a: "Refunds are processed within 3–5 business days to your original payment method." },
];

type ContactType = "call" | "chat" | "email" | null;

export default function SupportPage() {
  const [contact, setContact] = useState<ContactType>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(""); setContact(null); }, 2000);
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
          <h1 className="text-base font-black text-brand-text">Customer Support</h1>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {([
            { icon: Phone, label: "Call Us", type: "call" as ContactType },
            { icon: MessageCircle, label: "Live Chat", type: "chat" as ContactType },
            { icon: Mail, label: "Email", type: "email" as ContactType },
          ]).map(({ icon: Icon, label, type }) => (
            <button
              key={label}
              onClick={() => setContact(type)}
              className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex flex-col items-center gap-1.5 active:bg-brand-primary/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Icon size={18} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-black text-brand-text">{label}</span>
            </button>
          ))}
        </div>

        <h2 className="text-xs font-black text-brand-text mb-3">FAQs</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          {faqs.map((faq, i) => (
            <details key={i} className={`group ${i !== faqs.length - 1 ? "border-b border-gray-50" : ""}`}>
              <summary className="flex items-center justify-between p-3 cursor-pointer list-none">
                <span className="text-xs font-bold text-brand-text pr-2">{faq.q}</span>
                <ChevronRight size={14} className="text-gray-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="px-3 pb-3 text-[11px] text-brand-text-muted leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact modal */}
      <AnimatePresence>
        {contact && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setContact(null)} />
            <motion.div key="modal" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-6">
              <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-brand-text">
                    {contact === "call" ? "Call Support" : contact === "chat" ? "Live Chat" : "Email Support"}
                  </h3>
                  <button onClick={() => setContact(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>
                {contact === "call" ? (
                  <div className="text-center py-2">
                    <p className="text-[11px] text-brand-text-muted mb-4">Our support team is available 9 AM – 9 PM</p>
                    <a href="tel:+918001234567"
                      className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl text-xs font-black">
                      <Phone size={16} strokeWidth={2.5} />
                      +91 800 123 4567
                    </a>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-brand-text-muted mb-3">
                      {contact === "chat" ? "Start a live chat with our team." : "Send us an email and we'll respond within 24 hours."}
                    </p>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue..." rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors resize-none" />
                    <button onClick={handleSend}
                      className={`mt-3 w-full h-11 rounded-xl text-xs font-black transition-colors ${sent ? "bg-brand-accent text-white" : "bg-brand-primary text-white"}`}>
                      {sent ? "✓ Sent!" : contact === "chat" ? "Start Chat" : "Send Email"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

