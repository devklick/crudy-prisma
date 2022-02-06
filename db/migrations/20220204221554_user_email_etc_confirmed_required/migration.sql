/*
  Warnings:

  - Made the column `email_address_confirmed` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email_address_confirmed" SET NOT NULL;
