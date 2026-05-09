"use client";

import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  image,
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
      className="w-[72px] flex flex-col items-center flex-shrink-0 cursor-pointer group select-none bg-transparent p-0"
    >
      <div className="relative p-[3px]">
        <motion.div
          animate={{
            scale: isActive ? 1.04 : 1,
            y: isActive ? -1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`w-[64px] h-[64px] ${color} rounded-[20px] flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(95,37,159,0.25)] ring-1 ring-black/5 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-white/50 blur-md pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            width={52}
            height={52}
            className="w-[52px] h-[52px] object-contain drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)] relative z-10"
            loading="lazy"
          />
        </motion.div>

        {isActive && (
          <motion.div
            layoutId="category-active-ring"
            className="absolute inset-0 border-2 border-brand-primary rounded-[22px] pointer-events-none"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </div>

      <motion.span
        animate={{
          color: isActive ? "var(--color-brand-primary)" : "var(--color-brand-text)",
          fontWeight: isActive ? 800 : 700,
        }}
        className="block w-full truncate text-[10px] mt-1.5 text-center leading-tight transition-all"
        title={name}
      >
        {name}
      </motion.span>
    </motion.button>
  );
}
