import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

import { User } from "@prisma/client";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
