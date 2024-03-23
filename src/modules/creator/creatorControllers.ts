
import { CreateCreatorInput, GetCreatorParams, GetCreatorsQuery, LoginInput, UpdateCreatorInput } from "./creatorSchema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { isExistingEmailMine, isExistingUsernameMine, creatorExists } from "../../utils/creator"
import { FastifyReply, FastifyRequest } from "fastify";

export async function createCreator(request: FastifyRequest<{ Body: CreateCreatorInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        if (await creatorExists(input.email, input.username)) return reply.status(400).send({ error: "Creator already exists" });
        // if creator does not exists, create creator
        const { hash, salt } = hashPassword(input.password);
        const creator = await prisma.creator.create({
            data: {
                email: input.email,
                username: input.username,
                firstName: input.firstName,
                lastName: input.lastName,
                dob: new Date(input.dob),
                password: hash,
                salt: salt
            }
        })

        return reply.status(200).send(creator);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function loginCreator(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const creator = await prisma.creator.findFirst({
            where: {
                email: input.email
            }
        })
        if (!creator) return reply.status(400).send({ error: "creator does not exist" });

        const isPasswordValid = verifyPassword({
            candidatePassword: input.password,
            salt: creator.salt,
            hash: creator.password
        });
        if (!isPasswordValid) return reply.status(400).send({ error: "Invalid password" });
        return reply.status(200).send({ accessToken: request.server.jwt.sign({ creatorId: creator.creatorId }) });
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
    try {
        const creator = await prisma.creator.findFirst({
            where: {
                creatorId: request.user.creatorId
            }
        })
        if (!creator) return reply.status(400).send({ error: "creator does not exist" });
        const { password, salt, ...rest } = creator;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getCreator(request: FastifyRequest<{ Params: GetCreatorParams }>, reply: FastifyReply) {
    try {
        const creator = await prisma.creator.findFirst({
            where: {
                creatorId: request.params.creatorId
            }
        })
        if (!creator) return reply.status(400).send({ error: "creator does not exist" });
        const { password, salt, ...rest } = creator;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getCreators(request: FastifyRequest<{ Querystring: GetCreatorsQuery }>, reply: FastifyReply) {
    try {
        const limit = request.query.limit ? request.query.limit : 10;
        const creators = await prisma.creator.findMany({
            take: limit,
            select: {
                creatorId: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                dob: true
            }
        })
        return reply.status(200).send(creators);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateCreator(request: FastifyRequest<{ Body: UpdateCreatorInput }>, reply: FastifyReply) {
    const input = request.body;
    const creatorId = request.user.creatorId;
    try {
        if (!await isExistingEmailMine(creatorId, input.email)) return reply.status(400).send({ error: "creator with this email aleady exists!" });
        if (!await isExistingUsernameMine(creatorId, input.username)) return reply.status(400).send({ error: "creator with this creatorname aleady exists!" });
        
        const { hash, salt } = hashPassword(input.password);
        const creator = await prisma.creator.update({
            where: {
                creatorId: creatorId
            },
            data: {
                email: input.email,
                username: input.username,
                firstName: input.firstName,
                lastName: input.lastName,
                dob: new Date(input.dob),
                password: hash,
                salt: salt
            }
        })

        return reply.status(200).send(creator);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function deleteCreator(request: FastifyRequest, reply: FastifyReply) {
    try {
        const creator = await prisma.creator.delete({
            where: {
                creatorId: request.user.creatorId
            }
        })
        if (!creator) return reply.status(400).send({ error: "creator does not exist" });
        const { password, salt, ...rest } = creator;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}