// Fluent UI Emoji 3D icons via jsDelivr — verified working paths
const FLUENT = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets";
// Twemoji SVG fallback for items not in Fluent
const TW = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

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
      { name: "Fruits", image: `${FLUENT}/Red apple/3D/red_apple_3d.png` },
      { name: "Herbs", image: `${FLUENT}/Potted plant/3D/potted_plant_3d.png` },
      { name: "Cut & Peeled", image: `${FLUENT}/Leafy green/3D/leafy_green_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Dairy",
    icon: "Milk",
    image: `${FLUENT}/Glass of milk/3D/glass_of_milk_3d.png`,
    color: "bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-50",
    ring: "ring-sky-200/70",
    subcategories: [
      { name: "Milk", image: `${FLUENT}/Glass of milk/3D/glass_of_milk_3d.png` },
      { name: "Curd", image: `${FLUENT}/Jar/3D/jar_3d.png` },
      { name: "Paneer", image: `${FLUENT}/Fondue/3D/fondue_3d.png` },
      { name: "Butter & Cheese", image: `${FLUENT}/Butter/3D/butter_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Staples",
    icon: "Wheat",
    image: `${FLUENT}/Ear of corn/3D/ear_of_corn_3d.png`,
    color: "bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-50",
    ring: "ring-amber-200/70",
    subcategories: [
      { name: "Atta", image: `${FLUENT}/Flatbread/3D/flatbread_3d.png` },
      { name: "Rice", image: `${FLUENT}/Cooked rice/3D/cooked_rice_3d.png` },
      { name: "Dal", image: `${FLUENT}/Pot of food/3D/pot_of_food_3d.png` },
      { name: "Oil & Ghee", image: `${FLUENT}/Honey pot/3D/honey_pot_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Snacks",
    icon: "Cookie",
    image: `${FLUENT}/Cookie/3D/cookie_3d.png`,
    color: "bg-gradient-to-br from-orange-200 via-red-100 to-rose-50",
    ring: "ring-orange-200/70",
    subcategories: [
      { name: "Chips", image: `${FLUENT}/Pretzel/3D/pretzel_3d.png` },
      { name: "Namkeen", image: `${FLUENT}/Peanuts/3D/peanuts_3d.png` },
      { name: "Biscuits", image: `${FLUENT}/Cookie/3D/cookie_3d.png` },
      { name: "Chocolates", image: `${FLUENT}/Candy/3D/candy_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Beverages",
    icon: "CupSoda",
    image: `${FLUENT}/Cup with straw/3D/cup_with_straw_3d.png`,
    color: "bg-gradient-to-br from-cyan-200 via-teal-100 to-sky-50",
    ring: "ring-cyan-200/70",
    subcategories: [
      { name: "Tea & Coffee", image: `${FLUENT}/Hot beverage/3D/hot_beverage_3d.png` },
      { name: "Juices", image: `${FLUENT}/Tropical drink/3D/tropical_drink_3d.png` },
      { name: "Soft Drinks", image: `${FLUENT}/Cup with straw/3D/cup_with_straw_3d.png` },
      { name: "Energy Drinks", image: `${FLUENT}/Beverage box/3D/beverage_box_3d.png` },
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
      { name: "Cleaners", image: `${FLUENT}/Sponge/3D/sponge_3d.png` },
      { name: "Tissues", image: `${FLUENT}/Toilet/3D/toilet_3d.png` },
      { name: "Repellents", image: `${FLUENT}/Mosquito/3D/mosquito_3d.png` },
    ] as Subcategory[],
  },
  {
    name: "Personal Care",
    icon: "Heart",
    image: `${FLUENT}/Lotion bottle/3D/lotion_bottle_3d.png`,
    color: "bg-gradient-to-br from-rose-200 via-pink-100 to-fuchsia-50",
    ring: "ring-rose-200/70",
    subcategories: [
      { name: "Bath", image: `${FLUENT}/Shower/3D/shower_3d.png` },
      { name: "Hair", image: `${FLUENT}/Lotion bottle/3D/lotion_bottle_3d.png` },
      { name: "Skin", image: `${FLUENT}/Soap/3D/soap_3d.png` },
      { name: "Oral Care", image: `${FLUENT}/Toothbrush/3D/toothbrush_3d.png` },
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
      { name: "Baby Food", image: `${FLUENT}/Pancakes/3D/pancakes_3d.png` },
      { name: "Pet Food", image: `${FLUENT}/Bone/3D/bone_3d.png` },
      { name: "Pet Treats", image: `${FLUENT}/Paw prints/3D/paw_prints_3d.png` },
    ] as Subcategory[],
  },
];

export const categories = groceryAisles.map(({ name, icon, color }) => ({ name, icon, color }));

export const allProducts = {
  // ─── FRESH: VEGETABLES ───────────────────────────────────────────────────────
  vegetables: [
    {
      id: "v1", name: "Fresh Tomatoes", weight: "1 kg", price: 40, originalPrice: 60,
      imageColor: "from-red-100 to-red-50", tag: "Fresh",
      brand: "Local Farm", category: "Vegetables",
      description: "Hand-picked ripe tomatoes sourced directly from local farms in Mandya. Rich in lycopene and vitamin C.",
      details: ["Country of Origin: India", "Storage: Cool & dry place", "Shelf Life: 5–7 days"],
      nutrition: [{ label: "Energy", value: "18 kcal" }, { label: "Carbs", value: "3.9g" }, { label: "Protein", value: "0.9g" }, { label: "Fat", value: "0.2g" }],
    },
    {
      id: "v2", name: "Red Onion", weight: "1 kg", price: 35, originalPrice: 45,
      imageColor: "from-purple-100 to-purple-50",
      brand: "Local Farm", category: "Vegetables",
      description: "Fresh red onions with a pungent flavour. Essential for everyday Indian cooking.",
      details: ["Country of Origin: India", "Storage: Cool & dry place", "Shelf Life: 2–3 weeks"],
      nutrition: [{ label: "Energy", value: "40 kcal" }, { label: "Carbs", value: "9.3g" }, { label: "Protein", value: "1.1g" }, { label: "Fat", value: "0.1g" }],
    },
    {
      id: "v3", name: "Potato", weight: "1 kg", price: 25,
      imageColor: "from-yellow-100 to-yellow-50",
      brand: "Local Farm", category: "Vegetables",
      description: "Versatile potatoes perfect for curries, fries, and snacks. Sourced from Karnataka farms.",
      details: ["Country of Origin: India", "Storage: Cool & dry place", "Shelf Life: 2–3 weeks"],
      nutrition: [{ label: "Energy", value: "77 kcal" }, { label: "Carbs", value: "17g" }, { label: "Protein", value: "2g" }, { label: "Fat", value: "0.1g" }],
    },
    {
      id: "v4", name: "Green Capsicum", weight: "250 g", price: 30,
      imageColor: "from-green-100 to-green-50", tag: "Fresh",
      brand: "Local Farm", category: "Vegetables",
      description: "Crisp and fresh green capsicums. Great for stir-fries, salads, and stuffed dishes.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 5–7 days"],
      nutrition: [{ label: "Energy", value: "20 kcal" }, { label: "Carbs", value: "4.6g" }, { label: "Protein", value: "0.9g" }, { label: "Fat", value: "0.2g" }],
    },
    {
      id: "v5", name: "Broccoli", weight: "500 g", price: 65, originalPrice: 80,
      imageColor: "from-emerald-100 to-emerald-50", tag: "Fresh",
      brand: "Local Farm", category: "Vegetables",
      description: "Fresh green broccoli florets packed with vitamins K and C. Great for stir-fries and salads.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 4–5 days"],
      nutrition: [{ label: "Energy", value: "34 kcal" }, { label: "Carbs", value: "6.6g" }, { label: "Protein", value: "2.8g" }, { label: "Fat", value: "0.4g" }],
    },
    {
      id: "v6", name: "Carrot", weight: "500 g", price: 30,
      imageColor: "from-orange-100 to-orange-50", tag: "Fresh",
      brand: "Local Farm", category: "Vegetables",
      description: "Sweet and crunchy orange carrots. Rich in beta-carotene and great for halwa, salads, and juices.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 1–2 weeks"],
      nutrition: [{ label: "Energy", value: "41 kcal" }, { label: "Carbs", value: "9.6g" }, { label: "Protein", value: "0.9g" }, { label: "Fat", value: "0.2g" }],
    },
  ],

  // ─── FRESH: FRUITS ───────────────────────────────────────────────────────────
  fruits: [
    {
      id: "f1", name: "Banana", weight: "6 pcs", price: 48, originalPrice: 60,
      imageColor: "from-yellow-200 to-yellow-50", tag: "Fresh",
      brand: "Local Farm", category: "Fruits",
      description: "Sweet and ripe Robusta bananas. A great source of potassium and instant energy.",
      details: ["Country of Origin: India", "Storage: Room temperature", "Shelf Life: 3–5 days"],
      nutrition: [{ label: "Energy", value: "89 kcal" }, { label: "Carbs", value: "23g" }, { label: "Protein", value: "1.1g" }, { label: "Fat", value: "0.3g" }],
    },
    {
      id: "f2", name: "Alphonso Mango", weight: "2 pcs", price: 199, originalPrice: 250,
      imageColor: "from-orange-200 to-orange-50", tag: "Best Seller",
      brand: "Ratnagiri Farms", category: "Fruits",
      description: "The king of mangoes. Authentic Alphonso mangoes from Ratnagiri with a rich, creamy texture and sweet aroma.",
      details: ["Country of Origin: India", "Storage: Room temperature", "Shelf Life: 3–4 days"],
      nutrition: [{ label: "Energy", value: "60 kcal" }, { label: "Carbs", value: "15g" }, { label: "Protein", value: "0.8g" }, { label: "Fat", value: "0.4g" }],
    },
    {
      id: "f3", name: "Royal Gala Apple", weight: "4 pcs", price: 160,
      imageColor: "from-red-200 to-red-50",
      brand: "Himachal Orchards", category: "Fruits",
      description: "Crisp and sweet Royal Gala apples from Himachal Pradesh. Perfect for snacking.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 1–2 weeks"],
      nutrition: [{ label: "Energy", value: "52 kcal" }, { label: "Carbs", value: "14g" }, { label: "Protein", value: "0.3g" }, { label: "Fat", value: "0.2g" }],
    },
    {
      id: "f4", name: "Green Grapes", weight: "500 g", price: 70, originalPrice: 90,
      imageColor: "from-green-100 to-green-50",
      brand: "Nashik Farms", category: "Fruits",
      description: "Seedless green grapes from Nashik. Juicy, sweet, and perfect for snacking or desserts.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 5–7 days"],
      nutrition: [{ label: "Energy", value: "67 kcal" }, { label: "Carbs", value: "17g" }, { label: "Protein", value: "0.6g" }, { label: "Fat", value: "0.4g" }],
    },
    {
      id: "f5", name: "Watermelon", weight: "1 pc (~2 kg)", price: 89, originalPrice: 110,
      imageColor: "from-red-100 to-green-50", tag: "Fresh",
      brand: "Local Farm", category: "Fruits",
      description: "Juicy and refreshing watermelon. 92% water content makes it the perfect summer fruit.",
      details: ["Country of Origin: India", "Storage: Refrigerate after cutting", "Shelf Life: 3–5 days"],
      nutrition: [{ label: "Energy", value: "30 kcal" }, { label: "Carbs", value: "7.6g" }, { label: "Protein", value: "0.6g" }, { label: "Fat", value: "0.2g" }],
    },
    {
      id: "f6", name: "Pomegranate", weight: "2 pcs", price: 120, originalPrice: 150,
      imageColor: "from-rose-200 to-rose-50",
      brand: "Solapur Farms", category: "Fruits",
      description: "Ruby-red pomegranates from Solapur. Packed with antioxidants and a sweet-tart flavour.",
      details: ["Country of Origin: India", "Storage: Room temperature or refrigerate", "Shelf Life: 1–2 weeks"],
      nutrition: [{ label: "Energy", value: "83 kcal" }, { label: "Carbs", value: "19g" }, { label: "Protein", value: "1.7g" }, { label: "Fat", value: "1.2g" }],
    },
  ],

  // ─── FRESH: HERBS ────────────────────────────────────────────────────────────
  herbs: [
    {
      id: "h1", name: "Fresh Coriander", weight: "100 g", price: 15,
      imageColor: "from-green-200 to-green-50", tag: "Fresh",
      brand: "Local Farm", category: "Herbs",
      description: "Freshly harvested coriander leaves with a bright, citrusy aroma. Essential for Indian garnishing.",
      details: ["Country of Origin: India", "Storage: Refrigerate in damp cloth", "Shelf Life: 3–4 days"],
      nutrition: [{ label: "Energy", value: "23 kcal" }, { label: "Carbs", value: "3.7g" }, { label: "Protein", value: "2.1g" }, { label: "Fat", value: "0.5g" }],
    },
    {
      id: "h2", name: "Curry Leaves", weight: "50 g", price: 10,
      imageColor: "from-lime-200 to-lime-50", tag: "Fresh",
      brand: "Local Farm", category: "Herbs",
      description: "Fresh curry leaves with a distinctive aroma. A staple in South Indian tempering and chutneys.",
      details: ["Country of Origin: India", "Storage: Refrigerate", "Shelf Life: 5–7 days"],
      nutrition: [{ label: "Energy", value: "108 kcal" }, { label: "Carbs", value: "18g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "1g" }],
    },
    {
      id: "h3", name: "Fresh Mint", weight: "100 g", price: 18,
      imageColor: "from-emerald-100 to-emerald-50", tag: "Fresh",
      brand: "Local Farm", category: "Herbs",
      description: "Cool and refreshing mint leaves. Perfect for chutneys, raita, biryanis, and beverages.",
      details: ["Country of Origin: India", "Storage: Refrigerate in damp cloth", "Shelf Life: 3–4 days"],
      nutrition: [{ label: "Energy", value: "44 kcal" }, { label: "Carbs", value: "8.4g" }, { label: "Protein", value: "3.3g" }, { label: "Fat", value: "0.7g" }],
    },
    {
      id: "h4", name: "Ginger", weight: "200 g", price: 28,
      imageColor: "from-amber-100 to-amber-50",
      brand: "Local Farm", category: "Herbs",
      description: "Fresh ginger root with a spicy, warming flavour. Used in curries, teas, and marinades.",
      details: ["Country of Origin: India", "Storage: Cool & dry place", "Shelf Life: 2–3 weeks"],
      nutrition: [{ label: "Energy", value: "80 kcal" }, { label: "Carbs", value: "18g" }, { label: "Protein", value: "1.8g" }, { label: "Fat", value: "0.8g" }],
    },
  ],

  // ─── FRESH: CUT & PEELED ─────────────────────────────────────────────────────
  cutAndPeeled: [
    {
      id: "cp1", name: "Cut Mixed Vegetables", weight: "300 g", price: 55, originalPrice: 70,
      imageColor: "from-green-100 to-yellow-50", tag: "Fresh",
      brand: "Savega Fresh", category: "Cut & Peeled",
      description: "Ready-to-cook mix of diced carrots, beans, peas, and corn. Washed and hygienically packed.",
      details: ["Brand: Savega Fresh", "Storage: Refrigerate", "Shelf Life: 2 days"],
      nutrition: [{ label: "Energy", value: "45 kcal" }, { label: "Carbs", value: "8g" }, { label: "Protein", value: "2g" }, { label: "Fat", value: "0.3g" }],
    },
    {
      id: "cp2", name: "Peeled Garlic", weight: "100 g", price: 35,
      imageColor: "from-yellow-50 to-white", tag: "Fresh",
      brand: "Savega Fresh", category: "Cut & Peeled",
      description: "Pre-peeled fresh garlic cloves. Saves prep time without compromising on flavour.",
      details: ["Brand: Savega Fresh", "Storage: Refrigerate", "Shelf Life: 5 days"],
      nutrition: [{ label: "Energy", value: "149 kcal" }, { label: "Carbs", value: "33g" }, { label: "Protein", value: "6.4g" }, { label: "Fat", value: "0.5g" }],
    },
    {
      id: "cp3", name: "Sliced Onions", weight: "250 g", price: 30,
      imageColor: "from-purple-50 to-white", tag: "Fresh",
      brand: "Savega Fresh", category: "Cut & Peeled",
      description: "Freshly sliced onions, ready to use. Perfect for biryanis, curries, and salads.",
      details: ["Brand: Savega Fresh", "Storage: Refrigerate", "Shelf Life: 2 days"],
      nutrition: [{ label: "Energy", value: "40 kcal" }, { label: "Carbs", value: "9.3g" }, { label: "Protein", value: "1.1g" }, { label: "Fat", value: "0.1g" }],
    },
    {
      id: "cp4", name: "Diced Pumpkin", weight: "400 g", price: 45,
      imageColor: "from-orange-100 to-orange-50", tag: "Fresh",
      brand: "Savega Fresh", category: "Cut & Peeled",
      description: "Pre-cut pumpkin cubes, peeled and ready to cook. Great for curries, soups, and halwa.",
      details: ["Brand: Savega Fresh", "Storage: Refrigerate", "Shelf Life: 2 days"],
      nutrition: [{ label: "Energy", value: "26 kcal" }, { label: "Carbs", value: "6.5g" }, { label: "Protein", value: "1g" }, { label: "Fat", value: "0.1g" }],
    },
  ],

  // ─── DAIRY: MILK ─────────────────────────────────────────────────────────────
  milk: [
    {
      id: "m1", name: "Amul Taaza Milk", weight: "500 ml", price: 27,
      imageColor: "from-blue-100 to-blue-50", tag: "Fresh",
      brand: "Amul", category: "Milk",
      description: "Amul Taaza is homogenised toned milk with 3% fat and 8.5% SNF. Fresh and pasteurised daily.",
      details: ["Brand: Amul (GCMMF)", "Type: Toned Milk", "Shelf Life: 2 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "58 kcal" }, { label: "Carbs", value: "4.9g" }, { label: "Protein", value: "3.2g" }, { label: "Fat", value: "3g" }],
    },
    {
      id: "m2", name: "Amul Gold Full Cream Milk", weight: "500 ml", price: 32,
      imageColor: "from-yellow-100 to-yellow-50", tag: "Best Seller",
      brand: "Amul", category: "Milk",
      description: "Amul Gold full cream milk with 6% fat. Rich, creamy, and perfect for making sweets and tea.",
      details: ["Brand: Amul (GCMMF)", "Type: Full Cream Milk", "Shelf Life: 2 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "82 kcal" }, { label: "Carbs", value: "4.9g" }, { label: "Protein", value: "3.5g" }, { label: "Fat", value: "6g" }],
    },
    {
      id: "m3", name: "Mother Dairy Toned Milk", weight: "1 l", price: 54,
      imageColor: "from-sky-100 to-sky-50",
      brand: "Mother Dairy", category: "Milk",
      description: "Mother Dairy toned milk in a convenient 1-litre pack. Pasteurised and homogenised for freshness.",
      details: ["Brand: Mother Dairy", "Type: Toned Milk", "Shelf Life: 2 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "58 kcal" }, { label: "Carbs", value: "4.9g" }, { label: "Protein", value: "3.2g" }, { label: "Fat", value: "3g" }],
    },
    {
      id: "m4", name: "Nandini Homogenised Milk", weight: "500 ml", price: 26,
      imageColor: "from-indigo-50 to-white",
      brand: "Nandini", category: "Milk",
      description: "Karnataka's favourite milk brand. Nandini homogenised toned milk, fresh from KMF dairies.",
      details: ["Brand: Nandini (KMF)", "Type: Toned Milk", "Shelf Life: 2 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "58 kcal" }, { label: "Carbs", value: "4.9g" }, { label: "Protein", value: "3.2g" }, { label: "Fat", value: "3g" }],
    },
  ],

  // ─── DAIRY: CURD ─────────────────────────────────────────────────────────────
  curd: [
    {
      id: "cu1", name: "Mother Dairy Curd", weight: "400 g", price: 35,
      imageColor: "from-blue-50 to-white",
      brand: "Mother Dairy", category: "Curd",
      description: "Thick and creamy set curd made from fresh toned milk. No preservatives, no additives.",
      details: ["Brand: Mother Dairy", "Type: Set Curd", "Shelf Life: 7 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "62 kcal" }, { label: "Carbs", value: "4.7g" }, { label: "Protein", value: "3.1g" }, { label: "Fat", value: "3.1g" }],
    },
    {
      id: "cu2", name: "Amul Masti Dahi", weight: "400 g", price: 38, originalPrice: 45,
      imageColor: "from-yellow-50 to-white", tag: "Best Seller",
      brand: "Amul", category: "Curd",
      description: "Amul Masti Dahi — thick, creamy, and mildly tangy. Made from fresh pasteurised milk.",
      details: ["Brand: Amul (GCMMF)", "Type: Set Curd", "Shelf Life: 7 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "62 kcal" }, { label: "Carbs", value: "4.7g" }, { label: "Protein", value: "3.1g" }, { label: "Fat", value: "3.1g" }],
    },
    {
      id: "cu3", name: "Nandini Curd", weight: "500 g", price: 40,
      imageColor: "from-indigo-50 to-white",
      brand: "Nandini", category: "Curd",
      description: "Nandini set curd with a smooth texture and mild flavour. Ideal for raita and lassi.",
      details: ["Brand: Nandini (KMF)", "Type: Set Curd", "Shelf Life: 7 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "62 kcal" }, { label: "Carbs", value: "4.7g" }, { label: "Protein", value: "3.1g" }, { label: "Fat", value: "3.1g" }],
    },
    {
      id: "cu4", name: "Epigamia Greek Yogurt", weight: "90 g", price: 45, originalPrice: 55,
      imageColor: "from-purple-50 to-white",
      brand: "Epigamia", category: "Curd",
      description: "Thick, protein-rich Greek yogurt with no added sugar. A healthy snack or breakfast option.",
      details: ["Brand: Epigamia", "Type: Greek Yogurt", "Shelf Life: 14 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "73 kcal" }, { label: "Carbs", value: "5.2g" }, { label: "Protein", value: "6.5g" }, { label: "Fat", value: "2.5g" }],
    },
  ],

  // ─── DAIRY: PANEER ───────────────────────────────────────────────────────────
  paneer: [
    {
      id: "p1", name: "Savega Fresh Paneer", weight: "200 g", price: 95, originalPrice: 110,
      imageColor: "from-gray-50 to-white", tag: "Fresh",
      brand: "Savega Fresh", category: "Paneer",
      description: "Soft and fresh paneer made daily from full-fat cow milk. Perfect for curries, tikkas, and salads.",
      details: ["Brand: Savega Fresh", "Type: Full Fat Paneer", "Shelf Life: 3 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "265 kcal" }, { label: "Carbs", value: "1.2g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "21g" }],
    },
    {
      id: "p2", name: "Amul Malai Paneer", weight: "200 g", price: 105,
      imageColor: "from-yellow-50 to-white", tag: "Best Seller",
      brand: "Amul", category: "Paneer",
      description: "Amul Malai Paneer — rich, creamy, and firm. Made from full cream milk for a melt-in-mouth texture.",
      details: ["Brand: Amul (GCMMF)", "Type: Malai Paneer", "Shelf Life: 7 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "280 kcal" }, { label: "Carbs", value: "1.5g" }, { label: "Protein", value: "17g" }, { label: "Fat", value: "23g" }],
    },
    {
      id: "p3", name: "Mother Dairy Paneer", weight: "200 g", price: 98,
      imageColor: "from-sky-50 to-white",
      brand: "Mother Dairy", category: "Paneer",
      description: "Firm and fresh paneer from Mother Dairy. Ideal for grilling, frying, or adding to gravies.",
      details: ["Brand: Mother Dairy", "Type: Fresh Paneer", "Shelf Life: 5 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "265 kcal" }, { label: "Carbs", value: "1.2g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "21g" }],
    },
    {
      id: "p4", name: "Nandini Paneer", weight: "500 g", price: 230, originalPrice: 260,
      imageColor: "from-indigo-50 to-white",
      brand: "Nandini", category: "Paneer",
      description: "Economy pack of Nandini paneer. Great value for families who cook paneer dishes regularly.",
      details: ["Brand: Nandini (KMF)", "Type: Fresh Paneer", "Shelf Life: 5 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "265 kcal" }, { label: "Carbs", value: "1.2g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "21g" }],
    },
  ],

  // ─── DAIRY: BUTTER & CHEESE ──────────────────────────────────────────────────
  butterAndCheese: [
    {
      id: "bc1", name: "Amul Butter", weight: "100 g", price: 58,
      imageColor: "from-yellow-200 to-yellow-100", tag: "Best Seller",
      brand: "Amul", category: "Butter & Cheese",
      description: "Amul Pasteurised Butter — made from fresh cream with a rich, creamy taste. India's most loved butter.",
      details: ["Brand: Amul (GCMMF)", "Type: Salted Butter", "Shelf Life: 30 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "720 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0.5g" }, { label: "Fat", value: "81g" }],
    },
    {
      id: "bc2", name: "Amul Processed Cheese", weight: "200 g", price: 115, originalPrice: 130,
      imageColor: "from-orange-100 to-yellow-50",
      brand: "Amul", category: "Butter & Cheese",
      description: "Amul processed cheese block — smooth, creamy, and perfect for sandwiches, pizzas, and pasta.",
      details: ["Brand: Amul (GCMMF)", "Type: Processed Cheese", "Shelf Life: 6 months (refrigerated)"],
      nutrition: [{ label: "Energy", value: "320 kcal" }, { label: "Carbs", value: "2g" }, { label: "Protein", value: "20g" }, { label: "Fat", value: "26g" }],
    },
    {
      id: "bc3", name: "Britannia Cheese Slices", weight: "200 g", price: 120,
      imageColor: "from-yellow-100 to-orange-50",
      brand: "Britannia", category: "Butter & Cheese",
      description: "Individually wrapped cheese slices. Melt perfectly on burgers, sandwiches, and toast.",
      details: ["Brand: Britannia", "Type: Processed Cheese Slices", "Shelf Life: 6 months (refrigerated)"],
      nutrition: [{ label: "Energy", value: "310 kcal" }, { label: "Carbs", value: "3g" }, { label: "Protein", value: "19g" }, { label: "Fat", value: "25g" }],
    },
    {
      id: "bc4", name: "Nandini Ghee", weight: "500 ml", price: 310, originalPrice: 350,
      imageColor: "from-amber-200 to-amber-50",
      brand: "Nandini", category: "Butter & Cheese",
      description: "Pure cow ghee from Nandini (KMF). Made using traditional bilona method for authentic flavour.",
      details: ["Brand: Nandini (KMF)", "Type: Pure Cow Ghee", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "900 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
  ],

  // ─── STAPLES: ATTA ───────────────────────────────────────────────────────────
  atta: [
    {
      id: "at1", name: "Fortune Chakki Atta", weight: "5 kg", price: 245, originalPrice: 275,
      imageColor: "from-orange-100 to-white", tag: "Best Seller",
      brand: "Fortune", category: "Atta",
      description: "Made from 100% whole wheat, Fortune Chakki Atta gives soft rotis with a natural golden colour.",
      details: ["Brand: Fortune (Adani Wilmar)", "Type: Whole Wheat", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "341 kcal" }, { label: "Carbs", value: "70g" }, { label: "Protein", value: "12g" }, { label: "Fat", value: "1.7g" }],
    },
    {
      id: "at2", name: "Aashirvaad Atta", weight: "5 kg", price: 255, originalPrice: 285,
      imageColor: "from-amber-100 to-white",
      brand: "Aashirvaad", category: "Atta",
      description: "Aashirvaad Select Sharbati Atta made from the finest Sharbati wheat from Sehore, MP.",
      details: ["Brand: Aashirvaad (ITC)", "Type: Sharbati Wheat", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "346 kcal" }, { label: "Carbs", value: "71g" }, { label: "Protein", value: "11g" }, { label: "Fat", value: "1.5g" }],
    },
    {
      id: "at3", name: "Pillsbury Chakki Fresh Atta", weight: "5 kg", price: 240,
      imageColor: "from-yellow-50 to-white",
      brand: "Pillsbury", category: "Atta",
      description: "Pillsbury Chakki Fresh Atta — stone-ground whole wheat flour for soft, fluffy rotis every time.",
      details: ["Brand: Pillsbury (General Mills)", "Type: Whole Wheat", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "340 kcal" }, { label: "Carbs", value: "70g" }, { label: "Protein", value: "11g" }, { label: "Fat", value: "1.5g" }],
    },
    {
      id: "at4", name: "Organic Tattva Multigrain Atta", weight: "1 kg", price: 95, originalPrice: 110,
      imageColor: "from-lime-100 to-white",
      brand: "Organic Tattva", category: "Atta",
      description: "Certified organic multigrain atta with wheat, jowar, bajra, and ragi. High in fibre and nutrients.",
      details: ["Brand: Organic Tattva", "Type: Multigrain", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "338 kcal" }, { label: "Carbs", value: "68g" }, { label: "Protein", value: "13g" }, { label: "Fat", value: "2g" }],
    },
  ],

  // ─── STAPLES: RICE ───────────────────────────────────────────────────────────
  rice: [
    {
      id: "r1", name: "India Gate Basmati Rice", weight: "1 kg", price: 145, originalPrice: 180,
      imageColor: "from-blue-50 to-white", tag: "Best Seller",
      brand: "India Gate", category: "Rice",
      description: "Premium aged Basmati rice with long grains and a delicate aroma. Perfect for biryani and pulao.",
      details: ["Brand: India Gate (KRBL)", "Type: Basmati", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "349 kcal" }, { label: "Carbs", value: "78g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "0.5g" }],
    },
    {
      id: "r2", name: "Daawat Rozana Basmati", weight: "5 kg", price: 520, originalPrice: 600,
      imageColor: "from-amber-50 to-white",
      brand: "Daawat", category: "Rice",
      description: "Daawat Rozana — everyday basmati rice with long grains and a pleasant aroma. Great value pack.",
      details: ["Brand: Daawat (LT Foods)", "Type: Basmati", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "349 kcal" }, { label: "Carbs", value: "78g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "0.5g" }],
    },
    {
      id: "r3", name: "Sona Masoori Raw Rice", weight: "5 kg", price: 320,
      imageColor: "from-yellow-50 to-white",
      brand: "Savega Select", category: "Rice",
      description: "Premium Sona Masoori raw rice — lightweight, aromatic, and easy to digest. Ideal for daily meals.",
      details: ["Brand: Savega Select", "Type: Sona Masoori", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "345 kcal" }, { label: "Carbs", value: "77g" }, { label: "Protein", value: "6.5g" }, { label: "Fat", value: "0.4g" }],
    },
    {
      id: "r4", name: "Fortune Biryani Basmati", weight: "1 kg", price: 135,
      imageColor: "from-orange-50 to-white",
      brand: "Fortune", category: "Rice",
      description: "Extra-long grain basmati rice specially selected for biryani. Each grain stays separate after cooking.",
      details: ["Brand: Fortune (Adani Wilmar)", "Type: Extra Long Basmati", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "349 kcal" }, { label: "Carbs", value: "78g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "0.5g" }],
    },
  ],

  // ─── STAPLES: DAL ────────────────────────────────────────────────────────────
  dal: [
    {
      id: "d1", name: "Toor Dal Premium", weight: "1 kg", price: 168,
      imageColor: "from-yellow-200 to-yellow-50", tag: "Best Seller",
      brand: "Savega Select", category: "Dal",
      description: "Premium quality toor dal (split pigeon peas) with no added colour or preservatives.",
      details: ["Brand: Savega Select", "Type: Toor Dal", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "343 kcal" }, { label: "Carbs", value: "62g" }, { label: "Protein", value: "22g" }, { label: "Fat", value: "1.5g" }],
    },
    {
      id: "d2", name: "Moong Dal Washed", weight: "500 g", price: 85, originalPrice: 100,
      imageColor: "from-lime-100 to-lime-50",
      brand: "24 Mantra Organic", category: "Dal",
      description: "Organic washed moong dal — light, easy to digest, and perfect for khichdi and soups.",
      details: ["Brand: 24 Mantra Organic", "Type: Moong Dal (Washed)", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "347 kcal" }, { label: "Carbs", value: "59g" }, { label: "Protein", value: "24g" }, { label: "Fat", value: "1.2g" }],
    },
    {
      id: "d3", name: "Masoor Dal", weight: "1 kg", price: 120,
      imageColor: "from-red-100 to-orange-50",
      brand: "Savega Select", category: "Dal",
      description: "Red lentils (masoor dal) that cook quickly and have a mild, earthy flavour. Great for everyday dal.",
      details: ["Brand: Savega Select", "Type: Masoor Dal", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "352 kcal" }, { label: "Carbs", value: "60g" }, { label: "Protein", value: "26g" }, { label: "Fat", value: "1g" }],
    },
    {
      id: "d4", name: "Chana Dal", weight: "1 kg", price: 110,
      imageColor: "from-amber-100 to-yellow-50",
      brand: "Savega Select", category: "Dal",
      description: "Split Bengal gram (chana dal) with a nutty flavour. Used in dals, halwa, and snacks.",
      details: ["Brand: Savega Select", "Type: Chana Dal", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "364 kcal" }, { label: "Carbs", value: "61g" }, { label: "Protein", value: "20g" }, { label: "Fat", value: "5g" }],
    },
  ],

  // ─── STAPLES: OIL & GHEE ─────────────────────────────────────────────────────
  oilAndGhee: [
    {
      id: "og1", name: "Cold Pressed Groundnut Oil", weight: "1 l", price: 235, originalPrice: 275,
      imageColor: "from-amber-100 to-white",
      brand: "Savega Select", category: "Oil & Ghee",
      description: "Cold pressed groundnut oil retains natural nutrients and has a rich, nutty flavour ideal for Indian cooking.",
      details: ["Brand: Savega Select", "Type: Cold Pressed", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "884 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
    {
      id: "og2", name: "Fortune Sunflower Oil", weight: "1 l", price: 155, originalPrice: 175,
      imageColor: "from-yellow-100 to-white", tag: "Best Seller",
      brand: "Fortune", category: "Oil & Ghee",
      description: "Light and healthy sunflower oil with a high smoke point. Ideal for deep frying and everyday cooking.",
      details: ["Brand: Fortune (Adani Wilmar)", "Type: Refined Sunflower Oil", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "884 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
    {
      id: "og3", name: "Amul Pure Ghee", weight: "500 ml", price: 325, originalPrice: 360,
      imageColor: "from-yellow-200 to-amber-50",
      brand: "Amul", category: "Oil & Ghee",
      description: "Amul Pure Ghee made from fresh cream. Rich aroma, golden colour, and authentic taste.",
      details: ["Brand: Amul (GCMMF)", "Type: Pure Ghee", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "900 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
    {
      id: "og4", name: "Saffola Gold Oil", weight: "1 l", price: 185, originalPrice: 210,
      imageColor: "from-orange-50 to-white",
      brand: "Saffola", category: "Oil & Ghee",
      description: "Saffola Gold blended oil with rice bran and corn oil. Low in saturated fat, good for heart health.",
      details: ["Brand: Saffola (Marico)", "Type: Blended Oil", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "884 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
  ],

  // ─── SNACKS: CHIPS ───────────────────────────────────────────────────────────
  chips: [
    {
      id: "ch1", name: "Lay's Classic Salted", weight: "73 g", price: 30,
      imageColor: "from-yellow-200 to-yellow-50", tag: "Best Seller",
      brand: "Lay's", category: "Chips",
      description: "Lay's Classic Salted potato chips — thin, crispy, and perfectly salted. The original crowd-pleaser.",
      details: ["Brand: Lay's (PepsiCo)", "Flavour: Classic Salted", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "536 kcal" }, { label: "Carbs", value: "53g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "34g" }],
    },
    {
      id: "ch2", name: "Too Yumm Multigrain Chips", weight: "82 g", price: 40,
      imageColor: "from-orange-100 to-white",
      brand: "Too Yumm", category: "Chips",
      description: "Baked not fried! Too Yumm multigrain chips with 50% less fat than regular chips.",
      details: ["Brand: Too Yumm (RP-SG)", "Flavour: Masala", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "430 kcal" }, { label: "Carbs", value: "68g" }, { label: "Protein", value: "8g" }, { label: "Fat", value: "14g" }],
    },
    {
      id: "ch3", name: "Pringles Original", weight: "107 g", price: 199, originalPrice: 230,
      imageColor: "from-red-100 to-red-50",
      brand: "Pringles", category: "Chips",
      description: "Pringles Original — uniformly shaped, stackable potato crisps with a satisfying crunch.",
      details: ["Brand: Pringles (Kellogg's)", "Flavour: Original", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "530 kcal" }, { label: "Carbs", value: "52g" }, { label: "Protein", value: "5g" }, { label: "Fat", value: "34g" }],
    },
    {
      id: "ch4", name: "Kurkure Masala Munch", weight: "90 g", price: 30,
      imageColor: "from-orange-200 to-orange-50",
      brand: "Kurkure", category: "Chips",
      description: "Kurkure Masala Munch — the iconic crunchy, spicy Indian snack made with rice meal and corn.",
      details: ["Brand: Kurkure (PepsiCo)", "Flavour: Masala Munch", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "520 kcal" }, { label: "Carbs", value: "60g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "28g" }],
    },
  ],

  // ─── SNACKS: NAMKEEN ─────────────────────────────────────────────────────────
  namkeen: [
    {
      id: "nk1", name: "Haldiram Bhujia", weight: "200 g", price: 68,
      imageColor: "from-yellow-100 to-white", tag: "Best Seller",
      brand: "Haldiram's", category: "Namkeen",
      description: "The iconic Haldiram Bhujia — crispy, spicy, and made with the finest besan. A timeless Indian snack.",
      details: ["Brand: Haldiram's", "Type: Namkeen", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "536 kcal" }, { label: "Carbs", value: "52g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "28g" }],
    },
    {
      id: "nk2", name: "Haldiram Aloo Bhujia", weight: "200 g", price: 65,
      imageColor: "from-amber-100 to-yellow-50",
      brand: "Haldiram's", category: "Namkeen",
      description: "Crispy potato-based bhujia with a spicy masala coating. A popular tea-time snack.",
      details: ["Brand: Haldiram's", "Type: Namkeen", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "520 kcal" }, { label: "Carbs", value: "55g" }, { label: "Protein", value: "10g" }, { label: "Fat", value: "28g" }],
    },
    {
      id: "nk3", name: "Bikaji Bikaneri Bhujia", weight: "200 g", price: 70,
      imageColor: "from-orange-100 to-yellow-50",
      brand: "Bikaji", category: "Namkeen",
      description: "Authentic Bikaneri bhujia from Bikaji — thin, crispy, and packed with traditional Rajasthani spices.",
      details: ["Brand: Bikaji Foods", "Type: Namkeen", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "540 kcal" }, { label: "Carbs", value: "50g" }, { label: "Protein", value: "19g" }, { label: "Fat", value: "30g" }],
    },
    {
      id: "nk4", name: "Cornitos Nachos Crisps", weight: "150 g", price: 99, originalPrice: 120,
      imageColor: "from-yellow-200 to-orange-50",
      brand: "Cornitos", category: "Namkeen",
      description: "Crunchy corn nachos with a bold cheese flavour. Perfect for dipping or snacking on the go.",
      details: ["Brand: Cornitos (Greendot Health Foods)", "Flavour: Cheese", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "490 kcal" }, { label: "Carbs", value: "62g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "24g" }],
    },
  ],

  // ─── SNACKS: BISCUITS ────────────────────────────────────────────────────────
  biscuits: [
    {
      id: "bi1", name: "Dark Fantasy Cookies", weight: "300 g", price: 120, originalPrice: 150,
      imageColor: "from-stone-200 to-white", tag: "Best Seller",
      brand: "Sunfeast", category: "Biscuits",
      description: "Indulgent chocolate-filled cookies with a crispy outer shell. A premium treat for every occasion.",
      details: ["Brand: Sunfeast (ITC)", "Type: Choco Fills", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "510 kcal" }, { label: "Carbs", value: "65g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "25g" }],
    },
    {
      id: "bi2", name: "Parle-G Original Biscuits", weight: "250 g", price: 20,
      imageColor: "from-yellow-100 to-yellow-50",
      brand: "Parle", category: "Biscuits",
      description: "India's most loved biscuit. Parle-G — the classic glucose biscuit with a mild sweet taste.",
      details: ["Brand: Parle Products", "Type: Glucose Biscuit", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "450 kcal" }, { label: "Carbs", value: "76g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "12g" }],
    },
    {
      id: "bi3", name: "Britannia Good Day Cashew", weight: "200 g", price: 45,
      imageColor: "from-amber-100 to-yellow-50",
      brand: "Britannia", category: "Biscuits",
      description: "Buttery cookies loaded with real cashew pieces. A rich, indulgent snack for any time of day.",
      details: ["Brand: Britannia", "Type: Cashew Cookies", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "490 kcal" }, { label: "Carbs", value: "65g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "22g" }],
    },
    {
      id: "bi4", name: "Oreo Original Cookies", weight: "120 g", price: 55, originalPrice: 65,
      imageColor: "from-gray-800 to-gray-600",
      brand: "Oreo", category: "Biscuits",
      description: "The world's favourite cookie — two crispy chocolate wafers with a sweet cream filling.",
      details: ["Brand: Oreo (Mondelez)", "Type: Sandwich Cookies", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "480 kcal" }, { label: "Carbs", value: "71g" }, { label: "Protein", value: "5g" }, { label: "Fat", value: "20g" }],
    },
  ],

  // ─── SNACKS: CHOCOLATES ──────────────────────────────────────────────────────
  chocolates: [
    {
      id: "co1", name: "Dairy Milk Silk", weight: "60 g", price: 99, originalPrice: 115,
      imageColor: "from-purple-200 to-purple-50", tag: "Best Seller",
      brand: "Cadbury", category: "Chocolates",
      description: "Cadbury Dairy Milk Silk — extra smooth, extra creamy milk chocolate that melts in your mouth.",
      details: ["Brand: Cadbury (Mondelez)", "Type: Milk Chocolate", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "540 kcal" }, { label: "Carbs", value: "58g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "31g" }],
    },
    {
      id: "co2", name: "KitKat 4 Finger", weight: "41.5 g", price: 50,
      imageColor: "from-red-200 to-red-50",
      brand: "Nestlé", category: "Chocolates",
      description: "KitKat — crispy wafer fingers covered in smooth milk chocolate. Have a break, have a KitKat.",
      details: ["Brand: Nestlé", "Type: Wafer Chocolate", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "518 kcal" }, { label: "Carbs", value: "63g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "26g" }],
    },
    {
      id: "co3", name: "Ferrero Rocher", weight: "3 pcs (37.5 g)", price: 120, originalPrice: 140,
      imageColor: "from-amber-200 to-yellow-50",
      brand: "Ferrero", category: "Chocolates",
      description: "Ferrero Rocher — a whole hazelnut in a creamy filling, covered in milk chocolate and crunchy wafer.",
      details: ["Brand: Ferrero", "Type: Praline Chocolate", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "566 kcal" }, { label: "Carbs", value: "47g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "39g" }],
    },
    {
      id: "co4", name: "Amul Dark Chocolate", weight: "150 g", price: 130,
      imageColor: "from-stone-300 to-stone-100",
      brand: "Amul", category: "Chocolates",
      description: "Amul 55% dark chocolate — rich, intense, and slightly bitter. Perfect for baking or gifting.",
      details: ["Brand: Amul (GCMMF)", "Type: Dark Chocolate 55%", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "550 kcal" }, { label: "Carbs", value: "50g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "36g" }],
    },
  ],

  // ─── BEVERAGES: TEA & COFFEE ─────────────────────────────────────────────────
  teaAndCoffee: [
    {
      id: "tc1", name: "Tata Tea Gold", weight: "500 g", price: 265, originalPrice: 295,
      imageColor: "from-amber-200 to-amber-50", tag: "Best Seller",
      brand: "Tata Tea", category: "Tea & Coffee",
      description: "Tata Tea Gold — a blend of long leaf and dust tea for a rich, full-bodied cup every morning.",
      details: ["Brand: Tata Consumer Products", "Type: Blended Tea", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "1 kcal" }, { label: "Carbs", value: "0.2g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "tc2", name: "Nescafé Classic Instant Coffee", weight: "100 g", price: 245, originalPrice: 275,
      imageColor: "from-stone-300 to-stone-100",
      brand: "Nescafé", category: "Tea & Coffee",
      description: "Nescafé Classic — 100% pure coffee with a rich aroma and bold taste. Ready in seconds.",
      details: ["Brand: Nescafé (Nestlé)", "Type: Instant Coffee", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "2 kcal" }, { label: "Carbs", value: "0.3g" }, { label: "Protein", value: "0.1g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "tc3", name: "Bru Gold Filter Coffee", weight: "200 g", price: 195,
      imageColor: "from-amber-300 to-amber-100",
      brand: "Bru", category: "Tea & Coffee",
      description: "Bru Gold — a premium blend of coffee and chicory for a strong, aromatic South Indian filter coffee.",
      details: ["Brand: Bru (HUL)", "Type: Filter Coffee Blend", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "2 kcal" }, { label: "Carbs", value: "0.3g" }, { label: "Protein", value: "0.1g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "tc4", name: "Tulsi Green Tea", weight: "25 bags", price: 120, originalPrice: 145,
      imageColor: "from-green-100 to-green-50",
      brand: "Organic India", category: "Tea & Coffee",
      description: "Organic India Tulsi Green Tea — a calming blend of holy basil and green tea. Rich in antioxidants.",
      details: ["Brand: Organic India", "Type: Green Tea", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "0 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
  ],

  // ─── BEVERAGES: JUICES ───────────────────────────────────────────────────────
  juices: [
    {
      id: "ju1", name: "Real Fruit Juice Mango", weight: "1 l", price: 120, originalPrice: 140,
      imageColor: "from-orange-200 to-yellow-50", tag: "Best Seller",
      brand: "Real", category: "Juices",
      description: "Real Fruit Power Mango — made from real Alphonso mangoes with no added preservatives.",
      details: ["Brand: Real (Dabur)", "Type: Fruit Juice", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "54 kcal" }, { label: "Carbs", value: "13g" }, { label: "Protein", value: "0.3g" }, { label: "Fat", value: "0.1g" }],
    },
    {
      id: "ju2", name: "Tropicana Orange Juice", weight: "1 l", price: 130, originalPrice: 150,
      imageColor: "from-orange-300 to-orange-100",
      brand: "Tropicana", category: "Juices",
      description: "Tropicana 100% orange juice — no added sugar, no preservatives. Pure orange goodness.",
      details: ["Brand: Tropicana (PepsiCo)", "Type: 100% Fruit Juice", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "45 kcal" }, { label: "Carbs", value: "10g" }, { label: "Protein", value: "0.7g" }, { label: "Fat", value: "0.2g" }],
    },
    {
      id: "ju3", name: "Paper Boat Aamras", weight: "200 ml", price: 30,
      imageColor: "from-yellow-200 to-orange-50",
      brand: "Paper Boat", category: "Juices",
      description: "Paper Boat Aamras — thick, pulpy mango drink inspired by the traditional Indian summer favourite.",
      details: ["Brand: Paper Boat (Hector Beverages)", "Type: Mango Drink", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "60 kcal" }, { label: "Carbs", value: "14g" }, { label: "Protein", value: "0.3g" }, { label: "Fat", value: "0.1g" }],
    },
    {
      id: "ju4", name: "B Natural Mixed Fruit Juice", weight: "1 l", price: 115,
      imageColor: "from-pink-200 to-orange-50",
      brand: "B Natural", category: "Juices",
      description: "B Natural Mixed Fruit — a blend of apple, grape, and pomegranate juices with no added colour.",
      details: ["Brand: B Natural (ITC)", "Type: Mixed Fruit Juice", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "50 kcal" }, { label: "Carbs", value: "12g" }, { label: "Protein", value: "0.2g" }, { label: "Fat", value: "0.1g" }],
    },
  ],

  // ─── BEVERAGES: SOFT DRINKS ──────────────────────────────────────────────────
  softDrinks: [
    {
      id: "sd1", name: "Coca-Cola", weight: "750 ml", price: 45,
      imageColor: "from-red-300 to-red-100", tag: "Best Seller",
      brand: "Coca-Cola", category: "Soft Drinks",
      description: "The world's most iconic cola. Coca-Cola — refreshing, fizzy, and perfect with any meal.",
      details: ["Brand: Coca-Cola India", "Type: Cola", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "42 kcal" }, { label: "Carbs", value: "10.6g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "sd2", name: "Sprite", weight: "750 ml", price: 45,
      imageColor: "from-green-200 to-lime-50",
      brand: "Sprite", category: "Soft Drinks",
      description: "Sprite — crisp, clean lemon-lime flavour with a refreshing fizz. The ultimate thirst quencher.",
      details: ["Brand: Sprite (Coca-Cola India)", "Type: Lemon-Lime Soda", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "39 kcal" }, { label: "Carbs", value: "9.8g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "sd3", name: "Thums Up", weight: "750 ml", price: 45,
      imageColor: "from-red-200 to-red-50",
      brand: "Thums Up", category: "Soft Drinks",
      description: "Thums Up — India's favourite strong cola with a bold, robust taste and extra fizz.",
      details: ["Brand: Thums Up (Coca-Cola India)", "Type: Cola", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "44 kcal" }, { label: "Carbs", value: "11g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "sd4", name: "Limca", weight: "750 ml", price: 45,
      imageColor: "from-lime-200 to-yellow-50",
      brand: "Limca", category: "Soft Drinks",
      description: "Limca — a refreshing lemon and lime flavoured drink with a tangy twist. Perfect for hot days.",
      details: ["Brand: Limca (Coca-Cola India)", "Type: Lemon Soda", "Shelf Life: 9 months"],
      nutrition: [{ label: "Energy", value: "38 kcal" }, { label: "Carbs", value: "9.5g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
  ],

  // ─── BEVERAGES: ENERGY DRINKS ────────────────────────────────────────────────
  energyDrinks: [
    {
      id: "ed1", name: "Red Bull Energy Drink", weight: "250 ml", price: 125, originalPrice: 140,
      imageColor: "from-blue-200 to-blue-50", tag: "Best Seller",
      brand: "Red Bull", category: "Energy Drinks",
      description: "Red Bull gives you wings. Formulated with caffeine, taurine, and B-vitamins for energy and focus.",
      details: ["Brand: Red Bull GmbH", "Type: Energy Drink", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "45 kcal" }, { label: "Carbs", value: "11g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "ed2", name: "Monster Energy Original", weight: "500 ml", price: 165, originalPrice: 185,
      imageColor: "from-green-300 to-green-100",
      brand: "Monster", category: "Energy Drinks",
      description: "Monster Energy — the original green can. Packed with caffeine, B-vitamins, and taurine.",
      details: ["Brand: Monster Beverage Corp", "Type: Energy Drink", "Shelf Life: 24 months"],
      nutrition: [{ label: "Energy", value: "46 kcal" }, { label: "Carbs", value: "11g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "ed3", name: "Sting Energy Drink", weight: "250 ml", price: 30,
      imageColor: "from-red-200 to-pink-50",
      brand: "Sting", category: "Energy Drinks",
      description: "Sting Energy — affordable energy drink with a sweet berry flavour. Popular across India.",
      details: ["Brand: Sting (PepsiCo)", "Type: Energy Drink", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "48 kcal" }, { label: "Carbs", value: "12g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
    {
      id: "ed4", name: "Charged by Thums Up", weight: "250 ml", price: 35,
      imageColor: "from-red-300 to-orange-100",
      brand: "Thums Up", category: "Energy Drinks",
      description: "Charged by Thums Up — India's own energy drink with a bold cola taste and extra caffeine kick.",
      details: ["Brand: Thums Up (Coca-Cola India)", "Type: Energy Drink", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "50 kcal" }, { label: "Carbs", value: "12.5g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "0g" }],
    },
  ],

  // ─── HOME CARE: DETERGENTS ───────────────────────────────────────────────────
  detergents: [
    {
      id: "det1", name: "Ariel Matic Front Load", weight: "1 kg", price: 299, originalPrice: 340,
      imageColor: "from-blue-200 to-blue-50", tag: "Best Seller",
      brand: "Ariel", category: "Detergents",
      description: "Ariel Matic Front Load detergent — specially formulated for front-load washing machines. Removes tough stains.",
      details: ["Brand: Ariel (P&G)", "Type: Washing Powder", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "1 kg" }, { label: "Form", value: "Powder" }, { label: "Fragrance", value: "Fresh" }, { label: "Suitable For", value: "Front Load" }],
    },
    {
      id: "det2", name: "Surf Excel Easy Wash", weight: "1 kg", price: 195, originalPrice: 220,
      imageColor: "from-sky-200 to-sky-50",
      brand: "Surf Excel", category: "Detergents",
      description: "Surf Excel Easy Wash — removes tough stains with less water. Ideal for hand washing.",
      details: ["Brand: Surf Excel (HUL)", "Type: Washing Powder", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "1 kg" }, { label: "Form", value: "Powder" }, { label: "Fragrance", value: "Fresh" }, { label: "Suitable For", value: "Hand Wash" }],
    },
    {
      id: "det3", name: "Vim Dishwash Bar", weight: "200 g", price: 30,
      imageColor: "from-yellow-200 to-yellow-50",
      brand: "Vim", category: "Detergents",
      description: "Vim Dishwash Bar with lemon — cuts through grease and leaves dishes sparkling clean.",
      details: ["Brand: Vim (HUL)", "Type: Dishwash Bar", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "200 g" }, { label: "Form", value: "Bar" }, { label: "Fragrance", value: "Lemon" }, { label: "Suitable For", value: "Utensils" }],
    },
    {
      id: "det4", name: "Pril Dishwash Liquid", weight: "500 ml", price: 115, originalPrice: 130,
      imageColor: "from-green-200 to-green-50",
      brand: "Pril", category: "Detergents",
      description: "Pril Dishwash Liquid — powerful grease-cutting formula with a refreshing lime fragrance.",
      details: ["Brand: Pril (Henkel)", "Type: Dishwash Liquid", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "500 ml" }, { label: "Form", value: "Liquid" }, { label: "Fragrance", value: "Lime" }, { label: "Suitable For", value: "Utensils" }],
    },
  ],

  // ─── HOME CARE: CLEANERS ─────────────────────────────────────────────────────
  cleaners: [
    {
      id: "cl1", name: "Colin Glass Cleaner", weight: "500 ml", price: 145, originalPrice: 165,
      imageColor: "from-blue-100 to-blue-50",
      brand: "Colin", category: "Cleaners",
      description: "Colin Glass Cleaner — streak-free formula for sparkling clean glass, mirrors, and surfaces.",
      details: ["Brand: Colin (Reckitt)", "Type: Glass Cleaner", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "500 ml" }, { label: "Form", value: "Spray" }, { label: "Fragrance", value: "Fresh" }, { label: "Suitable For", value: "Glass & Mirrors" }],
    },
    {
      id: "cl2", name: "Harpic Power Plus", weight: "500 ml", price: 130, originalPrice: 150,
      imageColor: "from-red-200 to-red-50", tag: "Best Seller",
      brand: "Harpic", category: "Cleaners",
      description: "Harpic Power Plus — kills 99.9% germs and removes tough stains from toilet bowls.",
      details: ["Brand: Harpic (Reckitt)", "Type: Toilet Cleaner", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "500 ml" }, { label: "Form", value: "Liquid" }, { label: "Fragrance", value: "Citrus" }, { label: "Suitable For", value: "Toilet Bowl" }],
    },
    {
      id: "cl3", name: "Lizol Floor Cleaner", weight: "975 ml", price: 195, originalPrice: 220,
      imageColor: "from-purple-100 to-purple-50",
      brand: "Lizol", category: "Cleaners",
      description: "Lizol Disinfectant Floor Cleaner — kills 99.9% germs and leaves floors clean and fragrant.",
      details: ["Brand: Lizol (Reckitt)", "Type: Floor Cleaner", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "975 ml" }, { label: "Form", value: "Liquid" }, { label: "Fragrance", value: "Lavender" }, { label: "Suitable For", value: "All Floors" }],
    },
    {
      id: "cl4", name: "Domex Toilet Cleaner", weight: "500 ml", price: 95,
      imageColor: "from-cyan-100 to-cyan-50",
      brand: "Domex", category: "Cleaners",
      description: "Domex Ultra Thick Bleach — kills all known germs dead. Powerful formula for deep toilet cleaning.",
      details: ["Brand: Domex (HUL)", "Type: Toilet Cleaner", "Shelf Life: 24 months"],
      nutrition: [{ label: "Net Weight", value: "500 ml" }, { label: "Form", value: "Thick Liquid" }, { label: "Fragrance", value: "Fresh" }, { label: "Suitable For", value: "Toilet Bowl" }],
    },
  ],

  // ─── HOME CARE: TISSUES ──────────────────────────────────────────────────────
  tissues: [
    {
      id: "ti1", name: "Kleenex Facial Tissues", weight: "100 pulls", price: 99, originalPrice: 120,
      imageColor: "from-blue-50 to-white", tag: "Best Seller",
      brand: "Kleenex", category: "Tissues",
      description: "Kleenex Facial Tissues — soft, strong, and gentle on skin. Perfect for everyday use.",
      details: ["Brand: Kleenex (Kimberly-Clark)", "Type: Facial Tissue", "Shelf Life: 36 months"],
      nutrition: [{ label: "Sheets", value: "100" }, { label: "Ply", value: "2-ply" }, { label: "Size", value: "21×21 cm" }, { label: "Material", value: "Virgin Pulp" }],
    },
    {
      id: "ti2", name: "Scotts Toilet Roll", weight: "6 rolls", price: 180, originalPrice: 210,
      imageColor: "from-gray-50 to-white",
      brand: "Scotts", category: "Tissues",
      description: "Scotts 2-ply toilet rolls — strong, absorbent, and gentle. Pack of 6 for the whole family.",
      details: ["Brand: Scotts (Kimberly-Clark)", "Type: Toilet Roll", "Shelf Life: 36 months"],
      nutrition: [{ label: "Rolls", value: "6" }, { label: "Ply", value: "2-ply" }, { label: "Sheets/Roll", value: "200" }, { label: "Material", value: "Virgin Pulp" }],
    },
    {
      id: "ti3", name: "Bounty Kitchen Towels", weight: "2 rolls", price: 150,
      imageColor: "from-yellow-50 to-white",
      brand: "Bounty", category: "Tissues",
      description: "Bounty Kitchen Towels — super absorbent paper towels for kitchen spills and cleaning.",
      details: ["Brand: Bounty (P&G)", "Type: Kitchen Towel", "Shelf Life: 36 months"],
      nutrition: [{ label: "Rolls", value: "2" }, { label: "Ply", value: "2-ply" }, { label: "Sheets/Roll", value: "60" }, { label: "Material", value: "Virgin Pulp" }],
    },
    {
      id: "ti4", name: "Wet Wipes Baby Fresh", weight: "80 wipes", price: 120, originalPrice: 140,
      imageColor: "from-sky-50 to-white",
      brand: "Pampers", category: "Tissues",
      description: "Pampers Baby Fresh Wipes — gentle, alcohol-free wipes for baby's delicate skin. Also great for adults.",
      details: ["Brand: Pampers (P&G)", "Type: Wet Wipes", "Shelf Life: 24 months"],
      nutrition: [{ label: "Count", value: "80 wipes" }, { label: "Alcohol", value: "Free" }, { label: "Fragrance", value: "Baby Fresh" }, { label: "Material", value: "Non-woven" }],
    },
  ],

  // ─── HOME CARE: REPELLENTS ───────────────────────────────────────────────────
  repellents: [
    {
      id: "re1", name: "Good Knight Activ+ Liquid", weight: "45 ml", price: 75, originalPrice: 90,
      imageColor: "from-green-200 to-green-50", tag: "Best Seller",
      brand: "Good Knight", category: "Repellents",
      description: "Good Knight Activ+ Liquid Mosquito Repellent — 2x more protection with a pleasant fragrance.",
      details: ["Brand: Good Knight (Godrej)", "Type: Liquid Vaporiser", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "45 ml" }, { label: "Coverage", value: "~45 nights" }, { label: "Active", value: "Transfluthrin" }, { label: "Safe For", value: "Family use" }],
    },
    {
      id: "re2", name: "All Out Ultra Liquid", weight: "45 ml", price: 70,
      imageColor: "from-blue-200 to-blue-50",
      brand: "All Out", category: "Repellents",
      description: "All Out Ultra — powerful mosquito repellent liquid that provides all-night protection.",
      details: ["Brand: All Out (SC Johnson)", "Type: Liquid Vaporiser", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "45 ml" }, { label: "Coverage", value: "~45 nights" }, { label: "Active", value: "Prallethrin" }, { label: "Safe For", value: "Family use" }],
    },
    {
      id: "re3", name: "Odomos Mosquito Repellent Cream", weight: "50 g", price: 65,
      imageColor: "from-yellow-100 to-yellow-50",
      brand: "Odomos", category: "Repellents",
      description: "Odomos Naturals Mosquito Repellent Cream — DEET-free formula with natural ingredients. Safe for kids.",
      details: ["Brand: Odomos (Dabur)", "Type: Repellent Cream", "Shelf Life: 24 months"],
      nutrition: [{ label: "Weight", value: "50 g" }, { label: "DEET", value: "Free" }, { label: "Active", value: "Citronella" }, { label: "Safe For", value: "Children 2+" }],
    },
    {
      id: "re4", name: "HIT Cockroach Killer Spray", weight: "200 ml", price: 130, originalPrice: 150,
      imageColor: "from-red-100 to-orange-50",
      brand: "HIT", category: "Repellents",
      description: "HIT Cockroach Killer Spray — kills cockroaches on contact and provides residual protection.",
      details: ["Brand: HIT (Godrej)", "Type: Insecticide Spray", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "200 ml" }, { label: "Target", value: "Cockroaches" }, { label: "Active", value: "Cypermethrin" }, { label: "Use", value: "Indoor" }],
    },
  ],

  // ─── PERSONAL CARE: BATH ─────────────────────────────────────────────────────
  bath: [
    {
      id: "ba1", name: "Dove Beauty Bar", weight: "100 g", price: 55, originalPrice: 65,
      imageColor: "from-sky-50 to-white", tag: "Best Seller",
      brand: "Dove", category: "Bath",
      description: "Dove Beauty Bar — with 1/4 moisturising cream, it leaves skin soft and smooth after every wash.",
      details: ["Brand: Dove (HUL)", "Type: Beauty Bar", "Shelf Life: 36 months"],
      nutrition: [{ label: "Weight", value: "100 g" }, { label: "Skin Type", value: "All" }, { label: "Fragrance", value: "Mild" }, { label: "pH", value: "Neutral" }],
    },
    {
      id: "ba2", name: "Dettol Original Soap", weight: "125 g", price: 45,
      imageColor: "from-green-100 to-green-50",
      brand: "Dettol", category: "Bath",
      description: "Dettol Original Soap — provides 10x better germ protection. Trusted by Indian families for decades.",
      details: ["Brand: Dettol (Reckitt)", "Type: Antibacterial Soap", "Shelf Life: 36 months"],
      nutrition: [{ label: "Weight", value: "125 g" }, { label: "Skin Type", value: "All" }, { label: "Fragrance", value: "Pine" }, { label: "Germ Protection", value: "99.9%" }],
    },
    {
      id: "ba3", name: "Fiama Shower Gel", weight: "250 ml", price: 195, originalPrice: 225,
      imageColor: "from-purple-100 to-pink-50",
      brand: "Fiama", category: "Bath",
      description: "Fiama Shower Gel with skin conditioners — leaves skin feeling refreshed, moisturised, and fragrant.",
      details: ["Brand: Fiama (ITC)", "Type: Shower Gel", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "250 ml" }, { label: "Skin Type", value: "Normal to Dry" }, { label: "Fragrance", value: "Floral" }, { label: "pH", value: "Balanced" }],
    },
    {
      id: "ba4", name: "Himalaya Neem Face Wash", weight: "150 ml", price: 130, originalPrice: 150,
      imageColor: "from-lime-100 to-green-50",
      brand: "Himalaya", category: "Bath",
      description: "Himalaya Purifying Neem Face Wash — removes excess oil and prevents pimples with neem and turmeric.",
      details: ["Brand: Himalaya Wellness", "Type: Face Wash", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "150 ml" }, { label: "Skin Type", value: "Oily to Normal" }, { label: "Key Ingredient", value: "Neem" }, { label: "Paraben Free", value: "Yes" }],
    },
  ],

  // ─── PERSONAL CARE: HAIR ─────────────────────────────────────────────────────
  hair: [
    {
      id: "ha1", name: "Head & Shoulders Anti-Dandruff Shampoo", weight: "340 ml", price: 299, originalPrice: 340,
      imageColor: "from-blue-200 to-blue-50", tag: "Best Seller",
      brand: "Head & Shoulders", category: "Hair",
      description: "Head & Shoulders Cool Menthol — clinically proven to fight dandruff and leave hair fresh and clean.",
      details: ["Brand: Head & Shoulders (P&G)", "Type: Anti-Dandruff Shampoo", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "340 ml" }, { label: "Hair Type", value: "All" }, { label: "Key Ingredient", value: "Zinc Pyrithione" }, { label: "Fragrance", value: "Cool Menthol" }],
    },
    {
      id: "ha2", name: "Dove Intense Repair Conditioner", weight: "180 ml", price: 195,
      imageColor: "from-sky-100 to-sky-50",
      brand: "Dove", category: "Hair",
      description: "Dove Intense Repair Conditioner — with Keratin Actives, it repairs damaged hair from within.",
      details: ["Brand: Dove (HUL)", "Type: Conditioner", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "180 ml" }, { label: "Hair Type", value: "Damaged" }, { label: "Key Ingredient", value: "Keratin" }, { label: "Fragrance", value: "Fresh" }],
    },
    {
      id: "ha3", name: "Parachute Coconut Oil", weight: "500 ml", price: 195, originalPrice: 220,
      imageColor: "from-amber-50 to-white",
      brand: "Parachute", category: "Hair",
      description: "Parachute 100% Pure Coconut Oil — nourishes hair from root to tip. India's most trusted hair oil.",
      details: ["Brand: Parachute (Marico)", "Type: Hair Oil", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "500 ml" }, { label: "Hair Type", value: "All" }, { label: "Key Ingredient", value: "Coconut Oil" }, { label: "Purity", value: "100%" }],
    },
    {
      id: "ha4", name: "Indulekha Bringha Hair Oil", weight: "100 ml", price: 295, originalPrice: 330,
      imageColor: "from-green-200 to-green-50",
      brand: "Indulekha", category: "Hair",
      description: "Indulekha Bringha Oil — Ayurvedic hair oil with bringharaj and coconut oil to reduce hair fall.",
      details: ["Brand: Indulekha (HUL)", "Type: Ayurvedic Hair Oil", "Shelf Life: 24 months"],
      nutrition: [{ label: "Volume", value: "100 ml" }, { label: "Hair Type", value: "All" }, { label: "Key Ingredient", value: "Bringharaj" }, { label: "Paraben Free", value: "Yes" }],
    },
  ],

  // ─── PERSONAL CARE: SKIN ─────────────────────────────────────────────────────
  skin: [
    {
      id: "sk1", name: "Nivea Soft Moisturising Cream", weight: "200 ml", price: 225, originalPrice: 260,
      imageColor: "from-blue-100 to-blue-50", tag: "Best Seller",
      brand: "Nivea", category: "Skin",
      description: "Nivea Soft — lightweight moisturising cream with Vitamin E and Jojoba Oil. Absorbs instantly.",
      details: ["Brand: Nivea (Beiersdorf)", "Type: Moisturiser", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "200 ml" }, { label: "Skin Type", value: "All" }, { label: "Key Ingredient", value: "Vitamin E" }, { label: "SPF", value: "None" }],
    },
    {
      id: "sk2", name: "Lakme Sun Expert SPF 50", weight: "100 ml", price: 299, originalPrice: 340,
      imageColor: "from-orange-100 to-yellow-50",
      brand: "Lakmé", category: "Skin",
      description: "Lakmé Sun Expert SPF 50 PA+++ — broad spectrum sunscreen that protects against UVA and UVB rays.",
      details: ["Brand: Lakmé (HUL)", "Type: Sunscreen", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "100 ml" }, { label: "SPF", value: "50 PA+++" }, { label: "Skin Type", value: "All" }, { label: "Water Resistant", value: "Yes" }],
    },
    {
      id: "sk3", name: "Himalaya Aloe Vera Gel", weight: "200 ml", price: 130,
      imageColor: "from-green-100 to-green-50",
      brand: "Himalaya", category: "Skin",
      description: "Himalaya Aloe Vera Gel — pure aloe vera gel that soothes, hydrates, and cools the skin.",
      details: ["Brand: Himalaya Wellness", "Type: Gel Moisturiser", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "200 ml" }, { label: "Skin Type", value: "All" }, { label: "Key Ingredient", value: "Aloe Vera" }, { label: "Paraben Free", value: "Yes" }],
    },
    {
      id: "sk4", name: "Vaseline Intensive Care Lotion", weight: "400 ml", price: 265, originalPrice: 295,
      imageColor: "from-sky-50 to-white",
      brand: "Vaseline", category: "Skin",
      description: "Vaseline Intensive Care Deep Restore — with micro-droplets of Vaseline jelly for 24-hour moisture.",
      details: ["Brand: Vaseline (HUL)", "Type: Body Lotion", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "400 ml" }, { label: "Skin Type", value: "Dry to Very Dry" }, { label: "Key Ingredient", value: "Petroleum Jelly" }, { label: "Fragrance", value: "Light" }],
    },
  ],

  // ─── PERSONAL CARE: ORAL CARE ────────────────────────────────────────────────
  oralCare: [
    {
      id: "oc1", name: "Colgate Strong Teeth Toothpaste", weight: "300 g", price: 115, originalPrice: 135,
      imageColor: "from-red-100 to-red-50", tag: "Best Seller",
      brand: "Colgate", category: "Oral Care",
      description: "Colgate Strong Teeth — with Amino Shakti for stronger teeth and cavity protection.",
      details: ["Brand: Colgate-Palmolive", "Type: Toothpaste", "Shelf Life: 36 months"],
      nutrition: [{ label: "Weight", value: "300 g" }, { label: "Fluoride", value: "Yes" }, { label: "Flavour", value: "Mint" }, { label: "Whitening", value: "Yes" }],
    },
    {
      id: "oc2", name: "Oral-B Pro-Expert Toothbrush", weight: "1 pc", price: 99, originalPrice: 120,
      imageColor: "from-blue-200 to-blue-50",
      brand: "Oral-B", category: "Oral Care",
      description: "Oral-B Pro-Expert Toothbrush — cross-action bristles reach between teeth for a superior clean.",
      details: ["Brand: Oral-B (P&G)", "Type: Manual Toothbrush", "Shelf Life: 36 months"],
      nutrition: [{ label: "Bristles", value: "Soft" }, { label: "Head Size", value: "Medium" }, { label: "Handle", value: "Ergonomic" }, { label: "Replace Every", value: "3 months" }],
    },
    {
      id: "oc3", name: "Listerine Cool Mint Mouthwash", weight: "500 ml", price: 245, originalPrice: 280,
      imageColor: "from-teal-100 to-teal-50",
      brand: "Listerine", category: "Oral Care",
      description: "Listerine Cool Mint — kills 99.9% of germs that cause bad breath, plaque, and gum disease.",
      details: ["Brand: Listerine (J&J)", "Type: Mouthwash", "Shelf Life: 36 months"],
      nutrition: [{ label: "Volume", value: "500 ml" }, { label: "Alcohol", value: "Yes" }, { label: "Flavour", value: "Cool Mint" }, { label: "Germ Kill", value: "99.9%" }],
    },
    {
      id: "oc4", name: "Sensodyne Rapid Relief", weight: "70 g", price: 175, originalPrice: 200,
      imageColor: "from-blue-50 to-white",
      brand: "Sensodyne", category: "Oral Care",
      description: "Sensodyne Rapid Relief — provides fast relief from tooth sensitivity in just 60 seconds.",
      details: ["Brand: Sensodyne (Haleon)", "Type: Sensitivity Toothpaste", "Shelf Life: 36 months"],
      nutrition: [{ label: "Weight", value: "70 g" }, { label: "Fluoride", value: "Yes" }, { label: "Flavour", value: "Mint" }, { label: "For", value: "Sensitive Teeth" }],
    },
  ],

  // ─── BABY & PET: DIAPERS ─────────────────────────────────────────────────────
  diapers: [
    {
      id: "di1", name: "Pampers Active Baby Diapers", weight: "Size M (7–12 kg), 64 pcs", price: 999, originalPrice: 1199,
      imageColor: "from-sky-100 to-sky-50", tag: "Best Seller",
      brand: "Pampers", category: "Diapers",
      description: "Pampers Active Baby Diapers — with 3 layers of protection for up to 12 hours of dryness.",
      details: ["Brand: Pampers (P&G)", "Size: Medium (7–12 kg)", "Shelf Life: 36 months"],
      nutrition: [{ label: "Count", value: "64 pcs" }, { label: "Size", value: "Medium" }, { label: "Weight Range", value: "7–12 kg" }, { label: "Wetness Indicator", value: "Yes" }],
    },
    {
      id: "di2", name: "Huggies Wonder Pants", weight: "Size L (9–14 kg), 42 pcs", price: 849, originalPrice: 999,
      imageColor: "from-blue-100 to-blue-50",
      brand: "Huggies", category: "Diapers",
      description: "Huggies Wonder Pants — easy pull-up style with a stretchy waistband for active babies.",
      details: ["Brand: Huggies (Kimberly-Clark)", "Size: Large (9–14 kg)", "Shelf Life: 36 months"],
      nutrition: [{ label: "Count", value: "42 pcs" }, { label: "Size", value: "Large" }, { label: "Weight Range", value: "9–14 kg" }, { label: "Style", value: "Pull-up Pants" }],
    },
    {
      id: "di3", name: "MamyPoko Pants Extra Absorb", weight: "Size M (7–12 kg), 54 pcs", price: 749, originalPrice: 899,
      imageColor: "from-pink-100 to-pink-50",
      brand: "MamyPoko", category: "Diapers",
      description: "MamyPoko Pants Extra Absorb — Japanese technology for superior absorption and leak protection.",
      details: ["Brand: MamyPoko (Unicharm)", "Size: Medium (7–12 kg)", "Shelf Life: 36 months"],
      nutrition: [{ label: "Count", value: "54 pcs" }, { label: "Size", value: "Medium" }, { label: "Weight Range", value: "7–12 kg" }, { label: "Absorption", value: "Extra" }],
    },
    {
      id: "di4", name: "Himalaya Total Care Baby Pants", weight: "Size S (4–8 kg), 24 pcs", price: 399, originalPrice: 450,
      imageColor: "from-lime-100 to-lime-50",
      brand: "Himalaya", category: "Diapers",
      description: "Himalaya Total Care Baby Pants — with aloe vera and jojoba for gentle care on baby's skin.",
      details: ["Brand: Himalaya Wellness", "Size: Small (4–8 kg)", "Shelf Life: 36 months"],
      nutrition: [{ label: "Count", value: "24 pcs" }, { label: "Size", value: "Small" }, { label: "Weight Range", value: "4–8 kg" }, { label: "Skin Care", value: "Aloe Vera" }],
    },
  ],

  // ─── BABY & PET: BABY FOOD ───────────────────────────────────────────────────
  babyFood: [
    {
      id: "bf1", name: "Nestlé Cerelac Wheat", weight: "300 g", price: 245, originalPrice: 275,
      imageColor: "from-yellow-100 to-yellow-50", tag: "Best Seller",
      brand: "Nestlé", category: "Baby Food",
      description: "Nestlé Cerelac Wheat — fortified baby cereal with iron and 18 nutrients for babies 6 months+.",
      details: ["Brand: Nestlé", "Stage: 6 months+", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "400 kcal" }, { label: "Protein", value: "11g" }, { label: "Iron", value: "8mg" }, { label: "Calcium", value: "500mg" }],
    },
    {
      id: "bf2", name: "Farex Rice Cereal", weight: "300 g", price: 195,
      imageColor: "from-orange-50 to-white",
      brand: "Farex", category: "Baby Food",
      description: "Farex Rice Cereal — easy-to-digest rice-based cereal for babies starting solids at 4 months+.",
      details: ["Brand: Farex (Heinz)", "Stage: 4 months+", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "380 kcal" }, { label: "Protein", value: "9g" }, { label: "Iron", value: "7mg" }, { label: "Calcium", value: "450mg" }],
    },
    {
      id: "bf3", name: "Mamy Poko Baby Wipes", weight: "80 wipes", price: 199, originalPrice: 230,
      imageColor: "from-pink-50 to-white",
      brand: "MamyPoko", category: "Baby Food",
      description: "MamyPoko Baby Wipes — gentle, fragrance-free wipes for baby's sensitive skin. Alcohol-free.",
      details: ["Brand: MamyPoko (Unicharm)", "Type: Baby Wipes", "Shelf Life: 24 months"],
      nutrition: [{ label: "Count", value: "80 wipes" }, { label: "Alcohol", value: "Free" }, { label: "Fragrance", value: "Free" }, { label: "pH", value: "Balanced" }],
    },
    {
      id: "bf4", name: "Himalaya Baby Powder", weight: "400 g", price: 175, originalPrice: 200,
      imageColor: "from-sky-50 to-white",
      brand: "Himalaya", category: "Baby Food",
      description: "Himalaya Baby Powder — with khus khus and aloe vera to keep baby's skin dry and rash-free.",
      details: ["Brand: Himalaya Wellness", "Type: Baby Powder", "Shelf Life: 36 months"],
      nutrition: [{ label: "Weight", value: "400 g" }, { label: "Talc Free", value: "No" }, { label: "Key Ingredient", value: "Aloe Vera" }, { label: "Safe For", value: "Newborns" }],
    },
  ],

  // ─── BABY & PET: PET FOOD ────────────────────────────────────────────────────
  petFood: [
    {
      id: "pf1", name: "Pedigree Adult Dog Food", weight: "3 kg", price: 699, originalPrice: 799,
      imageColor: "from-amber-200 to-amber-50", tag: "Best Seller",
      brand: "Pedigree", category: "Pet Food",
      description: "Pedigree Adult Dog Food with chicken and vegetables. Complete nutrition for adult dogs.",
      details: ["Brand: Pedigree (Mars)", "For: Adult Dogs", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "21%" }, { label: "Fat", value: "10%" }, { label: "Fibre", value: "4%" }, { label: "Moisture", value: "12%" }],
    },
    {
      id: "pf2", name: "Whiskas Adult Cat Food", weight: "1.2 kg", price: 499, originalPrice: 580,
      imageColor: "from-purple-100 to-purple-50",
      brand: "Whiskas", category: "Pet Food",
      description: "Whiskas Adult Cat Food with ocean fish — complete and balanced nutrition for adult cats.",
      details: ["Brand: Whiskas (Mars)", "For: Adult Cats", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "30%" }, { label: "Fat", value: "12%" }, { label: "Fibre", value: "3%" }, { label: "Moisture", value: "10%" }],
    },
    {
      id: "pf3", name: "Royal Canin Medium Adult", weight: "3 kg", price: 1299, originalPrice: 1450,
      imageColor: "from-red-100 to-red-50",
      brand: "Royal Canin", category: "Pet Food",
      description: "Royal Canin Medium Adult — tailored nutrition for medium breed dogs (11–25 kg). Supports digestion.",
      details: ["Brand: Royal Canin", "For: Medium Breed Dogs", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "25%" }, { label: "Fat", value: "14%" }, { label: "Fibre", value: "2.5%" }, { label: "Moisture", value: "10%" }],
    },
    {
      id: "pf4", name: "Drools Focus Puppy Food", weight: "3 kg", price: 649, originalPrice: 750,
      imageColor: "from-orange-100 to-orange-50",
      brand: "Drools", category: "Pet Food",
      description: "Drools Focus Puppy Super Premium — with DHA for brain development and calcium for strong bones.",
      details: ["Brand: Drools", "For: Puppies", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "28%" }, { label: "Fat", value: "12%" }, { label: "Fibre", value: "3%" }, { label: "Moisture", value: "10%" }],
    },
  ],

  // ─── BABY & PET: PET TREATS ──────────────────────────────────────────────────
  petTreats: [
    {
      id: "pt1", name: "Pedigree Dentastix", weight: "7 sticks", price: 199, originalPrice: 230,
      imageColor: "from-green-200 to-green-50", tag: "Best Seller",
      brand: "Pedigree", category: "Pet Treats",
      description: "Pedigree Dentastix — clinically proven to reduce tartar build-up by up to 80%. Daily dental treat.",
      details: ["Brand: Pedigree (Mars)", "For: Adult Dogs", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "8%" }, { label: "Fat", value: "3%" }, { label: "Fibre", value: "2%" }, { label: "Moisture", value: "14%" }],
    },
    {
      id: "pt2", name: "Temptations Cat Treats", weight: "85 g", price: 199, originalPrice: 230,
      imageColor: "from-orange-200 to-orange-50",
      brand: "Temptations", category: "Pet Treats",
      description: "Temptations Cat Treats — crunchy on the outside, soft on the inside. Cats go crazy for these.",
      details: ["Brand: Temptations (Mars)", "For: Adult Cats", "Shelf Life: 18 months"],
      nutrition: [{ label: "Protein", value: "30%" }, { label: "Fat", value: "10%" }, { label: "Fibre", value: "3%" }, { label: "Moisture", value: "12%" }],
    },
    {
      id: "pt3", name: "Drools Absolute Biscuits", weight: "500 g", price: 249, originalPrice: 299,
      imageColor: "from-amber-100 to-amber-50",
      brand: "Drools", category: "Pet Treats",
      description: "Drools Absolute Biscuits — crunchy dog biscuits with milk and vegetables. Great for training.",
      details: ["Brand: Drools", "For: All Dogs", "Shelf Life: 12 months"],
      nutrition: [{ label: "Protein", value: "12%" }, { label: "Fat", value: "5%" }, { label: "Fibre", value: "4%" }, { label: "Moisture", value: "10%" }],
    },
    {
      id: "pt4", name: "Himalaya Healthy Treats", weight: "200 g", price: 149,
      imageColor: "from-lime-100 to-lime-50",
      brand: "Himalaya", category: "Pet Treats",
      description: "Himalaya Healthy Treats for dogs — made with real chicken and vegetables. No artificial colours.",
      details: ["Brand: Himalaya Wellness", "For: All Dogs", "Shelf Life: 12 months"],
      nutrition: [{ label: "Protein", value: "15%" }, { label: "Fat", value: "6%" }, { label: "Fibre", value: "3%" }, { label: "Moisture", value: "10%" }],
    },
  ],

  // ─── BACKWARD COMPAT: STAPLES (atta + rice + dal + oilAndGhee combined) ──────
  staples: [
    {
      id: "s1", name: "Fortune Chakki Atta", weight: "5 kg", price: 245, originalPrice: 275,
      imageColor: "from-orange-100 to-white", tag: "Best Seller",
      brand: "Fortune", category: "Atta",
      description: "Made from 100% whole wheat, Fortune Chakki Atta gives soft rotis with a natural golden colour.",
      details: ["Brand: Fortune (Adani Wilmar)", "Type: Whole Wheat", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "341 kcal" }, { label: "Carbs", value: "70g" }, { label: "Protein", value: "12g" }, { label: "Fat", value: "1.7g" }],
    },
    {
      id: "s2", name: "India Gate Basmati Rice", weight: "1 kg", price: 145, originalPrice: 180,
      imageColor: "from-blue-50 to-white",
      brand: "India Gate", category: "Rice",
      description: "Premium aged Basmati rice with long grains and a delicate aroma. Perfect for biryani and pulao.",
      details: ["Brand: India Gate (KRBL)", "Type: Basmati", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "349 kcal" }, { label: "Carbs", value: "78g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "0.5g" }],
    },
    {
      id: "s3", name: "Toor Dal Premium", weight: "1 kg", price: 168,
      imageColor: "from-yellow-200 to-yellow-50",
      brand: "Savega Select", category: "Dal",
      description: "Premium quality toor dal (split pigeon peas) with no added colour or preservatives.",
      details: ["Brand: Savega Select", "Type: Toor Dal", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "343 kcal" }, { label: "Carbs", value: "62g" }, { label: "Protein", value: "22g" }, { label: "Fat", value: "1.5g" }],
    },
    {
      id: "s4", name: "Cold Pressed Groundnut Oil", weight: "1 l", price: 235, originalPrice: 275,
      imageColor: "from-amber-100 to-white",
      brand: "Savega Select", category: "Oil & Ghee",
      description: "Cold pressed groundnut oil retains natural nutrients and has a rich, nutty flavour ideal for Indian cooking.",
      details: ["Brand: Savega Select", "Type: Cold Pressed", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "884 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0g" }, { label: "Fat", value: "100g" }],
    },
  ],

  // ─── BACKWARD COMPAT: SNACKS (chips + namkeen + biscuits + chocolates) ────────
  snacks: [
    {
      id: "sn1", name: "Too Yumm Multigrain Chips", weight: "82 g", price: 40,
      imageColor: "from-orange-100 to-white",
      brand: "Too Yumm", category: "Chips",
      description: "Baked not fried! Too Yumm multigrain chips with 50% less fat than regular chips.",
      details: ["Brand: Too Yumm (RP-SG)", "Flavour: Masala", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "430 kcal" }, { label: "Carbs", value: "68g" }, { label: "Protein", value: "8g" }, { label: "Fat", value: "14g" }],
    },
    {
      id: "sn2", name: "Haldiram Bhujia", weight: "200 g", price: 68,
      imageColor: "from-yellow-100 to-white", tag: "Best Seller",
      brand: "Haldiram's", category: "Namkeen",
      description: "The iconic Haldiram Bhujia — crispy, spicy, and made with the finest besan. A timeless Indian snack.",
      details: ["Brand: Haldiram's", "Type: Namkeen", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "536 kcal" }, { label: "Carbs", value: "52g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "28g" }],
    },
    {
      id: "sn3", name: "Dark Fantasy Cookies", weight: "300 g", price: 120, originalPrice: 150,
      imageColor: "from-stone-200 to-white",
      brand: "Sunfeast", category: "Biscuits",
      description: "Indulgent chocolate-filled cookies with a crispy outer shell. A premium treat for every occasion.",
      details: ["Brand: Sunfeast (ITC)", "Type: Choco Fills", "Shelf Life: 6 months"],
      nutrition: [{ label: "Energy", value: "510 kcal" }, { label: "Carbs", value: "65g" }, { label: "Protein", value: "6g" }, { label: "Fat", value: "25g" }],
    },
    {
      id: "sn4", name: "Dairy Milk Silk", weight: "60 g", price: 99, originalPrice: 115,
      imageColor: "from-purple-200 to-purple-50",
      brand: "Cadbury", category: "Chocolates",
      description: "Cadbury Dairy Milk Silk — extra smooth, extra creamy milk chocolate that melts in your mouth.",
      details: ["Brand: Cadbury (Mondelez)", "Type: Milk Chocolate", "Shelf Life: 12 months"],
      nutrition: [{ label: "Energy", value: "540 kcal" }, { label: "Carbs", value: "58g" }, { label: "Protein", value: "7g" }, { label: "Fat", value: "31g" }],
    },
  ],

  // ─── BACKWARD COMPAT: DAIRY (milk + curd + paneer + butterAndCheese) ─────────
  dairy: [
    {
      id: "da1", name: "Amul Taaza Milk", weight: "500 ml", price: 27,
      imageColor: "from-blue-100 to-blue-50", tag: "Fresh",
      brand: "Amul", category: "Milk",
      description: "Amul Taaza is homogenised toned milk with 3% fat and 8.5% SNF. Fresh and pasteurised daily.",
      details: ["Brand: Amul (GCMMF)", "Type: Toned Milk", "Shelf Life: 2 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "58 kcal" }, { label: "Carbs", value: "4.9g" }, { label: "Protein", value: "3.2g" }, { label: "Fat", value: "3g" }],
    },
    {
      id: "da2", name: "Amul Butter", weight: "100 g", price: 58,
      imageColor: "from-yellow-200 to-yellow-100",
      brand: "Amul", category: "Butter & Cheese",
      description: "Amul Pasteurised Butter — made from fresh cream with a rich, creamy taste. India's most loved butter.",
      details: ["Brand: Amul (GCMMF)", "Type: Salted Butter", "Shelf Life: 30 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "720 kcal" }, { label: "Carbs", value: "0g" }, { label: "Protein", value: "0.5g" }, { label: "Fat", value: "81g" }],
    },
    {
      id: "da3", name: "Mother Dairy Curd", weight: "400 g", price: 35,
      imageColor: "from-blue-50 to-white",
      brand: "Mother Dairy", category: "Curd",
      description: "Thick and creamy set curd made from fresh toned milk. No preservatives, no additives.",
      details: ["Brand: Mother Dairy", "Type: Set Curd", "Shelf Life: 7 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "62 kcal" }, { label: "Carbs", value: "4.7g" }, { label: "Protein", value: "3.1g" }, { label: "Fat", value: "3.1g" }],
    },
    {
      id: "da4", name: "Fresh Paneer", weight: "200 g", price: 95, originalPrice: 110,
      imageColor: "from-gray-50 to-white", tag: "Fresh",
      brand: "Savega Fresh", category: "Paneer",
      description: "Soft and fresh paneer made daily from full-fat cow milk. Perfect for curries, tikkas, and salads.",
      details: ["Brand: Savega Fresh", "Type: Full Fat Paneer", "Shelf Life: 3 days (refrigerated)"],
      nutrition: [{ label: "Energy", value: "265 kcal" }, { label: "Carbs", value: "1.2g" }, { label: "Protein", value: "18g" }, { label: "Fat", value: "21g" }],
    },
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

export interface RestaurantDish {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  isVeg: boolean;
  tag?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  eta: string;
  image: string;
  cuisine: string;
  distance: string;
  offer: string;
  popular: string[];
  menu: RestaurantDish[];
}

export const restaurants: Restaurant[] = [
  {
    id: "res1",
    name: "Biryani Blues",
    rating: 4.5,
    eta: "25 mins",
    image: "from-orange-400 to-red-500",
    cuisine: "Hyderabadi Biryani",
    distance: "1.8 km",
    offer: "50% off up to ₹100",
    popular: ["Chicken Dum Biryani", "Egg Biryani"],
    menu: [
      {
        id: "bb1", name: "Chicken Dum Biryani", price: 299, originalPrice: 349,
        description: "Slow-cooked Hyderabadi dum biryani with tender chicken, saffron, and caramelised onions.",
        isVeg: false, tag: "Bestseller",
      },
      {
        id: "bb2", name: "Mutton Biryani", price: 379, originalPrice: 429,
        description: "Succulent mutton pieces slow-cooked with aged basmati rice and aromatic whole spices.",
        isVeg: false,
      },
      {
        id: "bb3", name: "Egg Biryani", price: 199, originalPrice: 249,
        description: "Fluffy basmati rice layered with spiced boiled eggs and fried onions. A classic comfort dish.",
        isVeg: false, tag: "Bestseller",
      },
      {
        id: "bb4", name: "Veg Dum Biryani", price: 229, originalPrice: 269,
        description: "Fragrant basmati rice cooked with seasonal vegetables, paneer, and whole spices.",
        isVeg: true,
      },
      {
        id: "bb5", name: "Prawn Biryani", price: 349,
        description: "Juicy prawns marinated in coastal spices, layered with saffron-infused basmati rice.",
        isVeg: false, tag: "New",
      },
      {
        id: "bb6", name: "Raita", price: 49,
        description: "Chilled boondi raita with cumin and fresh coriander. The perfect biryani companion.",
        isVeg: true,
      },
      {
        id: "bb7", name: "Mirchi Ka Salan", price: 79,
        description: "Traditional Hyderabadi green chilli curry in a tangy peanut and sesame gravy.",
        isVeg: true,
      },
      {
        id: "bb8", name: "Shahi Tukda", price: 129,
        description: "Fried bread soaked in saffron milk, topped with rabri and dry fruits. A royal dessert.",
        isVeg: true,
      },
    ],
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
    menu: [
      {
        id: "bk1", name: "Whopper", price: 249, originalPrice: 299,
        description: "The iconic flame-grilled beef patty with fresh lettuce, tomatoes, onions, and mayo.",
        isVeg: false, tag: "Bestseller",
      },
      {
        id: "bk2", name: "Crispy Veg Burger", price: 149, originalPrice: 179,
        description: "Crispy veggie patty with fresh veggies and creamy sauce in a toasted sesame bun.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "bk3", name: "Chicken Royale", price: 199,
        description: "Crispy chicken fillet with lettuce and mayo in a soft brioche bun. A royal treat.",
        isVeg: false,
      },
      {
        id: "bk4", name: "Paneer King Burger", price: 179,
        description: "Spiced paneer patty with tangy sauce, onions, and jalapeños. A desi twist on a classic.",
        isVeg: true,
      },
      {
        id: "bk5", name: "Loaded Fries", price: 129, originalPrice: 149,
        description: "Crispy golden fries loaded with cheese sauce, jalapeños, and sour cream.",
        isVeg: true,
      },
      {
        id: "bk6", name: "Chicken Nuggets (9 pcs)", price: 179,
        description: "Juicy chicken nuggets with a crispy golden coating. Served with dipping sauce.",
        isVeg: false,
      },
      {
        id: "bk7", name: "Oreo Shake", price: 149,
        description: "Thick and creamy Oreo milkshake blended with vanilla ice cream.",
        isVeg: true,
      },
    ],
  },
  {
    id: "res3",
    name: "Sagar Ratna",
    rating: 4.6,
    eta: "15 mins",
    image: "from-green-500 to-emerald-700",
    cuisine: "South Indian",
    distance: "900 m",
    offer: "₹75 off above ₹299",
    popular: ["Masala Dosa", "Idli Sambar"],
    menu: [
      {
        id: "sr1", name: "Masala Dosa", price: 149, originalPrice: 179,
        description: "Crispy golden dosa filled with spiced potato masala. Served with sambar and three chutneys.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "sr2", name: "Idli Sambar (3 pcs)", price: 99,
        description: "Soft, fluffy steamed rice cakes served with piping hot sambar and coconut chutney.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "sr3", name: "Medu Vada (2 pcs)", price: 89,
        description: "Crispy fried lentil doughnuts with a soft interior. Served with sambar and chutney.",
        isVeg: true,
      },
      {
        id: "sr4", name: "Uttapam", price: 129,
        description: "Thick, soft rice pancake topped with onions, tomatoes, and green chillies.",
        isVeg: true,
      },
      {
        id: "sr5", name: "Rava Dosa", price: 159,
        description: "Thin, lacy semolina dosa with a crispy texture. Served with sambar and chutneys.",
        isVeg: true,
      },
      {
        id: "sr6", name: "Pongal", price: 119,
        description: "Comforting rice and lentil porridge tempered with ghee, pepper, and cashews.",
        isVeg: true,
      },
      {
        id: "sr7", name: "Filter Coffee", price: 59,
        description: "Authentic South Indian filter coffee — strong decoction with frothy hot milk.",
        isVeg: true,
      },
      {
        id: "sr8", name: "Kesari Bath", price: 79,
        description: "Sweet semolina halwa with saffron, ghee, and cashews. A classic South Indian dessert.",
        isVeg: true,
      },
    ],
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
    menu: [
      {
        id: "ph1", name: "Margherita Pizza (Medium)", price: 299, originalPrice: 399,
        description: "Classic Margherita with rich tomato sauce, fresh mozzarella, and basil on a hand-tossed base.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "ph2", name: "Farmhouse Pizza (Medium)", price: 399, originalPrice: 499,
        description: "Loaded with mushrooms, capsicum, onions, and tomatoes on a cheesy mozzarella base.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "ph3", name: "Chicken Supreme (Medium)", price: 449, originalPrice: 549,
        description: "Grilled chicken, capsicum, onions, and olives on a creamy white sauce base.",
        isVeg: false,
      },
      {
        id: "ph4", name: "Pepperoni Feast (Medium)", price: 479,
        description: "Loaded with double pepperoni and extra mozzarella on a classic tomato base.",
        isVeg: false, tag: "Spicy",
      },
      {
        id: "ph5", name: "Stuffed Garlic Bread", price: 149, originalPrice: 179,
        description: "Soft garlic bread stuffed with mozzarella cheese and herbs. Perfect starter.",
        isVeg: true,
      },
      {
        id: "ph6", name: "Pasta Arrabiata", price: 199,
        description: "Penne pasta in a spicy tomato and garlic sauce with fresh herbs.",
        isVeg: true, tag: "Spicy",
      },
      {
        id: "ph7", name: "Choco Lava Cake", price: 129,
        description: "Warm chocolate cake with a gooey molten centre. Served with vanilla ice cream.",
        isVeg: true,
      },
    ],
  },
  {
    id: "res5",
    name: "Chaayos",
    rating: 4.5,
    eta: "15 mins",
    image: "from-amber-600 to-orange-700",
    cuisine: "Tea, Snacks",
    distance: "1.2 km",
    offer: "Combos from ₹149",
    popular: ["Desi Chai", "Vada Pav"],
    menu: [
      {
        id: "cy1", name: "Desi Chai", price: 59, originalPrice: 79,
        description: "Freshly brewed masala chai with ginger, cardamom, and tulsi. Customise your sweetness.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "cy2", name: "Vada Pav", price: 79,
        description: "Mumbai's favourite street food — spiced potato vada in a soft pav with chutneys.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "cy3", name: "Cutting Chai", price: 39,
        description: "Half-cup strong tea, Mumbai style. Bold, sweet, and perfectly spiced.",
        isVeg: true,
      },
      {
        id: "cy4", name: "Maggi Noodles", price: 99,
        description: "Classic Maggi noodles cooked with vegetables and extra masala. A nostalgic favourite.",
        isVeg: true,
      },
      {
        id: "cy5", name: "Butter Toast with Jam", price: 89,
        description: "Thick slices of toasted bread with generous butter and homemade mixed fruit jam.",
        isVeg: true,
      },
      {
        id: "cy6", name: "Cold Coffee", price: 129, originalPrice: 149,
        description: "Chilled blended coffee with milk and ice cream. Rich, creamy, and refreshing.",
        isVeg: true,
      },
      {
        id: "cy7", name: "Samosa (2 pcs)", price: 69,
        description: "Crispy fried pastry filled with spiced potatoes and peas. Served with mint chutney.",
        isVeg: true,
      },
      {
        id: "cy8", name: "Maska Bun", price: 59,
        description: "Soft Irani bun slathered with generous butter. Best paired with a hot chai.",
        isVeg: true,
      },
    ],
  },
  {
    id: "res6",
    name: "Wok & Roll",
    rating: 4.3,
    eta: "20 mins",
    image: "from-red-600 to-yellow-500",
    cuisine: "Chinese, Indo-Chinese",
    distance: "1.5 km",
    offer: "20% off on orders above ₹399",
    popular: ["Chicken Hakka Noodles", "Veg Manchurian"],
    menu: [
      {
        id: "wr1", name: "Chicken Hakka Noodles", price: 229, originalPrice: 269,
        description: "Stir-fried noodles with tender chicken, vegetables, and a bold soy-chilli sauce.",
        isVeg: false, tag: "Bestseller",
      },
      {
        id: "wr2", name: "Veg Manchurian (Gravy)", price: 199, originalPrice: 239,
        description: "Crispy vegetable dumplings in a tangy, spicy Manchurian gravy. An Indo-Chinese classic.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "wr3", name: "Chicken Fried Rice", price: 219,
        description: "Wok-tossed rice with egg, chicken, spring onions, and soy sauce.",
        isVeg: false,
      },
      {
        id: "wr4", name: "Veg Spring Rolls (4 pcs)", price: 169,
        description: "Crispy golden rolls stuffed with stir-fried vegetables and glass noodles.",
        isVeg: true,
      },
      {
        id: "wr5", name: "Chilli Paneer (Dry)", price: 249, originalPrice: 289,
        description: "Crispy paneer cubes tossed with capsicum, onions, and a fiery chilli sauce.",
        isVeg: true, tag: "Spicy",
      },
      {
        id: "wr6", name: "Chicken Lollipop (6 pcs)", price: 299,
        description: "Marinated chicken wings shaped into lollipops, deep-fried and tossed in spicy sauce.",
        isVeg: false, tag: "Spicy",
      },
      {
        id: "wr7", name: "Hot & Sour Soup", price: 149,
        description: "Classic Chinese soup with vegetables, tofu, and a tangy, spicy broth.",
        isVeg: true,
      },
      {
        id: "wr8", name: "Schezwan Fried Rice", price: 199,
        description: "Wok-tossed rice with Schezwan sauce, vegetables, and egg. Bold and fiery.",
        isVeg: false, tag: "Spicy",
      },
    ],
  },
  {
    id: "res7",
    name: "Frosty Spoon",
    rating: 4.7,
    eta: "10 mins",
    image: "from-pink-400 to-purple-500",
    cuisine: "Desserts, Ice Cream",
    distance: "800 m",
    offer: "Buy 2 get 1 free on scoops",
    popular: ["Belgian Waffle", "Mango Sorbet"],
    menu: [
      {
        id: "fs1", name: "Belgian Waffle with Ice Cream", price: 249, originalPrice: 299,
        description: "Crispy Belgian waffle topped with two scoops of vanilla ice cream, chocolate sauce, and berries.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "fs2", name: "Mango Sorbet (2 scoops)", price: 149,
        description: "Refreshing dairy-free mango sorbet made with real Alphonso mango pulp.",
        isVeg: true, tag: "Bestseller",
      },
      {
        id: "fs3", name: "Chocolate Lava Sundae", price: 199, originalPrice: 229,
        description: "Warm chocolate brownie topped with vanilla ice cream and hot fudge sauce.",
        isVeg: true,
      },
      {
        id: "fs4", name: "Kulfi Falooda", price: 179,
        description: "Traditional Indian kulfi with rose falooda, basil seeds, and rose syrup.",
        isVeg: true,
      },
      {
        id: "fs5", name: "Strawberry Cheesecake", price: 229,
        description: "Creamy New York-style cheesecake with a buttery biscuit base and fresh strawberry compote.",
        isVeg: true, tag: "New",
      },
      {
        id: "fs6", name: "Gulab Jamun Ice Cream", price: 159,
        description: "Warm gulab jamuns served with a scoop of saffron ice cream. A desi fusion delight.",
        isVeg: true,
      },
      {
        id: "fs7", name: "Nutella Crepe", price: 199,
        description: "Thin French crepe filled with Nutella, sliced bananas, and crushed hazelnuts.",
        isVeg: true,
      },
      {
        id: "fs8", name: "Mango Lassi", price: 99,
        description: "Thick and creamy mango lassi made with fresh curd and Alphonso mango pulp.",
        isVeg: true,
      },
    ],
  },
];
