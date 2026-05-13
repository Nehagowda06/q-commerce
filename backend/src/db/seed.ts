import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fluent UI Emoji CDN base URL
const FLUENT = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets";

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clear existing data
  await prisma.listItem.deleteMany();
  await prisma.groceryList.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.foodCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  console.log("✓ Cleared existing data");

  // ============================================
  // CATEGORIES & SUBCATEGORIES
  // ============================================

  const categoriesData = [
    {
      name: "Fresh",
      icon: "Leaf",
      image: `${FLUENT}/Leafy%20green/3D/leafy_green_3d.png`,
      color: "bg-gradient-to-br from-emerald-200 via-lime-100 to-green-50",
      ring: "ring-emerald-200/70",
      sortOrder: 1,
      subcategories: [
        { name: "Vegetables", image: `${FLUENT}/Broccoli/3D/broccoli_3d.png` },
        { name: "Fruits", image: `${FLUENT}/Red%20apple/3D/red_apple_3d.png` },
        { name: "Herbs", image: `${FLUENT}/Herb/3D/herb_3d.png` },
        { name: "Cut & Peeled", image: `${FLUENT}/Kitchen%20knife/3D/kitchen_knife_3d.png` },
      ],
    },
    {
      name: "Dairy",
      icon: "Milk",
      image: `${FLUENT}/Glass%20of%20milk/3D/glass_of_milk_3d.png`,
      color: "bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-50",
      ring: "ring-sky-200/70",
      sortOrder: 2,
      subcategories: [
        { name: "Milk", image: `${FLUENT}/Glass%20of%20milk/3D/glass_of_milk_3d.png` },
        { name: "Curd", image: `${FLUENT}/Bowl%20with%20spoon/3D/bowl_with_spoon_3d.png` },
        { name: "Paneer", image: `${FLUENT}/Cheese%20wedge/3D/cheese_wedge_3d.png` },
        { name: "Butter & Cheese", image: `${FLUENT}/Butter/3D/butter_3d.png` },
      ],
    },
    {
      name: "Staples",
      icon: "Wheat",
      image: `${FLUENT}/Sheaf%20of%20rice/3D/sheaf_of_rice_3d.png`,
      color: "bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-50",
      ring: "ring-amber-200/70",
      sortOrder: 3,
      subcategories: [
        { name: "Atta", image: `${FLUENT}/Bread/3D/bread_3d.png` },
        { name: "Rice", image: `${FLUENT}/Cooked%20rice/3D/cooked_rice_3d.png` },
        { name: "Dal", image: `${FLUENT}/Pot%20of%20food/3D/pot_of_food_3d.png` },
        { name: "Oil & Ghee", image: `${FLUENT}/Cooking/3D/cooking_3d.png` },
      ],
    },
    {
      name: "Snacks",
      icon: "Cookie",
      image: `${FLUENT}/Cookie/3D/cookie_3d.png`,
      color: "bg-gradient-to-br from-orange-200 via-red-100 to-rose-50",
      ring: "ring-orange-200/70",
      sortOrder: 4,
      subcategories: [
        { name: "Chips", image: `${FLUENT}/French%20fries/3D/french_fries_3d.png` },
        { name: "Namkeen", image: `${FLUENT}/Peanuts/3D/peanuts_3d.png` },
        { name: "Biscuits", image: `${FLUENT}/Cookie/3D/cookie_3d.png` },
        { name: "Chocolates", image: `${FLUENT}/Chocolate%20bar/3D/chocolate_bar_3d.png` },
      ],
    },
    {
      name: "Beverages",
      icon: "CupSoda",
      image: `${FLUENT}/Cup%20with%20straw/3D/cup_with_straw_3d.png`,
      color: "bg-gradient-to-br from-cyan-200 via-teal-100 to-sky-50",
      ring: "ring-cyan-200/70",
      sortOrder: 5,
      subcategories: [
        { name: "Tea & Coffee", image: `${FLUENT}/Hot%20beverage/3D/hot_beverage_3d.png` },
        { name: "Juices", image: `${FLUENT}/Tropical%20drink/3D/tropical_drink_3d.png` },
        { name: "Soft Drinks", image: `${FLUENT}/Cup%20with%20straw/3D/cup_with_straw_3d.png` },
        { name: "Energy Drinks", image: `${FLUENT}/Beverage%20box/3D/beverage_box_3d.png` },
      ],
    },
    {
      name: "Home Care",
      icon: "Sparkles",
      image: `${FLUENT}/Soap/3D/soap_3d.png`,
      color: "bg-gradient-to-br from-violet-200 via-fuchsia-100 to-purple-50",
      ring: "ring-violet-200/70",
      sortOrder: 6,
      subcategories: [
        { name: "Detergents", image: `${FLUENT}/Soap/3D/soap_3d.png` },
        { name: "Cleaners", image: `${FLUENT}/Bubbles/3D/bubbles_3d.png` },
        { name: "Tissues", image: `${FLUENT}/Roll%20of%20paper/3D/roll_of_paper_3d.png` },
        { name: "Repellents", image: `${FLUENT}/Mosquito/3D/mosquito_3d.png` },
      ],
    },
    {
      name: "Personal Care",
      icon: "Heart",
      image: `${FLUENT}/Lotion%20bottle/3D/lotion_bottle_3d.png`,
      color: "bg-gradient-to-br from-rose-200 via-pink-100 to-fuchsia-50",
      ring: "ring-rose-200/70",
      sortOrder: 7,
      subcategories: [
        { name: "Bath", image: `${FLUENT}/Shower/3D/shower_3d.png` },
        { name: "Hair", image: `${FLUENT}/Person%20getting%20haircut/Default/3D/person_getting_haircut_3d_default.png` },
        { name: "Skin", image: `${FLUENT}/Lotion%20bottle/3D/lotion_bottle_3d.png` },
        { name: "Oral Care", image: `${FLUENT}/Tooth/3D/tooth_3d.png` },
      ],
    },
    {
      name: "Baby & Pet",
      icon: "Baby",
      image: `${FLUENT}/Baby/Default/3D/baby_3d_default.png`,
      color: "bg-gradient-to-br from-lime-200 via-yellow-100 to-amber-50",
      ring: "ring-lime-200/70",
      sortOrder: 8,
      subcategories: [
        { name: "Diapers", image: `${FLUENT}/Baby/Default/3D/baby_3d_default.png` },
        { name: "Baby Food", image: `${FLUENT}/Baby%20bottle/3D/baby_bottle_3d.png` },
        { name: "Pet Food", image: `${FLUENT}/Bone/3D/bone_3d.png` },
        { name: "Pet Treats", image: `${FLUENT}/Paw%20prints/3D/paw_prints_3d.png` },
      ],
    },
  ];

  const categoryMap = new Map<string, string>();
  const subcategoryMap = new Map<string, string>();

  for (const catData of categoriesData) {
    const { subcategories, ...categoryFields } = catData;
    
    const category = await prisma.category.create({
      data: categoryFields,
    });
    
    categoryMap.set(category.name, category.id);

    for (let i = 0; i < subcategories.length; i++) {
      const sub = await prisma.subcategory.create({
        data: {
          ...subcategories[i],
          categoryId: category.id,
          sortOrder: i + 1,
        },
      });
      subcategoryMap.set(`${category.name}:${sub.name}`, sub.id);
    }
  }

  console.log("✓ Created categories and subcategories");

  // ============================================
  // PRODUCTS
  // ============================================

  const productsData = [
    // Vegetables
    {
      name: "Fresh Tomatoes", weight: "1 kg", price: 40, originalPrice: 60,
      imageColor: "from-red-100 to-red-50", tag: "Fresh",
      brand: "Local Farm", category: "Fresh", subcategory: "Vegetables",
      description: "Hand-picked ripe tomatoes sourced directly from local farms.",
      details: ["Country of Origin: India", "Storage: Cool & dry place", "Shelf Life: 5–7 days"],
      nutrition: [{ label: "Energy", value: "18 kcal" }, { label: "Carbs", value: "3.9g" }],
    },
    {
      name: "Onion", weight: "1 kg", price: 35, originalPrice: 45,
      imageColor: "from-purple-100 to-purple-50",
      brand: "Local Farm", category: "Fresh", subcategory: "Vegetables",
      description: "Fresh red onions with a pungent flavour.",
      details: ["Country of Origin: India", "Storage: Cool & dry place"],
      nutrition: [{ label: "Energy", value: "40 kcal" }, { label: "Carbs", value: "9.3g" }],
    },
    {
      name: "Potato", weight: "1 kg", price: 25,
      imageColor: "from-yellow-100 to-yellow-50",
      brand: "Local Farm", category: "Fresh", subcategory: "Vegetables",
      description: "Versatile potatoes perfect for curries, fries, and snacks.",
      details: ["Country of Origin: India"],
      nutrition: [{ label: "Energy", value: "77 kcal" }],
    },
    {
      name: "Green Capsicum", weight: "250 g", price: 30,
      imageColor: "from-green-100 to-green-50", tag: "Fresh",
      brand: "Local Farm", category: "Fresh", subcategory: "Vegetables",
      description: "Crisp and fresh green capsicums.",
      details: ["Storage: Refrigerate"],
      nutrition: [{ label: "Energy", value: "20 kcal" }],
    },
    // Fruits
    {
      name: "Banana", weight: "6 pcs", price: 48, originalPrice: 60,
      imageColor: "from-yellow-200 to-yellow-50", tag: "Fresh",
      brand: "Local Farm", category: "Fresh", subcategory: "Fruits",
      description: "Sweet and ripe Robusta bananas.",
      details: ["Storage: Room temperature"],
      nutrition: [{ label: "Energy", value: "89 kcal" }],
    },
    {
      name: "Alphonso Mango", weight: "2 pcs", price: 199, originalPrice: 250,
      imageColor: "from-orange-200 to-orange-50", tag: "Best Seller",
      brand: "Ratnagiri Farms", category: "Fresh", subcategory: "Fruits",
      description: "The king of mangoes from Ratnagiri.",
      details: ["Premium Quality"],
      nutrition: [{ label: "Energy", value: "60 kcal" }],
    },
    {
      name: "Royal Gala Apple", weight: "4 pcs", price: 160,
      imageColor: "from-red-200 to-red-50",
      brand: "Himachal Orchards", category: "Fresh", subcategory: "Fruits",
      description: "Crisp and sweet Royal Gala apples.",
      details: ["Storage: Refrigerate"],
      nutrition: [{ label: "Energy", value: "52 kcal" }],
    },
    {
      name: "Green Grapes", weight: "500 g", price: 70, originalPrice: 90,
      imageColor: "from-green-100 to-green-50",
      brand: "Nashik Farms", category: "Fresh", subcategory: "Fruits",
      description: "Seedless green grapes from Nashik.",
      details: ["Storage: Refrigerate"],
      nutrition: [{ label: "Energy", value: "67 kcal" }],
    },
    // Staples
    {
      name: "Fortune Chakki Atta", weight: "5 kg", price: 245, originalPrice: 275,
      imageColor: "from-orange-100 to-white", tag: "Best Seller",
      brand: "Fortune", category: "Staples", subcategory: "Atta",
      description: "Made from 100% whole wheat.",
      details: ["Brand: Fortune (Adani Wilmar)"],
      nutrition: [{ label: "Energy", value: "341 kcal" }],
    },
    {
      name: "India Gate Basmati Rice", weight: "1 kg", price: 145, originalPrice: 180,
      imageColor: "from-blue-50 to-white",
      brand: "India Gate", category: "Staples", subcategory: "Rice",
      description: "Premium aged Basmati rice.",
      details: ["Brand: India Gate (KRBL)"],
      nutrition: [{ label: "Energy", value: "349 kcal" }],
    },
    {
      name: "Toor Dal Premium", weight: "1 kg", price: 168,
      imageColor: "from-yellow-200 to-yellow-50",
      brand: "Savega Select", category: "Staples", subcategory: "Dal",
      description: "Premium quality toor dal.",
      details: ["No preservatives"],
      nutrition: [{ label: "Energy", value: "343 kcal" }],
    },
    {
      name: "Cold Pressed Groundnut Oil", weight: "1 l", price: 235, originalPrice: 275,
      imageColor: "from-amber-100 to-white",
      brand: "Savega Select", category: "Staples", subcategory: "Oil & Ghee",
      description: "Cold pressed groundnut oil.",
      details: ["Type: Cold Pressed"],
      nutrition: [{ label: "Energy", value: "884 kcal" }],
    },
    // Snacks
    {
      name: "Too Yumm Chips", weight: "82 g", price: 40,
      imageColor: "from-orange-100 to-white",
      brand: "Too Yumm", category: "Snacks", subcategory: "Chips",
      description: "Baked not fried! 50% less fat.",
      details: ["Flavour: Masala"],
      nutrition: [{ label: "Energy", value: "430 kcal" }],
    },
    {
      name: "Haldiram Bhujia", weight: "200 g", price: 68,
      imageColor: "from-yellow-100 to-white", tag: "Best Seller",
      brand: "Haldiram's", category: "Snacks", subcategory: "Namkeen",
      description: "The iconic Haldiram Bhujia.",
      details: ["Type: Namkeen"],
      nutrition: [{ label: "Energy", value: "536 kcal" }],
    },
    {
      name: "Dark Fantasy Cookies", weight: "300 g", price: 120, originalPrice: 150,
      imageColor: "from-stone-200 to-white",
      brand: "Sunfeast", category: "Snacks", subcategory: "Biscuits",
      description: "Indulgent chocolate-filled cookies.",
      details: ["Brand: Sunfeast (ITC)"],
      nutrition: [{ label: "Energy", value: "510 kcal" }],
    },
    // Dairy
    {
      name: "Amul Taaza Milk", weight: "500 ml", price: 27,
      imageColor: "from-blue-100 to-blue-50", tag: "Fresh",
      brand: "Amul", category: "Dairy", subcategory: "Milk",
      description: "Homogenised toned milk with 3% fat.",
      details: ["Brand: Amul (GCMMF)"],
      nutrition: [{ label: "Energy", value: "58 kcal" }],
    },
    {
      name: "Amul Butter", weight: "100 g", price: 58,
      imageColor: "from-yellow-200 to-yellow-100",
      brand: "Amul", category: "Dairy", subcategory: "Butter & Cheese",
      description: "India's most loved butter.",
      details: ["Type: Salted Butter"],
      nutrition: [{ label: "Energy", value: "720 kcal" }],
    },
    {
      name: "Mother Dairy Curd", weight: "400 g", price: 35,
      imageColor: "from-blue-50 to-white",
      brand: "Mother Dairy", category: "Dairy", subcategory: "Curd",
      description: "Thick and creamy set curd.",
      details: ["Type: Set Curd"],
      nutrition: [{ label: "Energy", value: "62 kcal" }],
    },
    {
      name: "Fresh Paneer", weight: "200 g", price: 95, originalPrice: 110,
      imageColor: "from-gray-50 to-white", tag: "Fresh",
      brand: "Savega Fresh", category: "Dairy", subcategory: "Paneer",
      description: "Soft and fresh paneer made daily.",
      details: ["Type: Full Fat Paneer"],
      nutrition: [{ label: "Energy", value: "265 kcal" }],
    },
  ];

  for (const prod of productsData) {
    const categoryId = categoryMap.get(prod.category);
    const subcategoryId = subcategoryMap.get(`${prod.category}:${prod.subcategory}`);
    
    if (!categoryId) continue;

    await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description,
        weight: prod.weight,
        price: prod.price,
        originalPrice: prod.originalPrice,
        imageColor: prod.imageColor,
        tag: prod.tag,
        brand: prod.brand,
        details: prod.details,
        nutrition: prod.nutrition,
        categoryId,
        subcategoryId,
        inStock: true,
        stockQuantity: 100,
      },
    });
  }

  console.log("✓ Created products");

  // ============================================
  // FOOD CATEGORIES
  // ============================================

  const foodCategoriesData = [
    { name: "Biryani", image: "from-orange-200 to-red-100", sortOrder: 1 },
    { name: "Pizza", image: "from-red-200 to-yellow-100", sortOrder: 2 },
    { name: "Burgers", image: "from-amber-200 to-orange-100", sortOrder: 3 },
    { name: "South Indian", image: "from-emerald-100 to-lime-50", sortOrder: 4 },
    { name: "Chinese", image: "from-rose-200 to-red-100", sortOrder: 5 },
    { name: "Desserts", image: "from-pink-100 to-purple-50", sortOrder: 6 },
  ];

  for (const cat of foodCategoriesData) {
    await prisma.foodCategory.create({ data: cat });
  }

  console.log("✓ Created food categories");

  // ============================================
  // RESTAURANTS
  // ============================================

  const restaurantsData = [
    {
      name: "Biryani Blues",
      rating: 4.5,
      eta: "25 mins",
      image: "from-orange-400 to-red-500",
      cuisine: "Hyderabadi Biryani",
      distance: "1.8 km",
      offer: "50% off up to Rs.100",
      popular: ["Chicken Dum Biryani", "Egg Biryani"],
      menuItems: [
        { name: "Chicken Dum Biryani", price: 249, isVeg: false, category: "Biryani" },
        { name: "Egg Biryani", price: 179, isVeg: false, category: "Biryani" },
        { name: "Veg Biryani", price: 149, isVeg: true, category: "Biryani" },
        { name: "Raita", price: 49, isVeg: true, category: "Sides" },
      ],
    },
    {
      name: "Burger King",
      rating: 4.2,
      eta: "20 mins",
      image: "from-yellow-500 to-orange-600",
      cuisine: "Burgers, Fast Food",
      distance: "2.4 km",
      offer: "Free fries on meals",
      popular: ["Whopper", "Crispy Veg Meal"],
      menuItems: [
        { name: "Whopper", price: 199, isVeg: false, category: "Burgers" },
        { name: "Crispy Veg Burger", price: 129, isVeg: true, category: "Burgers" },
        { name: "Chicken Fries", price: 149, isVeg: false, category: "Sides" },
        { name: "Coke", price: 59, isVeg: true, category: "Beverages" },
      ],
    },
    {
      name: "Sagar Ratna",
      rating: 4.6,
      eta: "15 mins",
      image: "from-green-500 to-emerald-700",
      cuisine: "South Indian",
      distance: "900 m",
      offer: "Rs.75 off above Rs.299",
      popular: ["Masala Dosa", "Idli Sambar"],
      menuItems: [
        { name: "Masala Dosa", price: 99, isVeg: true, category: "Dosa" },
        { name: "Idli Sambar", price: 79, isVeg: true, category: "Idli" },
        { name: "Rava Dosa", price: 109, isVeg: true, category: "Dosa" },
        { name: "Filter Coffee", price: 39, isVeg: true, category: "Beverages" },
      ],
    },
    {
      name: "Pizza Hut",
      rating: 4.1,
      eta: "25 mins",
      image: "from-red-500 to-red-400",
      cuisine: "Pizza, Sides",
      distance: "2.1 km",
      offer: "Buy 1 get 1",
      popular: ["Margherita", "Farmhouse Pizza"],
      menuItems: [
        { name: "Margherita", price: 199, isVeg: true, category: "Pizza" },
        { name: "Farmhouse Pizza", price: 349, isVeg: true, category: "Pizza" },
        { name: "Chicken Supreme", price: 399, isVeg: false, category: "Pizza" },
        { name: "Garlic Bread", price: 99, isVeg: true, category: "Sides" },
      ],
    },
    {
      name: "Chaayos",
      rating: 4.5,
      eta: "15 mins",
      image: "from-amber-600 to-orange-700",
      cuisine: "Tea, Snacks",
      distance: "1.2 km",
      offer: "Combos from Rs.149",
      popular: ["Desi Chai", "Vada Pav"],
      menuItems: [
        { name: "Desi Chai", price: 49, isVeg: true, category: "Tea" },
        { name: "Vada Pav", price: 59, isVeg: true, category: "Snacks" },
        { name: "Samosa", price: 39, isVeg: true, category: "Snacks" },
        { name: "Masala Chai", price: 59, isVeg: true, category: "Tea" },
      ],
    },
  ];

  for (const rest of restaurantsData) {
    const { menuItems, ...restaurantData } = rest;
    
    const restaurant = await prisma.restaurant.create({
      data: restaurantData,
    });

    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: {
          ...item,
          restaurantId: restaurant.id,
        },
      });
    }
  }

  console.log("✓ Created restaurants and menu items");

  // ============================================
  // DEMO USER (optional)
  // ============================================

  const demoUser = await prisma.user.create({
    data: {
      email: "demo@savega.app",
      phone: "+919876543210",
      name: "Savega User",
      role: "CUSTOMER",
    },
  });

  await prisma.address.create({
    data: {
      userId: demoUser.id,
      label: "Home",
      fullName: "Savega User",
      phone: "+919876543210",
      addressLine1: "123, MG Road",
      addressLine2: "Near Metro Station",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      isDefault: true,
    },
  });

  console.log("✓ Created demo user");

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
