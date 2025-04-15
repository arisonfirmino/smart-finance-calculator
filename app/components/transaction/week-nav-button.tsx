import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface WeekNavButtonProps {
  direction: "next" | "prev";
  onClick: () => void;
}

const WeekNavButton = ({ direction, onClick }: WeekNavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-foreground/50 hover:text-foreground active:text-foreground cursor-pointer"
    >
      {direction === "next" ? (
        <ChevronRightIcon size={16} />
      ) : (
        <ChevronLeftIcon size={16} />
      )}
    </button>
  );
};

export default WeekNavButton;
