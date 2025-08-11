/*
  Warnings:

  - You are about to drop the column `current_value` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `initial_value` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `current_balance` to the `banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting_balance` to the `banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."banks" DROP COLUMN "current_value",
DROP COLUMN "initial_value",
DROP COLUMN "update_at",
ADD COLUMN     "current_balance" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "starting_balance" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
