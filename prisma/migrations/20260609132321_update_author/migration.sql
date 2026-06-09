/*
  Warnings:

  - You are about to drop the column `autherId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_autherId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "autherId",
ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
