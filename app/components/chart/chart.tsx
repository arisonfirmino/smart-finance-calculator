import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Transaction } from "@prisma/client";

interface ChartProps {
  transactions: Transaction[];
  select: string;
}

const Chart = ({ transactions, select }: ChartProps) => {
  const monthlyData: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((transaction) => {
    const month = format(new Date(transaction.date), "MMMM", { locale: ptBR });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      monthlyData[month].income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      monthlyData[month].expense += Number(transaction.amount);
    }
  });

  const orderedMonths = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const data = orderedMonths.map((monthName) => {
    return {
      month: monthName,
      income: monthlyData[monthName]?.income || 0,
      expense: monthlyData[monthName]?.expense || 0,
    };
  });

  const chartData = select === "1st" ? data.slice(0, 6) : data.slice(6, 12);

  const chartConfig = {
    income: {
      label: "income",
      color: "#22C55E",
    },
    expense: {
      label: "expense",
      color: "#DC2626",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} opacity={0.2} />
        <XAxis
          dataKey="month"
          tickLine={{ opacity: 0.3 }}
          tickMargin={4}
          axisLine={{ opacity: 0.3 }}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey="income"
          fill="var(--color-income)"
          fillOpacity={0.9}
          stroke="var(--color-income)"
          radius={3}
        />
        <Bar
          dataKey="expense"
          fill="var(--color-expense)"
          fillOpacity={0.9}
          stroke="var(--color-expense)"
          radius={3}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default Chart;
