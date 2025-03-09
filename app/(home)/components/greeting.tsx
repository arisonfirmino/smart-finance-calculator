const Greeting = ({ name }: { name: string | null }) => {
  const hour = new Date().getHours();

  let greetingMessage = "Bom dia";

  if (hour >= 12 && hour < 18) {
    greetingMessage = "Boa tarde";
  } else if (hour >= 18 || hour < 6) {
    greetingMessage = "Boa noite";
  }

  return (
    <p className="text-xs text-white">
      {greetingMessage}, <br />
      <span className="text-sm font-medium">{name}</span>
    </p>
  );
};

export default Greeting;
