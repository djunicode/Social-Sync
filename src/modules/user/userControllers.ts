
import { CreateUserInput, GetUserParams, GetUsersQuery, LoginInput, UpdateUserInput } from "./userSchema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { isExistingEmailMine, isExistingUsernameMine, userExists } from "../../utils/user";
import { FastifyReply, FastifyRequest } from "fastify";
import { PaginationQuery } from "../../utils/globalSchemas";

export async function createUser(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        if (await userExists(input.email, input.username)) return reply.status(400).send({ error: "User already exists" });
        // if user does not exists, create user
        const { hash, salt } = hashPassword(input.password);
        const user = await prisma.user.create({
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

        return reply.status(200).send(user);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function loginUser(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const input = request.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: input.email
            }
        })
        if (!user) return reply.status(400).send({ error: "User does not exist" });

        const isPasswordValid = verifyPassword({
            candidatePassword: input.password,
            salt: user.salt,
            hash: user.password
        });
        if (!isPasswordValid) return reply.status(400).send({ error: "Invalid password" });
        return reply.status(200).send({ accessToken: request.server.jwt.sign({ userId: user.userId }) });
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userId: request.user.userId
            }
        })
        if (!user) return reply.status(400).send({ error: "User does not exist" });
        const { password, salt, ...rest } = user;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getUser(request: FastifyRequest<{ Params: GetUserParams }>, reply: FastifyReply) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userId: request.params.userId
            }
        })
        if (!user) return reply.status(400).send({ error: "User does not exist" });
        const { password, salt, ...rest } = user;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function getUsers(request: FastifyRequest<{ Querystring: PaginationQuery }>, reply: FastifyReply) {
    try {
        const users = await prisma.user.findMany({
            take: request.query.limit,
            skip: request.query.limit * (request.query.page),
            select: {
                userId: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                dob: true
            }
        })
        return reply.status(200).send(users);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function updateUser(request: FastifyRequest<{ Body: UpdateUserInput }>, reply: FastifyReply) {
    const input = request.body;
    const userId = request.user.userId;
    try {
        if (!await isExistingEmailMine(userId, input.email)) return reply.status(400).send({ error: "User with this email aleady exists!" });
        if (!await isExistingUsernameMine(userId, input.username)) return reply.status(400).send({ error: "User with this username aleady exists!" });
        
        const { hash, salt } = hashPassword(input.password);
        const user = await prisma.user.update({
            where: {
                userId: userId
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

        return reply.status(200).send(user);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = await prisma.user.delete({
            where: {
                userId: request.user.userId
            }
        })
        if (!user) return reply.status(400).send({ error: "User does not exist" });
        const { password, salt, ...rest } = user;
        return reply.status(200).send(rest);
    } catch (error) {
        console.log(error);
        return reply.status(500).send(error);
    }
}