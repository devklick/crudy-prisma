/*
  Warnings:

  - Made the column `assigned_to_id` on table `to_do` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by_id` on table `to_do` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "to_do" DROP CONSTRAINT "to_do_assigned_to_id_fkey";

-- DropForeignKey
ALTER TABLE "to_do" DROP CONSTRAINT "to_do_created_by_id_fkey";

-- AlterTable
ALTER TABLE "to_do" ALTER COLUMN "assigned_to_id" SET NOT NULL,
ALTER COLUMN "created_by_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
