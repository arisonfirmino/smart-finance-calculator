import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";

import { BankIcon, MoneyReceive01Icon, MoneySend01Icon } from "hugeicons-react";

import { Prisma } from "@prisma/client";
import BankForm from "@/app/components/bank/bank-form";
import TransactionForm from "@/app/components/transaction/transaction-form";

interface ActionButtonMobileProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
  type: "income" | "expense" | "bank";
  disabled?: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ActionButtonMobile = ({
  user,
  type,
  disabled,
  open,
  setOpen,
}: ActionButtonMobileProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        disabled={disabled}
        className="flex flex-col items-center gap-1 text-sm font-medium"
      >
        <span
          className={cn(
            "dark:border-border/10 border-border/15 border",
            buttonVariants({
              size: "icon",
              className:
                type === "bank"
                  ? ""
                  : type === "income"
                    ? "text-green-500 dark:text-green-300"
                    : "text-red-600 dark:text-red-400",
            }),
          )}
        >
          {type === "bank" ? (
            <BankIcon />
          ) : type === "income" ? (
            <MoneyReceive01Icon />
          ) : (
            <MoneySend01Icon />
          )}
        </span>

        {type === "bank" ? "Banco" : type === "income" ? "Receita" : "Despesa"}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Adicionar{" "}
            {type === "bank"
              ? "novo Banco"
              : type === "income"
                ? "nova receita"
                : "nova despesa"}
          </DrawerTitle>
          <DrawerDescription>
            Preencha as informações abaixo para cadastrar{" "}
            {type === "bank"
              ? "um novo banco"
              : type === "income"
                ? "uma nova receita"
                : "uma nova despesa"}{" "}
            à sua conta.
          </DrawerDescription>
        </DrawerHeader>

        {type === "bank" ? (
          <BankForm onSuccess={() => setOpen(false)} />
        ) : (
          <TransactionForm
            banks={user.banks}
            type={type}
            onSuccess={() => setOpen(false)}
          />
        )}

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
};

export default ActionButtonMobile;
