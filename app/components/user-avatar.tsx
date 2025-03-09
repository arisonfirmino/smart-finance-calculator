import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/components/ui/avatar";

import { User } from "@prisma/client";
import UserFallback from "@/app/components/user-fallback";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return user.image ? (
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
  ) : (
    <UserFallback />
  );
};

export default UserAvatar;
