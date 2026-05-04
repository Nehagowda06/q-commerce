"use client";

import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: { 
      repeat: Infinity, 
      duration: 1.5, 
      ease: "linear" 
    }
  }
};

const ShimmerEffect = () => (
  <motion.div 
    variants={shimmer}
    initial="initial"
    animate="animate"
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
  />
);

export const BannerSkeleton = () => (
  <div className="w-full h-32 rounded-3xl bg-gray-200 relative overflow-hidden">
    <ShimmerEffect />
  </div>
);

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center flex-shrink-0">
    <div className="w-14 h-14 bg-gray-200 rounded-full relative overflow-hidden">
      <ShimmerEffect />
    </div>
    <div className="w-10 h-2 bg-gray-200 rounded-full mt-2 relative overflow-hidden">
      <ShimmerEffect />
    </div>
  </div>
);

export const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl p-2.5 border border-gray-100 h-full">
    <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden mb-2.5">
      <ShimmerEffect />
    </div>
    <div className="h-3 w-3/4 bg-gray-100 rounded-full mb-2 relative overflow-hidden">
      <ShimmerEffect />
    </div>
    <div className="h-3 w-1/2 bg-gray-100 rounded-full mb-4 relative overflow-hidden">
      <ShimmerEffect />
    </div>
    <div className="flex justify-between items-center">
      <div className="h-4 w-10 bg-gray-100 rounded-full relative overflow-hidden">
        <ShimmerEffect />
      </div>
      <div className="h-8 w-[72px] bg-gray-100 rounded-full relative overflow-hidden">
        <ShimmerEffect />
      </div>
    </div>
  </div>
);
