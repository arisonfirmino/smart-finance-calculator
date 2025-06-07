"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { LoaderIcon, Trash2Icon } from "lucide-react";

import { deleteBank } from "@/app/actions/bank/delete";

import { toast } from "sonner";

const DeleteBank = ({ bankId }: { bankId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    await toast.promise(deleteBank({ userId: session.user.id, bankId }), {
      loading: "Removendo banco...",
      success: "Banco removido com sucesso.",
      error: (err) => err?.error || "Erro ao remover o banco.",
    });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="hover:text-foreground/50 cursor-pointer text-red-600"
      >
        {isLoading ? (
          <LoaderIcon size={12} className="animate-spin" />
        ) : (
          <Trash2Icon size={12} />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir banco</AlertDialogTitle>

          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso removerá permanentemente o
            banco e todas as transações associadas.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBank;
