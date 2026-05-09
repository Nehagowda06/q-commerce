// Zepto-style 3D product icons — Microsoft Fluent UI Emoji served via jsDelivr.
const FLUENT = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets";

export interface Subcategory {
  name: string;
  image: string;
}

export const groceryAisles = [
  {
    name: "Fresh",
    icon: "Leaf",
    image: `${FLUENT}/Leafy%20green/3D/leafy_green_3d.png`,
    color: "bg-gradient-to-br from-emerald-200 via-lime-100 to-green-50",
    ring: "ring-emerald-200/70",
    subcategories: [
      { name: "Vegetables", image: `${FLUENT}/Broccoli/3D/broccoli_3d.png` },
      { name: "Fruits", image: `${FLUENT}/Red%20apple/3D/red_apple_3d.png` },
      { name: "Herbs", image: `${FLUENT}/Herb/3D/herb_3d.png` },
      { name: "Cut & Peeled", image: `${FLUENT}/Kitchen%20knife/3D/kitchen_knife_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Dairy",
    icon: "Milk",
    image: `${FLUENT}/Glass%20of%20milk/3D/glass_of_milk_3d.png`,
    color: "bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-50",
    ring: "ring-sky-200/70",
    subcategories: [
      { name: "Milk", image: `${FLUENT}/Glass%20of%20milk/3D/glass_of_milk_3d.png` },
      { name: "Curd", image: `${FLUENT}/Bowl%20with%20spoon/3D/bowl_with_spoon_3d.png` },
      { name: "Paneer", image: `${FLUENT}/Cheese%20wedge/3D/cheese_wedge_3d.png` },
      { name: "Butter & Cheese", image: `${FLUENT}/Butter/3D/butter_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Staples",
    icon: "Wheat",
    image: `${FLUENT}/Sheaf%20of%20rice/3D/sheaf_of_rice_3d.png`,
    color: "bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-50",
    ring: "ring-amber-200/70",
    subcategories: [
      { name: "Atta", image: `${FLUENT}/Bread/3D/bread_3d.png` },
      { name: "Rice", image: `${FLUENT}/Cooked%20rice/3D/cooked_rice_3d.png` },
      { name: "Dal", image: `${FLUENT}/Pot%20of%20food/3D/pot_of_food_3d.png` },
      { name: "Oil & Ghee", image: `${FLUENT}/Cooking/3D/cooking_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Snacks",
    icon: "Cookie",
    image: `${FLUENT}/Cookie/3D/cookie_3d.png`,
    color: "bg-gradient-to-br from-orange-200 via-red-100 to-rose-50",
    ring: "ring-orange-200/70",
    subcategories: [
      { name: "Chips", image: `${FLUENT}/French%20fries/3D/french_fries_3d.png` },
      { name: "Namkeen", image: `${FLUENT}/Peanuts/3D/peanuts_3d.png` },
      { name: "Biscuits", image: `${FLUENT}/Cookie/3D/cookie_3d.png` },
      { name: "Chocolates", image: `${FLUENT}/Chocolate%20bar/3D/chocolate_bar_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Beverages",
    icon: "CupSoda",
    image: `${FLUENT}/Cup%20with%20straw/3D/cup_with_straw_3d.png`,
    color: "bg-gradient-to-br from-cyan-200 via-teal-100 to-sky-50",
    ring: "ring-cyan-200/70",
    subcategories: [
      { name: "Tea & Coffee", image: `${FLUENT}/Hot%20beverage/3D/hot_beverage_3d.png` },
      { name: "Juices", image: `${FLUENT}/Tropical%20drink/3D/tropical_drink_3d.png` },
      { name: "Soft Drinks", image: `${FLUENT}/Cup%20with%20straw/3D/cup_with_straw_3d.png` },
      { name: "Energy Drinks", image: `${FLUENT}/Beverage%20box/3D/beverage_box_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Home Care",
    icon: "Sparkles",
    image: `${FLUENT}/Soap/3D/soap_3d.png`,
    color: "bg-gradient-to-br from-violet-200 via-fuchsia-100 to-purple-50",
    ring: "ring-violet-200/70",
    subcategories: [
      { name: "Detergents", image: `${FLUENT}/Soap/3D/soap_3d.png` },
      { name: "Cleaners", image: `${FLUENT}/Bubbles/3D/bubbles_3d.png` },
      { name: "Tissues", image: `${FLUENT}/Roll%20of%20paper/3D/roll_of_paper_3d.png` },
      { name: "Repellents", image: `${FLUENT}/Mosquito/3D/mosquito_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Personal Care",
    icon: "Heart",
    image: `${FLUENT}/Lotion%20bottle/3D/lotion_bottle_3d.png`,
    color: "bg-gradient-to-br from-rose-200 via-pink-100 to-fuchsia-50",
    ring: "ring-rose-200/70",
    subcategories: [
      { name: "Bath", image: `${FLUENT}/Shower/3D/shower_3d.png` },
      { name: "Hair", image: `${FLUENT}/Person%20getting%20haircut/Default/3D/person_getting_haircut_3d_default.png` },
      { name: "Skin", image: `${FLUENT}/Lotion%20bottle/3D/lotion_bottle_3d.png` },
      { name: "Oral Care", image: `${FLUENT}/Tooth/3D/tooth_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Baby & Pet",
    icon: "Baby",
    image: `${FLUENT}/Baby/Default/3D/baby_3d_default.png`,
    color: "bg-gradient-to-br from-lime-200 via-yellow-100 to-amber-50",
    ring: "ring-lime-200/70",
    subcategories: [
      { name: "Diapers", image: `${FLUENT}/Baby/Default/3D/baby_3d_default.png` },
      { name: "Baby Food", image: `${FLUENT}/Baby%20bottle/3D/baby_bottle_3d.png` },
      { name: "Pet Food", image: `${FLUENT}/Bone/3D/bone_3d.png` },
      { name: "Pet Treats", image: `${FLUENT}/Paw%20prints/3D/paw_prints_3d.png` },
    ] as Subcategory[],
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
