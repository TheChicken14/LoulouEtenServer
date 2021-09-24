/*
  Warnings:

  - Added the required column `userId` to the `QrCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QrCode" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "QrCode" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
