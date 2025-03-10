import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import BankBadge from "@/app/components/bank-badge";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Bank } from "@prisma/client";

interface BankItemProps {
  bank: Bank;
}

const BankItem = ({ bank }: BankItemProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={bank.id}>
        <AccordionTrigger>
          <BankBadge icon={bank.icon} name={bank.name} fontSize="text-sm" />
        </AccordionTrigger>
        <AccordionContent className="space-y-1">
          <p>
            Valor inicial -{" "}
            <span className="font-medium">
              {formatCurrency(Number(bank.initial_balance))}
            </span>
          </p>
          <p>
            Valor disponivel -{" "}
            <span className="font-medium">
              {formatCurrency(Number(bank.current_balance))}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BankItem;
