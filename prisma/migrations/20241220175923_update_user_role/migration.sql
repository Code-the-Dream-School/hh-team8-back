/*
  Warnings:

  - Made the column `user_id` on table `user_role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role_id` on table `user_role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "role_id" SET NOT NULL,
ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id", "role_id");
