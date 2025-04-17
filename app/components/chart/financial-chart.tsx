"use client";

import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import Chart from "@/app/components/chart/chart";
import FinancialSummaryMessage from "@/app/components/chart/financial-summary-message";

import { ChartColumnIcon, RefreshCcwIcon } from "lucide-react";

import { formatRange } from "@/app/helpers/formatRange";

import { Prisma } from "@prisma/client";

interface FinancialChartProps {
  user: Prisma.UserGetPayload<{
    include: {
      transactions: true;
    };
  }>;
}

const FinancialChart = ({ user }: FinancialChartProps) => {
  const [select, setSelect] = useState<"1st" | "2st">("1st");

  return (
    <Drawer>
      <DrawerTrigger className="text-foreground/50 hover:text-foreground active:text-foreground cursor-pointer">
        <ChartColumnIcon size={16} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row items-center justify-between p-5 pb-2.5 text-start">
          <div>
            <DrawerTitle className="text-sm">
              Visão Financeira Mensal
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              {select === "1st" ? "Janeiro - Junho" : "Julho - Dezembro"}
            </DrawerDescription>
          </div>

          <Button
            onClick={() => setSelect(select === "1st" ? "2st" : "1st")}
            variant="outline"
            className="size-9 rounded-xl"
          >
            <RefreshCcwIcon />
          </Button>
        </DrawerHeader>

        <Chart transactions={user.transactions} select={select} />

        <DrawerFooter>
          <p className="text-foreground/50 text-xs lowercase">
            {formatRange(user.transactions)}
          </p>
          <FinancialSummaryMessage user={user} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FinancialChart;
