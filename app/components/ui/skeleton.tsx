import { cn } from "@/app/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent/30 animate-pulse rounded-full", className)}
      {...props}
    />
  );
}

export { Skeleton };
