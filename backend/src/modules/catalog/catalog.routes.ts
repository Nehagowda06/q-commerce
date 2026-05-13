import { Router } from "express";
import { prisma } from "../../config/database.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

export const catalogRouter = Router();

// ============================================
// CATEGORIES
// ============================================

/**
 * GET /api/categories
 * Get all grocery categories with subcategories
 */
catalogRouter.get("/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    // Transform to match frontend structure
    const data = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      image: cat.image,
      color: cat.color,
      ring: cat.ring,
      subcategories: cat.subcategories.map((sub) => ({
        name: sub.name,
        image: sub.image,
      })),
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/categories/:id
 * Get single category with products
 */
catalogRouter.get("/categories/:id", async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: {
        subcategories: {
          orderBy: { sortOrder: "asc" },
        },
        products: {
          where: { inStock: true },
          take: 20,
        },
      },
    });

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

// ============================================
// PRODUCTS
// ============================================

const productsQuerySchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  search: z.string().optional(),
  tag: z.string().optional(),
  sort: z.enum(["relevance", "price-asc", "price-desc", "discount"]).optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
  offset: z.coerce.number().min(0).optional().default(0),
});

/**
 * GET /api/products
 * Get products with filtering, sorting, and pagination
 */
catalogRouter.get("/products", async (req, res, next) => {
  try {
    const query = productsQuerySchema.parse(req.query);

    // Build where clause
    const where: Record<string, unknown> = { inStock: true };

    if (query.category) {
      where.category = { name: { equals: query.category, mode: "insensitive" } };
    }

    if (query.subcategory) {
      where.subcategory = { name: { equals: query.subcategory, mode: "insensitive" } };
    }

    if (query.tag) {
      where.tag = { equals: query.tag, mode: "insensitive" };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { brand: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }

    // Build orderBy
    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (query.sort === "price-asc") orderBy = { price: "asc" };
    if (query.sort === "price-desc") orderBy = { price: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take: query.limit,
        skip: query.offset,
        include: {
          category: { select: { name: true } },
          subcategory: { select: { name: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Transform to match frontend structure
    const data = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      weight: p.weight,
      price: p.price,
      originalPrice: p.originalPrice,
      imageColor: p.imageColor,
      imageUrl: p.imageUrl,
      tag: p.tag,
      brand: p.brand,
      category: p.category?.name,
      subcategory: p.subcategory?.name,
      details: p.details,
      nutrition: p.nutrition,
      inStock: p.inStock,
    }));

    // Sort by discount if requested (needs post-processing)
    if (query.sort === "discount") {
      data.sort((a, b) => {
        const discountA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discountB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discountB - discountA;
      });
    }

    res.json({
      success: true,
      data,
      pagination: {
        total,
        limit: query.limit,
        offset: query.offset,
        hasMore: query.offset + products.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 * Get single product details
 */
catalogRouter.get("/products/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: { select: { name: true, color: true } },
        subcategory: { select: { name: true } },
      },
    });

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    const data = {
      id: product.id,
      name: product.name,
      description: product.description,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      imageColor: product.imageColor,
      imageUrl: product.imageUrl,
      tag: product.tag,
      brand: product.brand,
      category: product.category?.name,
      subcategory: product.subcategory?.name,
      details: product.details,
      nutrition: product.nutrition,
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
    };

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
