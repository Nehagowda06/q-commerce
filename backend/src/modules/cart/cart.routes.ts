import { Router } from "express";
import { prisma } from "../../config/database.js";
import { authenticate } from "../../middleware/auth.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

export const cartRouter = Router();

// All cart routes require authentication
cartRouter.use(authenticate);

/**
 * GET /api/cart
 * Get current user's cart
 */
cartRouter.get("/cart", async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            originalPrice: true,
            weight: true,
            imageColor: true,
            imageUrl: true,
            inStock: true,
            stockQuantity: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend CartItem structure
    const items = cartItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      weight: item.product.weight,
      imageColor: item.product.imageColor,
      imageUrl: item.product.imageUrl,
      inStock: item.product.inStock,
      maxQuantity: item.product.stockQuantity,
    }));

    // Calculate totals
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = itemTotal > 0 && itemTotal < 199 ? 25 : 0; // Free delivery above Rs.199
    const grandTotal = itemTotal + deliveryFee;

    res.json({
      success: true,
      data: {
        items,
        itemTotal,
        deliveryFee,
        grandTotal,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
});

const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).default(1),
});

/**
 * POST /api/cart/items
 * Add item to cart
 */
cartRouter.post("/cart/items", async (req, res, next) => {
  try {
    const { productId, quantity } = addToCartSchema.parse(req.body);

    // Check if product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    if (!product.inStock || product.stockQuantity < quantity) {
      throw new AppError(400, "Product is out of stock");
    }

    // Upsert cart item
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: req.user!.id,
        productId,
        quantity,
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
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    next(error);
  }
});

const updateCartSchema = z.object({
  quantity: z.number().int().min(0),
});

/**
 * PATCH /api/cart/items/:productId
 * Update item quantity (0 removes item)
 */
cartRouter.patch("/cart/items/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = updateCartSchema.parse(req.body);

    if (quantity === 0) {
      // Remove item
      await prisma.cartItem.deleteMany({
        where: {
          userId: req.user!.id,
          productId,
        },
      });

      res.json({ success: true, data: null });
      return;
    }

    // Check stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError(404, "Product not found");
    }

    if (quantity > product.stockQuantity) {
      throw new AppError(400, `Only ${product.stockQuantity} items available`);
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
      data: { quantity },
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

    res.json({
      success: true,
      data: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/cart/items/:productId
 * Remove item from cart
 */
cartRouter.delete("/cart/items/:productId", async (req, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId: req.user!.id,
        productId: req.params.productId,
      },
    });

    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/cart
 * Clear entire cart
 */
cartRouter.delete("/cart", async (req, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id },
    });

    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});
