"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { BannerSkeleton, CategorySkeleton, ProductSkeleton } from "@/components/ui/Skeletons";
import CategoryCard from "@/components/ui/CategoryCard";
import PullToRefresh from "@/components/ui/PullToRefresh";

const categories = [
  { name: "Vegetables", icon: "🥦", color: "bg-emerald-50" },
  { name: "Fruits", icon: "🍎", color: "bg-red-50" },
  { name: "Dairy", icon: "🥛", color: "bg-blue-50" },
  { name: "Snacks", icon: "🍿", color: "bg-orange-50" },
  { name: "Juices", icon: "🥤", color: "bg-cyan-50" },
  { name: "Bakery", icon: "🥐", color: "bg-yellow-50" },
];

const products = [
  { id: "1", name: "Farm Fresh Milk", weight: "500 ml", price: 35, originalPrice: 38, imageColor: "from-blue-200 to-white" },
  { id: "2", name: "Classic Salted Chips", weight: "100 g", price: 20, imageColor: "from-yellow-200 to-white" },
  { id: "3", name: "Organic Bananas", weight: "500 g", price: 45, originalPrice: 60, imageColor: "from-green-100 to-white" },
  { id: "4", name: "Brown Bread", weight: "400 g", price: 55, imageColor: "from-orange-100 to-white" },
  { id: "5", name: "Fresh Tomatoes", weight: "1 kg", price: 60, imageColor: "from-red-100 to-white" },
  { id: "6", name: "Green Capsicum", weight: "250 g", price: 30, imageColor: "from-green-100 to-white" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Vegetables");

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="pb-12 bg-white">
        <div className="px-4 py-2 flex items-center gap-1.5 border-b border-gray-50">
          <div className="w-4 h-4 bg-gray-100 rounded-full" />
          <div className="w-24 h-3 bg-gray-100 rounded-full" />
        </div>
        <div className="px-4 pt-4 pb-2">
          <BannerSkeleton />
        </div>
        <div className="mt-4 px-4">
          <div className="w-32 h-4 bg-gray-100 rounded-full mb-3" />
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => <CategorySkeleton key={i} />)}
          </div>
        </div>
        <div className="mt-6 px-4">
          <div className="w-32 h-4 bg-gray-100 rounded-full mb-3" />
          <div className="flex gap-3 overflow-hidden">
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
          className="pb-12"
        >
        {/* Delivery ETA */}
        <div className="px-4 py-2 bg-white flex items-center gap-1.5 border-b border-gray-50">
          <Zap size={14} className="text-brand-accent fill-brand-accent" />
          <span className="text-[11px] font-black text-brand-text uppercase tracking-tight">
            ⚡ Delivery in <span className="text-brand-accent">10–15 mins</span>
          </span>
        </div>

        {/* Hero Banner */}
        <motion.div variants={sectionVariants} className="px-4 pt-4 pb-2">
          <div className="w-full h-32 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-primary-light p-5 flex flex-col justify-center text-white relative overflow-hidden shadow-soft">
            <div className="relative z-10">
              <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
                Fresh & Fast
              </span>
              <h2 className="text-xl font-black mt-1 leading-tight">
                UP TO 50% OFF <br /> 
                <span className="text-brand-accent">ON ALL VEGGIES</span>
              </h2>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
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
            {categories.map((cat) => (
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

        {/* Popular Section (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text">Popular Items</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  weight={product.weight}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Deals Section (2-Column Grid) */}
        <motion.section variants={sectionVariants} className="mt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text uppercase tracking-tight">Super Deals</h2>
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-md">
              <Zap size={10} fill="white" className="animate-pulse" />
              Limited time
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(2, 6).map((product, idx) => (
              <div key={product.id} className="relative group rounded-2xl p-[1px] bg-gradient-to-tr from-emerald-400/30 via-emerald-50 to-white border border-emerald-100 shadow-soft hover:shadow-medium transition-all">
                {/* Promo Badge */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-emerald-600 text-white text-[8px] font-black px-2 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider shadow-sm">
                    Mega Deal
                  </div>
                </div>
                
                {/* Premium Gradient Wrapper */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <ProductCard 
                    name={product.name}
                    image={product.imageColor}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    weight={product.weight}
                    tag={idx % 2 === 0 ? "Best Seller" : "Fresh"}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Fresh Picks Section (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text">Fresh Picks</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {products.slice(4, 6).map((product) => (
              <div key={product.id} className="w-40 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  weight={product.weight}
                  tag="Fresh"
                />
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
      </PullToRefresh>
    </PageWrapper>
  );
}

