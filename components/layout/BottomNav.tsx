"use client";

import { motion } from "framer-motion";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "categories", label: "Categories", icon: LayoutGrid, href: "/categories" },
  { id: "cart", label: "Cart", icon: ShoppingCart, href: "/cart" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[420px] bg-white/90 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pointer-events-auto shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="relative flex flex-col items-center justify-center py-1 px-4 flex-1 group"
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
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-2 bg-brand-primary/5 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </div>
              
              <span className={`text-[10px] font-bold mt-1 transition-colors ${
                isActive ? "text-brand-primary" : "text-gray-500"
              }`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute bottom-0 w-1 h-1 bg-brand-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
