-- AlterTable
ALTER TABLE "to_do" ADD COLUMN     "assigned_to_id" INTEGER,
ADD COLUMN     "created_by_id" INTEGER;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(64) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "to_do" ADD CONSTRAINT "to_do_assigned_to_id_fkey" FOREIGN KEY ("assigned_to_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
