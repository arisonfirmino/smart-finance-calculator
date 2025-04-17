import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Transaction } from "@prisma/client";

export const formatRange = (transactions: Transaction[]) => {
  if (!transactions || transactions.length === 0) return null;

  const dates = transactions
    .map((transaction) => new Date(transaction.date))
    .sort((a, b) => a.getTime() - b.getTime());

  const first = dates[0];
  const last = dates[dates.length - 1];

  const formattedFirst = format(first, "d 'de' MMMM", { locale: ptBR });
  const formattedLast = format(last, "d 'de' MMMM", { locale: ptBR });

  return `Registros entre ${formattedFirst} e ${formattedLast}`;
};
