-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "initial_balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "current_balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
