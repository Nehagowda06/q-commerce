import { Request, Response, NextFunction } from "express";
import { supabaseAdmin } from "../config/supabase.js";
import { prisma } from "../config/database.js";
import { AppError } from "./error-handler.js";
import { User } from "@prisma/client";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
      supabaseUserId?: string;
    }
  }
}

/**
 * Middleware to authenticate requests using Supabase JWT
 * Extracts user from Authorization header: "Bearer <token>"
 */
export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    // Verify token with Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      throw new AppError(401, "Invalid or expired token");
    }

    // Get or create user in our database
    let user = await prisma.user.findUnique({
      where: { supabaseAuthId: data.user.id },
    });

    if (!user) {
      // Create user on first login
      user = await prisma.user.create({
        data: {
          supabaseAuthId: data.user.id,
          email: data.user.email,
          phone: data.user.phone,
          name: data.user.user_metadata?.name || data.user.email?.split("@")[0],
        },
      });
    }

    req.user = user;
    req.supabaseUserId = data.user.id;
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware to check if user is admin
 * Must be used after authenticate middleware
 */
export function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new AppError(401, "Authentication required"));
  }

  if (req.user.role !== "ADMIN") {
    return next(new AppError(403, "Admin access required"));
  }

  next();
}

/**
 * Optional authentication - doesn't fail if no token
 * Useful for endpoints that work for both guests and logged-in users
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (!error && data.user) {
      const user = await prisma.user.findUnique({
        where: { supabaseAuthId: data.user.id },
      });

      if (user) {
        req.user = user;
        req.supabaseUserId = data.user.id;
      }
    }

    next();
  } catch {
    // Silently continue without auth
    next();
  }
}
