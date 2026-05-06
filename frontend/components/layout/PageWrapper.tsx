import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}
