import { FastifyInstance } from "fastify";
import { $ref } from "./creatorSchema";
import { createCreator, deleteCreator, getMe, getCreator, getCreators, loginCreator, updateCreator} from "./creatorControllers"

async function creatorRoutes(app: FastifyInstance) {

  // signup route
  app.post("/signup/creator",
    {
      schema:
      {
        body: $ref("createCreatorSchema"),
        response: { 200: $ref("createCreatorResponseSchema") }
      }
    },
    createCreator
  );

  // login route
  app.post("/login/creator",
    {
      schema:
      {
        body: $ref("loginSchema"),
        response: { 200: $ref("loginResponseSchema") }
      }
    },
    loginCreator
  );

  // get me route
  app.get("/me",
    {
      preHandler: [app.authenticate]
    },
    getMe
  );

  app.get("/:creatorId", {
    schema: {
      params: $ref("getCreatorParamsSchema"),
    }
  },
    getCreator
  );

  // get all users route
  app.get("/allCreator", {
    schema: {
      querystring: $ref("getCreatorQuerySchema"),
    }
  },
    getCreators
  );

  // update creator route
  app.put("/", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateCreatorSchema"),
      response: { 200: $ref("createCreatorResponseSchema") }
    }
  },
    updateCreator
  );

  // patch user route
  app.delete("/", {
    preHandler: [app.authenticate],
    schema: {
      response: { 200: $ref("createCreatorResponseSchema") }
    }
  },
    deleteCreator
  );


}

export default creatorRoutes;