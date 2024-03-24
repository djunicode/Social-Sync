import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const paginationQuerySchema = z.object({
    limit: z.number().max(100).default(20),
    page: z.number().default(0),
  })


export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export const { schemas: globalSchemas, $ref : $globalRef } = buildJsonSchemas({
    paginationQuerySchema
  }, { $id: "globalSchemas" });