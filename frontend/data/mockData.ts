// Zepto-style 3D product icons — Microsoft Fluent UI Emoji served via jsDelivr.
const FLUENT = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets";

export const groceryAisles = [
  {
    name: "Fresh",
    icon: "Leaf",
    image: `${FLUENT}/Leafy%20green/3D/leafy_green_3d.png`,
    color: "bg-emerald-50",
    subcategories: ["Vegetables", "Fruits", "Herbs", "Cut & Peeled"],
  },
  {
    name: "Dairy",
    icon: "Milk",
    image: `${FLUENT}/Glass%20of%20milk/3D/glass_of_milk_3d.png`,
    color: "bg-sky-50",
    subcategories: ["Milk", "Curd", "Paneer", "Butter & Cheese"],
  },
  {
    name: "Staples",
    icon: "Wheat",
    image: `${FLUENT}/Sheaf%20of%20rice/3D/sheaf_of_rice_3d.png`,
    color: "bg-amber-50",
    subcategories: ["Atta", "Rice", "Dal", "Oil & Ghee"],
  },
  {
    name: "Snacks",
    icon: "Cookie",
    image: `${FLUENT}/Cookie/3D/cookie_3d.png`,
    color: "bg-orange-50",
    subcategories: ["Chips", "Namkeen", "Biscuits", "Chocolates"],
  },
  {
    name: "Beverages",
    icon: "CupSoda",
    image: `${FLUENT}/Cup%20with%20straw/3D/cup_with_straw_3d.png`,
    color: "bg-cyan-50",
    subcategories: ["Tea & Coffee", "Juices", "Soft Drinks", "Energy Drinks"],
  },
  {
    name: "Home Care",
    icon: "Sparkles",
    image: `${FLUENT}/Soap/3D/soap_3d.png`,
    color: "bg-violet-50",
    subcategories: ["Detergents", "Cleaners", "Tissues", "Repellents"],
  },
  {
    name: "Personal Care",
    icon: "Heart",
    image: `${FLUENT}/Lotion%20bottle/3D/lotion_bottle_3d.png`,
    color: "bg-rose-50",
    subcategories: ["Bath", "Hair", "Skin", "Oral Care"],
  },
  {
    name: "Baby & Pet",
    icon: "Baby",
    image: `${FLUENT}/Baby/Default/3D/baby_3d_default.png`,
    color: "bg-lime-50",
    subcategories: ["Diapers", "Baby Food", "Pet Food", "Pet Treats"],
  },
];

export const categories = groceryAisles.map(({ name, icon, color }) => ({ name, icon, color }));

