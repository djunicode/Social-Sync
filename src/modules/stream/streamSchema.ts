import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { start } from "repl";

const streamBase = {
  thumbnailUrl:z.string(),
  startTimestamp: z.date(),
  endTimestamp: z.date().optional(),
  storageUrl: z.string().default(""),
  title: z.string(),
  description: z.string().default(""),
  tags: z.array(z.string()).default([]),
};

const createStreamSchema = z.object({
  ...streamBase,
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