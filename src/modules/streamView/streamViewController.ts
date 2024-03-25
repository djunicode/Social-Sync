//createStreamView, getStreamViews , getMyStreamView , updateStreamView

import { CreateStreamViewInput, GetStreamViewParams , UpdateStreamViewInput, GetStreamViewsQuery } from "./streamViewSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";
import { streamExists } from "../../utils/stream";

// 

export async function createStreamView(request: FastifyRequest<{ Body: CreateStreamViewInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const streamView = await prisma.streamView.create({
            data: {
                userUserId: request.user.userId,
                streamStreamId: input.streamStreamId
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
                userUserId: request.user.userId,
                streamStreamId:request.params.streamStreamId
            },
            select: {
                viewId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true,
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

export async function getStreamViews(request: FastifyRequest<{ Params: GetStreamViewParams }>, reply: FastifyReply) {
    try {
        const streamViews = await prisma.streamView.findMany({
            where: {
                streamStreamId: request.params.streamStreamId
            },
            select:{
                viewId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true
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
        if (existingView.userUserId !== request.user.userId) {
            return reply.status(403).send({ error: "wrong user" });
        }
        const updatedStreamView = await prisma.streamView.update({
            where: {
                viewId: viewId
            },
            data: {
                userUserId: "" 
            },
        });
        return reply.status(200).send(updatedStreamView);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}