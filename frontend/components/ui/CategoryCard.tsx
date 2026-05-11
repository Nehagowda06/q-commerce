"use client";

import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({ name, image, color, isActive = false, onClick }: CategoryCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className="w-[72px] flex flex-col items-center flex-shrink-0 cursor-pointer select-none bg-transparent p-0"
    >
      <div className="relative p-[3px]">
        {/* Active glow ring */}
        {isActive && (
          <motion.div
            layoutId="category-glow"
            className="absolute inset-0 rounded-[22px] z-0"
            style={{ boxShadow: "0 0 0 2.5px #5f259f, 0 0 16px rgba(95,37,159,0.45)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}

        <motion.div
          animate={{ scale: isActive ? 1.06 : 1, y: isActive ? -2 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`w-[64px] h-[64px] ${color} rounded-[20px] flex items-center justify-center relative overflow-hidden z-10`}
          style={{
            boxShadow: isActive
              ? "0 6px 20px rgba(95,37,159,0.35)"
              : "0 4px 12px rgba(6,31,65,0.12)",
          }}
        >
          {/* Gloss overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/5 pointer-events-none" />
          {/* Shine spot */}
          <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white/30 blur-lg pointer-events-none" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            width={44}
            height={44}
            className="w-[44px] h-[44px] object-contain relative z-10"
            style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.22))" }}
            loading="lazy"
          />
        </motion.div>
      </div>

      <motion.span
        animate={{
          color: isActive ? "#5f259f" : "#061F41",
          fontWeight: isActive ? 800 : 600,
        }}
        className="block w-full truncate text-[10px] mt-1.5 text-center leading-tight"
        title={name}
      >
        {name}
      </motion.span>
    </motion.button>
  );
}
