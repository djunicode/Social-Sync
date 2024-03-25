//createCommentVote, deleteCommentVote , getCommentVotes , getMyCommentVotes , updateCommentVote

import { CreateCommentVoteInput, GetCommentVoteParams , UpdateCommentVoteInput, GetCommentVotesQuery } from "./cVoteSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { isComment, myCommentVoteExists, commentExists } from "../../utils/commentVote";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createCommentVote(request: FastifyRequest<{ Body: CreateCommentVoteInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const myExistingCommentVote = await myCommentVoteExists(input.commentCommentId, request.user.userId);
        if(myExistingCommentVote){
            const commentVote = await prisma.commentVote.update({
                where: {
                    commentCommentId_userUserId: {
                        commentCommentId: input.commentCommentId,
                        userUserId: request.user.userId
                    }
                },
                data: {
                    dislike: !myExistingCommentVote.dislike,
                    createdAt: new Date()
                }
            });
            return reply.status(200).send(commentVote);
        }
        if(!await isComment(input.commentCommentId)) return reply.status(400).send({error: "comment does not exist"})
        const commentVote = await prisma.commentVote.create({
            data: {
                dislike: input.dislike,
                userUserId: request.user.userId,
                commentCommentId: input.commentCommentId
            }
        });
        return reply.status(200).send(commentVote);
    } catch (error) {
        console.error("Error voting the comment", error);
        return reply.status(500).send({ error: "Internal Server Error" }); 
    }
}

export async function getCommentVotes(request: FastifyRequest<{ Querystring: PaginationQuery, Params:GetCommentVoteParams }>, reply: FastifyReply) {
    try {
        const commentVotes = await prisma.commentVote.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                commentCommentId:request.params.commentCommentId
            },
            select: {
                dislike:true,
                userUserId:true,
                commentCommentId:true,
                createdAt:true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(commentVotes);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMyCommentVotes(request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) {
    try {
        const votes = await prisma.commentVote.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                userUserId:request.user.userId
            },
            select: {
                dislike:true,
                userUserId:true,
                commentCommentId:true,
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

export async function updateCommentVote(request: FastifyRequest<{ Params: GetCommentVoteParams, Body: UpdateCommentVoteInput }>, reply: FastifyReply) {
    const { commentCommentId } = request.params;
    const input = request.body;

    try {
        if(!await myCommentVoteExists(commentCommentId, request.user.userId)) return reply.status(400).send({error: "Vote does not exist"});
        const updatedVote = await prisma.commentVote.update({
            where: {
                commentCommentId_userUserId: {
                    commentCommentId,
                    userUserId: request.user.userId
                }
            },
            data: {
                dislike: input.dislike,
                createdAt: new Date()
            }
        });

        return reply.status(200).send(updatedVote);
    } catch (error) {
        console.error("Error updating vote:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}


export async function deleteCommentVote(request: FastifyRequest<{ Params: GetCommentVoteParams}>, reply: FastifyReply) {
    const {commentCommentId} = request.params;

    try {
        if(!await myCommentVoteExists(commentCommentId, request.user.userId)) return reply.status(400).send({error: "Vote does not exist"});
        const deletedVote = await prisma.commentVote.delete({
            where: {
                commentCommentId_userUserId: {
                    commentCommentId,
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