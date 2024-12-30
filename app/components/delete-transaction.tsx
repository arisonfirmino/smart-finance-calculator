"use client";

import { useState } from "react";

import { toast } from "sonner";

import { LoaderIcon, Trash2Icon } from "lucide-react";

import { deleteTransaction } from "@/app/actions/transaction";

import { DeleteTransactionProps } from "@/app/types";

const DeleteTransaction = ({ userId, transaction }: DeleteTransactionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsLoading(true);

    await deleteTransaction({
      userId,
      transactionId: transaction.id,
      type: transaction.type,
    });

    setIsLoading(false);
    toast(`${transaction.type === "income" ? "receita" : "despesa"} deletada.`);
  };

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isLoading}
      className={`text-red-600 ${isLoading ? "cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <LoaderIcon size={12} className="animate-spin" />
      ) : (
        <Trash2Icon size={12} />
      )}
    </button>
  );
};

export default DeleteTransaction;
