"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

import { sortTransactions } from "@/app/helpers/sortTransactions";
import { formatChartDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

const chartConfig = {
  income: {
    label: "Receitas",
    icon: TrendingUp,
    color: "#22C55E",
  },
  expense: {
    label: "Despesas",
    icon: TrendingDown,
    color: "#DC2626",
  },
} satisfies ChartConfig;

interface ChartProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const Chart = ({ transactions }: ChartProps) => {
  const chartData = sortTransactions({ transactions })
    .reverse()
    .reduce((acc: any[], transaction) => {
      const date = formatChartDate(transaction.date);
      const existingEntry = acc.find((item) => item.date === date);

      if (existingEntry) {
        existingEntry[transaction.type] += Number(transaction.value);
      } else {
        acc.push({
          date,
          income: transaction.type === "income" ? Number(transaction.value) : 0,
          expense:
            transaction.type === "expense" ? Number(transaction.value) : 0,
        });
      }

      return acc;
    }, []);

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 16.01, right: 16.01 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="income"
          type="natural"
          fill="#22C55E"
          fillOpacity={0.2}
          stroke="#22C55E"
          stackId="a"
        />
        <Area
          dataKey="expense"
          type="natural"
          fill="#DC2626"
          fillOpacity={0.2}
          stroke="#DC2626"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default Chart;
