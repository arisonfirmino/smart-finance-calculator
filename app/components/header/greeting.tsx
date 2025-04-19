import { User } from "@prisma/client";

interface GreetingProps {
  user: Pick<User, "name">;
}

const Greeting = ({ user }: GreetingProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <div>
      <p className="text-foreground/50 text-xs">{getGreeting()},</p>
      <h1 className="text-base font-medium">{user.name}</h1>
    </div>
  );
};

export default Greeting;
