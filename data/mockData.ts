export const categories = [
  { name: "Vegetables", icon: "🥦", color: "bg-emerald-50" },
  { name: "Fruits", icon: "🍎", color: "bg-red-50" },
  { name: "Dairy", icon: "🥛", color: "bg-blue-50" },
  { name: "Atta & Rice", icon: "🌾", color: "bg-orange-50" },
  { name: "Pulses & Dal", icon: "🫘", color: "bg-yellow-50" },
  { name: "Spices", icon: "🌶️", color: "bg-red-50" },
  { name: "Oil & Ghee", icon: "🧴", color: "bg-yellow-100" },
  { name: "Snacks", icon: "🍿", color: "bg-orange-50" },
  { name: "Instant Food", icon: "🍜", color: "bg-indigo-50" },
  { name: "Personal Care", icon: "🧼", color: "bg-pink-50" },
  { name: "Cleaning", icon: "🧹", color: "bg-blue-50" },
  { name: "Pet Care", icon: "🐶", color: "bg-purple-50" },
];

export const restaurants = [
  {
    id: "res1",
    name: "Biryani Blues",
    rating: 4.5,
    eta: "25 mins",
    image: "from-orange-400 to-red-500",
    cuisine: "Hyderabadi Biryani",
    items: [
      { id: "res1_1", name: "Chicken Dum Biryani", price: 320, originalPrice: 400, tag: "Best Seller" },
      { id: "res1_2", name: "Egg Biryani", price: 240, tag: "Must Try" }
    ]
  },
  {
    id: "res2",
    name: "Burger King",
    rating: 4.2,
    eta: "20 mins",
    image: "from-yellow-500 to-orange-600",
    cuisine: "American, Fast Food",
    items: [
      { id: "res2_1", name: "Whopper Burger", price: 199, tag: "Classic" },
      { id: "res2_2", name: "Crispy Veg Meal", price: 299, originalPrice: 350 }
    ]
  },
  {
    id: "res3",
    name: "Imperial Chinese",
    rating: 4.3,
    eta: "30 mins",
    image: "from-red-600 to-red-800",
    cuisine: "Chinese, Seafood",
    items: [
      { id: "res3_1", name: "Veg Hakka Noodles", price: 180 },
      { id: "res3_2", name: "Chicken Manchurian", price: 240, tag: "Spicy" }
    ]
  },
  {
    id: "res4",
    name: "Sagar Ratna",
    rating: 4.6,
    eta: "15 mins",
    image: "from-green-500 to-emerald-700",
    cuisine: "South Indian",
    items: [
      { id: "res4_1", name: "Masala Dosa", price: 140, tag: "Famous" },
      { id: "res4_2", name: "Idli Sambar (2 pcs)", price: 80 }
    ]
  },
  {
    id: "res5",
    name: "Pizza Hut",
    rating: 4.1,
    eta: "25 mins",
    image: "from-red-500 to-red-400",
    cuisine: "Pizza, Fast Food",
    items: [
      { id: "res5_1", name: "Margherita Pizza", price: 249, tag: "Bestseller" },
      { id: "res5_2", name: "Pepperoni Feast", price: 499 }
    ]
  },
  {
    id: "res6",
    name: "Punjabi Rasoi",
    rating: 4.4,
    eta: "35 mins",
    image: "from-orange-500 to-yellow-600",
    cuisine: "North Indian, Punjabi",
    items: [
      { id: "res6_1", name: "Dal Makhani", price: 220, tag: "Rich" },
      { id: "res6_2", name: "Paneer Butter Masala", price: 280 }
    ]
  },
  {
    id: "res7",
    name: "Natural Ice Cream",
    rating: 4.8,
    eta: "10 mins",
    image: "from-pink-400 to-rose-300",
    cuisine: "Desserts, Ice Cream",
    items: [
      { id: "res7_1", name: "Sitaphal Ice Cream", price: 120, tag: "Seasonal" },
      { id: "res7_2", name: "Tender Coconut Scoop", price: 120 }
    ]
  },
  {
    id: "res8",
    name: "Subway",
    rating: 4.0,
    eta: "20 mins",
    image: "from-green-400 to-yellow-400",
    cuisine: "Healthy, Salads",
    items: [
      { id: "res8_1", name: "Veggie Delite Sub", price: 210 },
      { id: "res8_2", name: "Chicken Teriyaki Sub", price: 260, tag: "Healthy" }
    ]
  },
  {
    id: "res9",
    name: "Chaayos",
    rating: 4.5,
    eta: "15 mins",
    image: "from-amber-600 to-orange-700",
    cuisine: "Beverages, Snacks",
    items: [
      { id: "res9_1", name: "Desi Chai", price: 90, tag: "Cozy" },
      { id: "res9_2", name: "Vada Pav (2 pcs)", price: 110 }
    ]
  },
  {
    id: "res10",
    name: "The Bowl Company",
    rating: 4.4,
    eta: "20 mins",
    image: "from-indigo-400 to-blue-500",
    cuisine: "Fusion, Bowls",
    items: [
      { id: "res10_1", name: "Rajma Rice Bowl", price: 199, tag: "Comfort" },
      { id: "res10_2", name: "Burrito Bowl", price: 249 }
    ]
  }
];

