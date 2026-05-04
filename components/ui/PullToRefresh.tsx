"use client";

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, ReactNode } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
}

const PULL_THRESHOLD = 80;

export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Transform y value to opacity and rotation for the loader
  const opacity = useTransform(y, [0, PULL_THRESHOLD], [0, 1]);
  const rotate = useTransform(y, [0, PULL_THRESHOLD], [0, 360]);
  const scale = useTransform(y, [0, PULL_THRESHOLD], [0.5, 1]);

  const handleDragEnd = async () => {
    if (y.get() >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      // Snap to refreshing position
      controls.start({ y: 60 });
      
      await onRefresh();
      
      // Reset after refresh
      setIsRefreshing(false);
      controls.start({ y: 0 });
    } else {
      controls.start({ y: 0 });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Loader Container */}
      <motion.div
        style={{ opacity, scale, rotate, y: 10 }}
        className="absolute top-0 left-0 right-0 flex justify-center z-0"
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center text-brand-primary">
          <Loader2 
            className={`${isRefreshing ? "animate-spin" : ""}`} 
            size={20} 
            strokeWidth={3} 
          />
        </div>
      </motion.div>

      {/* Draggable Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y }}
        className="relative z-10 bg-white"
      >
        {children}
      </motion.div>
    </div>
  );
}
