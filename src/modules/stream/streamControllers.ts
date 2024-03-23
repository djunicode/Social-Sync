//createStream, deleteStream , getStream , getStreams , getMyStream , updateStream

import { CreateStreamInput, GetStreamParams , UpdateStreamInput, GetStreamsQuery } from "./streamSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

// 

export async function createStream(request: FastifyRequest<{ Body: CreateStreamInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const stream = await prisma.stream.create({
            data: {
                thumbnailUrl: input.thumbnailUrl,
                startTimestamp: new Date(input.startTimestamp),
                endTimestamp: new Date(input.endTimestamp),
                storageUrl: input.storageUrl || "", 
                title: input.title,
                description: input.description,
                tags: input.tags || "",
                userUserId: input.userUserId 
            }
        });
        return reply.status(200).send(stream);
    } catch (error) {
        console.error("Error creating stream:", error);
        return reply.status(500).send({ error: "Internal Server Error" }); // Respond with a generic error message
    }
}


export async function getMyStream(request: FastifyRequest<{Params:{userUserId:string}}>, reply: FastifyReply) {
    try {
        const stream = await prisma.stream.findFirst({
            where: {
                userUserId: request.params.userUserId
            }
        })
        if (!stream) return reply.status(400).send({ error: "User does not exist" });

        return reply.status(200).send(stream);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStream(request: FastifyRequest<{ Params: GetStreamParams }>, reply: FastifyReply) {
    try {
        const stream = await prisma.stream.findFirst({
            where: {
                streamId: request.params.streamId
            }
        })
        if (!stream) return reply.status(400).send({ error: "stream does not exist" });
        return reply.status(200).send(stream);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStreams(request: FastifyRequest<{ Querystring: GetStreamsQuery }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const streams = await prisma.stream.findMany({
            take: limit,
            select: {
                streamId:true,
                thumbnailUrl:true,
                startTimestamp:true,
                endTimestamp:true,
                storageUrl:true,
                title:true,
                description:true,
                tags:true,
                userUserId:true
            }
        })
        return reply.status(200).send(streams);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateStream(request: FastifyRequest<{ Params: {streamId: string },Body: UpdateStreamInput }>, reply: FastifyReply) {
    const input = request.body;
    const streamId = request.params.streamId // Assuming you're passing streamId as a parameter

    try {
        const updatedStream = await prisma.stream.update({
            where: {
                streamId: streamId
            },
            data: {
                thumbnailUrl: input.thumbnailUrl,
                startTimestamp: new Date(input.startTimestamp),
                endTimestamp: new Date(input.endTimestamp),
                storageUrl: input.storageUrl || "",
                title: input.title,
                description: input.description,
                tags: input.tags || ""
            }
        });

        return reply.status(200).send(updatedStream);
    } catch (error) {
        console.error("Error updating stream:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}

export async function deleteStream(request: FastifyRequest<{ Params: { streamId: string } }>, reply: FastifyReply) {
    const streamId = request.params.streamId;

    try {
        const deletedStream = await prisma.stream.delete({
            where: {
                streamId: streamId
            }
        });
        return reply.status(200).send(deletedStream);
    } catch (error) {
        console.error("Error deleting stream:", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
}