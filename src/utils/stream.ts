import prisma from "./prisma"

export const streamExists = async (streamId: string, userId: string) => {
    const stream = await prisma.stream.findFirst({
        where: {
            streamId: streamId,
            userUserId: userId
        }
    })

    return stream !== null;
}

export const isStream = async (streamId: string) => {
    const stream = await prisma.stream.findFirst({
        where: {
            streamId: streamId
        }
    })

    return stream !== null;
}

export const myStreamVoteExists = async (streamId: string, userId: string) => {
    const stream = await prisma.vote.findFirst({
        where: {
            streamStreamId: streamId,
            userUserId: userId
        }
    })

    return stream;
}



