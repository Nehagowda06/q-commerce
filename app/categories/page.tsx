"use client";

import { useState } from "react";
import { Baby, ChevronRight, Cookie, CupSoda, Heart, Leaf, Milk, Sparkles, Wheat } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { groceryAisles } from "@/data/mockData";

const icons = { Baby, Cookie, CupSoda, Heart, Leaf, Milk, Sparkles, Wheat };

export default function CategoriesPage() {
  const [activeAisle, setActiveAisle] = useState(groceryAisles[0].name);
  const active = groceryAisles.find((aisle) => aisle.name === activeAisle) || groceryAisles[0];
  const ActiveIcon = icons[active.icon as keyof typeof icons] || Leaf;

  return (
    <PageWrapper>
      <div className="bg-white min-h-screen pb-36">
        <div className="px-3 pt-3 pb-2.5 border-b border-gray-100">
          <h1 className="text-[16px] font-extrabold text-brand-text leading-tight">Savega Categories</h1>
          <p className="text-[10px] font-semibold text-brand-text-muted mt-0.5">Pick an aisle, then shop the subcategories.</p>
        </div>

        <div className="grid grid-cols-[82px_1fr] min-h-[calc(100vh-150px)]">
          <aside className="bg-gray-50 border-r border-gray-100 py-1.5">
            {groceryAisles.map((aisle) => {
              const Icon = icons[aisle.icon as keyof typeof icons] || Leaf;
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
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? "bg-brand-primary text-white" : aisle.color}`}>
                    <Icon size={17} strokeWidth={2.4} />
                  </div>
                  <span className="w-full truncate text-[8.5px] font-bold leading-tight">{aisle.name}</span>
                </button>
              );
            })}
          </aside>

          <main className="p-3">
            <div className="rounded-xl bg-brand-primary text-white p-2.5 mb-2.5 flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                <ActiveIcon size={19} />
              </div>
              <div>
                <h2 className="text-[13px] font-extrabold leading-tight">{active.name}</h2>
                <p className="text-[9px] font-semibold text-white/75">Curated quick-commerce aisle</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {active.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className="min-h-20 rounded-xl border border-gray-100 bg-white shadow-soft p-2 text-left flex flex-col justify-between"
                >
                  <div className={`w-8 h-8 rounded-lg ${active.color} flex items-center justify-center text-brand-primary`}>
                    <ActiveIcon size={16} strokeWidth={2.4} />
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-brand-text leading-tight">{subcategory}</span>
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
