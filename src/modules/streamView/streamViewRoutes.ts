import { FastifyInstance } from "fastify";
import { $ref } from "./streamViewSchema";
import { createStreamView, getStreamViews , getMyStreamView , updateStreamView} from "./streamViewController";
import { $globalRef } from "../../utils/globalSchemas";

async function streamViewRoutes(app: FastifyInstance) {

  // create stream route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createStreamViewSchema"),
        response: { 200: $ref("createStreamViewResponseSchema") }
      }
    },
    createStreamView
  );

// get my streams route
  app.get("/my/:streamId",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getMyStreamView
  );

  // get all streams route
  app.get("/all/:streamId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
    }
  },
    getStreamViews
  );

  // update stream route
  app.put("/update/:streamId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateStreamViewSchema"),
      response: { 200: $ref("createStreamViewResponseSchema") }
    }
  },
    updateStreamView
  );
}

export default streamViewRoutes;