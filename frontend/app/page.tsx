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
type GroceryProduct = (typeof allProducts.vegetables)[number];

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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pb-16">
          <motion.section variants={sectionVariants} className="px-3 pt-2.5">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
              <button
                onClick={() => setMode("grocery")}
                className={`h-8 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition ${
                  mode === "grocery" ? "bg-white text-brand-primary shadow-soft" : "text-gray-500"
                }`}
              >
                <Store size={14} /> Groceries
              </button>
              <button
                onClick={() => setMode("food")}
                className={`h-8 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition ${
                  mode === "food" ? "bg-white text-brand-primary shadow-soft" : "text-gray-500"
                }`}
              >
                <Utensils size={14} /> Food
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
      <motion.section variants={sectionVariants} className="px-3 pt-3">
        <div className="w-full min-h-24 rounded-xl bg-[#5f259f] p-3.5 text-white relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-[210px]">
            <span className="text-[8px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
              Savega Super Saver
            </span>
            <h1 className="text-[16px] font-extrabold mt-1.5 leading-[1.1]">Fresh groceries in 10 minutes</h1>
            <p className="text-[10px] font-semibold text-white/80 mt-1 leading-snug">
              Daily essentials, fruits, dairy, snacks and home care.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-10 w-32 h-32 rounded-full bg-emerald-300/25" />
          <Leaf className="absolute right-7 bottom-6 text-emerald-200" size={38} strokeWidth={1.6} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-3.5">
        <div className="px-3 flex items-center justify-between mb-2">
          <div>
            <h2 className="text-[13px] font-extrabold text-brand-text">Shop by Aisle</h2>
            <p className="text-[8px] text-brand-text-muted font-bold uppercase">
              Instamart-style categories
            </p>
          </div>
          <Link href="/categories" className="text-[10px] font-bold text-brand-primary flex items-center gap-0.5">
            See all <ChevronRight size={12} strokeWidth={3} />
          </Link>
        </div>
        <div className="flex overflow-x-auto overflow-y-visible gap-2 px-3 pt-2 pb-2 no-scrollbar">
          {groceryAisles.map((aisle) => (
            <CategoryCard
              key={aisle.name}
              name={aisle.name}
              image={aisle.image}
              color={aisle.color}
              isActive={activeAisle === aisle.name}
              onClick={() => setActiveAisle(aisle.name)}
            />
          ))}
        </div>
        <div className="px-3 mt-2.5 grid grid-cols-2 gap-2">
          {activeSubcategories.map((subcategory) => (
            <Link
              href="/categories"
              key={subcategory}
              className="min-h-10 rounded-xl border border-gray-100 bg-gray-50 px-2.5 py-2 flex items-center justify-between"
            >
              <span className="text-[10px] font-bold text-brand-text truncate">{subcategory}</span>
              <ChevronRight size={12} className="text-brand-primary" strokeWidth={3} />
            </Link>
          ))}
        </div>
      </motion.section>

      <ProductRow title="Fresh Picks" subtitle="Morning essentials" products={[...allProducts.vegetables, ...allProducts.fruits]} />
      <ProductRow title="Savega Staples" subtitle="Popular pantry deals" products={allProducts.staples} />
      <ProductGrid title="Super Savings" products={[...allProducts.dairy, ...allProducts.snacks]} />
      <WatermarkFooter />
    </>
  );
}

function FoodHome() {
  return (
    <>
      <motion.section variants={sectionVariants} className="px-3 pt-3">
        <div className="w-full min-h-24 rounded-xl bg-[#5f259f] p-3.5 text-white relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-[220px]">
            <span className="text-[8px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">
              Savega Food
            </span>
            <h1 className="text-[16px] font-extrabold mt-1.5 leading-[1.1]">Order from local favorites</h1>
            <p className="text-[10px] font-semibold text-white/85 mt-1 leading-snug">
              Top restaurants, quick bites, desserts and dinner picks.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-10 w-32 h-32 rounded-full bg-pink-200/25" />
          <Flame className="absolute right-8 bottom-6 text-pink-100" size={38} strokeWidth={1.6} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-4">
        <div className="px-3.5 mb-2.5">
          <h2 className="text-[13px] font-extrabold text-brand-text">What are you craving?</h2>
        </div>
        <div className="flex overflow-x-auto gap-2 px-3 pb-1 no-scrollbar">
          {foodCategories.map((category) => (
            <div key={category.name} className="w-[86px] flex-shrink-0">
              <div className={`h-[70px] rounded-xl bg-gradient-to-br ${category.image} border border-gray-100 shadow-soft`} />
              <p className="text-[10px] font-black text-center mt-1.5 leading-tight">{category.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-6 px-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-[13px] font-extrabold text-brand-text">Most Ordered Restaurants</h2>
            <p className="text-[8px] text-brand-text-muted font-bold uppercase">Popular near you</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-black text-emerald-700 uppercase">
            <Clock size={10} /> Fast
          </div>
        </div>
        <div className="space-y-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </motion.section>
      <WatermarkFooter />
    </>
  );
}

function WatermarkFooter() {
  return (
    <motion.footer variants={sectionVariants} className="px-3 pt-7 pb-5 text-center">
      <p className="text-[28px] font-bold lowercase text-gray-300/90 leading-none">savega</p>
      <p className="mt-1.5 text-[12px] font-semibold lowercase text-gray-300/80">fast safe reliable</p>
    </motion.footer>
  );
}

function ProductRow({ title, subtitle, products }: { title: string; subtitle: string; products: GroceryProduct[] }) {
  return (
    <motion.section variants={sectionVariants} className="mt-6">
      <div className="px-3 flex items-center justify-between mb-2.5">
        <div>
          <h2 className="text-[13px] font-extrabold text-brand-text">{title}</h2>
          <p className="text-[8px] text-brand-text-muted font-bold uppercase">{subtitle}</p>
        </div>
        <Link href="/categories" className="text-[10px] font-bold text-brand-primary flex items-center gap-0.5">
          View all <ChevronRight size={12} strokeWidth={3} />
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-2.5 px-3 pb-4 no-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="w-[122px] flex-shrink-0">
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

function ProductGrid({ title, products }: { title: string; products: GroceryProduct[] }) {
  return (
    <motion.section variants={sectionVariants} className="mt-3 px-3">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[13px] font-extrabold text-brand-text">{title}</h2>
        <div className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase flex items-center gap-1 shadow-md">
          <Zap size={10} fill="white" /> Limited time
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
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
    <div className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-soft flex gap-2.5">
      <div className={`w-[82px] h-[82px] rounded-xl bg-gradient-to-br ${restaurant.image} flex-shrink-0 relative overflow-hidden`}>
        <div className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-black text-brand-text flex items-center gap-1">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          {restaurant.rating}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[13px] font-black text-brand-text truncate">{restaurant.name}</h3>
            <p className="text-[10px] text-brand-text-muted font-semibold mt-0.5 truncate">{restaurant.cuisine}</p>
          </div>
          <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
            {restaurant.eta}
          </span>
        </div>
        <p className="text-[10px] font-bold text-brand-primary mt-1.5">{restaurant.offer}</p>
        <p className="text-[9px] text-brand-text-muted mt-1.5 line-clamp-1">
          Frequent picks: {restaurant.popular.join(", ")}
        </p>
      </div>
    </div>
  );
}
