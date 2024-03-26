import { FastifyInstance } from "fastify";
import { $ref } from "./subscriptionsSchema";
import { createSubscription, deleteSubscription , getUserSubscriptions , getCreatorSubscribers , getStreamSubscribers } from "./subscriptionsControllers";
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
  app.get("/my",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getUserSubscriptions
  );

  // get votes by stream id route
  app.get("/:creatorUserId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
      params: $ref("getSubscriptionsParamsSchema"),
    }
  },
    getCreatorSubscribers
  );

  // update vote route
  app.get("/:streamStreamId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateSubscriptionsSchema"),
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