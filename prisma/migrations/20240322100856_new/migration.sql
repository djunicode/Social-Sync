/*
  Warnings:

  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Creator";

-- CreateTable
CREATE TABLE "Stream" (
    "streamId" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "startTimestamp" TIMESTAMP(3) NOT NULL,
    "endTimestamp" TIMESTAMP(3) NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("streamId")
);

-- CreateTable
CREATE TABLE "Vote" (
    "type" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoTimestamp" TIMESTAMP(3) NOT NULL,
    "streamStreamId" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("streamStreamId","userUserId")
);

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_streamStreamId_fkey" FOREIGN KEY ("streamStreamId") REFERENCES "Stream"("streamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
