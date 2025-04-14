import { Button } from "@/app/components/ui/button";
import BankItem from "@/app/components/banks/bank-item";

import { PlusIcon } from "lucide-react";

const BanksList = () => {
  return (
    <div className="flex items-center gap-5 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
      <Button size="icon" variant="ghost" className="rounded-full">
        <PlusIcon />
      </Button>

      <ul className="flex gap-3">
        <li>
          <BankItem />
        </li>
      </ul>
    </div>
  );
};

export default BanksList;
