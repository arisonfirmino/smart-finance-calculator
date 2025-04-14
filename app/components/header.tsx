import { Button } from "@/app/components/ui/button";
import Menu from "@/app/components/menu";
import UserAvatar from "@/app/components/user-avatar";
import Balance from "@/app/components/balance";
import TotalAmount from "@/app/components/total-amount";

import { PlusIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between px-2.5 pt-2.5">
        <Button size="icon" variant="ghost">
          <PlusIcon />
        </Button>

        <h1 className="font-medium">Jhon Doe</h1>
        <Menu />
      </div>

      <UserAvatar />

      <Balance />

      <div className="flex w-full gap-5 px-5">
        <TotalAmount type="income" />
        <TotalAmount type="expense" />
      </div>
    </header>
  );
};

export default Header;
