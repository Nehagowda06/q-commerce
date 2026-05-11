"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Clock, SlidersHorizontal, Star, Store, Utensils, X, Zap } from "lucide-react";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { allProducts, foodCategories, groceryAisles, restaurants, type Subcategory } from "@/data/mockData";
import { useSearchStore, type SortOption, type FilterOption } from "@/store/searchStore";

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

// All grocery products flat — includes every subcategory key (deduped by id)
const allGroceryProducts = (() => {
  const seen = new Set<string>();
  const result: GroceryProduct[] = [];
  const keys: (keyof typeof allProducts)[] = [
    "vegetables", "fruits", "herbs", "cutAndPeeled",
    "milk", "curd", "paneer", "butterAndCheese",
    "atta", "rice", "dal", "oilAndGhee",
    "chips", "namkeen", "biscuits", "chocolates",
    "teaAndCoffee", "juices", "softDrinks", "energyDrinks",
    "detergents", "cleaners", "tissues", "repellents",
    "bath", "hair", "skin", "oralCare",
    "diapers", "babyFood", "petFood", "petTreats",
  ];
  for (const key of keys) {
    for (const p of allProducts[key] as GroceryProduct[]) {
      if (!seen.has(p.id)) { seen.add(p.id); result.push(p); }
    }
  }
  return result;
})();

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Relevance",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  discount: "Biggest Discount",
};

const FILTER_LABELS: Record<FilterOption, string> = {
  all: "All",
  fresh: "Fresh",
  "on-sale": "On Sale",
  "best-seller": "Best Seller",
};

