import prisma from "./prisma"

export const commentExists = async (commentId: string, userId: string) => {
    const comment = await prisma.comment.findFirst({
        where: {
            commentId: commentId,
            userUserId: userId
        }
    })
    return comment !== null;
}

export const isComment = async (commentId: string) => {
    const comment = await prisma.comment.findFirst({
        where: {
            commentId: commentId
        }
    })
    return comment !== null;
}

export const myCommentVoteExists = async (streamId: string, userId: string) => {
    const comment = await prisma.commentVote.findFirst({
        where: {
            commentCommentId: streamId,
            userUserId: userId
        }
    })
    return comment;
}



