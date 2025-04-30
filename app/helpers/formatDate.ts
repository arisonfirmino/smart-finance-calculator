import { format, formatDistanceStrict } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return format(date, "dd MMM yyyy", { locale: ptBR });
};

export const formatPeriod = (dates: Date[]) => {
  return formatDistanceStrict(dates[0], dates[dates.length - 1], {
    locale: ptBR,
    unit: "day",
  });
};
