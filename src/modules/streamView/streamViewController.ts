//createStreamView, getStreamViews , getMyStreamView , updateStreamView
import { GetStreamExitParams } from "../streamExit/streamExitSchema";
import { CreateStreamInput } from "../stream/streamSchema";
import { CreateStreamViewInput, GetStreamViewParams , UpdateStreamViewInput, GetStreamViewsQuery } from "./streamViewSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createStreamView(request: FastifyRequest<{ Body: CreateStreamViewInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const streamView = await prisma.streamView.create({
            data: {
                userId: request.user.userId,
                streamId: input.streamId
            }
        });
        return reply.status(200).send(streamView);
    } catch (error) {
        console.error("Error creating stream View:", error);
        return reply.status(500).send({ error: "Internal Server Error" }); // Respond with a generic error message
    }
}


export async function getMyStreamView(request: FastifyRequest<{Querystring:PaginationQuery,Params:GetStreamViewParams}>, reply: FastifyReply) {
    try {
        const streamViews = await prisma.streamView.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where: {
                userId: request.user.userId,
                streamId:request.params.streamId
            },
            select: {
                viewId:true,
                createdAt:true,
                streamId:true,
                userId:true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return reply.status(200).send(streamViews);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStreamViews(request: FastifyRequest<{ Params: GetStreamViewParams,streamId:string }>, reply: FastifyReply) {
    try {
        const streamViews = await prisma.streamView.findMany({
            where: {
                streamId: request.params.streamId
            },
            select:{
                viewId:true,
                createdAt:true,
                streamId:true,
                userId:true
            }
        })
        if (!streamViews) return reply.status(400).send({ error: "stream does not exist" });
        return reply.status(200).send(streamViews);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateStreamView(request: FastifyRequest<{ Params: { viewId: string }, Body: UpdateStreamViewInput }>, reply: FastifyReply) {
    const input = request.body;
    const viewId = request.params.viewId;
    try {
        const existingView = await prisma.streamView.findUnique({
            where: { 
                viewId: viewId
            },
        });
        if (!existingView) {
            return reply.status(404).send({ error: "Stream view not found" });
        }
        if (existingView.userId !== request.user.userId) {
            return reply.status(403).send({ error: "wrong user" });
        }
        const updatedStreamView = await prisma.streamView.update({
            where: {
                viewId: viewId
            },
            data: {
                userId: "" 
            },
        });
        return reply.status(200).send(updatedStreamView);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}

export async function fixLiveViewers(request: FastifyRequest<{ Params: GetStreamExitParams & GetStreamViewParams,streamId:string}>, reply: FastifyReply) {
    const liveStream = await prisma.stream.findUnique({
        where: {
            streamId: request.params.streamId,
            storageUrl:""
        },
        select: {
            streamId:true,
            // thumbnailUrl:true,
            // startTimestamp:true,
            // endTimestamp:true,
            // storageUrl:true,
            // title:true,
            // description:true,
            // tags:true,
            // userUserId:true,
            // creator:{
            //     select:{
            //         username:true,
            //         _count:{
            //             select:{
            //                 CreatorSubscribers:true
            //             }
            //         }
            //     }
            // },
            _count:{
                select:{
                    Vote:true,
                    Comment:true,
                    StreamView:true
                }
            }
        }
    })
    if (!liveStream) {
        return reply.status(404).send({ message: "Stream not found or is not live." });
    }
    const streamViewsCount = await prisma.streamView.count({
        where: {
            streamId: liveStream.streamId
        }
    });

    const streamExitsCount = await prisma.streamExit.count({
        where: {
            streamStreamId: liveStream.streamId
        }
    });

    // Calculate live viewers
    const liveViewers = streamViewsCount - streamExitsCount;
    return reply.status(200).send({
        liveViewers
    });
}