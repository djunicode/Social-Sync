import prisma from "./prisma";

export const creatorExists = async (email: string, username: string) => {
    const creator = await prisma.creator.findFirst({
        where: {
            email
        }
    })

    const creatorWithUsername = await prisma.creator.findFirst({
        where: {
            username
        }
    })
    return creator !== null || creatorWithUsername !== null;
}

export const isExistingEmailMine = async (creatorId: string, email: string | undefined ) => {
    if (!email) return true;
    const creator = await prisma.creator.findFirst({
        where: {
            email: email,
        }
    })
    return creator?creator.creatorId === creatorId:true;
}

export const isExistingUsernameMine = async (creatorId: string, username: string | undefined ) => {
    if (!username) return true;
    const creator = await prisma.creator.findFirst({
        where: {
            username: username,
        }
    })
    return creator?creator.creatorId === creatorId:true;
}