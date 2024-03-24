import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const voteBase = {
    dislike:z.boolean().default(false),
    videoTimestamp:z.date(),
};

const createVoteSchema = z.object({
  ...voteBase,
  streamStreamId: z.string(),
});

const createVoteResponseSchema = z.object({
    streamStreamId: z.string(),
    userUserId: z.string(),
    ...voteBase,
  });

const getVoteParamsSchema = z.object({
    streamStreamId: z.string(),
  });

const updateVoteSchema = z.object({
  ...voteBase,
});

const getVoteQuerySchema = z.object({
    limit: z.number().max(100).optional(),
  });

export type CreateVoteInput = z.infer<typeof createVoteSchema>;

export type GetVoteParams = z.infer<typeof getVoteParamsSchema>;

export type UpdateVoteInput = z.infer<typeof updateVoteSchema>;

export type GetVotesQuery = z.infer<typeof getVoteQuerySchema>

export const { schemas: voteSchemas, $ref } = buildJsonSchemas({
  createVoteSchema,
  createVoteResponseSchema,
  getVoteParamsSchema,
  updateVoteSchema,
  getVoteQuerySchema
}, { $id: "voteSchemas" });