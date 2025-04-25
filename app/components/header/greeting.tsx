import { User } from "@prisma/client";

interface GreetingProps {
  user: Pick<User, "name">;
}

const Greeting = ({ user }: GreetingProps) => {
  return (
    <div>
      <p className="text-foreground/50 text-xs">Olá,</p>
      <h1 className="text-base font-medium">{user.name}</h1>
    </div>
  );
};

export default Greeting;
