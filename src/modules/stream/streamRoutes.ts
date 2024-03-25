import { FastifyInstance } from "fastify";
import { $ref } from "./streamSchema";
import { createStream, deleteStream , getStream , getStreams , getMyStream , updateStream, getMyLikedStreams, getMyDislikedStreams } from "./streamControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function streamRoutes(app: FastifyInstance) {

  // create stream route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createStreamSchema"),
        response: { 200: $ref("createStreamResponseSchema") }
      }
    },
    createStream
  );

// get my streams route
  app.get("/my/",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getMyStream
  );

  // get stream by id route
  app.get("/:streamId", {
    schema: {
      params: $ref("getStreamParamsSchema"),
    }
  },
    getStream
  );

  // get all streams route
  app.get("/all", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
    }
  },
    getStreams
  );

   // get liked streams route
  app.get("/liked", {
    preHandler: [app.authenticate],
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
    }
  },
    getMyLikedStreams
  );

    // get disliked streams route
  app.get("/disliked", {
    preHandler: [app.authenticate],
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
    }
  },
    getMyDislikedStreams
  );

  // update stream route
  app.put("/update/:streamId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateStreamSchema"),
      response: { 200: $ref("createStreamResponseSchema") }
    }
  },
    updateStream
  );

  // delete stream route
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