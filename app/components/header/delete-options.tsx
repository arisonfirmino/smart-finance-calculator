import DeleteBanks from "@/app/components/header/delete-banks";
import DeleteTransactions from "@/app/components/header/delete-transactions";

const DeleteOptions = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-foreground/50 text-xs font-medium">Resetar</span>

      <DeleteBanks />
      <DeleteTransactions />
    </div>
  );
};

export default DeleteOptions;
