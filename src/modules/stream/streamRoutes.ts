import { FastifyInstance } from "fastify";
import { $ref } from "./streamSchema";
import { createStream, deleteStream , getStream , getStreams , getMyStream , updateStream } from "./streamControllers";

async function streamRoutes(app: FastifyInstance) {

  // signup route
  app.post("/stream",
    {
      schema:
      {
        body: $ref("createStreamSchema"),
        response: { 200: $ref("createStreamResponseSchema") }
      }
    },
    createStream
  );

// get me route
  app.get("/me/:userUserId",
    {
      preHandler: [app.authenticate]
  },
    getMyStream
  );

  // get user by id route
  app.get("/:streamId", {
    schema: {
      params: $ref("getStreamParamsSchema"),
    }
  },
    getStream
  );

  // get all users route
  app.get("/all", {
    schema: {
      querystring: $ref("getStreamQuerySchema"),
    }
  },
    getStreams
  );

  // update user route
  app.put("/update/:streamId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateStreamSchema"),
      response: { 200: $ref("createStreamResponseSchema") }
    }
  },
    updateStream
  );

  // patch user route
  app.delete("/delete/:streamId", {
    preHandler: [app.authenticate],
    schema: {
      response: { 200: $ref("createStreamResponseSchema") }
    }
  },
    deleteStream
  );
}

export default streamRoutes;