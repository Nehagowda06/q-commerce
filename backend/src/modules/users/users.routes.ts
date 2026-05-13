import { Router } from "express";
import { prisma } from "../../config/database.js";
import { authenticate } from "../../middleware/auth.js";
import { AppError } from "../../middleware/error-handler.js";
import { z } from "zod";

export const usersRouter = Router();

// All user routes require authentication
usersRouter.use(authenticate);

// ============================================
// PROFILE
// ============================================

/**
 * GET /api/profile
 * Get current user's profile
 */
usersRouter.get("/profile", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        addresses: {
          orderBy: { isDefault: "desc" },
        },
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        addresses: user.addresses.map((addr) => ({
          id: addr.id,
          label: addr.label,
          fullName: addr.fullName,
          phone: addr.phone,
          addressLine1: addr.addressLine1,
          addressLine2: addr.addressLine2,
          landmark: addr.landmark,
          city: addr.city,
          state: addr.state,
          pincode: addr.pincode,
          isDefault: addr.isDefault,
        })),
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
});

/**
 * PATCH /api/profile
 * Update current user's profile
 */
usersRouter.patch("/profile", async (req, res, next) => {
  try {
    const data = updateProfileSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// ADDRESSES
// ============================================

/**
 * GET /api/addresses
 * Get user's addresses
 */
usersRouter.get("/addresses", async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user!.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });

    const data = addresses.map((addr) => ({
      id: addr.id,
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      landmark: addr.landmark,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    }));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

const createAddressSchema = z.object({
  label: z.string().min(1).max(50),
  fullName: z.string().min(1).max(100),
  phone: z.string().min(10).max(15),
  addressLine1: z.string().min(1).max(200),
  addressLine2: z.string().max(200).optional(),
  landmark: z.string().max(100).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  pincode: z.string().min(5).max(10),
  isDefault: z.boolean().optional().default(false),
});

/**
 * POST /api/addresses
 * Add new address
 */
usersRouter.post("/addresses", async (req, res, next) => {
  try {
    const data = createAddressSchema.parse(req.body);

    // If this is the first address or marked as default, update others
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user!.id },
        data: { isDefault: false },
      });
    }

    // Check if this is the first address
    const existingCount = await prisma.address.count({
      where: { userId: req.user!.id },
    });

    const address = await prisma.address.create({
      data: {
        ...data,
        userId: req.user!.id,
        isDefault: data.isDefault || existingCount === 0, // First address is default
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: address.id,
        label: address.label,
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: address.isDefault,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/addresses/:id
 * Update address
 */
usersRouter.patch("/addresses/:id", async (req, res, next) => {
  try {
    const data = createAddressSchema.partial().parse(req.body);

    // Verify ownership
    const existing = await prisma.address.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existing) {
      throw new AppError(404, "Address not found");
    }

    // If setting as default, unset others
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user!.id },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.update({
      where: { id: req.params.id },
      data,
    });

    res.json({
      success: true,
      data: {
        id: address.id,
        label: address.label,
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: address.isDefault,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/addresses/:id
 * Delete address
 */
usersRouter.delete("/addresses/:id", async (req, res, next) => {
  try {
    // Verify ownership
    const existing = await prisma.address.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existing) {
      throw new AppError(404, "Address not found");
    }

    await prisma.address.delete({
      where: { id: req.params.id },
    });

    // If deleted address was default, make another one default
    if (existing.isDefault) {
      const firstAddress = await prisma.address.findFirst({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "asc" },
      });

      if (firstAddress) {
        await prisma.address.update({
          where: { id: firstAddress.id },
          data: { isDefault: true },
        });
      }
    }

    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/addresses/:id/default
 * Set address as default
 */
usersRouter.post("/addresses/:id/default", async (req, res, next) => {
  try {
    // Verify ownership
    const existing = await prisma.address.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    if (!existing) {
      throw new AppError(404, "Address not found");
    }

    // Unset all others and set this one
    await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId: req.user!.id },
        data: { isDefault: false },
      }),
      prisma.address.update({
        where: { id: req.params.id },
        data: { isDefault: true },
      }),
    ]);

    res.json({ success: true, data: { message: "Default address updated" } });
  } catch (error) {
    next(error);
  }
});
