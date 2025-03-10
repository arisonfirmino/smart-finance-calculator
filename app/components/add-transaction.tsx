"use client";

import { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import BankForm from "@/app/components/bank-form";

import { PlusIcon } from "lucide-react";

const AddTransaction = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <PlusIcon />
        </Button>
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
            Adicionar nova transação
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
