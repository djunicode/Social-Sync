import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const commentBase = {
    content: z.string(),
    videoTimestamp: z.date(),
    streamStreamId: z.string(),
};

const createCommentSchema = z.object({
  ...commentBase,
});

const createCommentResponseSchema = z.object({
    ...commentBase,
    userUserId: z.string(),
    commentId: z.string()
  });

const getCommentParamsSchema = z.object({
    streamStreamId: z.string()
  });

const updateCommentSchema = z.object({
    content: z.string()
});

const getCommentQuerySchema = z.object({
    limit: z.number().max(100).optional(),
  });

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

export type GetCommentParams = z.infer<typeof getCommentParamsSchema>;

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;

export type GetCommentsQuery = z.infer<typeof getCommentQuerySchema>

export const { schemas: commentSchemas, $ref } = buildJsonSchemas({
  createCommentSchema,
  createCommentResponseSchema,
  getCommentParamsSchema,
  updateCommentSchema,
  getCommentQuerySchema
}, { $id: "commentSchemas" });