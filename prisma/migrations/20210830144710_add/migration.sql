-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "profileId" INTEGER;

-- CreateTable
CREATE TABLE "PetProfile" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3),
    "morningFood" VARCHAR(255) NOT NULL DEFAULT E'',
    "dinnerFood" VARCHAR(255) NOT NULL DEFAULT E'',
    "extraNotes" VARCHAR(255) NOT NULL DEFAULT E'',
    "picturePath" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetProfile_petId_unique" ON "PetProfile"("petId");

-- AddForeignKey
ALTER TABLE "PetProfile" ADD FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