export const allProducts = {
  vegetables: [
    { id: "v1", name: "Fresh Tomatoes", weight: "1 kg", price: 40, originalPrice: 60, imageColor: "from-red-200 to-red-50", tag: "Fresh" },
    { id: "v2", name: "Onion", weight: "1 kg", price: 35, originalPrice: 45, imageColor: "from-purple-100 to-purple-50" },
    { id: "v3", name: "Potato (Aloo)", weight: "1 kg", price: 25, imageColor: "from-yellow-100 to-yellow-50" },
    { id: "v4", name: "Green Capsicum", weight: "250 g", price: 30, imageColor: "from-green-100 to-green-50", tag: "Fresh" },
    { id: "v5", name: "Broccoli", weight: "1 pc", price: 85, originalPrice: 110, imageColor: "from-emerald-200 to-emerald-50" },
    { id: "v6", name: "Ginger (Adrak)", weight: "100 g", price: 15, imageColor: "from-amber-100 to-amber-50" },
  ],
  fruits: [
    { id: "f1", name: "Banana (Robust)", weight: "6 pcs", price: 48, originalPrice: 60, imageColor: "from-yellow-200 to-yellow-50", tag: "Fresh" },
    { id: "f2", name: "Alphonso Mango", weight: "2 pcs", price: 199, originalPrice: 250, imageColor: "from-orange-200 to-orange-50", tag: "Best Seller" },
    { id: "f3", name: "Royal Gala Apple", weight: "4 pcs (approx. 500g)", price: 160, imageColor: "from-red-300 to-red-100" },
    { id: "f4", name: "Green Grapes", weight: "500 g", price: 70, originalPrice: 90, imageColor: "from-green-100 to-green-50" },
  ],
  grains: [
    { id: "g1", name: "Fortune Chakki Fresh Atta", weight: "5 kg", price: 245, originalPrice: 275, imageColor: "from-orange-100 to-white", tag: "Bestseller" },
    { id: "g2", name: "India Gate Basmati Rice", weight: "1 kg", price: 145, originalPrice: 180, imageColor: "from-blue-50 to-white" },
    { id: "g3", name: "Toor Dal (Premium)", weight: "1 kg", price: 168, imageColor: "from-yellow-200 to-yellow-50" },
    { id: "g4", name: "Moong Dal", weight: "500 g", price: 85, imageColor: "from-yellow-100 to-white" },
    { id: "g5", name: "Poha (Thick)", weight: "500 g", price: 42, imageColor: "from-gray-100 to-white" },
  ],
  kirana_staples: [
    { id: "k1", name: "Tata Salt", weight: "1 kg", price: 28, imageColor: "from-blue-100 to-white" },
    { id: "k2", name: "MDH Kitchen King Masala", weight: "100 g", price: 78, imageColor: "from-red-100 to-white" },
    { id: "k3", name: "Everest Turmeric Powder", weight: "100 g", price: 32, imageColor: "from-yellow-400 to-yellow-100" },
    { id: "k4", name: "Sugar (Loose)", weight: "1 kg", price: 48, imageColor: "from-gray-50 to-white" },
    { id: "k5", name: "Loose Tea Powder", weight: "250 g", price: 120, imageColor: "from-amber-800 to-amber-500" },
  ],
  dairy: [
    { id: "da1", name: "Amul Taaza Milk", weight: "500 ml", price: 27, imageColor: "from-blue-100 to-blue-50", tag: "Fresh" },
    { id: "da2", name: "Amul Butter", weight: "100 g", price: 58, imageColor: "from-yellow-200 to-yellow-100" },
    { id: "da3", name: "Mother Dairy Curd", weight: "400 g", price: 35, imageColor: "from-blue-50 to-white" },
    { id: "da4", name: "Paneer (Fresh)", weight: "200 g", price: 95, originalPrice: 110, imageColor: "from-gray-50 to-white", tag: "Fresh" },
  ]
};
