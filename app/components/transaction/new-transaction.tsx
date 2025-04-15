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

import { Prisma } from "@prisma/client";

interface NewTransactionProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const NewTransaction = ({ user }: NewTransactionProps) => {
  return (
    <Drawer>
      <DrawerTrigger
        disabled={user.banks.length === 0}
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

        <TransactionForm banks={user.banks} />

        <DrawerFooter>
          <DrawerClose>Cancelar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewTransaction;
