"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, ClipboardList, RotateCcw, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useOrderStore, type Order, type OrderStatus } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";

const STATUS_STEPS: { key: OrderStatus; label: string }[] = [
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "picked_up", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  confirmed: "text-blue-600 bg-blue-50",
  preparing: "text-amber-600 bg-amber-50",
  picked_up: "text-brand-primary bg-brand-primary/10",
  delivered: "text-brand-accent bg-brand-accent/10",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  picked_up: "Out for Delivery",
  delivered: "Delivered",
};

function MiniTracker({ status }: { status: OrderStatus }) {
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === status);
  return (
    <div className="flex items-center gap-1 mt-2">
      {STATUS_STEPS.map((step, idx) => {
        const done = idx <= currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step.key} className="flex items-center gap-1 flex-1 last:flex-none">
            <motion.div
              animate={{ backgroundColor: done ? (active ? "#00b761" : "#5f259f") : "#e5e7eb" }}
              className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center"
            >
              {done && !active && <Check size={7} strokeWidth={3} className="text-white" />}
              {active && <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 rounded-full bg-white" />}
            </motion.div>
            {idx < STATUS_STEPS.length - 1 && (
              <motion.div animate={{ backgroundColor: idx < currentIdx ? "#5f259f" : "#e5e7eb" }}
                className="h-0.5 flex-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order, onExpand }: { order: Order; onExpand: () => void }) {
  const date = new Date(order.placedAt);
  const timeStr = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [reordering, setReordering] = useState(false);

  const handleReorder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReordering(true);
    order.items.forEach((item) => addItem({ id: item.id, name: item.name, price: item.price }));
    setTimeout(() => {
      setReordering(false);
      router.push("/cart");
    }, 700);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-xs font-black text-brand-text">#{order.orderId}</p>
          <p className="text-[10px] text-brand-text-muted">{dateStr} · {timeStr}</p>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[order.status]}`}>
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <p className="text-[11px] text-brand-text-muted mb-1">
        {order.items.slice(0, 2).map((i) => i.name).join(", ")}
        {order.items.length > 2 ? ` +${order.items.length - 2} more` : ""}
      </p>

      <MiniTracker status={order.status} />

      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-50">
        <span className="text-xs font-black text-brand-text">Rs.{order.total}</span>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleReorder}
            disabled={reordering}
            className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-colors ${
              reordering ? "bg-brand-accent text-white" : "bg-brand-primary/10 text-brand-primary"
            }`}
          >
            <motion.span animate={reordering ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.6 }}>
              <RotateCcw size={10} strokeWidth={2.5} />
            </motion.span>
            {reordering ? "Adding…" : "Reorder"}
          </motion.button>
          <button
            onClick={onExpand}
            className="flex items-center gap-1 text-[10px] font-black text-brand-primary"
          >
            Details <ChevronRight size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function OrderDetailSheet({ order, onClose }: { order: Order; onClose: () => void }) {
  const advanceStatus = useOrderStore((s) => s.advanceStatus);
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const date = new Date(order.placedAt);

  return (
    <>
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[59]" onClick={onClose} />
      <motion.div key="sheet"
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-4">
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-2xl pointer-events-auto flex flex-col max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-center justify-between mb-0.5">
              <h2 className="text-sm font-black text-brand-text">Order #{order.orderId}</h2>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-brand-text-muted">
                ✕
              </button>
            </div>
            <p className="text-[10px] text-brand-text-muted">
              {date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <div className="overflow-y-auto no-scrollbar flex-1 p-4 space-y-4">
            {/* Live tracker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider">Live Tracking</p>
                {order.status !== "delivered" && (
                  <span className="text-[9px] font-black text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full animate-pulse">Live</span>
                )}
              </div>
              <div className="space-y-0">
                {STATUS_STEPS.map((step, idx) => {
                  const done = idx <= currentIdx;
                  const active = idx === currentIdx;
                  const isLast = idx === STATUS_STEPS.length - 1;
                  return (
                    <div key={step.key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ backgroundColor: done ? (active ? "#00b761" : "#5f259f") : "#e5e7eb", scale: active ? 1.2 : 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          {done && !active && <Check size={9} strokeWidth={3} className="text-white" />}
                          {active && <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-2 h-2 rounded-full bg-white" />}
                        </motion.div>
                        {!isLast && <motion.div animate={{ backgroundColor: idx < currentIdx ? "#5f259f" : "#e5e7eb" }} className="w-0.5 flex-1 my-1 min-h-[20px]" />}
                      </div>
                      <div className="pb-3">
                        <p className={`text-xs font-black ${done ? "text-brand-text" : "text-brand-text-muted"}`}>{step.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {order.status !== "delivered" && (
                <div className="flex items-center gap-2 mt-1">
                  <Truck size={13} className="text-brand-primary" strokeWidth={2.5} />
                  <p className="text-[11px] font-black text-brand-text">
                    ~<span className="text-brand-accent">{order.estimatedMins} mins</span> estimated
                  </p>
                </div>
              )}
            </div>

            {/* Items */}
            <div>
              <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-2">Items</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-xs text-brand-text flex-1 truncate">{item.name}</span>
                    <span className="text-[10px] text-brand-text-muted mx-2">×{item.quantity}</span>
                    <span className="text-xs font-black text-brand-text">Rs.{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs font-black text-brand-text">Total Paid</span>
              <span className="text-sm font-black text-brand-primary">Rs.{order.total}</span>
            </div>
          </div>

          {/* Demo advance button */}
          {order.status !== "delivered" && (
            <div className="p-4 border-t border-gray-50">
              <button
                onClick={() => advanceStatus(order.id)}
                className="w-full h-10 rounded-xl bg-brand-primary/10 text-brand-primary text-xs font-black"
              >
                Simulate Next Status →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <PageWrapper>
      <div className="p-3 pb-28">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-text">
              <ArrowLeft size={18} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-base font-black text-brand-text">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-3">
              <ClipboardList size={28} className="text-brand-primary" strokeWidth={1.8} />
            </div>
            <p className="text-sm font-black text-brand-text mb-1">No orders yet</p>
            <p className="text-[11px] text-brand-text-muted mb-5">Your order history will appear here</p>
            <Link href="/">
              <button className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-black">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onExpand={() => setSelectedOrder(order)} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailSheet
            order={orders.find((o) => o.id === selectedOrder.id) ?? selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
