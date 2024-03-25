import prisma from "./prisma"

export const userExists = async (email: string, username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    const userWithUsername = await prisma.user.findFirst({
        where: {
            username
        }
    })

    return user !== null || userWithUsername !== null;
}

export const isExistingEmailMine = async (userId: string, email: string | undefined ) => {
    if (!email) return true;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    return user?user.userId === userId:true;
}

export const isExistingUsernameMine = async (userId: string, username: string | undefined ) => {
    if (!username) return true;
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    })
    
    return user?user.userId === userId:true;
}


export const isUser = async (userId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            userId
        }
    })

    return user !== null;
}