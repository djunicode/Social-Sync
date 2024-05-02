import { User } from "@prisma/client";
import prisma from "./prisma"

export const userExists = async (email: string, username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    })

    return user !== null;
}

export const isExistingEmailMine = async (userId: string, email: string | undefined) => {
    if (!email) return true;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    return user ? user.userId === userId : true;
}

export const isExistingUsernameMine = async (userId: string, username: string | undefined) => {
    if (!username) return true;
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    })

    return user ? user.userId === userId : true;
}


export const isUser = async (userId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            userId
        }
    })

    return user !== null;
}

export const getUser = async (userId: string): Promise<User|null> => {
    const user = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    return user;
}