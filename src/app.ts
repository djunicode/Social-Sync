import { FastifyInstance } from "fastify";
import buildServer from "./server";

const server:FastifyInstance = buildServer();

async function runServer() {
  try {
    const port = parseInt(process.env.PORT!) || 3000;
    await server.listen({port: port});
    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

runServer();