import Image from "next/image";

interface BankBadgeProps {
  showName?: boolean;
}

const BankBadge = ({ showName = false }: BankBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/10/d5/54/10d55441-782e-a5c4-b21c-c1cdbcf6c6f4/AppIcon-0-0-1x_U007emarketing-0-9-0-0-85-220.png/434x0w.webp"
        alt="bank name"
        height={434}
        width={434}
        className="size-3 rounded"
      />

      {showName && <p className="text-xs">Nubank</p>}
    </div>
  );
};

export default BankBadge;
