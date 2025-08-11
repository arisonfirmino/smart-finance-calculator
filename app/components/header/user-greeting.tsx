import UserAvatar from "@/app/components/user-avatar";

import { User } from "@prisma/client";

const UserGreeting = ({ user }: { user: Pick<User, "name" | "avatar"> }) => {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar user={user} />
      <div>
        <p className="text-foreground/50 text-xs">Olá,</p>
        <p className="text-base font-medium">{user.name}</p>
      </div>
    </div>
  );
};

export default UserGreeting;
