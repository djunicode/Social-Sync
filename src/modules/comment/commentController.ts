// createComment, deleteComment , getComments , getMyComments , updateComment

import { CreateCommentInput, GetCommentParams , UpdateCommentInput, GetCommentsQuery } from "./commentSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createComment(request: FastifyRequest<{ Body: CreateCommentInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const comment = await prisma.comment.create({
            data: {
                content:input.content,
                videoTimestamp:input.videoTimestamp,
                userUserId: request.user.userId,
                streamStreamId: input.streamStreamId
            }
        });
        return reply.status(200).send(comment);
    } catch (error) {
        console.error("Error commenting", error);
        return reply.status(500).send({ error: "Internal Server Error" }); 
    }
}

export async function getComments(request: FastifyRequest<{ Querystring: GetCommentsQuery,Params:GetCommentParams }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const live = request.query.live ? request.query.live : false;
        const comments = await prisma.comment.findMany({
            take: limit,
            where:{
                streamStreamId:request.params.streamStreamId
            },
            select: {
                commentId:true,
                content:true,
                videoTimestamp:true,
                userUserId:true,
                toxicity:true,
                streamStreamId:true,
                createdAt:true,
                user:{
                    select:{
                        username:true,
                        _count:{
                            select:{
                                CommentVote:true,
                                Comment:true,
                                StreamView:true,
                                UserSubscriptions:true
                            }
                        }
                    }                        
                },
                _count:{
                    select:{
                        CommentVote:true
                    }
                }
            },
            orderBy:live?{
                createdAt:'desc'
            }:{
                CommentVote:{
                    _count: "desc"
                }
            }
        })
        return reply.status(200).send(comments);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMyStreamComment(request: FastifyRequest<{Params:{userUserId:string,streamStreamId:string}}>, reply: FastifyReply) {
    try {
        const comment = await prisma.comment.findMany({
            where: {
                userUserId: request.params.userUserId,
                streamStreamId:request.params.streamStreamId
            }
        })
        if (!comment) return reply.status(400).send({ error: "comment does not exist" });

        return reply.status(200).send(comment);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMyComments(request: FastifyRequest<{ Querystring: GetCommentsQuery, Params:GetCommentParams }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const comments = await prisma.comment.findMany({
            take: limit,
            where:{
                userUserId:request.user.userId
            },
            select: {
                commentId:true,
                content:true,
                videoTimestamp:true,
                userUserId:true,
                streamStreamId:true,
                _count:{
                    select:{
                        CommentVote:true
                    }
                }
            }
        })
        return reply.status(200).send(comments);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateComment(request: FastifyRequest<{ Params: { commentId: string }, Body: UpdateCommentInput }>, reply: FastifyReply) {
    const { commentId } = request.params;
    const input = request.body;

    try {
        const updatedComment = await prisma.comment.update({
            where: {
                commentId:commentId
            },
            data: {
                content: input.content
            }
        });

        return reply.status(200).send(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}


export async function deleteComment(request: FastifyRequest<{ Params: { commentId:string } }>, reply: FastifyReply) {
    const {commentId} = request.params;

    try {
        const deletedComment = await prisma.comment.delete({
            where: {
                commentId:commentId
            }
        });
        return reply.status(200).send(deletedComment);
    } catch (error) {
        console.error("Error deleting comment:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}