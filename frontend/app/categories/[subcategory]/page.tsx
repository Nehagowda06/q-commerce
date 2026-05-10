"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ui/ProductCard";
import { allProducts, groceryAisles } from "@/data/mockData";

// Map subcategory name → allProducts key
const subcategoryProductMap: Record<string, keyof typeof allProducts> = {
  // Fresh
  Vegetables: "vegetables",
  Fruits: "fruits",
  Herbs: "herbs",
  "Cut & Peeled": "cutAndPeeled",
  // Dairy
  Milk: "milk",
  Curd: "curd",
  Paneer: "paneer",
  "Butter & Cheese": "butterAndCheese",
  // Staples
  Atta: "atta",
  Rice: "rice",
  Dal: "dal",
  "Oil & Ghee": "oilAndGhee",
  // Snacks
  Chips: "chips",
  Namkeen: "namkeen",
  Biscuits: "biscuits",
  Chocolates: "chocolates",
  // Beverages
  "Tea & Coffee": "teaAndCoffee",
  Juices: "juices",
  "Soft Drinks": "softDrinks",
  "Energy Drinks": "energyDrinks",
  // Home Care
  Detergents: "detergents",
  Cleaners: "cleaners",
  Tissues: "tissues",
  Repellents: "repellents",
  // Personal Care
  Bath: "bath",
  Hair: "hair",
  Skin: "skin",
  "Oral Care": "oralCare",
  // Baby & Pet
  Diapers: "diapers",
  "Baby Food": "babyFood",
  "Pet Food": "petFood",
  "Pet Treats": "petTreats",
};

// Find which aisle a subcategory belongs to
function getAisle(subcategoryName: string) {
  return groceryAisles.find((a) =>
    a.subcategories.some((s) => s.name === subcategoryName)
  );
}

export default function SubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = use(params);
  const router = useRouter();

  // URL-decode the slug (e.g. "Cut%20%26%20Peeled" → "Cut & Peeled")
  const name = decodeURIComponent(subcategory);

  const productKey = subcategoryProductMap[name];
  const products = productKey ? (allProducts[productKey] as (typeof allProducts.vegetables)) : [];
  const aisle = getAisle(name);

  return (
    <PageWrapper>
      <div className="bg-white min-h-screen pb-28">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-3 py-2.5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-text flex-shrink-0"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div className="min-w-0">
            <h1 className="text-[15px] font-black text-brand-text leading-tight truncate">{name}</h1>
            {aisle && (
              <p className="text-[10px] text-brand-text-muted font-semibold">{aisle.name}</p>
            )}
          </div>
        </div>

        {/* Aisle colour banner */}
        {aisle && (
          <div className={`mx-3 mt-3 rounded-xl ${aisle.color} px-3 py-2.5 flex items-center gap-2.5`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aisle.subcategories.find((s) => s.name === name)?.image ?? aisle.image}
              alt={name}
              width={36}
              height={36}
              className="w-9 h-9 object-contain drop-shadow-sm flex-shrink-0"
            />
            <div>
              <p className="text-[12px] font-black text-brand-text leading-tight">{name}</p>
              <p className="text-[9px] text-brand-text-muted font-semibold">
                {products.length} item{products.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="px-3 mt-3">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-black text-brand-text mb-1">Coming soon</p>
              <p className="text-[11px] text-brand-text-muted">
                We&apos;re stocking up {name}. Check back shortly!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {products.map((product) => (
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
        </div>
      </div>
    </PageWrapper>
  );
}
