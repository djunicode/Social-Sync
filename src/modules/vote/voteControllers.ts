//createVote, deleteVote , getVotes , getMyVotes , updateVote

import { CreateVoteInput, GetVoteParams , UpdateVoteInput, GetVotesQuery } from "./voteSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createVote(request: FastifyRequest<{ Body: CreateVoteInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const vote = await prisma.vote.create({
            data: {
                type: input.type || false,
                videoTimestamp: input.videoTimestamp,
                userUserId: input.userUserId,
                streamStreamId: input.streamStreamId
            }
        });
        return reply.status(200).send(vote);
    } catch (error) {
        console.error("Error voting", error);
        return reply.status(500).send({ error: "Internal Server Error" }); 
    }
}


// export async function getMyStream(request: FastifyRequest<{Params:{userUserId:string}}>, reply: FastifyReply) {
//     try {
//         const stream = await prisma.stream.findFirst({
//             where: {
//                 userUserId: request.params.userUserId
//             }
//         })
//         if (!stream) return reply.status(400).send({ error: "User does not exist" });

//         return reply.status(200).send(stream);
//     } catch (error) {
//         console.log(error);
//         return reply.status(500).send(error);
//     }
// }

// export async function getStream(request: FastifyRequest<{ Params: GetStreamParams }>, reply: FastifyReply) {
//     try {
//         const stream = await prisma.stream.findFirst({
//             where: {
//                 streamId: request.params.streamId
//             }
//         })
//         if (!stream) return reply.status(400).send({ error: "stream does not exist" });
//         return reply.status(200).send(stream);
//     } catch (error) {
//         console.log(error);
//         return reply.status(500).send(error);
//     }
// }
export async function getVotes(request: FastifyRequest<{ Querystring: GetVotesQuery,Params:GetVoteParams }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const votes = await prisma.vote.findMany({
            take: limit,
            where:{
                streamStreamId:request.params.streamStreamId
            },
            select: {
                type:true,
                videoTimestamp:true,
                userUserId:true,
                streamStreamId:true
            }
        })
        return reply.status(200).send(votes);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMyVotes(request: FastifyRequest<{ Querystring: GetVotesQuery, Params:GetVoteParams }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const streams = await prisma.vote.findMany({
            take: limit,
            where:{
                userUserId:request.params.userUserId
            },
            select: {
                type:true,
                videoTimestamp:true,
                userUserId:true,
                streamStreamId:true
            }
        })
        return reply.status(200).send(streams);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateVote(request: FastifyRequest<{ Params: { streamStreamId: string, userUserId: string }, Body: UpdateVoteInput }>, reply: FastifyReply) {
    const { streamStreamId, userUserId } = request.params;
    const input = request.body;

    try {
        const updatedVote = await prisma.vote.update({
            where: {
                streamStreamId_userUserId: {
                    streamStreamId,
                    userUserId
                }
            },
            data: {
                type: input.type,
                videoTimestamp: new Date(input.videoTimestamp)
            }
        });

        return reply.status(200).send(updatedVote);
    } catch (error) {
        console.error("Error updating vote:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}


export async function deleteVote(request: FastifyRequest<{ Params: { streamStreamId: string,userUserId:string } }>, reply: FastifyReply) {
    const {streamStreamId,userUserId} = request.params;

    try {
        const deletedVote = await prisma.vote.delete({
            where: {
                streamStreamId_userUserId: {
                    streamStreamId,
                    userUserId
                }
            }
        });
        return reply.status(200).send(deletedVote);
    } catch (error) {
        console.error("Error deleting vote:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}