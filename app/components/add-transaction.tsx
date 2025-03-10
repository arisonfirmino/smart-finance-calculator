"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import TransactionForm from "@/app/components/transaction-form";
import BankForm from "@/app/components/bank-form";

import { PlusIcon } from "lucide-react";

const AddTransaction = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className={cn(buttonVariants({ size: "icon" }))}>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>

        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="transaction">Transação</TabsTrigger>
            <TabsTrigger value="bank">Banco</TabsTrigger>
          </TabsList>
          <TabsContent value="transaction">
            <TransactionForm onClose={() => setIsDialogOpen(false)} />
          </TabsContent>
          <TabsContent value="bank">
            <BankForm onClose={() => setIsDialogOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
