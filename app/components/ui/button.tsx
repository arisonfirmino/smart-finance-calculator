import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer gap-2 rounded-2xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        // destructive: "",
        outline:
          "text-foreground/80 hover:text-foreground/100 hover:border-primary active:text-foreground/100 active:border-primary border",
        // secondary: "",
        ghost: "bg-transparent hover:bg-primary/5 active:bg-primary/5",
        // link: "",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        // sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        // lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
