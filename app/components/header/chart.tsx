"use client";

import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

import { formatDate } from "@/app/helpers/formatDate";

import { Transaction } from "@/app/types";

const Chart = ({ transactions }: { transactions: Transaction[] }) => {
  const chartData = transactions
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredData = chartData.reduce(
    (acc, transaction) => {
      const date = formatDate(transaction.date);
      const found = acc.find((item) => item.date === date);

      if (found) {
        if (transaction.type === "income") {
          found.income += Number(transaction.amount);
        } else if (transaction.type === "expense") {
          found.expense += Number(transaction.amount);
        }
      } else {
        acc.push({
          date: date,
          income:
            transaction.type === "income" ? Number(transaction.amount) : 0,
          expense:
            transaction.type === "expense" ? Number(transaction.amount) : 0,
        });
      }
      return acc;
    },
    [] as { date: string; income: number; expense: number }[],
  );

  const chartConfig = {
    income: {
      label: "Receitas",
      color: "var(--income)",
    },
    expense: {
      label: "Despesas",
      color: "var(--expense)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="px-5 py-2.5">
        <CardTitle>Resumo financeiro</CardTitle>
        <CardDescription className="text-foreground/50 text-xs">
          Últimos 3 meses
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-1">
        <ChartContainer config={chartConfig}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--income)" stopOpacity={0.8} />
                <stop
                  offset="95%"
                  stopColor="var(--income)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
