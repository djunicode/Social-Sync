import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const commentVoteBase = {
    dislike:z.boolean().default(false),
    videoTimestamp:z.date(),
};

const createCommentVoteSchema = z.object({
  ...commentVoteBase,
  commentCommentId: z.string(),
});

const createCommentVoteResponseSchema = z.object({
    commentCommentId: z.string(),
    userUserId: z.string(),
    ...commentVoteBase,
  });

const getCommentVoteParamsSchema = z.object({
    commentCommentId: z.string(),
  });

const updateCommentVoteSchema = z.object({
  ...commentVoteBase,
});

const getCommentVoteQuerySchema = z.object({
    limit: z.number().max(100).optional(),
  });

export type CreateCommentVoteInput = z.infer<typeof createCommentVoteSchema>;

export type GetCommentVoteParams = z.infer<typeof getCommentVoteParamsSchema>;

export type UpdateCommentVoteInput = z.infer<typeof updateCommentVoteSchema>;

export type GetCommentVotesQuery = z.infer<typeof getCommentVoteQuerySchema>

export const { schemas: commentVoteSchemas, $ref } = buildJsonSchemas({
  createCommentVoteSchema,
  createCommentVoteResponseSchema,
  getCommentVoteParamsSchema,
  updateCommentVoteSchema,
  getCommentVoteQuerySchema
}, { $id: "commentVoteSchemas" });