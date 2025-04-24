/*
  Warnings:

  - You are about to drop the column `total_incomes` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "total_incomes",
ADD COLUMN     "total_income" DECIMAL(10,2) NOT NULL DEFAULT 0.00;
