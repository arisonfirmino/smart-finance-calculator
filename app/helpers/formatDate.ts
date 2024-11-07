import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateLong = (date: Date) => {
  if (date) {
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  }
};

export const formatDateForBalance = (date: Date) => {
  if (date) {
    return format(date, "dd 'de' MMM", { locale: ptBR });
  }
};