export const allProducts = {
  vegetables: [
    { id: "v1", name: "Fresh Tomatoes", weight: "1 kg", price: 40, originalPrice: 60, imageColor: "from-red-100 to-red-50", tag: "Fresh" },
    { id: "v2", name: "Onion", weight: "1 kg", price: 35, originalPrice: 45, imageColor: "from-purple-100 to-purple-50" },
    { id: "v3", name: "Potato", weight: "1 kg", price: 25, imageColor: "from-yellow-100 to-yellow-50" },
    { id: "v4", name: "Green Capsicum", weight: "250 g", price: 30, imageColor: "from-green-100 to-green-50", tag: "Fresh" },
  ],
  fruits: [
    { id: "f1", name: "Banana", weight: "6 pcs", price: 48, originalPrice: 60, imageColor: "from-yellow-200 to-yellow-50", tag: "Fresh" },
    { id: "f2", name: "Alphonso Mango", weight: "2 pcs", price: 199, originalPrice: 250, imageColor: "from-orange-200 to-orange-50", tag: "Best Seller" },
    { id: "f3", name: "Royal Gala Apple", weight: "4 pcs", price: 160, imageColor: "from-red-200 to-red-50" },
    { id: "f4", name: "Green Grapes", weight: "500 g", price: 70, originalPrice: 90, imageColor: "from-green-100 to-green-50" },
  ],
  staples: [
    { id: "s1", name: "Fortune Chakki Atta", weight: "5 kg", price: 245, originalPrice: 275, imageColor: "from-orange-100 to-white", tag: "Best Seller" },
    { id: "s2", name: "India Gate Basmati Rice", weight: "1 kg", price: 145, originalPrice: 180, imageColor: "from-blue-50 to-white" },
    { id: "s3", name: "Toor Dal Premium", weight: "1 kg", price: 168, imageColor: "from-yellow-200 to-yellow-50" },
    { id: "s4", name: "Cold Pressed Groundnut Oil", weight: "1 l", price: 235, originalPrice: 275, imageColor: "from-amber-100 to-white" },
  ],
  snacks: [
    { id: "sn1", name: "Too Yumm Chips", weight: "82 g", price: 40, imageColor: "from-orange-100 to-white" },
    { id: "sn2", name: "Haldiram Bhujia", weight: "200 g", price: 68, imageColor: "from-yellow-100 to-white", tag: "Best Seller" },
    { id: "sn3", name: "Dark Fantasy Cookies", weight: "300 g", price: 120, originalPrice: 150, imageColor: "from-stone-200 to-white" },
  ],
  dairy: [
    { id: "da1", name: "Amul Taaza Milk", weight: "500 ml", price: 27, imageColor: "from-blue-100 to-blue-50", tag: "Fresh" },
    { id: "da2", name: "Amul Butter", weight: "100 g", price: 58, imageColor: "from-yellow-200 to-yellow-100" },
    { id: "da3", name: "Mother Dairy Curd", weight: "400 g", price: 35, imageColor: "from-blue-50 to-white" },
    { id: "da4", name: "Fresh Paneer", weight: "200 g", price: 95, originalPrice: 110, imageColor: "from-gray-50 to-white", tag: "Fresh" },
  ],
};

export const foodCategories = [
  { name: "Biryani", image: "from-orange-200 to-red-100" },
  { name: "Pizza", image: "from-red-200 to-yellow-100" },
  { name: "Burgers", image: "from-amber-200 to-orange-100" },
  { name: "South Indian", image: "from-emerald-100 to-lime-50" },
  { name: "Chinese", image: "from-rose-200 to-red-100" },
  { name: "Desserts", image: "from-pink-100 to-purple-50" },
];

export const restaurants = [
  {
    id: "res1",
    name: "Biryani Blues",
    rating: 4.5,
    eta: "25 mins",
    image: "from-orange-400 to-red-500",
    cuisine: "Hyderabadi Biryani",
    distance: "1.8 km",
    offer: "50% off up to Rs.100",
    popular: ["Chicken Dum Biryani", "Egg Biryani"],
  },
  {
    id: "res2",
    name: "Burger King",
    rating: 4.2,
    eta: "20 mins",
    image: "from-yellow-500 to-orange-600",
    cuisine: "Burgers, Fast Food",
    distance: "2.4 km",
    offer: "Free fries on meals",
    popular: ["Whopper", "Crispy Veg Meal"],
  },
  {
    id: "res3",
    name: "Sagar Ratna",
    rating: 4.6,
    eta: "15 mins",
    image: "from-green-500 to-emerald-700",
    cuisine: "South Indian",
    distance: "900 m",
    offer: "Rs.75 off above Rs.299",
    popular: ["Masala Dosa", "Idli Sambar"],
  },
  {
    id: "res4",
    name: "Pizza Hut",
    rating: 4.1,
    eta: "25 mins",
    image: "from-red-500 to-red-400",
    cuisine: "Pizza, Sides",
    distance: "2.1 km",
    offer: "Buy 1 get 1",
    popular: ["Margherita", "Farmhouse Pizza"],
  },
  {
    id: "res5",
    name: "Chaayos",
    rating: 4.5,
    eta: "15 mins",
    image: "from-amber-600 to-orange-700",
    cuisine: "Tea, Snacks",
    distance: "1.2 km",
    offer: "Combos from Rs.149",
    popular: ["Desi Chai", "Vada Pav"],
  },
];
