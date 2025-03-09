import Image from "next/image";

interface BankItemProps {
  icon: string;
  name?: string;
}

const BankItem = ({ icon, name }: BankItemProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Image
        src={icon}
        alt={name ? name : icon}
        height={434}
        width={434}
        className="max-w-3.5 min-w-3.5 rounded"
      />
      {name && <p className="text-xs">{name}</p>}
    </div>
  );
};

export default BankItem;
