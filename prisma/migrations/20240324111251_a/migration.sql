/*
  Warnings:

  - The `tags` column on the `Stream` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `type` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentVote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dislike` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_streamStreamId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userUserId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_streamStreamId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_userUserId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "type",
ADD COLUMN     "dislike" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentVote";
