import BankItem from "@/app/components/bank-badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { DotIcon, Trash2Icon, TrendingDownIcon } from "lucide-react";

const TransactionItem = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <TrendingDownIcon size={16} className="text-red-600" />
            Nome da transação
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-1">
          <div className="flex items-center gap-1">
            <p className="font-medium">{formatCurrency(500)}</p>
            <DotIcon size={16} className="text-muted-foreground" />
            <BankItem
              icon="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/07/70/cc07706c-ff82-af3e-4186-421737752377/Varejo-AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/434x0w.webp"
              name="Itaú"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs">10 de jan, 2025</p>
            <Trash2Icon size={14} className="text-red-600" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TransactionItem;
