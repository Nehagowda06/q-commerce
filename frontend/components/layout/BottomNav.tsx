"use client";

import { motion } from "framer-motion";
import { Home, LayoutGrid, ListChecks, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/searchStore";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { id: "home",       label: "Home",       icon: Home,         href: "/" },
  { id: "categories", label: "Categories", icon: LayoutGrid,   href: "/categories" },
  { id: "cart",       label: "Cart",       icon: ShoppingCart, href: "/cart" },
  { id: "lists",      label: "Lists",      icon: ListChecks,   href: "/lists" },
];

export default function BottomNav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const reset     = useSearchStore((s) => s.reset);
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleNav = (href: string) => {
    if (href === "/") reset();
    router.push(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className="w-full max-w-[420px] bg-white border-t border-gray-100 flex items-center justify-around px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pointer-events-auto"
        style={{ boxShadow: "0 -1px 0 rgba(6,31,65,0.06), 0 -4px 16px rgba(6,31,65,0.05)" }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          const showBadge = item.id === "cart" && cartCount > 0;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.href)}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-0.5"
            >
              {/* Top indicator bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full overflow-hidden">
                {isActive && (
                  <motion.div
                    layoutId="nav-bar"
                    className="w-full h-full bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </div>

              {/* Icon */}
              <div className="relative mt-1">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  className={`transition-colors duration-150 ${isActive ? "text-brand-primary" : "text-gray-400"}`}
                />
                {showBadge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1.5 min-w-[13px] h-[13px] bg-red-500 text-white text-[7px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[9px] leading-none transition-colors duration-150 ${
                  isActive ? "text-brand-primary font-semibold" : "text-gray-400 font-normal"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
