-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "invitationCode" VARCHAR(255) NOT NULL,
    "fromId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
