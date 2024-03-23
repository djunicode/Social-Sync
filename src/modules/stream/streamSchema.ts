import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const streamBase = {
  thumbnailUrl:z.string(),
  startTimestamp: z.date(),
  endTimestamp: z.date(),
  storageUrl: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  tags: z.string().optional(),
};

const createStreamSchema = z.object({
  ...streamBase,
  userUserId: z.string(),
});

const createStreamResponseSchema = z.object({
    streamId: z.string(),
    ...streamBase,
  });

const getStreamParamsSchema = z.object({
    streamId: z.string(),
  });

const updateStreamSchema = z.object({
  ...streamBase,
});

const getStreamQuerySchema = z.object({
    limit: z.number().max(100).optional(),
  });

export type CreateStreamInput = z.infer<typeof createStreamSchema>;

export type GetStreamParams = z.infer<typeof getStreamParamsSchema>;

export type UpdateStreamInput = z.infer<typeof updateStreamSchema>;

export type GetStreamsQuery = z.infer<typeof getStreamQuerySchema>

export const { schemas: streamSchemas, $ref } = buildJsonSchemas({
  createStreamSchema,
  createStreamResponseSchema,
  getStreamParamsSchema,
  updateStreamSchema,
  getStreamQuerySchema
}, { $id: "streamSchemas" });