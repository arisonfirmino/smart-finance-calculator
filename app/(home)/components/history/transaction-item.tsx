import BankItem from "@/app/components/bank-badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { DotIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Prisma } from "@prisma/client";
import { formatDate } from "@/app/helpers/formatDate";
import DeleteTransaction from "./delete-transaction";

interface TransactionItemProps {
  transaction: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2 capitalize">
            {transaction.type === "income" ? (
              <TrendingUpIcon size={16} className="text-green-500" />
            ) : (
              <TrendingDownIcon size={16} className="text-red-600" />
            )}
            {transaction.label}
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1">
          <div className="flex items-center gap-1">
            <p className="font-medium">
              {formatCurrency(Number(transaction.value))}
            </p>
            <DotIcon size={16} className="text-muted-foreground" />
            <BankItem
              icon={transaction.bank.icon}
              name={transaction.bank.name}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs">
              {formatDate(transaction.date)}
            </p>
            <DeleteTransaction id={transaction.id} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TransactionItem;
