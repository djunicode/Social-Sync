import { FastifyInstance } from "fastify";
import { $ref } from "./streamPaymentSchema";
import { createStreamPayment, getStreamPayments , getMyStreamPayment } from "./streamPaymentControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function streamPaymentRoutes(app: FastifyInstance) {
    //create streamExit route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createStreamPaymentSchema"),
        response: { 200: $ref("createStreamPaymentResponseSchema") }
      }
    },
    createStreamPayment
  );

  app.get("/my/:streamStreamId",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
    },
    getMyStreamPayment
  );

  // get streamExit by id route
  app.get("/:streamStreamId", {
    schema: {
      params: $ref("getStreamPaymentParamsSchema"),
    }
  },
    getStreamPayments
  );
}
export default streamPaymentRoutes;