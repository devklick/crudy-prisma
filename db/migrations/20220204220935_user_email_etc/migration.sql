/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_address]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email_address" VARCHAR(256),
ADD COLUMN     "email_address_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password_hash" CHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_address_key" ON "user"("email_address");
