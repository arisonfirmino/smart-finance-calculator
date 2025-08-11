import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import Chart from "@/app/components/header/chart";
import DeleteOptions from "@/app/components/header/delete-options";
import SignOut from "@/app/components/header/signout";
import Copyright from "@/app/components/copyright";

import { MoveLeftIcon } from "lucide-react";

import { User } from "@/app/types";

interface LateralMenuProps {
  user: User;
  setOpen?: (value: boolean) => void;
}

const LateralMenu = ({ user, setOpen }: LateralMenuProps) => {
  return (
    <Card className="h-full w-full">
      <CardHeader className="p-5 text-center">
        {setOpen && (
          <button
            onClick={() => setOpen(false)}
            className="hover:text-foreground/50 active:text-foreground/50 absolute left-5 cursor-pointer xl:hidden"
          >
            <MoveLeftIcon size={16} />
          </button>
        )}

        <CardTitle className="font-semibold uppercase">Configurações</CardTitle>
      </CardHeader>

      <Separator className="bg-muted" />

      <CardContent className="w-full flex-1">
        {user.transactions.length > 0 && (
          <>
            <Chart transactions={user.transactions} />
            <Separator className="bg-muted" />
          </>
        )}
        <DeleteOptions />
        <Separator className="bg-muted" />
        <SignOut />
      </CardContent>

      <CardFooter className="p-5">
        <Copyright />
      </CardFooter>
    </Card>
  );
};

export default LateralMenu;
