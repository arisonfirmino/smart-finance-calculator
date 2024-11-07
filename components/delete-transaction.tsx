"use client";

import { useState } from "react";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { DeleteTransactionProps } from "@/types";
import { deleteTransaction } from "@/app/actions/transaction";

const DeleteTransaction = ({ userId, transaction }: DeleteTransactionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsLoading(true);

    await deleteTransaction({
      userId,
      transactionId: transaction.id,
      type: transaction.type,
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isLoading}
      className={`absolute right-2.5 top-2.5 text-red-600 ${isLoading ? "cursor-not-allowed" : ""}`}
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
