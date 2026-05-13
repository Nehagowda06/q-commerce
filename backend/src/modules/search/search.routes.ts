import { Router } from "express";
import { prisma } from "../../config/database.js";
import { z } from "zod";

export const searchRouter = Router();

const searchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  limit: z.coerce.number().min(1).max(20).optional().default(10),
});

/**
 * GET /api/search
 * Global search across products, categories, and restaurants
 */
searchRouter.get("/search", async (req, res, next) => {
  try {
    const { q, limit } = searchQuerySchema.parse(req.query);
    const query = q.toLowerCase();

    // Search in parallel
    const [products, categories, restaurants] = await Promise.all([
      // Search products
      prisma.product.findMany({
        where: {
          inStock: true,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { brand: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { tag: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        include: {
          category: { select: { name: true } },
        },
      }),

      // Search categories
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            {
              subcategories: {
                some: { name: { contains: query, mode: "insensitive" } },
              },
            },
          ],
        },
        take: 5,
        include: {
          subcategories: {
            where: { name: { contains: query, mode: "insensitive" } },
            take: 3,
          },
        },
      }),

      // Search restaurants
      prisma.restaurant.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { cuisine: { contains: query, mode: "insensitive" } },
            { popular: { hasSome: [query] } },
          ],
        },
        take: limit,
      }),
    ]);

    res.json({
      success: true,
      data: {
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          imageColor: p.imageColor,
          imageUrl: p.imageUrl,
          weight: p.weight,
          tag: p.tag,
          brand: p.brand,
          category: p.category?.name,
        })),
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          icon: c.icon,
          color: c.color,
          matchedSubcategories: c.subcategories.map((s) => s.name),
        })),
        restaurants: restaurants.map((r) => ({
          id: r.id,
          name: r.name,
          cuisine: r.cuisine,
          rating: r.rating,
          eta: r.eta,
          image: r.image,
          offer: r.offer,
        })),
        query: q,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/search/suggestions
 * Get search suggestions (autocomplete)
 */
searchRouter.get("/search/suggestions", async (req, res, next) => {
  try {
    const { q } = z.object({ q: z.string().min(1).max(50) }).parse(req.query);
    const query = q.toLowerCase();

    // Get product name suggestions
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        name: { contains: query, mode: "insensitive" },
      },
      select: { name: true, brand: true },
      take: 5,
      distinct: ["name"],
    });

    // Get category suggestions
    const categories = await prisma.category.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { name: true },
      take: 3,
    });

    // Get subcategory suggestions
    const subcategories = await prisma.subcategory.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { name: true },
      take: 3,
    });

    const suggestions = [
      ...products.map((p) => ({ type: "product", text: p.name, subtext: p.brand })),
      ...categories.map((c) => ({ type: "category", text: c.name })),
      ...subcategories.map((s) => ({ type: "subcategory", text: s.name })),
    ];

    res.json({
      success: true,
      data: suggestions.slice(0, 8),
    });
  } catch (error) {
    next(error);
  }
});
