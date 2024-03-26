import { FastifyInstance } from "fastify";
import buildServer from "./server";

const server:FastifyInstance = buildServer();

async function runServer() {
  try {
    const port = parseInt(process.env.PORT!) || 5000;
    const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
    await server.listen({ host: host, port: port });
    console.log(`Server ready at ${host}:${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

runServer();