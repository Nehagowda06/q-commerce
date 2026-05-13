import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.isDev ? ["query", "error", "warn"] : ["error"],
  });

if (env.isDev) {
  globalForPrisma.prisma = prisma;
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.log("⚠️  Server will start without database (API structure visible)");
    // Don't exit - allow server to start for testing API structure
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log("Database disconnected");
}
