import { UserIcon } from "lucide-react";

const UserFallback = () => {
  return (
    <div className="bg-accent text-muted-foreground flex aspect-square max-w-10 min-w-10 items-center justify-center rounded-2xl">
      <UserIcon size={16} />
    </div>
  );
};

export default UserFallback;
