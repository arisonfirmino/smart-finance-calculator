"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/app/components/ui/switch";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">Aparência</p>
        <p className="text-foreground/50 text-xs">
          Modo {resolvedTheme === "dark" ? "escuro" : "claro"} ativado
        </p>
      </div>

      {mounted && (
        <Switch
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        />
      )}
    </div>
  );
};

export default ThemeSwitch;
