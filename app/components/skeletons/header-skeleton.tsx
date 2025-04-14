import { Skeleton } from "@/app/components/ui/skeleton";

import {
  EllipsisVerticalIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

const HeaderSkeleton = () => {
  return (
    <section className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between px-2.5 pt-2.5">
        <span className="text-foreground/50 flex size-10 items-center justify-center">
          <PlusIcon size={16} />
        </span>
        <Skeleton className="h-5 w-36" />
        <span className="text-foreground/50 flex size-10 items-center justify-center">
          <EllipsisVerticalIcon size={16} />
        </span>
      </div>

      <div className="border-primary rounded-full border p-0.5">
        <Skeleton className="size-20" />
      </div>

      <div className="flex h-[44px] flex-col justify-between text-center">
        <Skeleton className="h-6.5 w-32" />
        <p className="text-foreground/50 text-xs lowercase">Saldo disponível</p>
      </div>

      <div className="flex w-full gap-5 px-5">
        <div className="flex h-10 w-full items-center justify-center gap-2 px-4 py-2">
          <TrendingUpIcon size={16} className="text-green-500" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex h-10 w-full items-center justify-center gap-2 px-4 py-2">
          <TrendingDownIcon size={16} className="text-red-600" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </section>
  );
};

export default HeaderSkeleton;
