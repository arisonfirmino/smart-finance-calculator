/*
  Warnings:

  - Changed the type of `value` on the `expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `incomes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `balance` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `total_incomes` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `total_expenses` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "value",
ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "value",
ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "balance",
ADD COLUMN     "balance" DECIMAL(10,2) NOT NULL,
DROP COLUMN "total_incomes",
ADD COLUMN     "total_incomes" DECIMAL(10,2) NOT NULL,
DROP COLUMN "total_expenses",
ADD COLUMN     "total_expenses" DECIMAL(10,2) NOT NULL;
