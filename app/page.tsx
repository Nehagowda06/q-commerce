"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Zap } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import PullToRefresh from "@/components/ui/PullToRefresh";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import {
  BannerSkeleton,
  CategorySkeleton,
  ProductSkeleton,
} from "@/components/ui/Skeletons";
import { allProducts, categories } from "@/data/mockData";

const categoryProducts = {
  Vegetables: allProducts.vegetables,
  Fruits: allProducts.fruits,
  Dairy: allProducts.dairy,
  "Atta & Rice": allProducts.grains,
  "Pulses & Dal": allProducts.grains,
  Spices: allProducts.kirana_staples,
  "Oil & Ghee": allProducts.kirana_staples,
  Snacks: allProducts.kirana_staples,
  "Instant Food": allProducts.kirana_staples,
  "Personal Care": allProducts.kirana_staples,
  Cleaning: allProducts.kirana_staples,
  "Pet Care": allProducts.kirana_staples,
} satisfies Record<string, typeof allProducts.vegetables>;

type CategoryName = keyof typeof categoryProducts;

function getOptionalTag(product: Record<string, unknown>) {
  return typeof product.tag === "string" ? product.tag : undefined;
}

function getOptionalOriginalPrice(product: Record<string, unknown>) {
  return typeof product.originalPrice === "number" ? product.originalPrice : undefined;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryName>("Vegetables");

  const popularProducts = categoryProducts[activeCategory] ?? allProducts.vegetables;

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white pb-12">
        <div className="flex items-center gap-1.5 border-b border-gray-50 px-4 py-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-100" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-gray-100" />
        </div>

        <div className="px-4 pb-2 pt-4">
          <BannerSkeleton />
        </div>

        <div className="mt-4 px-4">
          <div className="mb-3 h-4 w-32 animate-pulse rounded-full bg-gray-100" />
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CategorySkeleton key={item} />
            ))}
          </div>
        </div>

        <div className="mt-6 px-4">
          <div className="mb-3 h-4 w-32 animate-pulse rounded-full bg-gray-100" />
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-36 flex-shrink-0">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="pb-8">
          <div className="flex items-center justify-between border-b border-gray-50 bg-white px-4 py-2">
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="fill-brand-accent text-brand-accent" />
              <span className="text-[11px] font-black uppercase tracking-tight text-brand-text">
                ⚡ Delivery in <span className="text-brand-accent">10–15 mins</span>
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">
              <Clock size={10} />
              <span className="text-[9px] font-black uppercase tracking-tighter">On Time</span>
            </div>
          </div>

          <div className="px-4 pb-2 pt-4">
            <div className="relative flex h-32 w-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary to-brand-primary-light p-5 text-white shadow-soft">
              <div className="relative z-10">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                  Flash Sale
                </span>
                <h2 className="mt-1 text-xl font-black leading-tight">
                  FLAT ₹100 OFF <br />
                  <span className="text-brand-accent">ON ALL STAPLES</span>
                </h2>
              </div>
              <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-4 right-4 rotate-12 text-4xl opacity-20">🍛</div>
            </div>
          </div>

          <section className="mt-4">
            <div className="mb-3 flex items-center justify-between px-4">
              <h2 className="text-base font-black text-brand-text">Shop by Category</h2>
              <Link
                href="/categories"
                className="flex items-center gap-0.5 text-[11px] font-black text-brand-primary"
              >
                See all <ChevronRight size={14} strokeWidth={3} />
              </Link>
            </div>

            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  color={category.color}
                  isActive={activeCategory === category.name}
                  onClick={() =>
                    setActiveCategory(
                      (category.name in categoryProducts ? category.name : "Vegetables") as CategoryName
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between px-4">
              <div className="flex flex-col">
                <h2 className="text-base font-black text-brand-text">Popular Items</h2>
                <p className="text-[10px] font-bold uppercase tracking-tighter text-brand-text-muted">
                  Trending in {activeCategory}
                </p>
              </div>
              <Link
                href="/categories"
                className="flex items-center gap-0.5 text-[11px] font-black text-brand-primary"
              >
                View All <ChevronRight size={14} strokeWidth={3} />
              </Link>
            </div>

            <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-4">
              {popularProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileTap={{ scale: 0.97 }}
                  className="w-36 flex-shrink-0"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.imageColor}
                    price={product.price}
                    originalPrice={getOptionalOriginalPrice(product)}
                    weight={product.weight}
                    tag={getOptionalTag(product)}
                  />
                </motion.div>
              ))}

              {popularProducts.length === 0 && (
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-36 flex-shrink-0">
                      <ProductSkeleton />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-4 px-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-black uppercase tracking-tight text-brand-text">
                Super Savings
              </h2>
              <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[9px] font-black uppercase text-white shadow-md">
                <Zap size={10} fill="white" className="animate-pulse" />
                Limited time
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allProducts.grains.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className="group relative rounded-2xl border border-emerald-100 bg-gradient-to-tr from-emerald-400/30 via-emerald-50 to-white p-[1px] shadow-soft"
                >
                  <div className="absolute right-0 top-0 z-20">
                    <div className="rounded-bl-xl rounded-tr-xl bg-emerald-600 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-white shadow-sm">
                      {index % 2 === 0 ? "Best Value" : "Must Buy"}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      image={product.imageColor}
                      price={product.price}
                      originalPrice={getOptionalOriginalPrice(product)}
                      weight={product.weight}
                      tag={getOptionalTag(product)}
                    />
                  </div>
                </div>
              ))}

              {allProducts.grains.length === 0 && (
                <div className="col-span-2 grid grid-cols-2 gap-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="w-full">
                      <ProductSkeleton />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between px-4">
              <h2 className="text-base font-black text-brand-text">Fresh Picks</h2>
              <Link
                href="/categories"
                className="flex items-center gap-0.5 text-[11px] font-black text-brand-primary"
              >
                See all <ChevronRight size={14} strokeWidth={3} />
              </Link>
            </div>

            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-4">
              {allProducts.dairy.map((product) => (
                <div key={product.id} className="w-36 flex-shrink-0">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.imageColor}
                    price={product.price}
                    weight={product.weight}
                    tag={getOptionalTag(product)}
                  />
                </div>
              ))}

              {allProducts.dairy.length === 0 && (
                <div className="flex gap-3 overflow-hidden">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-36 flex-shrink-0">
                      <ProductSkeleton />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </PullToRefresh>
    </PageWrapper>
  );
}
