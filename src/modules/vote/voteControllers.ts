//createVote, deleteVote , getVotes , getMyVotes , updateVote

import { CreateVoteInput, GetVoteParams , UpdateVoteInput, GetVotesQuery } from "./voteSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { isStream, myStreamVoteExists, streamExists } from "../../utils/stream";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createVote(request: FastifyRequest<{ Body: CreateVoteInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const myExistingVote = await myStreamVoteExists(input.streamStreamId, request.user.userId);
        if(myExistingVote){
            const vote = await prisma.vote.update({
                where: {
                    streamStreamId_userUserId: {
                        streamStreamId: input.streamStreamId,
                        userUserId: request.user.userId
                    }
                },
                data: {
                    dislike: !myExistingVote.dislike,
                    videoTimestamp: new Date(input.videoTimestamp),
                    createdAt: new Date()
                }
            });
            return reply.status(200).send(vote);
        }
        if(! await isStream(input.streamStreamId)) return reply.status(400).send({error: "Stream does not exist"})
        const vote = await prisma.vote.create({
            data: {
                dislike: input.dislike,
                videoTimestamp: input.videoTimestamp,
                userUserId: request.user.userId,
                streamStreamId: input.streamStreamId
            }
        });
        return reply.status(200).send(vote);
    } catch (error) {
        console.error("Error voting", error);
        return reply.status(500).send({ error: "Internal Server Error" }); 
    }
}

export async function getVotes(request: FastifyRequest<{ Querystring: PaginationQuery, Params:GetVoteParams }>, reply: FastifyReply) {
    try {
        const votes = await prisma.vote.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                streamStreamId:request.params.streamStreamId
            },
            select: {
                dislike:true,
                videoTimestamp:true,
                userUserId:true,
                streamStreamId:true,
                createdAt:true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(votes);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMyVotes(request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) {
    try {
        const votes = await prisma.vote.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                userUserId:request.user.userId
            },
            select: {
                dislike:true,
                videoTimestamp:true,
                userUserId:true,
                streamStreamId:true,
                createdAt:true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(votes);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateVote(request: FastifyRequest<{ Params: GetVoteParams, Body: UpdateVoteInput }>, reply: FastifyReply) {
    const { streamStreamId } = request.params;
    const input = request.body;

    try {
        if(!await myStreamVoteExists(streamStreamId, request.user.userId)) return reply.status(400).send({error: "Vote does not exist"});
        const updatedVote = await prisma.vote.update({
            where: {
                streamStreamId_userUserId: {
                    streamStreamId,
                    userUserId: request.user.userId
                }
            },
            data: {
                dislike: input.dislike,
                videoTimestamp: new Date(input.videoTimestamp),
                createdAt: new Date()
            }
        });

        return reply.status(200).send(updatedVote);
    } catch (error) {
        console.error("Error updating vote:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}


export async function deleteVote(request: FastifyRequest<{ Params: GetVoteParams}>, reply: FastifyReply) {
    const {streamStreamId} = request.params;

    try {
        if(!await myStreamVoteExists(streamStreamId, request.user.userId)) return reply.status(400).send({error: "Vote does not exist"});
        const deletedVote = await prisma.vote.delete({
            where: {
                streamStreamId_userUserId: {
                    streamStreamId,
                    userUserId: request.user.userId
                }
            }
        });
        return reply.status(200).send(deletedVote);
    } catch (error) {
        console.error("Error deleting vote:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}