import { FastifyInstance } from "fastify";
import { $ref } from "./commentSchema";
import { createComment, deleteComment , getComments , getMyComments , updateComment , getMyStreamComment } from "./commentController";

async function commentRoutes(app: FastifyInstance) {

  // signup route
  app.post("/newComment",
    {
      preHandler: [app.authenticate],
      schema:
      {
        body: $ref("createCommentSchema"),
        response: { 200: $ref("createCommentResponseSchema") }
      }
    },
    createComment
  );

// get me route
  app.get("/my/:userUserId",
    {
      preHandler: [app.authenticate]
  },
    getMyComments
  );

  app.get("/:streamStreamId", {
    schema: {
      querystring: $ref("getCommentQuerySchema"),
    }
  },
    getComments
  );

  app.get("/:streamStreamId/:userUserId", {
    schema: {
      querystring: $ref("getCommentQuerySchema"),
    }
  },
    getMyStreamComment
  );

  // update user route
  app.put("/update/:commentId", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateCommentSchema"),
      response: { 200: $ref("createCommentResponseSchema") }
    }
  },
    updateComment
  );

  // patch user route
  app.delete("/delete/:commentId", {
    preHandler: [app.authenticate],
    schema: {
      response: { 200: $ref("createCommentResponseSchema") }
    }
  },
    deleteComment
  );
}

export default commentRoutes;