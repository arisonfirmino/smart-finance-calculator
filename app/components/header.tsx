import NewTransaction from "@/app/components/transaction/new-transaction";
import Menu from "@/app/components/menu";
import UserAvatar from "@/app/components/user-avatar";
import Balance from "@/app/components/balance";
import TotalAmount from "@/app/components/total-amount";

import { Prisma } from "@prisma/client";

interface HeaderProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between px-2.5 pt-2.5">
        <NewTransaction user={user} />
        <h1 className="font-medium">{user.name}</h1>
        <Menu />
      </div>

      <UserAvatar user={user} />

      <Balance balance={Number(user.balance)} />

      <div className="flex w-full gap-5 px-5">
        <TotalAmount type="income" total={Number(user.total_incomes)} />
        <TotalAmount type="expense" total={Number(user.total_expenses)} />
      </div>
    </header>
  );
};

export default Header;
