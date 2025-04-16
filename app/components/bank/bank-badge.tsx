import Image from "next/image";

interface BankBadgeProps {
  bank: {
    name: string;
    icon: string;
  };
  showName?: boolean;
}

const BankBadge = ({ bank, showName = false }: BankBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={bank.icon}
        alt="bank name"
        height={434}
        width={434}
        className="size-3 rounded"
      />

      {showName && <p className="text-xs font-normal">{bank.name}</p>}
    </div>
  );
};

export default BankBadge;
