"use client";

import { motion } from "framer-motion";
import { Home, LayoutGrid, ListChecks, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/searchStore";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { id: "home",       label: "Home",       icon: Home,        href: "/" },
  { id: "categories", label: "Categories", icon: LayoutGrid,  href: "/categories" },
  { id: "cart",       label: "Cart",       icon: ShoppingCart,href: "/cart" },
  { id: "lists",      label: "Lists",      icon: ListChecks,  href: "/lists" },
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
      <div className="w-full max-w-[420px] bg-white border-t border-gray-100 flex items-center justify-around px-1 pt-1.5 pb-[calc(0.45rem+env(safe-area-inset-bottom))] pointer-events-auto"
        style={{ boxShadow: "0 -4px 24px rgba(6,31,65,0.1)" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          const showBadge = item.id === "cart" && cartCount > 0;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.href)}
              className="relative flex flex-col items-center justify-center py-1 px-3 flex-1"
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-8 rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(95,37,159,0.12), rgba(95,37,159,0.06))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}

              <div className="relative">
                <motion.div
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    color: isActive ? "#5f259f" : "#8fa0b8",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative z-10"
                >
                  <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
                </motion.div>

                {/* Cart badge */}
                {showBadge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] badge-sale text-white text-[8px] font-black rounded-full flex items-center justify-center px-0.5 z-20"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.div>
                )}
              </div>

              <motion.span
                animate={{ color: isActive ? "#5f259f" : "#8fa0b8", fontWeight: isActive ? 700 : 500 }}
                className="text-[9px] mt-0.5 relative z-10"
              >
                {item.label}
              </motion.span>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute bottom-0 w-1 h-1 rounded-full bg-brand-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
