import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: {
    banks: { include: { transactions: true } };
    transactions: { include: { bank: { include: { transactions: true } } } };
  };
}>;

export type Bank = Prisma.BankGetPayload<{
  include: { transactions: true };
}>;

export type Transaction = Prisma.TransactionGetPayload<{
  include: { bank: { include: { transactions: true } } };
}>;
