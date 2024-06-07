import { FastifyInstance } from "fastify";
import { $ref } from "./subscriptionsSchema";
import { createSubscription, deleteSubscription , getUserSubscriptionsLive, getUserSubscriptionsStreams , getCreatorSubscribers , getStreamSubscribers } from "./subscriptionsControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function subscriptionsRoutes(app: FastifyInstance) {

  // create vote route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createSubscriptionsSchema"),
        response: { 200: $ref("createSubscriptionsResponseSchema") }
      }
    },
    createSubscription
  );

// get my votes route
  app.get("/myLive",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getUserSubscriptionsLive
  );

  app.get("/myStreams",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getUserSubscriptionsStreams
  );

  // get votes by stream id route
  app.get("/creator/:creatorUserId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
      params: $ref("getSubscriptionsParamsSchema"),
    }
  },
    getCreatorSubscribers
  );

  // update vote route
  app.get("/stream/:streamStreamId", {
    preHandler: [app.authenticate],
    schema: {
      params: $ref("getSubscriptionsParamsSchema"),
      response: { 200: $ref("createSubscriptionsResponseSchema") }
    }
  },
    getStreamSubscribers
  );

  // delete vote route
  app.delete("/delete/:creatorUserId", {
    preHandler: [app.authenticate],
    schema: {
      params: $ref("getSubscriptionsParamsSchema"),
      response: { 200: $ref("createSubscriptionsResponseSchema") }
    }
  },
    deleteSubscription
  );
}

export default subscriptionsRoutes;