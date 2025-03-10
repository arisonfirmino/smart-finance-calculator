import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";

import { CalendarIcon } from "lucide-react";

import { ptBR } from "date-fns/locale";
import { formatDate } from "@/app/helpers/formatDate";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full bg-black/5 shadow-none",
          !date && "border-red-600",
        )}
      >
        <CalendarIcon />
        {date ? formatDate(date) : <span>Selecione uma data</span>}
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
