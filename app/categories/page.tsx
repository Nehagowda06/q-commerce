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
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <h1 className="text-2xl font-black text-brand-text leading-tight">Savega Categories</h1>
          <p className="text-xs font-bold text-brand-text-muted mt-1">Pick an aisle, then shop the subcategories.</p>
        </div>

        <div className="grid grid-cols-[104px_1fr] min-h-[calc(100vh-170px)]">
          <aside className="bg-gray-50 border-r border-gray-100 py-2">
            {groceryAisles.map((aisle) => {
              const Icon = icons[aisle.icon as keyof typeof icons] || Leaf;
              const isActive = aisle.name === activeAisle;

              return (
                <button
                  key={aisle.name}
                  onClick={() => setActiveAisle(aisle.name)}
                  className={`w-full px-2 py-3 flex flex-col items-center gap-1 text-center border-l-4 transition ${
                    isActive
                      ? "bg-white border-brand-primary text-brand-primary"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${isActive ? "bg-brand-primary text-white" : aisle.color}`}>
                    <Icon size={21} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black leading-tight">{aisle.name}</span>
                </button>
              );
            })}
          </aside>

          <main className="p-4">
            <div className="rounded-3xl bg-brand-primary text-white p-4 mb-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <ActiveIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black leading-tight">{active.name}</h2>
                <p className="text-[11px] font-bold text-white/75">Curated quick-commerce aisle</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {active.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className="min-h-28 rounded-2xl border border-gray-100 bg-white shadow-soft p-3 text-left flex flex-col justify-between"
                >
                  <div className={`w-10 h-10 rounded-2xl ${active.color} flex items-center justify-center text-brand-primary`}>
                    <ActiveIcon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-xs font-black text-brand-text leading-tight">{subcategory}</span>
                    <ChevronRight size={14} className="text-brand-primary flex-shrink-0" strokeWidth={3} />
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
