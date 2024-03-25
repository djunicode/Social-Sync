import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userBase = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email"
    }),
  username: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  dob: z.string() || z.date() || z.number(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
};

const createUserSchema = z.object({
  ...userBase,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, "Password must be at least 8 characters long")
});

const createUserResponseSchema = z.object({
  userId: z.string(),
  ...userBase,
});

const loginSchema = z.object({
  emailUsername: z
    .string({
      required_error: "Email/Username is required",
      invalid_type_error: "Email/Username must be a string",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const getUserParamsSchema = z.object({
  userId: z.string().length(36, "User id is required"),
});

const getUserQuerySchema = z.object({
  limit: z.number().max(100).optional(),
});

const updateUserSchema = z.object({
  ...userBase,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, "Password must be at least 8 characters long")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type GetUserParams = z.infer<typeof getUserParamsSchema>;

export type GetUsersQuery = z.infer<typeof getUserQuerySchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;


export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  getUserParamsSchema,
  getUserQuerySchema,
  updateUserSchema
}, { $id: "userSchemas" });