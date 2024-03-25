import { FastifyInstance } from "fastify";
import { $ref } from "./cVoteSchema";
import { createCommentVote, deleteCommentVote , getCommentVotes , getMyCommentVotes , updateCommentVote } from "./cVoteControllers";
import { $globalRef } from "../../utils/globalSchemas";

async function commentVoteRoutes(app: FastifyInstance) {

  // create vote route
  app.post("/",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createCommentVoteSchema"),
        response: { 200: $ref("createCommentVoteResponseSchema") }
      }
    },
    createCommentVote
  );

// get my votes route
  app.get("/my",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: $globalRef("paginationQuerySchema"),
      }
  },
    getMyCommentVotes
  );

  // get votes by stream id route
  app.get("/:commentCommentId", {
    schema: {
      querystring: $globalRef("paginationQuerySchema"),
      params: $ref("getCommentVoteParamsSchema"),
    }
  },
    getCommentVotes
  );

  // update vote route
  app.put("/update/:commentCommentId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateCommentVoteSchema"),
      params: $ref("getCommentVoteParamsSchema"),
      response: { 200: $ref("createCommentVoteResponseSchema") }
    }
  },
    updateCommentVote
  );

  // delete vote route
  app.delete("/delete/:commentCommentId", {
    preHandler: [app.authenticate],
    schema: {
      params: $ref("getCommentVoteParamsSchema"),
      response: { 200: $ref("createCommentVoteResponseSchema") }
    }
  },
    deleteCommentVote
  );
}

export default commentVoteRoutes;