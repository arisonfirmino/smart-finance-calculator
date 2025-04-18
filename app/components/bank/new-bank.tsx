"use client";

import { useState } from "react";

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
import BankForm from "@/app/components/bank/bank-form";

import { PlusIcon } from "lucide-react";

const NewBank = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "rounded-full",
          }),
        )}
      >
        <PlusIcon />
      </DrawerTrigger>
      <DrawerContent>
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
      </DrawerContent>
    </Drawer>
  );
};

export default NewBank;
