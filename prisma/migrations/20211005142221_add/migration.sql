-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "fcmToken" VARCHAR(255) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
