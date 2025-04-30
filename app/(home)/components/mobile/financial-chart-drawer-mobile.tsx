import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import FinancialChart from "@/app/components/chart/financial-chart";

import { Prisma } from "@prisma/client";
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import { PieChartIcon } from "hugeicons-react";

interface FinancialChartDrawerMobileProps {
  user: Prisma.UserGetPayload<{
    include: {
      transactions: true;
    };
  }>;
}

const FinancialChartDrawerMobile = ({
  user,
}: FinancialChartDrawerMobileProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "outline",
            className: "md:hidden",
          }),
        )}
      >
        <PieChartIcon />
      </DrawerTrigger>

      <DrawerContent className="md:hidden">
        <DrawerTitle className="hidden">Resumo financeiro</DrawerTitle>
        <FinancialChart user={user} />
      </DrawerContent>
    </Drawer>
  );
};

export default FinancialChartDrawerMobile;
