"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary-light",
    secondary: "bg-brand-accent text-white hover:bg-opacity-90",
    outline: "border-2 border-brand-primary text-brand-primary bg-transparent",
    ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-4 py-2 text-sm font-semibold",
    lg: "px-6 py-3 text-base font-bold",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center rounded-xl transition-colors focus:outline-none
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
