"use client";

import { motion } from "framer-motion";

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
          initial={false}
          whileTap={{ opacity: [0, 0.4, 0], scale: [0.8, 1.5] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white rounded-full pointer-events-none opacity-0"
        />
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
