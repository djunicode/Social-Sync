import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { start } from "repl";

const streamExitBase = {
    videoTimestamp: z.date(),
    streamStreamId: z.string(),
    userUserId: z.string(),
};

const createStreamExitSchema = z.object({
  ...streamExitBase,
});

const createStreamExitResponseSchema = z.object({
    streamExitId: z.string(),
    ...streamExitBase,
});

const getStreamExitParamsSchema = z.object({
    streamExitId: z.string(),
    streamStreamId: z.string()
});

const updateStreamExitSchema = z.object({
  ...streamExitBase,
});

const getStreamExitQuerySchema = z.object({
    limit: z.number().max(100).optional(),
});

export type CreateStreamExitInput = z.infer<typeof createStreamExitSchema>;

export type GetStreamExitParams = z.infer<typeof getStreamExitParamsSchema>;

export type UpdateStreamExitInput = z.infer<typeof updateStreamExitSchema>;

export type GetStreamExitsQuery = z.infer<typeof getStreamExitQuerySchema>

export const { schemas: streamExitSchemas, $ref } = buildJsonSchemas({
  createStreamExitSchema,
  createStreamExitResponseSchema,
  getStreamExitParamsSchema,
  updateStreamExitSchema,
  getStreamExitQuerySchema
}, { $id: "streamExitSchemas" });