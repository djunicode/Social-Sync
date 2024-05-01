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
import { commentVoteSchemas } from "./modules/commentVote/cVoteSchema";
import commentVoteRoutes from "./modules/commentVote/cVoteRoutes";
import { commentSchemas } from "./modules/comment/commentSchema";
import commentRoutes from "./modules/comment/commentRoutes";
import { streamViewSchemas } from "./modules/streamView/streamViewSchema";
import streamViewRoutes from "./modules/streamView/streamViewRoutes";
import cors from '@fastify/cors';
import { streamExitSchemas } from "./modules/streamExit/streamExitSchema";
import streamExitRoutes from "./modules/streamExit/streamExitRoutes";
import { streamPaymentSchemas } from "./modules/streamPayment.ts/streamPaymentSchema";
import streamPaymentRoutes from "./modules/streamPayment.ts/streamPaymentRoutes";
import { subscriptionsSchemas } from "./modules/subscriptions/subscriptionsSchema";
import subscriptionsRoutes from "./modules/subscriptions/subscriptionsRoutes";
import { Server } from "socket.io"
import fastifySocketIO from "./socket";
import socketRoutes from "./modules/socket/socketEvents";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
    optionalAuth: any;
    io: Server<any>;
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

  server.register(cors, { 
    // options here
  })
  
  server.register(fastifySocketIO)

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

  server.decorate(
    "optionalAuth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user : {userId:string} = await request.jwtVerify();
      } catch (e) {
        
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

  for (const schema of commentSchemas) {
    server.addSchema(schema);
  }

  for (const schema of commentVoteSchemas) {
    server.addSchema(schema);
  }

  for (const schema of streamViewSchemas) {
    server.addSchema(schema);
  }

  for (const schema of streamExitSchemas) {
    server.addSchema(schema);
  }

  for (const schema of streamPaymentSchemas) {
    server.addSchema(schema);
  }

  for (const schema of subscriptionsSchemas) {
    server.addSchema(schema);
  }

  for (const schema of globalSchemas) {
    server.addSchema(schema);
  }
  
  server.register(userRoutes, { prefix: "api/user" });
  server.register(streamRoutes, { prefix: "api/stream"});
  server.register(voteRoutes,{ prefix: "api/vote"});
  server.register(commentRoutes,{ prefix: "api/comment"});
  server.register(commentVoteRoutes,{ prefix: "api/commentVote"});
  server.register(streamViewRoutes,{ prefix: "api/streamView"})
  server.register(streamExitRoutes,{ prefix: "api/streamExit"})
  server.register(streamPaymentRoutes,{ prefix: "api/streamPayment"})
  server.register(subscriptionsRoutes,{ prefix: "api/subscriptions"})
  server.register(socketRoutes)

  return server;
}

export default buildServer;