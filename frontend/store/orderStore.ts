import { create } from "zustand";

export type OrderStatus = "confirmed" | "preparing" | "picked_up" | "delivered";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  placedAt: string; // ISO string
  estimatedMins: number;
  status: OrderStatus;
}

interface OrderStore {
  orders: Order[];
  placeOrder: (items: OrderItem[], total: number) => Order;
  advanceStatus: (id: string) => void;
}

const STATUS_SEQUENCE: OrderStatus[] = ["confirmed", "preparing", "picked_up", "delivered"];

function generateOrderId() {
  return `SV-${Math.floor(10000 + Math.random() * 90000)}`;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],

  placeOrder: (items, total) => {
    const order: Order = {
      id: Date.now().toString(),
      orderId: generateOrderId(),
      items,
      total,
      placedAt: new Date().toISOString(),
      estimatedMins: 10 + Math.floor(Math.random() * 8),
      status: "confirmed",
    };
    set((state) => ({ orders: [order, ...state.orders] }));
    return order;
  },

  advanceStatus: (id) => {
    set((state) => ({
      orders: state.orders.map((o) => {
        if (o.id !== id) return o;
        const idx = STATUS_SEQUENCE.indexOf(o.status);
        const next = STATUS_SEQUENCE[Math.min(idx + 1, STATUS_SEQUENCE.length - 1)];
        return { ...o, status: next };
      }),
    }));
  },
}));
