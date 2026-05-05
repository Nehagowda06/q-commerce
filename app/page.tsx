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

        {/* Hero Banner */}
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

        {/* Top Restaurants */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <h2 className="text-base font-black text-brand-text">Top Restaurants</h2>
              <p className="text-[10px] text-brand-text-muted font-bold -mt-0.5 uppercase tracking-tighter">GET IT DELIVERED HOT</p>
            </div>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              View All <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
            {restaurants.map((res) => (
              <motion.div 
                key={res.id}
                whileTap={{ scale: 0.97 }}
                className="w-48 flex-shrink-0 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft group"
              >
                <div className={`h-24 w-full bg-gradient-to-br ${res.image} relative`}>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 shadow-sm">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black text-brand-text">{res.rating}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-[9px] font-bold">
                    {res.eta}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-black text-brand-text line-clamp-1 group-hover:text-brand-primary transition-colors">{res.name}</h3>
                  <p className="text-[9px] text-brand-text-muted font-medium mt-0.5">{res.cuisine}</p>
                  
                  {/* Quick add for bestseller from restaurant */}
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-brand-text line-clamp-1">{res.items[0].name}</span>
                      <span className="text-[10px] font-bold text-brand-primary">₹{res.items[0].price}</span>
                    </div>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <Zap size={12} fill="white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fresh Vegetables (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-4">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text uppercase tracking-tight">Fresh Produce</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {allProducts.vegetables.map((product) => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  weight={product.weight}
                  tag={product.tag as any}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Super Deals (2-Column Grid) */}
        <motion.section variants={sectionVariants} className="mt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text uppercase tracking-tight">Mega Savings</h2>
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-md">
              <Zap size={10} fill="white" className="animate-pulse" />
              Limited time
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {allProducts.grains.slice(0, 4).map((product, idx) => (
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
          </div>
        </motion.section>

        {/* Kirana Staples (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-3">
            <div className="flex flex-col">
               <h2 className="text-base font-black text-brand-text">Kirana Favorites</h2>
               <p className="text-[10px] text-brand-text-muted font-bold -mt-0.5">DIRECT FROM STORES</p>
            </div>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              View All <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {allProducts.kirana_staples.map((product) => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  weight={product.weight}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Fruits Spotlight (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text uppercase tracking-tight">Seasonal Fruits</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {allProducts.fruits.map((product) => (
              <div key={product.id} className="w-40 flex-shrink-0">
                <ProductCard 
                  name={product.name}
                  image={product.imageColor}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  weight={product.weight}
                  tag={product.tag as any}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Dairy & Eggs (Horizontal) */}
        <motion.section variants={sectionVariants} className="mt-8">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-brand-text">Dairy & Morning Essentials</h2>
            <Link href="#" className="text-[11px] font-black text-brand-primary flex items-center gap-0.5">
              See all <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar">
            {allProducts.dairy.map((product) => (
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
          </div>
        </motion.section>
      </motion.div>
      </PullToRefresh>
    </PageWrapper>
  );
}
