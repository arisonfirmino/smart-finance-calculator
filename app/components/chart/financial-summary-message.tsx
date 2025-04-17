import { Prisma } from "@prisma/client";

interface FinancialSummaryMessageProps {
  user: Prisma.UserGetPayload<{
    include: {
      transactions: true;
    };
  }>;
}

const FinancialSummaryMessage = ({ user }: FinancialSummaryMessageProps) => {
  const totalIncome = Number(user.total_incomes);
  const totalExpense = Number(user.total_expenses);

  let summaryMessage = "";

  if (totalIncome > totalExpense) {
    const diffPercent = ((totalIncome - totalExpense) / totalExpense) * 100;
    summaryMessage = `Você ganhou ${diffPercent.toFixed(0)}% a mais do que gastou`;
  } else if (totalExpense > totalIncome) {
    const diffPercent = ((totalExpense - totalIncome) / totalIncome) * 100;
    summaryMessage = `Você gastou ${diffPercent.toFixed(0)}% a mais do que ganhou`;
  } else {
    summaryMessage = "Você gastou exatamente o que ganhou";
  }

  return <p className="text-sm font-medium">{summaryMessage}</p>;
};

export default FinancialSummaryMessage;
