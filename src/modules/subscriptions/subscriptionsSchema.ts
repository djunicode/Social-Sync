import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const subscriptionsBase = {
    creatorUserId: z.string(),
    userUserId: z.string(),
    streamStreamId: z.string().optional()
};

const createSubscriptionsSchema = z.object({
  ...subscriptionsBase,
});

const createSubscriptionsResponseSchema = z.object({
    ...subscriptionsBase,
    creatorUserId: z.string(),
    userUserId: z.string(),
});

const getSubscriptionsParamsSchema = z.object({
    creatorUserId: z.string(),
    userUserId: z.string(),
    streamStreamId: z.string().optional()
});

const updateSubscriptionsSchema = z.object({
  ...subscriptionsBase,
});

const getSubscriptionsQuerySchema = z.object({
    limit: z.number().max(100).optional(),
});

export type CreateSubscriptionsInput = z.infer<typeof createSubscriptionsSchema>;

export type GetSubscriptionsParams = z.infer<typeof getSubscriptionsParamsSchema>;

export type UpdateSubscriptionsInput = z.infer<typeof updateSubscriptionsSchema>;

export type GetSubscriptionsQuery = z.infer<typeof getSubscriptionsQuerySchema>

export const { schemas: subscriptionsSchemas, $ref } = buildJsonSchemas({
  createSubscriptionsSchema,
  createSubscriptionsResponseSchema,
  getSubscriptionsParamsSchema,
  updateSubscriptionsSchema,
  getSubscriptionsQuerySchema
}, { $id: "subscriptionsSchemas" });