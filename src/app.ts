import Fastify, { FastifyInstance } from "fastify";
import spotifyRoutes from "./routes/spotifyRoutes";

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });

  // Register your routes
  app.register(spotifyRoutes);

  return app;
}
