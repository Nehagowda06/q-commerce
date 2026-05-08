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
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className="w-[68px] flex flex-col items-center flex-shrink-0 cursor-pointer group select-none"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: isActive ? 1.06 : 1 }}
          className={`w-[60px] h-[60px] ${color} rounded-2xl flex items-center justify-center shadow-soft relative overflow-hidden`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.12)]"
            loading="lazy"
          />
        </motion.div>

        {isActive && (
          <motion.div
            layoutId="category-active-ring"
            className="absolute -inset-[3px] border-2 border-brand-primary rounded-[18px] pointer-events-none"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </div>

      <motion.span
        animate={{
          color: isActive ? "var(--color-brand-primary)" : "var(--color-brand-text)",
          fontWeight: isActive ? 800 : 700,
        }}
        className="block w-full truncate text-[9.5px] mt-1.5 text-center leading-tight transition-all"
        title={name}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
