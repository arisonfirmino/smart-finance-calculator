import banks from "@/banks.json";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import TransactionForm from "@/app/components/transaction/transaction-form";

import { PlusIcon } from "lucide-react";

const NewTransaction = () => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "ghost",
          }),
        )}
      >
        <PlusIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Adicionar nova transação</DrawerTitle>
          <DrawerDescription>
            Preencha as informações abaixo para cadastrar uma nova transação à
            sua conta.
          </DrawerDescription>
        </DrawerHeader>

        <TransactionForm banks={banks} />

        <DrawerFooter>
          <DrawerClose>Cancelar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewTransaction;
