import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateLong = (date: Date | string) => {
  if (date) {
    const validDate = typeof date === "string" ? new Date(date) : date;
    return format(validDate, "dd/MM/yyyy", { locale: ptBR });
  }
};

export const formatDateForBalance = (date: Date) => {
  if (date) {
    const validDate = typeof date === "string" ? new Date(date) : date;
    return format(validDate, "dd 'de' MMM", { locale: ptBR });
  }
};
