"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Flame, Leaf, Star, Store, Utensils, Zap } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { allProducts, foodCategories, groceryAisles, restaurants } from "@/data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
} as const;

type Mode = "grocery" | "food";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("grocery");
  const [activeAisle, setActiveAisle] = useState(groceryAisles[0].name);

  const activeSubcategories = useMemo(
    () => groceryAisles.find((aisle) => aisle.name === activeAisle)?.subcategories || [],
    [activeAisle]
  );

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4 bg-white">
        <div className="h-11 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-32 rounded-3xl bg-gray-100 animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <PullToRefresh onRefresh={handleRefresh}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pb-40">
          <motion.section variants={sectionVariants} className="px-4 pt-3">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-gray-100 p-1">
              <button
                onClick={() => setMode("grocery")}
                className={`h-11 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 transition ${
                  mode === "grocery" ? "bg-white text-brand-primary shadow-soft" : "text-gray-500"
                }`}
              >
                <Store size={16} /> Groceries
              </button>
              <button
                onClick={() => setMode("food")}
                className={`h-11 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 transition ${
                  mode === "food" ? "bg-white text-brand-primary shadow-soft" : "text-gray-500"
                }`}
              >
                <Utensils size={16} /> Food
              </button>
            </div>
          </motion.section>

          {mode === "grocery" ? (
            <GroceryHome
              activeAisle={activeAisle}
              setActiveAisle={setActiveAisle}
              activeSubcategories={activeSubcategories}
            />
          ) : (
            <FoodHome />
          )}
        </motion.div>
      </PullToRefresh>
    </PageWrapper>
  );
}

function GroceryHome({
  activeAisle,
  setActiveAisle,
  activeSubcategories,
}: {
  activeAisle: string;
  setActiveAisle: (name: string) => void;
  activeSubcategories: string[];
}) {
  return (
    <>
      <motion.section variants={sectionVariants} className="px-4 pt-4">
        <div className="w-full min-h-32 rounded-3xl bg-[#5f259f] p-5 text-white relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-[220px]">
            <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">
              Savega Super Saver
            </span>
            <h1 className="text-2xl font-black mt-2 leading-tight">Fresh groceries in 10 minutes</h1>
            <p className="text-xs font-bold text-white/80 mt-2">Daily essentials, fruits, dairy, snacks and home care.</p>
          </div>
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-emerald-300/25" />
          <Leaf className="absolute right-9 bottom-8 text-emerald-200" size={52} strokeWidth={1.6} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-5">
        <div className="px-4 flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-black text-brand-text">Shop by Aisle</h2>
            <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-wide">Instamart-style categories</p>
          </div>
          <Link href="/categories" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
            See all <ChevronRight size={14} strokeWidth={3} />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-1 no-scrollbar">
          {groceryAisles.map((aisle) => (
            <CategoryCard
              key={aisle.name}
              name={aisle.name}
              icon={aisle.icon}
              color={aisle.color}
              isActive={activeAisle === aisle.name}
              onClick={() => setActiveAisle(aisle.name)}
            />
          ))}
        </div>
        <div className="px-4 mt-4 grid grid-cols-2 gap-2">
          {activeSubcategories.map((subcategory) => (
            <Link
              href="/categories"
              key={subcategory}
              className="min-h-14 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2 flex items-center justify-between"
            >
              <span className="text-xs font-black text-brand-text">{subcategory}</span>
              <ChevronRight size={14} className="text-brand-primary" strokeWidth={3} />
            </Link>
          ))}
        </div>
      </motion.section>

      <ProductRow title="Fresh Picks" subtitle="Morning essentials" products={[...allProducts.vegetables, ...allProducts.fruits]} />
      <ProductRow title="Savega Staples" subtitle="Popular pantry deals" products={allProducts.staples} />
      <ProductGrid title="Super Savings" products={[...allProducts.dairy, ...allProducts.snacks]} />
    </>
  );
}

function FoodHome() {
  return (
    <>
      <motion.section variants={sectionVariants} className="px-4 pt-4">
        <div className="w-full min-h-32 rounded-3xl bg-[#ff3269] p-5 text-white relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-[230px]">
            <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">
              Savega Food
            </span>
            <h1 className="text-2xl font-black mt-2 leading-tight">Order from local favorites</h1>
            <p className="text-xs font-bold text-white/85 mt-2">Top restaurants, quick bites, desserts and dinner picks.</p>
          </div>
          <div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-amber-200/30" />
          <Flame className="absolute right-10 bottom-8 text-amber-100" size={54} strokeWidth={1.6} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-5">
        <div className="px-4 mb-3">
          <h2 className="text-base font-black text-brand-text">What are you craving?</h2>
        </div>
        <div className="flex overflow-x-auto gap-3 px-4 pb-1 no-scrollbar">
          {foodCategories.map((category) => (
            <div key={category.name} className="w-24 flex-shrink-0">
              <div className={`h-20 rounded-2xl bg-gradient-to-br ${category.image} border border-gray-100 shadow-soft`} />
              <p className="text-[11px] font-black text-center mt-2 leading-tight">{category.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-7 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-black text-brand-text">Most Ordered Restaurants</h2>
            <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-wide">Popular near you</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-700 uppercase">
            <Clock size={11} /> Fast
          </div>
        </div>
        <div className="space-y-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </motion.section>
    </>
  );
}

function ProductRow({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: (typeof allProducts.vegetables)[number][];
}) {
  return (
    <motion.section variants={sectionVariants} className="mt-7">
      <div className="px-4 flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-black text-brand-text">{title}</h2>
          <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-wide">{subtitle}</p>
        </div>
        <Link href="/categories" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
          View all <ChevronRight size={14} strokeWidth={3} />
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="w-36 flex-shrink-0">
            <ProductCard
              name={product.name}
              image={product.imageColor}
              price={product.price}
              originalPrice={product.originalPrice}
              weight={product.weight}
              tag={product.tag}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function ProductGrid({ title, products }: { title: string; products: (typeof allProducts.vegetables)[number][] }) {
  return (
    <motion.section variants={sectionVariants} className="mt-3 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-black text-brand-text">{title}</h2>
        <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-md">
          <Zap size={10} fill="white" /> Limited time
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.imageColor}
            price={product.price}
            originalPrice={product.originalPrice}
            weight={product.weight}
            tag={product.tag}
          />
        ))}
      </div>
    </motion.section>
  );
}

function RestaurantCard({ restaurant }: { restaurant: (typeof restaurants)[number] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-soft flex gap-3">
      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${restaurant.image} flex-shrink-0 relative overflow-hidden`}>
        <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-black text-brand-text flex items-center gap-1">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          {restaurant.rating}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-black text-brand-text truncate">{restaurant.name}</h3>
            <p className="text-[11px] text-brand-text-muted font-semibold mt-0.5 truncate">{restaurant.cuisine}</p>
          </div>
          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
            {restaurant.eta}
          </span>
        </div>
        <p className="text-[11px] font-bold text-brand-primary mt-2">{restaurant.offer}</p>
        <p className="text-[10px] text-brand-text-muted mt-2 line-clamp-1">
          Frequent picks: {restaurant.popular.join(", ")}
        </p>
      </div>
    </div>
  );
}
