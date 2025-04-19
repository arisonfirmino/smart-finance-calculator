import Image from "next/image";

interface BankBadgeProps {
  bank: {
    name: string;
    icon: string;
  };
  showName?: boolean;
  size?: string;
}

const BankBadge = ({ bank, showName = false, size }: BankBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={bank.icon}
        alt="bank name"
        height={434}
        width={434}
        className={`rounded ${size ? size : "size-3.5 min-w-3.5"}`}
      />

      {showName && <p className="text-xs font-normal">{bank.name}</p>}
    </div>
  );
};

export default BankBadge;
