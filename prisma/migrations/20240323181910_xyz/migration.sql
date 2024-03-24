-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "tags" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoTimestamp" TIMESTAMP(3) NOT NULL,
    "streamStreamId" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "CommentVote" (
    "type" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentCommentId" TEXT NOT NULL,
    "streamStreamId" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "CommentVote_pkey" PRIMARY KEY ("commentCommentId","userUserId")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_streamStreamId_fkey" FOREIGN KEY ("streamStreamId") REFERENCES "Stream"("streamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentCommentId_fkey" FOREIGN KEY ("commentCommentId") REFERENCES "Comment"("commentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_streamStreamId_fkey" FOREIGN KEY ("streamStreamId") REFERENCES "Stream"("streamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
