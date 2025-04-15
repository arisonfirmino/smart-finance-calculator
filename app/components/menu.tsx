"use client";

import { signOut } from "next-auth/react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import {
  CogIcon,
  EllipsisVerticalIcon,
  EraserIcon,
  LogOutIcon,
  Trash2Icon,
} from "lucide-react";

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
      >
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <CogIcon />
          Configurações
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Trash2Icon />
          Zerar bancos
        </DropdownMenuItem>

        <DropdownMenuItem>
          <EraserIcon />
          Zerar histórico
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={async () => await signOut()}>
          <LogOutIcon />
          Encerrar sessão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
