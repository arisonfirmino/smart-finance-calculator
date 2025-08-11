-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "total_expenses" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "total_income" DECIMAL(10,2) NOT NULL DEFAULT 0.00;
