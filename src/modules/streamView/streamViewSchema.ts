import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { start } from "repl";

const streamViewBase = {
    streamId: z.string(),
    userUserId: z.string().optional()
};

const createStreamViewSchema = z.object({
  ...streamViewBase,
  streamId: z.string(),
  userUserId: z.string().optional()
});

const createStreamViewResponseSchema = z.object({
    viewId: z.string(),
    ...streamViewBase,
});

const getStreamViewParamsSchema = z.object({
    streamId: z.string(),
    userUserId: z.string().optional(),
    viewId: z.string()
});

const updateStreamViewSchema = z.object({
  userUserId: z.string().optional()
});

const getStreamViewQuerySchema = z.object({
    limit: z.number().max(100).optional(),
});

export type CreateStreamViewInput = z.infer<typeof createStreamViewSchema>;

export type GetStreamViewParams = z.infer<typeof getStreamViewParamsSchema>;

export type UpdateStreamViewInput = z.infer<typeof updateStreamViewSchema>;

export type GetStreamViewsQuery = z.infer<typeof getStreamViewQuerySchema>

export const { schemas: streamViewSchemas, $ref } = buildJsonSchemas({
  createStreamViewSchema,
  createStreamViewResponseSchema,
  getStreamViewParamsSchema,
  updateStreamViewSchema,
  getStreamViewQuerySchema
}, { $id: "streamViewSchemas" });