// createSubscription, deleteSubscription , getUserSubscribers , getCreatorSubscriptions , getStreamSubscriptions 

import { CreateSubscriptionsInput, GetSubscriptionsParams , UpdateSubscriptionsInput, GetSubscriptionsQuery } from "./subscriptionsSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createSubscription(request: FastifyRequest<{ Body: CreateSubscriptionsInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const subscriptions = await prisma.subscriptions.create({
            data: {
                userUserId: request.user.userId,
                creatorUserId: input.creatorUserId,
                streamStreamId: input.streamStreamId
            }
        });
        return reply.status(200).send(subscriptions);
    } catch (error) {
        console.error("Error creating subscription:", error);
        return reply.status(500).send({ error: "Internal Server Error" }); // Respond with a generic error message
    }
}

export async function getCreatorSubscribers(request: FastifyRequest<{ Querystring: PaginationQuery, Params:GetSubscriptionsParams }>, reply: FastifyReply) {
    try {
        const subscriptions = await prisma.subscriptions.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                creatorUserId: request.params.creatorUserId
            },
            select: {
                userUserId:true,
                createdAt:true,
                creatorUserId:true,
                streamStreamId:true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(subscriptions);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getUserSubscriptionsLive(request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) {
    try {
        const subscriptons = await prisma.subscriptions.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                userUserId:request.user.userId
            },
            select: {
                userUserId:true,
                createdAt:true,
                creatorUserId:true,
                streamStreamId:true,
                User_Subscriptions_creatorUserIdToUser: {
                    select: {
                        Stream: {
                            where:{
                                storageUrl:""
                            },
                            select: {
                                streamId: true,
                                title: true,
                                startTimestamp:true,
                                StreamView:true
                            }
                        },
                        userId: true,
                        username: true,                       
                    }
                },
                Stream: {
                    select: {
                        streamId: true,
                        title: true,
                        endTimestamp: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(subscriptons);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getUserSubscriptionsStreams(request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) {
    try {
        const subscriptons = await prisma.subscriptions.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                userUserId:request.user.userId
            },
            select: {
                userUserId:true,
                createdAt:true,
                creatorUserId:true,
                streamStreamId:true,
                User_Subscriptions_creatorUserIdToUser: {
                    select: {
                        Stream: {
                            select: {
                                streamId: true,
                                title: true,
                                startTimestamp:true,
                                StreamView:true
                            }
                        },
                        userId: true,
                        username: true,                       
                    }
                },
                Stream: {
                    select: {
                        streamId: true,
                        title: true,
                        endTimestamp: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(subscriptons);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStreamSubscribers(request: FastifyRequest<{ Querystring: PaginationQuery, Params:GetSubscriptionsParams }>, reply: FastifyReply) {
    try {
        const subscriptions = await prisma.subscriptions.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where:{
                streamStreamId: request.params.streamStreamId
            },
            select: {
                userUserId:true,
                createdAt:true,
                creatorUserId:true,
                streamStreamId:true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return reply.status(200).send(subscriptions);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function deleteSubscription(request: FastifyRequest<{ Params: GetSubscriptionsParams}>, reply: FastifyReply) {
    const creatorUserId = request.params.creatorUserId;
    try {
        const deletedSubscription = await prisma.subscriptions.delete({
            where: {
                userUserId_creatorUserId:{
                    creatorUserId,
                    userUserId: request.user.userId
                }
            }
        });
        return reply.status(200).send(deletedSubscription);
    } catch (error) {
        console.error("Error deleting subscription:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}