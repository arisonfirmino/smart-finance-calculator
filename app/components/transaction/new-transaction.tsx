import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import TransactionForm from "@/app/components/transaction/transaction-form";

import { Prisma } from "@prisma/client";

interface NewTransactionProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
  type: "income" | "expense";
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewTransaction = ({ user, type, open, setOpen }: NewTransactionProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Adicionar nova {type === "income" ? "receita" : "despesa"}
          </DrawerTitle>
          <DrawerDescription>
            Preencha as informações abaixo para cadastrar uma nova{" "}
            {type === "income" ? "receita" : "despesa"} à sua conta.
          </DrawerDescription>
        </DrawerHeader>

        <TransactionForm
          banks={user.banks}
          type={type}
          onSuccess={() => setOpen(false)}
        />

        <DrawerFooter>
          <DrawerClose>Cancelar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewTransaction;
