import { MoneyReceive01Icon, MoneySend01Icon } from "hugeicons-react";

interface ActionButtonProps {
  type: "income" | "expense";
  disabled: boolean;
  onClick: (type: "income" | "expense") => void;
}

const ActionButton = ({ type, disabled, onClick }: ActionButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(type)}
      className="flex cursor-pointer flex-col items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        className={`bg-background dark:border-border/10 flex size-10 items-center justify-center rounded-2xl shadow-sm dark:border ${type === "income" ? "text-green-500 dark:text-green-300" : "text-red-600 dark:text-red-400"}`}
      >
        {type === "income" ? (
          <MoneyReceive01Icon size={16} />
        ) : (
          <MoneySend01Icon size={16} />
        )}
      </span>
      <span className="text-sm font-medium">
        {type === "income" ? "Receita" : "Despesa"}
      </span>
    </button>
  );
};

export default ActionButton;
