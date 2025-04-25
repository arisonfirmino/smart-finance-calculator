"use client";

import { useState } from "react";

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
import BankForm from "@/app/components/bank/bank-form";

import { BankIcon } from "hugeicons-react";

const NewBank = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex cursor-pointer flex-col items-center gap-1">
        <span className="bg-background dark:border-border/10 flex size-10 items-center justify-center rounded-2xl shadow-sm dark:border">
          <BankIcon size={16} />
        </span>
        <span className="text-sm font-medium">Banco</span>
      </DrawerTrigger>
      <DrawerContent className="items-center">
        <div className="md:max-w-md">
          <DrawerHeader>
            <DrawerTitle>Adicionar novo banco</DrawerTitle>
            <DrawerDescription>
              Preencha as informações abaixo para cadastrar um novo banco à sua
              conta.
            </DrawerDescription>
          </DrawerHeader>

          <BankForm onSuccess={() => setOpen(false)} />

          <DrawerFooter>
            <DrawerClose>Cancelar</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NewBank;
