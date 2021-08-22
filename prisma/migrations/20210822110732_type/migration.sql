/*
  Warnings:

  - Added the required column `type` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "type" VARCHAR(255) NOT NULL;
