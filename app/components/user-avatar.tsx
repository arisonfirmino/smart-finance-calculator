import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

import { User } from "@prisma/client";

const UserAvatar = ({ user }: { user: Pick<User, "name" | "avatar"> }) => {
  return (
    <Avatar>
      <AvatarImage src={user.avatar ?? ""} />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
