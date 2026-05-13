import { Router } from "express";
import { prisma } from "../../config/database.js";
import { authenticate } from "../../middleware/auth.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

export const listsRouter = Router();

// All list routes require authentication
listsRouter.use(authenticate);

/**
 * GET /api/lists
 * Get user's grocery lists
 */
listsRouter.get("/lists", async (req, res, next) => {
  try {
    const lists = await prisma.groceryList.findMany({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend structure
    const data = lists.map((list) => ({
      id: list.id,
      name: list.name,
      emoji: list.emoji,
      createdAt: formatRelativeDate(list.createdAt),
      items: list.items.map((item) => ({
        id: item.id,
        text: item.text,
        checked: item.checked,
        productId: item.productId,
        price: item.price || item.product?.price,
      })),
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/lists/:id
 * Get single list
 */
listsRouter.get("/lists/:id", async (req, res, next) => {
  try {
    const list = await prisma.groceryList.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!list) {
      throw new AppError(404, "List not found");
    }

    const data = {
      id: list.id,
      name: list.name,
      emoji: list.emoji,
      createdAt: formatRelativeDate(list.createdAt),
      items: list.items.map((item) => ({
        id: item.id,
        text: item.text,
        checked: item.checked,
        productId: item.productId,
        price: item.price || item.product?.price,
      })),
    };

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

const createListSchema = z.object({
  name: z.string().min(1).max(100),
  emoji: z.string().max(10).default("🛒"),
});

/**
 * POST /api/lists
 * Create new grocery list
 */
listsRouter.post("/lists", async (req, res, next) => {
  try {
    const data = createListSchema.parse(req.body);

    const list = await prisma.groceryList.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: list.id,
        name: list.name,
        emoji: list.emoji,
        createdAt: "Just now",
        items: [],
      },
    });
  } catch (error) {
    next(error);
  }
});

const updateListSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  emoji: z.string().max(10).optional(),
});

/**
 * PATCH /api/lists/:id
 * Update list name/emoji
 */
listsRouter.patch("/lists/:id", async (req, res, next) => {
  try {
    const data = updateListSchema.parse(req.body);

    // Verify ownership
    const existing = await prisma.groceryList.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existing) {
      throw new AppError(404, "List not found");
    }

    const list = await prisma.groceryList.update({
      where: { id: req.params.id },
      data,
    });

    res.json({
      success: true,
      data: {
        id: list.id,
        name: list.name,
        emoji: list.emoji,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/lists/:id
 * Delete list
 */
listsRouter.delete("/lists/:id", async (req, res, next) => {
  try {
    // Verify ownership
    const existing = await prisma.groceryList.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existing) {
      throw new AppError(404, "List not found");
    }

    await prisma.groceryList.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

// ============================================
// LIST ITEMS
// ============================================

const addItemSchema = z.object({
  text: z.string().min(1).max(200),
  productId: z.string().uuid().optional(),
  price: z.number().positive().optional(),
});

/**
 * POST /api/lists/:id/items
 * Add item to list
 */
listsRouter.post("/lists/:id/items", async (req, res, next) => {
  try {
    const data = addItemSchema.parse(req.body);

    // Verify ownership
    const list = await prisma.groceryList.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!list) {
      throw new AppError(404, "List not found");
    }

    const item = await prisma.listItem.create({
      data: {
        ...data,
        listId: req.params.id,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: item.id,
        text: item.text,
        checked: item.checked,
        productId: item.productId,
        price: item.price || item.product?.price,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/lists/:listId/items/:itemId
 * Toggle item checked status
 */
listsRouter.patch("/lists/:listId/items/:itemId", async (req, res, next) => {
  try {
    // Verify ownership
    const list = await prisma.groceryList.findFirst({
      where: {
        id: req.params.listId,
        userId: req.user!.id,
      },
    });

    if (!list) {
      throw new AppError(404, "List not found");
    }

    const item = await prisma.listItem.findFirst({
      where: {
        id: req.params.itemId,
        listId: req.params.listId,
      },
    });

    if (!item) {
      throw new AppError(404, "Item not found");
    }

    const updated = await prisma.listItem.update({
      where: { id: req.params.itemId },
      data: { checked: !item.checked },
    });

    res.json({
      success: true,
      data: {
        id: updated.id,
        text: updated.text,
        checked: updated.checked,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/lists/:listId/items/:itemId
 * Remove item from list
 */
listsRouter.delete("/lists/:listId/items/:itemId", async (req, res, next) => {
  try {
    // Verify ownership
    const list = await prisma.groceryList.findFirst({
      where: {
        id: req.params.listId,
        userId: req.user!.id,
      },
    });

    if (!list) {
      throw new AppError(404, "List not found");
    }

    await prisma.listItem.deleteMany({
      where: {
        id: req.params.itemId,
        listId: req.params.listId,
      },
    });

    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

// ============================================
// HELPERS
// ============================================

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
