"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { EraserIcon, LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { deleteAllTransactions } from "@/app/actions/transaction";

const DeleteAllTransactionsButton = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAllTransactionsClick = async () => {
    if (session) {
      setIsLoading(true);

      await deleteAllTransactions({ userId: session.user.id });

      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleDeleteAllTransactionsClick}
      size="icon"
      className="border hover:border-red-900 hover:bg-red-600"
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <EraserIcon />
      )}
    </Button>
  );
};

export default DeleteAllTransactionsButton;
