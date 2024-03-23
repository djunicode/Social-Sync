import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const creatorBase = {
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

const createCreatorSchema = z.object({
  ...creatorBase,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, "Password must be at least 8 characters long")
});

const createCreatorResponseSchema = z.object({
  creatorId: z.string(),
  ...creatorBase,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email"
    }),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const getCreatorParamsSchema = z.object({
  creatorId: z.string().length(36, "creator id is required"),
});

const getCreatorQuerySchema = z.object({
  limit: z.number().max(100).optional(),
});

const updateCreatorSchema = z.object({
  ...creatorBase,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, "Password must be at least 8 characters long")
});

export type CreateCreatorInput = z.infer<typeof createCreatorSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type GetCreatorParams = z.infer<typeof getCreatorParamsSchema>;

export type GetCreatorsQuery = z.infer<typeof getCreatorQuerySchema>;

export type UpdateCreatorInput = z.infer<typeof updateCreatorSchema>;


export const { schemas: creatorSchemas, $ref } = buildJsonSchemas({
  createCreatorSchema,
  createCreatorResponseSchema,
  loginSchema,
  loginResponseSchema,
  getCreatorParamsSchema,
  getCreatorQuerySchema,
  updateCreatorSchema
}, { $id: "creatorSchemas" });