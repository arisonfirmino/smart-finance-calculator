import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import TransactionForm from "@/app/components/transaction/transaction-form";
import BankForm from "@/app/components/bank/bank-form";

import { BankIcon, MoneyReceive01Icon, MoneySend01Icon } from "hugeicons-react";

import { Prisma } from "@prisma/client";

interface ActionButtonDesktopProps {
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

const ActionButtonDesktop = ({
  user,
  type,
  disabled,
  open,
  setOpen,
}: ActionButtonDesktopProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={disabled}
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Adicionar{" "}
            {type === "bank"
              ? "novo Banco"
              : type === "income"
                ? "nova receita"
                : "nova despesa"}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para cadastrar{" "}
            {type === "bank"
              ? "um novo banco"
              : type === "income"
                ? "uma nova receita"
                : "uma nova despesa"}{" "}
            à sua conta.
          </DialogDescription>
        </DialogHeader>

        {type === "bank" ? (
          <BankForm onSuccess={() => setOpen(false)} />
        ) : (
          <TransactionForm
            banks={user.banks}
            type={type}
            onSuccess={() => setOpen(false)}
          />
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default ActionButtonDesktop;
