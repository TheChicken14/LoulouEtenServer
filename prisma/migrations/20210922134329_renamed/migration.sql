/*
  Warnings:

  - You are about to drop the column `profileId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `picturePath` on the `PetProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "PetProfile" DROP COLUMN "picturePath",
ADD COLUMN     "pictureName" VARCHAR(255);
