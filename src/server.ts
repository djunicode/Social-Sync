import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/userRoutes";
import { userSchemas } from "./modules/user/userSchema";
import { streamSchemas } from "./modules/stream/streamSchema"
import fjwt, { JWT } from "@fastify/jwt"
import streamRoutes from "./modules/stream/streamRoutes";
import { voteSchemas } from "./modules/vote/voteSchema";
import voteRoutes from "./modules/vote/voteRoutes";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      userId: string;
    }
  }
}

function buildServer() {
  const server = Fastify();

  server.register(fjwt, {
    secret: "supersecret"
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/", async function () {
    return { status: "OK" };
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  for (const schema of [...streamSchemas]) {
    server.addSchema(schema);
  }

  for (const schema of [...voteSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/user" });
  server.register(streamRoutes, { prefix: "api/stream"});
  server.register(voteRoutes,{ prefix: "api/vote"});
  return server;
}

export default buildServer;