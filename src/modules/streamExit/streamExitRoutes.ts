import { FastifyInstance } from "fastify";
import { $ref } from "./streamExitSchema";
import { createStreamExit, getStreamExits , getMyStreamExit } from "./streamExitControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function streamExitRoutes(app: FastifyInstance) {
    //create streamExit route
  app.post("/create",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createStreamExitSchema"),
        response: { 200: $ref("createStreamExitResponseSchema") }
      }
    },
    createStreamExit
  );

  app.get("/my/:streamStreamId",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
    },
    getMyStreamExit
  );

  // get streamExit by id route
  app.get("/:streamStreamId", {
    schema: {
      params: $ref("getStreamExitParamsSchema"),
    }
  },
    getStreamExits
  );

  // get all streams route
  app.get("/all/:streamStreamId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
    }
  },
    getStreamExits
  );

//   app.put("/update/:streamExitId", {
//     preHandler: [app.authenticate],
//     schema: {
//       body: $ref("updateStreamExitSchema"),
//       response: { 200: $ref("createStreamExitResponseSchema") }
//     }
//   },
//     updateStreamExit
//   );
}
export default streamExitRoutes;