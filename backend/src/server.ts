import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

async function main() {
  // Connect to database
  await connectDatabase();

  // Create and start server
  const app = createApp();

  const server = app.listen(env.port, () => {
    console.log(`
🚀 Savega Backend is running!

   Local:    http://localhost:${env.port}
   Health:   http://localhost:${env.port}/health
   
   Environment: ${env.nodeEnv}
   Frontend:    ${env.frontendUrl}
    `);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("\nShutting down gracefully...");
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
