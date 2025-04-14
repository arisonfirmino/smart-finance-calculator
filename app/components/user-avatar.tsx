import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const UserAvatar = () => {
  return (
    <div className="border-primary rounded-full border p-0.5">
      <Avatar className="size-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
