import Image from "next/image";

interface BankBadgeProps {
  icon: string;
  name?: string;
  fontSize?: string;
}

const BankBadge = ({ icon, name, fontSize }: BankBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Image
        src={icon}
        alt={name ? name : icon}
        height={434}
        width={434}
        className="max-w-3.5 min-w-3.5 rounded"
      />
      {name && <p className={fontSize ? fontSize : "text-xs"}>{name}</p>}
    </div>
  );
};

export default BankBadge;
