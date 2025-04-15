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
    <div className="border-primary rounded-full border p-0.5">
      <Avatar className="size-20">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
