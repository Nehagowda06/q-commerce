"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { groceryAisles } from "@/data/mockData";

const aisleTaglines: Record<string, string> = {
  Fresh: "Farm-fresh, delivered in 10 mins",
  Dairy: "Cold chain guaranteed by Savega",
  Staples: "Pantry essentials, always in stock",
  Snacks: "Your favourite bites, at your door",
  Beverages: "Chilled or hot — Savega's got it",
  "Home Care": "A cleaner home, the Savega way",
  "Personal Care": "Your daily routine, sorted by Savega",
  "Baby & Pet": "Trusted care for your little ones",
};

export default function CategoriesPage() {
  const [activeAisle, setActiveAisle] = useState(groceryAisles[0].name);
  const active = groceryAisles.find((aisle) => aisle.name === activeAisle) || groceryAisles[0];
  const router = useRouter();

  return (
    <PageWrapper>
      <div className="bg-white pb-4">
        <div className="px-3 pt-3 pb-2.5 border-b border-gray-100">
          <h1 className="text-[16px] font-extrabold text-brand-text leading-tight">Savega Categories</h1>
          <p className="text-[10px] font-semibold text-brand-text-muted mt-0.5">Pick an aisle, then shop the subcategories.</p>
        </div>

        <div className="grid grid-cols-[82px_1fr]">
          <aside className="bg-gray-50 border-r border-gray-100 py-1.5">
            {groceryAisles.map((aisle) => {
              const isActive = aisle.name === activeAisle;

              return (
                <button
                  key={aisle.name}
                  onClick={() => setActiveAisle(aisle.name)}
                  className={`w-full px-1 py-2 flex flex-col items-center gap-1 text-center border-l-4 transition ${
                    isActive
                      ? "bg-white border-brand-primary text-brand-primary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${aisle.color} shadow-soft`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={aisle.image} alt={aisle.name} width={32} height={32} className="w-8 h-8 object-contain drop-shadow-sm" loading="lazy" />
                  </div>
                  <span className="w-full truncate text-[8.5px] font-bold leading-tight">{aisle.name}</span>
                </button>
              );
            })}
          </aside>

          <main className="p-3">
            <div className="rounded-xl bg-brand-primary text-white p-2.5 mb-2.5 flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.image} alt={active.name} width={32} height={32} className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h2 className="text-[13px] font-extrabold leading-tight">{active.name}</h2>
                <p className="text-[9px] font-semibold text-white/75">
                  {aisleTaglines[active.name] ?? "Savega — delivered in 10 mins"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {active.subcategories.map((subcategory) => (
                <button
                  key={subcategory.name}
                  onClick={() => router.push(`/categories/${encodeURIComponent(subcategory.name)}`)}
                  className="min-h-20 rounded-xl border border-gray-100 bg-white shadow-soft p-2 text-left flex flex-col justify-between active:scale-95 transition-transform"
                >
                  <div className={`w-10 h-10 rounded-lg ${active.color} flex items-center justify-center`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={subcategory.image} alt={subcategory.name} width={28} height={28} className="w-7 h-7 object-contain drop-shadow-sm" />
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-brand-text leading-tight">{subcategory.name}</span>
                    <ChevronRight size={12} className="text-brand-primary flex-shrink-0" strokeWidth={3} />
                  </div>
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}
