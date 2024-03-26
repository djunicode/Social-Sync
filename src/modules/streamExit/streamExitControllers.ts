//createStreamExit, getStreamExits , getMyStreamExit 

import { CreateStreamExitInput, GetStreamExitParams , UpdateStreamExitInput, GetStreamExitsQuery } from "./streamExitSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";
import { streamExists } from "../../utils/stream";

// 

export async function createStreamExit(request: FastifyRequest<{ Body: CreateStreamExitInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const streamExit = await prisma.streamExit.create({
            data: {
                userUserId: request.user.userId,
                streamStreamId: input.streamStreamId,
                videoTimestamp: input.videoTimestamp
            }
        });
        return reply.status(200).send(streamExit);
    } catch (error) {
        console.error("Error creating stream exit:", error);
        return reply.status(500).send({ error: "Internal Server Error" }); // Respond with a generic error message
    }
}


export async function getMyStreamExit(request: FastifyRequest<{Querystring:PaginationQuery,Params:GetStreamExitParams}>, reply: FastifyReply) {
    try {
        const streamExit = await prisma.streamExit.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where: {
                userUserId: request.user.userId,
                streamStreamId:request.params.streamStreamId
            },
            select: {
                streamExitId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true,
                videoTimestamp:true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return reply.status(200).send(streamExit);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStreamExits(request: FastifyRequest<{ Params: GetStreamExitParams }>, reply: FastifyReply) {
    try {
        const streamExits = await prisma.streamExit.findMany({
            where: {
                streamStreamId: request.params.streamStreamId
            },
            select:{
                streamExitId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true
            }
        })
        if (!streamExits) return reply.status(400).send({ error: "stream has no exits" });
        return reply.status(200).send(streamExits);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

// export async function updateStreamExit(request: FastifyRequest<{ Params: { streamExitId: string }, Body: UpdateStreamExitInput }>, reply: FastifyReply) {
//     const input = request.body;
//     const streamExitId = request.params.streamExitId;
//     try {
//         const existingExit = await prisma.streamExit.findUnique({
//             where: { 
//                 streamExitId: streamExitId
//             },
//         });
//         if (!existingExit) {
//             return reply.status(404).send({ error: "Stream exit not found" });
//         }
//         const updatedStreamExit = await prisma.streamExit.update({
//             where: {
//                 streamExitId:streamExitId
//             },
//             data: {

//             },
//         });
//         return reply.status(200).send(updatedStreamExit);
//     } catch (error) {
//         console.error(error);
//         return reply.status(500).send({ error: "Internal Server Error" });
//     }
// }