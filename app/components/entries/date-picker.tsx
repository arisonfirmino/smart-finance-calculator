"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Card, CardFooter, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDate } from "@/app/helpers/formatDate";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 0 }),
  );

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    return {
      fullDate: date,
      label: format(date, "EEEE", { locale: ptBR }),
      date: format(date, "dd"),
    };
  });

  return (
    <Card className="gap-2.5">
      <CardHeader className="flex items-center justify-between">
        {["prev", "next"].map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() =>
              direction === "prev"
                ? setWeekStart(subWeeks(weekStart, 1))
                : setWeekStart(addWeeks(weekStart, 1))
            }
            className={cn(
              "text-foreground/50 active:text-foreground/100 hover:text-foreground/100 cursor-pointer outline-none [&_svg:not([class*='size-'])]:size-4",
              direction === "prev" ? "order-1" : "order-3",
            )}
          >
            {direction === "prev" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        ))}
        <span className="order-2 text-xs font-medium">{formatDate(date)}</span>
      </CardHeader>

      <CardFooter className="bg-muted flex-row justify-between rounded-2xl border p-2.5 shadow-xs">
        {days.map((day) => {
          const isSelected = isSameDay(day.fullDate, date);

          return (
            <Button
              key={day.date}
              type="button"
              size="icon"
              variant={isSelected ? "default" : "ghost"}
              onClick={() => setDate(day.fullDate)}
              className={cn(
                "flex flex-col gap-0 rounded-xl",
                !isSelected && "text-foreground/50 font-normal",
              )}
            >
              <span className="text-[10px] uppercase">
                {day.label.substring(0, 3)}
              </span>
              {day.date}
            </Button>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default DatePicker;
