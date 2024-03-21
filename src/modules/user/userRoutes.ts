import { FastifyInstance } from "fastify";
import { $ref } from "./userSchema";
import { createUser, deleteUser, getMe, getUser, getUsers, loginUser, updateUser } from "./userControllers";

async function userRoutes(app: FastifyInstance) {

  // signup route
  app.post("/signup",
    {
      schema:
      {
        body: $ref("createUserSchema"),
        response: { 200: $ref("createUserResponseSchema") }
      }
    },
    createUser
  );

  // login route
  app.post("/login",
    {
      schema:
      {
        body: $ref("loginSchema"),
        response: { 200: $ref("loginResponseSchema") }
      }
    },
    loginUser
  );

  // get me route
  app.get("/me",
    {
      preHandler: [app.authenticate]
    },
    getMe
  );

  // get user by id route
  app.get("/:userId", {
    schema: {
      params: $ref("getUserParamsSchema"),
    }
  },
    getUser
  );

  // get all users route
  app.get("/all", {
    schema: {
      querystring: $ref("getUserQuerySchema"),
    }
  },
    getUsers
  );

  // update user route
  app.put("/", {
    preHandler: [app.authenticate],
    schema: {
      body: $ref("updateUserSchema"),
      response: { 200: $ref("createUserResponseSchema") }
    }
  },
    updateUser
  );

  // patch user route
  app.delete("/", {
    preHandler: [app.authenticate],
    schema: {
      response: { 200: $ref("createUserResponseSchema") }
    }
  },
    deleteUser
  );


}

export default userRoutes;