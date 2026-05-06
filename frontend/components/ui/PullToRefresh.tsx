"use client";

import { ReactNode } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
  return <div className="relative bg-white touch-pan-y">{children}</div>;
}
