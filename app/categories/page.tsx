import PageWrapper from "@/components/layout/PageWrapper";

export default function CategoriesPage() {
  return (
    <PageWrapper>
      <div className="p-4">
        <h1 className="text-2xl font-black text-brand-text mb-6">Categories</h1>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Fruits & Veg", "Dairy & Eggs", "Beverages", 
            "Snacks", "Bakery", "Meat", 
            "Frozen", "Pantry", "Pet Care",
            "Personal Care", "Home Care", "Baby Care"
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-2 flex items-center justify-center text-2xl shadow-inner">
                📦
              </div>
              <span className="text-[10px] font-bold text-center leading-tight">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
