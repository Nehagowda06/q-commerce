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
      className="w-[64px] flex flex-col items-center flex-shrink-0 cursor-pointer group select-none"
    >
      <div className="relative">
        <motion.div
          animate={{
            backgroundColor: isActive ? "var(--color-brand-primary)" : "transparent",
            scale: isActive ? 1.05 : 1,
          }}
          className={`w-11 h-11 ${isActive ? "" : color} rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm relative overflow-hidden`}
        >
          <Icon size={19} className={isActive ? "text-white" : "text-brand-primary"} strokeWidth={2.4} />
          <motion.div
            initial={false}
            whileTap={{ opacity: [0, 0.4, 0], scale: [0.8, 1.5] }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white rounded-full pointer-events-none opacity-0"
          />
        </motion.div>

        {isActive && (
          <motion.div
            layoutId="category-active-ring"
            className="absolute -inset-0.5 border-2 border-brand-primary rounded-[14px]"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </div>

      <motion.span
        animate={{
          color: isActive ? "var(--color-brand-primary)" : "var(--color-brand-text)",
          fontWeight: isActive ? 800 : 700,
        }}
        className="block w-full truncate text-[9px] mt-1.5 text-center leading-tight transition-all"
        title={name}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
