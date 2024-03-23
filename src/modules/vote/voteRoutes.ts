import { FastifyInstance } from "fastify";
import { $ref } from "./voteSchema";
import { createVote, deleteVote , getVotes , getMyVotes , updateVote } from "./voteControllers";

async function voteRoutes(app: FastifyInstance) {

  // signup route
  app.post("/newVote",
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

// get me route
  app.get("/my/:userUserId",
    {
      preHandler: [app.authenticate]
  },
    getMyVotes
  );

  app.get("/:streamStreamId", {
    schema: {
      querystring: $ref("getVoteQuerySchema"),
    }
  },
    getVotes
  );

  // update user route
  app.put("/update/:streamStreamId/:userUserId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateVoteSchema"),
      response: { 200: $ref("createVoteResponseSchema") }
    }
  },
    updateVote
  );

  // patch user route
  app.delete("/delete/:streamStreamId/:userUserId", {
    preHandler: [app.authenticate],
    schema: {
      response: { 200: $ref("createVoteResponseSchema") }
    }
  },
    deleteVote
  );
}

export default voteRoutes;