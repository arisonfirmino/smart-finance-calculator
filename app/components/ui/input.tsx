import * as React from "react";

import { cn } from "@/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-foreground/50 h-10 w-full border-b bg-transparent px-3 py-2 text-base outline-none md:text-sm",
        "focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
