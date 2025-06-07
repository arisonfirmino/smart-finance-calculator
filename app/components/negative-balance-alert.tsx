import { Card, CardDescription } from "@/app/components/ui/card";

import { CircleAlertIcon } from "lucide-react";

const NegativeBalanceAlert = () => {
  return (
    <Card className="bg-background animate-fade-up border-border/10 fixed right-5 bottom-5 max-w-xs flex-row items-center gap-2 rounded-2xl border p-2.5 shadow">
      <span className="flex size-8 min-w-8 items-center justify-center rounded-xl bg-red-600/15 text-red-600 dark:bg-red-400/15 dark:text-red-400">
        <CircleAlertIcon size={16} />
      </span>
      <CardDescription className="text-foreground/80 text-xs">
        Seu saldo atual está abaixo de zero. Considere revisar suas despesas.
      </CardDescription>
    </Card>
  );
};

export default NegativeBalanceAlert;
