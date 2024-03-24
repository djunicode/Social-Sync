import { FastifyInstance } from "fastify";
import { $ref } from "./voteSchema";
import { createVote, deleteVote , getVotes , getMyVotes , updateVote } from "./voteControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function voteRoutes(app: FastifyInstance) {

  // create vote route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createVoteSchema"),
        response: { 200: $ref("createVoteResponseSchema") }
      }
    },
    createVote
  );

// get my votes route
  app.get("/my",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getMyVotes
  );

  // get votes by stream id route
  app.get("/:streamStreamId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
      params: $ref("getVoteParamsSchema"),
    }
  },
    getVotes
  );

  // update vote route
  app.put("/update/:streamStreamId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateVoteSchema"),
      params: $ref("getVoteParamsSchema"),
      response: { 200: $ref("createVoteResponseSchema") }
    }
  },
    updateVote
  );

  // delete vote route
  app.delete("/delete/:streamStreamId", {
    preHandler: [app.authenticate],
    schema: {
      params: $ref("getVoteParamsSchema"),
      response: { 200: $ref("createVoteResponseSchema") }
    }
  },
    deleteVote
  );
}

export default voteRoutes;