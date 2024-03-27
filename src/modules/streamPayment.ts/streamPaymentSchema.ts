import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { start } from "repl";

const streamPaymentBase = {
    amount: z.number(),
    userUserId: z.string(),
    streamStreamId: z.string()
};

const createStreamPaymentSchema = z.object({
  ...streamPaymentBase,
});

const createStreamPaymentResponseSchema = z.object({
    paymentId: z.string(),
    ...streamPaymentBase,
});

const getStreamPaymentParamsSchema = z.object({
    paymentId: z.string(),
    streamStreamId: z.string()
});

const updateStreamPaymentSchema = z.object({
  ...streamPaymentBase,
});

const getStreamPaymentQuerySchema = z.object({
    limit: z.number().max(100).optional(),
});

export type CreateStreamPaymentInput = z.infer<typeof createStreamPaymentSchema>;

export type GetStreamPaymentParams = z.infer<typeof getStreamPaymentParamsSchema>;

export type UpdateStreamPaymentInput = z.infer<typeof updateStreamPaymentSchema>;

export type GetStreamPaymentsQuery = z.infer<typeof getStreamPaymentQuerySchema>

export const { schemas: streamPaymentSchemas, $ref } = buildJsonSchemas({
  createStreamPaymentSchema,
  createStreamPaymentResponseSchema,
  getStreamPaymentParamsSchema,
  updateStreamPaymentSchema,
  getStreamPaymentQuerySchema
}, { $id: "streamPaymentSchemas" });