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
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className="flex flex-col items-center flex-shrink-0 cursor-pointer group select-none"
    >
      <div
        className={`
          relative flex h-14 w-14 items-center justify-center rounded-full text-xl shadow-sm transition-all duration-200
          ${isActive ? "bg-brand-primary text-white ring-2 ring-brand-primary/20 scale-105" : `${color} text-brand-text`}
        `}
      >
        <span className={isActive ? "brightness-200" : ""}>
          {icon}
        </span>

        <motion.div
<<<<<<< HEAD
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
=======
          initial={false}
          whileTap={{ opacity: [0, 0.4, 0], scale: [0.8, 1.5] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white rounded-full pointer-events-none opacity-0"
        />
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
      </div>

      <span
        className={`mt-2 text-center text-[10px] font-bold leading-tight transition-colors ${
          isActive ? "text-brand-primary" : "text-brand-text"
        }`}
      >
        {name}
      </span>
    </motion.button>
  );
}
