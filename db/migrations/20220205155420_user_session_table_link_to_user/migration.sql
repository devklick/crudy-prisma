/*
  Warnings:

  - Added the required column `user_id` to the `user_session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_session" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
