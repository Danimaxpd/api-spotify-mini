import { FastifyInstance } from "fastify";
import SpotifyService from "../services/spotifyService";

export default async function (fastify: FastifyInstance) {
  fastify.get("/spotify/data", async () => {
    const data = await SpotifyService.getSomeData();
    return data;
  });
}
