"use client";

import { useState } from "react";

import { Card, CardFooter, CardHeader } from "@/app/components/ui/card";
import WeekNavButton from "@/app/components/transaction/week-nav-button";
import { Button } from "@/app/components/ui/button";

import { formatDate } from "@/app/helpers/formatDate";

import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

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
      date: format(date, "d"),
    };
  });

  return (
    <Card className="gap-2.5">
      <CardHeader className="text-foreground/50 flex items-center justify-between">
        <WeekNavButton
          direction="prev"
          onClick={() => setWeekStart((prev) => subWeeks(prev, 1))}
        />

        <p className="text-xs uppercase">{formatDate(date)}</p>

        <WeekNavButton
          direction="next"
          onClick={() => setWeekStart((prev) => addWeeks(prev, 1))}
        />
      </CardHeader>

      <CardFooter className="border-border/15 bg-muted flex items-center justify-between rounded-2xl border p-2.5 shadow">
        {days.map((day) => {
          const isSelected = isSameDay(day.fullDate, date);

          return (
            <Button
              key={day.label}
              type="button"
              size="icon"
              variant={isSelected ? "default" : "ghost"}
              className="flex size-12 flex-col gap-0"
              onClick={() => setDate(day.fullDate)}
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
