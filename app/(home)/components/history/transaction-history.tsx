import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Search from "@/app/(home)/components/history/search";
import TransactionsList from "@/app/(home)/components/history/transactions-list";

import { ArrowDownUpIcon } from "lucide-react";

const TransactionHistory = () => {
  return (
    <Card className="h-fit w-full rounded-lg">
      <CardHeader>
        <CardTitle>Histórico</CardTitle>
        <ArrowDownUpIcon size={16} />
      </CardHeader>

      <CardContent className="space-y-2 p-2">
        <Search />
        <TransactionsList />
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
