import { Trash2Icon } from "lucide-react";

const DeleteTransaction = () => {
  return (
    <button className="absolute right-2.5 top-2.5 text-red-600">
      <Trash2Icon size={12} />
    </button>
  );
};

export default DeleteTransaction;
