import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import BankDetails from "@/app/components/menu/bank-details";

import { Bank } from "@prisma/client";

interface BankManagerProps {
  banks: Bank[];
}

const BankManager = ({ banks }: BankManagerProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-col">
            Gerenciar contas
            <span className="text-foreground/50 text-xs font-normal">
              Toque para visualizar e excluir contas
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5">
          {banks.map((bank) => (
            <BankDetails key={bank.id} bank={bank} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BankManager;
