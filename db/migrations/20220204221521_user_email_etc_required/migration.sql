/*
  Warnings:

  - Made the column `email_address` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password_hash` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email_address" SET NOT NULL,
ALTER COLUMN "email_address_confirmed" DROP NOT NULL,
ALTER COLUMN "password_hash" SET NOT NULL;
