import Image from "next/image";

import { Bank } from "@/app/types";

const BankIcon = ({ bank, size }: { bank: Bank; size?: string }) => {
  return (
    <Image
      src={bank.icon}
      alt={bank.icon}
      height={434}
      width={434}
      className={`rounded-sm ${size ? size : "size-4"}`}
    />
  );
};

export default BankIcon;
