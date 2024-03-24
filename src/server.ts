import Fastify, { FastifyError, FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/userRoutes";
import { userSchemas } from "./modules/user/userSchema";
import { streamSchemas } from "./modules/stream/streamSchema"
import fjwt, { FastifyJWT, JWT } from "@fastify/jwt"
import streamRoutes from "./modules/stream/streamRoutes";
import { voteSchemas } from "./modules/vote/voteSchema";
import voteRoutes from "./modules/vote/voteRoutes";
import { globalSchemas } from "./utils/globalSchemas";
import { isUser, userExists } from "./utils/user";

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
  
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'dd:mm:yy:HH:MM:ss Z',
          ignore: 'pid,hostname,reqId,res,method,url,remotePort,remoteAddress,responseTime,req',
          prettyPrint: true
        },   
      },
      
    }
  });

  server.register(fjwt, {
    secret: "supersecret"
  });

  server.addHook("preHandler", async (request: FastifyRequest, reply: FastifyReply) => {
    server.log.info(`${request.method} ${request.url}`);
  });

  server.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    server.log.info(`${reply.statusCode} => ${request.method} ${request.url} (${(reply.elapsedTime/1000).toFixed(3)}s)`);
  });

  server.addHook("onError", async (request: FastifyRequest, reply: FastifyReply, error: FastifyError) => {
    server.log.error(`Error occured during ${request.method} ${request.url}: ${error.message}`);
    return reply.status(500).send({ error: "Internal Server Error" });
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user : {userId:string} = await request.jwtVerify();
        if(!await isUser(user.userId))return reply.status(400).send({error: "User does not exist"});
      } catch (e) {
        return reply.send(e).status(500);
      }
    }
  );

  server.get("/", async function () {
    return { status: "OK" };
  });

  /*  // Add all schemas to the server 
  for (const schema of [...userSchemas, ...streamSchemas, ...voteSchemas, ...globalSchemas]) {
    server.addSchema(schema);
  }
  */

  // for better readablity :

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of streamSchemas) {
    server.addSchema(schema);
  }

  for (const schema of voteSchemas) {
    server.addSchema(schema);
  }

  for (const schema of globalSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/user" });
  server.register(streamRoutes, { prefix: "api/stream"});
  server.register(voteRoutes,{ prefix: "api/vote"});
  return server;
}

export default buildServer;