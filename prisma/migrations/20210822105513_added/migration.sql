/*
  Warnings:

  - Added the required column `forId` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "forId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Food" ADD FOREIGN KEY ("forId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
