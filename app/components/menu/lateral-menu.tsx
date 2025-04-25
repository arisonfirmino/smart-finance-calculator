import { Separator } from "@/app/components/ui/separator";
import ThemeSwitch from "@/app/components/menu/theme-switch";
import BankManager from "@/app/components/menu/bank-manager";
import SignOutButton from "@/app/components/menu/signout-button";

import { Prisma } from "@prisma/client";

interface LateralMenuProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const LateralMenu = ({ user }: LateralMenuProps) => {
  return (
    <>
      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-foreground/50 text-xs font-medium">Preferências</h4>
        <ThemeSwitch />
      </div>

      <Separator />

      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-foreground/50 text-xs font-medium">Conexões</h4>
        <BankManager banks={user.banks} />
      </div>

      <Separator />

      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-foreground/50 text-xs font-medium">Login</h4>
        <SignOutButton />
      </div>

      <Separator />
    </>
  );
};

export default LateralMenu;
