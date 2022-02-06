/*
  Warnings:

  - A unique constraint covering the columns `[session_token]` on the table `user_session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_session_session_token_key" ON "user_session"("session_token");