function applySearchFiltersSort(
  products: GroceryProduct[],
  query: string,
  filter: FilterOption,
  sort: SortOption
): GroceryProduct[] {
  let result = [...products];

  // Search
  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q) ||
        (p.weight ?? "").toLowerCase().includes(q)
    );
  }

  // Filter
  if (filter === "fresh") result = result.filter((p) => p.tag === "Fresh");
  if (filter === "on-sale") result = result.filter((p) => !!p.originalPrice);
  if (filter === "best-seller") result = result.filter((p) => p.tag === "Best Seller");

  // Sort
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "discount") {
    result.sort((a, b) => {
      const da = a.originalPrice ? a.originalPrice - a.price : 0;
      const db = b.originalPrice ? b.originalPrice - b.price : 0;
      return db - da;
    });
  }

  return result;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("grocery");
  const [activeAisle, setActiveAisle] = useState(groceryAisles[0].name);
  const { query, sort, filter, setSort, setFilter } = useSearchStore();
  const [showSortFilter, setShowSortFilter] = useState(false);

  const activeSubcategories = useMemo(
    () => groceryAisles.find((aisle) => aisle.name === activeAisle)?.subcategories || [],
    [activeAisle]
  );

  const isSearching = query.trim().length > 0 || filter !== "all" || sort !== "relevance";

  const searchResults = useMemo(
    () => applySearchFiltersSort(allGroceryProducts, query, filter, sort),
    [query, filter, sort]
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
        <div className="h-11 rounded-2xl shimmer" />
        <div className="h-32 rounded-3xl shimmer" />
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-20 rounded-2xl shimmer" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-44 rounded-2xl shimmer" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <PullToRefresh onRefresh={handleRefresh}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pb-4">
          {/* Mode toggle — smooth layoutId animation */}
          <motion.section variants={sectionVariants} className="px-3 pt-2.5">
            <div className="relative grid grid-cols-2 gap-0 bg-gray-100 rounded-xl p-1">
              {/* Sliding active pill */}
              <motion.div
                layoutId="mode-pill"
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                animate={{ x: mode === "grocery" ? 0 : "calc(100% + 4px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
              <button
                onClick={() => setMode("grocery")}
                className={`relative z-10 h-8 rounded-lg text-[11px] font-black flex items-center justify-center gap-1.5 transition-colors ${
                  mode === "grocery" ? "text-brand-navy" : "text-gray-400"
                }`}
              >
                <Store size={13} strokeWidth={mode === "grocery" ? 2.5 : 2} /> Groceries
              </button>
              <button
                onClick={() => setMode("food")}
                className={`relative z-10 h-8 rounded-lg text-[11px] font-black flex items-center justify-center gap-1.5 transition-colors ${
                  mode === "food" ? "text-brand-navy" : "text-gray-400"
                }`}
              >
                <Utensils size={13} strokeWidth={mode === "food" ? 2.5 : 2} /> Food
              </button>
            </div>
          </motion.section>

          {/* Search results view (grocery mode only) */}
          {mode === "grocery" && isSearching ? (
            <SearchResultsView
              results={searchResults}
              query={query}
              sort={sort}
              filter={filter}
              setSort={setSort}
              setFilter={setFilter}
              showSortFilter={showSortFilter}
              setShowSortFilter={setShowSortFilter}
            />
          ) : mode === "grocery" ? (
            <GroceryHome
              activeAisle={activeAisle}
              setActiveAisle={setActiveAisle}
              activeSubcategories={activeSubcategories}
              showSortFilter={showSortFilter}
              setShowSortFilter={setShowSortFilter}
              sort={sort}
              filter={filter}
              setSort={setSort}
              setFilter={setFilter}
            />
          ) : (
            <FoodHome />
          )}
        </motion.div>
      </PullToRefresh>

      {/* Sort & Filter sheet */}
      <AnimatePresence>
        {showSortFilter && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setShowSortFilter(false)} />
            <motion.div key="sheet" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-[60] flex justify-center pointer-events-none">
              <div className="w-full max-w-[420px] bg-white rounded-t-3xl pt-4 px-4 pb-10 pointer-events-auto">
                <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-brand-text">Sort & Filter</h3>
                  <button onClick={() => setShowSortFilter(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Sort */}
                <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-2">Sort by</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
                    <button key={s} onClick={() => setSort(s)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                        sort === s ? "bg-brand-primary text-white border-brand-primary" : "bg-gray-50 text-brand-text border-gray-100"
                      }`}>
                      {SORT_LABELS[s]}
                    </button>
                  ))}
                </div>

                {/* Filter */}
                <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-2">Filter</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Object.keys(FILTER_LABELS) as FilterOption[]).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                        filter === f ? "bg-brand-primary text-white border-brand-primary" : "bg-gray-50 text-brand-text border-gray-100"
                      }`}>
                      {FILTER_LABELS[f]}
                    </button>
                  ))}
                </div>

                <button onClick={() => { setSort("relevance"); setFilter("all"); }}
                  className="w-full h-10 rounded-xl border border-gray-200 text-xs font-black text-brand-text-muted">
                  Reset
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

