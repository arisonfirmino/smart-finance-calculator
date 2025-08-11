"use client";

import { useState } from "react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import BankForm from "@/app/components/entries/bank-form";

import { LandmarkIcon } from "lucide-react";

const NewBank = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="bg-background flex size-10 items-center justify-center rounded-2xl border shadow-xs">
          <LandmarkIcon size={16} />
        </div>
        <span className="text-sm font-medium md:hidden">Banco</span>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="w-full border-none bg-transparent p-5 shadow-none md:max-w-sm"
      >
        <div className="bg-background rounded-3xl shadow-lg">
          <SheetHeader className="p-5">
            <SheetTitle>Adicionar novo banco</SheetTitle>
            <SheetDescription>
              Preencha as informações abaixo para cadastrar um novo banco à sua
              conta.
            </SheetDescription>
          </SheetHeader>

          <BankForm setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewBank;
