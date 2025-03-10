/*
  Warnings:

  - You are about to alter the column `initial_balance` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `current_balance` on the `banks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `balance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "banks" ALTER COLUMN "initial_balance" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "current_balance" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "total_expenses" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "total_incomes" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bankId" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