// ── Search results ──────────────────────────────────────────────────────────
function SearchResultsView({
  results, query, sort, filter, setSort, setFilter, showSortFilter, setShowSortFilter,
}: {
  results: GroceryProduct[];
  query: string;
  sort: SortOption;
  filter: FilterOption;
  setSort: (s: SortOption) => void;
  setFilter: (f: FilterOption) => void;
  showSortFilter: boolean;
  setShowSortFilter: (v: boolean) => void;
}) {
  const hasActiveFilters = sort !== "relevance" || filter !== "all";
  return (
    <motion.section variants={sectionVariants} className="px-3 pt-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-bold text-brand-text-muted">
          {results.length} result{results.length !== 1 ? "s" : ""}
          {query ? ` for "${query}"` : ""}
        </p>
        <button
          onClick={() => setShowSortFilter(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black border transition-colors ${
            hasActiveFilters ? "bg-brand-primary text-white border-brand-primary" : "bg-gray-50 text-brand-text border-gray-100"
          }`}
        >
          <SlidersHorizontal size={12} strokeWidth={2.5} />
          {hasActiveFilters ? `${SORT_LABELS[sort]} · ${FILTER_LABELS[filter]}` : "Sort & Filter"}
        </button>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-black text-brand-text mb-1">No results found</p>
          <p className="text-[11px] text-brand-text-muted">Try a different search or clear filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.imageColor}
              price={product.price}
              originalPrice={product.originalPrice}
              weight={product.weight}
              tag={product.tag}
              brand={product.brand}
              category={product.category}
              description={product.description}
              details={product.details}
              nutrition={product.nutrition}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ── Grocery home ────────────────────────────────────────────────────────────
function GroceryHome({
  activeAisle, setActiveAisle, activeSubcategories,
  showSortFilter, setShowSortFilter, sort, filter, setSort, setFilter,
}: {
  activeAisle: string;
  setActiveAisle: (name: string) => void;
  activeSubcategories: Subcategory[];
  showSortFilter: boolean;
  setShowSortFilter: (v: boolean) => void;
  sort: SortOption;
  filter: FilterOption;
  setSort: (s: SortOption) => void;
  setFilter: (f: FilterOption) => void;
}) {
  return (
    <>
      <motion.section variants={sectionVariants} className="px-3 pt-3">
        {/* Zepto-style banner: bright solid colour, clean layout, no muddy orbs */}
        <div className="w-full rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #0f7b5c 0%, #0a9e72 100%)", minHeight: "110px" }}>
          {/* Right decorative circle */}
          <div className="absolute right-0 top-0 bottom-0 w-36 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-5xl select-none">
              🛒
            </div>
          </div>
          {/* Subtle arc */}
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10 px-4 py-4 max-w-[220px]">
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1 bg-white/20 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider mb-2"
            >
              ⚡ 10 min delivery
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="text-[18px] font-black text-white leading-[1.15]"
            >
              Fresh groceries,<br />at your door
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-[10px] text-white/80 mt-1.5 font-semibold"
            >
              Fruits, dairy, snacks & more
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-4">
        <div className="px-3 flex items-center justify-between mb-2.5">
          <h2 className="text-[14px] font-black text-brand-text">Shop by Aisle</h2>
          <Link href="/categories" className="text-[10px] font-black text-brand-primary bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-0.5">
            See all <ChevronRight size={11} strokeWidth={3} />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-2 px-3 py-2 no-scrollbar">
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
        <div className="px-3 mt-3 grid grid-cols-2 gap-2">
          {activeSubcategories.map((subcategory) => (
            <Link
              href={`/categories/${encodeURIComponent(subcategory.name)}`}
              key={subcategory.name}
              className="min-h-10 rounded-xl border border-gray-200 bg-white px-2.5 py-2 flex items-center justify-between gap-2 active:scale-95 transition-transform shadow-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={subcategory.image} alt={subcategory.name} width={20} height={20} className="w-5 h-5 object-contain flex-shrink-0" loading="lazy" />
                <span className="text-[10px] font-black text-brand-navy truncate">{subcategory.name}</span>
              </div>
              <ChevronRight size={11} className="text-gray-400 flex-shrink-0" strokeWidth={2.5} />
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

// ── Food home ───────────────────────────────────────────────────────────────
function FoodHome() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      <motion.section variants={sectionVariants} className="px-3 pt-3">
        <div className="w-full rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)", minHeight: "110px" }}>
          <div className="absolute right-0 top-0 bottom-0 w-36 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-5xl select-none">
              🍔
            </div>
          </div>
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="relative z-10 px-4 py-4 max-w-[220px]">
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1 bg-white/20 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider mb-2"
            >
              🔥 Hot & fresh
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="text-[18px] font-black text-white leading-[1.15]"
            >
              Order from<br />local favorites
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-[10px] text-white/80 mt-1.5 font-semibold"
            >
              Restaurants, quick bites & desserts
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} className="mt-4">
        <div className="px-3.5 mb-2.5">
          <h2 className="text-[13px] font-extrabold text-brand-text">What are you craving?</h2>
        </div>
        <div className="flex overflow-x-auto gap-2 px-3 pb-1 no-scrollbar">
          {foodCategories.map((category) => (
            <button key={category.name} onClick={() => setActiveCategory(category.name === activeCategory ? null : category.name)}
              className={`w-[86px] flex-shrink-0 text-left transition-transform active:scale-95 ${activeCategory === category.name ? "scale-95" : ""}`}>
              <div className={`h-[70px] rounded-xl bg-gradient-to-br ${category.image} border shadow-soft ${activeCategory === category.name ? "border-brand-primary border-2" : "border-gray-100"}`} />
              <p className={`text-[10px] font-black text-center mt-1.5 leading-tight ${activeCategory === category.name ? "text-brand-primary" : ""}`}>{category.name}</p>
            </button>
          ))}
        </div>
        {activeCategory && (
          <p className="px-3 mt-2 text-[10px] font-bold text-brand-primary">Showing: {activeCategory}</p>
        )}
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
          {restaurants
            .filter((r) => !activeCategory || r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()) || r.popular.some((p) => p.toLowerCase().includes(activeCategory.toLowerCase())))
            .concat(activeCategory ? restaurants.filter((r) => !r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()) && !r.popular.some((p) => p.toLowerCase().includes(activeCategory.toLowerCase()))) : [])
            .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
            .map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </motion.section>
      <WatermarkFooter />
    </>
  );
}

// ── Shared helpers ──────────────────────────────────────────────────────────
function WatermarkFooter() {
  return (
    <motion.footer variants={sectionVariants} className="px-3 pt-4 pb-2 flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/savega delivery.svg" alt="Savega Delivery" className="h-10 object-contain opacity-30" />
    </motion.footer>
  );
}

function ProductRow({ title, subtitle, products }: { title: string; subtitle: string; products: GroceryProduct[] }) {
  return (
    <motion.section variants={sectionVariants} className="mt-5">
      <div className="px-3 flex items-center justify-between mb-2.5">
        <div>
          <h2 className="text-[14px] font-black text-brand-text">{title}</h2>
          <p className="text-[9px] text-brand-text-muted font-bold uppercase tracking-wide">{subtitle}</p>
        </div>
        <Link href="/categories" className="text-[10px] font-black text-brand-primary bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-0.5">
          View all <ChevronRight size={11} strokeWidth={3} />
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-2.5 px-3 pb-3 no-scrollbar">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="w-[130px] flex-shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
          >
            <ProductCard
              id={product.id} name={product.name} image={product.imageColor}
              price={product.price} originalPrice={product.originalPrice}
              weight={product.weight} tag={product.tag}
              brand={product.brand} category={product.category}
              description={product.description} details={product.details} nutrition={product.nutrition}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ProductGrid({ title, products }: { title: string; products: GroceryProduct[] }) {
  return (
    <motion.section variants={sectionVariants} className="mt-3 px-3">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-[14px] font-black text-brand-text">{title}</h2>
        <div className="badge-hot text-white px-2.5 py-1 rounded-full text-[9px] font-black flex items-center gap-1">
          <Zap size={10} fill="white" strokeWidth={0} /> Limited time
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id} id={product.id} name={product.name} image={product.imageColor}
            price={product.price} originalPrice={product.originalPrice}
            weight={product.weight} tag={product.tag}
            brand={product.brand} category={product.category}
            description={product.description} details={product.details} nutrition={product.nutrition}
          />
        ))}
      </div>
    </motion.section>
  );
}

function RestaurantCard({ restaurant }: { restaurant: (typeof restaurants)[number] }) {
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdering(true);
    setTimeout(() => { setOrdering(false); setOrdered(true); setTimeout(() => setOrdered(false), 2000); }, 800);
  };

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
        <p className="text-[10px] font-bold text-brand-primary mt-1">{restaurant.offer}</p>
        <div className="flex items-center justify-between mt-1.5 gap-2">
          <p className="text-[9px] text-brand-text-muted line-clamp-1 flex-1">{restaurant.popular.join(", ")}</p>
          <button onClick={handleOrder} disabled={ordering || ordered}
            className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-black transition-colors ${ordered ? "bg-brand-accent text-white" : "bg-brand-primary text-white"}`}>
            {ordered ? "✓ Added" : ordering ? "..." : "Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
