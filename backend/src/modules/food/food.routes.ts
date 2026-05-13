import { Router } from "express";
import { prisma } from "../../config/database.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

export const foodRouter = Router();

// ============================================
// FOOD CATEGORIES
// ============================================

/**
 * GET /api/food/categories
 * Get all food categories (Biryani, Pizza, etc.)
 */
foodRouter.get("/food/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      orderBy: { sortOrder: "asc" },
    });

    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      image: cat.image,
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// ============================================
// RESTAURANTS
// ============================================

const restaurantsQuerySchema = z.object({
  cuisine: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(["rating", "eta", "distance"]).optional(),
  limit: z.coerce.number().min(1).max(50).optional().default(20),
  offset: z.coerce.number().min(0).optional().default(0),
});

/**
 * GET /api/restaurants
 * Get restaurants with filtering
 */
foodRouter.get("/restaurants", async (req, res, next) => {
  try {
    const query = restaurantsQuerySchema.parse(req.query);

    const where: Record<string, unknown> = { isActive: true };

    if (query.cuisine) {
      where.cuisine = { contains: query.cuisine, mode: "insensitive" };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { cuisine: { contains: query.search, mode: "insensitive" } },
        { popular: { hasSome: [query.search] } },
      ];
    }

    let orderBy: Record<string, string> = { rating: "desc" };
    if (query.sort === "eta") orderBy = { eta: "asc" };
    if (query.sort === "distance") orderBy = { distance: "asc" };

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        orderBy,
        take: query.limit,
        skip: query.offset,
      }),
      prisma.restaurant.count({ where }),
    ]);

    const data = restaurants.map((r) => ({
      id: r.id,
      name: r.name,
      cuisine: r.cuisine,
      rating: r.rating,
      eta: r.eta,
      distance: r.distance,
      image: r.image,
      offer: r.offer,
      popular: r.popular,
    }));

    res.json({
      success: true,
      data,
      pagination: {
        total,
        limit: query.limit,
        offset: query.offset,
        hasMore: query.offset + restaurants.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/restaurants/:id
 * Get single restaurant with menu
 */
foodRouter.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.params.id },
      include: {
        menuItems: {
          where: { inStock: true },
          orderBy: { category: "asc" },
        },
      },
    });

    if (!restaurant) {
      throw new AppError(404, "Restaurant not found");
    }

    const data = {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      eta: restaurant.eta,
      distance: restaurant.distance,
      image: restaurant.image,
      offer: restaurant.offer,
      popular: restaurant.popular,
      menu: restaurant.menuItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        isVeg: item.isVeg,
        category: item.category,
        inStock: item.inStock,
      })),
    };

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/restaurants/:id/menu
 * Get restaurant menu items
 */
foodRouter.get("/restaurants/:id/menu", async (req, res, next) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.params.id },
    });

    if (!restaurant) {
      throw new AppError(404, "Restaurant not found");
    }

    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId: req.params.id,
        inStock: true,
      },
      orderBy: { category: "asc" },
    });

    const data = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
      category: item.category,
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
