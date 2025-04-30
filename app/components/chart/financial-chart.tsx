"use client";

import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Separator } from "@/app/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

import { formatDate, formatPeriod } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface FinancialChartProps {
  user: Prisma.UserGetPayload<{
    include: {
      transactions: true;
    };
  }>;
}

const FinancialChart = ({ user }: FinancialChartProps) => {
  const income = Number(user.total_income);
  const expenses = Number(user.total_expenses);
  const transactions = user.transactions;

  const dates = transactions
    .map((transaction) => new Date(transaction.date))
    .sort((a, b) => a.getTime() - b.getTime());

  const chartData = [
    {
      label: "income",
      amount: income,
      fill: "var(--chart-1)",
    },
    {
      label: "expense",
      amount: expenses,
      fill: "var(--chart-2)",
    },
  ];

  const chartConfig = {
    income: {
      label: "Receitas",
      color: "hsl(var(--chart-1))",
    },
    expenses: {
      label: "Despesas",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Separator className="hidden md:flex" />

      <Card className="flex w-full flex-col justify-between gap-5 md:aspect-square md:gap-0">
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-sm font-medium uppercase">
            Resumo financeiro
          </CardTitle>
          <CardDescription className="text-foreground/50 text-xs uppercase">
            {dates.length === 1
              ? formatDate(dates[0])
              : `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-60"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="label"
                innerRadius={60}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="px-5 pb-5 md:pb-2.5">
          <p className="text-sm font-medium">
            Período {dates.length > 1 ? `de ${formatPeriod(dates)}` : "único"}
          </p>

          {income > 0 && expenses === 0 && (
            <p className="text-foreground/50 text-xs">
              Apenas receitas neste período.
            </p>
          )}

          {income === 0 && expenses > 0 && (
            <p className="text-foreground/50 text-xs">
              Apenas despesas neste período.
            </p>
          )}

          {income > 0 && expenses > 0 && (
            <p className="text-foreground/50 text-xs">
              {income < expenses
                ? `Gastos em ${(((expenses - income) / income) * 100).toFixed()}% a mais`
                : `Ganhos em ${(((income - expenses) / income) * 100).toFixed()}% a mais`}{" "}
              neste período.
            </p>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default FinancialChart;
