"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";

import { HomeIcon, PiggyBankIcon } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();

  const pages = [
    { label: "Home", icon: <HomeIcon />, href: "/" },
    { label: "Poupança", icon: <PiggyBankIcon />, href: "/savings" },
  ];

  return (
    <nav className="flex gap-5 xl:flex-col">
      {pages.map((page) => (
        <Button
          key={page.href}
          size="icon"
          variant="ghost"
          asChild
          className={cn(
            pathname === page.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Link href={page.href}>{page.icon}</Link>
        </Button>
      ))}
    </nav>
  );
};

export default Nav;
