"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Clock, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { BannerSkeleton, CategorySkeleton, ProductSkeleton } from "@/components/ui/Skeletons";
import CategoryCard from "@/components/ui/CategoryCard";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { categories, restaurants, allProducts } from "@/data/mockData";

// Define variants as const for TypeScript type inference
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
} as const;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Vegetables");

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate data fetching
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Ensure loading state is handled and falls back to skeletons
  if (loading) {
    return (
      <div className="pb-12 bg-white">
        {/* Delivery ETA Skeleton */}
        <div className="px-4 py-2 flex items-center gap-1.5 border-b border-gray-50">
          <div className="w-4 h-4 bg-gray-100 rounded-full animate-pulse" />
          <div className="w-24 h-3 bg-gray-100 rounded-full animate-pulse" />
        </div>
        {/* Hero Banner Skeleton */}
        <motion.div variants={sectionVariants} className="px-4 pt-4 pb-2">
          <BannerSkeleton />
        </motion.div>
        {/* Categories Skeleton */}
        <div className="mt-4 px-4">
          <div className="w-32 h-4 bg-gray-100 rounded-full mb-3 animate-pulse" />
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => <CategorySkeleton key={i} />)}
          </div>
        </div>
        {/* Popular Items Skeleton */}
        <div className="mt-6 px-4">
          <div className="w-32 h-4 bg-gray-100 rounded-full mb-3 animate-pulse" />
          <div className="flex gap-3 overflow-hidden">
            {/* Using ProductSkeleton as fallback for popular items */}
            {[1, 2, 3].map(i => <div key={i} className="w-36 flex-shrink-0"><ProductSkeleton /></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <PullToRefresh onRefresh={handleRefresh}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pb-24"
        >
        {/* Delivery ETA */}
        <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-brand-accent fill-brand-accent" />
            <span className="text-[11px] font-black text-brand-text uppercase tracking-tight">
              ⚡ Delivery in <span className="text-brand-accent">10–15 mins</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <Clock size={10} />
            <span className="text-[9px] font-black uppercase tracking-tighter">On Time</span>
          </div>
        </div>

        {/* Hero Banner (Deals) */}
        <motion.div variants={sectionVariants} className="px-4 pt-4 pb-2">
          <div className="w-full h-32 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-primary-light p-5 flex flex-col justify-center text-white relative overflow-hidden shadow-soft">
            <div className="relative z-10">
              <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                Flash Sale
              </span>
              <h2 className="text-xl font-black mt-1 leading-tight">
                FLAT ₹100 OFF <br /> 
                <span className="text-brand-accent">ON ALL STAPLES</span>
              </h2>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 text-4xl opacity-20 transform rotate-12">🍛</div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.section variants={sectionVariants} className="mt-4">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text">Shop by Category</h2>
            <Link href="/categories" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-1 no-scrollbar">
            {/* Safe map usage */}
            {categories?.map((cat) => (
              <CategoryCard 
                key={cat.name}
                name={cat.name}
                icon={cat.icon}
                color={cat.color}
                isActive={activeCategory === cat.name}
                onClick={() => setActiveCategory(cat.name)}
              />
            ))}
          </div>
        </motion.section>

        {/* Popular Items Section */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <h2 className="text-base font-black text-brand-text">Popular Items</h2>
              <p className="text-[10px] text-brand-text-muted font-bold -mt-0.5 uppercase tracking-tighter">TRENDING NOW</p>
            </div>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              View All <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
            {/* Use allProducts for popular items, with fallback */}
            {(allProducts.vegetables || []).map((product) => (
              <motion.div 
                key={product.id}
                whileTap={{ scale: 0.97 }}
                className="w-36 flex-shrink-0" // Adjusted width for consistency
              >
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  weight={product.weight}
                  tag={product.tag as any}
                />
              </motion.div>
            ))}
            {/* Fallback to ProductSkeleton if no products found */}
            {(!allProducts.vegetables || allProducts.vegetables.length === 0) && 
              <div className="flex gap-3 overflow-hidden">
                {[1, 2, 3].map(i => <div key={i} className="w-36 flex-shrink-0"><ProductSkeleton /></div>)}
              </div>
            }
          </div>
        </motion.section>

        {/* Deals (Super Savings) */}
        <motion.section variants={sectionVariants} className="mt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text uppercase tracking-tight">Super Savings</h2>
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-md">
              <Zap size={10} fill="white" className="animate-pulse" />
              Limited time
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Use allProducts.grains for deals, with fallback */}
            {(allProducts.grains || []).slice(0, 4).map((product, idx) => (
              <div key={product.id} className="relative group rounded-2xl p-[1px] bg-gradient-to-tr from-emerald-400/30 via-emerald-50 to-white border border-emerald-100 shadow-soft">
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-emerald-600 text-white text-[8px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider shadow-sm">
                    {idx % 2 === 0 ? "Best Value" : "Must Buy"}
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <ProductCard 
                    name={product.name}
                    image={product.imageColor}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    weight={product.weight}
                    tag={product.tag as any}
                  />
                </div>
              </div>
            ))}
            {/* Fallback to ProductSkeleton if no deals found */}
            {(!allProducts.grains || allProducts.grains.length === 0) && 
              <div className="col-span-2 grid grid-cols-2 gap-3">
                {[1, 2].map(i => <div key={i} className="w-full"><ProductSkeleton /></div>)}
              </div>
            }
          </div>
        </motion.section>

        {/* Fresh Picks (Dairy & Morning Essentials) */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text">Fresh Picks</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {/* Using allProducts.dairy for Fresh Picks */}
            {(allProducts.dairy || []).map((product) => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  weight={product.weight}
                  tag={product.tag as any}
                />
              </div>
            ))}
            {/* Fallback to ProductSkeleton if no fresh picks found */}
            {(!allProducts.dairy || allProducts.dairy.length === 0) && 
              <div className="flex gap-3 overflow-hidden">
                {[1, 2, 3].map(i => <div key={i} className="w-36 flex-shrink-0"><ProductSkeleton /></div>)}
              </div>
            }
          </div>
        </motion.section>
        
        {/* Removed Restaurants Section as per explicit "Home page sections" requirement. 
            If Restaurants were intended as 'Popular Items' or 'Fresh Picks', they would be uncommented/re-integrated.
            For now, adhering to the explicit list: Categories, Popular Items, Deals, Fresh Picks.
        */}

      </motion.div>
      </PullToRefresh>
    </PageWrapper>
  );
}
