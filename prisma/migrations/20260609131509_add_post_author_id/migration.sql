-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "autherId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
