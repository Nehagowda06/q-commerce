"use client";

import { motion } from "framer-motion";
import { Home, LayoutGrid, ListChecks, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/searchStore";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "categories", label: "Categories", icon: LayoutGrid, href: "/categories" },
  { id: "cart", label: "Cart", icon: ShoppingCart, href: "/cart" },
  { id: "lists", label: "Lists", icon: ListChecks, href: "/lists" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const reset = useSearchStore((s) => s.reset);

  const handleNav = (href: string) => {
    if (href === "/") reset(); // clear search when going home
    router.push(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[420px] bg-white border-t border-gray-100 flex items-center justify-around px-2 pt-1.5 pb-[calc(0.45rem+env(safe-area-inset-bottom))] pointer-events-auto shadow-[0_-4px_20px_rgba(6,31,65,0.08)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.href)}
              className="relative flex flex-col items-center justify-center py-1 px-3 flex-1 group"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "var(--color-brand-primary)" : "#6b7280",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative z-10"
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-1.5 bg-brand-primary/5 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </div>

              <span className={`text-[9px] font-bold mt-0.5 transition-colors ${isActive ? "text-brand-primary" : "text-gray-500"}`}>
                {item.label}
              </span>

              {isActive && <motion.div layoutId="activeDot" className="absolute bottom-0 w-1 h-1 bg-brand-primary rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
