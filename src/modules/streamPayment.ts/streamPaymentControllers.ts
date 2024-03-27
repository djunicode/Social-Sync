//createStreamPayment, getStreamPayments , getMyStreamPayment
//createStreamExit, getStreamExits , getMyStreamExit 

import { CreateStreamPaymentInput, GetStreamPaymentParams , UpdateStreamPaymentInput, GetStreamPaymentsQuery } from "./streamPaymentSchema";
import prisma from "../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createStreamPayment(request: FastifyRequest<{ Body: CreateStreamPaymentInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const streamPayment = await prisma.streamPayment.create({
            data: {
                userUserId: request.user.userId,
                streamStreamId: input.streamStreamId,
                amount: input.amount
            }
        });
        return reply.status(200).send(streamPayment);
    } catch (error) {
        console.error("Error paying the stream:", error);
        return reply.status(500).send({ error: "Internal Server Error" }); // Respond with a generic error message
    }
}


export async function getMyStreamPayment(request: FastifyRequest<{Querystring:PaginationQuery,Params:GetStreamPaymentParams}>, reply: FastifyReply) {
    try {
        const streamPayment = await prisma.streamPayment.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            where: {
                userUserId: request.user.userId,
                streamStreamId:request.params.streamStreamId
            },
            select: {
                paymentId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true,
                amount:true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        if (!streamPayment) return reply.status(400).send({ error: "user has no stream payments" });
        return reply.status(200).send(streamPayment);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getStreamPayments(request: FastifyRequest<{ Params: GetStreamPaymentParams }>, reply: FastifyReply) {
    try {
        const streamPayment = await prisma.streamPayment.findMany({
            where: {
                streamStreamId: request.params.streamStreamId
            },
            select:{
                paymentId:true,
                createdAt:true,
                streamStreamId:true,
                userUserId:true,
                amount:true
            }
        })
        if (!streamPayment) return reply.status(400).send({ error: "stream has no payments" });
        return reply.status(200).send(streamPayment);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}
