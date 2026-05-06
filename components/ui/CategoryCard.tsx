"use client";

import { motion } from "framer-motion";
import { Baby, Cookie, CupSoda, Heart, Leaf, Milk, Sparkles, Wheat } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  icon,
  color,
  isActive = false,
  onClick,
}: CategoryCardProps) {
  const icons = { Baby, Cookie, CupSoda, Heart, Leaf, Milk, Sparkles, Wheat };
  const Icon = icons[icon as keyof typeof icons] || Leaf;

  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className="flex flex-col items-center flex-shrink-0 cursor-pointer group select-none"
    >
      <div className="relative">
        <motion.div
          animate={{
            backgroundColor: isActive ? "var(--color-brand-primary)" : "transparent",
            scale: isActive ? 1.05 : 1,
          }}
          className={`
            w-14 h-14 ${isActive ? "" : color} rounded-2xl flex items-center justify-center text-xl
            transition-colors duration-200 shadow-sm relative overflow-hidden
          `}
        >
          <Icon size={24} className={isActive ? "text-white" : "text-brand-primary"} strokeWidth={2.5} />

          {/* Ripple/Flash Effect on Tap */}
          <motion.div
            initial={false}
            whileTap={{ opacity: [0, 0.4, 0], scale: [0.8, 1.5] }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white rounded-full pointer-events-none opacity-0"
          />
        </motion.div>

        {/* Active Ring */}
        {isActive && (
          <motion.div
            layoutId="category-active-ring"
            className="absolute -inset-1 border-2 border-brand-primary rounded-[20px]"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </div>

      <motion.span 
        animate={{ 
          color: isActive ? "var(--color-brand-primary)" : "var(--color-brand-text)",
          fontWeight: isActive ? 800 : 700
        }}
        className="text-[10px] mt-2 text-center leading-tight transition-all"
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
